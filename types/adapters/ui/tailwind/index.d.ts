/**
 * Tailwind CSS
 * 
 * Utility-first CSS framework with plugins and optimizations
 */

export interface UiTailwindParams {

  /** Enable @tailwindcss/typography plugin */
  typography?: boolean;

  /** Enable @tailwindcss/forms plugin */
  forms?: boolean;

  /** Enable @tailwindcss/aspect-ratio plugin */
  aspectRatio?: boolean;

  /** Enable dark mode support */
  darkMode?: boolean;
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
