/**
 * Next.js Internationalization
 * 
 * Complete internationalization solution with next-intl including advanced features like pluralization, rich text, and dynamic imports
 */

export interface ContentI18nNextjsParams {

  /** Supported locales */
  locales?: string[];

  /** Default locale */
  defaultLocale?: string;

  /** Enable locale-based routing */
  routing?: boolean;

  /** Enable SEO optimization */
  seo?: boolean;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable locale-based routing */
    routing?: boolean;

    /** Enable date formatting features */
    dateFormatting?: boolean;

    /** Enable number formatting features */
    numberFormatting?: boolean;
  };
}

export interface ContentI18nNextjsFeatures {

  /** Enable locale-based routing */
  routing: boolean;

  /** Enable date formatting features */
  dateFormatting: boolean;

  /** Enable number formatting features */
  numberFormatting: boolean;
}

// 🚀 Auto-discovered artifacts
export declare const ContentI18nNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ContentI18nNextjsCreates = typeof ContentI18nNextjsArtifacts.creates[number];
export type ContentI18nNextjsEnhances = typeof ContentI18nNextjsArtifacts.enhances[number];
