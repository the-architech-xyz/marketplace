/**
 * Core Dependencies Blueprint
 * 
 * Centralized dependency management to eliminate redundancy
 * Only installs dependencies once, even if multiple modules need them
 */

import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

export const coreDependenciesBlueprint: Blueprint = {
  id: 'core-dependencies-setup',
  name: 'Core Dependencies Setup',
  description: 'Centralized dependency management to eliminate redundancy',
  actions: [
    // Core form dependencies (used by multiple modules)
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'react-hook-form@^7.48.2',
        '@hookform/resolvers@^3.3.2',
        'zod@^3.22.4'
      ],
      condition: '${context..forms ? "..." : ""}'
    },

    // Core UI dependencies (used by multiple modules)
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'lucide-react@^0.294.0',
        'date-fns@^2.30.0'
      ],
      condition: '${context..ui ? "..." : ""}'
    },

    // Core data fetching dependencies
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        '@tanstack/react-query@^5.0.0'
      ],
      condition: '${context..dataFetching ? "..." : ""}'
    },

    // Core state management dependencies
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'zustand@^4.4.0'
      ],
      condition: '${context..stateManagement ? "..." : ""}'
    }
  ]
};

export default coreDependenciesBlueprint;
