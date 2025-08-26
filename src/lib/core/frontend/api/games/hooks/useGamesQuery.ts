/**
 * Games Query Hook
 * Simple React Query wrapper that fetches games and updates the store
 */

import { useQuery } from '@tanstack/react-query';
import { fetchGames } from '../fetchers/GET';
import { queryKeys } from '../../query/keys';
import type { FilterQueryParams } from '@/lib/core/shared/types/filters';

/**
 * Hook to fetch games with React Query
 * Store updates are handled in the fetcher to prevent unnecessary re-renders
 */
export function useGamesQuery(criteria: FilterQueryParams) {
  return useQuery({
    queryKey: queryKeys.games.list(criteria),
    queryFn: () => fetchGames(criteria),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
}