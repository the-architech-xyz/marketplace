'use client';

import { useEffect, useState } from 'react';

// Next.js hydration utilities for Zustand
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
