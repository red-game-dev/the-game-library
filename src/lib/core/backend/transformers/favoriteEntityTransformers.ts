/**
 * Favorite Entity Transformers
 * Backend-specific transformers for favorite entities
 * Used for database operations and API responses
 */

import type { 
  ApiFavoriteResponse,
  ApiFavoritesListResponse,
  ApiFavoritesSyncResponse,
  FavoriteEntity 
} from '@/lib/core/backend/types/favoriteTypes';

/**
 * Favorite Entity Transformers
 */
export const favoriteEntityTransformers = {
  
  /**
   * Transform single favorite to API response
   */
  toApiFavoriteResponse(gameId: string, isFavorite: boolean): ApiFavoriteResponse {
    return {
      gameId,
      isFavorite,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Transform favorites list to API response
   */
  toApiFavoritesListResponse(favoriteIds: string[]): ApiFavoritesListResponse {
    return {
      favoriteIds,
      count: favoriteIds.length,
      lastUpdated: new Date().toISOString(),
    };
  },

  /**
   * Transform sync result to API response
   */
  toApiSyncResponse(
    imported: number, 
    favoriteIds: string[], 
    conflicts?: string[]
  ): ApiFavoritesSyncResponse {
    const response: ApiFavoritesSyncResponse = {
      imported,
      favoriteIds,
    };
    
    if (conflicts && conflicts.length > 0) {
      response.conflicts = conflicts;
    }
    
    return response;
  },

  /**
   * Create internal favorite entity
   */
  createFavoriteEntity(
    id: string, 
    type: 'game' | 'provider' | 'tag', 
    userId: string
  ): FavoriteEntity {
    return {
      id,
      type,
      userId,
      timestamp: new Date(),
    };
  },

  /**
   * Transform favorite entities to ID array
   */
  toFavoriteIds(entities: FavoriteEntity[]): string[] {
    return entities.map(entity => entity.id);
  },

  /**
   * Filter favorites by type
   */
  filterByType(entities: FavoriteEntity[], type: 'game' | 'provider' | 'tag'): FavoriteEntity[] {
    return entities.filter(entity => entity.type === type);
  },

  /**
   * Transform API list to entity array
   */
  fromApiFavoritesList(
    favoriteIds: string[], 
    type: 'game' | 'provider' | 'tag' = 'game',
    userId: string = 'guest'
  ): FavoriteEntity[] {
    return favoriteIds.map(id => ({
      id,
      type,
      userId,
      timestamp: new Date(),
    }));
  },
};