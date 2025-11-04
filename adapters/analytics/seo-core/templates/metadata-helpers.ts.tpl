// Metadata generation helpers
import type { PageMetadata } from './types.js';
import { SEO_CONFIG, DEFAULT_METADATA, DEFAULT_OPEN_GRAPH, DEFAULT_TWITTER } from './config.js';
import { getCanonicalUrl, mergeMetadata } from './utils.js';

/**
 * Generate page metadata for a standard page
 */
export function generatePageMetadata(options: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}): PageMetadata {
  const canonical = options.path ? getCanonicalUrl(options.path) : undefined;

  return mergeMetadata({
    title: options.title || DEFAULT_METADATA.title,
    description: options.description || DEFAULT_METADATA.description,
    canonical,
    openGraph: {
      type: options.type || DEFAULT_OPEN_GRAPH.type,
      url: canonical,
      title: options.title || DEFAULT_METADATA.title,
      description: options.description || DEFAULT_METADATA.description,
      ...(options.image
        ? {
            images: [
              {
                url: options.image,
                alt: options.title || '',
              },
            ],
          }
        : {}),
      ...(options.type === 'article' && options.publishedTime
        ? { publishedTime: options.publishedTime }
        : {}),
      ...(options.type === 'article' && options.modifiedTime
        ? { modifiedTime: options.modifiedTime }
        : {}),
      ...(options.type === 'article' && options.authors
        ? { authors: options.authors }
        : {}),
    },
    twitter: {
      ...DEFAULT_TWITTER,
      title: options.title || DEFAULT_METADATA.title,
      description: options.description || DEFAULT_METADATA.description,
      ...(options.image ? { images: [options.image] } : {}),
    },
  });
}

/**
 * Generate article metadata
 */
export function generateArticleMetadata(options: {
  title: string;
  description?: string;
  path: string;
  image?: string;
  publishedTime: string | Date;
  modifiedTime?: string | Date;
  authors?: string[];
  tags?: string[];
}): PageMetadata {
  const publishedTime =
    typeof options.publishedTime === 'string'
      ? options.publishedTime
      : options.publishedTime.toISOString();
  const modifiedTime = options.modifiedTime
    ? typeof options.modifiedTime === 'string'
      ? options.modifiedTime
      : options.modifiedTime.toISOString()
    : publishedTime;

  return generatePageMetadata({
    title: options.title,
    description: options.description,
    path: options.path,
    image: options.image,
    type: 'article',
    publishedTime,
    modifiedTime,
    authors: options.authors,
  });
}

/**
 * Generate homepage metadata
 */
export function generateHomeMetadata(options?: {
  title?: string;
  description?: string;
  image?: string;
}): PageMetadata {
  return generatePageMetadata({
    title: options?.title || SEO_CONFIG.siteName || DEFAULT_METADATA.title,
    description: options?.description || DEFAULT_METADATA.description,
    path: '/',
    image: options?.image,
    type: 'website',
  });
}




