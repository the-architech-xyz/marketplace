/**
 * Payments UI Store - Zustand State Management
 * 
 * ⚠️ ARCHITECTURE NOTE:
 * This store manages UI STATE ONLY - not server data!
 * 
 * SERVER DATA (payments, subscriptions, invoices) → Use TanStack Query hooks
 * UI STATE (modals, filters, form drafts) → Use this Zustand store
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import type {
  PaymentFilters,
  PaymentFormData,
  SubscriptionFormData,
  InvoiceFormData
} from './types';

// ============================================================================
// PAYMENT UI STORE (UI State Only)
// ============================================================================

interface PaymentUIState {
  // Selection State (just IDs)
  selectedPaymentId: string | null;
  selectedSubscriptionId: string | null;
  selectedInvoiceId: string | null;
  selectedPaymentMethodId: string | null;
  
  // Filter State
  paymentFilters: PaymentFilters;
  subscriptionFilters: any;
  invoiceFilters: any;
  
  // Modal/Dialog State
  isPaymentModalOpen: boolean;
  isSubscriptionModalOpen: boolean;
  isInvoiceModalOpen: boolean;
  isPaymentMethodModalOpen: boolean;
  isCheckoutModalOpen: boolean;
  isRefundDialogOpen: boolean;
  isCancelDialogOpen: boolean;
  
  // Form State (drafts)
  paymentFormDraft: Partial<PaymentFormData> | null;
  subscriptionFormDraft: Partial<SubscriptionFormData> | null;
  invoiceFormDraft: Partial<InvoiceFormData> | null;
  
  // View State
  viewMode: 'grid' | 'list' | 'table';
  sortBy: 'date' | 'amount' | 'status';
  sortDirection: 'asc' | 'desc';
  dateRange: { from: Date | null; to: Date | null };
  
  // Pagination
  currentPage: number;
  itemsPerPage: number;
  
  // Multi-select (for bulk operations)
  selectedPaymentIds: string[];
  selectedInvoiceIds: string[];
  
  // Checkout flow state
  checkoutStep: 'payment' | 'review' | 'complete';
  checkoutData: any | null;
  
  // Actions
  setSelectedPaymentId: (id: string | null) => void;
  setSelectedSubscriptionId: (id: string | null) => void;
  setSelectedInvoiceId: (id: string | null) => void;
  setSelectedPaymentMethodId: (id: string | null) => void;
  setPaymentFilters: (filters: PaymentFilters) => void;
  setSubscriptionFilters: (filters: any) => void;
  setInvoiceFilters: (filters: any) => void;
  setPaymentModalOpen: (isOpen: boolean) => void;
  setSubscriptionModalOpen: (isOpen: boolean) => void;
  setInvoiceModalOpen: (isOpen: boolean) => void;
  setPaymentMethodModalOpen: (isOpen: boolean) => void;
  setCheckoutModalOpen: (isOpen: boolean) => void;
  setRefundDialogOpen: (isOpen: boolean) => void;
  setCancelDialogOpen: (isOpen: boolean) => void;
  setPaymentFormDraft: (draft: Partial<PaymentFormData> | null) => void;
  setSubscriptionFormDraft: (draft: Partial<SubscriptionFormData> | null) => void;
  setInvoiceFormDraft: (draft: Partial<InvoiceFormData> | null) => void;
  setViewMode: (mode: 'grid' | 'list' | 'table') => void;
  setSortBy: (sortBy: 'date' | 'amount' | 'status') => void;
  setSortDirection: (direction: 'asc' | 'desc') => void;
  setDateRange: (range: { from: Date | null; to: Date | null }) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  togglePaymentSelection: (id: string) => void;
  toggleInvoiceSelection: (id: string) => void;
  clearPaymentSelections: () => void;
  clearInvoiceSelections: () => void;
  setCheckoutStep: (step: 'payment' | 'review' | 'complete') => void;
  setCheckoutData: (data: any | null) => void;
  resetCheckoutFlow: () => void;
  resetUIState: () => void;
}

export const usePaymentUIStore = create<PaymentUIState>()(
  persist(
    immer((set) => ({
    // Initial state
      selectedPaymentId: null,
      selectedSubscriptionId: null,
      selectedInvoiceId: null,
      selectedPaymentMethodId: null,
      paymentFilters: {},
      subscriptionFilters: {},
      invoiceFilters: {},
      isPaymentModalOpen: false,
      isSubscriptionModalOpen: false,
      isInvoiceModalOpen: false,
      isPaymentMethodModalOpen: false,
    isCheckoutModalOpen: false,
      isRefundDialogOpen: false,
      isCancelDialogOpen: false,
      paymentFormDraft: null,
      subscriptionFormDraft: null,
      invoiceFormDraft: null,
      viewMode: 'table',
      sortBy: 'date',
      sortDirection: 'desc',
      dateRange: { from: null, to: null },
      currentPage: 1,
      itemsPerPage: 20,
      selectedPaymentIds: [],
      selectedInvoiceIds: [],
      checkoutStep: 'payment',
      checkoutData: null,
    
    // Actions
      setSelectedPaymentId: (id) => set((state) => { state.selectedPaymentId = id; }),
      setSelectedSubscriptionId: (id) => set((state) => { state.selectedSubscriptionId = id; }),
      setSelectedInvoiceId: (id) => set((state) => { state.selectedInvoiceId = id; }),
      setSelectedPaymentMethodId: (id) => set((state) => { state.selectedPaymentMethodId = id; }),
      setPaymentFilters: (filters) => set((state) => { state.paymentFilters = filters; }),
      setSubscriptionFilters: (filters) => set((state) => { state.subscriptionFilters = filters; }),
      setInvoiceFilters: (filters) => set((state) => { state.invoiceFilters = filters; }),
      setPaymentModalOpen: (isOpen) => set((state) => { state.isPaymentModalOpen = isOpen; }),
      setSubscriptionModalOpen: (isOpen) => set((state) => { state.isSubscriptionModalOpen = isOpen; }),
      setInvoiceModalOpen: (isOpen) => set((state) => { state.isInvoiceModalOpen = isOpen; }),
      setPaymentMethodModalOpen: (isOpen) => set((state) => { state.isPaymentMethodModalOpen = isOpen; }),
      setCheckoutModalOpen: (isOpen) => set((state) => { state.isCheckoutModalOpen = isOpen; }),
      setRefundDialogOpen: (isOpen) => set((state) => { state.isRefundDialogOpen = isOpen; }),
      setCancelDialogOpen: (isOpen) => set((state) => { state.isCancelDialogOpen = isOpen; }),
      setPaymentFormDraft: (draft) => set((state) => { state.paymentFormDraft = draft; }),
      setSubscriptionFormDraft: (draft) => set((state) => { state.subscriptionFormDraft = draft; }),
      setInvoiceFormDraft: (draft) => set((state) => { state.invoiceFormDraft = draft; }),
      setViewMode: (mode) => set((state) => { state.viewMode = mode; }),
      setSortBy: (sortBy) => set((state) => { state.sortBy = sortBy; }),
      setSortDirection: (direction) => set((state) => { state.sortDirection = direction; }),
      setDateRange: (range) => set((state) => { state.dateRange = range; }),
      setCurrentPage: (page) => set((state) => { state.currentPage = page; }),
      setItemsPerPage: (items) => set((state) => { state.itemsPerPage = items; }),
      
      togglePaymentSelection: (id) => set((state) => {
        const index = state.selectedPaymentIds.indexOf(id);
        if (index === -1) {
          state.selectedPaymentIds.push(id);
        } else {
          state.selectedPaymentIds.splice(index, 1);
        }
      }),
      
      toggleInvoiceSelection: (id) => set((state) => {
        const index = state.selectedInvoiceIds.indexOf(id);
        if (index === -1) {
          state.selectedInvoiceIds.push(id);
        } else {
          state.selectedInvoiceIds.splice(index, 1);
        }
      }),
      
      clearPaymentSelections: () => set((state) => { state.selectedPaymentIds = []; }),
      clearInvoiceSelections: () => set((state) => { state.selectedInvoiceIds = []; }),
      
      setCheckoutStep: (step) => set((state) => { state.checkoutStep = step; }),
      setCheckoutData: (data) => set((state) => { state.checkoutData = data; }),
      
      resetCheckoutFlow: () => set((state) => {
        state.checkoutStep = 'payment';
        state.checkoutData = null;
        state.isCheckoutModalOpen = false;
    }),
    
    resetUIState: () => set((state) => {
        state.selectedPaymentId = null;
        state.selectedSubscriptionId = null;
        state.selectedInvoiceId = null;
        state.selectedPaymentMethodId = null;
        state.paymentFilters = {};
        state.subscriptionFilters = {};
        state.invoiceFilters = {};
        state.isPaymentModalOpen = false;
        state.isSubscriptionModalOpen = false;
        state.isInvoiceModalOpen = false;
        state.isPaymentMethodModalOpen = false;
      state.isCheckoutModalOpen = false;
        state.isRefundDialogOpen = false;
        state.isCancelDialogOpen = false;
        state.paymentFormDraft = null;
        state.subscriptionFormDraft = null;
        state.invoiceFormDraft = null;
        state.checkoutStep = 'payment';
        state.checkoutData = null;
        state.selectedPaymentIds = [];
        state.selectedInvoiceIds = [];
      })
    })),
    {
      name: 'payment-ui-storage',
      partialize: (state) => ({
        viewMode: state.viewMode,
        sortBy: state.sortBy,
        sortDirection: state.sortDirection,
        itemsPerPage: state.itemsPerPage,
        paymentFilters: state.paymentFilters,
        subscriptionFilters: state.subscriptionFilters,
        invoiceFilters: state.invoiceFilters
      })
    }
  )
);

// Convenience selectors
export const usePaymentUISelectors = () => {
  const store = usePaymentUIStore();
  
  return {
    hasPaymentSelected: !!store.selectedPaymentId,
    hasSubscriptionSelected: !!store.selectedSubscriptionId,
    hasInvoiceSelected: !!store.selectedInvoiceId,
    hasMultiplePaymentsSelected: store.selectedPaymentIds.length > 1,
    selectedPaymentCount: store.selectedPaymentIds.length,
    anyModalOpen: store.isPaymentModalOpen || store.isSubscriptionModalOpen || store.isInvoiceModalOpen || store.isCheckoutModalOpen,
    hasPaymentDraft: !!store.paymentFormDraft,
    hasSubscriptionDraft: !!store.subscriptionFormDraft,
    hasInvoiceDraft: !!store.invoiceFormDraft,
    hasActiveFilters: Object.keys(store.paymentFilters).length > 0 || Object.keys(store.subscriptionFilters).length > 0,
    isInCheckoutFlow: store.isCheckoutModalOpen
  };
};
