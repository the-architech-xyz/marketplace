/**
 * i18n Type Definitions
 */

/**
 * Supported locale code
 */
export type Locale = string;

/**
 * Translation key
 */
export type TranslationKey = string;

/**
 * Translation parameters
 */
export type TranslationParams = Record<string, any>;

/**
 * Locale configuration
 */
export interface LocaleConfig {
  code: string;
  name: string;
  nativeName: string;
  flag?: string;
}

/**
 * i18n configuration
 */
export interface I18nConfig {
  defaultLocale: string;
  locales: string[];
  fallback?: string;
  debug?: boolean;
}

// Re-export for convenience
export type { Locale, TranslationKey, TranslationParams, LocaleConfig, I18nConfig };
