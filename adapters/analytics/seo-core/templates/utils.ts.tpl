// SEO utility functions
import { SEO_CONFIG } from './config.js';
import type { PageMetadata, SitemapEntry } from './types.js';

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string): string {
  const baseUrl = SEO_CONFIG.siteUrl?.replace(/\/$/, '') || '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Generate absolute URL
 */
export function getAbsoluteUrl(path: string): string {
  return getCanonicalUrl(path);
}

/**
 * Merge metadata with defaults
 */
export function mergeMetadata(
  metadata: Partial<PageMetadata>,
  defaults?: Partial<PageMetadata>
): PageMetadata {
  const defaultMetadata = defaults || {
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      siteName: SEO_CONFIG.siteName,
      locale: SEO_CONFIG.defaultLocale,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };

  return {
    ...defaultMetadata,
    ...metadata,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...metadata.openGraph,
      url: metadata.openGraph?.url || getCanonicalUrl(metadata.canonical || ''),
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...metadata.twitter,
    },
  } as PageMetadata;
}

/**
 * Validate SEO metadata
 */
export function validateMetadata(metadata: Partial<PageMetadata>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!metadata.title && !metadata.openGraph?.title) {
    errors.push('Title is required');
  }

  if (!metadata.description && !metadata.openGraph?.description) {
    errors.push('Description is required');
  }

  if (metadata.title && metadata.title.length > 60) {
    errors.push('Title should be less than 60 characters');
  }

  if (metadata.description && metadata.description.length > 160) {
    errors.push('Description should be less than 160 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generate meta tags string (for non-Next.js usage)
 */
export function generateMetaTags(metadata: PageMetadata): string {
  const tags: string[] = [];

  if (metadata.title) {
    tags.push(`<title>${escapeHtml(metadata.title)}</title>`);
  }

  if (metadata.description) {
    tags.push(`<meta name="description" content="${escapeHtml(metadata.description)}" />`);
  }

  if (metadata.keywords && metadata.keywords.length > 0) {
    tags.push(`<meta name="keywords" content="${escapeHtml(metadata.keywords.join(', '))}" />`);
  }

  if (metadata.canonical) {
    tags.push(`<link rel="canonical" href="${escapeHtml(metadata.canonical)}" />`);
  }

  // Open Graph tags
  if (metadata.openGraph) {
    const og = metadata.openGraph;
    if (og.title) tags.push(`<meta property="og:title" content="${escapeHtml(og.title)}" />`);
    if (og.description) tags.push(`<meta property="og:description" content="${escapeHtml(og.description)}" />`);
    if (og.url) tags.push(`<meta property="og:url" content="${escapeHtml(og.url)}" />`);
    if (og.type) tags.push(`<meta property="og:type" content="${escapeHtml(og.type)}" />`);
    if (og.siteName) tags.push(`<meta property="og:site_name" content="${escapeHtml(og.siteName)}" />`);
    if (og.locale) tags.push(`<meta property="og:locale" content="${escapeHtml(og.locale)}" />`);
    if (og.images && og.images.length > 0) {
      og.images.forEach((image, index) => {
        tags.push(`<meta property="og:image" content="${escapeHtml(image.url)}" />`);
        if (image.width) tags.push(`<meta property="og:image:width" content="${image.width}" />`);
        if (image.height) tags.push(`<meta property="og:image:height" content="${image.height}" />`);
        if (image.alt) tags.push(`<meta property="og:image:alt" content="${escapeHtml(image.alt)}" />`);
      });
    }
  }

  // Twitter tags
  if (metadata.twitter) {
    const tw = metadata.twitter;
    if (tw.card) tags.push(`<meta name="twitter:card" content="${escapeHtml(tw.card)}" />`);
    if (tw.site) tags.push(`<meta name="twitter:site" content="${escapeHtml(tw.site)}" />`);
    if (tw.creator) tags.push(`<meta name="twitter:creator" content="${escapeHtml(tw.creator)}" />`);
    if (tw.title) tags.push(`<meta name="twitter:title" content="${escapeHtml(tw.title)}" />`);
    if (tw.description) tags.push(`<meta name="twitter:description" content="${escapeHtml(tw.description)}" />`);
    if (tw.images && tw.images.length > 0) {
      tags.push(`<meta name="twitter:image" content="${escapeHtml(tw.images[0])}" />`);
    }
  }

  return tags.join('\n');
}

/**
 * Escape HTML entities
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Generate sitemap XML
 */
export function generateSitemapXML(entries: SitemapEntry[]): string {
  const urls = entries.map((entry) => {
    const lastmod = entry.lastModified
      ? typeof entry.lastModified === 'string'
        ? entry.lastModified
        : entry.lastModified.toISOString()
      : new Date().toISOString();

    return `
    <url>
      <loc>${escapeHtml(entry.url)}</loc>
      <lastmod>${lastmod}</lastmod>
      ${entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ''}
      ${entry.priority !== undefined ? `<priority>${entry.priority}</priority>` : ''}
    </url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}






























