/**
 * Type definitions for The Game Library
 */

export type GameType = 'slots' | 'table' | 'live' | 'instant';
export type SortOption = 'popular' | 'new' | 'az';

export interface Provider {
  id: string;
  name: string;
  logo?: string;
  gameCount?: number;
}

export interface Game {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  description?: string;
  provider: Provider;
  type: GameType;
  isNew?: boolean;
  isHot?: boolean;
  isOnSale?: boolean;
  isFavorite?: boolean;
  tags?: string[];
  playCount?: number;
  releaseDate?: string;
  rtp?: number; // Return to Player percentage
}

export interface GameFilters {
  search?: string;
  providers?: string[];
  types?: GameType[];
  sort?: SortOption;
  favorites?: boolean;
  page?: number;
  pageSize?: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface GamesResponse {
  data: Game[];
  pagination: PaginationMeta;
  meta: {
    providers: Provider[];
    types: GameType[];
    totalGames: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}