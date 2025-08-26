/**
 * useFavorites hook
 * Provides favorite games functionality with session persistence and backend sync
 */

import { useMemo, useCallback } from 'react';
import { useFavoritesStore } from '@/lib/core/frontend/stores/favorites/useFavoritesStore';
import { useGamesQuery } from './useGames';
import { useToggleFavoriteMutation } from '@/lib/core/frontend/api/favorites/hooks/useFavoriteMutation';
import { useFavoritesQuery } from '@/lib/core/frontend/api/favorites/hooks/useFavoritesQuery';

/**
 * Hook for managing favorite games with backend sync
 */
export function useFavorites() {
  const store = useFavoritesStore();
  const { mutate: toggleFavoriteMutation } = useToggleFavoriteMutation();
  
  // Load favorites from backend
  useFavoritesQuery();

  // Use mutation for toggle with optimistic updates
  const toggleFavorite = useCallback((gameId: string) => {
    toggleFavoriteMutation(gameId);
  }, [toggleFavoriteMutation]);

  return {
    favoriteIds: store.getFavoriteIds(),
    isFavorite: store.isFavorite,
    favoriteCount: store.getFavoriteCount(),
    toggleFavorite,
    addFavorite: store.addFavorite,
    removeFavorite: store.removeFavorite,
    clearFavorites: store.clearFavorites,
  };
}

/**
 * Hook to get all favorite games
 */
export function useFavoriteGames() {
  const { getFavoriteIds } = useFavoritesStore();
  const favoriteIds = getFavoriteIds();
  
  // Fetch games that are favorites
  const { data, ...queryResult } = useGamesQuery({
    favorites: true,
    pageSize: 100, // Get all favorites
  });

  // Filter games to only include favorites from session
  const favoriteGames = useMemo(() => {
    if (!data?.games) return [];
    
    return data.games.filter(game => favoriteIds.includes(game.id));
  }, [data?.games, favoriteIds]);

  return {
    ...queryResult,
    games: favoriteGames,
    count: favoriteGames.length,
  };
}

/**
 * Hook for a single game's favorite status
 */
export function useGameFavorite(gameId: string) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  
  const isFavorited = isFavorite(gameId);
  
  const toggle = useCallback(() => {
    toggleFavorite(gameId);
  }, [gameId, toggleFavorite]);
  
  return {
    isFavorite: isFavorited,
    toggleFavorite: toggle,
  };
}