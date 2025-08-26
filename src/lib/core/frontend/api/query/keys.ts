/**
 * React Query Keys Factory
 * Centralized query key management for type safety and consistency
 */

import type { FilterQueryParams } from '@/lib/core/shared/types/filters';

/**
 * Query keys factory for React Query
 * Follows the recommended hierarchical key structure
 */
export const queryKeys = {
  // Games queries
  games: {
    all: ['games'] as const,
    lists: () => [...queryKeys.games.all, 'list'] as const,
    list: (criteria: FilterQueryParams) => {
      // Create a stable key by explicitly including all properties
      // This ensures React Query detects changes even when values are false
      const stableCriteria = {
        search: criteria.search || '',
        providers: criteria.providers || [],
        types: criteria.types || [],
        tags: criteria.tags || [],
        sort: criteria.sort || 'popular',
        favorites: criteria.favorites === true,
        isNew: criteria.isNew === true,
        isHot: criteria.isHot === true,
        isComingSoon: criteria.isComingSoon === true,
        page: criteria.page || 1,
        pageSize: criteria.pageSize || 20,
        minRtp: criteria.minRtp,
        maxRtp: criteria.maxRtp,
      };
      return [...queryKeys.games.lists(), stableCriteria] as const;
    },
    details: () => [...queryKeys.games.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.games.details(), id] as const,
    favorites: () => [...queryKeys.games.all, 'favorites'] as const,
  },
  
  // Providers queries
  providers: {
    all: ['providers'] as const,
    lists: () => [...queryKeys.providers.all, 'list'] as const,
    list: (filter?: { search?: string }) => [...queryKeys.providers.lists(), filter] as const,
    details: () => [...queryKeys.providers.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.providers.details(), id] as const,
  },
  
  // Tags queries
  tags: {
    all: ['tags'] as const,
    lists: () => [...queryKeys.tags.all, 'list'] as const,
    list: (params?: {
      category?: 'feature' | 'theme' | 'mechanic' | 'style';
      popular?: boolean;
      minGames?: number;
      search?: string;
      sort?: 'name' | 'count' | 'az' | 'za';
      page?: number;
      pageSize?: number;
    }) => [...queryKeys.tags.lists(), params] as const,
    details: () => [...queryKeys.tags.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.tags.details(), id] as const,
    top: (limit: number) => [...queryKeys.tags.all, 'top', limit] as const,
    stats: () => [...queryKeys.tags.all, 'stats'] as const,
  },
  
  // User queries
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
    preferences: () => [...queryKeys.user.all, 'preferences'] as const,
    favorites: () => [...queryKeys.user.all, 'favorites'] as const,
  },
  
  // Favorites queries (type-agnostic, supports game/tag/provider)
  favorites: () => ['favorites'] as const,
} as const;

export type QueryKeys = typeof queryKeys;