/**
 * API Error Handler
 * Provides standardized error handling for all API operations
 */

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public originalError?: Error,
  ) {
    super(message);
    this.name = 'ApiError';
  }

  isNetworkError(): boolean {
    return this.statusCode === 0 || this.statusCode === 408;
  }

  isServerError(): boolean {
    return this.statusCode >= 500;
  }

  isClientError(): boolean {
    return this.statusCode >= 400 && this.statusCode < 500;
  }

  isAuthError(): boolean {
    return this.statusCode === 401 || this.statusCode === 403;
  }
}

/**
 * Handle Supabase errors and convert to ApiError
 */
export function handleSupabaseError(error: unknown): ApiError {
  if (error instanceof Error) {
    // Supabase error object
    if ('status' in error) {
      const status = (error as any).status || 0;
      return new ApiError(status, error.message, error);
    }

    // Network error
    if (
      error.message.includes('Network') ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('timeout')
    ) {
      return new ApiError(0, 'Network error. Please check your connection.', error);
    }

    // Generic error
    return new ApiError(500, error.message, error);
  }

  return new ApiError(500, 'An unexpected error occurred', undefined);
}

/**
 * Retry-enabled wrapper for async operations
 */
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  operationName: string,
  maxRetries = 2,
): Promise<T> {
  let lastError: ApiError | null = null;
  let retryCount = 0;

  while (retryCount <= maxRetries) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof ApiError ? error : handleSupabaseError(error);

      // Don't retry auth errors or client errors
      if (lastError.isAuthError() || lastError.isClientError()) {
        throw lastError;
      }

      // Only retry on network errors or server errors
      if (!lastError.isNetworkError() && !lastError.isServerError()) {
        throw lastError;
      }

      retryCount += 1;

      if (retryCount <= maxRetries) {
        // Exponential backoff: 1s, 2s, 4s
        const delayMs = 1000 * Math.pow(2, retryCount - 1);
        console.warn(
          `${operationName} failed (attempt ${retryCount}/${maxRetries}). Retrying in ${delayMs}ms...`,
          lastError.message,
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError || new ApiError(500, `${operationName} failed after ${maxRetries} retries`);
}

/**
 * Validate API response data
 */
export function validateData<T>(data: unknown, expectedFields: string[]): T {
  if (!data || typeof data !== 'object') {
    throw new ApiError(500, 'Invalid response data format');
  }

  const obj = data as Record<string, unknown>;
  const missingFields = expectedFields.filter((field) => !(field in obj));

  if (missingFields.length > 0) {
    console.warn(`Response missing fields: ${missingFields.join(', ')}`);
  }

  return data as T;
}

/**
 * Create a safe API call wrapper
 */
export function createApiCall<T>(
  operation: () => Promise<T>,
  operationName: string,
  expectedFields: string[] = [],
): Promise<T> {
  return withErrorHandling(
    async () => {
      const data = await operation();
      if (expectedFields.length > 0) {
        return validateData<T>(data, expectedFields);
      }
      return data;
    },
    operationName,
  );
}
