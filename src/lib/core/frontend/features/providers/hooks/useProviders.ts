/**
 * Providers Business Logic Hook
 * Orchestrates provider-related operations
 */

import { useMemo } from 'react';
import { useProvidersQuery } from '@/lib/core/frontend/api/providers/hooks';
import { useProvidersStore, useProvidersData, useProvidersSearch } from '@/lib/core/frontend/stores/providers/useProvidersStore';
import type { StoreProvider } from '@/lib/core/frontend/stores/types';
import { useDebounce } from "@/lib/core/frontend/hooks";

/**
 * Main hook for provider functionality
 */
export function useProviders() {
  // Store state
  const { providers, featuredProviders, popularProviders } = useProvidersData();
  const { searchQuery, setSearchQuery } = useProvidersSearch();
  
  // Debounced search
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  // Fetch providers
  const {
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useProvidersQuery();
  
  // Filter providers based on debounced search
  const searchedProviders = useMemo(() => {
    if (!debouncedSearch) return providers;
    
    const term = debouncedSearch.toLowerCase();
    return providers.filter(provider =>
      provider.name.toLowerCase().includes(term) ||
      provider.description?.toLowerCase().includes(term)
    );
  }, [providers, debouncedSearch]);
  
  // Group providers by category
  const groupedProviders = useMemo(() => {
    return {
      all: providers,
      featured: featuredProviders,
      popular: popularProviders,
      searched: searchedProviders,
      byGameCount: [...providers].sort((a, b) => 
        b.stats.gameCount - a.stats.gameCount
      ),
      alphabetical: [...providers].sort((a, b) => 
        a.name.localeCompare(b.name)
      ),
    };
  }, [providers, featuredProviders, popularProviders, searchedProviders]);
  
  return {
    // Provider data
    providers: searchedProviders,
    groupedProviders,
    totalProviders: providers.length,
    
    // Search
    searchQuery,
    onSearchChange: setSearchQuery,
    
    // Actions
    onRefresh: refetch,
    
    // Loading states
    isLoading,
    isFetching,
    isError,
    error,
  };
}

/**
 * Hook for managing a single provider
 */
export function useProvider(providerId: string) {
  const provider = useProvidersStore(state => state.getProviderById(providerId));
  const updateProvider = useProvidersStore(state => state.updateProvider);
  const toggleFeatured = useProvidersStore(state => state.toggleFeatured);
  const togglePopular = useProvidersStore(state => state.togglePopular);
  
  return {
    provider,
    onUpdate: (updates: Partial<StoreProvider>) => {
      if (!provider) return;
      updateProvider(providerId, updates);
    },
    onToggleFeatured: () => toggleFeatured(providerId),
    onTogglePopular: () => togglePopular(providerId),
  };
}

/**
 * Hook for provider selection and modal state
 */
export function useProviderSelection() {
  const selectedProviderId = useProvidersStore(state => state.selectedProviderId);
  const isProviderModalOpen = useProvidersStore(state => state.isProviderModalOpen);
  const selectProvider = useProvidersStore(state => state.selectProvider);
  const openProviderModal = useProvidersStore(state => state.openProviderModal);
  const closeProviderModal = useProvidersStore(state => state.closeProviderModal);
  
  const selectedProvider = useProvidersStore(state =>
    selectedProviderId ? state.getProviderById(selectedProviderId) : undefined
  );
  
  return {
    selectedProvider,
    selectedProviderId,
    isModalOpen: isProviderModalOpen,
    onSelectProvider: selectProvider,
    onOpenModal: openProviderModal,
    onCloseModal: closeProviderModal,
  };
}