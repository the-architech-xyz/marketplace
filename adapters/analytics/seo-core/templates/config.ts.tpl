// SEO configuration
export const SEO_CONFIG = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || '',
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || process.env.SITE_NAME || '',
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en',
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || process.env.TWITTER_HANDLE || '',
  twitterSite: process.env.NEXT_PUBLIC_TWITTER_SITE || process.env.TWITTER_SITE || '',
  facebookAppId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  enabled: process.env.NODE_ENV === 'production' || process.env.SEO_ENABLED === 'true',
};

// Default metadata
export const DEFAULT_METADATA = {
  title: SEO_CONFIG.siteName || 'My App',
  description: 'A modern web application',
  keywords: [],
  author: SEO_CONFIG.siteName || 'My App',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Open Graph defaults
export const DEFAULT_OPEN_GRAPH = {
  type: 'website',
  locale: SEO_CONFIG.defaultLocale,
  siteName: SEO_CONFIG.siteName || 'My App',
  images: [],
};

// Twitter Card defaults
export const DEFAULT_TWITTER = {
  card: 'summary_large_image',
  site: SEO_CONFIG.twitterSite,
  creator: SEO_CONFIG.twitterHandle,
};






























