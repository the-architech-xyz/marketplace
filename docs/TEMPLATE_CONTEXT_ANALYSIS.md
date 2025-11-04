# Template Context Analysis

## 🔍 **Root Cause Analysis**

### **The Problem**
The CLI fails to build because `template-context.js` is missing, but this is a **symptom**, not the root cause.

### **Current State**

1. **Types Package** (`@thearchitech.xyz/types`):
   - Has `BaseProjectContext` in `project-context.ts` (minimal: `project`, `module`, `framework`, `env`)
   - Has full `ProjectContext` in `agent.ts` (includes: `project`, `module`, `pathHandler`, `modules`, `constitutional`, etc.)
   - Exports both via `export * from './agent.js'`

2. **Marketplace** (`marketplace/types/template-context.ts`):
   - Tries to extend `BaseProjectContext` from `@thearchitech.xyz/types`
   - Adds: `paths`, `importPaths`, `env`, `parameters`, `importPath`
   - **Issue**: `BaseProjectContext` doesn't include fields the CLI actually uses (like `pathHandler`, `modules`, etc.)

3. **CLI Usage** (`Architech/src/core/services/project/framework-context-service.ts`):
   - Creates objects with:
     - `paths` ✅ (added by marketplace)
     - `modules` ✅ (in types package `ProjectContext`)
     - `pathHandler` ✅ (in types package `ProjectContext`)
     - `env` ✅ (added by marketplace, but also in `BaseProjectContext`)
     - `parameters` ✅ (added by marketplace)
     - `importPath` ✅ (added by marketplace)

### **The Real Issue**
The marketplace `ProjectContext` is **extending the wrong base type**. It extends `BaseProjectContext` (minimal) instead of the full `ProjectContext` from `agent.ts`.

---

## ✅ **Proper Solution**

### **Option 1: Remove Marketplace Extension Entirely (RECOMMENDED)**

The types package `ProjectContext` from `agent.ts` already has most fields. We should:

1. **Update `types-package/src/agent.ts`** to include the marketplace-specific fields:
   - `paths?: Record<string, string>`
   - `importPaths?: Record<string, string>`
   - `importPath?: (filePath: string) => string`
   - `parameters?: Record<string, any>` (already covered by `[key: string]: any]` via index signature)

2. **Remove `marketplace/types/template-context.ts`** entirely

3. **Update marketplace exports** to re-export from types package:
   ```typescript
   export type { ProjectContext } from '@thearchitech.xyz/types';
   ```

### **Option 2: Extend the Full ProjectContext**

If we need to keep marketplace-specific extensions:

1. **Marketplace extends the full `ProjectContext`** from `agent.ts`:
   ```typescript
   import type { ProjectContext as BaseProjectContext } from '@thearchitech.xyz/types';
   
   export interface ProjectContext extends BaseProjectContext {
     paths?: Record<string, string>;
     importPaths?: Record<string, string>;
     importPath?: (filePath: string) => string;
   }
   ```

2. **Ensure types package exports `ProjectContext`** properly (it already does via `agent.ts`)

---

## 🤔 **Question: Do We Need Marketplace-Specific Extension?**

Looking at the CLI usage:
- `paths` - CLI-specific, for template path resolution ✅ Needs marketplace extension
- `importPaths` - CLI-specific, pre-computed import paths ✅ Needs marketplace extension  
- `importPath` - CLI-specific helper function ✅ Needs marketplace extension
- `env` - Already in `BaseProjectContext` ❌ No extension needed
- `parameters` - Generic, covered by index signature ❌ No extension needed

**Verdict**: We DO need marketplace extension for `paths`, `importPaths`, and `importPath`.

---

## 📋 **Recommended Fix**

1. **Update marketplace to extend the full `ProjectContext`** from types package (`agent.ts`)
2. **Keep it as a source file** (not generated) since it's a simple type extension
3. **Ensure it compiles correctly** and is exported from `index.ts`

The file should exist as a **source file** in `marketplace/types/`, not generated, because:
- It's a simple type extension
- It's marketplace-specific (CLI template rendering needs)
- It doesn't change based on marketplace modules

---

## 🚀 **Implementation Plan**

1. Update `marketplace/types/template-context.ts` to extend full `ProjectContext` from `agent.ts`
2. Update `types-package/src/agent.ts` if needed to ensure `ProjectContext` is properly exported
3. Ensure marketplace exports this in `index.ts` and `index.d.ts`
4. Rebuild marketplace and CLI
5. Verify all imports work

