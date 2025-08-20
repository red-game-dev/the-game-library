/**
 * Mock API endpoint for games
 * Supports filtering, searching, pagination, and sorting
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateGames } from '@/lib/mock-data/games-generator';
import providers from '@/lib/mock-data/providers.json';
import type { Game, GameFilters, GamesResponse, GameType, SortOption } from '@/lib/types';

// In-memory cache for session persistence
let gamesCache: Game[] | null = null;
let favoritesCache = new Set<string>();

// Initialize games on first request
function getGames(): Game[] {
  if (!gamesCache) {
    gamesCache = generateGames();
  }
  return gamesCache.map(game => ({
    ...game,
    isFavorite: favoritesCache.has(game.id)
  }));
}

// Simulate network delay
async function simulateDelay(ms: number = 500) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

// Filter games based on query parameters
function filterGames(games: Game[], filters: GameFilters): Game[] {
  let filtered = [...games];

  // Search filter (title and tags)
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(game => 
      game.title.toLowerCase().includes(searchLower) ||
      game.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Provider filter
  if (filters.providers && filters.providers.length > 0) {
    filtered = filtered.filter(game => 
      filters.providers!.includes(game.provider.id)
    );
  }

  // Type filter
  if (filters.types && filters.types.length > 0) {
    filtered = filtered.filter(game => 
      filters.types!.includes(game.type)
    );
  }

  // Favorites filter
  if (filters.favorites) {
    filtered = filtered.filter(game => game.isFavorite);
  }

  // Sorting
  const sortOption = filters.sort || 'popular';
  switch (sortOption) {
    case 'popular':
      filtered.sort((a, b) => (b.playCount || 0) - (a.playCount || 0));
      break;
    case 'new':
      filtered.sort((a, b) => {
        const dateA = new Date(a.releaseDate || 0).getTime();
        const dateB = new Date(b.releaseDate || 0).getTime();
        return dateB - dateA;
      });
      break;
    case 'az':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  return filtered;
}

// Paginate results
function paginateGames(games: Game[], page: number = 1, pageSize: number = 20) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedGames = games.slice(start, end);
  
  return {
    games: paginatedGames,
    pagination: {
      page,
      pageSize,
      total: games.length,
      totalPages: Math.ceil(games.length / pageSize),
      hasMore: end < games.length
    }
  };
}

export async function GET(request: NextRequest) {
  try {
    // Add delay to simulate real API
    await simulateDelay(300 + Math.random() * 500); // 300-800ms

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    
    const filters: GameFilters = {
      search: searchParams.get('search') || undefined,
      providers: searchParams.get('providers')?.split(',').filter(Boolean),
      types: searchParams.get('types')?.split(',').filter(Boolean) as GameType[],
      sort: (searchParams.get('sort') as SortOption) || 'popular',
      favorites: searchParams.get('favorites') === 'true',
      page: parseInt(searchParams.get('page') || '1'),
      pageSize: parseInt(searchParams.get('pageSize') || '20')
    };

    // Get all games
    const allGames = getGames();
    
    // Apply filters
    const filteredGames = filterGames(allGames, filters);
    
    // Paginate
    const { games, pagination } = paginateGames(
      filteredGames,
      filters.page,
      filters.pageSize
    );

    // Build response
    const response: GamesResponse = {
      data: games,
      pagination,
      meta: {
        providers: providers,
        types: ['slots', 'table', 'live', 'instant'] as GameType[],
        totalGames: allGames.length
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in /api/games:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Toggle favorite status
export async function POST(request: NextRequest) {
  try {
    await simulateDelay(200);

    const body = await request.json();
    const { gameId, isFavorite } = body;

    if (!gameId) {
      return NextResponse.json(
        { error: 'Game ID is required' },
        { status: 400 }
      );
    }

    // Update favorites cache
    if (isFavorite) {
      favoritesCache.add(gameId);
    } else {
      favoritesCache.delete(gameId);
    }

    // Find and update the game
    const games = getGames();
    const game = games.find(g => g.id === gameId);
    
    if (!game) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...game,
      isFavorite
    });
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}