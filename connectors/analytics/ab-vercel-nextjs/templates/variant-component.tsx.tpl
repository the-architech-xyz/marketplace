/**
 * Variant Component
 * 
 * Used inside Experiment component to define content for a specific variant.
 * Only renders if the user is assigned to this variant.
 */

'use client';

import React from 'react';
import type { Variant } from '@/lib/ab-testing/types';

interface VariantProps {
  name: Variant;
  children: React.ReactNode;
}

/**
 * Variant component (used inside Experiment)
 * This component is rendered by the Experiment component based on variant assignment
 */
export function Variant({ name, children }: VariantProps) {
  // This component doesn't render itself - it's handled by Experiment
  // But we export it for type checking and to make it clear this is a Variant
  return <>{children}</>;
}

// Export as default for easier imports
export default Variant;






























