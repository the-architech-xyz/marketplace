# Blueprint Auto-Typing System

This document explains how the new blueprint auto-typing system works, leveraging the existing genome type generation infrastructure.

## 🎯 What This Solves

Instead of generating separate blueprint types, we now **automatically type blueprint functions** based on their module's schema. The blueprint function signature automatically knows what parameters are available for that specific module.

## 🔧 How It Works

### 1. **Leverages Existing Type Generation**

The system uses the existing `ModuleParameters` type that's already generated from module schemas:

```typescript
// This already exists in genome-types.d.ts
export type ModuleParameters = {
  'features/architech-welcome/shadcn': {
    features?: {
      techStack?: boolean;
      componentShowcase?: boolean;
      // ... other features
    };
    customTitle?: any;
    customDescription?: any;
    // ... other parameters
  };
  // ... other modules
};
```

### 2. **Automatic Blueprint Typing**

Blueprints now use `TypedMergedConfiguration<ModuleId>` which automatically resolves the correct parameter types:

```typescript
// Before (manual typing):
export default function generateBlueprint(
  config: MergedConfiguration & { 
    templateContext: { 
      module: { 
        parameters: FeaturesArchitechWelcomeShadcnParameters 
      } 
    } 
  }
): BlueprintAction[] {
  // Manual type casting needed
  const { params, features } = extractTypedModuleParameters<FeaturesArchitechWelcomeShadcnParameters>(config);
}

// After (automatic typing):
export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/architech-welcome/shadcn'>
): BlueprintAction[] {
  // Automatic type resolution - no manual type parameters needed!
  const { params, features } = extractTypedModuleParameters(config);
  // features.techStack ✅ - IDE knows this exists
  // features.invalidParam ❌ - IDE shows error
}
```

### 3. **IDE Benefits**

- **Automatic IntelliSense**: IDE shows only parameters that exist in the module's schema
- **Type Safety**: Catches parameter errors at compile-time
- **No Manual Type Parameters**: No need to specify generic types manually
- **Schema-Driven**: Types automatically stay in sync with module schemas

## 🚀 Usage Examples

### Example 1: Architech Welcome Blueprint

```typescript
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/architech-welcome/shadcn'>
): BlueprintAction[] {
  const { params, features } = extractTypedModuleParameters(config);
  
  // IDE automatically knows these parameters exist:
  if (features.techStack) { // ✅ Valid - IDE shows autocomplete
    actions.push(...generateTechStackActions());
  }
  
  if (params.customTitle) { // ✅ Valid - IDE shows autocomplete
    // Use custom title
  }
  
  // IDE will show error for non-existent parameters:
  // if (features.invalidFeature) { // ❌ TypeScript error: Property 'invalidFeature' does not exist
  //   // This will be caught at compile time with full type safety
  // }
}
```

### Example 2: AI Chat Blueprint

```typescript
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/ai-chat/frontend/shadcn'>
): BlueprintAction[] {
  const { params, features } = extractTypedModuleParameters(config);
  
  // IDE automatically knows these parameters exist:
  if (features.media) { // ✅ Valid - IDE shows autocomplete
    actions.push(...generateMediaActions());
  }
  
  if (features.voice) { // ✅ Valid - IDE shows autocomplete
    actions.push(...generateVoiceActions());
  }
  
  // ❌ This will show a TypeScript error - invalid parameter
  // if (features.invalidFeature) { // ❌ TypeScript error: Property 'invalidFeature' does not exist
  //   actions.push(...generateInvalidActions());
  // }
}
```

## 🔄 Migration Path

### Step 1: Update Imports

```typescript
// Old imports (if any)
import { MergedConfiguration } from '@thearchitech.xyz/types';

// New imports
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';
```

### Step 2: Update Function Signature

```typescript
// Old signature (if using manual typing)
export default function generateBlueprint(
  config: MergedConfiguration
): BlueprintAction[] {

// New signature (automatic typing)
export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/architech-welcome/shadcn'>
): BlueprintAction[] {
```

### Step 3: Update Parameter Extraction

```typescript
// Old (with manual type parameter - if using old system)
const { params, features } = extractTypedModuleParameters<SomeManualType>(config);

// New (automatic type resolution)
const { params, features } = extractTypedModuleParameters(config);
```

## 🎉 Benefits

1. **No Reinventing the Wheel**: Uses existing `ModuleParameters` type generation
2. **Automatic Type Resolution**: No manual type parameters needed
3. **Schema-Driven**: Types automatically stay in sync with module schemas
4. **Better IDE Experience**: Full IntelliSense and type safety
5. **Simpler Code**: Cleaner, more readable blueprint functions
6. **Type Safety**: Catch parameter errors at compile-time, not runtime

## 🔧 Technical Implementation

The system works by:

1. **Conditional Types**: `TypedMergedConfiguration<TModuleId>` uses TypeScript's conditional types to resolve the correct parameter type based on the module ID
2. **Existing Infrastructure**: Leverages the existing `ModuleParameters` mapping from `genome-types.d.ts`
3. **Type Inference**: The `extractTypedModuleParameters` function automatically infers the correct types from the config parameter
4. **Module ID Resolution**: Uses the module ID string literal to look up the correct parameter type

This approach is much cleaner than generating separate blueprint types and provides the same level of type safety with better developer experience.
