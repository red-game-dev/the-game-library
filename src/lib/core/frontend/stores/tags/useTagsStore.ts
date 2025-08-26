/**
 * @fileoverview Tags store for state management
 * @module lib/core/frontend/stores/tags
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Tag } from '@/lib/core/domain/entities';
import type { TagSource } from '@/lib/core/shared/types/tags';

/**
 * Tag with source information - extends base Tag interface
 */
export interface TagWithSource extends Tag {
  source: TagSource;
  entityCount: number;
}

/**
 * Tags store state interface
 */
export interface TagsState {
  // Data
  tags: Map<string, TagWithSource>;
  tagsBySource: Map<string, Set<string>>;
  selectedTags: Set<string>;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
  
  // Computed values
  get allTags(): TagWithSource[];
  get gameTags(): TagWithSource[];
  get providerTags(): TagWithSource[];
  get popularTags(): TagWithSource[];
  get selectedTagsList(): TagWithSource[];
}

/**
 * Tags store actions interface
 */
export interface TagsActions {
  // Data actions
  setTags: (tags: TagWithSource[], source?: string) => void;
  addTag: (tag: TagWithSource) => void;
  removeTag: (tagId: string) => void;
  updateTag: (tagId: string, updates: Partial<TagWithSource>) => void;
  
  // Selection actions
  selectTag: (tagId: string) => void;
  deselectTag: (tagId: string) => void;
  toggleTag: (tagId: string) => void;
  clearSelectedTags: () => void;
  setSelectedTags: (tagIds: string[]) => void;
  
  // Filter actions
  getTagsBySource: (source: TagSource) => TagWithSource[];
  getTagsByMinCount: (minCount: number) => TagWithSource[];
  searchTags: (query: string) => TagWithSource[];
  
  // UI actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Utility actions
  reset: () => void;
  hydrate: () => void;
}

/**
 * Combined tags store type
 */
export type TagsStore = TagsState & TagsActions;

/**
 * Initial state for tags store
 */
const initialState: Pick<TagsState, 'tags' | 'tagsBySource' | 'selectedTags' | 'isLoading' | 'error' | 'lastUpdated'> = {
  tags: new Map(),
  tagsBySource: new Map(),
  selectedTags: new Set(),
  isLoading: false,
  error: null,
  lastUpdated: null
};

/**
 * Tags store implementation
 */
export const useTagsStore = create<TagsStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        ...initialState,
        
        // Computed getters
        get allTags() {
          return Array.from(get().tags.values());
        },
        
        get gameTags() {
          return Array.from(get().tags.values()).filter(tag => tag.source === 'games');
        },
        
        get providerTags() {
          return Array.from(get().tags.values()).filter(tag => tag.source === 'providers');
        },
        
        get popularTags() {
          return Array.from(get().tags.values())
            .filter(tag => tag.entityCount >= 5)
            .sort((a, b) => b.entityCount - a.entityCount);
        },
        
        get selectedTagsList() {
          const selectedIds = get().selectedTags;
          return Array.from(get().tags.values()).filter(tag => selectedIds.has(tag.id));
        },
        
        // Data actions
        setTags: (tags, source) => set((state) => {
          const newTags = new Map(state.tags);
          const newTagsBySource = new Map(state.tagsBySource);
          
          // Clear existing tags from this source if specified
          if (source) {
            const existingSourceTags = state.tagsBySource.get(source) || new Set();
            existingSourceTags.forEach(tagId => newTags.delete(tagId));
            newTagsBySource.set(source, new Set());
          }
          
          // Add new tags
          tags.forEach(tag => {
            newTags.set(tag.id, tag);
            
            if (source) {
              const sourceTags = newTagsBySource.get(source) || new Set();
              sourceTags.add(tag.id);
              newTagsBySource.set(source, sourceTags);
            }
          });
          
          return {
            tags: newTags,
            tagsBySource: newTagsBySource,
            lastUpdated: Date.now()
          };
        }),
        
        addTag: (tag) => set((state) => {
          const newTags = new Map(state.tags);
          newTags.set(tag.id, tag);
          
          const newTagsBySource = new Map(state.tagsBySource);
          const sourceTags = newTagsBySource.get(tag.source) || new Set();
          sourceTags.add(tag.id);
          newTagsBySource.set(tag.source, sourceTags);
          
          return {
            tags: newTags,
            tagsBySource: newTagsBySource,
            lastUpdated: Date.now()
          };
        }),
        
        removeTag: (tagId) => set((state) => {
          const newTags = new Map(state.tags);
          const tag = newTags.get(tagId);
          
          if (!tag) return state;
          
          newTags.delete(tagId);
          
          const newTagsBySource = new Map(state.tagsBySource);
          const sourceTags = newTagsBySource.get(tag.source);
          if (sourceTags) {
            sourceTags.delete(tagId);
          }
          
          const newSelectedTags = new Set(state.selectedTags);
          newSelectedTags.delete(tagId);
          
          return {
            tags: newTags,
            tagsBySource: newTagsBySource,
            selectedTags: newSelectedTags,
            lastUpdated: Date.now()
          };
        }),
        
        updateTag: (tagId, updates) => set((state) => {
          const newTags = new Map(state.tags);
          const existingTag = newTags.get(tagId);
          
          if (!existingTag) return state;
          
          newTags.set(tagId, { ...existingTag, ...updates });
          
          return {
            tags: newTags,
            lastUpdated: Date.now()
          };
        }),
        
        // Selection actions
        selectTag: (tagId) => set((state) => {
          const newSelectedTags = new Set(state.selectedTags);
          newSelectedTags.add(tagId);
          
          return { selectedTags: newSelectedTags };
        }),
        
        deselectTag: (tagId) => set((state) => {
          const newSelectedTags = new Set(state.selectedTags);
          newSelectedTags.delete(tagId);
          
          return { selectedTags: newSelectedTags };
        }),
        
        toggleTag: (tagId) => set((state) => {
          const newSelectedTags = new Set(state.selectedTags);
          
          if (newSelectedTags.has(tagId)) {
            newSelectedTags.delete(tagId);
          } else {
            newSelectedTags.add(tagId);
          }
          
          return { selectedTags: newSelectedTags };
        }),
        
        clearSelectedTags: () => set({ selectedTags: new Set() }),
        
        setSelectedTags: (tagIds) => set({ selectedTags: new Set(tagIds) }),
        
        // Filter actions
        getTagsBySource: (source) => {
          if (source === 'all') {
            return Array.from(get().tags.values());
          }
          return Array.from(get().tags.values()).filter(tag => tag.source === source);
        },
        
        getTagsByMinCount: (minCount) => {
          return Array.from(get().tags.values()).filter(tag => tag.entityCount >= minCount);
        },
        
        searchTags: (query) => {
          const normalizedQuery = query.toLowerCase().trim();
          if (!normalizedQuery) return Array.from(get().tags.values());
          
          return Array.from(get().tags.values()).filter(tag =>
            tag.name.toLowerCase().includes(normalizedQuery) ||
            tag.slug.toLowerCase().includes(normalizedQuery)
          );
        },
        
        // UI actions
        setLoading: (loading) => set({ isLoading: loading }),
        
        setError: (error) => set({ error }),
        
        // Utility actions
        reset: () => set(initialState),
        
        hydrate: () => {
          // This would typically load data from an API
          // For now, it's a placeholder
          set({ lastUpdated: Date.now() });
        }
      }),
      {
        name: 'tags-store',
        partialize: (state) => ({
          selectedTags: Array.from(state.selectedTags),
          lastUpdated: state.lastUpdated
        }),
        merge: (persistedState: unknown, currentState) => {
          const persisted = persistedState as { selectedTags?: string[]; lastUpdated?: number | null } | undefined;
          return {
            ...currentState,
            selectedTags: new Set(persisted?.selectedTags || []),
            lastUpdated: persisted?.lastUpdated || null
          };
        }
      }
    ),
    { name: 'TagsStore' }
  )
);

/**
 * Selector hooks for common operations
 */
export const useAllTags = () => useTagsStore((state) => state.allTags);
export const useGameTags = () => useTagsStore((state) => state.gameTags);
export const useSelectedTags = () => useTagsStore((state) => state.selectedTagsList);
export const usePopularTags = () => useTagsStore((state) => state.popularTags);
export const useTagsLoading = () => useTagsStore((state) => state.isLoading);
export const useTagsError = () => useTagsStore((state) => state.error);