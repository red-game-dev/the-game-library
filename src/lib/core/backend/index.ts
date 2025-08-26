/**
 * Backend Core Exports
 * All exports available for server-side code
 */

/* ============================================
   SERVICES (Backend only)
   ============================================ */

export { GameService, gameService } from './services/GameService';
export { ProviderService, providerService } from './services/ProviderService';
export { FavoriteService, favoriteService } from './services/FavoriteService';
export { CacheService, cacheService } from './services/CacheService';

/* ============================================
   DOMAIN TYPES (Backend can use all domain types)
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
  ErrorCodes,
  handleApiError,
  createErrorResponse,
  createSuccessResponse,
  createPaginatedResponse
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
  simulateApiDelay,
  simulateMutationDelay
} from '../shared/utils/delay';

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
  API_RETRY_ATTEMPTS,
  API_DELAYS,
  
  // Cache Configuration
  CACHE_TTL,
  
  // Pagination
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  
  // Game Types
  GAME_TYPES,
  
  // UI Configuration (may be needed for validation)
  UI_DELAYS,
  UI_LIMITS,
  
  // Sort Options
  SORT_OPTIONS,
  
  // View Modes
  VIEW_MODES
} from '../config/constants/app.constants';

/* ============================================
   MOCK DATA ACCESS (Backend only)
   ============================================ */

// Direct access to mock data for backend services
import gamesData from './data/games.json';
import providersData from './data/providers.json';

export const mockData = {
  games: gamesData,
  providers: providersData
} as const;