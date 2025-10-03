import { cn } from '@/lib/utils';

export const web3ComponentClasses = {
  container: 'max-w-4xl mx-auto p-6',
  card: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
  header: 'text-2xl font-bold text-gray-900 mb-6',
  content: 'text-gray-700 leading-relaxed mb-6',
  button: 'inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors',
  status: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  address: 'font-mono text-sm bg-gray-100 px-2 py-1 rounded',
  balance: 'text-lg font-semibold text-gray-900',
  network: 'text-sm text-gray-500',
  table: 'min-w-full divide-y divide-gray-200',
  tableHeader: 'bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
  tableCell: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
};

export function getWeb3ComponentClass(component: keyof typeof web3ComponentClasses, additionalClasses?: string) {
  return cn(web3ComponentClasses[component], additionalClasses);
}

export const web3Layout = {
  wrapper: 'min-h-screen bg-gray-50',
  container: 'max-w-7xl mx-auto py-6 sm:px-6 lg:px-8',
  grid: 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3',
  card: 'bg-white overflow-hidden shadow rounded-lg',
  header: 'bg-white shadow',
  nav: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
};
