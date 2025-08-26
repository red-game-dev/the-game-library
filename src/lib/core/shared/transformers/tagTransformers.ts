/**
 * Tag Transformers
 * Shared transformers for tag data used by both frontend and backend
 * These handle API responses, requests, and query parameters
 */

import type { Tag } from '@/lib/core/domain/entities';
import type { ApiTagResponse, TagsQueryParams } from '@/lib/core/backend/types/tagTypes';
import type { TagCategory } from '@/lib/core/shared/types/tags';

/**
 * Shared Tag Transformers
 * Used by both frontend (for API responses) and backend (for API formatting)
 */
export const tagApiTransformers = {
  /**
   * Transform API response to domain entity
   * Used by frontend when receiving data from API
   */
  responseToEntity(apiResponse: ApiTagResponse): Tag {
    return {
      id: apiResponse.id,
      name: apiResponse.name,
      slug: apiResponse.slug,
      count: apiResponse.count,
    };
  },

  /**
   * Transform domain entity to API response
   * Used by backend when sending data to frontend
   */
  entityToResponse(tag: Tag, category?: TagCategory): ApiTagResponse {
    return {
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      count: tag.count || 0,
      category,
    };
  },

  /**
   * Transform API get all tags response to entities
   * Used by frontend when receiving list of tags
   */
  fromApiGetAllTagsResponse(apiResponses: ApiTagResponse[]): Tag[] {
    return apiResponses.map(response => tagApiTransformers.responseToEntity(response));
  },

  /**
   * Transform entities to API get all tags response
   * Used by backend when sending list of tags
   */
  toApiGetAllTagsResponse(tags: Tag[]): ApiTagResponse[] {
    return tags.map(tag => tagApiTransformers.entityToResponse(tag));
  },



  /**
   * Parse query string to tag query parameters
   * Used by backend to parse incoming requests
   */
  parseQueryParams(searchParams: URLSearchParams): TagsQueryParams {
    const params: TagsQueryParams = {};
    
    const category = searchParams.get('category');
    if (category) params.category = category as TagCategory;
    
    const popular = searchParams.get('popular');
    if (popular === 'true') params.popular = true;
    
    const minGames = searchParams.get('minGames');
    if (minGames) params.minGames = parseInt(minGames);
    
    const search = searchParams.get('search');
    if (search) params.search = search;
    
    const sort = searchParams.get('sort');
    if (sort) params.sort = sort as 'name' | 'count' | 'az' | 'za';
    
    const page = searchParams.get('page');
    if (page) params.page = parseInt(page);
    
    const pageSize = searchParams.get('pageSize');
    if (pageSize) params.pageSize = parseInt(pageSize);
    
    return params;
  },

  /**
   * Build query string from parameters
   * Used by frontend when building API URLs
   */
  buildQueryString(params: TagsQueryParams): string {
    const searchParams = new URLSearchParams();
    
    if (params.category) searchParams.set('category', params.category);
    if (params.popular !== undefined) searchParams.set('popular', params.popular.toString());
    if (params.minGames) searchParams.set('minGames', params.minGames.toString());
    if (params.search) searchParams.set('search', params.search);
    if (params.sort) searchParams.set('sort', params.sort);
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.pageSize) searchParams.set('pageSize', params.pageSize.toString());
    
    return searchParams.toString();
  },
};