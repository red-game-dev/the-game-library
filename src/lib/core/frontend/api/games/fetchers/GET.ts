/**
 * Game API GET fetchers
 * All GET request handlers for games endpoint
 * 
 * These fetchers handle data transformation and optionally update stores
 * The hooks layer uses these for React Query integration
 */

import type { Game, Provider } from '@/lib/core/domain/entities';
import type { ApiSuccessResponse, FilterQueryParams, PaginationMeta } from '@/lib/core/shared/types';
import type { ApiGameResponse } from '@/lib/core/backend/types/gameTypes';
import { apiClient } from '@/lib/core/frontend/api/client';
import { API_ENDPOINTS } from '@/lib/core/frontend/api/endpoints';
import { createPaginationMeta } from '@/lib/core/domain/models/PaginationInfo';
import { ApiError } from '@/lib/core/shared/errors';
import { ErrorCodes } from '@/lib/core/shared/errors/constants';
import { gameApiTransformers } from '@/lib/core/shared/transformers';

/**
 * Response type for fetchGames
 */
export interface FetchGamesResponse {
  games: Game[];
  pagination: PaginationMeta;
  meta: {
    providers?: Provider[];
    tags?: string[];
    totalCount?: number;
  };
}

/**
 * Fetch games with filters and pagination
 * 
 * @param criteria - Search criteria including pagination
 * @param options - Optional configuration
 * @returns Games data with pagination metadata
 * 
 * @example
 * ```typescript
 * const response = await fetchGames({
 *   search: 'poker',
 *   providers: ['evolution'],
 *   types: ['live'],
 *   page: 1,
 *   pageSize: 20
 * });
 * 
 * console.log(response.games); // Array of games
 * console.log(response.pagination); // { page: 1, pageSize: 20, total: 100, ... }
 * ```
 */
export async function fetchGames(
  criteria: FilterQueryParams = {},
): Promise<FetchGamesResponse> {
  try {
    const queryParams = gameApiTransformers.buildQueryParams(criteria);
    const params = queryParams.toString() ? Object.fromEntries(queryParams) : undefined;
    
    const result = await apiClient.get<ApiSuccessResponse<ApiGameResponse[]>>(API_ENDPOINTS.GAMES.BASE, params);
    
    // Check if response is successful
    if (!result.success) {
      throw new ApiError(
        'API returned an error response',
        ErrorCodes.API_ERROR
      );
    }
    
    // Transform API response to domain entities
    const games = gameApiTransformers.fromApiGetAllGamesResponse(result.data as ApiGameResponse[]);
    
    // Use pagination utilities to ensure proper metadata
    const pagination = result.pagination || createPaginationMeta(
      criteria.page || 1,
      criteria.pageSize || 20,
      games.length
    );
    
    return {
      games,
      pagination,
      meta: {
        providers: result.meta?.providers as Provider[] | undefined,
        tags: result.meta?.tags as string[] | undefined,
        totalCount: result.meta?.totalCount as number | undefined
      }
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch games',
      ErrorCodes.FETCH_GAMES_ERROR
    );
  }
}

/**
 * Fetch single game by ID
 */
export async function fetchGameById(id: string): Promise<Game> {
  try {
    const result = await apiClient.get<ApiSuccessResponse<ApiGameResponse>>(API_ENDPOINTS.GAMES.BY_ID(id));
    
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
      if (error.statusCode === 404) {
        throw new ApiError(
          `Game with ID '${id}' not found`,
          ErrorCodes.GAME_NOT_FOUND,
          404
        );
      }
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch game',
      ErrorCodes.FETCH_GAME_ERROR
    );
  }
}

/**
 * Search games
 */
export async function searchGames(query: string): Promise<Game[]> {
  const criteria: FilterQueryParams = { search: query, pageSize: 50 };
  const response = await fetchGames(criteria);
  return response.games;
}