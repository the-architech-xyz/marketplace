# 📋 GENOME CONSOLIDATION PLAN

## Analysis of Current Genomes

### ✅ **Keep As-Is (Simple/Infrastructure Only)**
1. **`01-hello-world.genome.ts`** - Simple module-based, should stay simple
2. **`02-simple-app.genome.ts`** - Infrastructure only, module-based is fine
3. **`03-standard-app.genome.ts`** - Already capability-based, empty capabilities (correct)
4. **`04-full-stack-app.genome.ts`** - Already capability-based, empty capabilities (correct)
5. **`use-cases/web3-dapp.genome.ts`** - Empty capabilities (correct - no business capabilities)
6. **`use-cases/blog.genome.ts`** - Empty capabilities (correct - content-focused, no business capabilities)

### 🔄 **Needs Conversion to New Structure**

1. **`use-cases/saas-platform.genome.ts`**
   - **Current:** Uses OLD structure with layer flags (`frontend: true`, `backend: true`)
   - **Action:** Convert to new structure using `adapters`, `frontend.features`, `techStack`
   - **Note:** There's already `starters/saas-platform-capability.genome.ts` with new structure, so this should be updated/consolidated

2. **`use-cases/ai-app.genome.ts`**
   - **Current:** Uses OLD structure with layer flags
   - **Action:** Convert to new structure
   - **Needs:** `ai-chat` capability with proper structure

3. **`use-cases/tamagui-monorepo.genome.ts`**
   - **Current:** Uses OLD structure with layer flags
   - **Action:** Convert to new structure
   - **Needs:** Framework-agnostic providers (`better-auth` not `better-auth-nextjs`)

4. **`use-cases/react-monorepo.genome.ts`**
   - **Action:** Check and convert if needed

5. **`use-cases/expo-monorepo.genome.ts`**
   - **Action:** Check and convert if needed

### ✅ **Already Using New Structure (Needs Fixes)**

1. **`starters/saas-platform-capability.genome.ts`**
   - **Status:** ✅ Already using new structure
   - **Issues:** 
     - `provider: 'sentry-nextjs'` should be `provider: 'sentry'` (framework-agnostic)
   - **Action:** Fix provider names

2. **`starters/tamagui-monorepo-capability.genome.ts`**
   - **Status:** ✅ Already using new structure
   - **Issues:**
     - `provider: 'better-auth-nextjs'` should be `provider: 'better-auth'`
     - `provider: 'stripe-nextjs'` should be `provider: 'stripe'`
   - **Action:** Fix provider names

---

## Conversion Patterns

### OLD Structure → NEW Structure

**OLD:**
```typescript
auth: {
  provider: 'better-auth-nextjs',
  frontend: true,
  backend: true,
  techStack: true,
  database: true
}
```

**NEW:**
```typescript
auth: {
  provider: 'better-auth',  // Framework-agnostic
  adapter: {
    // Parameters from adapter.json
    oauthProviders: ['google', 'github'],
    twoFactor: true,
    organizations: true
  },
  frontend: {
    features: {
      signIn: true,
      signUp: true,
      twoFactor: true
    }
  },
  techStack: {
    hasTypes: true,
    hasSchemas: true,
    hasHooks: true,
    hasStores: true
  }
  // No layer flags - layers added automatically
}
```

---

## Action Plan

1. **Fix already-converted genomes** (provider names)
2. **Convert saas-platform.genome.ts** (merge with saas-platform-capability or update)
3. **Convert ai-app.genome.ts**
4. **Convert tamagui-monorepo.genome.ts**
5. **Check and convert monorepo genomes** (react, expo)

