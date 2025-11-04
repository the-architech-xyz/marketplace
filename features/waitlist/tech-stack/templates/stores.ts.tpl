/**
 * Waitlist Zustand Stores
 * 
 * Client-side state management for UI interactions.
 * Server data comes from TanStack Query, this is for UI-only state.
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// ============================================================================
// WAITLIST UI STORE
// ============================================================================

export interface WaitlistUIState {
  // UI state
  isJoinFormOpen: boolean;
  isReferralModalOpen: boolean;
  isLeaderboardOpen: boolean;
  selectedReferralCode: string | null;
  
  // Form state
  joinFormData: {
    email: string;
    firstName: string;
    lastName: string;
    referredByCode: string;
  };
  
  // Social sharing
  sharingPlatform: string | null;
  
  // Actions
  openJoinForm: () => void;
  closeJoinForm: () => void;
  openReferralModal: () => void;
  closeReferralModal: () => void;
  openLeaderboard: () => void;
  closeLeaderboard: () => void;
  setSelectedReferralCode: (code: string | null) => void;
  setJoinFormData: (data: Partial<WaitlistUIState['joinFormData']>) => void;
  resetJoinForm: () => void;
  setSharingPlatform: (platform: string | null) => void;
}

export const useWaitlistUIStore = create<WaitlistUIState>()(
  immer((set) => ({
    // Initial state
    isJoinFormOpen: false,
    isReferralModalOpen: false,
    isLeaderboardOpen: false,
    selectedReferralCode: null,
    joinFormData: {
      email: '',
      firstName: '',
      lastName: '',
      referredByCode: ''
    },
    sharingPlatform: null,
    
    // Actions
    openJoinForm: () => set((state) => {
      state.isJoinFormOpen = true;
    }),
    
    closeJoinForm: () => set((state) => {
      state.isJoinFormOpen = false;
    }),
    
    openReferralModal: () => set((state) => {
      state.isReferralModalOpen = true;
    }),
    
    closeReferralModal: () => set((state) => {
      state.isReferralModalOpen = false;
    }),
    
    openLeaderboard: () => set((state) => {
      state.isLeaderboardOpen = true;
    }),
    
    closeLeaderboard: () => set((state) => {
      state.isLeaderboardOpen = false;
    }),
    
    setSelectedReferralCode: (code: string | null) => set((state) => {
      state.selectedReferralCode = code;
    }),
    
    setJoinFormData: (data: Partial<WaitlistUIState['joinFormData']>) => set((state) => {
      Object.assign(state.joinFormData, data);
    }),
    
    resetJoinForm: () => set((state) => {
      state.joinFormData = {
        email: '',
        firstName: '',
        lastName: '',
        referredByCode: ''
      };
    }),
    
    setSharingPlatform: (platform: string | null) => set((state) => {
      state.sharingPlatform = platform;
    })
  }))
);


