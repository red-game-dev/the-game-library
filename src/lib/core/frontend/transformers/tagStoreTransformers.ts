/**
 * Tag Store Transformers
 * Transform tag data between domain entities and store state
 * Frontend-specific transformers for state management
 */

import type { Tag } from '@/lib/core/domain/entities';
import type { StoreTag } from '@/lib/core/frontend/stores/types';
import { 
  categorizeTag as categorizeTagFromConstants,
} from '@/lib/core/shared/constants/tags.constants';

/**
 * Tag Store Transformers
 */
export const tagStoreTransformers = {
  /**
   * Transform single tag from API response to store format
   * Used when storing a single tag in frontend state
   */
  fromTagApiToStoreTag(tag: Tag): StoreTag {
    return {
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      category: categorizeTagFromConstants(tag.name),
      stats: {
        gameCount: tag.count || 0,
        isPopular: (tag.count || 0) >= 5,
        isTrending: false, // Could be calculated based on recent usage
      },
      timestamps: {
        created: new Date(),
        updated: new Date(),
      },
    };
  },


  /**
   * Transform tags list from API response to store format
   * Used when storing multiple tags from getAllTags API
   */
  fromAllTagsApiToStoreTags(tags: Tag[]): StoreTag[] {
    return tags.map(tag => tagStoreTransformers.fromTagApiToStoreTag(tag));
  },
};