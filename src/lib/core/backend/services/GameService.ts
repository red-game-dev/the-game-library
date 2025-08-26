/**
 * Game Service
 * Business logic for game operations with caching and optimized lookups
 */

import type { Game, GameType } from '@/lib/core/domain/entities';
import type { SortOption, SearchType } from '@/lib/core/domain/models';
import type { FilterQueryParams } from '@/lib/core/shared/types/filters';
import type { PaginationMeta } from '@/lib/core/shared/types';
import { cacheService } from '@/lib/core/backend/services/CacheService';
import { PaginationService } from '@/lib/core/backend/services/PaginationService';
import { CACHE_TTL, DEFAULT_PAGE_SIZE } from '@/lib/core/config/constants/app.constants';
import gamesData from '@/lib/core/backend/data/games.json';

interface GameStatistics {
  totalGames: number;
  totalFavorites: number;
  gamesByType: Array<{ type: string; count: number }>;
  gamesByProvider: Array<{ providerId: string; count: number }>;
  newGames: number;
  hotGames: number;
}

export class GameService {
  // Optimized data structures for O(1) lookups
  private static gamesMap: Map<string, Game> = new Map();
  private static gamesByProvider: Map<string, Set<string>> = new Map();
  private static gamesByType: Map<GameType, Set<string>> = new Map();
  private static favoriteGames: Set<string> = new Set();
  private static gamesArray: Game[] = [];
  private static initialized = false;
  
  /**
   * Initialize the service with games data
   */
  private static initialize() {
    if (this.initialized) return;
    
    this.clear();
    const games = gamesData as Game[];
    games.forEach(game => this.addGame(game));
    this.initialized = true;
  }
  
  /**
   * Clear all data
   */
  private static clear() {
    this.gamesMap.clear();
    this.gamesByProvider.clear();
    this.gamesByType.clear();
    this.favoriteGames.clear();
    this.gamesArray = [];
  }
  
  /**
   * Add a game to internal data structures
   */
  private static addGame(game: Game) {
    // Add to main map
    this.gamesMap.set(game.id, game);
    
    // Add to provider index
    if (!this.gamesByProvider.has(game.provider.id)) {
      this.gamesByProvider.set(game.provider.id, new Set());
    }
    this.gamesByProvider.get(game.provider.id)!.add(game.id);
    
    // Add to type index
    if (!this.gamesByType.has(game.type)) {
      this.gamesByType.set(game.type, new Set());
    }
    this.gamesByType.get(game.type)!.add(game.id);
    
    // Add to favorites if needed
    if (game.isFavorite) {
      this.favoriteGames.add(game.id);
    }
    
    // Add to array
    this.gamesArray.push(game);
  }
  
  /**
   * Get all games (with caching)
   */
  static getAllGames(): Game[] {
    this.initialize();
    
    const cacheKey = 'games:all';
    const cached = cacheService.get<Game[]>(cacheKey);
    
    if (cached) return cached;
    
    const games = Array.from(this.gamesMap.values());
    cacheService.set(cacheKey, games, CACHE_TTL.MEDIUM);
    
    return games;
  }
  
  /**
   * Get game by ID (O(1) lookup with caching)
   */
  static getGameById(gameId: string): Game | undefined {
    this.initialize();
    
    const cacheKey = `games:${gameId}`;
    const cached = cacheService.get<Game>(cacheKey);
    
    if (cached) return cached;
    
    const game = this.gamesMap.get(gameId);
    if (game) {
      cacheService.set(cacheKey, game, CACHE_TTL.LONG);
    }
    
    return game;
  }
  
  /**
   * Get games by provider (O(1) lookup with caching)
   */
  static getGamesByProvider(providerId: string): Game[] {
    this.initialize();
    
    const cacheKey = `games:provider:${providerId}`;
    const cached = cacheService.get<Game[]>(cacheKey);
    
    if (cached) return cached;
    
    const gameIds = this.gamesByProvider.get(providerId) || new Set();
    const games = Array.from(gameIds)
      .map(id => this.gamesMap.get(id))
      .filter((game): game is Game => game !== undefined);
    
    cacheService.set(cacheKey, games, CACHE_TTL.MEDIUM);
    return games;
  }
  
  /**
   * Get games by type (O(1) lookup with caching)
   */
  static getGamesByType(type: GameType): Game[] {
    this.initialize();
    
    const cacheKey = `games:type:${type}`;
    const cached = cacheService.get<Game[]>(cacheKey);
    
    if (cached) return cached;
    
    const gameIds = this.gamesByType.get(type) || new Set();
    const games = Array.from(gameIds)
      .map(id => this.gamesMap.get(id))
      .filter((game): game is Game => game !== undefined);
    
    cacheService.set(cacheKey, games, CACHE_TTL.MEDIUM);
    return games;
  }
  
  /**
   * Search games
   */
  static searchGames(query: string): Game[] {
    this.initialize();
    
    const cacheKey = `games:search:${query}`;
    const cached = cacheService.get<Game[]>(cacheKey);
    
    if (cached) return cached;
    
    const searchTerm = query.toLowerCase().trim();
    const results = Array.from(this.gamesMap.values()).filter(game => {
      const titleMatch = game.title.toLowerCase().includes(searchTerm);
      const tagMatch = game.tags?.some(tag => 
        tag.toLowerCase().includes(searchTerm)
      );
      return titleMatch || tagMatch;
    });
    
    cacheService.set(cacheKey, results, CACHE_TTL.SHORT);
    return results;
  }
  
  /**
   * Get filtered games
   */
  static getFilteredGames(filters: {
    providers?: string[];
    types?: GameType[];
    tags?: string[];
    favorites?: boolean;
    search?: string;
    searchType?: SearchType;
    isNew?: boolean;
    isHot?: boolean;
    isComingSoon?: boolean;
    minRtp?: number;
    maxRtp?: number;
  }): Game[] {
    this.initialize();
    
    let games = Array.from(this.gamesMap.values());
    
    // Apply search filter based on search type
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase().trim();
      const searchType = filters.searchType || 'all';
      
      games = games.filter(game => {
        switch (searchType) {
          case 'games':
            // Search only in game titles
            return game.title.toLowerCase().includes(searchTerm);
          
          case 'providers':
            // Search only in provider names
            return game.provider.name.toLowerCase().includes(searchTerm);
          
          case 'tags':
            // Search only in tags
            return game.tags?.some(tag => 
              tag.toLowerCase().includes(searchTerm)
            ) || false;
          
          case 'all':
          default:
            // Search in titles, provider names, and tags
            const titleMatch = game.title.toLowerCase().includes(searchTerm);
            const providerMatch = game.provider.name.toLowerCase().includes(searchTerm);
            const tagMatch = game.tags?.some(tag => 
              tag.toLowerCase().includes(searchTerm)
            );
            return titleMatch || providerMatch || tagMatch;
        }
      });
    }
    
    // Apply provider filter
    if (filters.providers && filters.providers.length > 0) {
      games = games.filter(game => 
        filters.providers!.includes(game.provider.id)
      );
    }
    
    // Apply type filter
    if (filters.types && filters.types.length > 0) {
      games = games.filter(game => 
        filters.types!.includes(game.type)
      );
    }
    
    // Apply tags filter
    if (filters.tags && filters.tags.length > 0) {
      games = games.filter(game => 
        game.tags?.some(tag => 
          filters.tags!.some(filterTag => 
            tag.toLowerCase().includes(filterTag.toLowerCase())
          )
        )
      );
    }
    
    // Apply favorites filter
    if (filters.favorites) {
      games = games.filter(game => game.isFavorite);
    }
    
    // Apply new filter
    if (filters.isNew) {
      games = games.filter(game => game.isNew);
    }
    
    // Apply hot filter
    if (filters.isHot) {
      games = games.filter(game => game.isHot);
    }
    
    // Apply coming soon filter
    if (filters.isComingSoon) {
      games = games.filter(game => game.isComingSoon);
    }
    
    // Apply RTP filter
    if (filters.minRtp !== undefined || filters.maxRtp !== undefined) {
      
      games = games.filter(game => {
        // Skip games without RTP data
        if (game.rtp === undefined || game.rtp === null) {
          return false;
        }
        
        // Check minimum RTP
        if (filters.minRtp !== undefined && game.rtp < filters.minRtp) {
          return false;
        }
        
        // Check maximum RTP
        if (filters.maxRtp !== undefined && game.rtp > filters.maxRtp) {
          return false;
        }
        
        return true;
      });
    }
    
    return games;
  }
  
  /**
   * Toggle favorite status
   */
  static toggleFavorite(gameId: string): boolean {
    this.initialize();
    
    const game = this.gamesMap.get(gameId);
    if (!game) return false;
    
    game.isFavorite = !game.isFavorite;
    
    if (game.isFavorite) {
      this.favoriteGames.add(gameId);
    } else {
      this.favoriteGames.delete(gameId);
    }
    
    // Invalidate caches
    cacheService.invalidate('games:');
    cacheService.invalidate('favorites:');
    
    return game.isFavorite;
  }
  
  /**
   * Get favorite games
   */
  static getFavoriteGames(): Game[] {
    this.initialize();
    
    const cacheKey = 'games:favorites';
    const cached = cacheService.get<Game[]>(cacheKey);
    
    if (cached) return cached;
    
    const games = Array.from(this.favoriteGames)
      .map(id => this.gamesMap.get(id))
      .filter((game): game is Game => game !== undefined);
    
    cacheService.set(cacheKey, games, CACHE_TTL.SHORT);
    return games;
  }
  
  /**
   * Apply sorting to games array
   */
  static sortGames(games: Game[], sortOption: SortOption = 'popular'): Game[] {
    const sorted = [...games]; // Create a copy to avoid mutation
    
    switch (sortOption) {
      case 'popular':
        return sorted.sort((a, b) => (b.playCount || 0) - (a.playCount || 0));
      
      case 'new':
        return sorted.sort((a, b) => {
          const dateA = new Date(a.releaseDate || 0).getTime();
          const dateB = new Date(b.releaseDate || 0).getTime();
          return dateB - dateA;
        });
      
      case 'az':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      
      case 'za':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      
      case 'rating':
        // Sort by RTP (Return to Player) percentage, highest first
        return sorted.sort((a, b) => (b.rtp || 0) - (a.rtp || 0));
      
      default:
        return sorted;
    }
  }
  
  /**
   * Paginate games array using PaginationService
   */
  static paginateGames(
    games: Game[], 
    page: number = 1, 
    pageSize: number = DEFAULT_PAGE_SIZE
  ): { games: Game[]; pagination: PaginationMeta } {
    const result = PaginationService.paginate(games, { page, pageSize });
    
    return {
      games: result.data,
      pagination: {
        page: result.pagination.page,
        pageSize: result.pagination.pageSize,
        total: result.pagination.total,
        totalPages: result.pagination.totalPages,
        hasMore: result.pagination.hasMore,
        hasPrevious: result.pagination.hasPrevious,
        startIndex: result.pagination.startIndex || 0,
        endIndex: result.pagination.endIndex || 0
      }
    };
  }
  
  /**
   * Get filtered, sorted, and paginated games (with caching)
   */
  static getGames(criteria: FilterQueryParams = {}): {
    games: Game[];
    pagination: PaginationMeta;
    totalGames: number;
  } {
    this.initialize();
    
    const cacheKey = `games:filtered:${JSON.stringify(criteria)}`;
    const cached = cacheService.get<{
      games: Game[];
      pagination: PaginationMeta;
      totalGames: number;
    }>(cacheKey);
    
    if (cached) return cached;
    
    // Get filtered games
    const filteredGames = this.getFilteredGames({
      providers: criteria.providers,
      types: criteria.types,
      tags: criteria.tags,
      favorites: criteria.favorites,
      search: criteria.search,
      searchType: criteria.searchType,
      isNew: criteria.isNew,
      isHot: criteria.isHot,
      isComingSoon: criteria.isComingSoon,
      minRtp: criteria.minRtp,
      maxRtp: criteria.maxRtp
    });
    
    // Apply sorting
    const sortedGames = this.sortGames(filteredGames, criteria.sort);
    
    // Apply pagination
    const { games, pagination } = this.paginateGames(
      sortedGames,
      criteria.page,
      criteria.pageSize
    );
    
    const result = {
      games,
      pagination,
      totalGames: this.getAllGames().length
    };
    
    // Cache for short time as filters change frequently
    cacheService.set(cacheKey, result, CACHE_TTL.SHORT);
    
    return result;
  }
  
  /**
   * Get game statistics (with caching)
   */
  static getStats() {
    this.initialize();
    const cacheKey = 'games:stats';
    const cached = cacheService.get<GameStatistics>(cacheKey);
    
    if (cached) return cached;
    
    const allGames = Array.from(this.gamesMap.values());
    
    // Count games by type
    const gamesByType = Array.from(this.gamesByType.entries()).map(([type, ids]) => ({
      type,
      count: ids.size
    }));
    
    // Count games by provider
    const gamesByProvider = Array.from(this.gamesByProvider.entries()).map(([providerId, ids]) => ({
      providerId,
      count: ids.size
    }));
    
    const stats = {
      totalGames: allGames.length,
      totalFavorites: this.favoriteGames.size,
      gamesByType,
      gamesByProvider,
      newGames: allGames.filter(g => g.isNew).length,
      hotGames: allGames.filter(g => g.tags?.includes('hot')).length
    };
    
    cacheService.set(cacheKey, stats, CACHE_TTL.LONG);
    return stats;
  }
  
  /**
   * Get all unique tags from games (normalized and sorted)
   */
  static getUniqueGameTags(): string[] {
    this.initialize();
    
    const cacheKey = 'games:tags:unique';
    const cached = cacheService.get<string[]>(cacheKey);
    
    if (cached) return cached;
    
    const tagsSet = new Set<string>();
    this.gamesArray.forEach(game => {
      if (game.tags) {
        game.tags.forEach(tag => tagsSet.add(tag.toLowerCase().trim()));
      }
    });
    
    const tags = Array.from(tagsSet).sort();
    cacheService.set(cacheKey, tags, CACHE_TTL.MEDIUM);
    return tags;
  }
  
  /**
   * Get all tags (alias for backward compatibility)
   */
  static getAllTags(): string[] {
    return this.getUniqueGameTags();
  }
  
  /**
   * Get tag statistics
   */
  static getTagStats(): Map<string, number> {
    this.initialize();
    
    const cacheKey = 'games:tags:stats';
    const cached = cacheService.get<[string, number][]>(cacheKey);
    
    if (cached) {
      return new Map(cached);
    }
    
    const tagCounts = new Map<string, number>();
    
    this.gamesArray.forEach(game => {
      if (game.tags) {
        game.tags.forEach(tag => {
          const normalizedTag = tag.toLowerCase().trim();
          tagCounts.set(normalizedTag, (tagCounts.get(normalizedTag) || 0) + 1);
        });
      }
    });
    
    // Cache as array since Map can't be directly cached
    const statsArray = Array.from(tagCounts.entries());
    cacheService.set(cacheKey, statsArray, CACHE_TTL.MEDIUM);
    
    return tagCounts;
  }
  
  /**
   * Get popular tags (tags with at least minGames)
   */
  static getPopularTags(minGames: number = 5): string[] {
    const tagStats = this.getTagStats();
    return Array.from(tagStats.entries())
      .filter(([, count]) => count >= minGames)
      .sort((a, b) => b[1] - a[1]) // Sort by count descending
      .map(([tag]) => tag);
  }
  
  /**
   * Get top tags by game count
   */
  static getTopTags(limit: number = 10): Array<{ tag: string; count: number }> {
    const tagStats = this.getTagStats();
    return Array.from(tagStats.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([tag, count]) => ({ tag, count }));
  }
  
  /**
   * Get games by tag
   */
  static getGamesByTag(tag: string): Game[] {
    this.initialize();
    const normalizedTag = tag.toLowerCase().trim();
    
    return this.gamesArray.filter(game => 
      game.tags?.some(t => t.toLowerCase().trim() === normalizedTag)
    );
  }
  
  /**
   * Get entities by tag (implements TaggableService interface)
   */
  static getEntitiesByTag(tag: string): Game[] {
    return this.getGamesByTag(tag);
  }
  
  /**
   * Clear game-related cache
   */
  static clearCache(): void {
    cacheService.invalidate('games:');
  }
}

/**
 * Export singleton instance for convenience
 */
export const gameService = GameService;