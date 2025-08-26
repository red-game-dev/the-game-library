/**
 * Game API POST fetchers
 * All POST request handlers for games endpoint
 */

import type { Game } from '@/lib/core/domain/entities';
import type { ApiSuccessResponse } from '@/lib/core/shared/types';
import type { ApiGameResponse } from '@/lib/core/backend/types/gameTypes';
import { apiClient } from '@/lib/core/frontend/api/client';
import { API_ENDPOINTS } from '@/lib/core/frontend/api/endpoints';
import { ApiError } from '@/lib/core/shared/errors';
import { ErrorCodes } from '@/lib/core/shared/errors/constants';
import { gameApiTransformers } from '@/lib/core/shared/transformers';

/**
 * Toggle favorite status for a game
 */
export async function toggleFavorite(gameId: string): Promise<Game> {
  try {
    const result = await apiClient.post<ApiSuccessResponse<ApiGameResponse>>(
      API_ENDPOINTS.GAMES.BASE,
      { gameId }
    );
    
    if (!result.success) {
      throw new ApiError(
        'API returned an error response',
        ErrorCodes.API_ERROR
      );
    }
    
    // Transform API response to domain entity
    return gameApiTransformers.responseToEntity(result.data as ApiGameResponse);
  } catch (error) {
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
 * Increment play count for a game
 */
export async function incrementPlayCount(gameId: string): Promise<void> {
  try {
    await apiClient.post(API_ENDPOINTS.GAMES.PLAY(gameId));
  } catch (error) {
    // Don't throw error for play count, just log it
    console.error('Error incrementing play count:', error);
  }
}