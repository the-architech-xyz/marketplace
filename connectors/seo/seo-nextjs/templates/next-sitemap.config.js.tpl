/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: false, // We use robots.ts instead
  generateIndexSitemap: false,
  exclude: [
    '/api/*',
    '/admin/*',
    '/_next/*',
    '/private/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
    ],
  },
  // Additional options can be added here
  // changefreq: 'daily',
  // priority: 0.7,
  // transform: async (config, path) => {
  //   return {
  //     loc: path,
  //     changefreq: config.changefreq,
  //     priority: config.priority,
  //     lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  //   };
  // },
};






























