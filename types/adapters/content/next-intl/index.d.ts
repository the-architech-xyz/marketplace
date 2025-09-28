/**
     * Generated TypeScript definitions for Next.js Internationalization
     * Generated from: adapters/content/next-intl/adapter.json
     */

/**
     * Parameters for the Next.js Internationalization adapter
     */
export interface Next_intlContentParams {
  /**
   * Supported locales
   */
  locales: Array<any>;
  /**
   * Default locale
   */
  defaultLocale: string;
  /**
   * Enable locale-based routing
   */
  routing?: boolean;
  /**
   * Enable SEO optimization
   */
  seo?: boolean;
}

/**
     * Features for the Next.js Internationalization adapter
     */
export interface Next_intlContentFeatures {
  /**
   * Locale-based routing with pathname translations
   */
  routing?: boolean;
  /**
   * Multilingual SEO with hreflang and metadata
   */
  'seo-optimization'?: boolean;
  /**
   * Lazy loading of translations and locale-specific content
   */
  'dynamic-imports'?: boolean;
}
