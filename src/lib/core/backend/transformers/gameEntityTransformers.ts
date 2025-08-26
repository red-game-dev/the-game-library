/**
 * Game Entity Transformers
 * Backend-specific transformers for game entities
 * Used for database operations and business logic
 */

import type { Game } from '@/lib/core/domain/entities';
import { createGame } from '@/lib/core/domain/entities';
import type { 
  ApiGameResponse,
} from '@/lib/core/backend/types/gameTypes';

/**
 * Game Entity Transformers
 */
export const gameEntityTransformers = {

  /**
   * Transform API response to domain entity
   */
  fromApi(apiResponse: ApiGameResponse): Game {
    return createGame({
      id: apiResponse.id,
      title: apiResponse.title,
      slug: apiResponse.slug,
      thumbnail: apiResponse.thumbnail,
      description: apiResponse.description,
      provider: apiResponse.provider,
      type: apiResponse.type,
      isNew: apiResponse.isNew,
      isHot: apiResponse.isHot,
      isOnSale: apiResponse.isOnSale,
      isFavorite: apiResponse.isFavorite,
      isComingSoon: apiResponse.isComingSoon,
      tags: apiResponse.tags,
      playCount: apiResponse.playCount,
      releaseDate: apiResponse.releaseDate,
      rtp: apiResponse.rtp,
    });
  },

  /**
   * Transform domain entity to API response
   */
  toApi(game: Game): ApiGameResponse {
    return {
      id: game.id,
      title: game.title,
      slug: game.slug,
      thumbnail: game.thumbnail,
      description: game.description,
      provider: game.provider,
      type: game.type,
      isNew: game.isNew,
      isHot: game.isHot,
      isOnSale: game.isOnSale,
      isFavorite: game.isFavorite,
      isComingSoon: game.isComingSoon,
      tags: game.tags,
      playCount: game.playCount,
      releaseDate: game.releaseDate,
      rtp: game.rtp,
      createdAt: game.createdAt?.toISOString(),
      updatedAt: game.updatedAt?.toISOString(),
    };
  },

  /**
   * Transform entities to API get all games response
   */
  toApiGetAllGamesResponse(games: Game[]): ApiGameResponse[] {
    return games.map(game => gameEntityTransformers.toApi(game));
  },

  /**
   * Transform API get all games response to entities
   */
  fromApiGetAllGamesResponse(apiResponses: ApiGameResponse[]): Game[] {
    return apiResponses.map(response => gameEntityTransformers.fromApi(response));
  },

};