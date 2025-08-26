'use client';

/**
 * Games Page
 * Complete implementation showing data fetching, state management, and UI components
 * Demonstrates the full architecture with FilterPanel, SearchBar, GameGrid, etc.
 */

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchBar } from '@/components/features/SearchBar';
import { FilterPanel } from '@/components/features/FilterPanel';
import { GameGrid } from '@/components/features/GameGrid';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { Tooltip } from '@/components/ui/Tooltip';
import { Pagination } from '@/components/ui/Pagination';
import { GameDetailsModal } from '@/components/features/GameDetailsModal';

// Import hooks for data fetching and state management
import { useGamesQuery } from '@/lib/core/frontend/api/games/hooks/useGamesQuery';
import { useProvidersQuery } from '@/lib/core/frontend/api/providers/hooks/useProvidersQuery';
import { useGamesStore } from '@/lib/core/frontend/stores/games/useGamesStore';
import { useToastStore } from '@/lib/core/frontend/stores/toast/useToastStore';
import { usePreferencesStore } from '@/lib/core/frontend/stores/preferences/usePreferencesStore';
import { useFavoritesStore } from '@/lib/core/frontend/stores/favorites/useFavoritesStore';
import { useFavorites } from '@/hooks/useFavorites';

import type { Game, GameType } from '@/lib/core/domain/entities';
import type { SortOption, SearchType } from '@/lib/core/domain/models';
import { parseFilterParams, updateURLWithFilters, getShareableURL } from '@/lib/core/shared/utils';
import type { FilterQueryParams } from '@/lib/core/shared/types';

export default function GamesPage() {
  // ========================================
  // ROUTER AND URL PARAMS
  // ========================================
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // ========================================
  // LOCAL STATE
  // ========================================
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [searchType, setSearchType] = useState<SearchType>('all');
  const [rtpRange, setRtpRange] = useState<{ min?: number; max?: number }>({});

  // ========================================
  // GLOBAL STORE HOOKS
  // ========================================
  
  // Games store - manages filter and pagination state
  const { 
    filters,
    pagination,
    setSearch,
    setProviders,
    setTypes,
    setTags,
    setSortBy,
    toggleFavorites,
    toggleNew,
    toggleHot,
    toggleComingSoon,
    resetFilters,
    setPage,
    setPageSize,
    getSearchCriteria,
    hasActiveFilters
  } = useGamesStore();

  // Toast notifications
  const { showToast } = useToastStore();

  // User preferences
  const { 
    enableAnimations,
  } = usePreferencesStore();

  // ========================================
  // DATA FETCHING (React Query)
  // ========================================
  
  // Build search criteria from store state
  // Use useMemo to ensure stable reference for React Query
  const searchCriteria = useMemo(() => ({
    ...getSearchCriteria(),
    searchType,
    minRtp: rtpRange.min,
    maxRtp: rtpRange.max
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [
    filters.search,
    filters.selectedProviders,
    filters.selectedTypes,
    filters.selectedTags,
    filters.sortBy,
    filters.showFavorites,
    filters.showNew,
    filters.showHot,
    filters.showComingSoon,
    pagination.page,
    pagination.pageSize,
    searchType,
    rtpRange.min,
    rtpRange.max
  ]);

  // Fetch games with React Query
  const {
    data: gamesResponse,
    isLoading: isLoadingGames,
    isFetching: isFetchingGames,
    error: gamesError,
    refetch: refetchGames
  } = useGamesQuery(searchCriteria);

  // Fetch providers
  const {
    data: providers,
    error: providersError
  } = useProvidersQuery();

  // ========================================
  // EVENT HANDLERS
  // ========================================
  
  /**
   * Handle search input
   */
  const handleSearch = useCallback((query: string, type?: SearchType) => {
    setSearch(query);
    setPage(1); // Reset to first page on new search
    
    if (type && type !== searchType) {
      setSearchType(type);
    }
  }, [setSearch, setPage, searchType]);

  /**
   * Handle search type change
   */
  const handleSearchTypeChange = useCallback((type: SearchType) => {
    setSearchType(type);
    setPage(1); // Reset to first page on search type change
  }, [setPage]);

  /**
   * Handle filter changes from FilterPanel
   */
  const handleFilterChange = useCallback((newFilters: {
    providers?: string[];
    types?: GameType[];
    tags?: string[];
    favorites?: boolean;
    isNew?: boolean;
    isHot?: boolean;
    isComingSoon?: boolean;
    sort?: SortOption;
    viewMode?: 'grid' | 'compact';
    minRtp?: number;
    maxRtp?: number;
  }) => {
    
    // Apply all filter changes
    if (newFilters.providers !== undefined) {
      setProviders(newFilters.providers);
    }
    if (newFilters.types !== undefined) {
      setTypes(newFilters.types);
    }
    if (newFilters.tags !== undefined) {
      setTags(newFilters.tags);
    }
    if (newFilters.favorites !== undefined) {
      if (newFilters.favorites !== filters.showFavorites) {
        toggleFavorites();
      }
    }
    if (newFilters.isNew !== undefined) {
      if (newFilters.isNew !== filters.showNew) {
        toggleNew();
      }
    }
    if (newFilters.isHot !== undefined) {
      if (newFilters.isHot !== filters.showHot) {
        toggleHot();
      }
    }
    if (newFilters.isComingSoon !== undefined) {
      if (newFilters.isComingSoon !== filters.showComingSoon) {
        toggleComingSoon();
      }
    }
    if (newFilters.sort !== undefined) {
      setSortBy(newFilters.sort);
    }
    if (newFilters.viewMode !== undefined) {
      setViewMode(newFilters.viewMode);
    }
    if (newFilters.minRtp !== undefined || newFilters.maxRtp !== undefined) {
      setRtpRange(prev => ({
        ...prev,
        ...(newFilters.minRtp !== undefined && { min: newFilters.minRtp }),
        ...(newFilters.maxRtp !== undefined && { max: newFilters.maxRtp })
      }));
    }

    // Reset pagination when filters change
    setPage(1);
    
    // Close mobile filter panel after applying filters
    if (isFilterPanelOpen) {
      setTimeout(() => setIsFilterPanelOpen(false), 300);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, setProviders, setTypes, setTags, toggleFavorites, setSortBy, setPage, isFilterPanelOpen]);

  /**
   * Handle clear all filters
   */
  const handleClearFilters = useCallback(() => {
    resetFilters();
    showToast({
      message: 'All filters cleared',
      variant: 'success',
      duration: 2000
    });
  }, [resetFilters, showToast]);

  /**
   * Handle game click - open details modal
   */
  const handleGameClick = useCallback((game: Game) => {
    setSelectedGame(game);
    setIsGameModalOpen(true);
  }, []);

  /**
   * Handle game play from modal
   */
  const handleGamePlay = useCallback((game: Game) => {
    showToast({
      message: `Starting ${game.title}...`,
      variant: 'success',
      duration: 3000
    });
    // In a real app, this would navigate to /games/[slug]
    setTimeout(() => {
      router.push(`/games/${game.slug}`);
    }, 1000);
  }, [showToast, router]);

  /**
   * Handle favorite toggle with backend sync
   */
  const { toggleFavorite } = useFavorites(); // Use the enhanced hook with backend sync
  
  const handleFavoriteToggle = useCallback((gameId: string) => {
    toggleFavorite(gameId); 
  }, [toggleFavorite]);

  /**
   * Handle game share
   */
  const handleGameShare = useCallback((game: Game) => {
    const url = `${window.location.origin}/games/${game.slug}`;
    
    // Try to use native share API if available
    if (navigator.share) {
      navigator.share({
        title: game.title,
        text: `Check out ${game.title} on Game Library!`,
        url: url
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(url);
        showToast({
          message: 'Link copied to clipboard!',
          variant: 'success',
          duration: 2000
        });
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(url);
      showToast({
        message: 'Link copied to clipboard!',
        variant: 'success',
        duration: 2000
      });
    }
  }, [showToast]);

  /**
   * Handle pagination
   */
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: enableAnimations ? 'smooth' : 'auto' });
  }, [setPage, enableAnimations]);

  // ========================================
  // SIDE EFFECTS
  // ========================================
  
  // Track if initial mount has occurred
  const [hasMounted, setHasMounted] = useState(false);
  
  // Sync URL params with store when searchParams change
  useEffect(() => {
    const urlFilters = parseFilterParams(searchParams);
    
    // Apply all URL filters to store without checking current state
    // This ensures URL is the source of truth
    if (urlFilters.search !== undefined) {
      setSearch(urlFilters.search || '');
    }
    if (urlFilters.providers !== undefined) {
      setProviders(urlFilters.providers);
    }
    if (urlFilters.types !== undefined) {
      setTypes(urlFilters.types);
    }
    if (urlFilters.tags !== undefined) {
      setTags(urlFilters.tags);
    }
    if (urlFilters.sort !== undefined) {
      setSortBy(urlFilters.sort);
    }
    if (urlFilters.page !== undefined) {
      setPage(urlFilters.page);
    }
    if (urlFilters.pageSize !== undefined) {
      setPageSize(urlFilters.pageSize);
    }
    if (urlFilters.view !== undefined) {
      setViewMode(urlFilters.view);
    }
    
    // Initialize RTP range from URL
    if (urlFilters.minRtp !== undefined || urlFilters.maxRtp !== undefined) {
      setRtpRange({
        min: urlFilters.minRtp,
        max: urlFilters.maxRtp
      });
    }
    
    // For boolean filters, we need a different approach
    // We'll use a timeout to ensure the store is ready
    setTimeout(() => {
      const currentFilters = useGamesStore.getState().filters;
      
      // Toggle if URL state doesn't match current state
      if (urlFilters.favorites && !currentFilters.showFavorites) {
        toggleFavorites();
      } else if (!urlFilters.favorites && currentFilters.showFavorites) {
        toggleFavorites();
      }
      
      if (urlFilters.isNew && !currentFilters.showNew) {
        toggleNew();
      } else if (!urlFilters.isNew && currentFilters.showNew) {
        toggleNew();
      }
      
      if (urlFilters.isHot && !currentFilters.showHot) {
        toggleHot();
      } else if (!urlFilters.isHot && currentFilters.showHot) {
        toggleHot();
      }
      
      if (urlFilters.isComingSoon && !currentFilters.showComingSoon) {
        toggleComingSoon();
      } else if (!urlFilters.isComingSoon && currentFilters.showComingSoon) {
        toggleComingSoon();
      }
    }, 0);
    
    setHasMounted(true);
    // Run when searchParams change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  
  // Update URL when filters change (but not on initial mount)
  useEffect(() => {
    if (!hasMounted) return; // Skip on mount to avoid conflicts
    
    const filterParams: FilterQueryParams = {
      search: filters.search || undefined,
      providers: filters.selectedProviders?.length ? filters.selectedProviders : undefined,
      types: filters.selectedTypes?.length ? filters.selectedTypes : undefined,
      tags: filters.selectedTags?.length ? filters.selectedTags : undefined,
      sort: filters.sortBy !== 'popular' ? filters.sortBy : undefined,
      favorites: filters.showFavorites || undefined,
      isNew: filters.showNew || undefined,
      isHot: filters.showHot || undefined,
      isComingSoon: filters.showComingSoon || undefined,
      minRtp: rtpRange.min,
      maxRtp: rtpRange.max,
      page: pagination.page > 1 ? pagination.page : undefined,
      pageSize: pagination.pageSize !== 20 ? pagination.pageSize : undefined,
      view: viewMode !== 'grid' ? viewMode : undefined
    };
    
    updateURLWithFilters(filterParams, router);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.search,
    filters.selectedProviders,
    filters.selectedTypes,
    filters.selectedTags,
    filters.sortBy,
    filters.showFavorites,
    filters.showNew,
    filters.showHot,
    filters.showComingSoon,
    rtpRange.min,
    rtpRange.max,
    pagination.page,
    pagination.pageSize,
    viewMode,
    hasMounted
  ]);
  

  // ========================================
  // COMPUTED VALUES
  // ========================================
  
  // Enhance games with favorite status from session
  const { getFavoriteIds } = useFavoritesStore();
  const favoriteIds = getFavoriteIds();
  
  let games = (gamesResponse?.games || []).map(game => ({
    ...game,
    isFavorite: favoriteIds.includes(game.id)
  }));
  
  // Filter by favorites if the filter is active
  if (filters.showFavorites) {
    games = games.filter(game => game.isFavorite);
  }
  
  const totalGames = gamesResponse?.pagination?.total || 0;
  const totalPages = gamesResponse?.pagination?.totalPages || 1;
  
  const activeFilterCount = 
    (filters.selectedProviders?.length || 0) + 
    (filters.selectedTypes?.length || 0) + 
    (filters.selectedTags?.length || 0) +
    (filters.showFavorites ? 1 : 0) +
    (filters.showNew ? 1 : 0) +
    (filters.showHot ? 1 : 0) +
    (filters.search ? 1 : 0);

  // Get tags from API response meta (already filtered and sorted)
  const availableTags = React.useMemo(() => {
    // Tags come from the API meta response which includes all unique tags from the current filtered games
    return gamesResponse?.meta?.tags || [];
  }, [gamesResponse?.meta]);

  // ========================================
  // LOADING STATE - Show full page with skeleton cards
  // ========================================
  
  if (isLoadingGames && !gamesResponse) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold text-primary mb-2">
                  🎮 Game Library
                </h1>
                <p className="text-secondary">
                  <Badge variant="warning" size="sm" gap="sm">Loading...</Badge>
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6 relative z-100">
            <SearchBar
              placeholder="Search games, providers, tags..."
              initialValue=""
              onSearch={() => {}}
              enableTypeDropdown={true}
              defaultSearchType="all"
              className="w-full"
              disabled={true}
            />
          </div>

          {/* Main Content with skeleton loading */}
          <div className="flex gap-6">
            {/* Filter Panel - Desktop (disabled during loading) */}
            <aside className="hidden-mobile w-64 flex-shrink-0">
              <FilterPanel
                filters={{
                  providers: [],
                  types: [],
                  tags: [],
                  favorites: false,
                  isNew: false,
                  isHot: false,
                  isComingSoon: false,
                  sort: 'popular',
                  viewMode: viewMode
                }}
                providers={[]}
                tags={[]}
                onFilterChange={() => {}}
                disabled={true}
                className="sticky"
              />
            </aside>

            {/* Games Display with Skeleton */}
            <main className="flex-1">
              <GameGrid
                games={[]}
                layout='grid'
                isLoading={true}
                skeletonCount={12}
                columns={
                  viewMode === 'compact' 
                    ? { mobile: 2, tablet: 3, desktop: 4, wide: 5 }
                    : { mobile: 1, tablet: 2, desktop: 3, wide: 4 }
                }
                variant={viewMode === 'compact' ? 'compact' : 'default'}
              />
            </main>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // ERROR STATE
  // ========================================
  
  if (gamesError || providersError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <Alert
          variant="error"
          title="Failed to load data"
          type="card"
          className="max-w-md"
        >
          {gamesError instanceof Error ? gamesError.message : 'Failed to load games'}
          {providersError && ' • Failed to load providers'}
          <div className="mt-4">
            <Button variant="primary" size="sm" onClick={() => refetchGames()}>
              Try Again
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  // ========================================
  // MAIN RENDER
  // ========================================
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">
                🎮 Games
              </h1>
              <p className="text-secondary mb-2">
                Discover and play thousands of exciting games from top providers
              </p>
              <div className="text-sm text-secondary">
                <span className="font-semibold">{totalGames}</span> games available
                {activeFilterCount > 0 && (
                  <span className="ml-2 inline-flex items-center gap-2">
                    • <Badge variant="info" size="sm" gap="sm">{activeFilterCount} filters active</Badge>
                    {/* Share Filters Button - moved here for better UX */}
                    <Tooltip content="Share this filtered view">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="px-2 py-1"
                        onClick={() => {
                          const shareUrl = getShareableURL({
                            search: filters.search,
                            providers: filters.selectedProviders,
                            types: filters.selectedTypes,
                            tags: filters.selectedTags,
                            sort: filters.sortBy,
                            favorites: filters.showFavorites,
                            isNew: filters.showNew,
                            isHot: filters.showHot,
                            isComingSoon: filters.showComingSoon,
                            minRtp: filters.minRtp,
                            maxRtp: filters.maxRtp,
                            view: viewMode
                          });
                          
                          navigator.clipboard.writeText(shareUrl);
                          showToast({
                            message: 'Filter link copied to clipboard!',
                            variant: 'success',
                            duration: 2000
                          });
                        }}
                      >
                        📤
                      </Button>
                    </Tooltip>
                  </span>
                )}
                {isFetchingGames && (
                  <span className="ml-2">
                    • <Badge variant="warning" size="sm" gap="sm">Updating...</Badge>
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                className="block-mobile-only"
              >
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative z-50">
          <SearchBar
            placeholder="Search games, providers, tags..."
            initialValue={filters?.search || ''}
            onSearch={handleSearch}
            onSearchTypeChange={handleSearchTypeChange}
            enableTypeDropdown={true}
            defaultSearchType="all"
            className="w-full"
            autoFocus={false}
            debounceDelay={300}
            showClear={true}
          />
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Filter Panel - Desktop */}
          <aside className="hidden-mobile w-64 flex-shrink-0">
            <FilterPanel
              filters={{
                providers: filters?.selectedProviders || [],
                types: filters?.selectedTypes || [],
                tags: filters?.selectedTags || [],
                favorites: filters?.showFavorites || false,
                isNew: filters?.showNew || false,
                isHot: filters?.showHot || false,
                isComingSoon: filters?.showComingSoon || false,
                sort: filters?.sortBy || 'popular',
                viewMode: viewMode,
                minRtp: rtpRange.min,
                maxRtp: rtpRange.max
              }}
              providers={providers || []}
              tags={availableTags}
              onFilterChange={handleFilterChange}
              className="sticky"
            />
          </aside>

          {/* Games Display */}
          <main className="flex-1">
            {/* Show skeleton while fetching, but not if we have no results */}
            {isFetchingGames && games.length > 0 ? (
              <GameGrid
                games={[]}
                layout='grid'
                isLoading={true}
                skeletonCount={12}
                columns={
                  viewMode === 'compact' 
                    ? { mobile: 2, tablet: 3, desktop: 4, wide: 5 }
                    : { mobile: 1, tablet: 2, desktop: 3, wide: 4 }
                }
                variant={viewMode === 'compact' ? 'compact' : 'default'}
              />
            ) : games.length === 0 ? (
              // Empty State - Full width with centered content
              <div className="w-full flex items-center justify-center min-h-[400px]">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🎯</div>
                  <h2 className="text-2xl font-semibold mb-2">No games found</h2>
                  <p className="text-secondary mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button
                    variant="primary"
                    onClick={handleClearFilters}
                    disabled={!hasActiveFilters()}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Games Grid */}
                <GameGrid
                  games={games}
                  layout='grid'
                  columns={
                    viewMode === 'compact' 
                      ? { mobile: 2, tablet: 3, desktop: 4, wide: 5 }
                      : { mobile: 1, tablet: 2, desktop: 3, wide: 4 }
                  }
                  variant={viewMode === 'compact' ? 'compact' : 'default'}
                  onGameClick={handleGameClick}
                  onFavoriteToggle={handleFavoriteToggle}
                />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={gamesResponse?.pagination?.page || 1}
                      totalPages={totalPages}
                      totalItems={totalGames}
                      itemsPerPage={gamesResponse?.pagination?.pageSize || 10}
                      onPageChange={handlePageChange}
                      showItemsInfo
                      showPageInfo
                      maxButtons={5}
                    />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Panel (Slide-out) */}
      {isFilterPanelOpen && (
        <div className="fixed inset-0 z-50 block-mobile-only">
          <div 
            className="absolute inset-0" 
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={() => setIsFilterPanelOpen(false)} 
          />
          <div className="absolute right-0 top-0 h-full w-80 shadow-xl overflow-y-auto" style={{ backgroundColor: 'var(--color-background)', zIndex: 51 }}>
            <div className="h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFilterPanelOpen(false)}
                >
                  ✕
                </Button>
              </div>
              <FilterPanel
                filters={{
                  providers: filters?.selectedProviders || [],
                  types: filters?.selectedTypes || [],
                  tags: filters?.selectedTags || [],
                  favorites: filters?.showFavorites || false,
                  isNew: filters?.showNew || false,
                  isHot: filters?.showHot || false,
                  isComingSoon: filters?.showComingSoon || false,
                  sort: filters?.sortBy || 'popular',
                  viewMode: viewMode,
                  minRtp: rtpRange.min,
                  maxRtp: rtpRange.max
                }}
                providers={providers || []}
                tags={availableTags}
                onFilterChange={handleFilterChange}
                mobileMode="inline"
              />
            </div>
          </div>
        </div>
      )}

      {/* Game Details Modal */}
      <GameDetailsModal
        game={selectedGame ? {
          ...selectedGame,
          isFavorite: favoriteIds.includes(selectedGame.id)
        } : null}
        isOpen={isGameModalOpen}
        onClose={() => {
          setIsGameModalOpen(false);
          setSelectedGame(null);
        }}
        onPlay={handleGamePlay}
        onFavorite={(game) => handleFavoriteToggle(game.id)}
        onShare={handleGameShare}
      />
    </div>
  );
}