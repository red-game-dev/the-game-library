/**
 * Application Constants
 * Global constants used throughout the application
 */

/**
 * App metadata
 */
export const APP_NAME = 'The Game Library';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'A thoughtfully designed gaming platform showcase';

/**
 * API configuration
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
export const API_TIMEOUT = 30000; // 30 seconds
export const API_RETRY_ATTEMPTS = 3;
export const API_RETRY_DELAY = 1000; // 1 second

/**
 * Pagination defaults
 */
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 50;
export const MIN_PAGE = 1;
export const MIN_PAGE_SIZE = 1;
export const AVAILABLE_PAGE_SIZES = [12, 24, 36, 48];

/**
 * Cache configuration
 */
export const CACHE_TTL = {
  SHORT: 60 * 1000,        // 1 minute
  MEDIUM: 5 * 60 * 1000,   // 5 minutes
  LONG: 30 * 60 * 1000,    // 30 minutes
  VERY_LONG: 60 * 60 * 1000 // 1 hour
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  THEME: 'game-library-theme',
  FAVORITES: 'game-library-favorites',
  PREFERENCES: 'game-library-preferences',
  LAST_SEARCH: 'game-library-last-search',
  VIEW_MODE: 'game-library-view-mode'
} as const;

/**
 * Session storage keys
 */
export const SESSION_KEYS = {
  FILTERS: 'game-library-session-filters',
  SCROLL_POSITION: 'game-library-scroll-position'
} as const;

/**
 * Game types
 */
export const GAME_TYPES = ['slots', 'table', 'live', 'instant', 'jackpot'] as const;

/**
 * Game type configurations with labels and icons
 */
export const GAME_TYPE_CONFIG = [
  { value: 'slots', label: 'Slots', icon: '🎰' },
  { value: 'table', label: 'Table Games', icon: '🃏' },
  { value: 'live', label: 'Live Casino', icon: '🎥' },
  { value: 'instant', label: 'Instant Win', icon: '⚡' },
  { value: 'jackpot', label: 'Jackpots', icon: '💰' }
] as const;

/**
 * Sort options
 */
export const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'new', label: 'Newest First' },
  { value: 'az', label: 'A to Z' },
  { value: 'za', label: 'Z to A' },
  { value: 'rating', label: 'Highest Rated' }
] as const;

/**
 * Game-specific sort options (just the values for type safety)
 */
export const GAME_SORT_OPTIONS = ['popular', 'new', 'az', 'za', 'rating'] as const;

/**
 * View modes
 */
export const VIEW_MODES = ['grid', 'compact'] as const;

/**
 * RTP (Return to Player) preset ranges for filtering
 */
export const RTP_PRESETS = [
  { label: 'Any RTP', min: undefined, max: undefined },
  { label: 'Low (85-90%)', min: 85, max: 90 },
  { label: 'Below Average (91-94%)', min: 91, max: 94 },
  { label: 'Average (95-96%)', min: 95, max: 96 },
  { label: 'Above Average (97%)', min: 97, max: 97 },
  { label: 'High (98%+)', min: 98, max: undefined }
] as const;

/**
 * Game-specific view modes (same as VIEW_MODES but explicit for games feature)
 */
export const GAME_VIEW_MODES = ['grid', 'compact'] as const;

/**
 * Theme names
 */
export const THEMES = ['light', 'dark', 'neon', 'gold'] as const;

/**
 * Maximum values
 */
export const MAX_FAVORITES = 100;
export const MAX_SEARCH_HISTORY = 10;
export const MAX_RECENT_GAMES = 20;

/**
 * API simulation delays (in milliseconds)
 */
export const API_DELAYS = {
  MIN_GET: 300,
  MAX_GET: 800,
  MIN_MUTATION: 100,
  MAX_MUTATION: 300,
  MIN_SEARCH: 200,
  MAX_SEARCH: 500,
  // React Query specific
  STALE_TIME: 5 * 60 * 1000,  // 5 minutes
  CACHE_TIME: 10 * 60 * 1000,  // 10 minutes (gcTime in React Query v5)
} as const;

/**
 * UI interaction delays (in milliseconds)
 */
export const UI_DELAYS = {
  // Debounce delays
  SEARCH_DEBOUNCE: 300,
  FILTER_DEBOUNCE: 200,
  TYPING_DEBOUNCE: 150,
  
  // Tooltip delays
  TOOLTIP_DELAY: 200,
  TOOLTIP_DELAY_LONG: 500,
  TOOLTIP_DELAY_SHORT: 100,
  
  // Animation delays
  ANIMATION_SHORT: 150,
  ANIMATION_MEDIUM: 300,
  ANIMATION_LONG: 500,
  
  // Carousel autoplay
  CAROUSEL_AUTOPLAY: 4000,
  CAROUSEL_FAST: 2000,
  CAROUSEL_SLOW: 6000,
  
  // Modal and overlay
  MODAL_SHAKE: 500,
  OVERLAY_FADE: 200
} as const;

/**
 * UI limits and constraints
 */
export const UI_LIMITS = {
  // Text limits
  MAX_TITLE_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_TAG_LENGTH: 30,
  
  // Display limits
  MAX_CARDS_PER_PAGE: 50,
  MAX_PROVIDERS_SHOWN: 20,
  MAX_TAGS_SHOWN: 10,
  MAX_RECENT_SEARCHES: 5,
  
  // Interaction limits
  MAX_FILTER_SELECTIONS: 10,
  MAX_FAVORITES: 100,
  MIN_SEARCH_LENGTH: 2,
  
  // Carousel limits
  MAX_CAROUSEL_ITEMS: 20,
  MIN_CAROUSEL_ITEMS: 3
} as const;

export const DEFAULT_PLACEHOLDER = (name: string, background: string, color: string) =>
  `https://ui-avatars.com/api/?name=${name}&background=${background}&color=${color}&size=200`;