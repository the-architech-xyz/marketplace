/**
 * tRPC React Hooks
 * 
 * Type-safe React hooks powered by tRPC + TanStack Query.
 * Import this in your components: import { trpc } from '@/lib/trpc/react';
 */

import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '<%= importPath(paths.trpcRouter) %>';

/**
 * tRPC React client with hooks for data fetching.
 * 
 * Usage:
 * ```tsx
 * import { trpc } from '@/lib/trpc/react';
 * 
 * function MyComponent() {
 *   const { data, isLoading } = trpc.user.getCurrent.useQuery();
 *   // ...
 * }
 * ```
 */
export const trpc = createTRPCReact<AppRouter>();


