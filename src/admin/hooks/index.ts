/**
 * Custom React hooks for admin features
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { useConnection } from '@/admin/contexts/ConnectionContext';
import { withRetry } from '@/admin/services/retryService';
import type { ApiError } from '@/admin/services/errorHandler';

/**
 * Hook for handling async operations with loading, error, and retry states
 */
export function useAsync<T>(
  operation: () => Promise<T>,
  dependencies: unknown[] = [],
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await withRetry(operation, 'Operation', 2);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? (err as ApiError) : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [operation]);

  useEffect(() => {
    execute();
  }, dependencies);

  return { data, loading, error, retry: execute };
}

/**
 * Hook for paginated data loading
 */
export function usePagination<T>(
  fetchPage: (page: number, limit: number) => Promise<T[]>,
  pageSize = 20,
) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const load = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPage(pageNum, pageSize);
      if (data.length < pageSize) {
        setHasMore(false);
      }
      setItems(data);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? (err as ApiError) : new Error('Failed to load'));
    } finally {
      setLoading(false);
    }
  }, [fetchPage, pageSize]);

  const nextPage = useCallback(() => {
    if (hasMore) load(page + 1);
  }, [page, hasMore, load]);

  const prevPage = useCallback(() => {
    if (page > 1) load(page - 1);
  }, [page, load]);

  return { items, page, loading, error, hasMore, nextPage, prevPage, load };
}

/**
 * Hook for debounced search
 */
export function useDebounceSearch<T>(
  search: (query: string) => Promise<T[]>,
  delayMs = 300,
) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleSearch = useCallback(
    (q: string) => {
      setQuery(q);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (!q.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      timeoutRef.current = setTimeout(async () => {
        try {
          const data = await search(q);
          setResults(data);
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? (err as ApiError) : new Error('Search failed'));
        } finally {
          setLoading(false);
        }
      }, delayMs);
    },
    [search, delayMs],
  );

  return { query, results, loading, error, search: handleSearch };
}

/**
 * Hook for form state management
 */
export function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  onSubmit?: (values: T) => Promise<void>,
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

      setValues((prev) => ({
        ...prev,
        [name]: inputValue,
      }));
    },
    [],
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!onSubmit) return;

      try {
        setLoading(true);
        setErrors({});
        await onSubmit(values);
      } catch (err) {
        if (err instanceof Error) {
          setErrors({ submit: err.message });
        }
      } finally {
        setLoading(false);
      }
    },
    [values, onSubmit],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    loading,
    setValues,
    setErrors,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}

/**
 * Hook for connection monitoring
 */
export function useConnectionMonitor() {
  const { isOnline, connectionQuality, connectionErrorMessage } = useConnection();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!isOnline || connectionQuality === 'poor') {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [isOnline, connectionQuality]);

  return {
    isOnline,
    connectionQuality,
    connectionErrorMessage,
    showWarning,
  };
}

/**
 * Hook for local storage state
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
}

/**
 * Hook for tracking previous value
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/**
 * Hook for debounced value
 */
export function useDebounce<T>(value: T, delayMs = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => clearTimeout(handler);
  }, [value, delayMs]);

  return debouncedValue;
}

/**
 * Hook for throttled function
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delayMs = 1000,
): T {
  const lastRunRef = useRef(Date.now());

  return useCallback(
    (...args: any[]) => {
      const now = Date.now();
      if (now - lastRunRef.current >= delayMs) {
        lastRunRef.current = now;
        return callback(...args);
      }
    },
    [callback, delayMs],
  ) as T;
}
