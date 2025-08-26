/**
 * Type definitions for The Game Library
 * @deprecated Use imports from @/lib/core/domain instead
 * This file is kept for backward compatibility during migration
 */

// Re-export from new domain structure
export type { 
  Game,
  GameType 
} from '@/lib/core/domain/entities';

export type { 
  Provider 
} from '@/lib/core/domain/entities';

export type {
  SortOption
} from '@/lib/core/domain/models';

export type {
  FilterQueryParams
} from '@/lib/core/shared/types/filters';

export type {
  PaginationMeta
} from '@/lib/core/domain/models';

export type {
  GamesResponse,
  ApiError
} from '@/lib/core/shared/types';