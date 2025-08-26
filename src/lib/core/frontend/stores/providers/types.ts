/**
 * Providers Store Types
 * Type definitions for the providers store
 */

import type { StoreProvider } from '../types';

/**
 * Providers store state interface
 */
export interface ProvidersState {
  // Provider data
  providers: StoreProvider[];
  providersMap: Map<string, StoreProvider>;
  featuredProviders: string[];
  popularProviders: string[];
  
  // UI state
  selectedProviderId: string | null;
  isProviderModalOpen: boolean;
  searchQuery: string;
  
  // Computed properties
  getProviderById: (providerId: string) => StoreProvider | undefined;
  getFeaturedProviders: () => StoreProvider[];
  getPopularProviders: () => StoreProvider[];
  getFilteredProviders: (query?: string) => StoreProvider[];
  
  // Provider data actions
  setProviders: (providers: StoreProvider[]) => void;
  updateProvider: (providerId: string, updates: Partial<StoreProvider>) => void;
  addProvider: (provider: StoreProvider) => void;
  removeProvider: (providerId: string) => void;
  clearProviders: () => void;
  
  // UI actions
  selectProvider: (providerId: string | null) => void;
  openProviderModal: (providerId: string) => void;
  closeProviderModal: () => void;
  setSearchQuery: (query: string) => void;
  
  // Feature actions
  toggleFeatured: (providerId: string) => void;
  togglePopular: (providerId: string) => void;
  setFeaturedProviders: (providerIds: string[]) => void;
  setPopularProviders: (providerIds: string[]) => void;
}