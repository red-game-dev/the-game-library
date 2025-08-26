/**
 * Shared Types
 * Common types used across the application
 */

export * from './ApiResponse';
export * from './uiTypes';
export * from './tags';
export * from './filters';

// Re-export commonly used types for convenience
export type { PaginationMeta } from '@/lib/core/domain/models';

// Re-export response types from error handler (unified response structure)
export type { 
  ApiSuccessResponse, 
  ApiErrorResponse, 
  ApiResponse 
} from '@/lib/core/shared/errors/errorHandler';