/**
 * Provider Entity Transformers
 * Backend-specific transformers for provider entities
 * Used for database operations and business logic
 */

import type { Provider } from '@/lib/core/domain/entities';
import { createProvider } from '@/lib/core/domain/entities';
import type { 
  ApiProviderResponse,
} from '@/lib/core/backend/types/providerTypes';

/**
 * Provider Entity Transformers
 */
export const providerEntityTransformers = {

  /**
   * Transform API response to domain entity
   */
  fromApi(apiResponse: ApiProviderResponse): Provider {
    return createProvider({
      id: apiResponse.id,
      name: apiResponse.name,
      slug: apiResponse.slug,
      logo: apiResponse.logo,
      website: apiResponse.website,
      description: apiResponse.description,
      gameCount: apiResponse.gameCount,
      isFeatured: apiResponse.featured,
      isActive: true, // Default to active
    });
  },

  /**
   * Transform domain entity to API response
   */
  toApi(provider: Provider): ApiProviderResponse {
    return {
      id: provider.id,
      name: provider.name,
      slug: provider.slug,
      logo: provider.logo,
      website: provider.website,
      description: provider.description,
      gameCount: provider.gameCount,
      featured: provider.isFeatured,
      popular: (provider.gameCount || 0) >= 10,
      createdAt: provider.createdAt?.toISOString(),
      updatedAt: provider.updatedAt?.toISOString(),
    };
  },

  /**
   * Transform entities to API get all providers response
   */
  toApiGetAllProvidersResponse(providers: Provider[]): ApiProviderResponse[] {
    return providers.map(provider => providerEntityTransformers.toApi(provider));
  },

  /**
   * Transform API get all providers response to entities
   */
  fromApiGetAllProvidersResponse(apiResponses: ApiProviderResponse[]): Provider[] {
    return apiResponses.map(response => providerEntityTransformers.fromApi(response));
  },
};