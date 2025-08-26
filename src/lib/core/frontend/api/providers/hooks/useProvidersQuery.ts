/**
 * Providers Query Hook
 * Simple React Query wrapper that fetches providers and updates the store
 */

import { useQuery } from '@tanstack/react-query';
import { fetchProviders } from '../fetchers/GET';
import { queryKeys } from '../../query/keys';

/**
 * Hook to fetch providers with React Query
 * Store updates are handled in the fetcher to prevent unnecessary re-renders
 */
export function useProvidersQuery() {
  return useQuery({
    queryKey: queryKeys.providers.all,
    queryFn: () => fetchProviders(),
    staleTime: 1000 * 60 * 30, // 30 minutes (providers rarely change)
    gcTime: 1000 * 60 * 60, // 1 hour
  });
}