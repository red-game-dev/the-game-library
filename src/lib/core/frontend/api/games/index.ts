/**
 * Games API exports
 * Central export for all game-related API functions
 */

// GET fetchers
export {
  fetchGames,
  fetchGameById,
  searchGames
} from './fetchers/GET';

// POST fetchers
export {
  toggleFavorite,
  incrementPlayCount
} from './fetchers/POST';

// React Query Hooks
export * from './hooks';