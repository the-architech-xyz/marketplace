/**
 * Forms
 * 
 * Form handling with validation using Zod and React Hook Form
 */

export interface UiFormsParams {

  /** Enable Zod for schema validation */
  zod?: boolean;

  /** Enable React Hook Form for form handling */
  reactHookForm?: boolean;

  /** Enable @hookform/resolvers for Zod integration */
  resolvers?: boolean;
}

export interface UiFormsFeatures {}

// 🚀 Auto-discovered artifacts
export declare const UiFormsArtifacts: {
  creates: [
    'src/lib/forms.ts',
    'src/components/forms/ContactForm.tsx'
  ],
  enhances: [],
  installs: [
    { packages: ['zod'], isDev: false },
    { packages: ['react-hook-form'], isDev: false },
    { packages: ['@hookform/resolvers'], isDev: false }
  ],
  envVars: []
};

// Type-safe artifact access
export type UiFormsCreates = typeof UiFormsArtifacts.creates[number];
export type UiFormsEnhances = typeof UiFormsArtifacts.enhances[number];
