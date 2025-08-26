/**
 * Favorite Mutation Hook
 * Handles favorite toggle with optimistic updates
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleFavorite } from '../fetchers/POST';
import { useGamesStore } from '@/lib/core/frontend/stores/games/useGamesStore';
import { queryKeys } from '../../query/keys';

/**
 * Hook to handle favorite mutations with optimistic updates
 */
export function useFavoriteMutation() {
  const queryClient = useQueryClient();
  const toggleGameFavorite = useGamesStore(state => state.toggleGameFavorite);
  const getGameById = useGamesStore(state => state.getGameById);
  
  return useMutation({
    mutationFn: toggleFavorite,
    
    onMutate: async (gameId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.games.all });
      
      // Get current game state
      const previousGame = getGameById(gameId);
      
      // Optimistically update the store
      toggleGameFavorite(gameId);
      
      // Return context for rollback
      return { gameId, previousGame };
    },
    
    onError: (err, gameId, context) => {
      // Rollback on error
      if (context?.previousGame) {
        useGamesStore.getState().updateGame(gameId, context.previousGame);
      }
    },
    
    onSettled: () => {
      // Refetch games to ensure consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.games.lists() });
    },
  });
}