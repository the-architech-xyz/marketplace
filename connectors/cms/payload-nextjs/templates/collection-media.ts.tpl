import { CollectionConfig } from 'payload/types';

/**
 * Media Collection
 * 
 * Handles file uploads and media management.
 * Supports images, documents, videos, and more.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alt text for accessibility and SEO',
      },
    },
  ],
  upload: {
    staticDir: 'media', // Directory where files are stored
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf', 'video/*'],
  },
};






























