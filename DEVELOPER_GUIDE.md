# Developer Quick Reference Guide

## 🚀 Common Tasks & Code Examples

### Error Handling

#### Basic Error Handling
```typescript
import { handleSupabaseError, type ApiError } from '@/admin/services/errorHandler';

try {
  await someAsyncOperation();
} catch (error) {
  const apiError = handleSupabaseError(error);
  console.error(`Error: ${apiError.message}`);
  
  if (apiError.isNetworkError()) {
    // Handle offline
  } else if (apiError.isServerError()) {
    // Server error - may retry
  } else if (apiError.isClientError()) {
    // Client error - show validation message
  }
}
```

#### With Automatic Retry
```typescript
import { withRetry } from '@/admin/services/retryService';

const result = await withRetry(
  async () => {
    const { data, error } = await supabase.from('table').select();
    if (error) throw error;
    return data;
  },
  'Fetch data',
  3, // max retries
);
```

### Connection Monitoring

#### Check Connection Status
```typescript
import { useConnection } from '@/admin/contexts/ConnectionContext';

export function MyComponent() {
  const { isOnline, connectionQuality } = useConnection();
  
  if (!isOnline) {
    return <div>You are offline</div>;
  }
  
  if (connectionQuality === 'poor') {
    return <div>Connection is slow</div>;
  }
  
  return <div>All good!</div>;
}
```

#### Connection Health Check
```typescript
import { checkConnection } from '@/admin/services/retryService';

const { isConnected, latency } = await checkConnection();
console.log(`Connected: ${isConnected}, Latency: ${latency}ms`);
```

### Batch Operations

#### Bulk Delete
```typescript
import { bulkDelete } from '@/admin/services/batchOperations';

const result = await bulkDelete(
  ['id1', 'id2', 'id3'],
  async (id) => {
    await deleteService.remove(id);
  },
  (completed, total) => {
    console.log(`Progress: ${completed}/${total}`);
  }
);

console.log(`Success: ${result.succeeded}, Failed: ${result.failed}`);
```

#### Custom Batch Processing
```typescript
import { BatchOperationManager } from '@/admin/services/batchOperations';

const manager = new BatchOperationManager<MyItem>();

items.forEach((item) => manager.add(item.id, item));

const results = await manager.processAll(
  async (item) => {
    // Process item
    await updateService.update(item);
  },
  (completed, total) => {
    console.log(`${completed}/${total} complete`);
  }
);
```

### Custom Hooks

#### Async Data Loading
```typescript
import { useAsync } from '@/admin/hooks';

export function MyPage() {
  const { data, loading, error, retry } = useAsync(
    async () => {
      const res = await supabase.from('items').select();
      return res.data;
    },
    [], // dependencies
  );
  
  if (loading) return <Skeleton />;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.map(item => <div key={item.id}>{item.name}</div>)}
      <button onClick={retry}>Retry</button>
    </div>
  );
}
```

#### Form Management
```typescript
import { useForm } from '@/admin/hooks';

export function MyForm() {
  const { values, errors, touched, loading, handleChange, handleSubmit } = useForm(
    { name: '', email: '' },
    async (values) => {
      await submitForm(values);
    }
  );
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      {touched.name && errors.name && <span>{errors.name}</span>}
      
      <button type="submit" disabled={loading}>Submit</button>
    </form>
  );
}
```

#### Pagination
```typescript
import { usePagination } from '@/admin/hooks';

export function ItemsList() {
  const { items, page, loading, hasMore, nextPage, prevPage } = usePagination(
    async (pageNum, limit) => {
      const res = await supabase.from('items').select().range(
        pageNum * limit,
        (pageNum + 1) * limit - 1
      );
      return res.data || [];
    },
    20 // page size
  );
  
  return (
    <div>
      {items.map(item => <div key={item.id}>{item.name}</div>)}
      <button onClick={prevPage} disabled={page === 1}>Previous</button>
      <button onClick={nextPage} disabled={!hasMore || loading}>Next</button>
    </div>
  );
}
```

#### Debounced Search
```typescript
import { useDebounceSearch } from '@/admin/hooks';

export function SearchUsers() {
  const { query, results, loading, search } = useDebounceSearch(
    async (q) => {
      const res = await supabase
        .from('users')
        .select()
        .ilike('name', `%${q}%`);
      return res.data || [];
    },
    300 // delay in ms
  );
  
  return (
    <div>
      <input value={query} onChange={(e) => search(e.target.value)} />
      {loading && <div>Searching...</div>}
      {results.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}
```

#### Connection Monitoring
```typescript
import { useConnectionMonitor } from '@/admin/hooks';

export function StatusBar() {
  const { isOnline, connectionQuality, showWarning } = useConnectionMonitor();
  
  if (!showWarning) return null;
  
  return (
    <div className="warning-banner">
      {!isOnline && 'You are offline'}
      {connectionQuality === 'poor' && 'Connection is slow'}
    </div>
  );
}
```

### Request Queue

#### Queued Async Operations
```typescript
import { globalRequestQueue } from '@/admin/services/queueService';

// This will execute immediately
const result1 = await globalRequestQueue.add(() => operation1());

// These will wait until slots are available (default: 3 concurrent)
const result2 = await globalRequestQueue.add(() => operation2());
const result3 = await globalRequestQueue.add(() => operation3());

// With priority (higher = execute first)
const important = await globalRequestQueue.add(() => criticalOp(), 10);
const normal = await globalRequestQueue.add(() => normalOp(), 0);
```

### Utility Functions

#### Format Functions
```typescript
import {
  formatBytes,
  formatDate,
  formatRelativeTime,
  truncate,
  capitalize,
} from '@/admin/utils/helpers';

formatBytes(1024) // "1 KB"
formatDate(new Date()) // "8/13/2026"
formatRelativeTime('2026-08-13T12:00:00') // "2 hours ago"
truncate('Long text here', 10) // "Long text..."
capitalize('hello') // "Hello"
```

#### Validation Functions
```typescript
import {
  isValidEmail,
  isValidUrl,
  isEmpty,
  slugify,
} from '@/admin/utils/helpers';

isValidEmail('user@example.com') // true
isValidUrl('https://example.com') // true
isEmpty('') // true
slugify('My Blog Post') // "my-blog-post"
```

#### Data Functions
```typescript
import {
  deepClone,
  groupBy,
  shuffle,
  randomItem,
} from '@/admin/utils/helpers';

deepClone({ a: 1, b: { c: 2 } }) // Full deep copy
groupBy(items, 'category') // { category1: [...], category2: [...] }
shuffle([1, 2, 3]) // Random order
randomItem([1, 2, 3]) // Random element
```

### Error Boundary

#### Wrapping Components
```typescript
import ErrorBoundary from '@/admin/components/ErrorBoundary';

export function App() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
}
```

#### Catching Async Errors
```typescript
// Note: Error Boundary catches render errors, not async errors
// Use try-catch for async operations

async function handleClick() {
  try {
    await riskyOperation();
  } catch (error) {
    toast.error('Operation failed');
  }
}
```

### Analytics Dashboard

#### Using in Admin Pages
```typescript
import AnalyticsDashboard from '@/admin/components/AnalyticsDashboard';

export function AdminPage() {
  return (
    <div>
      <PageHeader title="Dashboard" />
      <AnalyticsDashboard />
      {/* Rest of page */}
    </div>
  );
}
```

## 🔍 Debugging Tips

### Check Connection Quality
1. Open DevTools → Console
2. Look for connection quality logs
3. Check `useConnection()` hook values

### Monitor API Calls
1. Open DevTools → Network tab
2. Look for Supabase requests
3. Check Response tab for errors

### Track Retries
1. Open DevTools → Console
2. Look for "Retrying in Xms" messages
3. Check retry count and error details

### Review Error Logs
1. Check Error Boundary messages
2. Review console for ApiError objects
3. Check connection error messages

## ⚡ Performance Tips

1. **Use useMemo for expensive computations**
   ```typescript
   const memoizedData = useMemo(() => expensiveComputation(), [deps]);
   ```

2. **Throttle scroll/resize handlers**
   ```typescript
   import { useThrottle } from '@/admin/hooks';
   const handleScroll = useThrottle(() => { /* ... */ }, 500);
   ```

3. **Lazy load list items**
   ```typescript
   const { items } = usePagination(fetchPage, 20); // Load 20 at a time
   ```

4. **Debounce search input**
   ```typescript
   const { search } = useDebounceSearch(searchFunc, 300); // Wait 300ms
   ```

## 🆘 Common Issues & Solutions

### Issue: Network requests failing
**Solution**: Check connection indicator, verify `useConnection()` shows `isOnline: true`

### Issue: Retries aren't happening
**Solution**: Use `withRetry()` wrapper, check console for retry messages

### Issue: Component keeps crashing
**Solution**: Check Error Boundary is wrapping component, review console errors

### Issue: Form not submitting
**Solution**: Check `loading` state, verify `handleSubmit` is on form, check network tab

### Issue: Search is slow
**Solution**: Use `useDebounceSearch` instead of `useAsync`, increase delay if needed

---

**For more details, see:**
- `SETUP.md` - Setup instructions
- `IMPROVEMENTS.md` - Feature documentation
- `CHANGELOG.md` - Version history
