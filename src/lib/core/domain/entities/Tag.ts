/**
 * Tag Entity
 * Represents a tag that can be associated with games, providers, or other entities
 */

/**
 * Base tag interface
 */
export interface Tag {
  id: string;
  name: string;
  slug: string;
  count?: number;
}