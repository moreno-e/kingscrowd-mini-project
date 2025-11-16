import type { ApiResponse, ApiError, ApiErrorCode, HttpStatusCode } from '../types/api';
import { API_ERROR_CODES, HTTP_STATUS_CODES } from '../types/api';

//Creates a standardized API response
export function createApiResponse<T>(
  data?: T,
  success: boolean = true,
  error?: ApiError,
): ApiResponse<T> {
  const response: ApiResponse<T> = {
    success,
    data,
    error,
  };

  return response;
}

// Creates a standardized API error
export function createApiError(
  code: ApiErrorCode,
  message: string,
  details?: any,
  statusCode: HttpStatusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
): { error: ApiError; statusCode: HttpStatusCode } {
  const error: ApiError = {
    code,
    message,
    details,
    timestamp: new Date().toISOString(),
  };

  return { error, statusCode };
}

// Handles API errors
export function handleApiError(
  error: unknown,
  context: string | null,
  statusCode: HttpStatusCode,
): { error: ApiError; statusCode: HttpStatusCode } {
  let apiError: ApiError;
  let finalStatusCode = statusCode;

  if (error instanceof Error) {
    switch (true) {
      // moved
      case error.message.includes('301'):
        apiError = createApiError(
          API_ERROR_CODES.MOVED,
          'Requested Resource moved',
          { context, originalError: error.message },
          HTTP_STATUS_CODES.MOVED,
        ).error;

        finalStatusCode = HTTP_STATUS_CODES.MOVED;

        break;

      // resource not found
      case error.message.includes('401'):
        apiError = createApiError(
          API_ERROR_CODES.NOT_FOUND,
          'Requested resource not found',
          { context, originalError: error.message },
          HTTP_STATUS_CODES.NOT_FOUND,
        ).error;

        finalStatusCode = HTTP_STATUS_CODES.NOT_FOUND;

        break;

      // unauthorized
      case error.message.includes('404'):
        apiError = createApiError(
          API_ERROR_CODES.UNAUTHORIZED,
          'Unauthorized',
          { context, originalError: error.message },
          HTTP_STATUS_CODES.UNAUTHORIZED,
        ).error;

        finalStatusCode = HTTP_STATUS_CODES.UNAUTHORIZED;

        break;

      // rate limit
      case error.message.includes('429'):
        apiError = createApiError(
          API_ERROR_CODES.RATE_LIMITED,
          'Rate limit exceeded',
          { context, originalError: error.message },
          HTTP_STATUS_CODES.TOO_MANY_REQUESTS,
        ).error;

        finalStatusCode = HTTP_STATUS_CODES.TOO_MANY_REQUESTS;

        break;

      // internal server error
      case error.message.includes('500'):
        apiError = createApiError(
          API_ERROR_CODES.INTERNAL_SERVER_ERROR,
          'Rate limit reached',
          { context, originalError: error.message },
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        ).error;

        finalStatusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;

        break;

      default:
        apiError = createApiError(
          API_ERROR_CODES.UNKNOWN_SERVER_ERROR,
          'Internal server error',
          { context, originalError: error.message },
          HTTP_STATUS_CODES.UNKNOWN_SERVER_ERROR,
        ).error;
        break;
    }
  } else {
    apiError = createApiError(
      API_ERROR_CODES.UNKNOWN_SERVER_ERROR,
      'Unknown error occurred',
      { context, originalError: String(error) },
      HTTP_STATUS_CODES.UNKNOWN_SERVER_ERROR,
    ).error;
  }

  console.error(`API Error in ${context}:`, {
    code: apiError.code,
    message: apiError.message,
    details: apiError.details,
    timestamp: apiError.timestamp,
  });

  return { error: apiError, statusCode: finalStatusCode };
}
