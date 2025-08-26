/**
 * Favorite Service
 * Handles all favorite-related operations
 */

import type { Game } from '@/lib/core/domain/entities';
import { GameService } from './GameService';
import { cacheService } from '@/lib/core/backend/services/CacheService';
import { CACHE_TTL } from '@/lib/core/config/constants/app.constants';
import favoritesData from '../data/favorites.json';

export interface FavoriteStats {
  totalFavorites: number;
  favoritesByType: Record<string, number>;
  favoritesByProvider: Record<string, number>;
  recentFavorites: Game[];
}

interface FavoritesData {
  favorites: Record<string, string[]>;
  lastUpdated: string;
}

export class FavoriteService {
  private static favoritesCache: Set<string> = new Set();
  private static favoritesStore: FavoritesData = favoritesData as FavoritesData;
  private static userId = 'guest'; // Default user for now
  
  /**
   * Initialize favorites from JSON data
   */
  private static initializeFavorites(): void {
    const userFavorites = this.favoritesStore.favorites[this.userId] || [];
    userFavorites.forEach(gameId => {
      const game = GameService.getGameById(gameId);
      if (game) {
        game.isFavorite = true;
      }
    });
  }

  /**
   * Get user favorites from store
   */
  private static getUserFavorites(): string[] {
    if (!this.favoritesStore.favorites[this.userId]) {
      this.favoritesStore.favorites[this.userId] = [];
    }
    return this.favoritesStore.favorites[this.userId];
  }

  /**
   * Save favorites to store (in-memory simulation of file persistence)
   * In a real backend, this would write to the JSON file or database
   * 
   * NOTE: In Next.js/Vercel, we cannot write to the file system.
   * This simulates persistence by maintaining state in memory.
   * For production, use a database or external storage service.
   */
  private static saveFavorites(favoriteIds: string[]): void {
    // Update in-memory store (simulating file/database write)
    this.favoritesStore.favorites[this.userId] = favoriteIds;
    this.favoritesStore.lastUpdated = new Date().toISOString();
    
    // Update cache to persist across requests during the session
    this.favoritesCache = new Set(favoriteIds);
    
    // Update games with favorite status
    GameService.getAllGames().forEach(game => {
      game.isFavorite = favoriteIds.includes(game.id);
    });
    
    // In development, log what would be persisted
    if (process.env.NODE_ENV === 'development') {
      console.log(`[FavoriteService] Updated favorites for ${this.userId}:`, favoriteIds);
      console.log('[FavoriteService] In production, this would be saved to:');
      console.log('  - Database (PostgreSQL, MongoDB, etc.)');
      console.log('  - Or external storage (Redis, DynamoDB, etc.)');
      console.log('Current in-memory state:', {
        favorites: this.favoritesStore.favorites,
        lastUpdated: this.favoritesStore.lastUpdated
      });
    }
  }

  /**
   * Toggle favorite status for an item
   * @param itemId - ID of the item to toggle
   * @param itemType - Type of item (game, provider, etc.)
   */
  static toggleFavorite(itemId: string, itemType: 'game' = 'game'): boolean {
    if (itemType === 'game') {
      const favorites = this.getUserFavorites();
      const index = favorites.indexOf(itemId);
      let isFavorite: boolean;
      
      if (index > -1) {
        // Remove from favorites
        favorites.splice(index, 1);
        isFavorite = false;
      } else {
        // Add to favorites
        favorites.push(itemId);
        isFavorite = true;
      }
      
      // Save updated favorites
      this.saveFavorites(favorites);
      
      // Update the game's favorite status
      const game = GameService.getGameById(itemId);
      if (game) {
        game.isFavorite = isFavorite;
      }
      
      // Invalidate related caches
      cacheService.invalidate('games:');
      cacheService.invalidate('favorites:');
      
      return isFavorite;
    }
    
    // Handle other item types in the future
    const isFavorite = this.favoritesCache.has(itemId);
    if (isFavorite) {
      this.favoritesCache.delete(itemId);
    } else {
      this.favoritesCache.add(itemId);
    }
    
    return !isFavorite;
  }
  
  /**
   * Add item to favorites
   * @param itemId - ID of the item to add
   * @param itemType - Type of item
   */
  static addFavorite(itemId: string, itemType: 'game' = 'game'): boolean {
    if (itemType === 'game') {
      const game = GameService.getGameById(itemId);
      if (game && !game.isFavorite) {
        this.toggleFavorite(itemId);
      }
      return true;
    }
    
    this.favoritesCache.add(itemId);
    return true;
  }
  
  /**
   * Remove item from favorites
   * @param itemId - ID of the item to remove
   * @param itemType - Type of item
   */
  static removeFavorite(itemId: string, itemType: 'game' = 'game'): boolean {
    if (itemType === 'game') {
      const game = GameService.getGameById(itemId);
      if (game && game.isFavorite) {
        this.toggleFavorite(itemId);
      }
      return true;
    }
    
    this.favoritesCache.delete(itemId);
    return true;
  }
  
  /**
   * Check if item is favorited
   * @param itemId - ID of the item to check
   * @param itemType - Type of item
   */
  static isFavorite(itemId: string, itemType: 'game' = 'game'): boolean {
    if (itemType === 'game') {
      const game = GameService.getGameById(itemId);
      return game?.isFavorite || false;
    }
    
    return this.favoritesCache.has(itemId);
  }
  
  /**
   * Get all favorite games (with caching)
   */
  static getFavoriteGames(): Game[] {
    const cacheKey = 'favorites:all';
    const cached = cacheService.get<Game[]>(cacheKey);
    
    if (cached) return cached;
    
    // Initialize favorites if not already done
    if (!this.favoritesStore.favorites[this.userId]) {
      this.initializeFavorites();
    }
    
    const favoriteIds = this.getUserFavorites();
    const favorites = favoriteIds
      .map(id => GameService.getGameById(id))
      .filter(game => game !== null) as Game[];
    
    cacheService.set(cacheKey, favorites, CACHE_TTL.SHORT);
    
    return favorites;
  }
  
  /**
   * Get favorite IDs
   * @param itemType - Type of items to get
   */
  static getFavoriteIds(itemType: 'game' = 'game'): string[] {
    if (itemType === 'game') {
      return this.getFavoriteGames().map(game => game.id);
    }
    
    return Array.from(this.favoritesCache);
  }
  
  /**
   * Get favorite count
   * @param itemType - Type of items to count
   */
  static getFavoriteCount(itemType: 'game' = 'game'): number {
    if (itemType === 'game') {
      return this.getFavoriteGames().length;
    }
    
    return this.favoritesCache.size;
  }
  
  /**
   * Clear all favorites
   * @param itemType - Type of items to clear
   */
  static clearFavorites(itemType?: 'game'): void {
    if (!itemType || itemType === 'game') {
      // Clear all game favorites
      const favorites = this.getFavoriteGames();
      favorites.forEach(game => {
        this.toggleFavorite(game.id);
      });
    }
    
    // Clear cache
    this.favoritesCache.clear();
    cacheService.invalidate('favorites:');
  }
  
  /**
   * Get favorite statistics (with caching)
   */
  static getFavoriteStats(): FavoriteStats {
    const cacheKey = 'favorites:stats';
    const cached = cacheService.get<FavoriteStats>(cacheKey);
    
    if (cached) return cached;
    
    const favoriteGames = this.getFavoriteGames();
    
    // Group by type
    const favoritesByType: Record<string, number> = {};
    favoriteGames.forEach(game => {
      favoritesByType[game.type] = (favoritesByType[game.type] || 0) + 1;
    });
    
    // Group by provider
    const favoritesByProvider: Record<string, number> = {};
    favoriteGames.forEach(game => {
      const providerId = game.provider.id;
      favoritesByProvider[providerId] = (favoritesByProvider[providerId] || 0) + 1;
    });
    
    // Get recent favorites (last 5)
    const recentFavorites = favoriteGames.slice(-5).reverse();
    
    const stats: FavoriteStats = {
      totalFavorites: favoriteGames.length,
      favoritesByType,
      favoritesByProvider,
      recentFavorites
    };
    
    cacheService.set(cacheKey, stats, CACHE_TTL.MEDIUM);
    return stats;
  }
  
  /**
   * Batch toggle favorites
   * @param itemIds - Array of item IDs to toggle
   * @param itemType - Type of items
   */
  static batchToggleFavorites(itemIds: string[], itemType: 'game' = 'game'): Record<string, boolean> {
    const results: Record<string, boolean> = {};
    
    itemIds.forEach(itemId => {
      results[itemId] = this.toggleFavorite(itemId, itemType);
    });
    
    return results;
  }
  
  /**
   * Import favorites from JSON
   * @param favoriteIds - Array of favorite IDs to import
   * @param itemType - Type of items
   */
  static importFavorites(favoriteIds: string[], itemType: 'game' = 'game'): void {
    if (itemType === 'game') {
      this.saveFavorites(favoriteIds);
    } else {
      favoriteIds.forEach(itemId => {
        this.addFavorite(itemId, itemType);
      });
    }
  }
  
  /**
   * Export favorites to JSON
   * @param itemType - Type of items to export
   */
  static exportFavorites(itemType: 'game' = 'game'): string[] {
    return this.getFavoriteIds(itemType);
  }
  
  /**
   * Initialize service on startup
   */
  static initialize(): void {
    this.initializeFavorites();
  }
}

// Initialize favorites on service load
FavoriteService.initialize();

/**
 * Export singleton instance for convenience
 */
export const favoriteService = FavoriteService;