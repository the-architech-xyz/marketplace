/**
 * Shadcn/ui
 * 
 * Beautifully designed components built with Radix UI and Tailwind CSS
 */

export interface UiShadcnUiParams {

  /** UI theme variant */
  theme?: any;

  /** Components to install (comprehensive set by default) */
  components?: any;
}

export interface UiShadcnUiFeatures {}

// 🚀 Auto-discovered artifacts
export declare const UiShadcnUiArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type UiShadcnUiCreates = typeof UiShadcnUiArtifacts.creates[number];
export type UiShadcnUiEnhances = typeof UiShadcnUiArtifacts.enhances[number];
