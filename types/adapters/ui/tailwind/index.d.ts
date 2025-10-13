/**
 * Tailwind CSS
 * 
 * Utility-first CSS framework with plugins and optimizations
 */

export interface UiTailwindParams {

  /** Enable @tailwindcss/typography plugin */
  typography?: any;

  /** Enable @tailwindcss/forms plugin */
  forms?: any;

  /** Enable @tailwindcss/aspect-ratio plugin */
  aspectRatio?: any;

  /** Enable dark mode support */
  darkMode?: any;
}

export interface UiTailwindFeatures {}

// 🚀 Auto-discovered artifacts
export declare const UiTailwindArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type UiTailwindCreates = typeof UiTailwindArtifacts.creates[number];
export type UiTailwindEnhances = typeof UiTailwindArtifacts.enhances[number];
