/**
 * Game Store Transformers
 * Transform game data between domain entities and store state
 * Frontend-specific transformers for state management
 */

import type { Game } from '@/lib/core/domain/entities';
import type { StoreGame } from '@/lib/core/frontend/stores/types';

/**
 * Game Store Transformers
 */
export const gameStoreTransformers = {
  /**
   * Transform single game from API response to store format
   * Used when storing a single game in frontend state
   */
  fromGameApiToStoreGame(game: Game): StoreGame {
    return {
      id: game.id,
      title: game.title,
      slug: game.slug,
      thumbnail: game.thumbnail,
      description: game.description,
      providerId: game.provider.id,
      providerName: game.provider.name,
      providerLogo: game.provider.logo,
      type: game.type,
      tags: game.tags || [],
      badges: {
        isNew: game.isNew || false,
        isHot: game.isHot || false,
        isOnSale: game.isOnSale || false,
        isFavorite: game.isFavorite || false,
      },
      stats: {
        rating: 0, // Rating is not in domain model, default to 0
        rtp: game.rtp,
        maxWin: undefined, // Not in domain model
        playCount: game.playCount,
      },
      betting: {
        minBet: undefined, // Not in domain model
        maxBet: undefined,
      },
      releaseDate: game.releaseDate,
      timestamps: {
        created: game.createdAt,
        updated: game.updatedAt,
      },
    };
  },


  /**
   * Transform games list from API response to store format
   * Used when storing multiple games from getAllGames API
   */
  fromAllGamesApiToStoreGames(games: Game[]): StoreGame[] {
    return games.map(game => gameStoreTransformers.fromGameApiToStoreGame(game));
  },


  /**
   * Merge updates into existing game
   */
  mergeUpdates(existing: StoreGame, updates: Partial<StoreGame>): StoreGame {
    return {
      ...existing,
      ...updates,
      badges: {
        ...existing.badges,
        ...updates.badges,
      },
      stats: {
        ...existing.stats,
        ...updates.stats,
      },
      betting: {
        ...existing.betting,
        ...updates.betting,
      },
      timestamps: {
        ...existing.timestamps,
        ...updates.timestamps,
      },
    };
  },
};