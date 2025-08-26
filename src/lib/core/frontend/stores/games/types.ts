/**
 * Games Store Types
 * Type definitions for the games store
 */

import type { GameType } from '@/lib/core/domain/entities';
import type { PaginationMeta } from '@/lib/core/domain/models';
import type { FilterQueryParams } from '@/lib/core/shared/types/filters';
import type { StoreGame } from '../types';

/**
 * Games store state interface
 */
export interface GamesState {
  // Game data
  games: StoreGame[];
  gamesMap: Map<string, StoreGame>;
  totalGames: number;
  paginationMeta: PaginationMeta | null;
  
  // View preferences
  viewMode: 'grid' | 'carousel';
  isFilterPanelOpen: boolean;
  isSearchFocused: boolean;
  
  // Filter state
  filters: {
    search: string;
    selectedProviders: string[];
    selectedTypes: GameType[];
    selectedTags: string[];
    sortBy: 'popular' | 'new' | 'az' | 'za' | 'rating';
    showFavorites: boolean;
    showNew: boolean;
    showHot: boolean;
    showComingSoon: boolean;
    minRtp?: number;
    maxRtp?: number;
  };
  
  // Pagination state
  pagination: {
    page: number;
    pageSize: number;
  };
  
  // UI state
  selectedGameId: string | null;
  isGameModalOpen: boolean;
  hoveredGameId: string | null;
  
  // Computed properties
  getSearchCriteria: () => FilterQueryParams;
  hasActiveFilters: () => boolean;
  
  // View actions
  setViewMode: (mode: GamesState['viewMode']) => void;
  toggleFilterPanel: () => void;
  setFilterPanelOpen: (open: boolean) => void;
  setSearchFocused: (focused: boolean) => void;
  
  // Filter actions
  setSearch: (search: string) => void;
  toggleProvider: (providerId: string) => void;
  setProviders: (providers: string[]) => void;
  clearProviders: () => void;
  toggleType: (type: GameType) => void;
  setTypes: (types: GameType[]) => void;
  clearTypes: () => void;
  toggleTag: (tag: string) => void;
  setTags: (tags: string[]) => void;
  clearTags: () => void;
  setSortBy: (sort: GamesState['filters']['sortBy']) => void;
  toggleFavorites: () => void;
  setShowFavorites: (show: boolean) => void;
  toggleNew: () => void;
  setShowNew: (show: boolean) => void;
  toggleHot: () => void;
  setShowHot: (show: boolean) => void;
  toggleComingSoon: () => void;
  setShowComingSoon: (show: boolean) => void;
  setRtpRange: (min?: number, max?: number) => void;
  resetFilters: () => void;
  applyFilters: (filters: Partial<GamesState['filters']>) => void;
  
  // Pagination actions
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  resetPagination: () => void;
  
  // UI actions
  selectGame: (gameId: string | null) => void;
  openGameModal: (gameId: string) => void;
  closeGameModal: () => void;
  setHoveredGame: (gameId: string | null) => void;
  
  // Game data actions
  setGames: (games: StoreGame[], meta?: PaginationMeta) => void;
  updateGame: (gameId: string, updates: Partial<StoreGame>) => void;
  addGames: (games: StoreGame[]) => void;
  removeGame: (gameId: string) => void;
  clearGames: () => void;
  getGameById: (gameId: string) => StoreGame | undefined;
  toggleGameFavorite: (gameId: string) => void;
}