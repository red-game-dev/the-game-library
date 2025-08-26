/**
 * Tag Entity Transformers
 * Backend-specific transformers for tag entities
 * Used for database operations and business logic
 */

import type { Tag } from '@/lib/core/domain/entities';
import { 
  categorizeTag,
  formatTagDisplay,
} from '@/lib/core/shared/constants/tags.constants';
import type { 
  ApiTagResponse,
} from '@/lib/core/backend/types/tagTypes';
import { slugify } from '@/lib/core/shared/utils';


/**
 * Tag Entity Transformers
 */
export const tagEntityTransformers = {
  /**
   * Create a tag entity
   */
  create(data: Partial<Tag>): Tag {
    const name = data.name || '';
    const slug = data.slug || slugify(name);
    
    return {
      id: data.id || `tag_${slug}`,
      name: formatTagDisplay(name),
      slug,
      count: data.count || 0,
    };
  },

  /**
   * Transform API response to domain entity
   */
  fromApi(apiResponse: ApiTagResponse): Tag {
    return tagEntityTransformers.create({
      id: apiResponse.id,
      name: apiResponse.name,
      slug: apiResponse.slug,
      count: apiResponse.count,
    });
  },

  /**
   * Transform domain entity to API response
   */
  toApi(tag: Tag, includeGames: boolean = false): ApiTagResponse {
    return {
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      count: tag.count || 0,
      category: categorizeTag(tag.name),
      ...(includeGames && { games: [] }), // Would be populated from service
    };
  },

  /**
   * Transform entities to API get all tags response
   */
  toApiGetAllTagsResponse(tags: Tag[], includeGames: boolean = false): ApiTagResponse[] {
    return tags.map(tag => tagEntityTransformers.toApi(tag, includeGames));
  },

  /**
   * Transform API get all tags response to entities
   */
  fromApiGetAllTagsResponse(apiResponses: ApiTagResponse[]): Tag[] {
    return apiResponses.map(response => tagEntityTransformers.fromApi(response));
  },
};