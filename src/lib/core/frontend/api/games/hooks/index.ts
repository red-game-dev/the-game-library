/**
 * Games API Hooks
 * Export all game-related API hooks
 */

export { useGamesQuery } from './useGamesQuery';
export { useFavoriteMutation } from './useFavoriteMutation';

// Re-export for backward compatibility
export { useGamesQuery as useGames } from './useGamesQuery';