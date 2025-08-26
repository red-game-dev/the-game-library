/**
 * Shared Constants
 * Export all shared constants used across the application
 */

// Tag constants
export * from './tags.constants';

// Re-export from existing constants
export { 
  GAME_TYPES,
  DEFAULT_PAGE_SIZE,
  CACHE_TTL,
  UI_DELAYS,
  APP_NAME,
  APP_VERSION,
  APP_DESCRIPTION,
  API_BASE_URL,
  API_TIMEOUT,
  API_RETRY_ATTEMPTS,
  API_RETRY_DELAY,
  MAX_PAGE_SIZE,
  MIN_PAGE,
  MIN_PAGE_SIZE,
  AVAILABLE_PAGE_SIZES,
  STORAGE_KEYS,
  SESSION_KEYS,
  SORT_OPTIONS,
  GAME_SORT_OPTIONS,
  VIEW_MODES,
  GAME_VIEW_MODES,
  THEMES,
  MAX_FAVORITES,
  MAX_SEARCH_HISTORY,
  MAX_RECENT_GAMES,
  API_DELAYS,
  UI_LIMITS
} from '@/lib/core/config/constants/app.constants';

// Re-export error codes
export { ErrorCodes } from '../errors/constants';