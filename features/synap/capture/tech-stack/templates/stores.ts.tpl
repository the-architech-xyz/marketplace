/**
 * Synap Capture Stores - Zustand
 */

import { create } from 'zustand';
import type { Thought } from './types';

interface SynapCaptureStore {
  selectedThoughtId: string | null;
  isSuperInputOpen: boolean;
  draftContent: string;
  
  setSelectedThoughtId: (id: string | null) => void;
  openSuperInput: () => void;
  closeSuperInput: () => void;
  setDraftContent: (content: string) => void;
  clearDraft: () => void;
}

export const useSynapCaptureStore = create<SynapCaptureStore>((set) => ({
  selectedThoughtId: null,
  isSuperInputOpen: false,
  draftContent: '',
  
  setSelectedThoughtId: (id) => set({ selectedThoughtId: id }),
  openSuperInput: () => set({ isSuperInputOpen: true }),
  closeSuperInput: () => set({ isSuperInputOpen: false }),
  setDraftContent: (content) => set({ draftContent: content }),
  clearDraft: () => set({ draftContent: '' }),
}));



