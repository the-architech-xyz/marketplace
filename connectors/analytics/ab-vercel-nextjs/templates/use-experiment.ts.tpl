/**
 * useExperiment Hook
 * 
 * React hook to access experiment variant assignment.
 * Reads variant from cookies set by middleware.
 */

'use client';

import { useEffect, useState } from 'react';
import type { Variant } from '@/lib/ab-testing/types';
import { AB_TESTING_CONFIG } from '@/lib/ab-testing/config';
import { parseVariantCookie } from '@/lib/ab-testing/utils';

interface UseExperimentResult {
  variant: Variant | null;
  isLoading: boolean;
  isActive: boolean;
}

/**
 * Hook to get variant for a specific experiment
 */
export function useExperiment(experimentId: string): UseExperimentResult {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get variant from cookie (client-side)
    const cookieName = `${AB_TESTING_CONFIG.cookieName}_${experimentId}`;
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {} as Record<string, string>);
    
    const cookieValue = cookies[cookieName];

    if (cookieValue) {
      const parsed = parseVariantCookie(cookieValue);
      if (parsed) {
        setVariant(parsed.variant);
      }
    }

    setIsLoading(false);
  }, [experimentId]);

  return {
    variant,
    isLoading,
    isActive: variant !== null,
  };
}

/**
 * Hook to check if user is in a specific variant
 */
export function useIsInVariant(experimentId: string, targetVariant: Variant): boolean {
  const { variant } = useExperiment(experimentId);
  return variant === targetVariant;
}

/**
 * Hook to check if experiment is active
 */
export function useIsExperimentActive(experimentId: string): boolean {
  const { isActive } = useExperiment(experimentId);
  return isActive;
}

