# Marketplace Path Flow - Deep Dive Analysis

## Current Architecture

### 1. Marketplace Path Storage

**Location**: `MarketplaceRegistry` (static singleton)

```typescript
export class MarketplaceRegistry {
  private static corePath: string | null = null;
  private static uiPaths: Map<string, string> = new Map();
  private static overrides: Map<string, string> = new Map();
  
  static async getCoreMarketplacePath(): Promise<string>
  static async getUIMarketplacePath(framework: string): Promise<string>
}
```

**Characteristics**:
- ✅ Static caching (lazy-loaded, cached after first access)
- ✅ Async resolution (checks dev vs prod paths)
- ✅ Supports overrides via CLI flags
- ❌ Not accessible via path variables (only via direct calls)
- ❌ Not stored in ProjectContext

---

### 2. Current Access Patterns

#### Pattern A: Direct Registry Access
```typescript
// Used in: new.ts, ui-marketplace-resolver.ts, create-file-from-ui-handler.ts
const corePath = await MarketplaceRegistry.getCoreMarketplacePath();
const uiPath = await MarketplaceRegistry.getUIMarketplacePath('shadcn');
```

#### Pattern B: PathService.getMarketplaceRoot()
```typescript
// Used in: MarketplaceService, various resolvers
const marketplaceRoot = await PathService.getMarketplaceRoot();
// Returns core marketplace path only (different method, same purpose)
```

**Problem**: Two different methods accessing the same data!

---

### 3. Execution Flow

```
new.ts command
  ↓
MarketplaceRegistry.getCoreMarketplacePath()  ← First access (for transformer)
  ↓
GenomeTransformationService (genome transformation)
  ↓
ProjectManager + OrchestratorAgent
  ↓
ModuleService.setupFramework()
  ↓
FrameworkContextService.createProjectContext()  ← PER MODULE (here!)
  ↓
BlueprintExecutor.executeActions()
  ↓
CreateFileHandler.loadTemplate()
  ↓
MarketplaceService.loadTemplate()  ← Needs marketplace paths!
  ↓
PathService.getMarketplaceRoot() OR MarketplaceRegistry.getUIMarketplacePath()
```

---

## Key Observations

### ✅ What Works Well

1. **Static Caching**: MarketplaceRegistry caches paths after first resolution (efficient)
2. **Centralized Access**: Single source of truth via MarketplaceRegistry
3. **Override Support**: Can override paths via CLI flags

### ❌ Problems

1. **Inconsistent Access**: 
   - Some code uses `MarketplaceRegistry.getCoreMarketplacePath()`
   - Other code uses `PathService.getMarketplaceRoot()` (same data, different method)

2. **Not in Context**:
   - ProjectContext created per module in `FrameworkContextService.createProjectContext()`
   - Marketplace paths NOT included in context
   - Must be resolved on-demand during template loading

3. **No Path Variables**:
   - Can't use `${ui.path}` in templates
   - Can't use `${core.path}` in templates
   - Must use absolute paths or relative paths with different logic

4. **Late Resolution**:
   - UI marketplace path resolved inside `loadTemplate()` (late in execution)
   - Could be resolved once and stored in context (early in execution)

---

## Proposed Integration Strategy

### Strategy: Store Marketplace Paths in ProjectContext + PathService

**Integration Point**: `FrameworkContextService.createProjectContext()`

**When**: Once per module execution (early in flow)

**What**: 
1. Resolve all marketplace paths (core + detected UI framework)
2. Store in `ProjectContext.marketplace`
3. Add to `PathService.pathMap` as `${ui.path}`, `${core.path}` variables

**Benefits**:
- ✅ Available early in execution
- ✅ Accessible via path variables (`${ui.path}/...`)
- ✅ Single resolution per module (efficient)
- ✅ Consistent access pattern

---

## Detailed Implementation Plan

### Step 1: Resolve Marketplace Paths in FrameworkContextService

```typescript
// In FrameworkContextService.createProjectContext()

// 1. Resolve core marketplace path (once)
const coreMarketplacePath = await MarketplaceRegistry.getCoreMarketplacePath();

// 2. Detect UI framework from project
const uiFramework = await this.detectUIFramework(context, genome);

// 3. Resolve UI marketplace path (if framework detected)
let uiMarketplacePath: string | undefined;
if (uiFramework) {
  uiMarketplacePath = await MarketplaceRegistry.getUIMarketplacePath(uiFramework);
}

// 4. Store in context
context.marketplace = {
  core: coreMarketplacePath,
  ui: {
    default: uiFramework || '',
    ...(uiFramework && uiMarketplacePath ? { [uiFramework]: uiMarketplacePath } : {})
  }
};
```

### Step 2: Add Marketplace Paths to PathService.pathMap

```typescript
// In FrameworkContextService.createProjectContext(), after creating paths object

// Add marketplace paths to pathMap for variable resolution
pathHandler.setPath('core.path', coreMarketplacePath);
if (uiFramework && uiMarketplacePath) {
  pathHandler.setPath('ui.path', uiMarketplacePath);
  pathHandler.setPath(`ui.path.${uiFramework}`, uiMarketplacePath);
}
```

### Step 3: Enhance MarketplaceService.loadTemplate()

```typescript
// In MarketplaceService.loadTemplate()

static async loadTemplate(
  moduleId: string, 
  templatePath: string,
  context?: ProjectContext  // ← Add optional context
): Promise<string> {
  
  // CONVENTION: If template starts with 'ui/', resolve from UI marketplace
  if (templatePath.startsWith('ui/')) {
    const relativePath = templatePath.substring(3); // Remove 'ui/' prefix
    
    // Get UI marketplace path from context OR detect
    const uiFramework = context?.marketplace?.ui.default || 
                       context?.parameters?.uiFramework ||
                       await detectUIFramework(context);
    
    const uiMarketplacePath = context?.marketplace?.ui[uiFramework] ||
                              await MarketplaceRegistry.getUIMarketplacePath(uiFramework);
    
    const absolutePath = path.join(uiMarketplacePath, relativePath);
    return await fs.readFile(absolutePath, 'utf-8');
  }
  
  // DEFAULT: Core marketplace (existing logic)
  const marketplaceRoot = context?.marketplace?.core || 
                          await PathService.getMarketplaceRoot();
  // ... rest of existing logic
}
```

### Step 4: Update CreateFileHandler to Pass Context

```typescript
// In CreateFileHandler.loadTemplate()

private async loadTemplate(
  templatePath: string, 
  projectRoot: string, 
  context: ProjectContext,  // ← Already have this!
  actionContext?: Record<string, any>
): Promise<string> {
  // Pass context to MarketplaceService
  const templateContent = await MarketplaceService.loadTemplate(
    context.module.id, 
    templatePath,
    context  // ← Pass context for marketplace path resolution
  );
  // ... rest
}
```

---

## Detection Logic for UI Framework

```typescript
private static async detectUIFramework(
  context: ProjectContext,
  genome: Genome
): Promise<string | null> {
  // 1. Check genome parameters
  if ((genome as any).options?.uiFramework) {
    return (genome as any).options.uiFramework;
  }
  
  // 2. Check project path for package.json
  const packageJsonPath = path.join(
    context.project?.path || '',
    'package.json'
  );
  
  try {
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    if (deps['expo'] || deps['react-native']) return 'tamagui';
    if (deps['next'] || deps['react']) return 'shadcn';
  } catch {
    // Package.json not found yet (project being created)
  }
  
  // 3. Check available UI marketplaces (fallback)
  const available = await MarketplaceRegistry.getAvailableUIMarketplaces();
  return available[0] || null;
}
```

---

## Questions to Resolve

### Q1: When to resolve UI marketplace path?
- **Option A**: Only if template uses `ui/` prefix (lazy)
- **Option B**: Always resolve for detected framework (eager)
- **Recommendation**: Option B (eager) - simpler, paths are cached anyway

### Q2: Where to store in PathService?
- **Option A**: Direct keys: `${ui.path}`, `${core.path}`
- **Option B**: Nested: `${marketplace.core}`, `${marketplace.ui.default}`
- **Recommendation**: Option A (simple keys) - consistent with `${paths.key}` pattern

### Q3: What if UI framework changes mid-execution?
- **Answer**: Unlikely - framework is determined from genome. If needed, re-resolve per module.

### Q4: Should PathService.getMarketplaceRoot() be deprecated?
- **Answer**: Yes, consolidate to use MarketplaceRegistry + context. But keep for backward compatibility initially.

---

## Summary

**Best Integration Point**: `FrameworkContextService.createProjectContext()`

**Why**:
- Called once per module (early in execution)
- Already creates `paths` object
- Already has access to genome and project info
- Perfect place to resolve and store marketplace paths

**What to Add**:
1. Resolve marketplace paths (core + UI)
2. Store in `ProjectContext.marketplace`
3. Add to `PathService.pathMap` for variable resolution
4. Enhance `MarketplaceService.loadTemplate()` to detect `ui/` prefix

**Result**:
- Simple blueprint syntax: `template: 'ui/architech-welcome/welcome-page.tsx.tpl'`
- Optional explicit: `template: '${ui.path}/ui/...'`
- No new action type needed
- Backward compatible

