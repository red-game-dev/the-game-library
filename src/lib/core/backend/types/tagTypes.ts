/**
 * Tag API Types
 * Types for tag API requests and responses
 */

import type { TagCategory } from "@/lib/core/shared/types";

/**
 * API Tag Response format
 * What the backend API returns
 */
export interface ApiTagResponse {
  id: string;
  name: string;
  slug: string;
  count: number;
  category?: TagCategory;
  featured?: boolean;
  games?: string[];
  relatedTags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * API Tag Request format
 * What we send to the backend API
 */
export interface ApiTagRequest {
  name?: string;
  featured?: boolean;
}

/**
 * Tags list API response
 */
export interface ApiTagsResponse {
  data: ApiTagResponse[];
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
  meta?: {
    totalCount?: number;
    categories?: Record<TagCategory, number>;
  };
}

/**
 * Tag statistics response
 */
export interface ApiTagStatsResponse {
  totalTags: number;
  totalGames: number;
  categoryCounts: Record<TagCategory, number>;
  popularTags: ApiTagResponse[];
  recentTags: ApiTagResponse[];
}

/**
 * Query parameters for tags endpoint
 */
export interface TagsQueryParams {
  category?: TagCategory;
  popular?: boolean;
  minGames?: number;
  search?: string;
  sort?: 'name' | 'count' | 'az' | 'za';
  page?: number;
  pageSize?: number;
  includeGames?: boolean;
  includeRelated?: boolean;
}