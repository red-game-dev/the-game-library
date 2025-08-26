/**
 * Test Collection Helpers
 * Generate categorized collections of mock data for testing and stories
 */

import { generateMockGames, generateGamesByType } from '../generators/GameGenerator';
import { generateMockProviders } from '../generators/ProviderGenerator';
import type { Game, Provider } from '@/lib/core/domain/entities';

/**
 * Generate categorized game collections for testing
 */
export function generateGameCollections() {
  return {
    featured: generateMockGames(6).map((game) => ({ ...game, isNew: true })),
    popular: generateMockGames(12).map((game) => ({ ...game, playCount: Math.floor(Math.random() * 10000) })),
    slots: generateGamesByType('slots', 8),
    table: generateGamesByType('table', 8),
    live: generateGamesByType('live', 8),
    instant: generateGamesByType('instant', 8),
    jackpot: generateGamesByType('jackpot', 8),
    favorites: generateMockGames(5).map((game) => ({ ...game, isFavorite: true }))
  };
}

/**
 * Generate provider collections with metadata
 */
export function generateProviderCollections(): Provider[] {
  return generateMockProviders(10).map((provider, index) => ({
    ...provider,
    gameCount: Math.floor(Math.random() * 200) + 50,
    featured: index < 3
  }));
}

/**
 * Generate themed game collections
 */
export function generateThemedGames() {
  return {
    dark: generateMockGames(6).map(game => ({ 
      ...game, 
      tags: [...(game.tags || []), 'dark', 'mysterious'] 
    })),
    neon: generateMockGames(6).map(game => ({ 
      ...game, 
      tags: [...(game.tags || []), 'neon', 'cyberpunk'] 
    })),
    gold: generateMockGames(6).map(game => ({ 
      ...game, 
      tags: [...(game.tags || []), 'gold', 'luxury'] 
    }))
  };
}

/**
 * Generate games by provider
 */
export function generateProviderGames(providerId: string, providerName: string, count: number = 10): Game[] {
  return generateMockGames(count).map(game => ({
    ...game,
    provider: {
      id: providerId,
      name: providerName,
      logo: `https://api.dicebear.com/7.x/shapes/svg?seed=${providerId}`
    }
  }));
}

/**
 * Generate a complete test dataset
 */
export function generateCompleteTestData() {
  const providers = generateProviderCollections();
  const games = generateGameCollections();
  
  return {
    providers,
    games,
    stats: {
      totalGames: Object.values(games).flat().length,
      totalProviders: providers.length,
      gamesByType: {
        slots: games.slots.length,
        table: games.table.length,
        live: games.live.length,
        instant: games.instant.length,
        jackpot: games.jackpot.length
      }
    }
  };
}