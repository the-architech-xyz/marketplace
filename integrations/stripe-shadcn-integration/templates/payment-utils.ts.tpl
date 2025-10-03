import { stripeApi } from '../lib/stripe-api';

export const paymentUtils = {
  formatAmount: (amount: number, currency: string = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  },

  formatDate: (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  },

  getStatusColor: (status: string) => {
    const statusColors: Record<string, string> = {
      succeeded: 'text-green-600 bg-green-50',
      pending: 'text-yellow-600 bg-yellow-50',
      failed: 'text-red-600 bg-red-50',
      canceled: 'text-gray-600 bg-gray-50',
      requires_payment_method: 'text-orange-600 bg-orange-50',
      requires_confirmation: 'text-blue-600 bg-blue-50',
    };
    return statusColors[status] || 'text-gray-600 bg-gray-50';
  },

  getSubscriptionStatusColor: (status: string) => {
    const statusColors: Record<string, string> = {
      active: 'text-green-600 bg-green-50',
      trialing: 'text-blue-600 bg-blue-50',
      past_due: 'text-yellow-600 bg-yellow-50',
      canceled: 'text-red-600 bg-red-50',
      unpaid: 'text-red-600 bg-red-50',
    };
    return statusColors[status] || 'text-gray-600 bg-gray-50';
  },
};

export const paymentComponents = {
  card: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
  header: 'text-lg font-semibold text-gray-900 mb-4',
  content: 'text-gray-600 mb-4',
  button: 'inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors',
  status: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
};
