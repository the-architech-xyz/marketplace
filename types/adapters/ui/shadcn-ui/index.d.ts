/**
     * Generated TypeScript definitions for Shadcn/ui
     * Generated from: adapters/ui/shadcn-ui/adapter.json
     */

/**
     * Parameters for the Shadcn/ui adapter
     */
export interface Shadcn_uiUiParams {
  /**
   * Components to install (comprehensive set by default)
   */
  components?: Array<'button' | 'input' | 'card' | 'dialog' | 'form' | 'table' | 'badge' | 'avatar' | 'dropdown-menu' | 'toast' | 'sheet' | 'tabs' | 'accordion' | 'carousel' | 'calendar' | 'date-picker' | 'alert-dialog' | 'checkbox' | 'collapsible' | 'context-menu' | 'hover-card' | 'menubar' | 'navigation-menu' | 'popover' | 'progress' | 'radio-group' | 'scroll-area' | 'slider' | 'toggle' | 'toggle-group'>;
}

/**
     * Features for the Shadcn/ui adapter
     */
export interface Shadcn_uiUiFeatures {
  /**
   * Install theming dependencies (next-themes)
   */
  theming?: boolean;
  /**
   * Install accessibility dependencies (eslint-plugin-jsx-a11y)
   */
  accessibility?: boolean;
}
