/**
 * Experiment Component
 * 
 * Wraps children and shows different content based on variant assignment.
 * 
 * Usage:
 * ```tsx
 * <Experiment experimentId="homepage-cta">
 *   <Variant name="control">
 *     <Button>Sign Up</Button>
 *   </Variant>
 *   <Variant name="variant-a">
 *     <Button variant="outline">Get Started</Button>
 *   </Variant>
 * </Experiment>
 * ```
 */

'use client';

import React from 'react';
import { useExperiment } from '@/hooks/use-experiment';
import type { Variant } from '@/lib/ab-testing/types';
import { Variant as VariantComponent } from './Variant';

interface ExperimentProps {
  experimentId: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
}

export function Experiment({ experimentId, children, fallback, loading }: ExperimentProps) {
  const { variant, isLoading } = useExperiment(experimentId);

  if (isLoading && loading) {
    return <>{loading}</>;
  }

  if (!variant && fallback) {
    return <>{fallback}</>;
  }

  // Find matching Variant component
  const childrenArray = React.Children.toArray(children);
  const matchingVariant = childrenArray.find((child) => {
    if (React.isValidElement(child) && child.type === VariantComponent) {
      return child.props.name === variant;
    }
    return false;
  });

  // If no matching variant, show fallback or first child
  if (!matchingVariant) {
    if (fallback) {
      return <>{fallback}</>;
    }
    // Return first Variant child as default
    const firstVariant = childrenArray.find((child) => {
      if (React.isValidElement(child) && child.type === VariantComponent) {
        return true;
      }
      return false;
    });
    return <>{firstVariant || children}</>;
  }

  return <>{matchingVariant}</>;
}

