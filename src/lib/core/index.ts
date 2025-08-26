/**
 * The Game Library Core
 * Centralized exports for frontend and backend modules
 */

/* ============================================
   DOMAIN EXPORTS (Shared between frontend and backend)
   ============================================ */

// Entities
export type { 
  Game, 
  GameType,
  Provider 
} from './domain/entities';

// Value Objects  
export type {
  SortOption,
  PaginationMeta
} from './domain/models';

export {
  DEFAULT_SEARCH_CRITERIA,
  createSearchCriteria,
  isSearchEmpty,
  serializeSearchCriteria,
  parseSearchCriteria,
  createPaginationMeta,
  getPageRange,
  paginateArray,
  isValidPage,
  getNextPage,
  getPreviousPage
} from './domain/models';

/* ============================================
   SHARED EXPORTS (Available to both frontend and backend)
   ============================================ */

// Types
export type {
  ApiResponse,
  ApiSuccessResponse,
  ApiErrorResponse,
  GamesResponse
} from './shared/types';

// Errors
export {
  AppError,
  ApiError,
  NetworkError,
  TimeoutError,
  ValidationError,
  GameNotFoundError,
  ProviderNotFoundError,
  ErrorCodes
} from './shared/errors';

// Utils
export {
  cn,
  debounce,
  throttle,
  formatNumber,
  chunk
} from './shared/utils';

export {
  simulateApiDelay,
  simulateMutationDelay
} from './shared/utils/delay';

export {
  truncateString,
  truncate
} from './shared/utils/string';

export {
  uniqueArray,
  shuffleArray,
  unique,
  shuffle
} from './shared/utils/array';

/* ============================================
   FRONTEND EXPORTS (Client-side only)
   ============================================ */

// API Clients
export {
  fetchGames,
  fetchGameById,
  searchGames,
  toggleFavorite,
  incrementPlayCount
} from './frontend/api/games';

export {
  fetchProviders,
  fetchProviderById
} from './frontend/api/providers';

// Hooks
export { useDebounce } from './frontend/hooks';

/* ============================================
   CONFIG EXPORTS (Constants and configuration)
   ============================================ */

export {
  // API Configuration
  API_BASE_URL,
  API_TIMEOUT,
  API_RETRY_ATTEMPTS,
  API_DELAYS,
  
  // Cache Configuration
  CACHE_TTL,
  
  // Pagination
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  
  // Game Types
  GAME_TYPES,
  
  // UI Configuration
  UI_DELAYS,
  UI_LIMITS,
  
  // Sort Options
  SORT_OPTIONS,
  
  // View Modes
  VIEW_MODES
} from './config/constants/app.constants';

/* ============================================
   TEST EXPORTS (Development and testing only)
   ============================================ */

// Test utilities export (only in development/test environments)
export const testUtils = process.env.NODE_ENV !== 'production' ? {
  generateMockGame: import('./test/generators/GameGenerator').then(m => m.generateMockGame),
  generateMockProvider: import('./test/generators/ProviderGenerator').then(m => m.generateMockProvider),
  generateMockGames: import('./test/generators/GameGenerator').then(m => m.generateMockGames),
  generateMockProviders: import('./test/generators/ProviderGenerator').then(m => m.generateMockProviders)
} : undefined;