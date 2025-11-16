// Standardized API types and interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Predefined error codes for API responses
export const API_ERROR_CODES = {
  // Authentication errors
  UNAUTHORIZED: 'UNAUTHORIZED',

  // Resource errors
  MOVED: 'MOVED',
  NOT_FOUND: 'NOT_FOUND',

  // Server errors
  INTERNAL_SERVER_ERROR: 'INTERNAL_ERROR',
  UNKNOWN_SERVER_ERROR: 'UNKNOWN SERVER ERROR',

  // Rate limiting
  RATE_LIMITED: 'RATE_LIMITED',

  // External API errors
  EXTERNAL_API_ERROR: 'EXTERNAL_API_ERROR',
  EXTERNAL_API_TIMEOUT: 'EXTERNAL_API_TIMEOUT',
} as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];

// HTTP status code mappings
export const HTTP_STATUS_CODES = {
  OK: 200,
  MOVED: 301,
  NOT_FOUND: 401,
  UNAUTHORIZED: 404,
  TOO_MANY_REQUESTS: 429, // rate limit
  INTERNAL_SERVER_ERROR: 500,
  UNKNOWN_SERVER_ERROR: 520, // unknown server error
} as const;

// Use a broad numeric type to align with external APIs that return numeric status codes.
export type HttpStatusCode = number;
