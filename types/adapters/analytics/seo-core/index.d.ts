/**
 * SEO Core (Tech-Agnostic)
 * 
 * Tech-agnostic SEO utilities, structured data schemas, and metadata types. Framework-specific implementations handled by Connectors.
 */

export interface AnalyticsSeoCoreParams {

  /** Base URL of the site (or set NEXT_PUBLIC_SITE_URL env var) */
  siteUrl?: string;

  /** Site name for Open Graph and structured data */
  siteName?: string;

  /** Default locale for the site */
  defaultLocale?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential SEO utilities and types */
    core?: boolean;

    /** Structured data (JSON-LD) schemas */
    structuredData?: boolean;

    /** Metadata generation helpers */
    metadataHelpers?: boolean;

    /** Sitemap generation utilities */
    sitemap?: boolean;
  };
}

export interface AnalyticsSeoCoreFeatures {

  /** Essential SEO utilities and types */
  core: boolean;

  /** Structured data (JSON-LD) schemas */
  structuredData: boolean;

  /** Metadata generation helpers */
  metadataHelpers: boolean;

  /** Sitemap generation utilities */
  sitemap: boolean;
}

// 🚀 Auto-discovered artifacts
export declare const AnalyticsSeoCoreArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type AnalyticsSeoCoreCreates = typeof AnalyticsSeoCoreArtifacts.creates[number];
export type AnalyticsSeoCoreEnhances = typeof AnalyticsSeoCoreArtifacts.enhances[number];
