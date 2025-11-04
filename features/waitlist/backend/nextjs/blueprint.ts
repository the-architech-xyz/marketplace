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
    path: '${paths.app}/api/waitlist/join/route.ts',
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
    path: '${paths.app}/api/waitlist/user/[userId]/route.ts',
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
    path: '${paths.app}/api/waitlist/leaderboard/route.ts',
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
    path: '${paths.app}/api/waitlist/stats/route.ts',
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
      path: '${paths.app}/api/waitlist/referral-link/[userId]/route.ts',
      template: 'templates/api-referral-link-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });

    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app}/api/waitlist/check-code/[code]/route.ts',
      template: 'templates/api-check-code-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }

  return actions;
}


