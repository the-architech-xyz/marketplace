import { CollectionConfig } from 'payload/types';

/**
 * Pages Collection
 * 
 * Core pages collection for building websites with Payload.
 * Includes SEO fields, content blocks, and draft preview support.
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Public read access
  },
  versions: {
    drafts: true, // Enable draft preview
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path for this page (e.g., "/about")',
      },
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'SEO title (overrides page title)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'SEO description',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
};






























