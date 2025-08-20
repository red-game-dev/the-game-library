/**
 * Optimized data structures for efficient game operations
 * Uses Maps and indexed objects for O(1) lookups
 */

import type { Game, Provider, GameType } from '@/lib/types';

/**
 * Game Store with optimized lookups
 */
export class GameStore {
  private gamesMap: Map<string, Game> = new Map();
  private gamesByProvider: Map<string, Set<string>> = new Map();
  private gamesByType: Map<GameType, Set<string>> = new Map();
  private favoriteGames: Set<string> = new Set();
  private gamesArray: Game[] = [];

  constructor(games: Game[] = []) {
    this.initialize(games);
  }

  /**
   * Initialize the store with games array
   * Creates all necessary indexes for O(1) lookups
   */
  private initialize(games: Game[]) {
    this.clear();
    games.forEach(game => this.addGame(game));
  }

  /**
   * Add a game to the store with all indexes
   */
  addGame(game: Game) {
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
    
    // Update array
    this.gamesArray.push(game);
  }

  /**
   * Get game by ID - O(1)
   */
  getGame(id: string): Game | undefined {
    return this.gamesMap.get(id);
  }

  /**
   * Get all games
   */
  getAllGames(): Game[] {
    return this.gamesArray;
  }

  /**
   * Get games by provider - O(1) + O(n) where n is games for that provider
   */
  getGamesByProvider(providerId: string): Game[] {
    const gameIds = this.gamesByProvider.get(providerId);
    if (!gameIds) return [];
    
    return Array.from(gameIds)
      .map(id => this.gamesMap.get(id))
      .filter((game): game is Game => game !== undefined);
  }

  /**
   * Get games by type - O(1) + O(n) where n is games of that type
   */
  getGamesByType(type: GameType): Game[] {
    const gameIds = this.gamesByType.get(type);
    if (!gameIds) return [];
    
    return Array.from(gameIds)
      .map(id => this.gamesMap.get(id))
      .filter((game): game is Game => game !== undefined);
  }

  /**
   * Get favorite games - O(n) where n is number of favorites
   */
  getFavoriteGames(): Game[] {
    return Array.from(this.favoriteGames)
      .map(id => this.gamesMap.get(id))
      .filter((game): game is Game => game !== undefined);
  }

  /**
   * Toggle favorite status - O(1)
   */
  toggleFavorite(gameId: string): boolean {
    const game = this.gamesMap.get(gameId);
    if (!game) return false;

    if (this.favoriteGames.has(gameId)) {
      this.favoriteGames.delete(gameId);
      game.isFavorite = false;
    } else {
      this.favoriteGames.add(gameId);
      game.isFavorite = true;
    }
    
    return game.isFavorite;
  }

  /**
   * Search games - O(n) but optimized with early returns
   */
  searchGames(query: string): Game[] {
    const lowerQuery = query.toLowerCase();
    return this.gamesArray.filter(game => {
      // Check title first (most likely match)
      if (game.title.toLowerCase().includes(lowerQuery)) return true;
      
      // Then check tags
      if (game.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) return true;
      
      // Finally check provider name
      if (game.provider.name.toLowerCase().includes(lowerQuery)) return true;
      
      return false;
    });
  }

  /**
   * Get games with multiple filters - Optimized with index intersection
   */
  getFilteredGames(filters: {
    providers?: string[];
    types?: GameType[];
    favorites?: boolean;
    search?: string;
  }): Game[] {
    let gameIds: Set<string> | null = null;

    // Start with the smallest set for optimization
    if (filters.favorites) {
      gameIds = new Set(this.favoriteGames);
    }

    // Intersect with provider filter if specified
    if (filters.providers && filters.providers.length > 0) {
      const providerGameIds = new Set<string>();
      filters.providers.forEach(providerId => {
        const ids = this.gamesByProvider.get(providerId);
        if (ids) {
          ids.forEach(id => providerGameIds.add(id));
        }
      });
      
      if (gameIds) {
        // Intersection
        gameIds = new Set([...gameIds].filter(id => providerGameIds.has(id)));
      } else {
        gameIds = providerGameIds;
      }
    }

    // Intersect with type filter if specified
    if (filters.types && filters.types.length > 0) {
      const typeGameIds = new Set<string>();
      filters.types.forEach(type => {
        const ids = this.gamesByType.get(type);
        if (ids) {
          ids.forEach(id => typeGameIds.add(id));
        }
      });
      
      if (gameIds) {
        // Intersection
        gameIds = new Set([...gameIds].filter(id => typeGameIds.has(id)));
      } else {
        gameIds = typeGameIds;
      }
    }

    // Get the games
    let games: Game[];
    if (gameIds) {
      games = Array.from(gameIds)
        .map(id => this.gamesMap.get(id))
        .filter((game): game is Game => game !== undefined);
    } else {
      games = this.gamesArray;
    }

    // Apply search filter if specified
    if (filters.search) {
      const lowerSearch = filters.search.toLowerCase();
      games = games.filter(game => 
        game.title.toLowerCase().includes(lowerSearch) ||
        game.tags?.some(tag => tag.toLowerCase().includes(lowerSearch))
      );
    }

    return games;
  }

  /**
   * Clear all data
   */
  clear() {
    this.gamesMap.clear();
    this.gamesByProvider.clear();
    this.gamesByType.clear();
    this.favoriteGames.clear();
    this.gamesArray = [];
  }

  /**
   * Get statistics
   */
  getStats() {
    return {
      totalGames: this.gamesArray.length,
      totalFavorites: this.favoriteGames.size,
      gamesByType: Array.from(this.gamesByType.entries()).map(([type, games]) => ({
        type,
        count: games.size
      })),
      gamesByProvider: Array.from(this.gamesByProvider.entries()).map(([provider, games]) => ({
        provider,
        count: games.size
      }))
    };
  }
}

/**
 * Provider Store for efficient provider lookups
 */
export class ProviderStore {
  private providersMap: Map<string, Provider> = new Map();
  private providersArray: Provider[] = [];

  constructor(providers: Provider[] = []) {
    this.initialize(providers);
  }

  private initialize(providers: Provider[]) {
    this.clear();
    providers.forEach(provider => {
      this.providersMap.set(provider.id, provider);
      this.providersArray.push(provider);
    });
  }

  getProvider(id: string): Provider | undefined {
    return this.providersMap.get(id);
  }

  getAllProviders(): Provider[] {
    return this.providersArray;
  }

  clear() {
    this.providersMap.clear();
    this.providersArray = [];
  }
}