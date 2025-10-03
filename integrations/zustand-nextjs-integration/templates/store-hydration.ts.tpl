import { useEffect, useState } from 'react';
import { StoreApi } from 'zustand';

/**
 * Hydration utilities for Zustand stores
 * Handles client-side hydration of server-rendered state
 */

// Hydration state
export interface HydrationState {
  isHydrated: boolean;
  hasError: boolean;
  error?: Error;
}

// Hydration options
export interface HydrationOptions {
  onHydrate?: (state: any) => void;
  onError?: (error: Error) => void;
  retryAttempts?: number;
  retryDelay?: number;
}

// Hydration hook
export function useStoreHydration(
  store: StoreApi<any>,
  options: HydrationOptions = {}
) {
  const [state, setState] = useState<HydrationState>({
    isHydrated: false,
    hasError: false,
  });

  const {
    onHydrate,
    onError,
    retryAttempts = 3,
    retryDelay = 1000,
  } = options;

  useEffect(() => {
    let retryCount = 0;

    const hydrate = async () => {
      try {
        // Simulate hydration process
        await new Promise(resolve => setTimeout(resolve, 100));
        
        setState(prev => ({
          ...prev,
          isHydrated: true,
          hasError: false,
        }));

        onHydrate?.(store.getState());
      } catch (error) {
        const err = error as Error;
        
        if (retryCount < retryAttempts) {
          retryCount++;
          setTimeout(hydrate, retryDelay * retryCount);
        } else {
          setState(prev => ({
            ...prev,
            hasError: true,
            error: err,
          }));
          
          onError?.(err);
        }
      }
    };

    hydrate();
  }, [store, onHydrate, onError, retryAttempts, retryDelay]);

  return state;
}

// Hydration provider component
export function StoreHydrationProvider({
  children,
  stores,
  onHydrate,
  onError,
}: {
  children: React.ReactNode;
  stores: Array<{ name: string; store: StoreApi<any> }>;
  onHydrate?: (storeName: string, state: any) => void;
  onError?: (storeName: string, error: Error) => void;
}) {
  const [hydratedStores, setHydratedStores] = useState<Set<string>>(new Set());

  useEffect(() => {
    const hydrateStores = async () => {
      for (const { name, store } of stores) {
        try {
          // Simulate hydration
          await new Promise(resolve => setTimeout(resolve, 50));
          
          setHydratedStores(prev => new Set([...prev, name]));
          onHydrate?.(name, store.getState());
        } catch (error) {
          onError?.(name, error as Error);
        }
      }
    };

    hydrateStores();
  }, [stores, onHydrate, onError]);

  const allHydrated = stores.every(({ name }) => hydratedStores.has(name));

  if (!allHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Hydrating stores...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Hydration error boundary
export class StoreHydrationErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Store hydration error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <h3 className="text-red-800 font-medium">Hydration Error</h3>
          <p className="text-red-600 text-sm mt-1">
            {this.state.error?.message || 'Failed to hydrate store'}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
