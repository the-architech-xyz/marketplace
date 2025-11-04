# Component Dependency System - Deep Dive Analysis

## 🎯 System Overview

The Architech CLI has an **automatic component dependency resolution system** that:
1. Detects required UI components from feature manifests
2. Injects them into UI adapter module parameters
3. UI adapters (like Shadcn) automatically install them using their adapter-specific logic

---

## 📊 Current Flow

### Step 1: Feature Declares Requirements

**Location**: `feature.json`

**Current Structure**:
```json
{
  "requiresUI": ["welcome-page", "welcome-layout"]  // ❌ Template names, not component names
}
```

**Expected Structure**:
```json
{
  "requires": {
    "components": {
      "ui/shadcn-ui": ["badge", "checkbox", "switch", "tabs", "alert"]
    }
  }
}
```

---

### Step 2: Component Dependency Resolver

**File**: `Architech/src/core/services/orchestration/component-dependency-resolver.ts`

**What it does**:
- Iterates through all feature modules
- Loads `feature.json` manifest
- Reads `featureManifest?.requires?.components`
- Groups components by UI technology ID (e.g., `"ui/shadcn-ui"`)

**Current Code**:
```typescript
if (featureManifest?.requires?.components) {
  for (const [uiTechId, components] of Object.entries(featureManifest.requires.components)) {
    // Collect component requirements per UI technology
    componentRequirements.set(uiTechId, components);
  }
}
```

**Issue**: Only reads explicit `requires.components`, doesn't scan templates

---

### Step 3: Orchestrator Agent Injection

**File**: `Architech/src/agents/orchestrator-agent.ts` (lines 167-200)

**What it does**:
- Calls `resolveComponentDependencies(genome)`
- Gets `Map<uiTechId, string[]>` of required components
- Finds matching UI adapter module (e.g., `module.id === "ui/shadcn-ui"`)
- Merges required components with user-specified components
- Updates `module.parameters.components`

**Code**:
```typescript
const componentDependencies = await this.resolveComponentDependencies(enhancedGenome);

if (componentDependencies.size > 0) {
  for (const module of enhancedGenome.modules) {
    for (const [uiTechId, requiredComponents] of componentDependencies.entries()) {
      if (module.id === uiTechId) {
        const userComponents = module.parameters?.components || [];
        const allComponents = Array.from(
          new Set([...userComponents, ...requiredComponents])
        ).sort();
        
        module.parameters = {
          ...module.parameters,
          components: allComponents
        };
      }
    }
  }
}
```

**Status**: ✅ Working correctly, but needs `requires.components` in feature.json

---

### Step 4: UI Adapter Blueprint Execution

**File**: `marketplace/adapters/ui/shadcn-ui/blueprint.ts` (line 179-185)

**What it does**:
- Uses `forEach: "module.parameters.components"` to iterate over component list
- Runs `npx shadcn@latest add {{item}} --yes --overwrite` for each component
- Component names are Shadcn component IDs (e.g., `"badge"`, `"checkbox"`)

**Code**:
```typescript
{
  type: BlueprintActionType.RUN_COMMAND,
  command: "npx shadcn@latest add {{item}} --yes --overwrite",
  forEach: "module.parameters.components",
  workingDir: ".",
}
```

**Status**: ✅ Working correctly, but needs components in `module.parameters.components`

---

## ❌ Current Issues

### Issue 1: Missing Component Declaration

**Problem**: `architech-welcome/feature.json` doesn't declare required components

**Current**:
```json
{
  "requiresUI": ["welcome-page", "welcome-layout"]  // Template names only
}
```

**Should be**:
```json
{
  "requiresUI": ["welcome-page", "welcome-layout"],  // Keep for UI template resolution
  "requires": {
    "components": {
      "ui/shadcn-ui": ["badge", "checkbox", "switch", "tabs", "alert"]
    }
  }
}
```

---

### Issue 2: Component Name Mapping

**Problem**: Template imports use full paths (`@/components/ui/badge`), but system needs component IDs (`badge`)

**Template Usage**:
```tsx
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Tabs } from '@/components/ui/tabs';
import { Alert } from '@/components/ui/alert';
```

**Shadcn Component IDs**:
- `badge` ✅
- `checkbox` ✅
- `switch` ✅
- `tabs` ✅
- `alert` ✅

**Status**: ✅ Mapping is correct (component folder name = component ID)

---

### Issue 3: Missing Framer Motion Dependency

**Problem**: `framer-motion` is used in templates but not declared as a dependency

**Current**: Templates import `framer-motion` but it's not installed

**Solution Options**:
1. **Option A**: Add to `architech-welcome/blueprint.ts` as `INSTALL_PACKAGES` action
2. **Option B**: Add to feature.json as `requires.dependencies` (if system supports it)
3. **Option C**: Add to Shadcn blueprint (but it's not a Shadcn dependency)

**Recommendation**: **Option A** - Add to feature blueprint

---

## 🔍 How Other Features Handle This

Let me check if other features declare components...

**Result**: No other features in the marketplace currently use `requires.components`!

This suggests:
1. The feature is new/experimental
2. Features haven't been updated to use this system yet
3. The system exists but isn't widely adopted

---

## ✅ Solution Plan

### Fix 1: Add Component Requirements to Feature Manifest

**File**: `marketplace/features/architech-welcome/feature.json`

**Add**:
```json
{
  "requires": {
    "components": {
      "ui/shadcn-ui": ["badge", "checkbox", "switch", "tabs", "alert"]
    }
  }
}
```

**Why**: This tells the system which components are needed for Shadcn UI

---

### Fix 2: Add Framer Motion to Blueprint

**File**: `marketplace/features/architech-welcome/blueprint.ts`

**Add**:
```typescript
{
  type: BlueprintActionType.INSTALL_PACKAGES,
  packages: ['framer-motion@^11.0.0']
}
```

**Why**: Framer Motion is a runtime dependency, not a Shadcn component

---

### Fix 3: Verify Component Detection Flow

**Check**:
1. ✅ ComponentDependencyResolver reads `requires.components`
2. ✅ OrchestratorAgent injects into module parameters
3. ✅ Shadcn blueprint uses `forEach` to install

**Status**: All working, just needs feature.json update

---

## 🎯 How It Should Work (Complete Flow)

### 1. Feature Author Declares Components

```json
// feature.json
{
  "requires": {
    "components": {
      "ui/shadcn-ui": ["badge", "checkbox", "switch", "tabs", "alert"],
      "ui/tamagui": ["Button", "Checkbox", "Switch"]  // Different UI = different component names
    }
  }
}
```

### 2. System Resolves Dependencies

```
ComponentDependencyResolver
  → Reads all feature.json files
  → Groups components by UI technology
  → Returns Map<"ui/shadcn-ui", ["badge", "checkbox", ...]>
```

### 3. System Injects into UI Adapter

```
OrchestratorAgent
  → Finds module with id="ui/shadcn-ui"
  → Merges required components with user components
  → Updates module.parameters.components = ["badge", "checkbox", ...]
```

### 4. UI Adapter Installs Components

```
Shadcn Blueprint
  → forEach: module.parameters.components
  → Runs: npx shadcn@latest add badge --yes --overwrite
  → Runs: npx shadcn@latest add checkbox --yes --overwrite
  → ... etc
```

### 5. Components Available in Templates

```
Templates
  → Import from @/components/ui/badge
  → Import from @/components/ui/checkbox
  → ... etc
```

---

## 🔄 UI Framework Differences

### Shadcn/ui
- **Component IDs**: lowercase, kebab-case (e.g., `badge`, `alert-dialog`)
- **Installation**: CLI command `npx shadcn@latest add <component>`
- **Location**: `src/components/ui/<component>.tsx`

### Tamagui (Future)
- **Component IDs**: PascalCase (e.g., `Button`, `Checkbox`)
- **Installation**: Likely npm package or different CLI
- **Location**: Different structure

**System handles this** by:
- UI adapter blueprint defines installation logic
- Component IDs are UI-specific
- Feature declares components per UI technology

---

## 📝 Action Items

### Immediate (Fix Missing Components)
1. ✅ Add `requires.components` to `architech-welcome/feature.json`
2. ✅ Add `framer-motion` to `architech-welcome/blueprint.ts`
3. ✅ Test component resolution and installation

### Short Term (System Improvements)
1. ⏳ Add template scanning for automatic component detection (optional enhancement)
2. ⏳ Document component declaration best practices
3. ⏳ Update other features to use component declaration

### Long Term (System Enhancements)
1. ⏳ Add component dependency validation
2. ⏳ Add component conflict detection
3. ⏳ Add component version management

---

## 🧪 Testing Checklist

After fixes:
- [ ] Component requirements declared in feature.json
- [ ] ComponentDependencyResolver detects components
- [ ] OrchestratorAgent injects components into UI adapter
- [ ] Shadcn blueprint installs components
- [ ] Components available in project
- [ ] Templates import components successfully
- [ ] No runtime errors

---

## 📚 References

- **ComponentDependencyResolver**: `Architech/src/core/services/orchestration/component-dependency-resolver.ts`
- **OrchestratorAgent**: `Architech/src/agents/orchestrator-agent.ts` (lines 167-200)
- **Shadcn Blueprint**: `marketplace/adapters/ui/shadcn-ui/blueprint.ts` (line 179-185)
- **Feature Manifest**: `marketplace/features/architech-welcome/feature.json`


