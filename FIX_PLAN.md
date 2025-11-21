# Marketplace Fix Plan - Synap V2 Generation Issues

**Date:** 2024  
**Status:** Pending Approval  
**Estimated Time:** 5-6 hours

---

## Executive Summary

This plan addresses 10 critical/medium issues preventing proper V2 monorepo generation. All fixes target the **marketplace modules and CLI** (not the generated project), ensuring future generations work correctly.

---

## Issue Analysis & Root Causes

### 🔴 CRITICAL Issues

#### 1. Missing pnpm-workspace.yaml

**Root Cause:** `ProjectManager.generatePnpmWorkspaceConfig()` exists but is never called.

**Location:** `Architech/src/core/services/project/project-manager.ts:231`

**Fix:** Call `generatePnpmWorkspaceConfig()` when package manager is pnpm in monorepo initialization.

**Files to Modify:**
- `Architech/src/core/services/project/structure-initialization-layer.ts` - Add call in monorepo initialization
- OR `Architech/src/core/services/project/project-manager.ts` - Ensure it's called from initialization flow

---

#### 2. Incorrect Dependency Placement

**Root Cause:** `INSTALL_PACKAGES` actions in blueprints don't specify target location. CLI installs all packages to root instead of packages/apps.

**Evidence:**
- `features/auth/frontend/blueprint.ts:59` - Installs packages but no target specified
- `adapters/database/drizzle/blueprint.ts:64-83` - Installs packages but no target specified
- Root package.json has `better-auth`, `react-hook-form`, etc. (should be in packages/apps)

**Fix:** CLI must route `INSTALL_PACKAGES` actions to correct target based on:
- Module's `targetPackage` (from recipe book)
- Module's `targetApps` (from recipe book)
- If no target, use module's package/app context

**Files to Modify:**
- `Architech/src/core/services/action-executor/action-executor.ts` (or equivalent) - Route INSTALL_PACKAGES to correct package.json
- OR enhance `DependencyResolverService` to handle INSTALL_PACKAGES actions

---

#### 3. Missing Database Dependencies

**Root Cause:** Drizzle blueprint uses `INSTALL_PACKAGES` but dependencies aren't being added to `packages/db/package.json`.

**Evidence:**
- `adapters/database/drizzle/blueprint.ts:64-83` - Has INSTALL_PACKAGES for drizzle-orm, postgres
- Generated `packages/db/package.json` has empty dependencies
- Recipe-book has dependencies but they're not being used

**Fix Options:**
1. **Preferred:** Use recipe-book `packageStructure.dependencies` instead of INSTALL_PACKAGES
2. **Alternative:** Ensure INSTALL_PACKAGES actions target the correct package.json

**Files to Modify:**
- `marketplace/recipe-book.json:124-143` - Already has dependencies, verify they're used
- `Architech/src/core/services/project/package-json-generator.ts` - Ensure recipe-book dependencies are included
- OR `adapters/database/drizzle/blueprint.ts` - Remove INSTALL_PACKAGES, rely on recipe-book

---

#### 4. Unauthorized Shared Package

**Root Cause:** Many blueprints still use `packages.shared.*` path keys (legacy V1 pattern).

**Evidence:**
- `features/auth/frontend/blueprint.ts:172` - Uses `packages.shared.src` for auth-utils
- `path-keys.json:322-402` - Still defines `packages.shared.*` keys
- 280+ references to `packages.shared` in marketplace

**Fix:** Update all blueprints to use specific package paths:
- Auth utils → `packages.auth.src.utils`
- AI chat → `packages.ai-chat.src` (if exists) or appropriate package
- Payment → `packages.payments.src`

**Files to Modify:**
- `marketplace/features/auth/frontend/blueprint.ts:172` - Change to `packages.auth.src.utils`
- `marketplace/features/ai-chat/frontend/blueprint.ts` - Update all shared paths
- `marketplace/features/payments/backend/stripe-nextjs/blueprint.ts` - Update all shared paths
- All other blueprints using `packages.shared.*`

**Note:** This is a large refactor. Consider:
1. Create migration script to update all blueprints
2. Or deprecate `packages.shared.*` and update incrementally

---

#### 5. Empty Package Index Files

**Root Cause:** `StructureInitializationLayer.createPackageIndex()` generates empty stubs.

**Evidence:**
- `Architech/src/core/services/project/structure-initialization-layer.ts:971-990` - Creates `export {};`
- Generated packages have empty index.ts files

**Fix:** Populate index.ts with exports based on generated files:
- Scan package directory for generated files
- Generate exports: `export * from './better-auth';` etc.
- OR use blueprint actions to generate index.ts content

**Files to Modify:**
- `Architech/src/core/services/project/structure-initialization-layer.ts:971-990` - Generate proper exports
- OR add index.ts generation to adapter blueprints

---

#### 6. Missing Workspace Dependencies in Apps

**Root Cause:** `WorkspaceReferenceBuilder.buildWorkspaceDependencies()` adds ALL packages to apps, not just those in `app.dependencies` from genome.

**Evidence:**
- `Architech/src/core/services/project/workspace-reference-builder.ts:27-88` - Adds all packages
- `Architech/src/core/services/project/structure-initialization-layer.ts:1147-1178` - Uses `resolveAppDependenciesToWorkspaceRefs` but may not be called correctly

**Fix:** Filter workspace dependencies based on `app.dependencies` from genome:
- Only add packages listed in `app.dependencies`
- Use `resolveAppDependenciesToWorkspaceRefs` correctly

**Files to Modify:**
- `Architech/src/core/services/project/structure-initialization-layer.ts:1147-1178` - Ensure it's called for apps
- Verify `determinePackageConfig()` calls `resolveAppDependenciesToWorkspaceRefs` for apps

---

### 🟡 MEDIUM Issues

#### 7. Export Path Mismatches

**Root Cause:** Recipe-book exports don't match actual generated file names.

**Evidence:**
- `recipe-book.json:17-21` - Exports reference `./src/client.ts`, `./src/server.ts`
- Generated files: `better-auth-client.ts`, `better-auth.ts`
- `adapters/auth/better-auth/blueprint.ts:79-97` - Generates `server.ts` and `client.ts` (correct)

**Fix Options:**
1. **Preferred:** Update blueprint to match recipe-book exports (rename files)
2. **Alternative:** Update recipe-book exports to match generated files

**Files to Modify:**
- `marketplace/adapters/auth/better-auth/blueprint.ts:79-97` - Already generates correct names, verify
- OR `marketplace/recipe-book.json:17-21` - Update exports to match actual files

**Note:** Check if blueprint actually generates `server.ts`/`client.ts` or `better-auth.ts`/`better-auth-client.ts`

---

#### 8. Template File Not Generated (AuthProvider)

**Root Cause:** `connectors/auth/better-auth-nextjs/templates/AuthProvider.tsx.tpl` is just a comment.

**Evidence:**
- Template file contains: `# AuthProvider.tsx - Generated template`
- Generated file is empty stub

**Fix:** Generate actual React component code.

**Files to Modify:**
- `marketplace/connectors/auth/better-auth-nextjs/templates/AuthProvider.tsx.tpl` - Add actual component code

---

#### 9. Incorrect Import Paths in Generated Code

**Root Cause:** Generated code uses `@/lib/auth/client` instead of `@synap/auth/client`.

**Evidence:**
- Generated `apps/web/src/components/auth/AuthForm.tsx` uses wrong imports
- Should use workspace package imports: `@synap/auth/client`

**Fix:** Update templates to use workspace package imports:
- Replace `@/lib/auth/*` with `@{projectName}/auth/*`
- Use template variables for project name

**Files to Modify:**
- `marketplace/features/auth/frontend/templates/*` - Update all import paths
- OR check if templates use correct path variables

---

#### 10. Missing App Dependencies

**Root Cause:** Features install packages via `INSTALL_PACKAGES` but they're not added to app package.json.

**Evidence:**
- `features/auth/frontend/blueprint.ts:59-69` - Installs react-hook-form, zod, etc.
- Generated `apps/web/package.json` missing these dependencies

**Fix:** Route `INSTALL_PACKAGES` from features to correct app package.json.

**Files to Modify:**
- Same as Issue #2 - Fix INSTALL_PACKAGES routing

---

## Implementation Plan

### Phase 1: Critical Infrastructure (2 hours)

1. **Fix pnpm-workspace.yaml generation** (30 min)
   - Add call to `generatePnpmWorkspaceConfig()` in monorepo initialization
   - Test with pnpm package manager

2. **Fix dependency placement** (1 hour)
   - Update action executor to route INSTALL_PACKAGES to correct target
   - Test with auth and database packages

3. **Fix database dependencies** (15 min)
   - Verify recipe-book dependencies are used
   - OR ensure INSTALL_PACKAGES targets correct package

4. **Fix workspace dependencies in apps** (15 min)
   - Ensure `resolveAppDependenciesToWorkspaceRefs` is called correctly
   - Filter based on `app.dependencies` from genome

### Phase 2: Package Structure (1.5 hours)

5. **Fix empty index files** (30 min)
   - Update `createPackageIndex()` to generate proper exports
   - OR add index.ts generation to blueprints

6. **Fix export path mismatches** (15 min)
   - Verify blueprint generates correct file names
   - Update recipe-book exports if needed

7. **Remove shared package references** (45 min)
   - Update `features/auth/frontend/blueprint.ts` to use `packages.auth.src.utils`
   - Create migration plan for other blueprints (can be done incrementally)

### Phase 3: Template & Code Generation (1.5 hours)

8. **Fix AuthProvider template** (30 min)
   - Generate actual React component code in template

9. **Fix import paths** (30 min)
   - Update templates to use workspace package imports
   - Use `@{projectName}/auth/*` instead of `@/lib/auth/*`

10. **Verify app dependencies** (30 min)
    - Test that feature-installed packages appear in app package.json

### Phase 4: Testing & Validation (1 hour)

11. **Integration testing**
    - Generate test project with synap-v2.genome.ts
    - Verify `pnpm install` works
    - Verify `tsc --noEmit` passes
    - Verify `pnpm build` succeeds
    - Verify no `packages/shared` directory

---

## Detailed File Changes

### 1. pnpm-workspace.yaml Generation

**File:** `Architech/src/core/services/project/structure-initialization-layer.ts`

**Location:** In monorepo initialization method

**Change:**
```typescript
// After generating monorepo structure, add:
if (packageManager === 'pnpm') {
  await this.generatePnpmWorkspaceConfig(monorepoConfig);
}
```

**OR**

**File:** `Architech/src/core/services/project/project-manager.ts`

**Change:** Ensure `generatePnpmWorkspaceConfig()` is called from initialization flow

---

### 2. Dependency Placement

**File:** `Architech/src/core/services/action-executor/action-executor.ts` (or equivalent)

**Change:** Route `INSTALL_PACKAGES` actions based on module target:
```typescript
// When processing INSTALL_PACKAGES action:
const targetPackage = module.targetPackage; // from recipe book
const targetApps = module.targetApps; // from recipe book

if (targetPackage) {
  // Add to packages/{targetPackage}/package.json
} else if (targetApps && targetApps.length > 0) {
  // Add to apps/{targetApp}/package.json for each targetApp
} else {
  // Add to root (only if no target specified)
}
```

---

### 3. Database Dependencies

**File:** `Architech/src/core/services/project/package-json-generator.ts`

**Change:** Ensure recipe-book `packageStructure.dependencies` are included:
```typescript
dependencies: {
  ...(packageStructure.dependencies || {}),  // From recipe-book
  ...(resolvedDependencies?.runtime || {}), // From modules
}
```

**OR**

**File:** `marketplace/adapters/database/drizzle/blueprint.ts`

**Change:** Remove INSTALL_PACKAGES, rely on recipe-book dependencies

---

### 4. Shared Package Removal

**File:** `marketplace/features/auth/frontend/blueprint.ts:172`

**Change:**
```typescript
// OLD:
path: '${paths.packages.shared.src}utils/auth-utils.ts',

// NEW:
path: '${paths.packages.auth.src}utils/auth-utils.ts',
```

**Note:** This is a large refactor. Consider creating a migration script.

---

### 5. Index Files

**File:** `Architech/src/core/services/project/structure-initialization-layer.ts:971-990`

**Change:**
```typescript
private async createPackageIndex(
  packageName: string,
  fullPath: string,
  capabilities: Record<string, any>,
  modules: any[]
): Promise<void> {
  // Scan generated files in package
  const srcPath = path.join(fullPath, 'src');
  const files = await fs.readdir(srcPath);
  
  // Generate exports based on files
  const exports: string[] = [];
  for (const file of files) {
    if (file.endsWith('.ts') && file !== 'index.ts') {
      const baseName = file.replace('.ts', '');
      exports.push(`export * from './${baseName}';`);
    }
  }
  
  const indexContent = `/**
 * ${packageName} package
 * 
 * ${this.getPackagePurpose(packageName, capabilities, modules)}
 */

${exports.join('\n')}
`;
  
  await fs.writeFile(
    path.join(srcPath, 'index.ts'),
    indexContent
  );
}
```

---

### 6. Workspace Dependencies

**File:** `Architech/src/core/services/project/structure-initialization-layer.ts:871-966`

**Change:** Ensure `resolveAppDependenciesToWorkspaceRefs` is called for apps:
```typescript
if (isApp) {
  // Get app dependencies from genome
  const appConfig = apps.find((app: any) => (app.id || app.type) === packageName);
  const appDeps = appConfig?.dependencies || [];
  
  const appWorkspaceDeps = this.resolveAppDependenciesToWorkspaceRefs(
    appDeps,
    genome,
    packagePath,
    packageManager
  );
  Object.assign(workspaceDeps, appWorkspaceDeps);
}
```

---

### 7. Export Paths

**File:** `marketplace/adapters/auth/better-auth/blueprint.ts`

**Verify:** Files are generated as `server.ts` and `client.ts` (not `better-auth.ts`)

**OR**

**File:** `marketplace/recipe-book.json:17-21`

**Change:** Update exports to match actual file names

---

### 8. AuthProvider Template

**File:** `marketplace/connectors/auth/better-auth-nextjs/templates/AuthProvider.tsx.tpl`

**Change:** Add actual component code:
```typescript
'use client';

import { SessionProvider } from '@synap/auth/client';
import type { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
```

---

### 9. Import Paths

**File:** `marketplace/features/auth/frontend/templates/*` (all auth templates)

**Change:** Update imports to use workspace packages:
```typescript
// OLD:
import { authClient } from '@/lib/auth/client';

// NEW:
import { authClient } from '@<%= project.name %>/auth/client';
```

---

### 10. App Dependencies

**Same as Issue #2** - Fix INSTALL_PACKAGES routing

---

## Testing Checklist

After all fixes:

- [ ] Generate project with `synap-v2.genome.ts`
- [ ] Verify `pnpm-workspace.yaml` exists
- [ ] Run `pnpm install` - should succeed
- [ ] Verify root `package.json` has minimal dependencies (only turbo)
- [ ] Verify `packages/auth/package.json` has `better-auth`
- [ ] Verify `packages/db/package.json` has `drizzle-orm`, `postgres`
- [ ] Verify `apps/web/package.json` has workspace deps: `@synap/auth`, `@synap/ui`, `@synap/db`
- [ ] Verify `apps/web/package.json` has `react-hook-form`, `zod`, `framer-motion`
- [ ] Verify no `packages/shared` directory
- [ ] Verify all `packages/*/src/index.ts` have exports
- [ ] Run `npx tsc --noEmit` - should pass with 0 errors
- [ ] Run `pnpm build` - should succeed
- [ ] Verify `AuthProvider.tsx` has actual code (not template comment)

---

## Risk Assessment

**High Risk:**
- Shared package removal (affects 280+ files) - Do incrementally
- Dependency placement (affects all blueprints) - Test thoroughly

**Medium Risk:**
- Index file generation - May need to handle edge cases
- Import path updates - Need to verify all templates

**Low Risk:**
- pnpm-workspace.yaml - Simple addition
- AuthProvider template - Single file
- Export paths - Verification only

---

## Approval Required

Please review this plan and approve before implementation. Key decisions:

1. **Shared Package Removal:** Do incrementally or all at once?
2. **Dependency Placement:** Use action executor or enhance DependencyResolverService?
3. **Index Files:** Generate in CLI or add to blueprints?

---

**Next Steps:** Wait for approval, then proceed with implementation in phases.

