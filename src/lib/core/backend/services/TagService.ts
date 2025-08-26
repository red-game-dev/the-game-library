/**
 * Tag Service
 * Business logic for tag operations with caching and optimized lookups
 */

import type { Game } from '@/lib/core/domain/entities';
import { GameService } from './GameService';
import { cacheService } from '@/lib/core/backend/services/CacheService';
import { PaginationService, type PaginatedResponse } from '@/lib/core/backend/services/PaginationService';
import { CACHE_TTL, DEFAULT_PAGE_SIZE } from '@/lib/core/config/constants/app.constants';
import { 
  categorizeTag as categorizeTagFromConstants,
  formatTagDisplay,
} from '@/lib/core/shared/constants/tags.constants';
import { TagCategory } from "@/lib/core/shared/types";

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
  category?: TagCategory;
}

export interface TagWithGames extends Tag {
  games: Game[];
}

export interface TagStats {
  totalTags: number;
  totalGamesWithTags: number;
  averageTagsPerGame: number;
  topTags: Array<{
    tag: Tag;
    gameCount: number;
    percentage: number;
  }>;
  categoryCounts: Record<string, number>;
}

export class TagService {
  // Optimized data structures for O(1) lookups
  private static tagsMap: Map<string, Tag> = new Map();
  private static tagsByGame: Map<string, Set<string>> = new Map();
  private static gamesByTag: Map<string, Set<string>> = new Map();
  private static tagsArray: Tag[] = [];
  private static initialized = false;
  
  /**
   * Initialize the service with tags from games data
   */
  private static initialize() {
    if (this.initialized) return;
    
    this.clear();
    this.extractTagsFromGames();
    this.initialized = true;
  }
  
  /**
   * Clear all data
   */
  private static clear() {
    this.tagsMap.clear();
    this.tagsByGame.clear();
    this.gamesByTag.clear();
    this.tagsArray = [];
  }
  
  /**
   * Extract and process tags from all games
   */
  private static extractTagsFromGames() {
    const games = GameService.getAllGames();
    const tagCounts = new Map<string, number>();
    
    // First pass: collect all tags and count occurrences
    games.forEach(game => {
      if (game.tags && game.tags.length > 0) {
        // Track tags for this game
        if (!this.tagsByGame.has(game.id)) {
          this.tagsByGame.set(game.id, new Set());
        }
        
        game.tags.forEach(tagName => {
          const normalizedTag = tagName.toLowerCase().trim();
          
          // Count occurrences
          tagCounts.set(normalizedTag, (tagCounts.get(normalizedTag) || 0) + 1);
          
          // Track game-tag relationship
          this.tagsByGame.get(game.id)!.add(normalizedTag);
          
          // Track tag-game relationship
          if (!this.gamesByTag.has(normalizedTag)) {
            this.gamesByTag.set(normalizedTag, new Set());
          }
          this.gamesByTag.get(normalizedTag)!.add(game.id);
        });
      }
    });
    
    // Second pass: create Tag objects
    tagCounts.forEach((count, tagName) => {
      const tag: Tag = {
        id: tagName,
        name: this.formatTagName(tagName),
        slug: tagName,
        count,
        category: this.categorizeTag(tagName)
      };
      
      this.tagsMap.set(tagName, tag);
      this.tagsArray.push(tag);
    });
    
    // Sort tags array by count (descending) for better default ordering
    this.tagsArray.sort((a, b) => b.count - a.count);
  }
  
  /**
   * Format tag name for display (delegates to shared constants)
   */
  private static formatTagName(tagName: string): string {
    return formatTagDisplay(tagName);
  }
  
  /**
   * Categorize tag based on its name (delegates to shared constants)
   */
  private static categorizeTag(tagName: string): TagCategory {
    return categorizeTagFromConstants(tagName);
  }
  
  /**
   * Get all tags (with caching)
   */
  static getAllTags(): Tag[] {
    this.initialize();
    
    const cacheKey = 'tags:all';
    const cached = cacheService.get<Tag[]>(cacheKey);
    
    if (cached) return cached;
    
    const tags = [...this.tagsArray];
    cacheService.set(cacheKey, tags, CACHE_TTL.LONG);
    
    return tags;
  }
  
  /**
   * Get tag by ID (O(1) lookup with caching)
   */
  static getTagById(tagId: string): Tag | undefined {
    this.initialize();
    
    const cacheKey = `tags:${tagId}`;
    const cached = cacheService.get<Tag>(cacheKey);
    
    if (cached) return cached;
    
    const tag = this.tagsMap.get(tagId.toLowerCase());
    if (tag) {
      cacheService.set(cacheKey, tag, CACHE_TTL.LONG);
    }
    
    return tag;
  }
  
  /**
   * Get games by tag (O(1) lookup with caching)
   */
  static getGamesByTag(tagId: string): Game[] {
    this.initialize();
    
    const cacheKey = `tags:${tagId}:games`;
    const cached = cacheService.get<Game[]>(cacheKey);
    
    if (cached) return cached;
    
    const gameIds = this.gamesByTag.get(tagId.toLowerCase()) || new Set();
    const games = Array.from(gameIds)
      .map(id => GameService.getGameById(id))
      .filter((game): game is Game => game !== undefined);
    
    cacheService.set(cacheKey, games, CACHE_TTL.MEDIUM);
    return games;
  }
  
  /**
   * Get tags for a specific game
   */
  static getTagsForGame(gameId: string): Tag[] {
    this.initialize();
    
    const cacheKey = `games:${gameId}:tags`;
    const cached = cacheService.get<Tag[]>(cacheKey);
    
    if (cached) return cached;
    
    const tagIds = this.tagsByGame.get(gameId) || new Set();
    const tags = Array.from(tagIds)
      .map(id => this.tagsMap.get(id))
      .filter((tag): tag is Tag => tag !== undefined);
    
    cacheService.set(cacheKey, tags, CACHE_TTL.MEDIUM);
    return tags;
  }
  
  /**
   * Search tags by name
   */
  static searchTags(query: string): Tag[] {
    this.initialize();
    
    const cacheKey = `tags:search:${query}`;
    const cached = cacheService.get<Tag[]>(cacheKey);
    
    if (cached) return cached;
    
    const searchTerm = query.toLowerCase().trim();
    const results = this.tagsArray.filter(tag =>
      tag.name.toLowerCase().includes(searchTerm) ||
      tag.slug.includes(searchTerm)
    );
    
    cacheService.set(cacheKey, results, CACHE_TTL.SHORT);
    return results;
  }
  
  /**
   * Get tags by category
   */
  static getTagsByCategory(category: TagCategory): Tag[] {
    this.initialize();
    
    const cacheKey = `tags:category:${category}`;
    const cached = cacheService.get<Tag[]>(cacheKey);
    
    if (cached) return cached;
    
    const tags = this.tagsArray.filter(tag => tag.category === category);
    
    cacheService.set(cacheKey, tags, CACHE_TTL.MEDIUM);
    return tags;
  }
  
  /**
   * Sort tags
   */
  static sortTags(
    tags: Tag[], 
    sortBy: 'name' | 'count' | 'az' | 'za' = 'count'
  ): Tag[] {
    const sorted = [...tags];
    
    switch (sortBy) {
      case 'count':
        return sorted.sort((a, b) => b.count - a.count);
      case 'az':
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'za':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  }
  
  /**
   * Get paginated tags
   */
  static getPaginatedTags(
    page: number = 1, 
    pageSize: number = DEFAULT_PAGE_SIZE,
    sortBy?: 'name' | 'count' | 'az' | 'za',
    category?: TagCategory
  ): PaginatedResponse<Tag> {
    this.initialize();
    
    const cacheKey = `tags:paginated:${page}:${pageSize}:${sortBy}:${category}`;
    const cached = cacheService.get<PaginatedResponse<Tag>>(cacheKey);
    
    if (cached) return cached;
    
    let tags = category ? this.getTagsByCategory(category) : this.getAllTags();
    
    // Apply sorting if specified
    if (sortBy) {
      tags = this.sortTags(tags, sortBy);
    }
    
    // Apply pagination
    const result = PaginationService.paginate(tags, { page, pageSize });
    
    cacheService.set(cacheKey, result, CACHE_TTL.MEDIUM);
    return result;
  }
  
  /**
   * Get tags with their game counts
   */
  static getTagsWithGames(): TagWithGames[] {
    this.initialize();
    
    const cacheKey = 'tags:with-games';
    const cached = cacheService.get<TagWithGames[]>(cacheKey);
    
    if (cached) return cached;
    
    const result = this.tagsArray.map(tag => ({
      ...tag,
      games: this.getGamesByTag(tag.id)
    }));
    
    cacheService.set(cacheKey, result, CACHE_TTL.MEDIUM);
    return result;
  }
  
  /**
   * Get top tags by game count
   */
  static getTopTags(limit: number = 10): Tag[] {
    const cacheKey = `tags:top:${limit}`;
    const cached = cacheService.get<Tag[]>(cacheKey);
    
    if (cached) return cached;
    
    const tags = this.getAllTags();
    const result = tags
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
    
    cacheService.set(cacheKey, result, CACHE_TTL.MEDIUM);
    return result;
  }
  
  /**
   * Get popular tags (tags with more than X games)
   */
  static getPopularTags(minGames: number = 5): Tag[] {
    const cacheKey = `tags:popular:${minGames}`;
    const cached = cacheService.get<Tag[]>(cacheKey);
    
    if (cached) return cached;
    
    const tags = this.getAllTags();
    const result = tags.filter(tag => tag.count >= minGames);
    
    cacheService.set(cacheKey, result, CACHE_TTL.MEDIUM);
    return result;
  }
  
  /**
   * Get tag statistics
   */
  static getTagStats(): TagStats {
    const cacheKey = 'tags:stats';
    const cached = cacheService.get<TagStats>(cacheKey);
    
    if (cached) return cached;
    
    const tags = this.getAllTags();
    const games = GameService.getAllGames();
    const gamesWithTags = games.filter(g => g.tags && g.tags.length > 0);
    
    // Count tags by category
    const categoryCounts: Record<string, number> = {
      feature: 0,
      theme: 0,
      mechanic: 0,
      style: 0
    };
    
    tags.forEach(tag => {
      if (tag.category) {
        categoryCounts[tag.category]++;
      }
    });
    
    // Get top tags with percentages
    const totalTagUsage = tags.reduce((sum, tag) => sum + tag.count, 0);
    const topTags = tags
      .slice(0, 10)
      .map(tag => ({
        tag,
        gameCount: tag.count,
        percentage: totalTagUsage > 0 ? (tag.count / totalTagUsage) * 100 : 0
      }));
    
    const stats: TagStats = {
      totalTags: tags.length,
      totalGamesWithTags: gamesWithTags.length,
      averageTagsPerGame: gamesWithTags.length > 0 
        ? gamesWithTags.reduce((sum, g) => sum + (g.tags?.length || 0), 0) / gamesWithTags.length 
        : 0,
      topTags,
      categoryCounts
    };
    
    cacheService.set(cacheKey, stats, CACHE_TTL.LONG);
    return stats;
  }
  
  /**
   * Check if tag exists
   */
  static tagExists(tagId: string): boolean {
    this.initialize();
    return this.tagsMap.has(tagId.toLowerCase());
  }
  
  /**
   * Get related tags (tags that appear together frequently)
   */
  static getRelatedTags(tagId: string, limit: number = 5): Tag[] {
    const cacheKey = `tags:${tagId}:related:${limit}`;
    const cached = cacheService.get<Tag[]>(cacheKey);
    
    if (cached) return cached;
    
    const games = this.getGamesByTag(tagId);
    const relatedTagCounts = new Map<string, number>();
    
    // Count co-occurring tags
    games.forEach(game => {
      if (game.tags) {
        game.tags.forEach(tag => {
          const normalizedTag = tag.toLowerCase();
          if (normalizedTag !== tagId.toLowerCase()) {
            relatedTagCounts.set(normalizedTag, (relatedTagCounts.get(normalizedTag) || 0) + 1);
          }
        });
      }
    });
    
    // Sort by co-occurrence count and get top tags
    const result = Array.from(relatedTagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([tagName]) => this.tagsMap.get(tagName))
      .filter((tag): tag is Tag => tag !== undefined);
    
    cacheService.set(cacheKey, result, CACHE_TTL.MEDIUM);
    return result;
  }
  
  /**
   * Clear tag-related cache
   */
  static clearCache(): void {
    cacheService.invalidate('tags:');
  }
}

/**
 * Export singleton instance for convenience
 */
export const tagService = TagService;