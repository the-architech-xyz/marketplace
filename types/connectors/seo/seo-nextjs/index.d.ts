/**
 * SEO Next.js Connector
 * 
 * Complete SEO implementation for Next.js App Router with Metadata API, sitemap generation, robots.txt, and structured data
 */

export interface ConnectorsSeoSeoNextjsParams {

  /** Generate sitemap.xml automatically */
  sitemap?: boolean;

  /** Generate robots.txt automatically */
  robots?: boolean;

  /** Enable JSON-LD structured data helpers */
  structuredData?: boolean;

  /** Add default metadata to root layout */
  defaultMetadata?: boolean;

  /** Generate dynamic metadata helpers */
  dynamicMetadata?: boolean;

  /** Generate Open Graph metadata */
  openGraph?: boolean;

  /** Generate Twitter Card metadata */
  twitter?: boolean;
}

export interface ConnectorsSeoSeoNextjsFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ConnectorsSeoSeoNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ConnectorsSeoSeoNextjsCreates = typeof ConnectorsSeoSeoNextjsArtifacts.creates[number];
export type ConnectorsSeoSeoNextjsEnhances = typeof ConnectorsSeoSeoNextjsArtifacts.enhances[number];
