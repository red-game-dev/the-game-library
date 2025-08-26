/**
 * Favorites Store
 * Manages user's favorite games with backend synchronization
 * Backend handles persistence, store maintains local state for UI
 * Uses favoriteStoreTransformers for all data transformations
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { favoriteStoreTransformers, type StoreFavorite } from '@/lib/core/frontend/transformers';
import { FavoriteType } from '@/lib/core/shared/transformers';

/**
 * Favorites state interface
 */
export interface FavoritesState {
  // State - Using StoreFavorite for metadata support
  favorites: StoreFavorite[];
  isInitialized: boolean;
  
  // Computed
  isFavorite: (gameId: string) => boolean;
  getFavoriteCount: () => number;
  getFavoriteIds: () => string[];
  getFavoritesByType: (type: FavoriteType) => StoreFavorite[];
  
  // Actions
  toggleFavorite: (gameId: string, type?: FavoriteType) => void;
  addFavorite: (gameId: string, type?: FavoriteType) => void;
  removeFavorite: (gameId: string) => void;
  clearFavorites: () => void;
  setFavorites: (ids: string[]) => void;
  setFavoritesWithMetadata: (favorites: StoreFavorite[]) => void;
  markInitialized: () => void;
}

/**
 * Favorites store implementation
 * 
 * This store maintains local state for UI responsiveness.
 * The backend handles persistence through the API.
 * 
 * Flow:
 * 1. On app load, fetch favorites from backend via useFavoritesQuery
 * 2. Store updates are optimistic (immediate UI update)
 * 3. Mutations sync with backend via API calls
 * 4. On error, mutations rollback the optimistic update
 */
export const useFavoritesStore = create<FavoritesState>()(
  devtools(
    (set, get) => ({
      // Initial state - empty until loaded from backend
      favorites: [],
      isInitialized: false,
      
      // Computed properties - using transformers
      isFavorite: (gameId: string) => {
        return favoriteStoreTransformers.hasId(get().favorites, gameId);
      },
      
      getFavoriteCount: () => {
        return get().favorites.length;
      },
      
      getFavoriteIds: () => {
        // Use transformer to extract IDs
        return favoriteStoreTransformers.toIdArray(get().favorites);
      },
      
      getFavoritesByType: (type: FavoriteType) => {
        // Use transformer to filter by type
        return favoriteStoreTransformers.filterByType(get().favorites, type);
      },
      
      // Actions - using transformers for all operations
      toggleFavorite: (gameId: string, type: FavoriteType = FavoriteType.GAME) => {
        set((state) => ({
          favorites: favoriteStoreTransformers.toggleFavorite(state.favorites, gameId, type)
        }));
      },
      
      addFavorite: (gameId: string, type: FavoriteType = FavoriteType.GAME) => {
        set((state) => ({
          favorites: favoriteStoreTransformers.addFavorite(state.favorites, gameId, type)
        }));
      },
      
      removeFavorite: (gameId: string) => {
        set((state) => ({
          favorites: favoriteStoreTransformers.removeFavorite(state.favorites, gameId)
        }));
      },
      
      clearFavorites: () => {
        set({ favorites: [] });
      },
      
      setFavorites: (ids: string[]) => {
        // Transform IDs to store format using transformer
        set({ 
          favorites: favoriteStoreTransformers.fromIdsToStore(ids, FavoriteType.GAME)
        });
      },
      
      setFavoritesWithMetadata: (favorites: StoreFavorite[]) => {
        // Direct set for when we have full metadata
        set({ favorites });
      },
      
      markInitialized: () => {
        set({ isInitialized: true });
      },
    }),
    {
      name: 'favorites-store',
    }
  )
);