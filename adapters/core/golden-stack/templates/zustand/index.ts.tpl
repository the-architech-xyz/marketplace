/**
 * Store Index
 * 
 * Centralized exports for all Zustand stores
 */

// Store hooks
export { useAppStore } from './use-app-store';
export { useUIStore } from './use-ui-store';

// Store selectors
export { appSelectors } from './use-app-store';
export { uiSelectors } from './use-ui-store';

// Store actions
export { appActions } from './use-app-store';
export { uiActions } from './use-ui-store';

// Store utilities
export { useStore, useStoreSelector, useStoreWithEquality } from './use-store';
export { useStoreState, useStoreActions, useStoreSubscription } from './use-store';
export { useStoreWithPrevious, useStoreWithLoading, useStoreWithError } from './use-store';
export { useStoreWithStatus, useStoreDebug, useStoreWithPersistence } from './use-store';
export { useStoreWithValidation } from './use-store';

// Store provider
export { StoreProvider } from './StoreProvider';
export { useStoreContext, useAppStoreContext, useUIStoreContext } from './StoreProvider';
export { useStoreInitialization, useStoreReset, useStoreDebug as useStoreProviderDebug } from './StoreProvider';

// Store types
export type { AppState } from './use-app-store';
export type { UIState } from './use-ui-store';

// Store creation utilities
export { createStore, createSlice, createSelector, createAction } from './create-store';
export { createSubscription, createPersistence, createSSRStore, useHydration } from './create-store';

// Store types
export type { StoreConfig, StoreCreator, SliceCreator, StoreSelector, StoreAction } from './store-types';
export type { StoreSubscription, PersistenceOptions, DevtoolsOptions, MiddlewareOptions } from './store-types';
export type { StoreError, StoreValidator, StoreMiddleware, UseStoreHook } from './store-types';

// Default exports
export { useAppStore as default } from './use-app-store';
