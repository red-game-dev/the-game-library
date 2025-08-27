/**
 * React Query hooks for favorite mutations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleFavorite, syncFavorites } from '../fetchers/POST';
import { queryKeys } from '../../query/keys';
import { useToastStore } from '@/lib/core/frontend/stores/toast/useToastStore';
import { favoriteApiTransformers } from '@/lib/core/shared/transformers';
import type { FetchGamesResponse } from '@/lib/core/frontend/api/games/fetchers/GET';

/**
 * Hook to toggle favorite status
 */
export function useToggleFavoriteMutation() {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  
  return useMutation({
    mutationFn: toggleFavorite,
    onMutate: async (gameId: string) => {
      // Cancel any outgoing refetches to prevent overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: queryKeys.games.all });
      await queryClient.cancelQueries({ queryKey: queryKeys.favorites() });
      
      // Snapshot previous values for rollback
      const previousGames = queryClient.getQueriesData({ queryKey: queryKeys.games.all });
      
      // Optimistically update all games queries
      queryClient.setQueriesData<FetchGamesResponse>(
        { queryKey: queryKeys.games.all },
        (oldData) => {
          if (!oldData?.games) return oldData;
          
          return {
            ...oldData,
            games: oldData.games.map((game) => 
              game.id === gameId 
                ? { ...game, isFavorite: !game.isFavorite }
                : game
            )
          };
        }
      );
      
      // Return context for rollback
      return { previousGames, gameId };
    },
    onSuccess: (data) => {
      // Transform response using transformer
      const transformed = favoriteApiTransformers.fromApiResponse(data);
      
      // Invalidate to ensure consistency with backend
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites() });
      
      // Show toast
      showToast({
        message: transformed.isFavorite 
          ? 'Added to favorites ❤️' 
          : 'Removed from favorites',
        variant: 'success',
        duration: 2000
      });
    },
    onError: (error, _gameId, context) => {
      // Rollback optimistic update
      if (context?.previousGames) {
        context.previousGames.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      
      showToast({
        message: 'Failed to update favorite',
        variant: 'error',
        duration: 3000
      });
      console.error('Failed to toggle favorite:', error);
    }
  });
}

/**
 * Hook to sync favorites with backend
 */
export function useSyncFavoritesMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: syncFavorites,
    onSuccess: () => {
      // Only invalidate favorites after sync
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites() });
    }
  });
}