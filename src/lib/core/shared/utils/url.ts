/**
 * URL utility functions for managing query parameters
 * Handles filter state serialization/deserialization
 */

import type { FilterQueryParams } from '@/lib/core/shared/types';
import type { GameType } from '@/lib/core/domain/entities';
import type { SearchType, SortOption } from '@/lib/core/domain/models';

/**
 * Parse URL search params into filter object
 */
export function parseFilterParams(searchParams: URLSearchParams): FilterQueryParams {
  const params: FilterQueryParams = {};

  // Search query - support both 'q' and 'search'
  const search = searchParams.get('q') || searchParams.get('search');
  if (search) {
    params.search = search;
  }

  // Search type
  const searchType = searchParams.get('searchType');
  if (searchType) {
    params.searchType = searchType as SearchType;
  }

  // Providers (comma-separated)
  const providers = searchParams.get('providers');
  if (providers) {
    params.providers = providers.split(',').filter(Boolean);
  }

  // Types (comma-separated)
  const types = searchParams.get('types');
  if (types) {
    params.types = types.split(',').filter(Boolean) as GameType[];
  }

  // Tags (comma-separated)
  const tags = searchParams.get('tags');
  if (tags) {
    params.tags = tags.split(',').filter(Boolean);
  }

  // Sort
  const sort = searchParams.get('sort');
  if (sort) {
    params.sort = sort as SortOption;
  }

  // Boolean filters - URL uses short names, internal uses long names
  if (searchParams.get('favorites') === 'true') {
    params.favorites = true;
  }
  if (searchParams.get('new') === 'true') {
    params.isNew = true;
  }
  if (searchParams.get('hot') === 'true') {
    params.isHot = true;
  }
  if (searchParams.get('coming') === 'true') {
    params.isComingSoon = true;
  }

  // RTP filters
  const minRtp = searchParams.get('minRtp');
  if (minRtp) {
    const value = parseFloat(minRtp);
    if (!isNaN(value)) {
      params.minRtp = value;
    }
  }

  const maxRtp = searchParams.get('maxRtp');
  if (maxRtp) {
    const value = parseFloat(maxRtp);
    if (!isNaN(value)) {
      params.maxRtp = value;
    }
  }

  // Pagination
  const page = searchParams.get('page');
  if (page) {
    const pageNum = parseInt(page, 10);
    if (!isNaN(pageNum) && pageNum > 0) {
      params.page = pageNum;
    }
  }

  const pageSize = searchParams.get('pageSize');
  if (pageSize) {
    const size = parseInt(pageSize, 10);
    if (!isNaN(size) && size > 0 && size <= 100) {
      params.pageSize = size;
    }
  }

  // View mode
  const view = searchParams.get('view');
  if (view === 'grid' || view === 'compact') {
    params.view = view;
  }

  return params;
}

/**
 * Convert filter object to URL search params
 */
export function buildFilterParams(filters: FilterQueryParams): URLSearchParams {
  const params = new URLSearchParams();

  // Search query
  if (filters.search) {
    params.set('q', filters.search);
  }

  // Search type
  if (filters.searchType && filters.searchType !== 'all') {
    params.set('searchType', filters.searchType);
  }

  // Providers
  if (filters.providers && filters.providers.length > 0) {
    params.set('providers', filters.providers.join(','));
  }

  // Types
  if (filters.types && filters.types.length > 0) {
    params.set('types', filters.types.join(','));
  }

  // Tags
  if (filters.tags && filters.tags.length > 0) {
    params.set('tags', filters.tags.join(','));
  }

  // Sort
  if (filters.sort && filters.sort !== 'popular') {
    params.set('sort', filters.sort);
  }

  // Boolean filters - internal uses long names, URL uses short names
  if (filters.favorites) {
    params.set('favorites', 'true');
  }
  if (filters.isNew) {
    params.set('new', 'true');
  }
  if (filters.isHot) {
    params.set('hot', 'true');
  }
  if (filters.isComingSoon) {
    params.set('coming', 'true');
  }

  // RTP filters
  if (filters.minRtp !== undefined) {
    params.set('minRtp', filters.minRtp.toString());
  }
  if (filters.maxRtp !== undefined) {
    params.set('maxRtp', filters.maxRtp.toString());
  }

  // Pagination
  if (filters.page && filters.page > 1) {
    params.set('page', filters.page.toString());
  }
  if (filters.pageSize && filters.pageSize !== 20) {
    params.set('pageSize', filters.pageSize.toString());
  }

  // View mode
  if (filters.view && filters.view !== 'grid') {
    params.set('view', filters.view);
  }

  return params;
}

/**
 * Router interface for URL updates
 */
export interface URLRouter {
  push: (url: string, options?: { scroll?: boolean }) => void;
}

/**
 * Update URL with new filter params without page reload
 */
export function updateURLWithFilters(
  filters: FilterQueryParams,
  router: URLRouter
) {
  const params = buildFilterParams(filters);
  const queryString = params.toString();
  const url = queryString ? `/games?${queryString}` : '/games';
  
  router.push(url, { scroll: false });
}

/**
 * Merge new filters with existing URL params
 */
export function mergeFilterParams(
  currentParams: URLSearchParams,
  updates: Partial<FilterQueryParams>
): URLSearchParams {
  const current = parseFilterParams(currentParams);
  const merged = { ...current, ...updates };
  
  // Remove undefined values
  Object.keys(merged).forEach(key => {
    if (merged[key as keyof FilterQueryParams] === undefined) {
      delete merged[key as keyof FilterQueryParams];
    }
  });
  
  return buildFilterParams(merged);
}

/**
 * Check if any filters are active
 */
export function hasActiveFilters(params: URLSearchParams | FilterQueryParams): boolean {
  // If it's URLSearchParams, parse it first
  const filters = params instanceof URLSearchParams ? parseFilterParams(params) : params;
  
  return !!(
    filters.search ||
    (filters.providers && filters.providers.length > 0) ||
    (filters.types && filters.types.length > 0) ||
    (filters.tags && filters.tags.length > 0) ||
    filters.favorites ||
    filters.isNew ||
    filters.isHot ||
    filters.isComingSoon ||
    filters.minRtp !== undefined ||
    filters.maxRtp !== undefined ||
    (filters.sort && filters.sort !== 'popular')
  );
}

/**
 * Get a shareable URL with current filters
 */
export function getShareableURL(filters: FilterQueryParams): string {
  const params = buildFilterParams(filters);
  const queryString = params.toString();
  const path = queryString ? `/games?${queryString}` : '/games';
  
  // In production, use the actual domain
  const baseURL = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
    
  return `${baseURL}${path}`;
}