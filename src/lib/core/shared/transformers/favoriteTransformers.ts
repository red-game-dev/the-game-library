/**
 * Favorite API Transformers
 * Shared transformers for favorites across frontend and backend
 * Handles API request/response transformations
 */

import type { ApiFavoriteResponse, ApiFavoritesListResponse } from '@/lib/core/backend/types/favoriteTypes';

/**
 * Favorite type enum for extensibility
 */
export enum FavoriteType {
  GAME = 'game',
  PROVIDER = 'provider',
  TAG = 'tag',
}

/**
 * Frontend favorite data structure
 */
export interface FavoriteData {
  id: string;
  type: FavoriteType;
  addedAt: Date;
}

/**
 * Favorite API Transformers
 */
export const favoriteApiTransformers = {
  
  /**
   * Transform API response to frontend format
   */
  fromApiResponse(response: ApiFavoriteResponse): {
    gameId: string;
    isFavorite: boolean;
    timestamp: Date;
  } {
    return {
      gameId: response.gameId,
      isFavorite: response.isFavorite,
      timestamp: response.timestamp ? new Date(response.timestamp) : new Date(),
    };
  },

  /**
   * Transform API list response to frontend format
   */
  fromApiListResponse(response: ApiFavoritesListResponse): {
    favoriteIds: string[];
    count: number;
    lastUpdated: Date | null;
  } {
    return {
      favoriteIds: response.favoriteIds,
      count: response.count,
      lastUpdated: response.lastUpdated ? new Date(response.lastUpdated) : null,
    };
  },

  /**
   * Create favorite data objects from IDs
   */
  createFavoriteDataFromIds(
    favoriteIds: string[], 
    type: FavoriteType = FavoriteType.GAME
  ): FavoriteData[] {
    return favoriteIds.map(id => ({
      id,
      type,
      addedAt: new Date(),
    }));
  },

  /**
   * Extract IDs from favorite data
   */
  extractIds(favorites: FavoriteData[]): string[] {
    return favorites.map(fav => fav.id);
  },

  /**
   * Filter favorites by type
   */
  filterByType(favorites: FavoriteData[], type: FavoriteType): FavoriteData[] {
    return favorites.filter(fav => fav.type === type);
  },

  /**
   * Check if ID is in favorites
   */
  isFavorite(favoriteIds: string[], id: string): boolean {
    return favoriteIds.includes(id);
  },

  /**
   * Toggle favorite in array
   */
  toggleInArray(favoriteIds: string[], id: string): string[] {
    const index = favoriteIds.indexOf(id);
    if (index > -1) {
      // Remove if exists
      return favoriteIds.filter(favId => favId !== id);
    } else {
      // Add if doesn't exist
      return [...favoriteIds, id];
    }
  },

  /**
   * Merge favorites from multiple sources
   */
  mergeFavorites(
    local: string[], 
    remote: string[], 
    strategy: 'local' | 'remote' | 'merge' = 'merge'
  ): string[] {
    switch (strategy) {
      case 'local':
        return [...local];
      case 'remote':
        return [...remote];
      case 'merge':
      default:
        return Array.from(new Set([...local, ...remote]));
    }
  },
};