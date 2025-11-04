/**
 * Payload CMS Next.js Connector
 * 
 * Complete Payload CMS 3.0 integration for Next.js with local API, collections, and admin panel
 */

export interface ConnectorsCmsPayloadNextjsParams {

  /** Generate default collections (Pages, Posts, Media) */
  collections?: boolean;

  /** Enable media/upload collection */
  media?: boolean;

  /** Enable Payload authentication */
  auth?: boolean;

  /** Enable Payload admin panel */
  adminPanel?: boolean;

  /** Configure local API for server components */
  localApi?: boolean;

  /** Enable draft preview functionality */
  draftPreview?: boolean;

  /** Enable live preview (beta) */
  livePreview?: boolean;
}

export interface ConnectorsCmsPayloadNextjsFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ConnectorsCmsPayloadNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ConnectorsCmsPayloadNextjsCreates = typeof ConnectorsCmsPayloadNextjsArtifacts.creates[number];
export type ConnectorsCmsPayloadNextjsEnhances = typeof ConnectorsCmsPayloadNextjsArtifacts.enhances[number];
