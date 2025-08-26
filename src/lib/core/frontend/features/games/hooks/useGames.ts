/**
 * Games Business Logic Hook
 * Orchestrates game-related operations by combining API calls, store state, and filters
 */

import { useEffect, useMemo } from 'react';
import { useGamesQuery } from '@/lib/core/frontend/api/games/hooks/useGamesQuery';
import { useFavoriteMutation } from '@/lib/core/frontend/api/games/hooks/useFavoriteMutation';
import { useGamesStore, useGamesData, useGamesFilters, useGamesPagination } from '@/lib/core/frontend/stores/games/useGamesStore';
import type { StoreGame } from '@/lib/core/frontend/stores/types';
import { useDebounce } from '@/lib/core/frontend/hooks';

/**
 * Main hook for game library functionality
 * Combines API fetching with store state management
 */
export function useGames() {
  // Store state
  const { games, totalGames, paginationMeta } = useGamesData();
  const filters = useGamesFilters();
  const pagination = useGamesPagination();
  const getSearchCriteria = useGamesStore(state => state.getSearchCriteria);
  const hasActiveFilters = useGamesStore(state => state.hasActiveFilters);
  
  // Store actions
  const setSearch = useGamesStore(state => state.setSearch);
  const toggleProvider = useGamesStore(state => state.toggleProvider);
  const toggleType = useGamesStore(state => state.toggleType);
  const toggleTag = useGamesStore(state => state.toggleTag);
  const setSortBy = useGamesStore(state => state.setSortBy);
  const toggleFavorites = useGamesStore(state => state.toggleFavorites);
  const resetFilters = useGamesStore(state => state.resetFilters);
  const setPage = useGamesStore(state => state.setPage);
  const setPageSize = useGamesStore(state => state.setPageSize);
  
  // Debounced search for better performance
  const debouncedSearch = useDebounce(filters.search, 300);
  
  // Build search criteria with debounced search
  const searchCriteria = useMemo(() => {
    const criteria = getSearchCriteria();
    return {
      ...criteria,
      search: debouncedSearch,
    };
  }, [getSearchCriteria, debouncedSearch]);
  
  // Fetch games with current criteria
  const {
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGamesQuery(searchCriteria);
  
  // Favorite mutation
  const favoriteMutation = useFavoriteMutation();
  
  // Reset to first page when filters change
  useEffect(() => {
    if (pagination.page !== 1) {
      setPage(1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.selectedProviders,
    filters.selectedTypes,
    filters.selectedTags,
    filters.sortBy,
    filters.showFavorites,
    debouncedSearch,
  ]);
  
  // Handler functions
  const handleSearch = (value: string) => {
    setSearch(value);
  };
  
  const handleToggleFavorite = async (gameId: string) => {
    await favoriteMutation.mutateAsync(gameId);
  };
  
  const handleNextPage = () => {
    if (paginationMeta?.hasMore) {
      setPage(pagination.page + 1);
    }
  };
  
  const handlePreviousPage = () => {
    if (paginationMeta?.hasPrevious) {
      setPage(pagination.page - 1);
    }
  };
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= (paginationMeta?.totalPages || 1)) {
      setPage(page);
    }
  };
  
  return {
    // Game data
    games,
    totalGames,
    
    // Pagination
    pagination: {
      ...pagination,
      ...paginationMeta,
      onNextPage: handleNextPage,
      onPreviousPage: handlePreviousPage,
      onPageChange: handlePageChange,
      onPageSizeChange: setPageSize,
    },
    
    // Filters
    filters: {
      ...filters,
      hasActiveFilters: hasActiveFilters(),
      onSearchChange: handleSearch,
      onProviderToggle: toggleProvider,
      onTypeToggle: toggleType,
      onTagToggle: toggleTag,
      onSortChange: setSortBy,
      onFavoritesToggle: toggleFavorites,
      onReset: resetFilters,
    },
    
    // Actions
    onToggleFavorite: handleToggleFavorite,
    onRefresh: refetch,
    
    // Loading states
    isLoading,
    isFetching,
    isError,
    error,
  };
}

/**
 * Hook for managing a single game's state
 */
export function useGame(gameId: string) {
  const game = useGamesStore(state => state.getGameById(gameId));
  const updateGame = useGamesStore(state => state.updateGame);
  const favoriteMutation = useFavoriteMutation();
  
  const handleToggleFavorite = async () => {
    if (!game) return;
    await favoriteMutation.mutateAsync(gameId);
  };
  
  const handleUpdate = (updates: Partial<StoreGame>) => {
    if (!game) return;
    updateGame(gameId, updates);
  };
  
  return {
    game,
    onToggleFavorite: handleToggleFavorite,
    onUpdate: handleUpdate,
    isFavoriteLoading: favoriteMutation.isPending,
  };
}

/**
 * Hook for managing game selection and modal state
 */
export function useGameSelection() {
  const selectedGameId = useGamesStore(state => state.selectedGameId);
  const isGameModalOpen = useGamesStore(state => state.isGameModalOpen);
  const selectGame = useGamesStore(state => state.selectGame);
  const openGameModal = useGamesStore(state => state.openGameModal);
  const closeGameModal = useGamesStore(state => state.closeGameModal);
  
  const selectedGame = useGamesStore(state => 
    selectedGameId ? state.getGameById(selectedGameId) : undefined
  );
  
  return {
    selectedGame,
    selectedGameId,
    isModalOpen: isGameModalOpen,
    onSelectGame: selectGame,
    onOpenModal: openGameModal,
    onCloseModal: closeGameModal,
  };
}