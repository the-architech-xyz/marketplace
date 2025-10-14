/**
 * Next.js Internationalization
 * 
 * Complete internationalization solution with next-intl including advanced features like pluralization, rich text, and dynamic imports
 */

export interface ContentNextIntlParams {

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

export interface ContentNextIntlFeatures {

  /** Enable locale-based routing */
  routing: boolean;

  /** Enable date formatting features */
  dateFormatting: boolean;

  /** Enable number formatting features */
  numberFormatting: boolean;
}

// 🚀 Auto-discovered artifacts
export declare const ContentNextIntlArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ContentNextIntlCreates = typeof ContentNextIntlArtifacts.creates[number];
export type ContentNextIntlEnhances = typeof ContentNextIntlArtifacts.enhances[number];
