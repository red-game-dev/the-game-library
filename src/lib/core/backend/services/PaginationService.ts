/**
 * @fileoverview PaginationService - Handles pagination logic consistently across the application
 * @module lib/core/backend/services
 */

import { 
  DEFAULT_PAGE, 
  DEFAULT_PAGE_SIZE, 
  MAX_PAGE_SIZE, 
  MIN_PAGE,
  MIN_PAGE_SIZE 
} from '@/lib/core/config/constants/app.constants';

/**
 * Pagination info with all metadata
 */
export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  hasPrevious: boolean;
  nextPage: number | null;
  previousPage: number | null;
  startIndex: number;
  endIndex: number;
}

/**
 * Pagination request parameters
 */
export interface PaginationRequest {
  page?: number;
  pageSize?: number;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
  meta?: Record<string, unknown>;
}

/**
 * Service for handling pagination consistently across the application
 */
export class PaginationService {

  /**
   * Apply pagination to an array of data
   */
  static paginate<T>(
    data: T[],
    request: PaginationRequest = {}
  ): PaginatedResponse<T> {
    const { page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE } = request;
    
    // Validate inputs
    const validatedPage = Math.max(MIN_PAGE, page);
    const validatedPageSize = Math.min(MAX_PAGE_SIZE, Math.max(MIN_PAGE_SIZE, pageSize));
    
    // Calculate pagination
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / validatedPageSize);
    const currentPage = Math.min(validatedPage, totalPages || 1);
    
    // Calculate slice indices
    const startIndex = (currentPage - 1) * validatedPageSize;
    const endIndex = startIndex + validatedPageSize;
    
    // Slice data
    const paginatedData = data.slice(startIndex, endIndex);
    
    // Create pagination info - always include startIndex and endIndex
    const paginationInfo: PaginationInfo = {
      page: currentPage,
      pageSize: validatedPageSize,
      total: totalItems,
      totalPages,
      hasMore: currentPage < totalPages,
      hasPrevious: currentPage > 1,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      previousPage: currentPage > 1 ? currentPage - 1 : null,
      startIndex: startIndex,
      endIndex: Math.min(endIndex - 1, totalItems - 1)
    };
    
    return {
      data: paginatedData,
      pagination: paginationInfo
    };
  }


  /**
   * Calculate offset for database queries
   */
  static calculateOffset(page: number, pageSize: number): number {
    const validatedPage = Math.max(MIN_PAGE, page);
    const validatedPageSize = Math.max(MIN_PAGE_SIZE, pageSize);
    return (validatedPage - 1) * validatedPageSize;
  }

  /**
   * Validate pagination parameters
   */
  static validateParams(request: PaginationRequest): PaginationRequest {
    return {
      page: Math.max(MIN_PAGE, request.page || DEFAULT_PAGE),
      pageSize: Math.min(
        MAX_PAGE_SIZE,
        Math.max(MIN_PAGE_SIZE, request.pageSize || DEFAULT_PAGE_SIZE)
      )
    };
  }


  /**
   * Create empty pagination response
   */
  static emptyResponse<T>(): PaginatedResponse<T> {
    return {
      data: [],
      pagination: {
        page: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        total: 0,
        totalPages: 0,
        hasMore: false,
        hasPrevious: false,
        nextPage: null,
        previousPage: null,
        startIndex: 0,
        endIndex: 0
      }
    };
  }

  /**
   * Merge multiple paginated responses
   */
  static mergeResponses<T>(
    responses: PaginatedResponse<T>[]
  ): PaginatedResponse<T> {
    if (responses.length === 0) return this.emptyResponse();
    
    const mergedData = responses.flatMap(r => r.data);
    const totalItems = responses.reduce((sum, r) => sum + r.pagination.total, 0);
    
    return {
      data: mergedData,
      pagination: {
        page: 1,
        pageSize: mergedData.length,
        total: totalItems,
        totalPages: 1,
        hasMore: false,
        hasPrevious: false,
        nextPage: null,
        previousPage: null,
        startIndex: 0,
        endIndex: mergedData.length - 1
      }
    };
  }
}

export default PaginationService;