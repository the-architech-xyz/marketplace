/**
 * i18n Tech-Stack Exports
 * 
 * Centralized exports for all i18n utilities
 */

// Hooks
export { useTranslation, type UseTranslationReturn, type TranslationFunction } from './hooks';

// Formatting
export {
  useFormatting,
  formatDate,
  formatNumber,
  formatCurrency,
  formatPercent,
  formatRelativeTime,
  type UseFormattingReturn
} from './formatting';

// Types
export type {
  Locale,
  TranslationKey,
  TranslationParams,
  LocaleConfig,
  I18nConfig
} from './types';

// Locale utilities
export {
  getSupportedLocales,
  getLocaleConfig,
  isLocaleSupported,
  getLocaleName,
  getLocaleFlag
} from './locale';

// Re-export everything for convenience
export * from './hooks';
export * from './formatting';
export * from './types';
export * from './locale';
