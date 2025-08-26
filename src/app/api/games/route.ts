/**
 * Mock API endpoint for games
 * Supports filtering, searching, pagination, and sorting
 */

import { NextRequest } from 'next/server';
import { gameService } from '@/lib/core/backend/services/GameService';
import { favoriteService } from '@/lib/core/backend/services/FavoriteService';
import { providerService } from '@/lib/core/backend/services/ProviderService';
import { PaginationService } from '@/lib/core/backend/services/PaginationService';
import { gameEntityTransformers, providerEntityTransformers } from '@/lib/core/backend/transformers';
import { simulateApiDelay, simulateMutationDelay } from '@/lib/core/shared/utils/delay';
import { 
  handleApiError, 
  createPaginatedResponse,
  createSuccessResponse 
} from '@/lib/core/shared/errors/errorHandler';
import { GameNotFoundError, ValidationError } from '@/lib/core/shared/errors/AppError';
import { GAME_TYPES, DEFAULT_PAGE_SIZE } from '@/lib/core/config/constants/app.constants';
import type { GameType } from '@/lib/core/domain/entities';
import type { SortOption, SearchType } from '@/lib/core/domain/models';
import type { FilterQueryParams } from '@/lib/core/shared/types/filters';

export async function GET(request: NextRequest) {
  try {
    // Add delay to simulate real API
    await simulateApiDelay();

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    
    // Validate pagination parameters using PaginationService
    const paginationParams = PaginationService.validateParams({
      page: parseInt(searchParams.get('page') || '1'),
      pageSize: parseInt(searchParams.get('pageSize') || String(DEFAULT_PAGE_SIZE))
    });
    
    // Parse RTP parameters
    const minRtpParam = searchParams.get('minRtp');
    const maxRtpParam = searchParams.get('maxRtp');
    const minRtp = minRtpParam ? parseFloat(minRtpParam) : undefined;
    const maxRtp = maxRtpParam ? parseFloat(maxRtpParam) : undefined;
    
    const criteria: FilterQueryParams = {
      search: searchParams.get('search') || undefined,
      searchType: (searchParams.get('searchType') as SearchType) || 'all',
      providers: searchParams.get('providers')?.split(',').filter(Boolean),
      types: searchParams.get('types')?.split(',').filter(Boolean) as GameType[],
      tags: searchParams.get('tags')?.split(',').filter(Boolean),
      sort: (searchParams.get('sort') as SortOption) || 'popular',
      favorites: searchParams.get('favorites') === 'true',
      isNew: searchParams.get('new') === 'true',
      isHot: searchParams.get('hot') === 'true',
      isComingSoon: searchParams.get('coming') === 'true',
      minRtp,
      maxRtp,
      page: paginationParams.page!,
      pageSize: paginationParams.pageSize!
    };

    // Use GameService to get filtered, sorted, and paginated games
    const { games, pagination, totalGames } = gameService.getGames(criteria);

    // Transform games to API response format
    const apiGames = gameEntityTransformers.toApiGetAllGamesResponse(games);

    // Get unique tags from the filtered games for the filter panel
    const tagsSet = new Set<string>();
    games.forEach(game => {
      if (game.tags) {
        game.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    const availableTags = Array.from(tagsSet).sort();

    // Transform providers to API response format
    const providers = providerService.getAllProviders();
    const apiProviders = providerEntityTransformers.toApiGetAllProvidersResponse(providers);

    const responseData = {
      providers: apiProviders,
      types: [...GAME_TYPES],
      tags: availableTags,
      totalGames
    };

    // Return standardized paginated response
    return createPaginatedResponse(
      apiGames,
      pagination,
      responseData
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Toggle favorite status
export async function POST(request: NextRequest) {
  try {
    await simulateMutationDelay();

    const body = await request.json();
    const { gameId } = body;

    if (!gameId) {
      throw new ValidationError('gameId', undefined, ['required']);
    }

    // Check if game exists
    const game = gameService.getGameById(gameId);
    if (!game) {
      throw new GameNotFoundError(gameId);
    }

    // Use FavoriteService to toggle favorite
    const isFavorite = favoriteService.toggleFavorite(gameId, 'game');

    // Transform game to API response and return
    const apiGame = gameEntityTransformers.toApi({
      ...game,
      isFavorite
    });
    return createSuccessResponse(apiGame);
  } catch (error) {
    return handleApiError(error);
  }
}