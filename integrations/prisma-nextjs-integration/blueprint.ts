import { Blueprint } from '@thearchitech.xyz/types';

const prismaNextjsIntegrationBlueprint: Blueprint = {
  id: 'prisma-nextjs-integration',
  name: 'Prisma Next.js Integration',
  description: 'Complete Prisma ORM integration with Next.js for database operations, migrations, and API routes',
  version: '1.0.0',
  actions: [
    // Create Prisma Configuration
    {
      type: 'CREATE_FILE',
      path: 'prisma/schema.prisma',
      template: 'schema.prisma.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/prisma.ts',
      template: 'prisma.ts.tpl'
    },
    // Create API Routes
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/users/route.ts',
      template: 'users-route.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/posts/route.ts',
      template: 'posts-route.ts.tpl'
    },
    // Install Dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        'prisma',
        '@prisma/client'
      ],
      isDev: false
    },
    // Add Scripts
    {
      type: 'ADD_SCRIPT',
      name: 'db:generate',
      command: 'prisma generate',
      description: 'Generate Prisma client'
    },
    {
      type: 'ADD_SCRIPT',
      name: 'db:push',
      command: 'prisma db push',
      description: 'Push schema to database'
    },
    {
      type: 'ADD_SCRIPT',
      name: 'db:migrate',
      command: 'prisma migrate dev',
      description: 'Run database migrations'
    }
  ]
};

export default prismaNextjsIntegrationBlueprint;