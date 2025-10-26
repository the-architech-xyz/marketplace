/**
 * Expo i18n Initialization
 * 
 * Export i18n instance
 */

export { default } from './config';
export { useTranslation } from 'react-i18next';

// Re-export Localization from expo-localization
export { 
  getLocales, 
  getCalendars, 
  getCountryCodeAsync, 
  getCurrencyAsync 
} from 'expo-localization';
