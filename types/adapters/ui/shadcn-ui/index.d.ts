/**
 * Shadcn/ui
 * 
 * Beautifully designed components built with Radix UI and Tailwind CSS
 */

export interface UiShadcnUiParams {

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';

  /** Components to install (comprehensive set by default) */
  components?: Array<'alert' | 'alert-dialog' | 'accordion' | 'avatar' | 'badge' | 'button' | 'calendar' | 'card' | 'carousel' | 'checkbox' | 'collapsible' | 'context-menu' | 'date-picker' | 'dialog' | 'dropdown-menu' | 'form' | 'hover-card' | 'input' | 'label' | 'menubar' | 'navigation-menu' | 'pagination' | 'popover' | 'progress' | 'radio-group' | 'scroll-area' | 'separator' | 'sheet' | 'slider' | 'sonner' | 'switch' | 'table' | 'tabs' | 'textarea' | 'toggle' | 'toggle-group'>;
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
