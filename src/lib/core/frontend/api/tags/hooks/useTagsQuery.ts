/**
 * React Query hooks for tags
 */

import { useQuery } from '@tanstack/react-query';
import { fetchTags, fetchTopTags, fetchTagById, fetchTagStats } from '../fetchers/GET';
import { tagStoreTransformers } from '@/lib/core/frontend/transformers';
import { useTagsStore } from '@/lib/core/frontend/stores/tags/useTagsStore';
import { queryKeys } from '../../query/keys';
import type { TagCategory, TagSource } from "@/lib/core/shared/types/tags";

/**
 * Hook to fetch all tags and update store
 */
export function useTagsQuery(params?: {
  category?: TagCategory;
  popular?: boolean;
  minGames?: number;
  search?: string;
  sort?: 'name' | 'count' | 'az' | 'za';
  page?: number;
  pageSize?: number;
  source?: TagSource;
}) {
  const setTags = useTagsStore(state => state.setTags);
  const setLoading = useTagsStore(state => state.setLoading);
  
  // Default source to 'games' for backward compatibility
  const source = params?.source || 'games';
  
  return useQuery({
    queryKey: queryKeys.tags.list(params),
    queryFn: async () => {
      setLoading(true);
      const response = await fetchTags(params);
      
      // Transform tags to store format with proper source and entity count
      const transformedTags = response.tags.map(tag => ({
        ...tagStoreTransformers.fromTagApiToStoreTag(tag),
        source: source as TagSource,
        entityCount: tag.count || 0
      }));
      
      // Update store with fetched data
      setTags(transformedTags, source as TagSource);
      setLoading(false);
      
      return response.tags;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch top tags
 */
export function useTopTagsQuery(limit: number = 10) {
  return useQuery({
    queryKey: queryKeys.tags.top(limit),
    queryFn: () => fetchTopTags(limit),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch tag by ID
 */
export function useTagQuery(id: string, options?: {
  includeGames?: boolean;
  includeRelated?: boolean;
  relatedLimit?: number;
}) {
  return useQuery({
    queryKey: queryKeys.tags.detail(id),
    queryFn: () => fetchTagById(id, options),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch tag statistics
 */
export function useTagStatsQuery() {
  return useQuery({
    queryKey: queryKeys.tags.stats(),
    queryFn: () => fetchTagStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}