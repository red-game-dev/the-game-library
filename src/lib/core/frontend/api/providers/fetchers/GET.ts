/**
 * Provider API GET fetchers
 * All GET request handlers for providers endpoint
 */

import type { Provider } from '@/lib/core/domain/entities';
import type { ApiSuccessResponse } from '@/lib/core/shared/types';
import type { ApiProviderResponse } from '@/lib/core/backend/types/providerTypes';
import { apiClient } from '@/lib/core/frontend/api/client';
import { API_ENDPOINTS } from '@/lib/core/frontend/api/endpoints';
import { ApiError } from '@/lib/core/shared/errors';
import { ErrorCodes } from '@/lib/core/shared/errors/constants';
import { providerApiTransformers } from '@/lib/core/shared/transformers';

/**
 * Fetch all providers with optional filters
 */
export async function fetchProviders(filters?: {
  search?: string;
  featured?: boolean;
  popular?: boolean;
  page?: number;
  pageSize?: number;
}): Promise<Provider[]> {
  try {
    // Transform filters to query params if provided
    let params: Record<string, string | string[] | number | boolean | undefined | null> | undefined;
    if (filters) {
      const queryParams = providerApiTransformers.buildQueryParams(filters);
      params = queryParams.toString() ? Object.fromEntries(queryParams) : undefined;
    }
    
    const result = await apiClient.get<ApiSuccessResponse<ApiProviderResponse[]>>(
      API_ENDPOINTS.PROVIDERS.BASE, 
      params
    );
    
    // Check if response is successful
    if (!result.success) {
      throw new ApiError(
        'API returned an error response',
        ErrorCodes.API_ERROR
      );
    }
    
    // Transform API response to domain entities
    return providerApiTransformers.fromApiGetAllProvidersResponse(result.data as ApiProviderResponse[]);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch providers',
      ErrorCodes.FETCH_PROVIDERS_ERROR
    );
  }
}

/**
 * Fetch provider by ID
 */
export async function fetchProviderById(id: string): Promise<Provider> {
  try {
    const result = await apiClient.get<ApiSuccessResponse<ApiProviderResponse>>(API_ENDPOINTS.PROVIDERS.BY_ID(id));
    
    if (!result.success) {
      throw new ApiError(
        'API returned an error response',
        ErrorCodes.API_ERROR
      );
    }
    
    // Transform API response to domain entity
    return providerApiTransformers.responseToEntity(result.data as ApiProviderResponse);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.statusCode === 404) {
        throw new ApiError(
          `Provider with ID '${id}' not found`,
          ErrorCodes.PROVIDER_NOT_FOUND,
          404
        );
      }
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch provider',
      ErrorCodes.FETCH_PROVIDER_ERROR
    );
  }
}