import { useStore as useZustandStore } from 'zustand';
import { StoreApi } from 'zustand';

// Generic store hook
export function useStore<T, U>(
  store: StoreApi<T>,
  selector: (state: T) => U,
  equalityFn?: (a: U, b: U) => boolean
) {
  return useZustandStore(store, selector, equalityFn);
}

// Shallow equality function for performance
export function shallow<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) return true;
  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysB[i]])) {
      return false;
    }
  }
  return true;
}

// Store selector utilities
export function createSelector<T, U>(
  selector: (state: T) => U
) {
  return selector;
}

// Multiple selectors hook
export function useMultipleSelectors<T, U extends Record<string, any>>(
  store: StoreApi<T>,
  selectors: { [K in keyof U]: (state: T) => U[K] }
) {
  const result = {} as U;
  for (const key in selectors) {
    result[key] = useStore(store, selectors[key]);
  }
  return result;
}
