/**
 * Favorites API POST fetchers
 * All POST/PUT/DELETE request handlers for favorites endpoint
 * 
 * These fetchers handle data transformation using transformers
 * and update stores directly, following the same pattern as games
 */

import type { ApiSuccessResponse } from '@/lib/core/shared/types';
import type { Game } from '@/lib/core/domain/entities';
import type { ApiFavoriteResponse, ApiFavoritesListResponse } from '@/lib/core/backend/types/favoriteTypes';
import { apiClient } from '@/lib/core/frontend/api/client';
import { API_ENDPOINTS } from '@/lib/core/frontend/api/endpoints';
import { ApiError } from '@/lib/core/shared/errors';
import { ErrorCodes } from '@/lib/core/shared/errors/constants';
import { useFavoritesStore } from '@/lib/core/frontend/stores/favorites/useFavoritesStore';
import { favoriteApiTransformers } from '@/lib/core/shared/transformers';
import { favoriteStoreTransformers } from '@/lib/core/frontend/transformers';

/**
 * Toggle favorite response type
 */
export interface ToggleFavoriteResponse {
  gameId: string;
  isFavorite: boolean;
  game?: Game;
}

/**
 * Sync favorites response type
 */
export interface SyncFavoritesResponse {
  imported: number;
  favoriteIds: string[];
}

/**
 * Toggle favorite status for a game
 * Updates the store directly after successful API call
 * 
 * @param gameId - ID of the game to toggle
 * @returns Updated favorite status
 * 
 * @example
 * ```typescript
 * const response = await toggleFavorite('game-123');
 * console.log(response.isFavorite); // true/false
 * ```
 */
export async function toggleFavorite(gameId: string): Promise<ToggleFavoriteResponse> {
  const store = useFavoritesStore.getState();
  
  // Optimistic update
  store.toggleFavorite(gameId);
  
  try {
    const result = await apiClient.post<ApiSuccessResponse<ApiFavoriteResponse>>(
      API_ENDPOINTS.FAVORITES.BASE,
      { gameId, action: 'toggle' }
    );
    
    if (!result.success) {
      throw new ApiError(
        'API returned an error response',
        ErrorCodes.API_ERROR
      );
    }
    
    // Transform API response using transformers
    const transformed = favoriteApiTransformers.fromApiResponse(result.data as ApiFavoriteResponse);
    
    return {
      gameId: transformed.gameId,
      isFavorite: transformed.isFavorite,
    };
  } catch (error) {
    // Rollback on error
    store.toggleFavorite(gameId);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to toggle favorite',
      ErrorCodes.TOGGLE_FAVORITE_ERROR
    );
  }
}

/**
 * Sync favorites with backend
 * 
 * @param favoriteIds - Array of favorite IDs to sync
 * @returns Import result
 * 
 * @example
 * ```typescript
 * const response = await syncFavorites(['game-1', 'game-2']);
 * console.log(response.imported); // 2
 * ```
 */
export async function syncFavorites(favoriteIds: string[]): Promise<SyncFavoritesResponse> {
  try {
    const result = await apiClient.put<ApiSuccessResponse<ApiFavoritesListResponse>>(
      API_ENDPOINTS.FAVORITES.BASE,
      { favoriteIds }
    );
    
    if (!result.success) {
      throw new ApiError(
        'API returned an error response',
        ErrorCodes.API_ERROR
      );
    }
    
    // Transform API response using transformers
    const transformed = favoriteApiTransformers.fromApiListResponse(result.data as ApiFavoritesListResponse);
    
    // Update store with synced favorites
    const store = useFavoritesStore.getState();
    store.setFavorites(transformed.favoriteIds);
    
    return {
      imported: transformed.count,
      favoriteIds: transformed.favoriteIds,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to sync favorites',
      ErrorCodes.OPERATION_FAILED
    );
  }
}

/**
 * Clear all favorites
 * 
 * @returns Success message
 * 
 * @example
 * ```typescript
 * await clearFavorites();
 * // All favorites cleared
 * ```
 */
export async function clearFavorites(): Promise<{ message: string }> {
  const store = useFavoritesStore.getState();
  
  try {
    const result = await apiClient.delete<ApiSuccessResponse<{ message: string }>>(
      API_ENDPOINTS.FAVORITES.BASE
    );
    
    if (!result.success) {
      throw new ApiError(
        'API returned an error response',
        ErrorCodes.API_ERROR
      );
    }
    
    // Clear store after successful API call
    store.clearFavorites();
    
    return result.data as { message: string };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to clear favorites',
      ErrorCodes.OPERATION_FAILED
    );
  }
}