/**
 * React Query hook for fetching favorites
 */

import { useQuery } from '@tanstack/react-query';
import { fetchFavorites } from '../fetchers/GET';
import { queryKeys } from '../../query/keys';
import { useFavoritesStore } from '@/lib/core/frontend/stores/favorites/useFavoritesStore';

/**
 * Hook to fetch favorite IDs and update store
 * 
 * @example
 * ```typescript
 * const { data, isLoading, error } = useFavoritesQuery();
 * 
 * if (data) {
 *   console.log(data.favoriteIds); // ['game-1', 'game-2']
 *   console.log(data.count); // 2
 * }
 * ```
 */
export function useFavoritesQuery() {
  const setFavorites = useFavoritesStore(state => state.setFavorites);
  const markInitialized = useFavoritesStore(state => state.markInitialized);
  
  return useQuery({
    queryKey: queryKeys.favorites(),
    queryFn: async () => {
      const response = await fetchFavorites();
      
      // Update store with fetched favorites (response is already transformed by fetcher)
      setFavorites(response.favoriteIds);
      markInitialized();
      
      return response;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}