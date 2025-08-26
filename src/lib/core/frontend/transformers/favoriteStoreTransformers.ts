/**
 * Favorite Store Transformers
 * Transform favorite data between API responses and store state
 * Frontend-specific transformers for state management
 */

import type { FavoriteData } from '@/lib/core/shared/transformers';
import { FavoriteType } from '@/lib/core/shared/transformers';

/**
 * Store favorite structure
 */
export interface StoreFavorite {
  id: string;
  type: FavoriteType;
  addedAt: string; // ISO string for serialization
}

/**
 * Favorite Store Transformers
 */
export const favoriteStoreTransformers = {
  
  /**
   * Transform favorite IDs to store format
   */
  fromIdsToStore(favoriteIds: string[], type: FavoriteType = FavoriteType.GAME): StoreFavorite[] {
    return favoriteIds.map(id => ({
      id,
      type,
      addedAt: new Date().toISOString(),
    }));
  },

  /**
   * Transform store favorites to ID array
   */
  toIdArray(favorites: StoreFavorite[]): string[] {
    return favorites.map(fav => fav.id);
  },

  /**
   * Transform API favorite data to store format
   */
  fromApiToStore(favoriteData: FavoriteData[]): StoreFavorite[] {
    return favoriteData.map(fav => ({
      id: fav.id,
      type: fav.type,
      addedAt: fav.addedAt.toISOString(),
    }));
  },

  /**
   * Transform store favorites to API format
   */
  fromStoreToApi(favorites: StoreFavorite[]): FavoriteData[] {
    return favorites.map(fav => ({
      id: fav.id,
      type: fav.type,
      addedAt: new Date(fav.addedAt),
    }));
  },

  /**
   * Filter store favorites by type
   */
  filterByType(favorites: StoreFavorite[], type: FavoriteType): StoreFavorite[] {
    return favorites.filter(fav => fav.type === type);
  },

  /**
   * Check if ID exists in store favorites
   */
  hasId(favorites: StoreFavorite[], id: string): boolean {
    return favorites.some(fav => fav.id === id);
  },

  /**
   * Add favorite to store
   */
  addFavorite(
    favorites: StoreFavorite[], 
    id: string, 
    type: FavoriteType = FavoriteType.GAME
  ): StoreFavorite[] {
    if (this.hasId(favorites, id)) {
      return favorites;
    }
    
    return [
      ...favorites,
      {
        id,
        type,
        addedAt: new Date().toISOString(),
      }
    ];
  },

  /**
   * Remove favorite from store
   */
  removeFavorite(favorites: StoreFavorite[], id: string): StoreFavorite[] {
    return favorites.filter(fav => fav.id !== id);
  },

  /**
   * Toggle favorite in store
   */
  toggleFavorite(
    favorites: StoreFavorite[], 
    id: string, 
    type: FavoriteType = FavoriteType.GAME
  ): StoreFavorite[] {
    if (this.hasId(favorites, id)) {
      return this.removeFavorite(favorites, id);
    } else {
      return this.addFavorite(favorites, id, type);
    }
  },

  /**
   * Serialize store favorites for session storage
   */
  serialize(favorites: StoreFavorite[]): string {
    return JSON.stringify(favorites);
  },

  /**
   * Deserialize from session storage
   */
  deserialize(data: string): StoreFavorite[] {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed.filter(item => 
          item && 
          typeof item.id === 'string' && 
          item.type in FavoriteType
        );
      }
      return [];
    } catch {
      return [];
    }
  },

  /**
   * Get favorites count by type
   */
  getCountByType(favorites: StoreFavorite[]): Record<FavoriteType, number> {
    return {
      [FavoriteType.GAME]: this.filterByType(favorites, FavoriteType.GAME).length,
      [FavoriteType.PROVIDER]: this.filterByType(favorites, FavoriteType.PROVIDER).length,
      [FavoriteType.TAG]: this.filterByType(favorites, FavoriteType.TAG).length,
    };
  },

  /**
   * Sort favorites by date added
   */
  sortByDate(favorites: StoreFavorite[], order: 'asc' | 'desc' = 'desc'): StoreFavorite[] {
    return [...favorites].sort((a, b) => {
      const dateA = new Date(a.addedAt).getTime();
      const dateB = new Date(b.addedAt).getTime();
      return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
  },
};