/**
 * Shadcn/ui
 * 
 * Beautifully designed components built with Radix UI and Tailwind CSS
 */

export interface UiShadcnUiParams {

  /** Components to install (comprehensive set by default) */
  components?: string[];
}

export interface UiShadcnUiFeatures {}

// 🚀 Auto-discovered artifacts
export declare const UiShadcnUiArtifacts: {
  creates: [],
  enhances: [],
  installs: [
    { packages: ['@radix-ui/react-slot@^1.0.2', 'class-variance-authority@^0.7.0', 'clsx@^2.0.0', 'tailwind-merge@^2.0.0', 'tailwindcss-animate@^1.0.7', 'lucide-react@^0.294.0'], isDev: false },
    { packages: ['@radix-ui/react-dialog@^1.0.5', '@radix-ui/react-dropdown-menu@^2.0.6', '@radix-ui/react-label@^2.0.2', '@radix-ui/react-select@^2.0.0', '@radix-ui/react-separator@^1.0.3', '@radix-ui/react-switch@^1.0.3', '@radix-ui/react-tabs@^1.0.4', '@radix-ui/react-toast@^1.1.5', '@radix-ui/react-tooltip@^1.0.7', '@radix-ui/react-accordion@^1.1.2', '@radix-ui/react-alert-dialog@^1.0.5', '@radix-ui/react-avatar@^1.0.4', '@radix-ui/react-checkbox@^1.0.4', '@radix-ui/react-collapsible@^1.0.3', '@radix-ui/react-context-menu@^2.1.5', '@radix-ui/react-hover-card@^1.0.7', '@radix-ui/react-menubar@^1.0.4', '@radix-ui/react-navigation-menu@^1.1.4', '@radix-ui/react-popover@^1.0.7', '@radix-ui/react-progress@^1.0.3', '@radix-ui/react-radio-group@^1.1.3', '@radix-ui/react-scroll-area@^1.0.5', '@radix-ui/react-slider@^1.1.2', '@radix-ui/react-toggle@^1.0.3', '@radix-ui/react-toggle-group@^1.0.4'], isDev: false },
    { packages: ['cmdk@^0.2.0', 'date-fns@^2.30.0', 'react-day-picker@^8.9.1', 'react-hook-form@^7.48.2', '@hookform/resolvers@^3.3.2', 'zod@^3.22.4', 'sonner@^1.2.4', 'tailwindcss-animate@^1.0.7'], isDev: false }
  ],
  envVars: []
};

// Type-safe artifact access
export type UiShadcnUiCreates = typeof UiShadcnUiArtifacts.creates[number];
export type UiShadcnUiEnhances = typeof UiShadcnUiArtifacts.enhances[number];
