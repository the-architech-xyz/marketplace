# TanStack Query + Next.js Connector - API Contract

## Overview
Bridges TanStack Query with Next.js for SSR support and proper hydration.

## What This Connector Provides

### 1. SSR Query Client Setup
- Server-side query client for prefetching
- Client-side query client with proper hydration
- Dehydration/rehydration utilities

### 2. Next.js Integration
- **QueryProvider**: SSR-compatible query client provider
- **getQueryClient**: Server-side query client singleton
- **Query keys factory**: Standardized query key management

### 3. SSR Utilities
- Prefetching in server components
- Hydration boundary components
- Error handling integration

## Usage Pattern

### Server Component (Prefetch Data)
```typescript
import { getQueryClient } from '@/lib/query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Page() {
  const queryClient = getQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientComponent />
    </HydrationBoundary>
  );
}
```

### Client Component (Consume Query)
```typescript
'use client';

import { useQuery } from '@tanstack/react-query';

export function ClientComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  
  return <div>{data?.map(user => <UserCard key={user.id} user={user} />)}</div>;
}
```

## SSR Hydration Flow

1. **Server**: Query client created per request
2. **Server**: Queries prefetched and cached
3. **Server**: Cache dehydrated to JSON
4. **Server**: JSON embedded in HTML
5. **Client**: React hydrates
6. **Client**: Query client hydrates with server cache
7. **Client**: Queries become interactive

## API Surface

### QueryProvider
```typescript
interface QueryProviderProps {
  children: React.ReactNode;
}
```

### getQueryClient
```typescript
function getQueryClient(): QueryClient
```

### Query Keys Factory
```typescript
export const queryKeys = {
  all: () => ['entity'],
  lists: () => [...queryKeys.all(), 'list'],
  list: (filters: string) => [...queryKeys.lists(), { filters }],
  details: () => [...queryKeys.all(), 'detail'],
  detail: (id: string) => [...queryKeys.details(), id],
};
```

## SSR Guarantees
- ✅ No hydration mismatches
- ✅ Proper server/client state sync
- ✅ Request-scoped query clients (no cache pollution)
- ✅ Automatic cache cleanup
- ✅ No "window is not defined" errors

## Dependencies
**Required**: `framework/nextjs`, `data-fetching/tanstack-query`

## Notes
This connector is **essential** for TanStack Query SSR. Without it:
- ❌ No server-side prefetching
- ❌ Hydration errors
- ❌ Duplicate fetching (server + client)
- ❌ Poor performance

