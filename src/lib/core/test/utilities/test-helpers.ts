/**
 * Test Utilities and Helpers
 * Common utilities for testing and mocking
 */

import type { PaginationMeta } from '@/lib/core/domain/models';
import type { FilterQueryParams } from '@/lib/core/shared/types/filters';
import { GAME_TYPES } from '@/lib/core/config/constants/app.constants';

/**
 * Create a mock FilterQueryParams object for testing
 */
export function createMockSearchCriteria(overrides: Partial<FilterQueryParams> = {}): FilterQueryParams {
  return {
    search: '',
    providers: [],
    types: [],
    sort: 'popular' as const,
    favorites: false,
    page: 1,
    pageSize: 20,
    tags: [],
    isNew: false,
    isHot: false,
    ...overrides
  };
}

/**
 * Create a mock PaginationMeta object for testing
 */
export function createMockPaginationMeta(overrides: Partial<PaginationMeta> = {}): PaginationMeta {
  return {
    page: 1,
    pageSize: 20,
    total: 100,
    totalPages: 5,
    hasMore: true,
    hasPrevious: false,
    startIndex: 0,
    endIndex: 19,
    ...overrides
  };
}

/**
 * Create a mock API response for testing
 */
export function createMockApiResponse<T>(data: T, pagination?: PaginationMeta) {
  if (pagination) {
    return {
      success: true,
      data,
      pagination,
      meta: {
        providers: [],
        types: [...GAME_TYPES],
        totalGames: 100
      }
    };
  }
  
  return {
    success: true,
    data,
    meta: {}
  };
}

/**
 * Create a mock error response for testing
 */
export function createMockErrorResponse(code: string, message: string, statusCode: number = 400) {
  return {
    success: false,
    error: {
      code,
      message,
      statusCode,
      timestamp: new Date().toISOString()
    }
  };
}

/**
 * Create a delay for testing async operations
 */
export async function testDelay(ms: number = 100): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Create a mock fetch response
 */
export function createMockFetchResponse<T>(data: T, ok: boolean = true, status: number = 200) {
  return {
    ok,
    status,
    statusText: ok ? 'OK' : 'Error',
    json: async () => data,
    text: async () => JSON.stringify(data),
    headers: new Headers({
      'content-type': 'application/json'
    })
  } as Response;
}