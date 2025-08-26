/**
 * This file is maintained for backward compatibility only
 */

import type { FilterQueryParams } from '@/lib/core/shared/types';
import { parseFilterParams, buildFilterParams } from '@/lib/core/shared/utils';
import { DEFAULT_PAGE_SIZE } from '@/lib/core/config/constants/app.constants';

export type SortOption = 'popular' | 'new' | 'az' | 'za' | 'rating';
export type SearchType = 'all' | 'games' | 'providers' | 'tags';

/**
 * Default filter values
 */
export const DEFAULT_SEARCH_CRITERIA: FilterQueryParams = {
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  sort: "popular",
};

/**
 * @deprecated Use parseFilterParams/buildFilterParams from @/lib/core/shared/utils instead
 * Create a normalized filter object with defaults
 */
export function createSearchCriteria(criteria: Partial<FilterQueryParams> = {}): FilterQueryParams {
  return {
    ...DEFAULT_SEARCH_CRITERIA,
    ...criteria,
    // Ensure arrays are not undefined
    providers: criteria.providers || [],
    types: criteria.types || [],
    tags: criteria.tags || []
  };
}

/**
 * @deprecated Use hasActiveFilters from @/lib/core/shared/utils instead
 * Check if filters are empty (no filtering applied)
 */
export function isSearchEmpty(criteria: FilterQueryParams): boolean {
  return (
    !criteria.search &&
    (!criteria.providers || criteria.providers.length === 0) &&
    (!criteria.types || criteria.types.length === 0) &&
    !criteria.favorites &&
    (!criteria.tags || criteria.tags.length === 0) &&
    criteria.minRtp === undefined &&
    criteria.maxRtp === undefined &&
    !criteria.isNew &&
    !criteria.isHot &&
    !criteria.isComingSoon
  );
}

/**
 * @deprecated Use buildFilterParams from @/lib/core/shared/utils instead
 * Serialize filters to URL query string
 */
export function serializeSearchCriteria(criteria: FilterQueryParams): string {
  const params = buildFilterParams(criteria);
  return params.toString();
}

/**
 * @deprecated Use parseFilterParams from @/lib/core/shared/utils instead
 * Parse filters from URL query string
 */
export function parseSearchCriteria(queryString: string): FilterQueryParams {
  const params = new URLSearchParams(queryString);
  return parseFilterParams(params);
}