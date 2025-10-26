# Auth Tech-Stack Layer

## Architecture Overview

The auth tech-stack layer follows a **standard + override** pattern:

```
tech-stack/auth/
├── standard/              # Generic TanStack Query hooks (Priority: 1)
│   └── templates/
│       ├── hooks.ts.tpl   # fetch-based hooks
│       ├── schemas.ts.tpl # Zod schemas
│       └── stores.ts.tpl  # Zustand stores
└── overrides/             # SDK-specific hooks (Priority: 2)
    └── better-auth/
        └── templates/
            ├── client.ts.tpl  # Better Auth client (framework agnostic)
            └── hooks.ts.tpl   # Better Auth SDK hooks (framework agnostic)
```

## How It Works

### 1. Standard Layer (Priority: 1)
Generic fallback implementation that works with ANY backend:
- **Hooks**: TanStack Query hooks using `fetch()`
- **Schemas**: Zod validation schemas
- **Types**: TypeScript types from contract
- **Stores**: Zustand stores for UI state

### 2. Override Layer (Priority: 2)
SDK-specific implementations that replace standard hooks:
- **Better Auth**: Native SDK hooks (framework agnostic)
- **Clerk**: (future) Clerk SDK hooks
- **Supabase**: (future) Supabase SDK hooks

### 3. Connector Layer (Priority: 3)
Framework-specific wiring (NOT in tech-stack):
- **better-auth-nextjs**: Next.js config, API routes, middleware
- **better-auth-remix**: (future) Remix config, actions, loaders
- **better-auth-expo**: (future) Expo config, SecureStore

## Priority System

```typescript
// Priority: 1 - Standard (fallback)
tech-stack/auth/templates/hooks.ts.tpl

// Priority: 2 - SDK Override (replaces standard)
tech-stack/auth/overrides/better-auth/templates/hooks.ts.tpl

// Priority: 3 - Framework Wiring (Next.js specific)
connectors/auth/better-auth-nextjs/templates/config.ts.tpl
```

**Result:** UI always imports from `@/lib/auth/hooks` and gets the right implementation!

## File Generation Flow

1. **Standard layer generates** (if no override):
   - `@/lib/auth/hooks.ts` (fetch-based)
   - `@/lib/auth/schemas.ts` (Zod)
   - `@/lib/auth/stores.ts` (Zustand)

2. **Override replaces** (if Better Auth selected):
   - `@/lib/auth/hooks.ts` (Better Auth SDK hooks)
   - `@/lib/auth/client.ts` (Better Auth client)

3. **Connector adds** (if Next.js selected):
   - `@/lib/auth/config.ts` (Next.js config)
   - `app/api/auth/[...all]/route.ts` (API route)
   - `src/middleware.ts` (middleware)

## Benefits

### ✅ Framework Agnostic Hooks
Better Auth hooks work in:
- Next.js
- Remix
- Expo
- Any React framework

### ✅ No Duplication
Hooks live in ONE place (tech-stack override), not duplicated in each connector.

### ✅ Easy to Extend
Add new frameworks:
- `better-auth-remix` → Remix config only
- `better-auth-expo` → Expo config only
- Hooks already there!

### ✅ Clean Separation
- **Tech-stack**: Data layer (hooks, types, schemas)
- **Connector**: Framework wiring (config, routes, middleware)

## Usage

### With Standard (Custom Backend)
```typescript
// User selects: No SDK override
// Generated: Standard TanStack Query hooks
import { useAuth } from '@/lib/auth/hooks';

const { user, signIn, signOut } = useAuth();
// Uses fetch-based hooks
```

### With Better Auth (SDK)
```typescript
// User selects: Better Auth override
// Generated: Better Auth SDK hooks
import { useAuth } from '@/lib/auth/hooks';

const { user, signIn, signOut } = useAuth();
// Uses Better Auth SDK hooks (same import!)
```

### With Better Auth + Next.js
```typescript
// User selects: Better Auth + Next.js connector
// Generated: Better Auth hooks + Next.js wiring
import { useAuth } from '@/lib/auth/hooks';

const { user, signIn, signOut } = useAuth();
// Uses Better Auth SDK hooks + Next.js config
```

## Future Extensions

### Adding New SDK Override
```bash
# Create new override
tech-stack/auth/overrides/clerk/
├── override.json
├── blueprint.ts
└── templates/
    ├── client.ts.tpl
    └── hooks.ts.tpl
```

### Adding New Framework Connector
```bash
# Create new connector (reuses hooks from override!)
connectors/auth/better-auth-remix/
├── connector.json
├── blueprint.ts
└── templates/
    ├── config.ts.tpl       # Remix config
    ├── action.ts.tpl       # Remix action
    └── loader.ts.tpl       # Remix loader
```

## Migration Notes

**From old structure:**
- ❌ Hooks in `connectors/auth/better-auth-nextjs/`
- ❌ Duplicated across framework connectors
- ❌ Misleading naming (hooks aren't Next.js specific)

**To new structure:**
- ✅ Hooks in `tech-stack/auth/overrides/better-auth/`
- ✅ Shared across all framework connectors
- ✅ Clear architectural separation


