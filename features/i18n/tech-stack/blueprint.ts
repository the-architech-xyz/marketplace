/**
 * i18n Tech-Stack Blueprint
 * 
 * Provides universal i18n hooks and utilities that work across all frameworks.
 * These hooks use the adapter's implementation under the hood.
 */

import { BlueprintAction, BlueprintActionType } from '@thearchitech.xyz/types';

export default function generateBlueprint(): BlueprintAction[] {
  return [
    // Universal i18n hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/i18n/hooks.ts',
      template: 'templates/hooks.ts.tpl',
    },
    
    // Formatting utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/i18n/formatting.ts',
      template: 'templates/formatting.ts.tpl',
    },
    
    // Type definitions
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/i18n/types.ts',
      template: 'templates/types.ts.tpl',
    },
    
    // Locale utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/i18n/locale.ts',
      template: 'templates/locale.ts.tpl',
    },
    
    // Index file
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/i18n/index.ts',
      template: 'templates/index.ts.tpl',
    }
  ];
}
