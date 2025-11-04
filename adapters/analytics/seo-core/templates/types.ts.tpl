// SEO Types
export interface SEOConfig {
  siteUrl: string;
  siteName: string;
  defaultLocale: string;
  twitterHandle?: string;
  twitterSite?: string;
  facebookAppId?: string;
  googleSiteVerification?: string;
}

export interface PageMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  canonical?: string;
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
      'max-video-preview'?: number;
      'max-image-preview'?: 'none' | 'standard' | 'large';
      'max-snippet'?: number;
    };
  };
  openGraph?: {
    type?: 'website' | 'article' | 'book' | 'profile' | 'music' | 'video';
    url?: string;
    title?: string;
    description?: string;
    siteName?: string;
    locale?: string;
    images?: OpenGraphImage[];
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    images?: string[];
  };
  other?: Record<string, string | string[]>;
}

export interface OpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

export interface ArticleStructuredData extends StructuredData {
  '@type': 'Article';
  headline: string;
  description?: string;
  image?: string | string[];
  author?: {
    '@type': 'Person' | 'Organization';
    name: string;
    url?: string;
  };
  publisher?: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  datePublished?: string;
  dateModified?: string;
}

export interface OrganizationStructuredData extends StructuredData {
  '@type': 'Organization';
  name: string;
  url?: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    '@type': 'ContactPoint';
    telephone?: string;
    contactType?: string;
    areaServed?: string;
  };
  sameAs?: string[];
}

export interface WebsiteStructuredData extends StructuredData {
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

export interface BreadcrumbStructuredData extends StructuredData {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface SitemapEntry {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}




