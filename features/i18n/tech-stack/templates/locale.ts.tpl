/**
 * Locale Utilities
 * 
 * Helper functions for locale management
 */

import type { LocaleConfig } from './types';

/**
 * Get all supported locales
 */
export function getSupportedLocales(): string[] {
  return ['en', 'fr', 'es']; // Default locales
}

/**
 * Get locale configuration
 */
export function getLocaleConfig(locale: string): LocaleConfig {
  const configs: Record<string, LocaleConfig> = {
    en: {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇬🇧'
    },
    fr: {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷'
    },
    es: {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸'
    }
  };
  
  return configs[locale] || configs.en;
}

/**
 * Check if locale is supported
 */
export function isLocaleSupported(locale: string): boolean {
  return getSupportedLocales().includes(locale);
}

/**
 * Get locale display name
 */
export function getLocaleName(locale: string): string {
  const config = getLocaleConfig(locale);
  return config.nativeName;
}

/**
 * Get locale flag emoji
 */
export function getLocaleFlag(locale: string): string {
  const config = getLocaleConfig(locale);
  return config.flag || '🌐';
}

// Re-export types
export type { LocaleConfig };
