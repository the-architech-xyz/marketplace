# Fixes Applied - Phase 1 (9 Issues)

**Date:** 2024  
**Status:** In Progress  
**Completed:** 4/9 Critical Issues

---

## ✅ Completed Fixes

### 1. ✅ Missing pnpm-workspace.yaml (Issue #1)

**File Modified:** `Architech/src/core/services/project/structure-initialization-layer.ts`

**Changes:**
- Updated `generateMonorepoToolConfig()` to accept `genome` parameter
- Added package manager detection from genome
- Added pnpm-workspace.yaml generation when package manager is 'pnpm'
- Updated call site to pass genome parameter

**Result:** `pnpm-workspace.yaml` will now be generated automatically when pnpm is specified in genome.

---

### 2. ✅ Empty Package Index Files (Issue #5)

**File Modified:** `Architech/src/core/services/project/structure-initialization-layer.ts`

**Changes:**
- Enhanced `createPackageIndex()` to scan generated files
- Generates proper exports based on files in `src/` directory
- Handles both files and subdirectories
- Falls back to placeholder if no files found yet

**Result:** Package index files will now have proper exports instead of empty stubs.

---

### 3. ✅ Workspace Dependencies in Apps (Issue #6)

**Files Modified:**
- `Architech/src/core/services/project/workspace-reference-builder.ts`
- `Architech/src/core/services/project/structure-initialization-layer.ts`

**Changes:**
- Added `appDependencies` parameter to `buildWorkspaceDependencies()`
- Filters workspace dependencies based on `app.dependencies` from genome
- Updated `determinePackageConfig()` to pass app dependencies when building workspace deps

**Result:** Apps will only get workspace dependencies for packages listed in their `dependencies` array from genome.

---

### 4. ✅ AuthProvider Template (Issue #8)

**File Modified:** `marketplace/connectors/auth/better-auth-nextjs/templates/AuthProvider.tsx.tpl`

**Changes:**
- Replaced template comment with actual React component code
- Uses workspace package import: `@<%= project.name %>/auth/client`
- Proper TypeScript types and JSDoc comments

**Result:** AuthProvider will now generate actual React component code.

---

## 🔄 In Progress / Needs Verification

### 5. 🔄 Database Dependencies (Issue #3)

**Status:** Recipe-book already has dependencies defined. Need to verify they're being used.

**Investigation:**
- `recipe-book.json` has `drizzle-orm`, `postgres`, `drizzle-kit` in database packageStructure
- `PackageJsonGenerator.generatePackageJson()` uses `packageStructure.dependencies`
- `StructureInitializationLayer.initializePackage()` calls PackageJsonGenerator with packageStructure

**Action Needed:** Verify that packageStructure is being retrieved correctly for database package.

---

### 6. 🔄 Dependency Placement (Issue #2 & #10)

**Status:** INSTALL_PACKAGES handler uses `context.targetPackage`, but context might not be set correctly.

**Investigation:**
- `InstallPackagesHandler` checks `context.targetPackage` to determine install location
- If no targetPackage, installs to root (with warning)
- Modules should have `targetPackage` or `targetApps` from recipe book

**Action Needed:** 
- Verify context.targetPackage is set correctly when executing modules
- Check if modules have targetPackage/targetApps in recipe book metadata
- Consider removing INSTALL_PACKAGES from blueprints if recipe-book dependencies are sufficient

---

## 📋 Remaining Issues

### 7. Export Path Mismatches (Issue #7)

**Status:** Blueprint generates `server.ts` and `client.ts` which matches recipe-book exports. Need to verify actual generated files match.

**Action Needed:** Check if there's a version mismatch or if files are being renamed after generation.

---

### 8. Import Paths in Templates (Issue #9)

**Status:** Need to update templates to use workspace package imports.

**Files to Update:**
- `marketplace/features/auth/frontend/templates/*` - Update all import paths
- Other feature templates that use `@/lib/` paths

**Action Needed:** Search and replace `@/lib/auth/*` with `@<%= project.name %>/auth/*` in templates.

---

## Testing Checklist

After fixes are complete, test with `synap-v2.genome.ts`:

- [ ] `pnpm-workspace.yaml` is generated
- [ ] `pnpm install` succeeds
- [ ] Root `package.json` has minimal dependencies
- [ ] `packages/db/package.json` has `drizzle-orm`, `postgres`, `drizzle-kit`
- [ ] `packages/auth/package.json` has `better-auth`
- [ ] `apps/web/package.json` has workspace deps: `@synap/auth`, `@synap/ui`, `@synap/db`
- [ ] `apps/web/package.json` has `react-hook-form`, `zod`, `framer-motion` (if features install them)
- [ ] All `packages/*/src/index.ts` have exports
- [ ] `AuthProvider.tsx` has actual code (not template comment)
- [ ] `npx tsc --noEmit` passes
- [ ] `pnpm build` succeeds

---

## Next Steps

1. **Verify database dependencies** - Check if packageStructure is retrieved correctly
2. **Fix dependency placement** - Ensure context.targetPackage is set correctly
3. **Update import paths** - Search and replace in templates
4. **Test full generation** - Generate project and verify all fixes work

---

## Notes

- Shared package removal (#4) is deferred to later phase
- Some fixes may require CLI changes (dependency placement)
- Template updates can be done incrementally

