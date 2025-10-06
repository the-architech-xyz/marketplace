# Getting Started with The Architech

## Quick Start

### 1. Install The Architech CLI
```bash
# Clone and build from source
git clone https://github.com/the-architech/cli.git
cd cli
npm install
npm run build
```

### 2. Create Your First Project
```bash
# Use a pre-built genome
node dist/index.js new /path/to/marketplace/genomes/simple-app.genome.ts

# Or create your own genome
node dist/index.js new my-custom.genome.ts
```

### 3. Choose Your Stack
Create a TypeScript genome file that defines:
- Framework (Next.js, Remix, etc.)
- UI Library (Shadcn/UI, MUI, etc.)
- Database (Drizzle, Prisma, etc.)
- Authentication (Better Auth, Auth0, etc.)

### 4. Add Features
```bash
# Features are included in genomes
# Edit your genome.ts file to add more modules
```

## Understanding Genomes

A genome is a declarative configuration file that describes your entire application stack:

```typescript
import { Genome } from '@thearchitech.xyz/marketplace';

const myApp: Genome = {
  project: {
    name: 'my-awesome-app',
    description: 'A modern web application',
    version: '1.0.0'
  },
  modules: [
    // Adapters
    { id: 'framework/nextjs' },
    { id: 'ui/shadcn-ui' },
    { id: 'database/drizzle' },
    
    // Integrators
    { id: 'integrations/drizzle-nextjs' },
    
    // Features
    { id: 'features/teams-dashboard/nextjs-shadcn' }
  ]
};
```

## Available Modules

### Adapters
- **Frameworks**: Next.js, Remix, SvelteKit
- **UI Libraries**: Shadcn/UI, MUI, Chakra UI
- **Databases**: Drizzle, Prisma, TypeORM, Sequelize
- **Authentication**: Better Auth, Auth0, Clerk
- **State Management**: Zustand, Redux Toolkit
- **Testing**: Vitest, Jest, Playwright
- **Quality**: ESLint, Prettier

### Integrators
- **Database-Framework**: `drizzle-nextjs`, `prisma-nextjs`
- **Auth-Framework**: `better-auth-nextjs`
- **UI-Framework**: `shadcn-nextjs`
- **Data-Fetching**: `tanstack-query-nextjs`

### Features
- **Teams Dashboard**: Complete team management
- **User Profile**: User account management
- **Project Kanban**: Project management board
- **Payment Management**: Stripe integration
- **Email Management**: Resend integration
- **Web3 Dashboard**: Blockchain integration

## Examples

### Basic Web App
```typescript
const basicApp: Genome = {
  project: { name: 'basic-app', version: '1.0.0' },
  modules: [
    { id: 'framework/nextjs' },
    { id: 'ui/shadcn-ui' },
    { id: 'database/drizzle' },
    { id: 'integrations/drizzle-nextjs' }
  ]
};
```

### SaaS Application
```typescript
const saasApp: Genome = {
  project: { name: 'saas-app', version: '1.0.0' },
  modules: [
    // Core stack
    { id: 'framework/nextjs' },
    { id: 'ui/shadcn-ui' },
    { id: 'database/drizzle' },
    { id: 'auth/better-auth' },
    
    // Integrations
    { id: 'integrations/drizzle-nextjs' },
    { id: 'integrations/better-auth-nextjs' },
    { id: 'integrations/stripe-nextjs' },
    
    // Features
    { id: 'features/teams-dashboard/nextjs-shadcn' },
    { id: 'features/user-profile/nextjs-shadcn' },
    { id: 'features/payment-management/nextjs-shadcn' }
  ]
};
```

## Next Steps

- [Architecture Guide](./ARCHITECTURE.md)
- [Adapter Development](./ADAPTER_GUIDE.md)
- [Integrator Development](./INTEGRATOR_GUIDE.md)
- [Feature Development](./FEATURE_GUIDE.md)
- [Contributing](./CONTRIBUTING.md)
