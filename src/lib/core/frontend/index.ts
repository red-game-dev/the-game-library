/**
 * Frontend Core Exports
 * All exports available for client-side code
 */

/* ============================================
   DOMAIN TYPES (Frontend can use these types)
   ============================================ */

export type { 
  Game, 
  GameType,
  Provider 
} from '../domain/entities';

export type {
  SortOption,
  PaginationMeta
} from '../domain/models';

/* ============================================
   VALUE OBJECT UTILITIES
   ============================================ */

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
} from '../domain/models';

/* ============================================
   API CLIENTS
   ============================================ */

export * from './api';

/* ============================================
   STATE MANAGEMENT (ZUSTAND STORES)
   ============================================ */

export * from './stores';

/* ============================================
   HOOKS
   ============================================ */

export { useDebounce } from './hooks';

/* ============================================
   SHARED TYPES
   ============================================ */

export type {
  ApiResponse,
  ApiSuccessResponse,
  ApiErrorResponse,
  GamesResponse
} from '../shared/types';

/* ============================================
   ERROR HANDLING
   ============================================ */

export {
  AppError,
  ApiError,
  NetworkError,
  TimeoutError,
  ValidationError,
  GameNotFoundError,
  ProviderNotFoundError,
  ErrorCodes
} from '../shared/errors';

/* ============================================
   UTILITIES
   ============================================ */

export {
  cn,
  debounce,
  throttle,
  formatNumber,
  chunk
} from '../shared/utils';

export {
  truncateString,
  truncate
} from '../shared/utils/string';

export {
  uniqueArray,
  shuffleArray,
  unique,
  shuffle
} from '../shared/utils/array';

/* ============================================
   CONSTANTS
   ============================================ */

export {
  // API Configuration
  API_BASE_URL,
  API_TIMEOUT,
  
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
} from '../config/constants/app.constants';