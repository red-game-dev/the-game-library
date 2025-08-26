/**
 * Filter Types
 * Shared filter-related types used across the application
 */

import type { GameType } from '@/lib/core/domain/entities';
import type { SortOption, SearchType } from '@/lib/core/domain/models';

/**
 * Filter parameters that can be stored in URL query strings
 * Used for maintaining filter state across navigation
 * 
 * Note: We use isNew, isHot, isComingSoon as the standard naming convention
 * The shortened versions (new, hot, coming) are only used in URL parameters
 */
export interface FilterQueryParams {
  search?: string;
  searchType?: SearchType;
  providers?: string[];
  types?: GameType[];
  tags?: string[];
  sort?: SortOption;
  favorites?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  isComingSoon?: boolean;
  page?: number;
  pageSize?: number;
  view?: 'grid' | 'compact';
  // RTP (Return to Player) filters
  minRtp?: number;
  maxRtp?: number;
}

/**
 * Extended filter parameters for advanced filtering
 * Includes search type for context-aware searching
 */
export interface ExtendedFilterParams extends FilterQueryParams {
  searchType?: SearchType;
}

/**
 * Filter state for UI components
 * Used by FilterPanel and other filter-related components
 */
export interface FilterState {
  providers?: string[];
  types?: GameType[];
  tags?: string[];
  favorites?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  isComingSoon?: boolean;
  sort?: SortOption;
  viewMode?: 'grid' | 'compact';
  // RTP filters
  minRtp?: number;
  maxRtp?: number;
}

/**
 * Filter summary for display
 */
export interface FilterSummary {
  text: string;
  count: number;
  hasActiveFilters: boolean;
}