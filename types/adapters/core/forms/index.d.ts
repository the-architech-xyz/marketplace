/**
 * Forms
 * 
 * Golden Core form handling with validation using React Hook Form and Zod
 */

export interface CoreFormsParams {

  /** Enable Zod for schema validation */
  zod?: boolean;

  /** Enable React Hook Form for form handling */
  reactHookForm?: boolean;

  /** Enable @hookform/resolvers for Zod integration */
  resolvers?: boolean;

  /** Enable accessibility features */
  accessibility?: boolean;

  /** Enable React Hook Form DevTools */
  devtools?: boolean;

  /** Enable advanced validation features */
  advancedValidation?: boolean;
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
