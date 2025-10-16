/**
 * Payments Feature Stores - Zustand State Management
 * 
 * This file contains all Zustand stores for the Payments feature.
 * These stores provide consistent state management patterns across all implementations.
 * 
 * Generated from: features/payments/contract.ts
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type {
  Payment,
  PaymentMethodData,
  Subscription,
  Invoice,
  PaymentFilters,
  PaymentFormData,
  SubscriptionFormData,
  InvoiceFormData,
  PaymentStats,
  SubscriptionStats,
  InvoiceStats,
  OrganizationSubscription,
  SeatInfo,
  OrganizationUsage,
  BillingInfo
} from './types';

// ============================================================================
// PAYMENT STORE
// ============================================================================

interface PaymentState {
  // Data
  payments: Payment[];
  selectedPayment: Payment | null;
  paymentFilters: PaymentFilters;
  
  // UI State
  isPaymentModalOpen: boolean;
  isPaymentFormOpen: boolean;
  isPaymentLoading: boolean;
  paymentFormData: PaymentFormData | null;
  
  // Actions
  setPayments: (payments: Payment[]) => void;
  setSelectedPayment: (payment: Payment | null) => void;
  setPaymentFilters: (filters: PaymentFilters) => void;
  setPaymentModalOpen: (isOpen: boolean) => void;
  setPaymentFormOpen: (isOpen: boolean) => void;
  setPaymentLoading: (isLoading: boolean) => void;
  setPaymentFormData: (data: PaymentFormData | null) => void;
  addPayment: (payment: Payment) => void;
  updatePayment: (id: string, payment: Partial<Payment>) => void;
  removePayment: (id: string) => void;
  clearPayments: () => void;
  resetPaymentState: () => void;
}

export const usePaymentStore = create<PaymentState>()(
  immer((set, get) => ({
    // Initial state
    payments: [],
    selectedPayment: null,
    paymentFilters: {},
    isPaymentModalOpen: false,
    isPaymentFormOpen: false,
    isPaymentLoading: false,
    paymentFormData: null,
    
    // Actions
    setPayments: (payments) => set((state) => {
      state.payments = payments;
    }),
    
    setSelectedPayment: (payment) => set((state) => {
      state.selectedPayment = payment;
    }),
    
    setPaymentFilters: (filters) => set((state) => {
      state.paymentFilters = filters;
    }),
    
    setPaymentModalOpen: (isOpen) => set((state) => {
      state.isPaymentModalOpen = isOpen;
    }),
    
    setPaymentFormOpen: (isOpen) => set((state) => {
      state.isPaymentFormOpen = isOpen;
    }),
    
    setPaymentLoading: (isLoading) => set((state) => {
      state.isPaymentLoading = isLoading;
    }),
    
    setPaymentFormData: (data) => set((state) => {
      state.paymentFormData = data;
    }),
    
    addPayment: (payment) => set((state) => {
      state.payments.unshift(payment);
    }),
    
    updatePayment: (id, paymentData) => set((state) => {
      const index = state.payments.findIndex(payment => payment.id === id);
      if (index !== -1) {
        state.payments[index] = { ...state.payments[index], ...paymentData };
      }
      if (state.selectedPayment?.id === id) {
        state.selectedPayment = { ...state.selectedPayment, ...paymentData };
      }
    }),
    
    removePayment: (id) => set((state) => {
      state.payments = state.payments.filter(payment => payment.id !== id);
      if (state.selectedPayment?.id === id) {
        state.selectedPayment = null;
      }
    }),
    
    clearPayments: () => set((state) => {
      state.payments = [];
      state.selectedPayment = null;
    }),
    
    resetPaymentState: () => set((state) => {
      state.payments = [];
      state.selectedPayment = null;
      state.paymentFilters = {};
      state.isPaymentModalOpen = false;
      state.isPaymentFormOpen = false;
      state.isPaymentLoading = false;
      state.paymentFormData = null;
    })
  }))
);

// ============================================================================
// SUBSCRIPTION STORE
// ============================================================================

interface SubscriptionState {
  // Data
  subscriptions: Subscription[];
  selectedSubscription: Subscription | null;
  subscriptionFilters: any;
  
  // UI State
  isSubscriptionModalOpen: boolean;
  isSubscriptionFormOpen: boolean;
  isSubscriptionLoading: boolean;
  subscriptionFormData: SubscriptionFormData | null;
  
  // Actions
  setSubscriptions: (subscriptions: Subscription[]) => void;
  setSelectedSubscription: (subscription: Subscription | null) => void;
  setSubscriptionFilters: (filters: any) => void;
  setSubscriptionModalOpen: (isOpen: boolean) => void;
  setSubscriptionFormOpen: (isOpen: boolean) => void;
  setSubscriptionLoading: (isLoading: boolean) => void;
  setSubscriptionFormData: (data: SubscriptionFormData | null) => void;
  addSubscription: (subscription: Subscription) => void;
  updateSubscription: (id: string, subscription: Partial<Subscription>) => void;
  removeSubscription: (id: string) => void;
  clearSubscriptions: () => void;
  resetSubscriptionState: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  immer((set, get) => ({
    // Initial state
    subscriptions: [],
    selectedSubscription: null,
    subscriptionFilters: {},
    isSubscriptionModalOpen: false,
    isSubscriptionFormOpen: false,
    isSubscriptionLoading: false,
    subscriptionFormData: null,
    
    // Actions
    setSubscriptions: (subscriptions) => set((state) => {
      state.subscriptions = subscriptions;
    }),
    
    setSelectedSubscription: (subscription) => set((state) => {
      state.selectedSubscription = subscription;
    }),
    
    setSubscriptionFilters: (filters) => set((state) => {
      state.subscriptionFilters = filters;
    }),
    
    setSubscriptionModalOpen: (isOpen) => set((state) => {
      state.isSubscriptionModalOpen = isOpen;
    }),
    
    setSubscriptionFormOpen: (isOpen) => set((state) => {
      state.isSubscriptionFormOpen = isOpen;
    }),
    
    setSubscriptionLoading: (isLoading) => set((state) => {
      state.isSubscriptionLoading = isLoading;
    }),
    
    setSubscriptionFormData: (data) => set((state) => {
      state.subscriptionFormData = data;
    }),
    
    addSubscription: (subscription) => set((state) => {
      state.subscriptions.unshift(subscription);
    }),
    
    updateSubscription: (id, subscriptionData) => set((state) => {
      const index = state.subscriptions.findIndex(subscription => subscription.id === id);
      if (index !== -1) {
        state.subscriptions[index] = { ...state.subscriptions[index], ...subscriptionData };
      }
      if (state.selectedSubscription?.id === id) {
        state.selectedSubscription = { ...state.selectedSubscription, ...subscriptionData };
      }
    }),
    
    removeSubscription: (id) => set((state) => {
      state.subscriptions = state.subscriptions.filter(subscription => subscription.id !== id);
      if (state.selectedSubscription?.id === id) {
        state.selectedSubscription = null;
      }
    }),
    
    clearSubscriptions: () => set((state) => {
      state.subscriptions = [];
      state.selectedSubscription = null;
    }),
    
    resetSubscriptionState: () => set((state) => {
      state.subscriptions = [];
      state.selectedSubscription = null;
      state.subscriptionFilters = {};
      state.isSubscriptionModalOpen = false;
      state.isSubscriptionFormOpen = false;
      state.isSubscriptionLoading = false;
      state.subscriptionFormData = null;
    })
  }))
);

// ============================================================================
// INVOICE STORE
// ============================================================================

interface InvoiceState {
  // Data
  invoices: Invoice[];
  selectedInvoice: Invoice | null;
  invoiceFilters: any;
  
  // UI State
  isInvoiceModalOpen: boolean;
  isInvoiceFormOpen: boolean;
  isInvoiceLoading: boolean;
  invoiceFormData: InvoiceFormData | null;
  
  // Actions
  setInvoices: (invoices: Invoice[]) => void;
  setSelectedInvoice: (invoice: Invoice | null) => void;
  setInvoiceFilters: (filters: any) => void;
  setInvoiceModalOpen: (isOpen: boolean) => void;
  setInvoiceFormOpen: (isOpen: boolean) => void;
  setInvoiceLoading: (isLoading: boolean) => void;
  setInvoiceFormData: (data: InvoiceFormData | null) => void;
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => void;
  removeInvoice: (id: string) => void;
  clearInvoices: () => void;
  resetInvoiceState: () => void;
}

export const useInvoiceStore = create<InvoiceState>()(
  immer((set, get) => ({
    // Initial state
    invoices: [],
    selectedInvoice: null,
    invoiceFilters: {},
    isInvoiceModalOpen: false,
    isInvoiceFormOpen: false,
    isInvoiceLoading: false,
    invoiceFormData: null,
    
    // Actions
    setInvoices: (invoices) => set((state) => {
      state.invoices = invoices;
    }),
    
    setSelectedInvoice: (invoice) => set((state) => {
      state.selectedInvoice = invoice;
    }),
    
    setInvoiceFilters: (filters) => set((state) => {
      state.invoiceFilters = filters;
    }),
    
    setInvoiceModalOpen: (isOpen) => set((state) => {
      state.isInvoiceModalOpen = isOpen;
    }),
    
    setInvoiceFormOpen: (isOpen) => set((state) => {
      state.isInvoiceFormOpen = isOpen;
    }),
    
    setInvoiceLoading: (isLoading) => set((state) => {
      state.isInvoiceLoading = isLoading;
    }),
    
    setInvoiceFormData: (data) => set((state) => {
      state.invoiceFormData = data;
    }),
    
    addInvoice: (invoice) => set((state) => {
      state.invoices.unshift(invoice);
    }),
    
    updateInvoice: (id, invoiceData) => set((state) => {
      const index = state.invoices.findIndex(invoice => invoice.id === id);
      if (index !== -1) {
        state.invoices[index] = { ...state.invoices[index], ...invoiceData };
      }
      if (state.selectedInvoice?.id === id) {
        state.selectedInvoice = { ...state.selectedInvoice, ...invoiceData };
      }
    }),
    
    removeInvoice: (id) => set((state) => {
      state.invoices = state.invoices.filter(invoice => invoice.id !== id);
      if (state.selectedInvoice?.id === id) {
        state.selectedInvoice = null;
      }
    }),
    
    clearInvoices: () => set((state) => {
      state.invoices = [];
      state.selectedInvoice = null;
    }),
    
    resetInvoiceState: () => set((state) => {
      state.invoices = [];
      state.selectedInvoice = null;
      state.invoiceFilters = {};
      state.isInvoiceModalOpen = false;
      state.isInvoiceFormOpen = false;
      state.isInvoiceLoading = false;
      state.invoiceFormData = null;
    })
  }))
);

// ============================================================================
// PAYMENT METHOD STORE
// ============================================================================

interface PaymentMethodState {
  // Data
  paymentMethods: PaymentMethodData[];
  selectedPaymentMethod: PaymentMethodData | null;
  
  // UI State
  isPaymentMethodModalOpen: boolean;
  isPaymentMethodFormOpen: boolean;
  isPaymentMethodLoading: boolean;
  
  // Actions
  setPaymentMethods: (paymentMethods: PaymentMethodData[]) => void;
  setSelectedPaymentMethod: (paymentMethod: PaymentMethodData | null) => void;
  setPaymentMethodModalOpen: (isOpen: boolean) => void;
  setPaymentMethodFormOpen: (isOpen: boolean) => void;
  setPaymentMethodLoading: (isLoading: boolean) => void;
  addPaymentMethod: (paymentMethod: PaymentMethodData) => void;
  updatePaymentMethod: (id: string, paymentMethod: Partial<PaymentMethodData>) => void;
  removePaymentMethod: (id: string) => void;
  clearPaymentMethods: () => void;
  resetPaymentMethodState: () => void;
}

export const usePaymentMethodStore = create<PaymentMethodState>()(
  immer((set, get) => ({
    // Initial state
    paymentMethods: [],
    selectedPaymentMethod: null,
    isPaymentMethodModalOpen: false,
    isPaymentMethodFormOpen: false,
    isPaymentMethodLoading: false,
    
    // Actions
    setPaymentMethods: (paymentMethods) => set((state) => {
      state.paymentMethods = paymentMethods;
    }),
    
    setSelectedPaymentMethod: (paymentMethod) => set((state) => {
      state.selectedPaymentMethod = paymentMethod;
    }),
    
    setPaymentMethodModalOpen: (isOpen) => set((state) => {
      state.isPaymentMethodModalOpen = isOpen;
    }),
    
    setPaymentMethodFormOpen: (isOpen) => set((state) => {
      state.isPaymentMethodFormOpen = isOpen;
    }),
    
    setPaymentMethodLoading: (isLoading) => set((state) => {
      state.isPaymentMethodLoading = isLoading;
    }),
    
    addPaymentMethod: (paymentMethod) => set((state) => {
      state.paymentMethods.unshift(paymentMethod);
    }),
    
    updatePaymentMethod: (id, paymentMethodData) => set((state) => {
      const index = state.paymentMethods.findIndex(paymentMethod => paymentMethod.id === id);
      if (index !== -1) {
        state.paymentMethods[index] = { ...state.paymentMethods[index], ...paymentMethodData };
      }
      if (state.selectedPaymentMethod?.id === id) {
        state.selectedPaymentMethod = { ...state.selectedPaymentMethod, ...paymentMethodData };
      }
    }),
    
    removePaymentMethod: (id) => set((state) => {
      state.paymentMethods = state.paymentMethods.filter(paymentMethod => paymentMethod.id !== id);
      if (state.selectedPaymentMethod?.id === id) {
        state.selectedPaymentMethod = null;
      }
    }),
    
    clearPaymentMethods: () => set((state) => {
      state.paymentMethods = [];
      state.selectedPaymentMethod = null;
    }),
    
    resetPaymentMethodState: () => set((state) => {
      state.paymentMethods = [];
      state.selectedPaymentMethod = null;
      state.isPaymentMethodModalOpen = false;
      state.isPaymentMethodFormOpen = false;
      state.isPaymentMethodLoading = false;
    })
  }))
);

// ============================================================================
// STATS STORE
// ============================================================================

interface StatsState {
  // Data
  paymentStats: PaymentStats | null;
  subscriptionStats: SubscriptionStats | null;
  invoiceStats: InvoiceStats | null;
  
  // UI State
  isStatsLoading: boolean;
  lastUpdated: string | null;
  
  // Actions
  setPaymentStats: (stats: PaymentStats) => void;
  setSubscriptionStats: (stats: SubscriptionStats) => void;
  setInvoiceStats: (stats: InvoiceStats) => void;
  setStatsLoading: (isLoading: boolean) => void;
  setLastUpdated: (timestamp: string) => void;
  clearStats: () => void;
  resetStatsState: () => void;
}

export const useStatsStore = create<StatsState>()(
  immer((set, get) => ({
    // Initial state
    paymentStats: null,
    subscriptionStats: null,
    invoiceStats: null,
    isStatsLoading: false,
    lastUpdated: null,
    
    // Actions
    setPaymentStats: (stats) => set((state) => {
      state.paymentStats = stats;
    }),
    
    setSubscriptionStats: (stats) => set((state) => {
      state.subscriptionStats = stats;
    }),
    
    setInvoiceStats: (stats) => set((state) => {
      state.invoiceStats = stats;
    }),
    
    setStatsLoading: (isLoading) => set((state) => {
      state.isStatsLoading = isLoading;
    }),
    
    setLastUpdated: (timestamp) => set((state) => {
      state.lastUpdated = timestamp;
    }),
    
    clearStats: () => set((state) => {
      state.paymentStats = null;
      state.subscriptionStats = null;
      state.invoiceStats = null;
    }),
    
    resetStatsState: () => set((state) => {
      state.paymentStats = null;
      state.subscriptionStats = null;
      state.invoiceStats = null;
      state.isStatsLoading = false;
      state.lastUpdated = null;
    })
  }))
);

// ============================================================================
// ORGANIZATION BILLING STORE
// ============================================================================

interface OrganizationBillingState {
  // Data
  subscription: OrganizationSubscription | null;
  seats: SeatInfo | null;
  usage: OrganizationUsage | null;
  billingInfo: BillingInfo | null;
  invoices: Invoice[];
  
  // UI State
  isSubscriptionLoading: boolean;
  isSeatsLoading: boolean;
  isUsageLoading: boolean;
  isBillingLoading: boolean;
  isInvoicesLoading: boolean;
  
  // Actions
  setSubscription: (subscription: OrganizationSubscription | null) => void;
  setSeats: (seats: SeatInfo | null) => void;
  setUsage: (usage: OrganizationUsage | null) => void;
  setBillingInfo: (billingInfo: BillingInfo | null) => void;
  setInvoices: (invoices: Invoice[]) => void;
  setSubscriptionLoading: (isLoading: boolean) => void;
  setSeatsLoading: (isLoading: boolean) => void;
  setUsageLoading: (isLoading: boolean) => void;
  setBillingLoading: (isLoading: boolean) => void;
  setInvoicesLoading: (isLoading: boolean) => void;
  updateSubscription: (subscription: Partial<OrganizationSubscription>) => void;
  updateSeats: (seats: Partial<SeatInfo>) => void;
  updateUsage: (usage: Partial<OrganizationUsage>) => void;
  updateBillingInfo: (billingInfo: Partial<BillingInfo>) => void;
  addInvoice: (invoice: Invoice) => void;
  clearOrganizationBilling: () => void;
  resetOrganizationBillingState: () => void;
}

export const useOrganizationBillingStore = create<OrganizationBillingState>()(
  immer((set, get) => ({
    // Initial state
    subscription: null,
    seats: null,
    usage: null,
    billingInfo: null,
    invoices: [],
    isSubscriptionLoading: false,
    isSeatsLoading: false,
    isUsageLoading: false,
    isBillingLoading: false,
    isInvoicesLoading: false,
    
    // Actions
    setSubscription: (subscription) => set((state) => {
      state.subscription = subscription;
    }),
    
    setSeats: (seats) => set((state) => {
      state.seats = seats;
    }),
    
    setUsage: (usage) => set((state) => {
      state.usage = usage;
    }),
    
    setBillingInfo: (billingInfo) => set((state) => {
      state.billingInfo = billingInfo;
    }),
    
    setInvoices: (invoices) => set((state) => {
      state.invoices = invoices;
    }),
    
    setSubscriptionLoading: (isLoading) => set((state) => {
      state.isSubscriptionLoading = isLoading;
    }),
    
    setSeatsLoading: (isLoading) => set((state) => {
      state.isSeatsLoading = isLoading;
    }),
    
    setUsageLoading: (isLoading) => set((state) => {
      state.isUsageLoading = isLoading;
    }),
    
    setBillingLoading: (isLoading) => set((state) => {
      state.isBillingLoading = isLoading;
    }),
    
    setInvoicesLoading: (isLoading) => set((state) => {
      state.isInvoicesLoading = isLoading;
    }),
    
    updateSubscription: (subscriptionData) => set((state) => {
      if (state.subscription) {
        state.subscription = { ...state.subscription, ...subscriptionData };
      }
    }),
    
    updateSeats: (seatsData) => set((state) => {
      if (state.seats) {
        state.seats = { ...state.seats, ...seatsData };
      }
    }),
    
    updateUsage: (usageData) => set((state) => {
      if (state.usage) {
        state.usage = { ...state.usage, ...usageData };
      }
    }),
    
    updateBillingInfo: (billingInfoData) => set((state) => {
      if (state.billingInfo) {
        state.billingInfo = { ...state.billingInfo, ...billingInfoData };
      }
    }),
    
    addInvoice: (invoice) => set((state) => {
      state.invoices.unshift(invoice);
    }),
    
    clearOrganizationBilling: () => set((state) => {
      state.subscription = null;
      state.seats = null;
      state.usage = null;
      state.billingInfo = null;
      state.invoices = [];
    }),
    
    resetOrganizationBillingState: () => set((state) => {
      state.subscription = null;
      state.seats = null;
      state.usage = null;
      state.billingInfo = null;
      state.invoices = [];
      state.isSubscriptionLoading = false;
      state.isSeatsLoading = false;
      state.isUsageLoading = false;
      state.isBillingLoading = false;
      state.isInvoicesLoading = false;
    })
  }))
);

// ============================================================================
// UI STORE
// ============================================================================

interface UIState {
  // Navigation
  activeTab: 'payments' | 'subscriptions' | 'invoices' | 'analytics' | 'billing';
  
  // View modes
  paymentViewMode: 'list' | 'grid';
  subscriptionViewMode: 'list' | 'grid';
  invoiceViewMode: 'list' | 'grid';
  
  // Sidebar
  isSidebarOpen: boolean;
  sidebarWidth: number;
  
  // Modals
  isSettingsModalOpen: boolean;
  isHelpModalOpen: boolean;
  isCheckoutModalOpen: boolean;
  
  // Actions
  setActiveTab: (tab: 'payments' | 'subscriptions' | 'invoices' | 'analytics' | 'billing') => void;
  setPaymentViewMode: (mode: 'list' | 'grid') => void;
  setSubscriptionViewMode: (mode: 'list' | 'grid') => void;
  setInvoiceViewMode: (mode: 'list' | 'grid') => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setSidebarWidth: (width: number) => void;
  setSettingsModalOpen: (isOpen: boolean) => void;
  setHelpModalOpen: (isOpen: boolean) => void;
  setCheckoutModalOpen: (isOpen: boolean) => void;
  resetUIState: () => void;
}

export const useUIStore = create<UIState>()(
  immer((set, get) => ({
    // Initial state
    activeTab: 'payments',
    paymentViewMode: 'list',
    subscriptionViewMode: 'list',
    invoiceViewMode: 'list',
    isSidebarOpen: true,
    sidebarWidth: 300,
    isSettingsModalOpen: false,
    isHelpModalOpen: false,
    isCheckoutModalOpen: false,
    
    // Actions
    setActiveTab: (tab) => set((state) => {
      state.activeTab = tab;
    }),
    
    setPaymentViewMode: (mode) => set((state) => {
      state.paymentViewMode = mode;
    }),
    
    setSubscriptionViewMode: (mode) => set((state) => {
      state.subscriptionViewMode = mode;
    }),
    
    setInvoiceViewMode: (mode) => set((state) => {
      state.invoiceViewMode = mode;
    }),
    
    setSidebarOpen: (isOpen) => set((state) => {
      state.isSidebarOpen = isOpen;
    }),
    
    setSidebarWidth: (width) => set((state) => {
      state.sidebarWidth = width;
    }),
    
    setSettingsModalOpen: (isOpen) => set((state) => {
      state.isSettingsModalOpen = isOpen;
    }),
    
    setHelpModalOpen: (isOpen) => set((state) => {
      state.isHelpModalOpen = isOpen;
    }),
    
    setCheckoutModalOpen: (isOpen) => set((state) => {
      state.isCheckoutModalOpen = isOpen;
    }),
    
    resetUIState: () => set((state) => {
      state.activeTab = 'payments';
      state.paymentViewMode = 'list';
      state.subscriptionViewMode = 'list';
      state.invoiceViewMode = 'list';
      state.isSidebarOpen = true;
      state.sidebarWidth = 300;
      state.isSettingsModalOpen = false;
      state.isHelpModalOpen = false;
      state.isCheckoutModalOpen = false;
    })
  }))
);

// ============================================================================
// COMBINED STORE SELECTORS
// ============================================================================

/**
 * Selector to get all payment-related state
 */
export const usePaymentState = () => {
  const payments = usePaymentStore((state) => state.payments);
  const selectedPayment = usePaymentStore((state) => state.selectedPayment);
  const paymentFilters = usePaymentStore((state) => state.paymentFilters);
  const isPaymentModalOpen = usePaymentStore((state) => state.isPaymentModalOpen);
  const isPaymentFormOpen = usePaymentStore((state) => state.isPaymentFormOpen);
  const isPaymentLoading = usePaymentStore((state) => state.isPaymentLoading);
  const paymentFormData = usePaymentStore((state) => state.paymentFormData);
  
  return {
    payments,
    selectedPayment,
    paymentFilters,
    isPaymentModalOpen,
    isPaymentFormOpen,
    isPaymentLoading,
    paymentFormData
  };
};

/**
 * Selector to get all subscription-related state
 */
export const useSubscriptionState = () => {
  const subscriptions = useSubscriptionStore((state) => state.subscriptions);
  const selectedSubscription = useSubscriptionStore((state) => state.selectedSubscription);
  const subscriptionFilters = useSubscriptionStore((state) => state.subscriptionFilters);
  const isSubscriptionModalOpen = useSubscriptionStore((state) => state.isSubscriptionModalOpen);
  const isSubscriptionFormOpen = useSubscriptionStore((state) => state.isSubscriptionFormOpen);
  const isSubscriptionLoading = useSubscriptionStore((state) => state.isSubscriptionLoading);
  const subscriptionFormData = useSubscriptionStore((state) => state.subscriptionFormData);
  
  return {
    subscriptions,
    selectedSubscription,
    subscriptionFilters,
    isSubscriptionModalOpen,
    isSubscriptionFormOpen,
    isSubscriptionLoading,
    subscriptionFormData
  };
};

/**
 * Selector to get all invoice-related state
 */
export const useInvoiceState = () => {
  const invoices = useInvoiceStore((state) => state.invoices);
  const selectedInvoice = useInvoiceStore((state) => state.selectedInvoice);
  const invoiceFilters = useInvoiceStore((state) => state.invoiceFilters);
  const isInvoiceModalOpen = useInvoiceStore((state) => state.isInvoiceModalOpen);
  const isInvoiceFormOpen = useInvoiceStore((state) => state.isInvoiceFormOpen);
  const isInvoiceLoading = useInvoiceStore((state) => state.isInvoiceLoading);
  const invoiceFormData = useInvoiceStore((state) => state.invoiceFormData);
  
  return {
    invoices,
    selectedInvoice,
    invoiceFilters,
    isInvoiceModalOpen,
    isInvoiceFormOpen,
    isInvoiceLoading,
    invoiceFormData
  };
};

/**
 * Selector to get all payment method-related state
 */
export const usePaymentMethodState = () => {
  const paymentMethods = usePaymentMethodStore((state) => state.paymentMethods);
  const selectedPaymentMethod = usePaymentMethodStore((state) => state.selectedPaymentMethod);
  const isPaymentMethodModalOpen = usePaymentMethodStore((state) => state.isPaymentMethodModalOpen);
  const isPaymentMethodFormOpen = usePaymentMethodStore((state) => state.isPaymentMethodFormOpen);
  const isPaymentMethodLoading = usePaymentMethodStore((state) => state.isPaymentMethodLoading);
  
  return {
    paymentMethods,
    selectedPaymentMethod,
    isPaymentMethodModalOpen,
    isPaymentMethodFormOpen,
    isPaymentMethodLoading
  };
};

/**
 * Selector to get all stats-related state
 */
export const useStatsState = () => {
  const paymentStats = useStatsStore((state) => state.paymentStats);
  const subscriptionStats = useStatsStore((state) => state.subscriptionStats);
  const invoiceStats = useStatsStore((state) => state.invoiceStats);
  const isStatsLoading = useStatsStore((state) => state.isStatsLoading);
  const lastUpdated = useStatsStore((state) => state.lastUpdated);
  
  return {
    paymentStats,
    subscriptionStats,
    invoiceStats,
    isStatsLoading,
    lastUpdated
  };
};

/**
 * Selector to get all organization billing-related state
 */
export const useOrganizationBillingState = () => {
  const subscription = useOrganizationBillingStore((state) => state.subscription);
  const seats = useOrganizationBillingStore((state) => state.seats);
  const usage = useOrganizationBillingStore((state) => state.usage);
  const billingInfo = useOrganizationBillingStore((state) => state.billingInfo);
  const invoices = useOrganizationBillingStore((state) => state.invoices);
  const isSubscriptionLoading = useOrganizationBillingStore((state) => state.isSubscriptionLoading);
  const isSeatsLoading = useOrganizationBillingStore((state) => state.isSeatsLoading);
  const isUsageLoading = useOrganizationBillingStore((state) => state.isUsageLoading);
  const isBillingLoading = useOrganizationBillingStore((state) => state.isBillingLoading);
  const isInvoicesLoading = useOrganizationBillingStore((state) => state.isInvoicesLoading);
  
  return {
    subscription,
    seats,
    usage,
    billingInfo,
    invoices,
    isSubscriptionLoading,
    isSeatsLoading,
    isUsageLoading,
    isBillingLoading,
    isInvoicesLoading
  };
};

/**
 * Selector to get all UI-related state
 */
export const useUIState = () => {
  const activeTab = useUIStore((state) => state.activeTab);
  const paymentViewMode = useUIStore((state) => state.paymentViewMode);
  const subscriptionViewMode = useUIStore((state) => state.subscriptionViewMode);
  const invoiceViewMode = useUIStore((state) => state.invoiceViewMode);
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const sidebarWidth = useUIStore((state) => state.sidebarWidth);
  const isSettingsModalOpen = useUIStore((state) => state.isSettingsModalOpen);
  const isHelpModalOpen = useUIStore((state) => state.isHelpModalOpen);
  const isCheckoutModalOpen = useUIStore((state) => state.isCheckoutModalOpen);
  
  return {
    activeTab,
    paymentViewMode,
    subscriptionViewMode,
    invoiceViewMode,
    isSidebarOpen,
    sidebarWidth,
    isSettingsModalOpen,
    isHelpModalOpen,
    isCheckoutModalOpen
  };
};
