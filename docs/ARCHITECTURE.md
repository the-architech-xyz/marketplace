# Architech 3-Layer Architecture

## Overview

Architech uses a **3-layer architecture** to keep features modular, technology-agnostic, and maintainable. This document explains how each layer works and the rules for building marketplace features.

---

## The 3 Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTRACT LAYER                            │
│  (Types, Interfaces - Single Source of Truth)               │
└─────────────────────────────────────────────────────────────┘
                               │
            ┌──────────────────┼──────────────────┐
            │                  │                  │
            ▼                  ▼                  ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  BACKEND LAYER   │  │ TECH-STACK LAYER │  │ FRONTEND LAYER   │
│                  │  │                  │  │                  │
│  HTTP API        │◄─┤  Hooks + Schemas │─►│  UI Components   │
│  Endpoints       │  │  (Bridge Layer)  │  │                  │
│                  │  │                  │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
         │                     │                      │
         ▼                     ▼                      ▼
    Deploys to:          Deploys to:            Deploys to:
 src/app/api/[feature]/  src/lib/[feature]/   src/components/[feature]/
```

---

## Layer 1: Contract

**Location:** `marketplace/features/[feature]/contract.ts`

**Purpose:** Define types and interfaces - the single source of truth for data structures

**What it contains:**
- TypeScript interfaces
- Type definitions
- Constants
- NO runtime code (no Zod, no functions)

**Example:**
```typescript
// features/teams-management/contract.ts

export interface Team {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  memberCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTeamInput {
  name: string;
  description?: string;
}

export interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: Date;
}
```

**Rules:**
- ✅ Pure TypeScript types and interfaces only
- ✅ Can export constants and enums
- ❌ NO Zod schemas (those go in tech-stack)
- ❌ NO functions or classes
- ❌ NO runtime validation code

---

## Layer 2: Backend

**Location:** `marketplace/features/[feature]/backend/[adapter]/`

**Purpose:** Provide HTTP API endpoints for data operations

**What it deploys:**
- API routes → `src/app/api/[feature]/route.ts`
- Database operations
- Authentication checks
- Business logic

**Example:**
```typescript
// backend/better-auth-nextjs/templates/api-teams-route.ts.tpl
// Deploys to: src/app/api/teams/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { CreateTeamSchema } from '@/lib/teams-management'; // ✅ Import from tech-stack!

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const teams = await db.teams.findMany({ where: { ownerId: session.user.id } });
  return NextResponse.json(teams);
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const body = await request.json();
  
  // ✅ Validate using shared schema from tech-stack
  const validatedData = CreateTeamSchema.parse(body);
  
  const team = await db.teams.create({ data: validatedData });
  return NextResponse.json(team, { status: 201 });
}
```

**Rules:**
- ✅ Create HTTP API endpoints (GET, POST, PUT, DELETE)
- ✅ Import and use schemas from tech-stack (`@/lib/[feature]`)
- ✅ Handle database operations
- ✅ Implement business logic
- ✅ Perform authentication/authorization
- ❌ NEVER export functions for other layers to import
- ❌ Backend files are HTTP endpoints, not libraries!
- ❌ NO direct imports from frontend layer

**Key Point:** Backend communicates via HTTP, not file imports!

---

## Layer 3: Tech-Stack

**Location:** `marketplace/features/[feature]/tech-stack/`

**Purpose:** Bridge between HTTP APIs and UI components - the "glue layer"

**What it deploys to `src/lib/[feature]/`:**
- `types.ts` - Re-exported from contract
- `schemas.ts` - Zod validation schemas (shared with backend!)
- `hooks.ts` - React Query hooks that call APIs
- `stores.ts` - Zustand stores for UI state
- `index.ts` - Centralized exports

**Example:**
```typescript
// tech-stack/templates/schemas.ts.tpl
// Deploys to: src/lib/teams-management/schemas.ts

import { z } from 'zod';

export const CreateTeamSchema = z.object({
  name: z.string().min(3, "Team name must be at least 3 characters"),
  description: z.string().optional(),
});

export const TeamSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  ownerId: z.string(),
  memberCount: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

// tech-stack/templates/hooks.ts.tpl
// Deploys to: src/lib/teams-management/hooks.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useTeamsList = (filters?) => {
  return useQuery({
    queryKey: ['teams', filters],
    queryFn: async () => {
      // ✅ Call API via fetch, NO backend imports!
      const res = await fetch('/api/teams');
      if (!res.ok) throw new Error('Failed to fetch teams');
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useTeamsCreate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to create team');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    }
  });
};

// tech-stack/templates/stores.ts.tpl
// Deploys to: src/lib/teams-management/stores.ts

import { create } from 'zustand';

export const useTeamsUIStore = create((set) => ({
  selectedTeamId: null,
  isCreateDialogOpen: false,
  setSelectedTeamId: (id) => set({ selectedTeamId: id }),
  openCreateDialog: () => set({ isCreateDialogOpen: true }),
  closeCreateDialog: () => set({ isCreateDialogOpen: false }),
}));
```

**Rules:**
- ✅ Hooks call APIs via `fetch()` - NO backend imports!
- ✅ Export Zod schemas that backend imports
- ✅ Re-export types from contract
- ✅ Create Zustand stores for UI state only
- ✅ Use TanStack Query for server data
- ❌ NEVER import from backend files
- ❌ NEVER import from frontend files
- ❌ Stores are for UI state, NOT server data

**Key Point:** Tech-stack is self-contained and communicates via HTTP!

---

## Layer 4: Frontend

**Location:** `marketplace/features/[feature]/frontend/[adapter]/`

**Purpose:** UI components that present data to users

**What it deploys:**
- Components → `src/components/[feature]/`
- Pages → `src/app/[feature]/`
- Forms, tables, modals, etc.

**Example:**
```typescript
// frontend/shadcn/templates/CreateTeamForm.tsx.tpl
// Deploys to: src/components/teams/CreateTeamForm.tsx

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTeamSchema, useTeamsCreate } from '@/lib/teams-management'; // ✅ Import from tech-stack!
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function CreateTeamForm() {
  const createTeam = useTeamsCreate();
  
  const form = useForm({
    resolver: zodResolver(CreateTeamSchema), // ✅ Same schema as backend validation!
  });
  
  const onSubmit = async (data) => {
    try {
      await createTeam.mutateAsync(data);
      form.reset();
    } catch (error) {
      console.error('Failed to create team:', error);
    }
  };
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input {...form.register('name')} placeholder="Team name" />
      <Input {...form.register('description')} placeholder="Description (optional)" />
      <Button type="submit" disabled={createTeam.isPending}>
        {createTeam.isPending ? 'Creating...' : 'Create Team'}
      </Button>
    </form>
  );
}
```

**Rules:**
- ✅ Import hooks and schemas from tech-stack (`@/lib/[feature]`)
- ✅ Import types from tech-stack
- ✅ Focus on UI/UX
- ❌ NEVER import from backend
- ❌ NEVER call APIs directly - use tech-stack hooks
- ❌ NO business logic in components

---

## Why This Architecture?

### 1. Technology Agnostic
- **Backend** can be swapped: Next.js → Express → FastAPI → Rails
- **Frontend** can be swapped: React → Vue → Svelte → Angular
- **Tech-stack** adapts to whatever you choose
- Layers communicate via HTTP, not file imports

### 2. True Modularity
```
React + Next.js API Routes ✅
React + External REST API ✅  (skip backend layer)
Vue + Next.js API Routes ✅   (swap frontend layer)
React + GraphQL API ✅        (different backend adapter)
React + tRPC ✅               (different backend adapter)
```

### 3. No File Coupling
- Backend and frontend can live in separate repos
- Backend doesn't "know" what frontend framework you use
- Frontend doesn't "know" what backend technology you use
- Perfect for microservices architecture

### 4. Single Source of Truth
```
Tech-Stack Schemas
        ↓
┌───────┴────────┐
│                │
Backend      Frontend
validates    validates
with same    with same
schema       schema
```

### 5. Type Safety Everywhere
```typescript
// Backend validates with Zod
const data = CreateTeamSchema.parse(body); // Runtime validation

// Frontend validates with Zod
const form = useForm({ resolver: zodResolver(CreateTeamSchema) }); // Form validation

// TypeScript knows the types
type TeamInput = z.infer<typeof CreateTeamSchema>; // Type inference
```

---

## Communication Flow

```
User Action (Frontend)
        │
        ▼
    Hook Call (Tech-Stack)
        │
        ▼
    HTTP Request (fetch)
        │
        ▼
    API Route (Backend)
        │
        ▼
    Validate with Schema (from Tech-Stack)
        │
        ▼
    Database Operation
        │
        ▼
    HTTP Response
        │
        ▼
    Hook Updates (Tech-Stack)
        │
        ▼
    Component Re-renders (Frontend)
```

**Key Point:** Every layer communicates via well-defined interfaces (HTTP, schemas, types). NO direct file imports between layers!

---

## Quick Reference

| Layer | Location | Deploys To | Imports From | Exports To |
|-------|----------|------------|--------------|------------|
| Contract | `features/[feature]/contract.ts` | N/A | Nothing | All layers |
| Backend | `features/[feature]/backend/[adapter]/` | `src/app/api/` | Tech-Stack | HTTP only |
| Tech-Stack | `features/[feature]/tech-stack/` | `src/lib/[feature]/` | Contract | Backend + Frontend |
| Frontend | `features/[feature]/frontend/[adapter]/` | `src/components/`, `src/app/` | Tech-Stack | Nothing |

---

## Common Mistakes to Avoid

### ❌ DON'T: Import from Backend
```typescript
// ❌ WRONG
import { createTeam } from '@/features/teams/backend/api';
```

### ✅ DO: Call API via Fetch
```typescript
// ✅ CORRECT
const res = await fetch('/api/teams', { method: 'POST', body: JSON.stringify(data) });
```

### ❌ DON'T: Duplicate Schemas
```typescript
// ❌ WRONG - Schema in backend
const backendSchema = z.object({ name: z.string() });

// ❌ WRONG - Same schema in frontend
const frontendSchema = z.object({ name: z.string() });
```

### ✅ DO: Share Schemas via Tech-Stack
```typescript
// ✅ CORRECT - Schema in tech-stack
// src/lib/teams/schemas.ts
export const CreateTeamSchema = z.object({ name: z.string() });

// Backend imports it
import { CreateTeamSchema } from '@/lib/teams';

// Frontend imports it
import { CreateTeamSchema } from '@/lib/teams';
```

---

## Future Adapters

This architecture makes it easy to add new adapters:

### Backend Adapters (Future)
- `backend/trpc-nextjs/` - tRPC for type-safe APIs
- `backend/graphql-apollo/` - GraphQL APIs
- `backend/express-rest/` - Express.js REST APIs
- `backend/nextjs-server-actions/` - Next.js 14+ Server Actions

### Frontend Adapters (Future)
- `frontend/vue-3/` - Vue 3 components
- `frontend/svelte/` - Svelte components
- `frontend/angular/` - Angular components

The tech-stack layer remains the same - it's the glue!

---

## Contributing

When creating or modifying features:

1. ✅ Define types in `contract.ts`
2. ✅ Create schemas in `tech-stack/templates/schemas.ts.tpl`
3. ✅ Create hooks in `tech-stack/templates/hooks.ts.tpl` (using `fetch`)
4. ✅ Backend imports schemas from `@/lib/[feature]`
5. ✅ Frontend imports from `@/lib/[feature]`
6. ✅ NO cross-layer file imports (except tech-stack!)

**Remember:** HTTP is the contract between layers!

---

## Questions?

- **"Can frontend import from backend?"** NO. Use tech-stack hooks.
- **"Can backend export functions?"** NO. Backend is HTTP endpoints only.
- **"Where do schemas go?"** Tech-stack! Both backend and frontend import them.
- **"Can I use tRPC?"** Yes! Create a `backend/trpc-[adapter]/` adapter.
- **"What about Server Actions?"** Yes! Create a `backend/nextjs-server-actions/` adapter.

**The rule:** Layers communicate via HTTP (or tRPC/GraphQL), never via file imports!


