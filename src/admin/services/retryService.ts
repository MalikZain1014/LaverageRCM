/**
 * Retry logic service with exponential backoff
 * Provides utilities for retrying failed async operations
 */

interface RetryOptions {
  maxAttempts?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffMultiplier?: number;
  onRetry?: (attempt: number, error: Error) => void;
  shouldRetry?: (error: Error) => boolean;
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxAttempts: 3,
  initialDelayMs: 1000,
  maxDelayMs: 30000,
  backoffMultiplier: 2,
  onRetry: () => {},
  shouldRetry: (error: Error) => {
    // Retry on network errors, timeouts, and 5xx errors
    return (
      error.message.includes('Network') ||
      error.message.includes('timeout') ||
      error.message.includes('500') ||
      error.message.includes('502') ||
      error.message.includes('503') ||
      error.message.includes('504')
    );
  },
};

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: Error | null = null;
  let delay = opts.initialDelayMs;

  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === opts.maxAttempts || !opts.shouldRetry(lastError)) {
        throw lastError;
      }

      opts.onRetry(attempt, lastError);

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Increase delay for next attempt (exponential backoff)
      delay = Math.min(delay * opts.backoffMultiplier, opts.maxDelayMs);
    }
  }

  throw lastError || new Error('Retry exhausted');
}

/**
 * Wraps a fetch call with retry logic
 */
export async function fetchWithRetry(
  url: string,
  options?: RequestInit & { retryOptions?: RetryOptions },
): Promise<Response> {
  const { retryOptions, ...fetchOptions } = options || {};

  return withRetry(
    async () => {
      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
        throw error;
      }

      return response;
    },
    retryOptions,
  );
}

/**
 * Health check that verifies connectivity
 */
export async function checkConnection(): Promise<{
  isConnected: boolean;
  latency: number;
  error?: string;
}> {
  try {
    const start = performance.now();
    const response = await fetch('https://www.gstatic.com/generate_204', {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-cache',
    });
    const latency = performance.now() - start;

    return {
      isConnected: response.ok || response.status === 204,
      latency,
    };
  } catch (error) {
    return {
      isConnected: false,
      latency: -1,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Circuit breaker pattern for handling cascading failures
 */
export class CircuitBreaker {
  private failureCount = 0;
  private successCount = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  private nextAttemptTime = 0;

  constructor(
    private failureThreshold = 5,
    private successThreshold = 2,
    private timeoutMs = 60000,
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() < this.nextAttemptTime) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'half-open';
      this.successCount = 0;
    }

    try {
      const result = await fn();

      if (this.state === 'half-open') {
        this.successCount += 1;
        if (this.successCount >= this.successThreshold) {
          this.reset();
        }
      } else {
        this.failureCount = 0;
      }

      return result;
    } catch (error) {
      this.failureCount += 1;

      if (this.failureCount >= this.failureThreshold) {
        this.state = 'open';
        this.nextAttemptTime = Date.now() + this.timeoutMs;
      }

      throw error;
    }
  }

  reset() {
    this.state = 'closed';
    this.failureCount = 0;
    this.successCount = 0;
    this.nextAttemptTime = 0;
  }

  getState() {
    return this.state;
  }
}
