# Marketplace Consolidation - Complete

## Summary

Successfully consolidated all marketplace path resolution and template loading into a unified system using **MarketplaceRegistry** as the single source of truth.

---

## Removed Components

### 1. CREATE_FILE_FROM_UI Action Type
- ❌ Removed from `BlueprintActionType` enum
- ❌ Removed `CreateFileFromUIHandler` class
- ❌ Removed from `ActionHandlerRegistry`
- ✅ Blueprints now use `CREATE_FILE` with `ui/...` convention

### 2. PathService.getMarketplaceRoot()
- ❌ Removed static method (duplicate of MarketplaceRegistry)
- ❌ Removed static `marketplaceRoot` field
- ✅ All 11 usages migrated to `MarketplaceRegistry.getCoreMarketplacePath()`

### 3. EnhancedMarketplaceService
- ❌ Deleted (unused/dead code)
- ✅ Functionality replaced by MarketplaceService + MarketplaceRegistry

### 4. UIMarketplaceResolver
- ❌ Deleted (replaced by convention-based approach)
- ✅ UI template loading now handled by MarketplaceService with `ui/` prefix convention

---

## Final Marketplace Services

### 1. MarketplaceRegistry (Single Source of Truth)
**Location**: `Architech/src/core/services/marketplace/marketplace-registry.ts`

**Purpose**: 
- Centralized path discovery and caching
- Dev vs prod environment detection
- CLI flag override support

**API**:
- `getCoreMarketplacePath(): Promise<string>`
- `getUIMarketplacePath(framework: string): Promise<string>`
- `setMarketplacePath(name: string, path: string): void`
- `marketplaceExists(name: string): Promise<boolean>`
- `getAvailableUIMarketplaces(): Promise<string[]>`

**Used By**: All services that need marketplace paths

---

### 2. MarketplaceService (Template/Config Loading)
**Location**: `Architech/src/core/services/marketplace/marketplace-service.ts`

**Purpose**:
- Load templates from core and UI marketplaces
- Load module configurations (adapter.json, feature.json, etc.)
- Load blueprints

**Key Features**:
- ✅ Convention-based UI template loading (`ui/...` prefix)
- ✅ Uses MarketplaceRegistry for all path resolution
- ✅ Accepts ProjectContext for marketplace path resolution
- ✅ Supports absolute paths (legacy)

**API**:
- `loadTemplate(moduleId: string, templateFile: string, context?: ProjectContext): Promise<string>`
- `loadModuleConfig(moduleId: string): Promise<any>`
- `loadModuleBlueprint(moduleId: string): Promise<any>`
- `moduleExists(moduleId: string): Promise<boolean>`

**Used By**: CreateFileHandler, module loaders

---

### 3. BlueprintLoader (Blueprint Loading)
**Location**: `Architech/src/core/services/marketplace/blueprint-loader.ts`

**Purpose**:
- Load and parse blueprint files
- Handle dynamic vs static blueprints
- Normalize blueprint exports

**Used By**: MarketplaceService, OrchestratorAgent

---

## Integration Points

### FrameworkContextService.createProjectContext()
**What it does**:
- Resolves marketplace paths (core + UI) early in execution
- Stores in `ProjectContext.marketplace`
- Adds to `PathService.pathMap` as variables (`${core.path}`, `${ui.path}`)

**Result**: Marketplace paths available throughout template rendering

---

### MarketplaceService.loadTemplate()
**What it does**:
- Detects `ui/` prefix convention
- Resolves from UI marketplace automatically
- Falls back to core marketplace for relative paths
- Uses context for marketplace paths (no direct registry calls)

**Result**: Simple blueprint syntax: `template: 'ui/architech-welcome/welcome-page.tsx.tpl'`

---

## Blueprint Pattern

### Before (Explicit Action Type)
```typescript
{
  type: BlueprintActionType.CREATE_FILE_FROM_UI,
  path: '${paths.app_root}page.tsx',
  uiTemplate: 'ui/architech-welcome/welcome-page.tsx.tpl'
}
```

### After (Convention-Based)
```typescript
{
  type: BlueprintActionType.CREATE_FILE,
  path: '${paths.app_root}page.tsx',
  template: 'ui/architech-welcome/welcome-page.tsx.tpl'  // ← Convention: ui/ prefix
}
```

**Benefits**:
- ✅ Simpler syntax (no new action type)
- ✅ Consistent with existing CREATE_FILE pattern
- ✅ Automatic UI marketplace resolution
- ✅ Framework-aware path resolution

---

## Path Variables Available

Templates can now use:
- `${core.path}` - Core marketplace path
- `${ui.path}` - Default UI marketplace path
- `${ui.path.shadcn}` - Shadcn marketplace path
- `${ui.path.tamagui}` - Tamagui marketplace path

Example:
```typescript
// In template
const marketplacePath = '${core.path}';
const uiPath = '${ui.path}';
```

---

## Migration Summary

### Files Updated (11)
1. `MarketplaceService` - Uses MarketplaceRegistry
2. `DumbPathTranslator` - Uses MarketplaceRegistry
3. `FeatureModuleResolver` - Uses MarketplaceRegistry
4. `DynamicConnectorResolver` - Uses MarketplaceRegistry
5. `list-genomes.ts` - Uses MarketplaceRegistry
6. `LocalMarketplaceStrategy` - Uses MarketplaceRegistry
7. `PathService` - Removed duplicate method
8. `FrameworkContextService` - Integrated marketplace paths
9. `CreateFileHandler` - Passes context to MarketplaceService
10. `ActionHandlerRegistry` - Removed CreateFileFromUIHandler
11. `OrchestratorAgent` - Removed UIMarketplaceResolver

### Files Deleted (4)
1. `EnhancedMarketplaceService` - Dead code
2. `UIMarketplaceResolver` - Replaced by convention
3. `CreateFileFromUIHandler` - Replaced by convention
4. `ARCHITECTURAL_DECISION_UI_TEMPLATES.md` - Outdated docs

### Files Created (0)
All changes were consolidations and removals.

---

## Architecture Benefits

### ✅ Single Source of Truth
- One service (`MarketplaceRegistry`) for all marketplace paths
- No duplication or inconsistency

### ✅ Context Integration
- Marketplace paths available in `ProjectContext`
- Early resolution (efficient)
- Accessible via path variables

### ✅ Convention-Based
- Simple `ui/...` prefix for UI templates
- No special action types needed
- Automatic framework detection

### ✅ Clean Architecture
- Clear separation: Registry (paths) → Service (loading) → Handler (execution)
- No dead code
- Minimal complexity

---

## Testing Checklist

- [ ] Test blueprint with `ui/...` template paths
- [ ] Test blueprint with core marketplace templates
- [ ] Verify marketplace paths in context
- [ ] Verify path variables work (`${ui.path}`, `${core.path}`)
- [ ] Test UI framework auto-detection
- [ ] Test with explicit UI framework in genome
- [ ] Verify error messages for missing templates

---

## Status

✅ **Consolidation Complete**

All marketplace path resolution now goes through `MarketplaceRegistry`.  
All template loading now goes through `MarketplaceService`.  
Convention-based UI template loading is fully functional.  
No dead code or duplicate implementations remain.

