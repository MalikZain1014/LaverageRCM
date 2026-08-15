/**
 * Request queue service
 * Manages async operations in a queue to prevent race conditions
 * and ensure operations complete in order
 */

interface QueuedRequest<T> {
  id: string;
  fn: () => Promise<T>;
  priority: number;
  resolve: (value: T) => void;
  reject: (reason: Error) => void;
}

export class RequestQueue {
  private queue: QueuedRequest<unknown>[] = [];
  private isProcessing = false;
  private maxConcurrent = 3;
  private activeRequests = 0;

  async add<T>(
    fn: () => Promise<T>,
    priority = 0,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const request: QueuedRequest<T> = {
        id: Math.random().toString(36).substr(2, 9),
        fn,
        priority,
        resolve,
        reject,
      };

      this.queue.push(request);
      this.queue.sort((a, b) => b.priority - a.priority);
      this.process();
    });
  }

  private async process() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0 && this.activeRequests < this.maxConcurrent) {
      const request = this.queue.shift();
      if (!request) break;

      this.activeRequests += 1;

      try {
        const result = await request.fn();
        request.resolve(result);
      } catch (error) {
        request.reject(error instanceof Error ? error : new Error(String(error)));
      } finally {
        this.activeRequests -= 1;
      }
    }

    this.isProcessing = false;

    if (this.queue.length > 0) {
      await this.process();
    }
  }

  getQueueLength() {
    return this.queue.length;
  }

  clear() {
    this.queue = [];
  }
}

// Global request queue instance
export const globalRequestQueue = new RequestQueue();

/**
 * Batch operations processor
 * Groups multiple operations and executes them efficiently
 */
export class BatchProcessor<T> {
  private batchSize: number;
  private delayMs: number;
  private timer: NodeJS.Timeout | null = null;
  private batch: T[] = [];
  private resolvers: Array<(value: void) => void> = [];

  constructor(
    private processor: (items: T[]) => Promise<void>,
    batchSize = 10,
    delayMs = 100,
  ) {
    this.batchSize = batchSize;
    this.delayMs = delayMs;
  }

  async add(item: T): Promise<void> {
    return new Promise((resolve) => {
      this.batch.push(item);
      this.resolvers.push(resolve);

      // Clear existing timer
      if (this.timer) clearTimeout(this.timer);

      // Process immediately if batch is full
      if (this.batch.length >= this.batchSize) {
        this.flush();
      } else {
        // Otherwise, set a timer
        this.timer = setTimeout(() => this.flush(), this.delayMs);
      }
    });
  }

  private async flush() {
    if (this.batch.length === 0) return;

    const items = this.batch;
    const resolvers = this.resolvers;

    this.batch = [];
    this.resolvers = [];

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    try {
      await this.processor(items);
      resolvers.forEach((resolve) => resolve());
    } catch (error) {
      // Log error but don't throw - batch processor should be resilient
      console.error('Batch processing failed:', error);
      resolvers.forEach((resolve) => resolve());
    }
  }

  async waitForFlush() {
    return this.flush();
  }
}

/**
 * Throttle function - limits how often a function can be called
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delayMs: number,
): T {
  let lastCall = 0;
  let timeoutId: NodeJS.Timeout | null = null;
  let lastArgs: unknown[] | null = null;

  return ((...args: unknown[]) => {
    lastArgs = args;
    const now = Date.now();

    if (now - lastCall >= delayMs) {
      lastCall = now;
      fn(...args);
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        if (lastArgs) fn(...lastArgs);
      }, delayMs - (now - lastCall));
    }
  }) as T;
}

/**
 * Debounce function - waits for function to stop being called before executing
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delayMs: number,
): T {
  let timeoutId: NodeJS.Timeout | null = null;

  return ((...args: unknown[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delayMs);
  }) as T;
}

/**
 * Memoize function results
 */
export function memoize<T extends (...args: unknown[]) => unknown>(
  fn: T,
  options = { maxSize: 50 },
): T {
  const cache = new Map<string, unknown>();

  return ((...args: unknown[]) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);

    if (cache.size > options.maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    return result;
  }) as T;
}
