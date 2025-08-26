/**
 * Games Store
 * Manages all games-related client state including filters, UI state, and view preferences
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { GamesState } from './types';
import type { StoreGame } from '../types';
import type { PaginationMeta } from '@/lib/core/domain/models';
import { DEFAULT_PAGE_SIZE } from '@/lib/core/config/constants/app.constants';
import { gameStoreTransformers } from '@/lib/core/frontend/transformers';

// Re-export the state interface for convenience
export type { GamesState } from './types';

/**
 * Initial state
 */
const initialState = {
  // Game data
  games: [] as StoreGame[],
  gamesMap: new Map<string, StoreGame>(),
  totalGames: 0,
  paginationMeta: null as PaginationMeta | null,
  
  // View preferences
  viewMode: 'grid' as const,
  isFilterPanelOpen: false,
  isSearchFocused: false,
  
  // Filter state
  filters: {
    search: '',
    selectedProviders: [],
    selectedTypes: [],
    selectedTags: [],
    sortBy: 'popular' as const,
    showFavorites: false,
    showNew: false,
    showHot: false,
    showComingSoon: false,
  },
  
  // Pagination state
  pagination: {
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  
  // UI state
  selectedGameId: null,
  isGameModalOpen: false,
  hoveredGameId: null,
};

/**
 * Games store implementation
 */
export const useGamesStore = create<GamesState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // Computed properties
        getSearchCriteria: () => {
          const state = get();
          return {
            search: state.filters.search,
            providers: state.filters.selectedProviders,
            types: state.filters.selectedTypes,
            tags: state.filters.selectedTags,
            sort: state.filters.sortBy,
            favorites: state.filters.showFavorites || false,
            isNew: state.filters.showNew || false,
            isHot: state.filters.showHot || false,
            isComingSoon: state.filters.showComingSoon || false,
            page: state.pagination.page,
            pageSize: state.pagination.pageSize,
          };
        },
        
        hasActiveFilters: () => {
          const { filters } = get();
          return (
            filters.search !== '' ||
            filters.selectedProviders.length > 0 ||
            filters.selectedTypes.length > 0 ||
            filters.selectedTags.length > 0 ||
            filters.showFavorites ||
            filters.showNew ||
            filters.showHot ||
            filters.showComingSoon
          );
        },
        
        // View actions
        setViewMode: (viewMode) => {
          set({ viewMode }, false, 'setViewMode');
        },
        
        toggleFilterPanel: () => {
          set(state => ({ isFilterPanelOpen: !state.isFilterPanelOpen }), false, 'toggleFilterPanel');
        },
        
        setFilterPanelOpen: (open) => {
          set({ isFilterPanelOpen: open }, false, 'setFilterPanelOpen');
        },
        
        setSearchFocused: (focused) => {
          set({ isSearchFocused: focused }, false, 'setSearchFocused');
        },
        
        // Filter actions
        setSearch: (search) => {
          set(state => ({
            filters: { ...state.filters, search },
            pagination: { ...state.pagination, page: 1 }
          }), false, 'setSearch');
        },
        
        toggleProvider: (providerId) => {
          set(state => {
            const providers = state.filters.selectedProviders.includes(providerId)
              ? state.filters.selectedProviders.filter(id => id !== providerId)
              : [...state.filters.selectedProviders, providerId];
            return {
              filters: { ...state.filters, selectedProviders: providers },
              pagination: { ...state.pagination, page: 1 }
            };
          }, false, 'toggleProvider');
        },
        
        setProviders: (providers) => {
          set(state => ({
            filters: { ...state.filters, selectedProviders: providers },
            pagination: { ...state.pagination, page: 1 }
          }), false, 'setProviders');
        },
        
        clearProviders: () => {
          set(state => ({
            filters: { ...state.filters, selectedProviders: [] },
            pagination: { ...state.pagination, page: 1 }
          }), false, 'clearProviders');
        },
        
        toggleType: (type) => {
          set(state => {
            const types = state.filters.selectedTypes.includes(type)
              ? state.filters.selectedTypes.filter(t => t !== type)
              : [...state.filters.selectedTypes, type];
            return {
              filters: { ...state.filters, selectedTypes: types },
              pagination: { ...state.pagination, page: 1 }
            };
          }, false, 'toggleType');
        },
        
        setTypes: (types) => {
          set(state => ({
            filters: { ...state.filters, selectedTypes: types },
            pagination: { ...state.pagination, page: 1 }
          }), false, 'setTypes');
        },
        
        clearTypes: () => {
          set(state => ({
            filters: { ...state.filters, selectedTypes: [] },
            pagination: { ...state.pagination, page: 1 }
          }), false, 'clearTypes');
        },
        
        toggleTag: (tag) => {
          set(state => {
            const tags = state.filters.selectedTags.includes(tag)
              ? state.filters.selectedTags.filter(t => t !== tag)
              : [...state.filters.selectedTags, tag];
            return {
              filters: { ...state.filters, selectedTags: tags },
              pagination: { ...state.pagination, page: 1 }
            };
          }, false, 'toggleTag');
        },
        
        setTags: (tags) => {
          set(state => ({
            filters: { ...state.filters, selectedTags: tags },
            pagination: { ...state.pagination, page: 1 }
          }), false, 'setTags');
        },
        
        clearTags: () => {
          set(state => ({
            filters: { ...state.filters, selectedTags: [] },
            pagination: { ...state.pagination, page: 1 }
          }), false, 'clearTags');
        },
        
        setSortBy: (sortBy) => {
          set(state => ({
            filters: { ...state.filters, sortBy },
            pagination: { ...state.pagination, page: 1 }
          }), false, 'setSortBy');
        },
        
        toggleFavorites: () => {
          set(state => ({
            filters: { ...state.filters, showFavorites: !state.filters.showFavorites },
            pagination: { ...state.pagination, page: 1 }
          }), false, 'toggleFavorites');
        },
        
        setShowFavorites: (show) => {
          set(state => ({
            filters: { ...state.filters, showFavorites: show },
            pagination: { ...state.pagination, page: 1 }
          }), false, 'setShowFavorites');
        },
        
        toggleNew: () => {
          set(state => ({
            filters: { ...state.filters, showNew: !state.filters.showNew },
            pagination: { ...state.pagination, page: 1 }
          }), false, 'toggleNew');
        },
        
        setShowNew: (show) => {
          set(state => ({
            filters: { ...state.filters, showNew: show },
            pagination: { ...state.pagination, page: 1 }
          }), false, 'setShowNew');
        },
        
        toggleHot: () => {
          set(state => ({
            filters: { ...state.filters, showHot: !state.filters.showHot },
            pagination: { ...state.pagination, page: 1 }
          }), false, 'toggleHot');
        },
        
        setShowHot: (show) => {
          set(state => ({
            filters: { ...state.filters, showHot: show },
            pagination: { ...state.pagination, page: 1 }
          }), false, 'setShowHot');
        },
        
        toggleComingSoon: () => {
          set(state => ({
            filters: { ...state.filters, showComingSoon: !state.filters.showComingSoon },
            pagination: { ...state.pagination, page: 1 }
          }), false, 'toggleComingSoon');
        },
        
        setShowComingSoon: (show) => {
          set(state => ({
            filters: { ...state.filters, showComingSoon: show },
            pagination: { ...state.pagination, page: 1 }
          }), false, 'setShowComingSoon');
        },
        
        setRtpRange: (min, max) => {
          set(state => ({
            filters: { ...state.filters, minRtp: min, maxRtp: max },
            pagination: { ...state.pagination, page: 1 }
          }), false, 'setRtpRange');
        },
        
        resetFilters: () => {
          set(state => ({
            filters: initialState.filters,
            pagination: { ...state.pagination, page: 1 }
          }), false, 'resetFilters');
        },
        
        applyFilters: (filters) => {
          set(state => ({
            filters: { ...state.filters, ...filters },
            pagination: { ...state.pagination, page: 1 }
          }), false, 'applyFilters');
        },
        
        // Pagination actions
        setPage: (page) => {
          set(state => ({
            pagination: { ...state.pagination, page }
          }), false, 'setPage');
        },
        
        setPageSize: (pageSize) => {
          set(state => ({
            pagination: { ...state.pagination, pageSize, page: 1 }
          }), false, 'setPageSize');
        },
        
        resetPagination: () => {
          set(state => ({
            pagination: { ...state.pagination, page: 1 }
          }), false, 'resetPagination');
        },
        
        // UI actions
        selectGame: (gameId) => {
          set({ selectedGameId: gameId }, false, 'selectGame');
        },
        
        openGameModal: (gameId) => {
          set({ selectedGameId: gameId, isGameModalOpen: true }, false, 'openGameModal');
        },
        
        closeGameModal: () => {
          set({ isGameModalOpen: false }, false, 'closeGameModal');
        },
        
        setHoveredGame: (gameId) => {
          set({ hoveredGameId: gameId }, false, 'setHoveredGame');
        },
        
        // Game data actions
        setGames: (games, meta) => {
          const gamesMap = new Map<string, StoreGame>();
          games.forEach(game => gamesMap.set(game.id, game));
          
          set({
            games,
            gamesMap,
            totalGames: meta?.total || games.length,
            paginationMeta: meta || null,
          }, false, 'setGames');
        },
        
        updateGame: (gameId, updates) => {
          set(state => {
            const game = state.gamesMap.get(gameId);
            if (!game) return state;
            
            // Use transformer to properly merge updates
            const updatedGame = gameStoreTransformers.mergeUpdates(game, updates);
            const newGamesMap = new Map(state.gamesMap);
            newGamesMap.set(gameId, updatedGame);
            
            const newGames = state.games.map(g => 
              g.id === gameId ? updatedGame : g
            );
            
            return {
              games: newGames,
              gamesMap: newGamesMap,
            };
          }, false, 'updateGame');
        },
        
        addGames: (newGames) => {
          set(state => {
            const newGamesMap = new Map(state.gamesMap);
            newGames.forEach(game => newGamesMap.set(game.id, game));
            
            const existingIds = new Set(state.games.map(g => g.id));
            const gamesToAdd = newGames.filter(g => !existingIds.has(g.id));
            
            return {
              games: [...state.games, ...gamesToAdd],
              gamesMap: newGamesMap,
              totalGames: state.totalGames + gamesToAdd.length,
            };
          }, false, 'addGames');
        },
        
        removeGame: (gameId) => {
          set(state => {
            const newGamesMap = new Map(state.gamesMap);
            newGamesMap.delete(gameId);
            
            return {
              games: state.games.filter(g => g.id !== gameId),
              gamesMap: newGamesMap,
              totalGames: Math.max(0, state.totalGames - 1),
            };
          }, false, 'removeGame');
        },
        
        clearGames: () => {
          set({
            games: [],
            gamesMap: new Map(),
            totalGames: 0,
            paginationMeta: null,
          }, false, 'clearGames');
        },
        
        getGameById: (gameId) => {
          return get().gamesMap.get(gameId);
        },
        
        toggleGameFavorite: (gameId) => {
          set(state => {
            const game = state.gamesMap.get(gameId);
            if (!game) return state;
            
            const updatedGame = {
              ...game,
              badges: {
                ...game.badges,
                isFavorite: !game.badges.isFavorite,
              },
            };
            
            const newGamesMap = new Map(state.gamesMap);
            newGamesMap.set(gameId, updatedGame);
            
            const newGames = state.games.map(g => 
              g.id === gameId ? updatedGame : g
            );
            
            return {
              games: newGames,
              gamesMap: newGamesMap,
            };
          }, false, 'toggleGameFavorite');
        },
      }),
      {
        name: 'games-store',
        partialize: (state) => ({
          // Only persist user preferences
          viewMode: state.viewMode,
          filters: {
            sortBy: state.filters.sortBy,
            showFavorites: state.filters.showFavorites,
          },
          pagination: {
            pageSize: state.pagination.pageSize,
          },
        }),
        merge: (persistedState: unknown, currentState) => {
          // Type guard for persisted state
          const persisted = persistedState as Partial<GamesState> | undefined;
          // Ensure all filter arrays exist
          return {
            ...currentState,
            ...persisted,
            filters: {
              ...initialState.filters,
              ...(persisted?.filters || {}),
              // Ensure arrays always exist
              selectedProviders: persisted?.filters?.selectedProviders || [],
              selectedTypes: persisted?.filters?.selectedTypes || [],
              selectedTags: persisted?.filters?.selectedTags || [],
            },
          };
        },
      }
    ),
    {
      name: 'GamesStore',
    }
  )
);

// Selector hooks for common use cases
export const useGamesData = () => useGamesStore(state => ({
  games: state.games,
  totalGames: state.totalGames,
  paginationMeta: state.paginationMeta,
}));
export const useGameById = (gameId: string) => useGamesStore(state => state.getGameById(gameId));
export const useGamesViewMode = () => useGamesStore(state => state.viewMode);
export const useGamesFilters = () => useGamesStore(state => state.filters);
export const useGamesPagination = () => useGamesStore(state => state.pagination);
export const useGamesUIState = () => useGamesStore(state => ({
  selectedGameId: state.selectedGameId,
  isGameModalOpen: state.isGameModalOpen,
  hoveredGameId: state.hoveredGameId,
}));