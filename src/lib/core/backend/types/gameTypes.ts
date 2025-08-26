/**
 * Game API Types
 * Types for game API requests and responses
 */

import { GAME_TYPES } from '@/lib/core/config/constants/app.constants';
import type { ApiProviderResponse as ApiProvider } from './providerTypes';

// Game type definition from constants
export type GameType = typeof GAME_TYPES[number];

/**
 * API Game Response format
 * What the backend API returns
 */
export interface ApiGameResponse {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  description?: string;
  provider: {
    id: string;
    name: string;
    slug?: string;
    logo?: string;
    website?: string;
    description?: string;
    gameCount?: number;
  };
  type: GameType;
  tags?: string[];
  isNew?: boolean;
  isHot?: boolean;
  isOnSale?: boolean;
  isFavorite?: boolean;
  isComingSoon?: boolean;
  playCount?: number;
  releaseDate?: string;
  rtp?: number;
  rating?: number;
  maxWin?: number;
  minBet?: number;
  maxBet?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * API Game Request format
 * What we send to the backend API
 */
export interface ApiGameRequest {
  title?: string;
  type?: GameType;
  tags?: string[];
  providerId?: string;
  thumbnail?: string;
  rating?: number;
  isNew?: boolean;
  isHot?: boolean;
  isOnSale?: boolean;
  isFavorite?: boolean;
  isComingSoon?: boolean;
}

/**
 * Games list API response
 */
export interface ApiGamesResponse {
  data: ApiGameResponse[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
  meta?: {
    providers?: ApiProvider[];
    types?: GameType[];
    tags?: string[];
  };
}

/**
 * Favorite toggle response
 */
export interface ApiFavoriteResponse {
  gameId: string;
  isFavorite: boolean;
}