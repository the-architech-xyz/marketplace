/**
 * Waitlist Backend Blueprint (Next.js)
 * 
 * Generates API routes for waitlist feature with viral referral system.
 * Handles user registration, referral tracking, leaderboard, and stats.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/waitlist/backend/nextjs'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  const { params, features } = extractTypedModuleParameters(config);

  // ============================================================================
  // JOIN WAITLIST API ROUTE
  // ============================================================================

  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.backend.api}waitlist/join/route.ts', // BACKEND API (resolves to apps.api.routes or apps.web.app/api)
    template: 'templates/api-join-route.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // ============================================================================
  // GET USER WAITLIST STATUS API ROUTE
  // ============================================================================

  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.backend.api}waitlist/user/[userId]/route.ts', // BACKEND API
    template: 'templates/api-user-route.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // ============================================================================
  // LEADERBOARD API ROUTE
  // ============================================================================

  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.backend.api}waitlist/leaderboard/route.ts', // BACKEND API
    template: 'templates/api-leaderboard-route.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // ============================================================================
  // STATS API ROUTE
  // ============================================================================

  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.backend.api}waitlist/stats/route.ts', // BACKEND API
    template: 'templates/api-stats-route.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // ============================================================================
  // REFERRAL LINK API ROUTE
  // ============================================================================

  if (features.viralReferral) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.backend.api}waitlist/referral-link/[userId]/route.ts', // BACKEND API
      template: 'templates/api-referral-link-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });

    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.backend.api}waitlist/check-code/[code]/route.ts', // BACKEND API
      template: 'templates/api-check-code-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }

  return actions;
}


