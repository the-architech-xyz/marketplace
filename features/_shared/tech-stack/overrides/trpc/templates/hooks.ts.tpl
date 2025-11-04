/**
 * tRPC Hooks Template
 * 
 * Dynamically generates tRPC hooks for {{feature}}
 * Replaces TanStack Query hooks with tRPC hooks
 */

import { trpc } from '{{routerPath}}';

// ============================================================================
// {{feature | upper}} HOOKS (tRPC Implementation)
// ============================================================================

/**
 * Get {{feature}} list (tRPC)
 */
export const use{{feature | capitalize}}List = (filters?: any, options?: any) => {
  return trpc.{{feature}}.list.useQuery(filters, options);
};

/**
 * Get single {{feature}} (tRPC)
 */
export const use{{feature | capitalize}} = (id: string, options?: any) => {
  return trpc.{{feature}}.get.useQuery({ id }, options);
};

/**
 * Create {{feature}} (tRPC)
 */
export const use{{feature | capitalize}}Create = (options?: any) => {
  const queryClient = trpc.useUtils();
  
  return trpc.{{feature}}.create.useMutation({
    onSuccess: () => {
      queryClient.{{feature}}.list.invalidate();
    },
    ...options
  });
};

/**
 * Update {{feature}} (tRPC)
 */
export const use{{feature | capitalize}}Update = (options?: any) => {
  const queryClient = trpc.useUtils();
  
  return trpc.{{feature}}.update.useMutation({
    onSuccess: () => {
      queryClient.{{feature}}.list.invalidate();
    },
    ...options
  });
};

/**
 * Delete {{feature}} (tRPC)
 */
export const use{{feature | capitalize}}Delete = (options?: any) => {
  const queryClient = trpc.useUtils();
  
  return trpc.{{feature}}.delete.useMutation({
    onSuccess: () => {
      queryClient.{{feature}}.list.invalidate();
    },
    ...options
  });
};

