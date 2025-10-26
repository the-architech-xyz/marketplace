/**
 * Formatting Utilities
 * 
 * Universal formatting functions for dates, numbers, and currencies.
 * Uses native Intl API for locale-aware formatting.
 */

/**
 * Format a date according to locale
 */
export function formatDate(
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions,
  locale?: string
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
  
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Format a number according to locale
 */
export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions,
  locale?: string
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Format currency according to locale
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  options?: Intl.NumberFormatOptions,
  locale?: string
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    ...options,
  }).format(value);
}

/**
 * Format percentage according to locale
 */
export function formatPercent(
  value: number,
  options?: Intl.NumberFormatOptions,
  locale?: string
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    ...options,
  }).format(value);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(
  date: Date | string | number,
  unit: Intl.RelativeTimeFormatUnit = 'auto',
  numeric: 'always' | 'auto' = 'auto',
  locale?: string
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date;
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric });
  const diffInSeconds = Math.floor((dateObj.getTime() - Date.now()) / 1000);
  
  // Calculate the appropriate unit
  const units = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];
  
  for (const { label, seconds } of units) {
    const diff = Math.floor(diffInSeconds / seconds);
    if (Math.abs(diff) >= 1) {
      return rtf.format(diff, label as Intl.RelativeTimeFormatUnit);
    }
  }
  
  return rtf.format(0, 'second');
}

/**
 * useFormatting Hook
 * 
 * Provides formatting functions scoped to current locale
 */
export function useFormatting() {
  // This will be implemented by the adapter
  // For Next.js:
  //   import { useLocale } from 'next-intl';
  //   const locale = useLocale();
  
  // For React:
  //   import { useTranslation } from './hooks';
  //   const { locale } = useTranslation();
  
  throw new Error('i18n adapter not installed. Please install an i18n adapter.');
}

/**
 * Formatting utilities return type
 */
export interface UseFormattingReturn {
  formatDate: (
    date: Date | string | number,
    options?: Intl.DateTimeFormatOptions
  ) => string;
  formatNumber: (
    value: number,
    options?: Intl.NumberFormatOptions
  ) => string;
  formatCurrency: (
    value: number,
    currency?: string,
    options?: Intl.NumberFormatOptions
  ) => string;
  formatPercent: (
    value: number,
    options?: Intl.NumberFormatOptions
  ) => string;
  formatRelativeTime: (
    date: Date | string | number,
    unit?: Intl.RelativeTimeFormatUnit,
    numeric?: 'always' | 'auto'
  ) => string;
}

// Re-export types
export type { UseFormattingReturn };
