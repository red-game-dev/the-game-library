/**
 * Custom Application Error Classes
 */

import { ErrorCode, ErrorCodes, ErrorMessages, HttpStatusCode, HttpStatusCodes } from './constants';

/**
 * Base application error class
 */
export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: HttpStatusCode;
  public readonly details?: unknown;
  public readonly timestamp: Date;

  constructor(
    code: ErrorCode,
    message?: string,
    statusCode?: HttpStatusCode,
    details?: unknown
  ) {
    super(message || ErrorMessages[code]);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR;
    this.details = details;
    this.timestamp = new Date();

    // Maintains proper stack trace for where error was thrown
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
      timestamp: this.timestamp,
    };
  }
}

/**
 * Not Found Error
 */
export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource', id?: string) {
    const message = id 
      ? `${resource} with ID '${id}' not found`
      : `${resource} not found`;
    
    super(
      ErrorCodes.NOT_FOUND,
      message,
      HttpStatusCodes.NOT_FOUND,
      { resource, id }
    );
    this.name = 'NotFoundError';
  }
}

/**
 * Validation Error
 */
export class ValidationError extends AppError {
  constructor(field: string, value?: unknown, constraints?: string[]) {
    const message = `Validation failed for field '${field}'`;
    
    super(
      ErrorCodes.BAD_REQUEST,
      message,
      HttpStatusCodes.BAD_REQUEST,
      { field, value, constraints }
    );
    this.name = 'ValidationError';
  }
}

/**
 * Game Not Found Error
 */
export class GameNotFoundError extends AppError {
  constructor(gameId: string) {
    const message = `Game with ID '${gameId}' not found`;
    super(ErrorCodes.GAME_NOT_FOUND, message, HttpStatusCodes.NOT_FOUND);
    this.name = 'GameNotFoundError';
  }
}

/**
 * Provider Not Found Error
 */
export class ProviderNotFoundError extends AppError {
  constructor(providerId: string) {
    const message = `Provider with ID '${providerId}' not found`;
    super(ErrorCodes.PROVIDER_NOT_FOUND, message, HttpStatusCodes.NOT_FOUND);
    this.name = 'ProviderNotFoundError';
  }
}

/**
 * Invalid Filter Error
 */
export class InvalidFilterError extends AppError {
  constructor(filterName: string, value: unknown) {
    super(
      ErrorCodes.INVALID_FILTER_PARAMS,
      `Invalid filter parameter '${filterName}' with value '${value}'`,
      HttpStatusCodes.BAD_REQUEST,
      { filterName, value }
    );
    this.name = 'InvalidFilterError';
  }
}

/**
 * Invalid Pagination Error
 */
export class InvalidPaginationError extends AppError {
  constructor(page?: number, pageSize?: number) {
    super(
      ErrorCodes.INVALID_PAGINATION,
      'Invalid pagination parameters',
      HttpStatusCodes.BAD_REQUEST,
      { page, pageSize }
    );
    this.name = 'InvalidPaginationError';
  }
}

/**
 * Operation Failed Error
 */
export class OperationFailedError extends AppError {
  constructor(operation: string, reason?: string) {
    super(
      ErrorCodes.OPERATION_FAILED,
      `Operation '${operation}' failed${reason ? `: ${reason}` : ''}`,
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      { operation, reason }
    );
    this.name = 'OperationFailedError';
  }
}

/**
 * Data Fetch Error
 */
export class DataFetchError extends AppError {
  constructor(resource: string, error?: unknown) {
    super(
      ErrorCodes.DATA_FETCH_ERROR,
      `Failed to fetch ${resource}`,
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      { resource, originalError: error }
    );
    this.name = 'DataFetchError';
  }
}

/**
 * Network Error
 */
export class NetworkError extends AppError {
  constructor(message: string = 'Network error occurred', details?: unknown) {
    super(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      message,
      HttpStatusCodes.SERVICE_UNAVAILABLE,
      details
    );
    this.name = 'NetworkError';
  }
}

/**
 * Timeout Error
 */
export class TimeoutError extends AppError {
  constructor(message: string = 'Request timed out', timeout?: number) {
    super(
      ErrorCodes.TOO_MANY_REQUESTS,
      message,
      HttpStatusCodes.REQUEST_TIMEOUT,
      { timeout }
    );
    this.name = 'TimeoutError';
  }
}

/**
 * API Error - for general API errors
 */
export class ApiError extends AppError {
  constructor(
    message: string,
    code: string = ErrorCodes.INTERNAL_SERVER_ERROR,
    statusCode: number = HttpStatusCodes.INTERNAL_SERVER_ERROR,
    details?: unknown
  ) {
    super(code as ErrorCode, message, statusCode as HttpStatusCode, details);
    this.name = 'ApiError';
  }
}