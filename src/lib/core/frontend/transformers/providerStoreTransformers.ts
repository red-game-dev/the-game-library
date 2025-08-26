/**
 * Provider Store Transformers
 * Transform provider data between domain entities and store state
 * Frontend-specific transformers for state management
 */

import type { Provider } from '@/lib/core/domain/entities';
import type { StoreProvider } from '@/lib/core/frontend/stores/types';

/**
 * Provider Store Transformers
 */
export const providerStoreTransformers = {
  /**
   * Transform single provider from API response to store format
   * Used when storing a single provider in frontend state
   */
  fromProviderApiToStoreProvider(provider: Provider): StoreProvider {
    return {
      id: provider.id,
      name: provider.name,
      slug: provider.slug || provider.id,
      logo: provider.logo,
      website: provider.website,
      description: provider.description,
      stats: {
        gameCount: provider.gameCount || 0,
        isFeatured: provider.isFeatured || false,
        isPopular: false, // Not in domain model, default to false
      },
      timestamps: {
        created: provider.createdAt,
        updated: provider.updatedAt,
      },
    };
  },


  /**
   * Transform providers list from API response to store format
   * Used when storing multiple providers from getAllProviders API
   */
  fromAllProvidersApiToStoreProviders(providers: Provider[]): StoreProvider[] {
    return providers.map(provider => providerStoreTransformers.fromProviderApiToStoreProvider(provider));
  },


  /**
   * Merge updates into existing provider
   */
  mergeUpdates(existing: StoreProvider, updates: Partial<StoreProvider>): StoreProvider {
    return {
      ...existing,
      ...updates,
      stats: {
        ...existing.stats,
        ...updates.stats,
      },
      timestamps: {
        ...existing.timestamps,
        ...updates.timestamps,
      },
    };
  },

};