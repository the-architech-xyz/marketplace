import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * Example Store
 * Demonstrates how to create a Zustand store with the integration
 */

// Store state interface
interface ExampleState {
  count: number;
  name: string;
  items: string[];
  isLoading: boolean;
  error: string | null;
}

// Store actions interface
interface ExampleActions {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setName: (name: string) => void;
  addItem: (item: string) => void;
  removeItem: (index: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Combined store type
type ExampleStore = ExampleState & ExampleActions;

// Initial state
const initialState: ExampleState = {
  count: 0,
  name: '',
  items: [],
  isLoading: false,
  error: null,
};

// Create store
export const useExampleStore = create<ExampleStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Actions
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        reset: () => set(initialState),
        
        setName: (name: string) => set({ name }),
        
        addItem: (item: string) => set((state) => ({
          items: [...state.items, item]
        })),
        
        removeItem: (index: number) => set((state) => ({
          items: state.items.filter((_, i) => i !== index)
        })),
        
        setLoading: (isLoading: boolean) => set({ isLoading }),
        
        setError: (error: string | null) => set({ error }),
      }),
      {
        name: 'example-store',
        version: 1,
      }
    ),
    {
      name: 'example-store',
    }
  )
);

// Selectors
export const selectCount = (state: ExampleStore) => state.count;
export const selectName = (state: ExampleStore) => state.name;
export const selectItems = (state: ExampleStore) => state.items;
export const selectIsLoading = (state: ExampleStore) => state.isLoading;
export const selectError = (state: ExampleStore) => state.error;

// Action selectors
export const selectActions = (state: ExampleStore) => ({
  increment: state.increment,
  decrement: state.decrement,
  reset: state.reset,
  setName: state.setName,
  addItem: state.addItem,
  removeItem: state.removeItem,
  setLoading: state.setLoading,
  setError: state.setError,
});
