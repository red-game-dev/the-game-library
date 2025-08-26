/**
 * Game Entity
 * Core domain model representing a game in the library
 */

import type { Provider } from './Provider';
import { GAME_TYPES } from '@/lib/core/config/constants/app.constants';

export type GameType = typeof GAME_TYPES[number];

/**
 * Game entity representing a playable game in the system
 */
export interface Game {
  // Core identification
  readonly id: string;
  title: string;
  slug: string;
  
  // Visual assets
  thumbnail: string;
  description?: string;
  
  // Relationships
  provider: Provider;
  
  // Classification
  type: GameType;
  
  // Status flags
  isNew?: boolean;
  isHot?: boolean;
  isOnSale?: boolean;
  isFavorite?: boolean;
  isComingSoon?: boolean;
  
  // Metadata
  tags?: string[];
  playCount?: number;
  releaseDate?: string;
  rtp?: number; // Return to Player percentage
  
  // Timestamps (for future use)
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Factory function to create a Game entity
 */
export function createGame(params: Omit<Game, 'createdAt' | 'updatedAt'>): Game {
  return {
    ...params,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

/**
 * Type guard to check if an object is a Game
 */
export function isGame(obj: unknown): obj is Game {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'slug' in obj &&
    'thumbnail' in obj &&
    'provider' in obj &&
    'type' in obj
  );
}

/**
 * Get display name for game type
 */
export function getGameTypeDisplayName(type: GameType): string {
  const displayNames: Record<GameType, string> = {
    slots: 'Slots',
    table: 'Table Games',
    live: 'Live Casino',
    instant: 'Instant Win',
    jackpot: 'Jackpot'
  };
  return displayNames[type] || type;
}

/**
 * Check if game is playable (business rule)
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function isGamePlayable(_game: Game): boolean {
  // Add business rules here
  // For now, all games are playable
  return true;
}