/**
 * Store Types
 * 
 * TypeScript definitions for Zustand stores
 */

import { StateCreator } from 'zustand';

// Base store state interface
export interface BaseState {
  // Common state properties can be added here
}

// Store slice interface
export interface StoreSlice<T> {
  // Common slice methods can be added here
}

// Store creator type
export type StoreCreator<T> = StateCreator<T, [], [], T>;

// Store slice creator type
export type SliceCreator<T, U> = StateCreator<T, [], [], U>;

// Store selector type
export type StoreSelector<T, U> = (state: T) => U;

// Store action type
export type StoreAction<T, U extends (...args: any[]) => void> = (
  set: (partial: Partial<T>) => void,
  get: () => T
) => U;

// Store subscription type
export type StoreSubscription<T> = (
  selector: (state: T) => any,
  callback: (state: any) => void
) => () => void;

// Store persistence options
export interface PersistenceOptions<T> {
  name: string;
  storage?: Storage;
  partialize?: (state: T) => Partial<T>;
  onRehydrateStorage?: () => void;
  version?: number;
  migrate?: (persistedState: any, version: number) => T;
}

// Store devtools options
export interface DevtoolsOptions {
  name: string;
  enabled?: boolean;
  trace?: boolean;
  traceLimit?: number;
}

// Store middleware options
export interface MiddlewareOptions {
  persist?: boolean | PersistenceOptions<any>;
  devtools?: boolean | DevtoolsOptions;
  immer?: boolean;
  subscribeWithSelector?: boolean;
}

// Store configuration
export interface StoreConfig {
  name: string;
  middleware?: MiddlewareOptions;
}

// Store error types
export class StoreError extends Error {
  constructor(
    message: string,
    public code?: string,
    public store?: string
  ) {
    super(message);
    this.name = 'StoreError';
  }
}

// Store validation types
export interface StoreValidator<T> {
  validate: (state: T) => boolean;
  error?: string;
}

// Store middleware types
export type StoreMiddleware<T> = (
  config: StateCreator<T, [], [], T>
) => StateCreator<T, [], [], T>;

// Store hook types
export interface UseStoreHook<T> {
  (): T;
  <U>(selector: (state: T) => U): U;
  <U>(selector: (state: T) => U, equalityFn?: (a: U, b: U) => boolean): U;
}

// Store subscription types
export interface StoreSubscription<T> {
  subscribe: (listener: (state: T) => void) => () => void;
  subscribeWithSelector: <U>(
    selector: (state: T) => U,
    listener: (state: U) => void,
    equalityFn?: (a: U, b: U) => boolean
  ) => () => void;
}

// Store persistence types
export interface StorePersistence<T> {
  persist: {
    hasHydrated: () => boolean;
    onHydrate: (fn: () => void) => void;
    onFinishHydration: (fn: () => void) => void;
  };
}

// Store devtools types
export interface StoreDevtools {
  devtools: {
    subscribe: (listener: (message: any) => void) => () => void;
    send: (action: any, state: any) => void;
  };
}
