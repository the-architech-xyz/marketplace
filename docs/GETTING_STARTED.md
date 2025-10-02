# Getting Started with The Architech

## Quick Start

### 1. Install The Architech CLI
```bash
npm install -g @thearchitech.xyz/cli
```

### 2. Create Your First Project
```bash
architech new my-app
```

### 3. Choose Your Stack
The CLI will guide you through selecting:
- Framework (Next.js, Remix, etc.)
- UI Library (Shadcn/UI, MUI, etc.)
- Database (Drizzle, Prisma, etc.)
- Authentication (Better Auth, Auth0, etc.)

### 4. Add Features
```bash
architech add feature teams-dashboard
architech add feature user-profile
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
