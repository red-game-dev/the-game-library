/**
 * Mock Data Collections
 * Pre-defined mock data for consistent testing
 */

import { generateGames, generateProviders } from '../generators';
import type { Game, Provider } from '@/lib/core/domain/entities';
import { GAME_TYPES } from '@/lib/core/config/constants/app.constants';

// Pre-generated mock games for consistent testing
export const MOCK_GAMES: Game[] = generateGames(20);

// Pre-generated mock providers
export const MOCK_PROVIDERS: Provider[] = generateProviders(10);

// Sample search terms
export const MOCK_SEARCH_TERMS = [
  'Space Adventure',
  'Mystery Quest',
  'Racing Pro',
  'Puzzle Master',
  'Battle Arena',
  'Farm Life',
  'Dragon Kingdom',
  'Crystal Caverns',
  'Lucky Fortune',
  'Wild West'
];

// Sample tags for filtering
export const MOCK_TAGS = [
  'bonus buy',
  'megaways',
  'high volatility',
  'jackpot',
  'free spins',
  'multiplier',
  'cascading',
  'cluster pays'
];

// Mock user data
export const MOCK_USER = {
  id: 'user-1',
  name: 'Test User',
  email: 'test@example.com',
  favorites: ['game-1', 'game-3', 'game-5'],
  preferences: {
    theme: 'dark' as const,
    sound: true,
    animations: true,
    notifications: false
  }
};

// Mock API responses
export const MOCK_API_RESPONSES = {
  games: {
    success: {
      data: MOCK_GAMES.slice(0, 10),
      pagination: {
        page: 1,
        pageSize: 10,
        total: MOCK_GAMES.length,
        totalPages: Math.ceil(MOCK_GAMES.length / 10),
        hasMore: MOCK_GAMES.length > 10,
        hasPrevious: false,
        startIndex: 0,
        endIndex: 9
      },
      meta: {
        providers: MOCK_PROVIDERS,
        types: [...GAME_TYPES],
        totalGames: MOCK_GAMES.length
      }
    },
    error: {
      error: 'Failed to fetch games',
      message: 'Internal server error',
      code: 'FETCH_ERROR',
      status: 500
    }
  },
  favorites: {
    success: {
      data: MOCK_USER.favorites,
      count: MOCK_USER.favorites.length
    },
    error: {
      error: 'Failed to fetch favorites',
      message: 'Unauthorized',
      code: 'AUTH_ERROR',
      status: 401
    }
  }
};

// Get mock games by type
export function getMockGamesByType(type: Game['type']): Game[] {
  return MOCK_GAMES.filter(game => game.type === type);
}

// Get mock featured games
export function getMockFeaturedGames(): Game[] {
  return MOCK_GAMES.filter(game => game.isHot).slice(0, 5);
}

// Get mock new games
export function getMockNewGames(): Game[] {
  return MOCK_GAMES.filter(game => game.isNew).slice(0, 5);
}

// Get mock favorite games
export function getMockFavoriteGames(): Game[] {
  return MOCK_GAMES.filter(game => 
    MOCK_USER.favorites.includes(game.id)
  );
}

// Search mock games
export function searchMockGames(query: string): Game[] {
  const lowerQuery = query.toLowerCase();
  return MOCK_GAMES.filter(game =>
    game.title.toLowerCase().includes(lowerQuery) ||
    game.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}