/**
 * Favorites API GET fetchers
 * All GET request handlers for favorites endpoint
 * 
 * These fetchers handle data transformation using transformers
 * following the same pattern as games and providers
 */

import type { ApiSuccessResponse } from '@/lib/core/shared/types';
import type { ApiFavoritesListResponse } from '@/lib/core/backend/types/favoriteTypes';
import { apiClient } from '@/lib/core/frontend/api/client';
import { API_ENDPOINTS } from '@/lib/core/frontend/api/endpoints';
import { ApiError } from '@/lib/core/shared/errors';
import { ErrorCodes } from '@/lib/core/shared/errors/constants';
import { favoriteApiTransformers } from '@/lib/core/shared/transformers';

/**
 * Response type for favorites
 */
export interface FavoritesResponse {
  favoriteIds: string[];
  count: number;
  lastUpdated: Date | null;
}

/**
 * Fetch favorite game IDs
 * 
 * @returns Favorite IDs and count
 * 
 * @example
 * ```typescript
 * const response = await fetchFavorites();
 * console.log(response.favoriteIds); // ['game-1', 'game-2']
 * console.log(response.count); // 2
 * ```
 */
export async function fetchFavorites(): Promise<FavoritesResponse> {
  try {
    const result = await apiClient.get<ApiSuccessResponse<ApiFavoritesListResponse>>(
      API_ENDPOINTS.FAVORITES.BASE
    );
    
    if (!result.success) {
      throw new ApiError(
        'API returned an error response',
        ErrorCodes.API_ERROR
      );
    }
    
    // Transform API response to domain format using transformers
    return favoriteApiTransformers.fromApiListResponse(result.data as ApiFavoritesListResponse);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch favorites',
      ErrorCodes.DATA_FETCH_ERROR
    );
  }
}