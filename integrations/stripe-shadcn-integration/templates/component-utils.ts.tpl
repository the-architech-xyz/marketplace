import { cn } from '@/lib/utils';

export const paymentComponentClasses = {
  container: 'max-w-4xl mx-auto p-6',
  card: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
  header: 'text-2xl font-bold text-gray-900 mb-6',
  content: 'text-gray-700 leading-relaxed mb-6',
  button: 'inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors',
  status: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  table: 'min-w-full divide-y divide-gray-200',
  tableHeader: 'bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
  tableCell: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
};

export function getPaymentComponentClass(component: keyof typeof paymentComponentClasses, additionalClasses?: string) {
  return cn(paymentComponentClasses[component], additionalClasses);
}

export const paymentLayout = {
  wrapper: 'min-h-screen bg-gray-50',
  container: 'max-w-7xl mx-auto py-6 sm:px-6 lg:px-8',
  grid: 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3',
  card: 'bg-white overflow-hidden shadow rounded-lg',
};
