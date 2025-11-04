# Marketplace Path Resolution Layer - Complete State Audit

## Executive Summary

The marketplace path resolution system has **multiple overlapping services** with **inconsistent access patterns**, **duplication**, and **missing integration** with the context system. This audit identifies all components, their responsibilities, flaws, and proposes a consolidation strategy.

---

## Current State: Components & Responsibilities

### 1. MarketplaceRegistry (Primary Path Storage)

**Location**: `Architech/src/core/services/marketplace/marketplace-registry.ts`

**Purpose**: 
- Centralized static registry for marketplace path discovery and caching
- Handles dev vs prod environment detection
- Supports CLI flag overrides

**Capabilities**:
- ✅ Resolves core marketplace path (features, adapters, connectors)
- ✅ Resolves UI marketplace paths (shadcn, tamagui, etc.)
- ✅ Static caching (lazy-loaded, cached after first access)
- ✅ Async resolution with fallback logic
- ✅ Override support via `setMarketplacePath()`

**Storage**:
```typescript
private static corePath: string | null = null;
private static uiPaths: Map<string, string> = new Map();
private static overrides: Map<string, string> = new Map();
```

**API**:
- `getCoreMarketplacePath(): Promise<string>`
- `getUIMarketplacePath(framework: string): Promise<string>`
- `setMarketplacePath(name: string, path: string): void`
- `marketplaceExists(name: string): Promise<boolean>`
- `getAvailableUIMarketplaces(): Promise<string[]>`

**Used By**:
- `new.ts` (for genome transformer)
- `ui-marketplace-resolver.ts` (for UI marketplace access)
- `create-file-from-ui-handler.ts` (for UI template loading)

---

### 2. PathService.getMarketplaceRoot() (Duplicated Core Path)

**Location**: `Architech/src/core/services/path/path-service.ts`

**Purpose**: 
- Static method to get core marketplace root path
- **DUPLICATES** `MarketplaceRegistry.getCoreMarketplacePath()`

**Capabilities**:
- ✅ Resolves core marketplace path (dev vs prod)
- ✅ Static caching (`private static marketplaceRoot`)
- ❌ **Only handles core marketplace** (no UI marketplace support)
- ❌ **Different implementation** than MarketplaceRegistry (inconsistency)

**Storage**:
```typescript
private static marketplaceRoot: string | null = null;
```

**API**:
- `getMarketplaceRoot(): Promise<string>` (static)

**Used By**:
- `MarketplaceService` (all template/config loading)
- `DumbPathTranslator` (module ID resolution)
- `LocalMarketplaceStrategy` (genome resolution)
- `DynamicConnectorResolver`
- `FeatureModuleResolver`
- `list-genomes.ts` command

**Problem**: This is a **duplicate** of `MarketplaceRegistry.getCoreMarketplacePath()` with slightly different implementation!

---

### 3. MarketplaceService (Template/Config Loading)

**Location**: `Architech/src/core/services/marketplace/marketplace-service.ts`

**Purpose**: 
- Load templates from marketplace
- Load module configurations (adapter.json, feature.json, etc.)
- Load blueprints

**Capabilities**:
- ✅ Loads templates (checks absolute vs relative paths)
- ✅ Loads module configs
- ✅ Loads blueprints
- ✅ Error handling with suggestions
- ❌ **Uses PathService.getMarketplaceRoot()** (not MarketplaceRegistry)
- ❌ **No UI marketplace support** (only handles absolute paths)

**Template Loading Logic**:
```typescript
// If absolute path → assume UI marketplace (no validation)
if (path.isAbsolute(templateFile)) {
  return await fs.readFile(templateFile, 'utf-8');
}

// If relative → resolve from core marketplace
const marketplaceRoot = await PathService.getMarketplaceRoot();
const templatePath = path.join(marketplaceRoot, resolvedModuleId, 'templates', templateFile);
```

**Used By**:
- `CreateFileHandler` (via `loadTemplate()`)
- Various module loaders

---

### 4. EnhancedMarketplaceService (Unused Extension)

**Location**: `Architech/src/core/services/marketplace/enhanced-marketplace-service.ts`

**Purpose**: 
- Extends `MarketplaceService` to handle both core and UI marketplaces
- Provides unified interface

**Capabilities**:
- ✅ Extends MarketplaceService
- ✅ Wraps `UIMarketplaceResolver`
- ✅ Provides unified interface
- ❌ **NOT USED ANYWHERE** in the codebase
- ❌ Has hardcoded path logic that doesn't match reality

**Problem**: This service exists but is **never instantiated or used**!

---

### 5. UIMarketplaceResolver (UI-Specific Logic)

**Location**: `Architech/src/core/services/marketplace/ui-marketplace-resolver.ts`

**Purpose**: 
- Loads UI marketplace manifests
- Detects appropriate UI marketplace for project
- Validates required UI components exist
- Enhances context with UI component paths

**Capabilities**:
- ✅ Loads UI marketplace manifests
- ✅ Auto-detects UI framework
- ✅ Validates blueprints against UI marketplace
- ✅ Resolves UI component paths
- ✅ Uses `MarketplaceRegistry.getUIMarketplacePath()`

**Used By**:
- `OrchestratorAgent` (but usage was removed in recent refactor)
- `EnhancedMarketplaceService` (but that service is unused)

---

### 6. PathService.pathMap (Framework Path Variables)

**Location**: `Architech/src/core/services/path/path-service.ts`

**Purpose**: 
- Stores framework-specific path mappings (e.g., `src`, `app`, `components`)
- Resolves `${paths.key}` variables in templates

**Capabilities**:
- ✅ Stores framework paths from adapter config
- ✅ Resolves `${paths.key}` variables
- ✅ Supports legacy `{{paths.key}}` syntax
- ❌ **Does NOT store marketplace paths** (only framework paths)

**Storage**:
```typescript
private pathMap: Record<string, string> = {};
```

**API**:
- `setFrameworkPaths(paths: Record<string, string>): void`
- `mergeFrameworkPaths(paths: Record<string, string>): void`
- `getPath(key: string): string`
- `resolveTemplate(template: string): string`

**Used By**:
- `TemplateService` (for path variable resolution)
- All blueprint templates (via `${paths.key}`)

---

## Current State: Access Patterns

### Pattern A: Direct MarketplaceRegistry Access
```typescript
// Used in: new.ts, ui-marketplace-resolver.ts, create-file-from-ui-handler.ts
const corePath = await MarketplaceRegistry.getCoreMarketplacePath();
const uiPath = await MarketplaceRegistry.getUIMarketplacePath('shadcn');
```
**Count**: 5 usages

### Pattern B: PathService.getMarketplaceRoot()
```typescript
// Used in: MarketplaceService, DumbPathTranslator, LocalMarketplaceStrategy, etc.
const marketplaceRoot = await PathService.getMarketplaceRoot();
```
**Count**: 17 usages

### Pattern C: Absolute Path Detection (MarketplaceService)
```typescript
// In MarketplaceService.loadTemplate()
if (path.isAbsolute(templateFile)) {
  // Assume UI marketplace, no validation
  return await fs.readFile(templateFile, 'utf-8');
}
```
**Count**: 1 usage (but affects all template loading)

---

## Critical Flaws

### 🔴 Flaw 1: Duplication of Core Path Resolution

**Problem**: Two different methods resolve the same core marketplace path:
- `MarketplaceRegistry.getCoreMarketplacePath()` (5 usages)
- `PathService.getMarketplaceRoot()` (17 usages)

**Impact**:
- Inconsistent implementations (could diverge)
- Maintenance burden (two places to update)
- Confusion about which to use

**Evidence**:
```typescript
// MarketplaceRegistry
const devPath = path.join(cliRoot, '..', 'marketplace');
const prodPath = path.join(cliRoot, 'node_modules', '@thearchitech.xyz', 'marketplace');

// PathService
const devMarketplacePath = path.join(cliRoot, '..', 'marketplace');
const prodMarketplacePath = path.join(cliRoot, 'node_modules', '@thearchitech.xyz', 'marketplace');
// Same logic, different variables, different caching mechanism
```

---

### 🔴 Flaw 2: Marketplace Paths Not in Context

**Problem**: ProjectContext does not include marketplace paths, forcing:
- Late resolution (inside `loadTemplate()`)
- Repeated async calls (even though cached)
- No access via path variables (`${ui.path}`)

**Impact**:
- Cannot use `${ui.path}` or `${core.path}` in templates
- Must pass absolute paths or use different logic
- Context not complete for template rendering

**Evidence**:
```typescript
// FrameworkContextService.createProjectContext() - NO marketplace paths
const context: ProjectContext = {
  project: {...},
  paths: smartPaths,  // ← Only framework paths
  // ❌ No marketplace paths
};
```

---

### 🔴 Flaw 3: Inconsistent UI Marketplace Access

**Problem**: UI marketplace paths are accessed:
- Via `MarketplaceRegistry.getUIMarketplacePath()` (direct calls)
- Via absolute path detection in `MarketplaceService` (no validation)
- Not stored in context
- Not accessible via path variables

**Impact**:
- Blueprints must use absolute paths for UI templates
- No convention-based access (`ui/...` prefix)
- No type safety or validation

**Evidence**:
```typescript
// Current: Must use absolute path
template: '/absolute/path/to/ui/marketplace/template.tsx.tpl'

// Desired: Convention-based
template: 'ui/architech-welcome/welcome-page.tsx.tpl'
```

---

### 🔴 Flaw 4: Unused/Dead Code

**Problem**: `EnhancedMarketplaceService` exists but is never used

**Impact**:
- Code maintenance burden
- Confusion about which service to use
- Potential future bugs if someone uses it

---

### 🔴 Flaw 5: No Path Variable Support for Marketplaces

**Problem**: Cannot use `${ui.path}` or `${core.path}` in templates

**Impact**:
- Templates cannot reference marketplace paths dynamically
- Must hardcode absolute paths or use different logic
- Inconsistent with `${paths.key}` pattern for framework paths

**Evidence**:
```typescript
// Framework paths: ✅ Works
path: '${paths.app_root}page.tsx'

// Marketplace paths: ❌ Doesn't work
template: '${ui.path}/ui/architech-welcome/welcome-page.tsx.tpl'  // Not supported
```

---

### 🔴 Flaw 6: PathService Confusion

**Problem**: `PathService` has two responsibilities:
1. Framework path management (via `pathMap`)
2. Core marketplace path resolution (via static `getMarketplaceRoot()`)

**Impact**:
- Unclear separation of concerns
- Mixing project paths with marketplace paths
- Confusion about when to use what

---

## What Should Be Enabled

### ✅ Requirement 1: Single Source of Truth

**Goal**: One unified service for all marketplace path resolution

**Requirements**:
- Single API for core and UI marketplace paths
- Consistent caching mechanism
- Single implementation (no duplication)

---

### ✅ Requirement 2: Context Integration

**Goal**: Marketplace paths available in ProjectContext

**Requirements**:
- Resolved early (in `FrameworkContextService.createProjectContext()`)
- Stored in `ProjectContext.marketplace`
- Available for all template rendering

---

### ✅ Requirement 3: Path Variable Support

**Goal**: Use `${ui.path}` and `${core.path}` in templates

**Requirements**:
- Marketplace paths added to `PathService.pathMap`
- Resolved via `${ui.path}` syntax
- Consistent with `${paths.key}` pattern

---

### ✅ Requirement 4: Convention-Based UI Template Access

**Goal**: Simple `ui/...` prefix for UI marketplace templates

**Requirements**:
- `template: 'ui/architech-welcome/welcome-page.tsx.tpl'` works
- Auto-detects UI framework from context
- Falls back to explicit path if needed

---

### ✅ Requirement 5: Unified Template Loading

**Goal**: `MarketplaceService.loadTemplate()` handles both core and UI

**Requirements**:
- Detects `ui/` prefix convention
- Resolves from UI marketplace automatically
- Falls back to core marketplace for relative paths
- No need for absolute paths

---

### ✅ Requirement 6: Clean Architecture

**Goal**: Clear separation of concerns

**Requirements**:
- `MarketplaceRegistry`: Path discovery and caching (single source)
- `PathService`: Framework paths + marketplace path variables
- `MarketplaceService`: Template/config loading (uses registry)
- Remove duplication and dead code

---

## Proposed Consolidation Strategy

### Strategy: Single Source + Context Integration

**Core Principle**: `MarketplaceRegistry` is the **single source of truth** for marketplace paths.

**Changes**:

1. **Consolidate Path Resolution**
   - Deprecate `PathService.getMarketplaceRoot()`
   - Migrate all usages to `MarketplaceRegistry.getCoreMarketplacePath()`
   - Keep MarketplaceRegistry as the only resolver

2. **Integrate into Context**
   - Resolve marketplace paths in `FrameworkContextService.createProjectContext()`
   - Store in `ProjectContext.marketplace` object
   - Add to `PathService.pathMap` as `${ui.path}`, `${core.path}`

3. **Enhance Template Loading**
   - Update `MarketplaceService.loadTemplate()` to detect `ui/` prefix
   - Use context for marketplace paths (no direct registry calls)
   - Support both convention (`ui/...`) and explicit (`${ui.path}/...`)

4. **Remove Dead Code**
   - Remove `EnhancedMarketplaceService` (unused)
   - Keep `UIMarketplaceResolver` if needed for manifest loading

5. **Update PathService**
   - Remove static `getMarketplaceRoot()` method
   - Add `setMarketplacePaths()` method for context integration
   - Keep only framework path management + marketplace path variables

---

## Implementation Priority

### Phase 1: Consolidation (High Priority)
- [ ] Migrate all `PathService.getMarketplaceRoot()` to `MarketplaceRegistry`
- [ ] Remove `PathService.getMarketplaceRoot()` method
- [ ] Remove `EnhancedMarketplaceService` (dead code)

### Phase 2: Context Integration (High Priority)
- [ ] Add marketplace path resolution in `FrameworkContextService`
- [ ] Store in `ProjectContext.marketplace`
- [ ] Add to `PathService.pathMap` as variables

### Phase 3: Template Loading Enhancement (Medium Priority)
- [ ] Update `MarketplaceService.loadTemplate()` to detect `ui/` prefix
- [ ] Use context for marketplace paths
- [ ] Support convention-based access

### Phase 4: Cleanup (Low Priority)
- [ ] Update documentation
- [ ] Add migration guide
- [ ] Remove deprecated code after migration period

---

## Success Criteria

✅ **Single Source**: All marketplace path access goes through `MarketplaceRegistry`

✅ **Context Integration**: Marketplace paths available in `ProjectContext.marketplace`

✅ **Path Variables**: `${ui.path}` and `${core.path}` work in templates

✅ **Convention Support**: `template: 'ui/...'` works automatically

✅ **No Duplication**: No duplicate path resolution logic

✅ **Clean Architecture**: Clear separation of concerns

---

## Questions to Resolve

1. **Should `PathService.getMarketplaceRoot()` be deprecated immediately or kept for backward compatibility?**
   - Recommendation: Deprecate with migration path, remove after 1 version

2. **Should `UIMarketplaceResolver` be kept or merged into `MarketplaceService`?**
   - Recommendation: Keep if it provides manifest-specific logic, otherwise merge

3. **When to resolve UI marketplace path (eager vs lazy)?**
   - Recommendation: Eager in context creation (early), cached anyway

4. **How to handle UI framework detection?**
   - Recommendation: Detect from genome/context, fallback to auto-detect from package.json

5. **Should marketplace paths be in `PathService.pathMap` or separate storage?**
   - Recommendation: In `pathMap` for consistency with framework paths (`${paths.key}` vs `${paths.ui.path}`)

---

## Next Steps

1. **Review this audit** with stakeholders
2. **Decide on consolidation strategy** (approve or modify proposal)
3. **Create detailed implementation plan** with file-by-file changes
4. **Implement Phase 1** (consolidation)
5. **Test and validate** each phase before moving to next
6. **Document changes** and migration guide

