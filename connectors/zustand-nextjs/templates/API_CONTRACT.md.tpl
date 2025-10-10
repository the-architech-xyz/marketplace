# Zustand + Next.js Connector - API Contract

## Overview

This connector bridges **Zustand** (client-side state management) with **Next.js** (framework), providing Server-Side Rendering (SSR) support and proper hydration patterns.

## What This Connector Provides

### 1. SSR-Compatible Store Setup
- **Store initialization** that works on both server and client
- **Hydration handling** to prevent server/client state mismatches
- **Serialization utilities** for passing initial state from server to client

### 2. Next.js-Specific Utilities
- **`NextJSStoreProvider`**: React component for SSR store hydration
- **`createStore`**: Store factory with SSR support
- **`useStore`**: SSR-safe hooks for accessing store state

### 3. Persistence Integration
- **localStorage/sessionStorage** persistence with SSR guards
- **Server-safe checks** to prevent "window is not defined" errors

## Usage Pattern

### Server Component (Next.js App Router)
```typescript
import { createStore } from '@/stores/create-store';

export default async function Page() {
  // Initialize store with server-side data
  const initialState = await fetchInitialData();
  
  return (
    <NextJSStoreProvider initialState={initialState}>
      <ClientComponent />
    </NextJSStoreProvider>
  );
}
```

### Client Component
```typescript
'use client';

import { useAppStore } from '@/stores/use-app-store';

export function ClientComponent() {
  const count = useAppStore((state) => state.count);
  const increment = useAppStore((state) => state.increment);
  
  return (
    <button onClick={increment}>
      Count: {count}
    </button>
  );
}
```

## SSR Hydration Flow

1. **Server**: Store initialized with initial data
2. **Server**: State serialized and embedded in HTML
3. **Client**: React hydrates with server-rendered HTML
4. **Client**: Store hydrates with serialized state
5. **Client**: Store becomes interactive

## API Surface

### Exports

#### `NextJSStoreProvider`
```typescript
interface NextJSStoreProviderProps {
  children: React.ReactNode;
  initialState?: Partial<StoreState>;
}
```

#### `createStore`
```typescript
function createStore<T>(
  initializer: (set, get) => T,
  options?: {
    name?: string;
    persist?: boolean;
    devtools?: boolean;
  }
): UseBoundStore<T>
```

#### `useStore`
```typescript
function useStore<T, U>(
  store: UseBoundStore<T>,
  selector: (state: T) => U
): U
```

## SSR Compatibility Guarantees

- ✅ No "window is not defined" errors
- ✅ No hydration mismatches
- ✅ Proper cleanup on unmount
- ✅ Persistence only on client-side

## Dependencies

**Required**:
- `framework/nextjs` - Next.js 13+ with App Router
- `state/zustand` - Zustand adapter

**Optional**:
- None

## Notes

This connector is **essential** for using Zustand with Next.js SSR. Without it:
- ❌ Hydration errors on page load
- ❌ "window is not defined" errors in persistence
- ❌ Server/client state mismatches

