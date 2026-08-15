/**
 * Batch operations utilities for bulk actions on CMS items
 */

export interface BatchOperation<T> {
  id: string;
  item: T;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
  result?: unknown;
}

export class BatchOperationManager<T> {
  private operations: Map<string, BatchOperation<T>> = new Map();
  private processingQueue: string[] = [];
  private isProcessing = false;
  private concurrency = 3;
  private activeCount = 0;

  async processAll(
    fn: (item: T, id: string) => Promise<unknown>,
    onProgress?: (completed: number, total: number) => void,
  ): Promise<Map<string, BatchOperation<T>>> {
    this.isProcessing = true;

    while (this.processingQueue.length > 0 || this.activeCount > 0) {
      // Start new operations up to concurrency limit
      while (this.processingQueue.length > 0 && this.activeCount < this.concurrency) {
        const opId = this.processingQueue.shift();
        if (!opId) break;

        const op = this.operations.get(opId);
        if (op) {
          this.activeCount += 1;
          this.processOperation(fn, op, opId).finally(() => {
            this.activeCount -= 1;
            onProgress?.call(null, this.getCompletedCount(), this.operations.size);
          });
        }
      }

      // Wait a bit before checking again
      if (this.activeCount > 0) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }

    this.isProcessing = false;
    return this.operations;
  }

  private async processOperation<T>(
    fn: (item: T, id: string) => Promise<unknown>,
    op: BatchOperation<T>,
    id: string,
  ) {
    try {
      op.status = 'processing';
      op.result = await fn(op.item, id);
      op.status = 'completed';
    } catch (error) {
      op.status = 'failed';
      op.error = error instanceof Error ? error.message : String(error);
    }
  }

  add(id: string, item: T) {
    const operation: BatchOperation<T> = {
      id,
      item,
      status: 'pending',
    };
    this.operations.set(id, operation);
    this.processingQueue.push(id);
  }

  getOperation(id: string): BatchOperation<T> | undefined {
    return this.operations.get(id);
  }

  getCompletedCount(): number {
    return Array.from(this.operations.values()).filter((op) => op.status === 'completed').length;
  }

  getFailedCount(): number {
    return Array.from(this.operations.values()).filter((op) => op.status === 'failed').length;
  }

  getSuccessRate(): number {
    if (this.operations.size === 0) return 0;
    return (this.getCompletedCount() / this.operations.size) * 100;
  }

  clear() {
    this.operations.clear();
    this.processingQueue = [];
    this.isProcessing = false;
    this.activeCount = 0;
  }
}

/**
 * Bulk delete operation
 */
export async function bulkDelete(
  ids: string[],
  deleteFunc: (id: string) => Promise<void>,
  onProgress?: (completed: number, total: number) => void,
): Promise<{ succeeded: number; failed: number; errors: Record<string, string> }> {
  const manager = new BatchOperationManager<string>();
  const errors: Record<string, string> = {};

  ids.forEach((id) => manager.add(id, id));

  const results = await manager.processAll(async (id) => {
    await deleteFunc(id);
  }, onProgress);

  let succeeded = 0;
  let failed = 0;

  results.forEach((op, id) => {
    if (op.status === 'completed') {
      succeeded += 1;
    } else if (op.status === 'failed') {
      failed += 1;
      if (op.error) {
        errors[id] = op.error;
      }
    }
  });

  return { succeeded, failed, errors };
}

/**
 * Bulk update operation
 */
export async function bulkUpdate<T>(
  items: T[],
  updateFunc: (item: T) => Promise<void>,
  onProgress?: (completed: number, total: number) => void,
): Promise<{ succeeded: number; failed: number; errors: Record<string, string> }> {
  const manager = new BatchOperationManager<T>();
  const errors: Record<string, string> = {};

  items.forEach((item, index) => manager.add(String(index), item));

  const results = await manager.processAll(async (item) => {
    await updateFunc(item);
  }, onProgress);

  let succeeded = 0;
  let failed = 0;

  results.forEach((op, id) => {
    if (op.status === 'completed') {
      succeeded += 1;
    } else if (op.status === 'failed') {
      failed += 1;
      if (op.error) {
        errors[id] = op.error;
      }
    }
  });

  return { succeeded, failed, errors };
}

/**
 * Paginated batch operations
 */
export async function processPaginatedBatch<T>(
  getPage: (page: number, limit: number) => Promise<T[]>,
  process: (items: T[]) => Promise<void>,
  limit = 50,
  onProgress?: (completed: number) => void,
): Promise<{ totalProcessed: number; totalFailed: number }> {
  let page = 1;
  let totalProcessed = 0;
  let totalFailed = 0;

  while (true) {
    try {
      const items = await getPage(page, limit);
      if (items.length === 0) break;

      try {
        await process(items);
        totalProcessed += items.length;
      } catch (error) {
        totalFailed += items.length;
        console.error(`Failed to process batch at page ${page}:`, error);
      }

      onProgress?.(totalProcessed);

      if (items.length < limit) {
        break;
      }

      page += 1;
    } catch (error) {
      console.error('Error fetching page:', error);
      break;
    }
  }

  return { totalProcessed, totalFailed };
}
