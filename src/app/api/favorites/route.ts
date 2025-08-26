/**
 * Favorites API Route
 * Handles favorite operations with session-based persistence
 */

import { NextRequest } from 'next/server';
import { favoriteService } from '@/lib/core/backend/services/FavoriteService';
import { gameService } from '@/lib/core/backend/services/GameService';
import { favoriteEntityTransformers } from '@/lib/core/backend/transformers';
import { GameNotFoundError, ValidationError } from '@/lib/core/shared/errors/AppError';
import { simulateMutationDelay } from '@/lib/core/shared/utils/delay';
import {
  handleApiError,
  createSuccessResponse,
  validateRequiredFields,
} from '@/lib/core/shared/errors/errorHandler';

/**
 * GET /api/favorites
 * Get all favorite game IDs
 */
export async function GET() {
  try {
    const favoriteIds = favoriteService.getFavoriteIds('game');
    
    // Transform to API response format
    const response = favoriteEntityTransformers.toApiFavoritesListResponse(favoriteIds);
    
    return createSuccessResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/favorites
 * Toggle favorite status for a game
 */
export async function POST(request: NextRequest) {
  try {
    await simulateMutationDelay();

    const body = await request.json();
    const { gameId, action } = body;

    // Validate required fields
    validateRequiredFields({ gameId }, ['gameId']);

    // Verify game exists
    const game = gameService.getGameById(gameId);
    if (!game) {
      throw new GameNotFoundError(gameId);
    }

    let isFavorite: boolean;
    
    if (action === 'add') {
      isFavorite = favoriteService.addFavorite(gameId);
    } else if (action === 'remove') {
      isFavorite = !favoriteService.removeFavorite(gameId);
    } else {
      // Default to toggle
      isFavorite = favoriteService.toggleFavorite(gameId);
    }

    // Get updated game with favorite status
    const updatedGame = gameService.getGameById(gameId);
    
    // Transform to API response format
    const response = favoriteEntityTransformers.toApiFavoriteResponse(gameId, isFavorite);

    return createSuccessResponse({
      ...response,
      game: updatedGame
    });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT /api/favorites
 * Sync favorites from client
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { favoriteIds } = body;

    if (!Array.isArray(favoriteIds)) {
      throw new ValidationError('favoriteIds', favoriteIds, ['must be an array']);
    }

    // Import favorites from client
    favoriteService.importFavorites(favoriteIds, 'game');
    
    // Transform to API response format
    const response = favoriteEntityTransformers.toApiSyncResponse(
      favoriteIds.length,
      favoriteIds
    );

    return createSuccessResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/favorites
 * Clear all favorites
 */
export async function DELETE() {
  try {
    favoriteService.clearFavorites('game');
    
    return createSuccessResponse({
      message: 'All favorites cleared'
    });
  } catch (error) {
    return handleApiError(error);
  }
}