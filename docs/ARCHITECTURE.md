# The Architech Architecture

## Overview

The Architech follows a revolutionary 3-tier architecture that separates concerns and enables maximum flexibility while maintaining consistency.

## The 3-Tier Doctrine

### Tier 1: Adapters (The Raw Materials)
**Role**: Install ONE pure, self-contained technology
**Philosophy**: Foundational pillars that know nothing about each other
**Examples**: `nextjs`, `drizzle`, `shadcn-ui`, `better-auth`

### Tier 2: Integrators (The Technical Bridges)
**Role**: Connect exactly two Adapters to ensure technical compatibility
**Philosophy**: Low-level technical circuits that make things work together
**Examples**: `drizzle-nextjs-integration`, `better-auth-nextjs-integration`

### Tier 3: Features (The Business Capabilities)
**Role**: Provide high-level, end-user business capabilities
**Philosophy**: Functional appliances that consume Adapter and Integrator capabilities
**Examples**: `teams-dashboard`, `user-profile`, `payment-management`

## Golden Core Standards

### Opinionated Core (Internal)
- **Data Fetching**: TanStack Query
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Testing**: Vitest + RTL + Playwright
- **Code Quality**: ESLint + Prettier

### Agnostic Interfaces (External)
- **Framework**: Next.js, Remix, SvelteKit
- **UI Library**: Shadcn/UI, MUI, Chakra UI
- **Database**: Drizzle, Prisma, TypeORM
- **Auth**: Better Auth, Auth0, Clerk
- **Deployment**: Vercel, Netlify, Docker

## Capability System

The Architech uses a sophisticated capability-based dependency resolution system:

### Capability Structure
```json
{
  "capabilities": {
    "capability-name": {
      "version": "1.0.0",
      "description": "What this capability provides",
      "provides": ["specific-functionality-1", "specific-functionality-2"]
    }
  }
}
```

### Prerequisites Structure
```json
{
  "prerequisites": {
    "modules": ["required-module-1", "required-module-2"],
    "capabilities": ["required-capability-1", "required-capability-2"]
  }
}
```

## Module Classification

```typescript
// Adapters: Pure technology installation
{ id: "framework/nextjs" }
{ id: "database/drizzle" }
{ id: "ui/shadcn-ui" }

// Integrators: Technical compatibility
{ id: "integrations/drizzle-nextjs" }
{ id: "integrations/better-auth-nextjs" }

// Features: Business capabilities
{ id: "features/teams-dashboard/nextjs-shadcn" }
{ id: "features/user-profile/nextjs-shadcn" }
```

## Execution Order

1. **Adapters** (parallel execution)
2. **Integrators** (parallel execution)
3. **Features** (sequential execution)

## Benefits

- **Scalability**: Easy to add new technologies
- **Maintainability**: Clear separation of concerns
- **Flexibility**: Mix and match technologies
- **Consistency**: Standardized patterns across all modules
