/**
 * Tags Store Types
 * Type definitions for the tags store
 */

import type { StoreTag } from '../types';
import type { TagCategory } from '@/lib/core/shared/types';

/**
 * Tag with extended store information
 */
export interface StoreTagWithMeta extends StoreTag {
  source: 'games' | 'providers' | 'all';
  entityCount: number;
  category?: TagCategory;
  featured?: boolean;
}

/**
 * Tags store state interface
 */
export interface TagsState {
  // Tag data
  tags: Map<string, StoreTagWithMeta>;
  tagsBySource: Map<string, Set<string>>;
  tagsByCategory: Map<TagCategory, Set<string>>;
  featuredTags: string[];
  selectedTags: Set<string>;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  lastUpdated: number | null;
  
  // Computed properties
  get allTags(): StoreTagWithMeta[];
  get gameTags(): StoreTagWithMeta[];
  get providerTags(): StoreTagWithMeta[];
  get popularTags(): StoreTagWithMeta[];
  get selectedTagsList(): StoreTagWithMeta[];
  getTagById: (tagId: string) => StoreTagWithMeta | undefined;
  getTagsByCategory: (category: TagCategory) => StoreTagWithMeta[];
  getFeaturedTags: () => StoreTagWithMeta[];
  getFilteredTags: (query?: string) => StoreTagWithMeta[];
  
  // Tag data actions
  setTags: (tags: StoreTagWithMeta[], source?: string) => void;
  updateTag: (tagId: string, updates: Partial<StoreTagWithMeta>) => void;
  addTag: (tag: StoreTagWithMeta) => void;
  removeTag: (tagId: string) => void;
  clearTags: () => void;
  
  // Selection actions
  selectTag: (tagId: string) => void;
  deselectTag: (tagId: string) => void;
  toggleTag: (tagId: string) => void;
  clearSelectedTags: () => void;
  setSelectedTags: (tagIds: string[]) => void;
  
  // UI actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  
  // Feature actions
  toggleFeatured: (tagId: string) => void;
  setFeaturedTags: (tagIds: string[]) => void;
  
  // Filter actions
  getTagsBySource: (source: 'games' | 'providers' | 'all') => StoreTagWithMeta[];
  getTagsByMinCount: (minCount: number) => StoreTagWithMeta[];
  searchTags: (query: string) => StoreTagWithMeta[];
  
  // Utility actions
  reset: () => void;
  hydrate: () => void;
}