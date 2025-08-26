/**
 * API Endpoints Constants
 * Central location for all API endpoint definitions
 */

export const API_ENDPOINTS = {
  // Games endpoints
  GAMES: {
    BASE: '/api/games',
    BY_ID: (id: string) => `/api/games/${id}` as const,
    PLAY: (id: string) => `/api/games/${id}/play` as const,
  },
  
  // Providers endpoints
  PROVIDERS: {
    BASE: '/api/providers',
    BY_ID: (id: string) => `/api/providers/${id}` as const,
  },
  
  // Tags endpoints
  TAGS: {
    BASE: '/api/tags',
    BY_ID: (id: string) => `/api/tags/${id}` as const,
    STATS: '/api/tags/stats',
  },
  
  // Favorites endpoints
  FAVORITES: {
    BASE: '/api/favorites',
  },
  
  // User endpoints (future use)
  USER: {
    PROFILE: '/user/profile',
    FAVORITES: '/user/favorites',
    PREFERENCES: '/user/preferences',
  },
  
  // Auth endpoints (future use)
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
} as const;

// Type helpers for endpoints
export type GameEndpoints = typeof API_ENDPOINTS.GAMES;
export type ProviderEndpoints = typeof API_ENDPOINTS.PROVIDERS;
export type UserEndpoints = typeof API_ENDPOINTS.USER;
export type AuthEndpoints = typeof API_ENDPOINTS.AUTH;