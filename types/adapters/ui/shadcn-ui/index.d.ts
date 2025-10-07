/**
 * Shadcn/ui
 * 
 * Beautifully designed components built with Radix UI and Tailwind CSS
 */

export interface UiShadcnUiParams {

  /** Components to install (comprehensive set by default) */
  components?: Array<'button' | 'input' | 'card' | 'dialog' | 'form' | 'table' | 'badge' | 'avatar' | 'dropdown-menu' | 'sonner' | 'sheet' | 'tabs' | 'accordion' | 'carousel' | 'calendar' | 'date-picker' | 'alert-dialog' | 'checkbox' | 'collapsible' | 'context-menu' | 'hover-card' | 'menubar' | 'navigation-menu' | 'popover' | 'progress' | 'radio-group' | 'scroll-area' | 'slider' | 'toggle' | 'toggle-group'>;
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
