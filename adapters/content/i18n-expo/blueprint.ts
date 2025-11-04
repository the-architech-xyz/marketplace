/**
 * Expo/React Native Internationalization Blueprint
 * 
 * Sets up i18n for Expo and React Native using expo-localization and react-i18next
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

export default function generateBlueprint(): BlueprintAction[] {
  return [
    // Install required packages
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'expo-localization',
        'react-i18next',
        'i18next'
      ]
    },
    
    // i18n configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/i18n/config.ts',
      template: 'templates/config.ts.tpl',
    },
    
    // i18n initialization
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/i18n/index.ts',
      template: 'templates/index.ts.tpl',
    },
    
    // Translation files
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/i18n/locales/en.json',
      template: 'templates/en.json.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/i18n/locales/fr.json',
      template: 'templates/fr.json.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/i18n/locales/es.json',
      template: 'templates/es.json.tpl',
    },
    
    // Native formatting utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/i18n/formatting.ts',
      template: 'templates/formatting.ts.tpl',
    }
  ];
}

