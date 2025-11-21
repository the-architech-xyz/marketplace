import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getEdgeConfig } from '@vercel/edge-config';
import type { Experiment, ExperimentConfig } from '@/lib/ab-testing/types';
import { assignVariant } from '@/lib/ab-testing/variant-assignment';
import { getExperiment } from '@/lib/ab-testing/experiments';
import { parseVariantCookie, setVariantCookie } from '@/lib/ab-testing/utils';
import { AB_TESTING_CONFIG } from '@/lib/ab-testing/config';

/**
 * A/B Testing Middleware
 * 
 * Assigns variants to users based on experiments configured in Vercel Edge Config.
 * Sets cookies to persist variant assignments.
 * 
 * Usage: Merge this into your main middleware.ts file
 */
export async function abTestingMiddleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Skip if A/B testing is disabled
  if (!AB_TESTING_CONFIG.enabled) {
    return response;
  }

  try {
    // Get experiments from Edge Config (or use local config)
    let experiments: ExperimentConfig = {};
    
    try {
      const edgeConfig = getEdgeConfig();
      const edgeExperiments = await edgeConfig.get<ExperimentConfig>('ab_experiments');
      if (edgeExperiments) {
        experiments = edgeExperiments;
      }
    } catch (error) {
      // Edge Config not configured or not available
      // Fall back to local experiments config if needed
      console.warn('Edge Config not available, using local experiments:', error);
    }

    // If no experiments, return early
    if (Object.keys(experiments).length === 0) {
      return response;
    }

    // Get or generate session ID
    let sessionId = request.cookies.get('session_id')?.value;
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      response.cookies.set('session_id', sessionId, {
        path: '/',
        maxAge: AB_TESTING_CONFIG.cookieMaxAge,
        httpOnly: true,
        sameSite: 'lax',
      });
    }

    // Get user ID from cookie or session (if available)
    const userId = request.cookies.get('user_id')?.value;

    // Get variant override from query params
    const variantOverride = request.nextUrl.searchParams.get('variant');

    // Process each active experiment
    const variantAssignments: Record<string, string> = {};
    
    for (const [experimentId, experiment] of Object.entries(experiments)) {
      if (!experiment.enabled) continue;

      // Check for existing variant in cookie
      const experimentCookie = request.cookies.get(`${AB_TESTING_CONFIG.cookieName}_${experimentId}`);
      let existingVariant: string | null = null;
      
      if (experimentCookie) {
        const parsed = parseVariantCookie(experimentCookie.value);
        if (parsed) {
          existingVariant = parsed.variant;
        }
      }

      // Assign variant
      const variant = assignVariant(experiment, {
        userId: userId || undefined,
        sessionId,
        cookieVariant: existingVariant || undefined,
        overrideVariant: variantOverride,
      });

      // Set cookie if variant changed or if sticky experiments need persistence
      if (!existingVariant || variant !== existingVariant) {
        const cookieValue = setVariantCookie(experimentId, variant);
        response.cookies.set(`${AB_TESTING_CONFIG.cookieName}_${experimentId}`, cookieValue, {
          path: '/',
          maxAge: AB_TESTING_CONFIG.cookieMaxAge,
          httpOnly: false, // Allow client-side access
          sameSite: 'lax',
        });
      }

      variantAssignments[experimentId] = variant;
    }

    // Add variant assignments to response headers (for debugging)
    if (process.env.NODE_ENV === 'development') {
      response.headers.set('X-AB-Variants', JSON.stringify(variantAssignments));
    }

    return response;
  } catch (error) {
    console.error('A/B testing middleware error:', error);
    // Return response even if A/B testing fails
    return response;
  }
}






























