/**
 * React Query hooks for favorite mutations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleFavorite, syncFavorites } from '../fetchers/POST';
import { queryKeys } from '../../query/keys';
import { useToastStore } from '@/lib/core/frontend/stores/toast/useToastStore';
import { favoriteApiTransformers } from '@/lib/core/shared/transformers';

/**
 * Hook to toggle favorite status
 */
export function useToggleFavoriteMutation() {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  
  return useMutation({
    mutationFn: toggleFavorite,
    onSuccess: (data) => {
      // Transform response using transformer
      const transformed = favoriteApiTransformers.fromApiResponse(data);
      
      // Only invalidate favorites query, not games
      // Games will reflect the change through the local store update
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
    onError: (error) => {
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