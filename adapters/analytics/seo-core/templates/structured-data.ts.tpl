// Structured Data (JSON-LD) generators
import type {
  StructuredData,
  ArticleStructuredData,
  OrganizationStructuredData,
  WebsiteStructuredData,
  BreadcrumbStructuredData,
} from './types.js';
import { SEO_CONFIG } from './config.js';

/**
 * Generate Website structured data
 */
export function generateWebsiteStructuredData(options?: {
  name?: string;
  url?: string;
  description?: string;
  searchAction?: boolean;
}): WebsiteStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: options?.name || SEO_CONFIG.siteName || 'My App',
    url: options?.url || SEO_CONFIG.siteUrl || '',
    description: options?.description,
    ...(options?.searchAction
      ? {
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${options?.url || SEO_CONFIG.siteUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        }
      : {}),
  };
}

/**
 * Generate Organization structured data
 */
export function generateOrganizationStructuredData(options: {
  name: string;
  url?: string;
  logo?: string;
  description?: string;
  socialLinks?: string[];
}): OrganizationStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: options.name,
    url: options.url || SEO_CONFIG.siteUrl || '',
    logo: options.logo,
    description: options.description,
    ...(options.socialLinks && options.socialLinks.length > 0
      ? {
          sameAs: options.socialLinks,
        }
      : {}),
  };
}

/**
 * Generate Article structured data
 */
export function generateArticleStructuredData(options: {
  headline: string;
  description?: string;
  image?: string | string[];
  author?: {
    name: string;
    url?: string;
    type?: 'Person' | 'Organization';
  };
  publisher?: {
    name: string;
    logo?: string;
  };
  datePublished?: string | Date;
  dateModified?: string | Date;
  url?: string;
}): ArticleStructuredData {
  const data: ArticleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.headline,
    description: options.description,
    image: options.image,
    url: options.url,
  };

  if (options.author) {
    data.author = {
      '@type': options.author.type || 'Person',
      name: options.author.name,
      ...(options.author.url ? { url: options.author.url } : {}),
    };
  }

  if (options.publisher) {
    data.publisher = {
      '@type': 'Organization',
      name: options.publisher.name,
      ...(options.publisher.logo
        ? {
            logo: {
              '@type': 'ImageObject',
              url: options.publisher.logo,
            },
          }
        : {}),
    };
  }

  if (options.datePublished) {
    data.datePublished =
      typeof options.datePublished === 'string'
        ? options.datePublished
        : options.datePublished.toISOString();
  }

  if (options.dateModified) {
    data.dateModified =
      typeof options.dateModified === 'string'
        ? options.dateModified
        : options.dateModified.toISOString();
  }

  return data;
}

/**
 * Generate Breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url?: string }>): BreadcrumbStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      ...(crumb.url ? { item: crumb.url } : {}),
    })),
  };
}

/**
 * Generate Product structured data
 */
export function generateProductStructuredData(options: {
  name: string;
  description?: string;
  image?: string | string[];
  price?: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand?: string;
  sku?: string;
  url?: string;
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: options.name,
    description: options.description,
    image: options.image,
    ...(options.price !== undefined
      ? {
          offers: {
            '@type': 'Offer',
            price: options.price,
            priceCurrency: options.currency || 'USD',
            availability: `https://schema.org/${options.availability || 'InStock'}`,
          },
        }
      : {}),
    ...(options.brand ? { brand: { '@type': 'Brand', name: options.brand } } : {}),
    ...(options.sku ? { sku: options.sku } : {}),
    ...(options.url ? { url: options.url } : {}),
  };
}

/**
 * Convert structured data to JSON-LD script
 */
export function structuredDataToJsonLD(data: StructuredData): string {
  return JSON.stringify(data, null, 2);
}




