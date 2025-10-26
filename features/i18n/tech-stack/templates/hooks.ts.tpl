/**
 * Universal i18n Hooks
 * 
 * Framework-agnostic i18n hooks that work with any adapter.
 * Uses the adapter's implementation (next-intl, react-i18next, etc.)
 */

/**
 * useTranslation Hook
 * 
 * Universal translation hook that delegates to adapter implementation
 * 
 * @returns Translation utilities (t, locale, locales, setLocale)
 */
export function useTranslation() {
  // This will be implemented by the adapter
  // For Next.js with next-intl:
  //   import { useTranslations, useLocale } from 'next-intl';
  //   const t = useTranslations();
  //   const locale = useLocale();
  
  // For React with react-i18next:
  //   import { useTranslation as useReactI18n } from 'react-i18next';
  //   const { t, i18n } = useReactI18n();
  //   const locale = i18n.language;
  
  throw new Error('i18n adapter not installed. Please install an i18n adapter.');
}

/**
 * Translation function type
 */
export type TranslationFunction = (
  key: string,
  params?: Record<string, any>
) => string;

/**
 * Translation utilities
 */
export interface UseTranslationReturn {
  t: TranslationFunction;
  locale: string;
  locales: string[];
  setLocale: (locale: string) => void;
  isLoading: boolean;
}

// Re-export types for convenience
export type { UseTranslationReturn, TranslationFunction };
