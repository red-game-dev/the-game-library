/**
 * Error Constants
 * Centralized error codes and messages for the application
 */

export const ErrorCodes = {
  // General errors
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
  CONFLICT: 'CONFLICT',
  UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  API_ERROR: 'API_ERROR',
  
  // Resource errors
  GAME_NOT_FOUND: 'GAME_NOT_FOUND',
  PROVIDER_NOT_FOUND: 'PROVIDER_NOT_FOUND',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  
  // Fetch errors
  FETCH_GAMES_ERROR: 'FETCH_GAMES_ERROR',
  FETCH_GAME_ERROR: 'FETCH_GAME_ERROR',
  FETCH_PROVIDERS_ERROR: 'FETCH_PROVIDERS_ERROR',
  FETCH_PROVIDER_ERROR: 'FETCH_PROVIDER_ERROR',
  TOGGLE_FAVORITE_ERROR: 'TOGGLE_FAVORITE_ERROR',
  
  // Validation errors
  INVALID_GAME_ID: 'INVALID_GAME_ID',
  INVALID_PROVIDER_ID: 'INVALID_PROVIDER_ID',
  INVALID_FILTER_PARAMS: 'INVALID_FILTER_PARAMS',
  INVALID_PAGINATION: 'INVALID_PAGINATION',
  INVALID_SORT_OPTION: 'INVALID_SORT_OPTION',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
  INVALID_FIELD_TYPE: 'INVALID_FIELD_TYPE',
  
  // Business logic errors
  DUPLICATE_FAVORITE: 'DUPLICATE_FAVORITE',
  FAVORITE_LIMIT_EXCEEDED: 'FAVORITE_LIMIT_EXCEEDED',
  OPERATION_FAILED: 'OPERATION_FAILED',
  
  // Database/Data errors
  DATA_FETCH_ERROR: 'DATA_FETCH_ERROR',
  DATA_SAVE_ERROR: 'DATA_SAVE_ERROR',
  DATA_DELETE_ERROR: 'DATA_DELETE_ERROR',
  DATA_INTEGRITY_ERROR: 'DATA_INTEGRITY_ERROR',
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];

export const ErrorMessages: Record<ErrorCode, string> = {
  // General errors
  [ErrorCodes.INTERNAL_SERVER_ERROR]: 'An internal server error occurred',
  [ErrorCodes.BAD_REQUEST]: 'Invalid request parameters',
  [ErrorCodes.UNAUTHORIZED]: 'Authentication required',
  [ErrorCodes.FORBIDDEN]: 'Access forbidden',
  [ErrorCodes.NOT_FOUND]: 'Resource not found',
  [ErrorCodes.METHOD_NOT_ALLOWED]: 'Method not allowed',
  [ErrorCodes.CONFLICT]: 'Resource conflict',
  [ErrorCodes.UNPROCESSABLE_ENTITY]: 'Unable to process the request',
  [ErrorCodes.TOO_MANY_REQUESTS]: 'Too many requests, please try again later',
  [ErrorCodes.UNKNOWN_ERROR]: 'An unknown error occurred',
  [ErrorCodes.API_ERROR]: 'API request failed',
  
  // Fetch errors
  [ErrorCodes.FETCH_GAMES_ERROR]: 'Failed to fetch games',
  [ErrorCodes.FETCH_GAME_ERROR]: 'Failed to fetch game details',
  [ErrorCodes.FETCH_PROVIDERS_ERROR]: 'Failed to fetch providers',
  [ErrorCodes.FETCH_PROVIDER_ERROR]: 'Failed to fetch provider details',
  [ErrorCodes.TOGGLE_FAVORITE_ERROR]: 'Failed to toggle favorite status',
  
  // Resource errors
  [ErrorCodes.GAME_NOT_FOUND]: 'Game not found',
  [ErrorCodes.PROVIDER_NOT_FOUND]: 'Provider not found',
  [ErrorCodes.USER_NOT_FOUND]: 'User not found',
  [ErrorCodes.RESOURCE_NOT_FOUND]: 'The requested resource was not found',
  
  // Validation errors
  [ErrorCodes.INVALID_GAME_ID]: 'Invalid game ID provided',
  [ErrorCodes.INVALID_PROVIDER_ID]: 'Invalid provider ID provided',
  [ErrorCodes.INVALID_FILTER_PARAMS]: 'Invalid filter parameters',
  [ErrorCodes.INVALID_PAGINATION]: 'Invalid pagination parameters',
  [ErrorCodes.INVALID_SORT_OPTION]: 'Invalid sort option',
  [ErrorCodes.MISSING_REQUIRED_FIELD]: 'Required field is missing',
  [ErrorCodes.INVALID_FIELD_TYPE]: 'Invalid field type',
  
  // Business logic errors
  [ErrorCodes.DUPLICATE_FAVORITE]: 'This item is already in favorites',
  [ErrorCodes.FAVORITE_LIMIT_EXCEEDED]: 'Maximum number of favorites exceeded',
  [ErrorCodes.OPERATION_FAILED]: 'Operation failed',
  
  // Database/Data errors
  [ErrorCodes.DATA_FETCH_ERROR]: 'Failed to fetch data',
  [ErrorCodes.DATA_SAVE_ERROR]: 'Failed to save data',
  [ErrorCodes.DATA_DELETE_ERROR]: 'Failed to delete data',
  [ErrorCodes.DATA_INTEGRITY_ERROR]: 'Data integrity error',
};

export const HttpStatusCodes = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export type HttpStatusCode = typeof HttpStatusCodes[keyof typeof HttpStatusCodes];