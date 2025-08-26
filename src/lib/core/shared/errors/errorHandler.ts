/**
 * API Response Handler
 * Unified response handling for all API routes
 */

import { NextResponse } from 'next/server';
import { AppError } from './AppError';
import { HttpStatusCodes, ErrorCodes } from './constants';
import type { PaginationMeta } from '@/lib/core/domain/models';
import { ValidationError } from './AppError';

const API_VERSION = '1.0.0';

/**
 * Standardized API response structure
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    timestamp: string;
    version: string;
    [key: string]: unknown;
  };
  pagination?: PaginationMeta;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
    timestamp: string;
  };
  meta?: {
    timestamp: string;
    version: string;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Handle error and return appropriate NextResponse
 */
export function handleApiError(error: unknown): NextResponse<ApiErrorResponse> {
  console.error('API Error:', error);

  // Handle AppError instances
  if (error instanceof AppError) {
    return createErrorResponse(
      error.code,
      error.message,
      error.statusCode,
      error.details
    );
  }

  // Handle standard Error instances
  if (error instanceof Error) {
    const isDevelopment = process.env.NODE_ENV === 'development';
    return createErrorResponse(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      isDevelopment ? error.message : 'An internal server error occurred',
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      isDevelopment ? { stack: error.stack } : undefined
    );
  }

  // Handle unknown errors
  return createErrorResponse(
    ErrorCodes.INTERNAL_SERVER_ERROR,
    'An unexpected error occurred',
    HttpStatusCodes.INTERNAL_SERVER_ERROR
  );
}

/**
 * Create a success response without pagination
 */
export function createSuccessResponse<T>(
  data: T,
  meta?: Record<string, unknown>,
  status: number = HttpStatusCodes.OK
): NextResponse<ApiSuccessResponse<T>> {
  const response: ApiSuccessResponse<T> = {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      version: API_VERSION,
      ...meta
    }
  };
  
  return NextResponse.json(response, { status });
}

/**
 * Create a success response with pagination
 */
export function createPaginatedResponse<T>(
  data: T,
  pagination: PaginationMeta,
  meta?: Record<string, unknown>,
  status: number = HttpStatusCodes.OK
): NextResponse<ApiSuccessResponse<T>> {
  const response: ApiSuccessResponse<T> = {
    success: true,
    data,
    pagination,
    meta: {
      timestamp: new Date().toISOString(),
      version: API_VERSION,
      ...meta
    }
  };
  
  return NextResponse.json(response, { status });
}

/**
 * Create an error response
 */
export function createErrorResponse(
  code: string,
  message: string,
  status: number = HttpStatusCodes.INTERNAL_SERVER_ERROR,
  details?: unknown
): NextResponse<ApiErrorResponse> {
  const response: ApiErrorResponse = {
    success: false,
    error: {
      code,
      message,
      details,
      timestamp: new Date().toISOString()
    },
    meta: {
      timestamp: new Date().toISOString(),
      version: API_VERSION
    }
  };
  
  return NextResponse.json(response, { status });
}

/**
 * Convenience response creators
 */
export const createNotFoundResponse = (resource: string = 'Resource', id?: string) => {
  const message = id 
    ? `${resource} with ID '${id}' not found`
    : `${resource} not found`;
  
  return createErrorResponse(
    ErrorCodes.NOT_FOUND,
    message,
    HttpStatusCodes.NOT_FOUND,
    { resource, id }
  );
};

export const createBadRequestResponse = (message: string, details?: unknown) => {
  return createErrorResponse(
    ErrorCodes.BAD_REQUEST,
    message,
    HttpStatusCodes.BAD_REQUEST,
    details
  );
};

export const createUnauthorizedResponse = (message: string = 'Authentication required') => {
  return createErrorResponse(
    ErrorCodes.UNAUTHORIZED,
    message,
    HttpStatusCodes.UNAUTHORIZED
  );
};

export const createForbiddenResponse = (message: string = 'Access forbidden') => {
  return createErrorResponse(
    ErrorCodes.FORBIDDEN,
    message,
    HttpStatusCodes.FORBIDDEN
  );
};

/**
 * Validate required fields
 */
export function validateRequiredFields(
  data: Record<string, unknown>,
  requiredFields: string[]
): void {
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null) {
      throw new ValidationError(field, undefined, ['required']);
    }
  }
}

/**
 * Safe JSON parse
 */
export async function safeJsonParse(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new ValidationError('body', undefined, ['Invalid JSON']);
  }
}