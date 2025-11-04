/**
 * Expo/React Native Internationalization
 * 
 * Complete internationalization solution for Expo and React Native using expo-localization with react-i18next
 */

export interface ContentI18nExpoParams {

  /** Supported locales */
  locales?: string[];

  /** Default locale */
  defaultLocale?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Auto-detect device locale */
    deviceLocale?: boolean;

    /** Use native date/number formatting */
    nativeFormatting?: boolean;

    /** Enable pluralization support */
    pluralization?: boolean;
  };
}

export interface ContentI18nExpoFeatures {

  /** Auto-detect device locale */
  deviceLocale: boolean;

  /** Use native date/number formatting */
  nativeFormatting: boolean;

  /** Enable pluralization support */
  pluralization: boolean;
}

// 🚀 Auto-discovered artifacts
export declare const ContentI18nExpoArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ContentI18nExpoCreates = typeof ContentI18nExpoArtifacts.creates[number];
export type ContentI18nExpoEnhances = typeof ContentI18nExpoArtifacts.enhances[number];
