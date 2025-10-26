/**
 * i18n Frontend Blueprint
 * 
 * Creates Shadcn UI components for i18n
 */

import { BlueprintAction, BlueprintActionType } from '@thearchitech.xyz/types';

export default function generateBlueprint(): BlueprintAction[] {
  return [
    // Locale switcher component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}/i18n/locale-switcher.tsx',
      template: 'templates/locale-switcher.tsx.tpl',
    },
    
    // Language selector component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}/i18n/language-selector.tsx',
      template: 'templates/language-selector.tsx.tpl',
    }
  ];
}
