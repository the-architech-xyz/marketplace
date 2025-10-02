/**
 * Offline Support Utilities
 * 
 * Helper functions for implementing offline-first functionality with TanStack Query
 */

import { QueryClient } from '@tanstack/react-query';
import { QueryKey } from '@/lib/query-keys';

// Offline status management
class OfflineManager {
  private isOnline = navigator.onLine;
  private listeners: Set<() => void> = new Set();

  constructor() {
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  private handleOnline = () => {
    this.isOnline = true;
    this.notifyListeners();
  };

  private handleOffline = () => {
    this.isOnline = false;
    this.notifyListeners();
  };

  private notifyListeners = () => {
    this.listeners.forEach(listener => listener());
  };

  getOnlineStatus = () => this.isOnline;

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  destroy = () => {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
    this.listeners.clear();
  };
}

export const offlineManager = new OfflineManager();

// Offline query configuration
export const offlineQueryConfig = {
  queries: {
    retry: (failureCount: number, error: Error) => {
      // Don't retry when offline
      if (!offlineManager.getOnlineStatus()) {
        return false;
      }
      // Retry up to 3 times when online
      return failureCount < 3;
    },
    retryDelay: (attemptIndex: number) => {
      // Exponential backoff with jitter
      const baseDelay = Math.min(1000 * 2 ** attemptIndex, 30000);
      const jitter = Math.random() * 1000;
      return baseDelay + jitter;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  },
  mutations: {
    retry: (failureCount: number, error: Error) => {
      // Don't retry mutations when offline
      if (!offlineManager.getOnlineStatus()) {
        return false;
      }
      // Retry mutations once when online
      return failureCount < 1;
    },
  },
};

// Queue for offline mutations
class OfflineMutationQueue {
  private queue: Array<{
    id: string;
    mutation: () => Promise<unknown>;
    timestamp: number;
  }> = [];

  add(mutation: () => Promise<unknown>): string {
    const id = `mutation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.queue.push({
      id,
      mutation,
      timestamp: Date.now(),
    });
    return id;
  }

  remove(id: string): void {
    this.queue = this.queue.filter(item => item.id !== id);
  }

  getAll(): Array<{ id: string; mutation: () => Promise<unknown>; timestamp: number }> {
    return [...this.queue];
  }

  clear(): void {
    this.queue = [];
  }

  // Process queue when coming back online
  async processQueue(): Promise<void> {
    if (!offlineManager.getOnlineStatus()) {
      return;
    }

    const mutations = this.getAll();
    for (const { id, mutation } of mutations) {
      try {
        await mutation();
        this.remove(id);
      } catch (error) {
        console.error('Failed to process offline mutation:', error);
        // Keep failed mutations in queue for retry
      }
    }
  }
}

export const offlineMutationQueue = new OfflineMutationQueue();

// Hook for offline status
export function useOfflineStatus(): boolean {
  const [isOnline, setIsOnline] = React.useState(offlineManager.getOnlineStatus());

  React.useEffect(() => {
    const unsubscribe = offlineManager.subscribe(() => {
      setIsOnline(offlineManager.getOnlineStatus());
    });

    return unsubscribe;
  }, []);

  return isOnline;
}

// Hook for offline mutations
export function useOfflineMutation<TData = unknown, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>
) {
  const isOnline = useOfflineStatus();

  const mutate = React.useCallback(
    (variables: TVariables) => {
      if (isOnline) {
        // Execute immediately when online
        return mutationFn(variables);
      } else {
        // Queue for later when offline
        return offlineMutationQueue.add(() => mutationFn(variables));
      }
    },
    [mutationFn, isOnline]
  );

  return { mutate, isOnline };
}

// Auto-process queue when coming back online
if (typeof window !== 'undefined') {
  offlineManager.subscribe(() => {
    if (offlineManager.getOnlineStatus()) {
      offlineMutationQueue.processQueue();
    }
  });
}

// Utility for checking if data is stale
export function isDataStale<TData>(
  data: TData | undefined,
  staleTime: number = 5 * 60 * 1000
): boolean {
  if (!data) return true;
  
  // Check if data has a timestamp property
  if (typeof data === 'object' && data !== null && 'timestamp' in data) {
    const timestamp = (data as any).timestamp;
    if (typeof timestamp === 'number') {
      return Date.now() - timestamp > staleTime;
    }
  }
  
  return false;
}

// Utility for adding timestamps to data
export function addTimestamp<TData>(data: TData): TData & { timestamp: number } {
  return {
    ...data,
    timestamp: Date.now(),
  };
}
