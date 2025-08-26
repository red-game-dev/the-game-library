/**
 * Game API Transformers
 * Transform game data between API formats and domain entities
 * Shared between frontend and backend
 */

import type { Game, GameType } from '@/lib/core/domain/entities';
import type { ApiGameResponse, ApiGameRequest } from '@/lib/core/backend/types/gameTypes';
import type { SortOption, SearchType } from '@/lib/core/domain/models';
import type { FilterQueryParams } from '@/lib/core/shared/types/filters';
import { DEFAULT_PAGE_SIZE } from '@/lib/core/config/constants/app.constants';

/**
 * Game API Transformers
 */
export const gameApiTransformers = {
  /**
   * Transform API response to domain entity
   */
  responseToEntity(apiGame: ApiGameResponse): Game {
    return {
      id: apiGame.id,
      title: apiGame.title,
      slug: apiGame.slug,
      thumbnail: apiGame.thumbnail,
      description: apiGame.description,
      provider: {
        id: apiGame.provider.id,
        name: apiGame.provider.name,
        slug: apiGame.provider.slug,
        logo: apiGame.provider.logo,
        website: apiGame.provider.website,
        description: apiGame.provider.description,
        gameCount: apiGame.provider.gameCount,
      },
      type: apiGame.type as GameType,
      isNew: apiGame.isNew,
      isHot: apiGame.isHot,
      isOnSale: apiGame.isOnSale,
      isFavorite: apiGame.isFavorite,
      isComingSoon: apiGame.isComingSoon,
      tags: apiGame.tags,
      playCount: apiGame.playCount,
      releaseDate: apiGame.releaseDate,
      rtp: apiGame.rtp,
      createdAt: apiGame.createdAt ? new Date(apiGame.createdAt) : undefined,
      updatedAt: apiGame.updatedAt ? new Date(apiGame.updatedAt) : undefined,
    };
  },

  /**
   * Transform domain entity to API request
   */
  entityToRequest(game: Partial<Game>): ApiGameRequest {
    const request: ApiGameRequest = {};
    
    if (game.title) request.title = game.title;
    if (game.type) request.type = game.type;
    if (game.tags) request.tags = game.tags;
    if (game.provider?.id) request.providerId = game.provider.id;
    if (game.thumbnail) request.thumbnail = game.thumbnail;
    if (game.isNew !== undefined) request.isNew = game.isNew;
    if (game.isHot !== undefined) request.isHot = game.isHot;
    if (game.isFavorite !== undefined) request.isFavorite = game.isFavorite;
    if (game.isComingSoon !== undefined) request.isComingSoon = game.isComingSoon;
    
    return request;
  },

  /**
   * Transform API get all games response to entities
   * Used by frontend when receiving list of games
   */
  fromApiGetAllGamesResponse(apiGames: ApiGameResponse[]): Game[] {
    return apiGames.map(game => gameApiTransformers.responseToEntity(game));
  },

  /**
   * Build query parameters from search criteria
   * Used when making API requests
   */
  buildQueryParams(criteria: FilterQueryParams): URLSearchParams {
    const params = new URLSearchParams();
    
    if (criteria.search) params.set('search', criteria.search);
    if (criteria.searchType) params.set('searchType', criteria.searchType);
    if (criteria.providers?.length) params.set('providers', criteria.providers.join(','));
    if (criteria.types?.length) params.set('types', criteria.types.join(','));
    if (criteria.sort) params.set('sort', criteria.sort);
    if (criteria.favorites) params.set('favorites', 'true');
    if (criteria.page && criteria.page > 1) params.set('page', criteria.page.toString());
    if (criteria.pageSize && criteria.pageSize !== DEFAULT_PAGE_SIZE) {
      params.set('pageSize', criteria.pageSize.toString());
    }
    if (criteria.tags?.length) params.set('tags', criteria.tags.join(','));
    if (criteria.minRtp !== undefined) params.set('minRtp', criteria.minRtp.toString());
    if (criteria.maxRtp !== undefined) params.set('maxRtp', criteria.maxRtp.toString());
    if (criteria.isNew) params.set('new', 'true');
    if (criteria.isHot) params.set('hot', 'true');
    if (criteria.isComingSoon) params.set('coming', 'true');
    
    return params;
  },

  /**
   * Parse query parameters from URL to search criteria
   * Used when processing API requests
   */
  parseQueryParams(params: URLSearchParams): FilterQueryParams {
    const criteria: FilterQueryParams = {};
    
    const search = params.get('search');
    if (search) criteria.search = search;
    
    const searchType = params.get('searchType');
    if (searchType) criteria.searchType = searchType as SearchType;
    
    const providers = params.get('providers');
    if (providers) criteria.providers = providers.split(',');
    
    const types = params.get('types');
    if (types) criteria.types = types.split(',') as GameType[];
    
    const sort = params.get('sort');
    if (sort) criteria.sort = sort as SortOption;
    
    if (params.get('favorites') === 'true') criteria.favorites = true;
    
    const page = params.get('page');
    if (page) criteria.page = parseInt(page, 10);
    
    const pageSize = params.get('pageSize');
    if (pageSize) criteria.pageSize = parseInt(pageSize, 10);
    
    const tags = params.get('tags');
    if (tags) criteria.tags = tags.split(',');
    
    const minRtp = params.get('minRtp');
    if (minRtp) criteria.minRtp = parseFloat(minRtp);
    
    const maxRtp = params.get('maxRtp');
    if (maxRtp) criteria.maxRtp = parseFloat(maxRtp);
    
    if (params.get('new') === 'true') criteria.isNew = true;
    if (params.get('hot') === 'true') criteria.isHot = true;
    if (params.get('coming') === 'true') criteria.isComingSoon = true;
    
    return criteria;
  },
};