/**
 * API Response Types
 * Shared types for API communication
 */

import type { Game, Provider, GameType } from '@/lib/core/domain/entities';
import type { PaginationMeta } from '@/lib/core/domain/models';

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: string;
}

/**
 * API error structure
 */
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
}

/**
 * Games API response
 */
export interface GamesResponse {
  data: Game[];
  pagination: PaginationMeta;
  meta: {
    providers: Provider[];
    types: GameType[];
    totalGames: number;
    availableFilters?: {
      tags: string[];
      minRtp: number;
      maxRtp: number;
    };
  };
}

/**
 * Single game API response
 */
export interface GameResponse {
  data: Game;
  related?: Game[];
}

/**
 * Providers API response
 */
export interface ProvidersResponse {
  data: Provider[];
  total: number;
}

/**
 * Favorites API response
 */
export interface FavoritesResponse {
  data: string[]; // Array of game IDs
  count: number;
}

/**
 * Stats API response
 */
export interface StatsResponse {
  totalGames: number;
  totalProviders: number;
  totalFavorites: number;
  gamesByType: Array<{
    type: GameType;
    count: number;
    percentage: number;
  }>;
  topProviders: Array<{
    provider: Provider;
    gameCount: number;
  }>;
  recentlyAdded: Game[];
  mostPlayed: Game[];
}