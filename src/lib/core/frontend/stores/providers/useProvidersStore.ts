/**
 * Providers Store
 * Manages provider data with efficient lookups and caching
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { ProvidersState } from './types';
import type { StoreProvider } from '../types';
import { providerStoreTransformers } from '@/lib/core/frontend/transformers';

// Re-export the state interface for convenience
export type { ProvidersState } from './types';


/**
 * Initial state
 */
const initialState = {
  // Provider data
  providers: [] as StoreProvider[],
  providersMap: new Map<string, StoreProvider>(),
  featuredProviders: [] as string[],
  popularProviders: [] as string[],
  
  // UI state
  selectedProviderId: null,
  isProviderModalOpen: false,
  searchQuery: '',
};

/**
 * Providers store implementation
 */
export const useProvidersStore = create<ProvidersState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // Computed properties
        getProviderById: (providerId) => {
          return get().providersMap.get(providerId);
        },
        
        getFeaturedProviders: () => {
          const state = get();
          return state.featuredProviders
            .map(id => state.providersMap.get(id))
            .filter((p): p is StoreProvider => p !== undefined);
        },
        
        getPopularProviders: () => {
          const state = get();
          return state.popularProviders
            .map(id => state.providersMap.get(id))
            .filter((p): p is StoreProvider => p !== undefined);
        },
        
        getFilteredProviders: (query) => {
          const state = get();
          const searchTerm = query || state.searchQuery;
          
          if (!searchTerm) return state.providers;
          
          const term = searchTerm.toLowerCase();
          return state.providers.filter(provider =>
            provider.name.toLowerCase().includes(term) ||
            provider.description?.toLowerCase().includes(term)
          );
        },
        
        // Provider data actions
        setProviders: (providers) => {
          const providersMap = new Map<string, StoreProvider>();
          providers.forEach(provider => providersMap.set(provider.id, provider));
          
          // Extract featured and popular providers
          const featuredProviders = providers
            .filter(p => p.stats.isFeatured)
            .map(p => p.id);
          
          const popularProviders = providers
            .filter(p => p.stats.isPopular)
            .map(p => p.id);
          
          set({
            providers,
            providersMap,
            featuredProviders,
            popularProviders,
          }, false, 'setProviders');
        },
        
        updateProvider: (providerId, updates) => {
          set(state => {
            const provider = state.providersMap.get(providerId);
            if (!provider) return state;
            
            // Use transformer to properly merge updates
            const updatedProvider = providerStoreTransformers.mergeUpdates(provider, updates);
            
            const newProvidersMap = new Map(state.providersMap);
            newProvidersMap.set(providerId, updatedProvider);
            
            const newProviders = state.providers.map(p =>
              p.id === providerId ? updatedProvider : p
            );
            
            // Update featured/popular lists if needed
            let { featuredProviders, popularProviders } = state;
            
            if (updates.stats?.isFeatured !== undefined) {
              if (updates.stats.isFeatured) {
                featuredProviders = [...new Set([...featuredProviders, providerId])];
              } else {
                featuredProviders = featuredProviders.filter(id => id !== providerId);
              }
            }
            
            if (updates.stats?.isPopular !== undefined) {
              if (updates.stats.isPopular) {
                popularProviders = [...new Set([...popularProviders, providerId])];
              } else {
                popularProviders = popularProviders.filter(id => id !== providerId);
              }
            }
            
            return {
              providers: newProviders,
              providersMap: newProvidersMap,
              featuredProviders,
              popularProviders,
            };
          }, false, 'updateProvider');
        },
        
        addProvider: (provider) => {
          set(state => {
            if (state.providersMap.has(provider.id)) return state;
            
            const newProvidersMap = new Map(state.providersMap);
            newProvidersMap.set(provider.id, provider);
            
            let { featuredProviders, popularProviders } = state;
            
            if (provider.stats.isFeatured) {
              featuredProviders = [...featuredProviders, provider.id];
            }
            
            if (provider.stats.isPopular) {
              popularProviders = [...popularProviders, provider.id];
            }
            
            return {
              providers: [...state.providers, provider],
              providersMap: newProvidersMap,
              featuredProviders,
              popularProviders,
            };
          }, false, 'addProvider');
        },
        
        removeProvider: (providerId) => {
          set(state => {
            const newProvidersMap = new Map(state.providersMap);
            newProvidersMap.delete(providerId);
            
            return {
              providers: state.providers.filter(p => p.id !== providerId),
              providersMap: newProvidersMap,
              featuredProviders: state.featuredProviders.filter(id => id !== providerId),
              popularProviders: state.popularProviders.filter(id => id !== providerId),
            };
          }, false, 'removeProvider');
        },
        
        clearProviders: () => {
          set({
            providers: [],
            providersMap: new Map(),
            featuredProviders: [],
            popularProviders: [],
          }, false, 'clearProviders');
        },
        
        // UI actions
        selectProvider: (providerId) => {
          set({ selectedProviderId: providerId }, false, 'selectProvider');
        },
        
        openProviderModal: (providerId) => {
          set({
            selectedProviderId: providerId,
            isProviderModalOpen: true,
          }, false, 'openProviderModal');
        },
        
        closeProviderModal: () => {
          set({ isProviderModalOpen: false }, false, 'closeProviderModal');
        },
        
        setSearchQuery: (query) => {
          set({ searchQuery: query }, false, 'setSearchQuery');
        },
        
        // Feature actions
        toggleFeatured: (providerId) => {
          const provider = get().providersMap.get(providerId);
          if (!provider) return;
          
          get().updateProvider(providerId, {
            stats: {
              ...provider.stats,
              isFeatured: !provider.stats.isFeatured,
            },
          });
        },
        
        togglePopular: (providerId) => {
          const provider = get().providersMap.get(providerId);
          if (!provider) return;
          
          get().updateProvider(providerId, {
            stats: {
              ...provider.stats,
              isPopular: !provider.stats.isPopular,
            },
          });
        },
        
        setFeaturedProviders: (providerIds) => {
          set({ featuredProviders: providerIds }, false, 'setFeaturedProviders');
        },
        
        setPopularProviders: (providerIds) => {
          set({ popularProviders: providerIds }, false, 'setPopularProviders');
        },
      }),
      {
        name: 'providers-store',
        partialize: (state) => ({
          // Only persist UI preferences
          searchQuery: state.searchQuery,
        }),
      }
    ),
    {
      name: 'ProvidersStore',
    }
  )
);

// Selector hooks for common use cases
export const useProvidersData = () => useProvidersStore(state => ({
  providers: state.providers,
  featuredProviders: state.getFeaturedProviders(),
  popularProviders: state.getPopularProviders(),
}));

export const useProviderById = (providerId: string) => 
  useProvidersStore(state => state.getProviderById(providerId));

export const useProvidersSearch = () => useProvidersStore(state => ({
  searchQuery: state.searchQuery,
  setSearchQuery: state.setSearchQuery,
  filteredProviders: state.getFilteredProviders(),
}));

export const useProvidersUIState = () => useProvidersStore(state => ({
  selectedProviderId: state.selectedProviderId,
  isProviderModalOpen: state.isProviderModalOpen,
}));