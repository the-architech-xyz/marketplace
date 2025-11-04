/**
 * Expo i18n Configuration
 * 
 * Configures i18next with expo-localization integration
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Translation resources
import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  es: { translation: es }
};

// Get device locale
const deviceLocale = Localization.locale.split('-')[0];

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: deviceLocale,
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;

