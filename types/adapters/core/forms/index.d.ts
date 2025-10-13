/**
 * Forms
 * 
 * Golden Core form handling with validation using React Hook Form and Zod
 */

export interface CoreFormsParams {

  /** Enable Zod for schema validation */
  zod?: any;

  /** Enable React Hook Form for form handling */
  reactHookForm?: any;

  /** Enable @hookform/resolvers for Zod integration */
  resolvers?: any;

  /** Enable accessibility features */
  accessibility?: any;

  /** Enable React Hook Form DevTools */
  devtools?: any;
}

export interface CoreFormsFeatures {}

// 🚀 Auto-discovered artifacts
export declare const CoreFormsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type CoreFormsCreates = typeof CoreFormsArtifacts.creates[number];
export type CoreFormsEnhances = typeof CoreFormsArtifacts.enhances[number];
