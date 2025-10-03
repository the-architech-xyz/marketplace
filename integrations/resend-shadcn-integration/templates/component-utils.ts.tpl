import { cn } from '@/lib/utils';

export const emailComponentClasses = {
  container: 'max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm',
  header: 'text-2xl font-bold text-gray-900 mb-4',
  content: 'text-gray-700 leading-relaxed mb-6',
  button: 'inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors',
  footer: 'text-sm text-gray-500 mt-8 pt-4 border-t border-gray-200',
};

export function getEmailComponentClass(component: keyof typeof emailComponentClasses, additionalClasses?: string) {
  return cn(emailComponentClasses[component], additionalClasses);
}

export const emailLayout = {
  wrapper: 'min-h-screen bg-gray-50 flex items-center justify-center p-4',
  card: 'bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full',
  title: 'text-3xl font-bold text-center text-gray-900 mb-6',
  subtitle: 'text-lg text-center text-gray-600 mb-8',
};
