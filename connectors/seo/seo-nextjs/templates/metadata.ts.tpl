import type { Metadata } from 'next';
import type { PageMetadata } from '@/lib/seo/types';
import {
  generatePageMetadata,
  generateArticleMetadata,
  generateHomeMetadata,
} from '@/lib/seo/metadata-helpers';
import { mergeMetadata } from '@/lib/seo/utils';
import { DEFAULT_METADATA, DEFAULT_OPEN_GRAPH, DEFAULT_TWITTER } from '@/lib/seo/config';

/**
 * Convert PageMetadata to Next.js Metadata format
 */
export function toNextMetadata(metadata: PageMetadata): Metadata {
  const nextMetadata: Metadata = {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    authors: metadata.openGraph?.authors
      ? metadata.openGraph.authors.map((author) => ({ name: author }))
      : undefined,
    creator: metadata.author,
    robots: metadata.robots,
    alternates: metadata.alternates,
  };

  // Open Graph
  if (metadata.openGraph) {
    nextMetadata.openGraph = {
      type: metadata.openGraph.type,
      url: metadata.openGraph.url,
      title: metadata.openGraph.title || metadata.title,
      description: metadata.openGraph.description || metadata.description,
      siteName: metadata.openGraph.siteName,
      locale: metadata.openGraph.locale,
      images: metadata.openGraph.images?.map((img) => ({
        url: img.url,
        width: img.width,
        height: img.height,
        alt: img.alt,
        type: img.type,
      })),
      ...(metadata.openGraph.publishedTime ? { publishedTime: metadata.openGraph.publishedTime } : {}),
      ...(metadata.openGraph.modifiedTime ? { modifiedTime: metadata.openGraph.modifiedTime } : {}),
      ...(metadata.openGraph.authors ? { authors: metadata.openGraph.authors } : {}),
    };
  }

  // Twitter
  if (metadata.twitter) {
    nextMetadata.twitter = {
      card: metadata.twitter.card,
      site: metadata.twitter.site,
      creator: metadata.twitter.creator,
      title: metadata.twitter.title || metadata.title,
      description: metadata.twitter.description || metadata.description,
      images: metadata.twitter.images,
    };
  }

  // Other metadata
  if (metadata.other) {
    nextMetadata.other = metadata.other;
  }

  return nextMetadata;
}

/**
 * Generate Next.js metadata for a page
 */
export function generateMetadata(options: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
}): Metadata {
  const pageMetadata = generatePageMetadata(options);
  return toNextMetadata(pageMetadata);
}

/**
 * Generate Next.js metadata for an article
 */
export function generateArticleNextMetadata(options: {
  title: string;
  description?: string;
  path: string;
  image?: string;
  publishedTime: string | Date;
  modifiedTime?: string | Date;
  authors?: string[];
  tags?: string[];
}): Metadata {
  const articleMetadata = generateArticleMetadata(options);
  return toNextMetadata(articleMetadata);
}

/**
 * Generate Next.js metadata for homepage
 */
export function generateHomeNextMetadata(options?: {
  title?: string;
  description?: string;
  image?: string;
}): Metadata {
  const homeMetadata = generateHomeMetadata(options);
  return toNextMetadata(homeMetadata);
}

/**
 * Export metadata helper (for use in page.tsx)
 */
export function exportMetadata(metadata: PageMetadata): Metadata {
  return toNextMetadata(metadata);
}

/**
 * Default root layout metadata
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'),
  title: {
    default: DEFAULT_METADATA.title,
    template: `%s | ${DEFAULT_METADATA.title}`,
  },
  description: DEFAULT_METADATA.description,
  keywords: DEFAULT_METADATA.keywords,
  authors: [{ name: DEFAULT_METADATA.author }],
  creator: DEFAULT_METADATA.author,
  robots: DEFAULT_METADATA.robots,
  openGraph: {
    type: DEFAULT_OPEN_GRAPH.type,
    locale: DEFAULT_OPEN_GRAPH.locale,
    siteName: DEFAULT_OPEN_GRAPH.siteName,
    images: DEFAULT_OPEN_GRAPH.images,
  },
  twitter: DEFAULT_TWITTER,
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || '',
  },
};




