/**
 * Next.js Internationalization
 * 
 * Complete internationalization solution with next-intl including advanced features like pluralization, rich text, and dynamic imports
 */

export interface ContentNextIntlParams {

  /** Supported locales */
  locales: string[];

  /** Default locale */
  defaultLocale: string;

  /** Enable locale-based routing */
  routing?: boolean;

  /** Enable SEO optimization */
  seo?: boolean;
}

export interface ContentNextIntlFeatures {}

// 🚀 Auto-discovered artifacts
export declare const ContentNextIntlArtifacts: {
  creates: [
    'src/i18n/request.ts',
    'src/messages/en.json',
    'src/messages/es.json',
    'src/messages/fr.json'
  ],
  enhances: [],
  installs: [
    { packages: ['next-intl'], isDev: false }
  ],
  envVars: []
};

// Type-safe artifact access
export type ContentNextIntlCreates = typeof ContentNextIntlArtifacts.creates[number];
export type ContentNextIntlEnhances = typeof ContentNextIntlArtifacts.enhances[number];
