/**
 * Provider API Transformers
 * Transform provider data between API formats and domain entities
 * Shared between frontend and backend
 */

import type { Provider } from '@/lib/core/domain/entities';
import type { ApiProviderResponse, ApiProviderRequest } from '@/lib/core/backend/types/providerTypes';

/**
 * Provider API Transformers
 */
export const providerApiTransformers = {
  /**
   * Transform API response to domain entity
   */
  responseToEntity(apiProvider: ApiProviderResponse): Provider {
    return {
      id: apiProvider.id,
      name: apiProvider.name,
      slug: apiProvider.slug,
      logo: apiProvider.logo,
      gameCount: apiProvider.gameCount,
      description: apiProvider.description,
      website: apiProvider.website,
      isActive: true, // Default to active
      isFeatured: apiProvider.featured,
      createdAt: apiProvider.createdAt ? new Date(apiProvider.createdAt) : undefined,
      updatedAt: apiProvider.updatedAt ? new Date(apiProvider.updatedAt) : undefined,
    };
  },

  /**
   * Transform domain entity to API request
   */
  entityToRequest(provider: Partial<Provider>): ApiProviderRequest {
    const request: ApiProviderRequest = {};
    
    if (provider.name) request.name = provider.name;
    if (provider.logo) request.logo = provider.logo;
    if (provider.website) request.website = provider.website;
    if (provider.description) request.description = provider.description;
    if (provider.isFeatured !== undefined) request.featured = provider.isFeatured;
    
    return request;
  },

  /**
   * Transform API get all providers response to entities
   * Used by frontend when receiving list of providers
   */
  fromApiGetAllProvidersResponse(apiProviders: ApiProviderResponse[]): Provider[] {
    return apiProviders.map(provider => providerApiTransformers.responseToEntity(provider));
  },

  /**
   * Build query parameters from filters
   * Used when making API requests
   */
  buildQueryParams(filters: {
    search?: string;
    featured?: boolean;
    popular?: boolean;
    page?: number;
    pageSize?: number;
  }): URLSearchParams {
    const params = new URLSearchParams();
    
    if (filters.search) params.set('search', filters.search);
    if (filters.featured !== undefined) params.set('featured', filters.featured.toString());
    if (filters.popular !== undefined) params.set('popular', filters.popular.toString());
    if (filters.page) params.set('page', filters.page.toString());
    if (filters.pageSize) params.set('pageSize', filters.pageSize.toString());
    
    return params;
  },

  /**
   * Parse query parameters from URL
   * Used when processing API requests
   */
  parseQueryParams(params: URLSearchParams): {
    search?: string;
    featured?: boolean;
    popular?: boolean;
    page?: number;
    pageSize?: number;
  } {
    const filters: {
      search?: string;
      featured?: boolean;
      popular?: boolean;
      page?: number;
      pageSize?: number;
    } = {};
    
    const search = params.get('search');
    if (search) filters.search = search;
    
    const featured = params.get('featured');
    if (featured) filters.featured = featured === 'true';
    
    const popular = params.get('popular');
    if (popular) filters.popular = popular === 'true';
    
    const page = params.get('page');
    if (page) filters.page = parseInt(page, 10);
    
    const pageSize = params.get('pageSize');
    if (pageSize) filters.pageSize = parseInt(pageSize, 10);
    
    return filters;
  },
};