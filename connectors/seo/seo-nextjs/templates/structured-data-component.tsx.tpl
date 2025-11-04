'use client';

import Script from 'next/script';
import type { StructuredData } from '@/lib/seo/types';
import { structuredDataToJsonLD } from '@/lib/seo/structured-data';

interface StructuredDataProps {
  data: StructuredData | StructuredData[];
  id?: string;
}

/**
 * StructuredData Component
 * 
 * Renders JSON-LD structured data for SEO.
 * 
 * Usage:
 * ```tsx
 * <StructuredData data={generateWebsiteStructuredData({ name: 'My App' })} />
 * ```
 */
export function StructuredData({ data, id = 'structured-data' }: StructuredDataProps) {
  const jsonLd = Array.isArray(data) ? data : [data];
  const jsonLdString = jsonLd.map((item) => structuredDataToJsonLD(item)).join('\n');

  return (
    <>
      {jsonLd.map((item, index) => (
        <Script
          key={`${id}-${index}`}
          id={`${id}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredDataToJsonLD(item),
          }}
        />
      ))}
    </>
  );
}

/**
 * Server Component version (for App Router)
 * Use this in Server Components instead of the client version
 */
export function StructuredDataServer({ data }: StructuredDataProps) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredDataToJsonLD(item),
          }}
        />
      ))}
    </>
  );
}




