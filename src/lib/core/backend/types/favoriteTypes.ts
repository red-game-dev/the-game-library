/**
 * Favorite Types
 * Backend-specific types for favorites
 */

/**
 * API response for a single favorite operation
 */
export interface ApiFavoriteResponse {
  gameId: string;
  isFavorite: boolean;
  timestamp?: string;
}

/**
 * API response for favorites list
 */
export interface ApiFavoritesListResponse {
  favoriteIds: string[];
  count: number;
  lastUpdated?: string;
}

/**
 * API response for sync operation
 */
export interface ApiFavoritesSyncResponse {
  imported: number;
  favoriteIds: string[];
  conflicts?: string[];
}

/**
 * API request for favorite toggle
 */
export interface ApiFavoriteToggleRequest {
  gameId: string;
  action?: 'add' | 'remove' | 'toggle';
}

/**
 * API request for favorites sync
 */
export interface ApiFavoritesSyncRequest {
  favoriteIds: string[];
  overwrite?: boolean;
}

/**
 * Internal favorite entity
 */
export interface FavoriteEntity {
  id: string;
  type: 'game' | 'provider' | 'tag';
  userId: string;
  timestamp: Date;
}