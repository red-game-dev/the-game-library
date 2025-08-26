/**
 * Store Data Types
 * Data structures used within frontend stores
 * These are optimized formats for UI consumption
 */

import type { GameType } from '@/lib/core/domain/entities';
import type { TagCategory } from "@/lib/core/shared/types";

/**
 * Game data as stored in the frontend state
 * Optimized for UI rendering and updates
 */
export interface StoreGame {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  description?: string;
  providerId: string;
  providerName: string;
  providerLogo?: string;
  type: GameType;
  tags: string[];
  badges: {
    isNew: boolean;
    isHot: boolean;
    isOnSale: boolean;
    isFavorite: boolean;
  };
  stats: {
    rating: number;
    rtp?: number;
    maxWin?: number;
    playCount?: number;
  };
  betting: {
    minBet?: number;
    maxBet?: number;
  };
  releaseDate?: string;
  timestamps: {
    created?: Date;
    updated?: Date;
  };
}

/**
 * Provider data as stored in the frontend state
 * Optimized for UI rendering and filtering
 */
export interface StoreProvider {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  website?: string;
  description?: string;
  stats: {
    gameCount: number;
    isFeatured: boolean;
    isPopular: boolean;
  };
  timestamps: {
    created?: Date;
    updated?: Date;
  };
}

/**
 * Tag data as stored in the frontend state
 * Optimized for UI rendering and filtering
 */
export interface StoreTag {
  id: string;
  name: string;
  slug: string;
  category?: TagCategory;
  stats: {
    gameCount: number;
    isPopular: boolean;
    isTrending: boolean;
  };
  timestamps: {
    created?: Date;
    updated?: Date;
  };
}