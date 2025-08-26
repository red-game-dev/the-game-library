/**
 * Tags API GET fetchers
 * All GET request handlers for tags endpoint
 */

import type { Tag } from '@/lib/core/domain/entities';
import type { ApiTagResponse, ApiTagStatsResponse } from '@/lib/core/backend/types/tagTypes';
import type { ApiSuccessResponse, PaginationMeta } from '@/lib/core/shared/types';
import { tagApiTransformers } from '@/lib/core/shared/transformers';
import { apiClient } from '@/lib/core/frontend/api/client';
import { API_ENDPOINTS } from '@/lib/core/frontend/api/endpoints';
import { ApiError } from '@/lib/core/shared/errors';
import { ErrorCodes } from '@/lib/core/shared/errors/constants';

/**
 * Response type for fetchTags
 */
export interface FetchTagsResponse {
  tags: Tag[];
  pagination?: PaginationMeta;
}

/**
 * Fetch all tags with optional filters
 */
export async function fetchTags(params?: {
  category?: 'feature' | 'theme' | 'mechanic' | 'style';
  popular?: boolean;
  minGames?: number;
  search?: string;
  sort?: 'name' | 'count' | 'az' | 'za';
  page?: number;
  pageSize?: number;
}): Promise<FetchTagsResponse> {
  try {
    // Use transformer to build query params
    const queryString = params ? tagApiTransformers.buildQueryString(params) : '';
    let queryParams: Record<string, string> = {};
    
    if (queryString) {
      queryParams = Object.fromEntries(new URLSearchParams(queryString));
    }
    
    // For filter panel, we want all tags without pagination
    if (!params?.page && !params?.pageSize) {
      queryParams.all = 'true';
    }
    
    const result = await apiClient.get<ApiSuccessResponse<ApiTagResponse[]>>(
      API_ENDPOINTS.TAGS.BASE,
      queryParams
    );
    
    if (!result.success) {
      throw new ApiError(
        'API returned an error response',
        ErrorCodes.API_ERROR
      );
    }
    
    // Transform API responses to domain entities
    const tags = tagApiTransformers.fromApiGetAllTagsResponse(result.data as ApiTagResponse[]);
    
    return {
      tags,
      pagination: result.pagination
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch tags',
      ErrorCodes.API_ERROR
    );
  }
}

/**
 * Fetch top tags by game count
 */
export async function fetchTopTags(limit: number = 10): Promise<Tag[]> {
  const queryParams = {
    top: limit.toString()
  };
  
  try {
    const result = await apiClient.get<ApiSuccessResponse<ApiTagResponse[]>>(
      API_ENDPOINTS.TAGS.BASE,
      queryParams
    );
    
    if (!result.success) {
      throw new ApiError(
        'API returned an error response',
        ErrorCodes.API_ERROR
      );
    }
    
    // Transform API responses to domain entities
    return tagApiTransformers.fromApiGetAllTagsResponse(result.data as ApiTagResponse[]);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch top tags',
      ErrorCodes.API_ERROR
    );
  }
}

/**
 * Fetch tag by ID with optional details
 */
export async function fetchTagById(
  id: string,
  options?: {
    includeGames?: boolean;
    includeRelated?: boolean;
    relatedLimit?: number;
  }
): Promise<Tag> {
  try {
    const queryParams: Record<string, string> = {};
    
    if (options?.includeGames) queryParams.includeGames = 'true';
    if (options?.includeRelated) queryParams.includeRelated = 'true';
    if (options?.relatedLimit) queryParams.relatedLimit = options.relatedLimit.toString();
    
    const result = await apiClient.get<ApiSuccessResponse<ApiTagResponse>>(
      API_ENDPOINTS.TAGS.BY_ID(id),
      queryParams
    );
    
    if (!result.success) {
      throw new ApiError(
        'API returned an error response',
        ErrorCodes.API_ERROR
      );
    }
    
    // Transform API response to domain entity
    return tagApiTransformers.responseToEntity(result.data as ApiTagResponse);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.statusCode === 404) {
        throw new ApiError(
          `Tag with ID '${id}' not found`,
          ErrorCodes.NOT_FOUND,
          404
        );
      }
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch tag',
      ErrorCodes.API_ERROR
    );
  }
}

/**
 * Fetch tag statistics
 */
export async function fetchTagStats(): Promise<ApiTagStatsResponse> {
  try {
    const result = await apiClient.get<ApiSuccessResponse<ApiTagStatsResponse>>(
      API_ENDPOINTS.TAGS.STATS
    );
    
    if (!result.success) {
      throw new ApiError(
        'API returned an error response',
        ErrorCodes.API_ERROR
      );
    }
    
    return result.data as ApiTagStatsResponse;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch tag statistics',
      ErrorCodes.API_ERROR
    );
  }
}

/**
 * Search tags by query
 */
export async function searchTags(query: string): Promise<Tag[]> {
  const response = await fetchTags({ search: query });
  return response.tags;
}