import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { seoPlugin } from '@payloadcms/plugin-seo';
import path from 'path';

// Import collections
import { Pages } from '@/collections/Pages';
import { Posts } from '@/collections/Posts';
import { Media } from '@/collections/Media';

export default buildConfig({
  // Database
  adapter: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  // Collections
  collections: [
    Pages,
    Posts,
    Media,
    // Add your custom collections here
  ],

  // Editor
  editor: lexicalEditor(),

  // Plugins
  plugins: [
    seoPlugin({
      collections: ['pages', 'posts'],
      tabbedUI: true,
    }),
  ],

  // Admin config
  admin: {
    user: 'Users',
    meta: {
      titleSuffix: ' - CMS',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },

  // Localization
  localization: {
    locales: ['en'], // Add more locales as needed
    defaultLocale: 'en',
  },

  // Typescript
  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
  },

  // GraphQL
  graphQL: {
    schemaOutputFile: path.resolve(process.cwd(), 'graphql-schema.graphql'),
  },

  // Features
  features: {
    livePreview: process.env.PAYLOAD_LIVE_PREVIEW === 'true',
  },

  // Custom server
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || '',

  // Rate limiting
  rateLimit: {
    window: 2 * 60 * 1000, // 2 minutes
    max: 2400, // limit each IP to 2400 requests per windowMs
  },
});

