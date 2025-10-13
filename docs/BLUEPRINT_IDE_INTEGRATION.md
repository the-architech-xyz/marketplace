# Blueprint IDE Integration

## 🎯 Overview

The Blueprint IDE Integration provides **real-time IntelliSense, autocomplete, and type validation** for blueprint parameters based on the actual schema files. This ensures developers can only use parameters that are actually defined in the module's schema.

## 🚀 Features

### ✅ **Type Safety**
- Full TypeScript support for blueprint parameters
- Compile-time validation of parameter usage
- IntelliSense for all available parameters

### ✅ **Schema-Driven Validation**
- Parameters are validated against actual `feature.json`/`adapter.json` schemas
- Real-time error highlighting for invalid parameters
- Automatic parameter documentation from schema

### ✅ **IDE Integration**
- VS Code IntelliSense support
- Hover documentation for parameters
- Autocomplete for parameter names and values

## 📋 Generated Files

### 1. Blueprint Interface Files
**Location:** `types/blueprints/{module-id}.d.ts`

**Example:** `types/blueprints/features-architech-welcome-shadcn.d.ts`
```typescript
/**
 * Generated Blueprint Interface for features/architech-welcome/shadcn
 */

import { BlueprintAction, MergedConfiguration } from '@thearchitech.xyz/types';
import { FeaturesArchitechWelcomeShadcnParameters } from '../blueprint-parameters.js';

/**
 * Blueprint function signature with full type safety
 */
export interface FeaturesArchitechWelcomeShadcnBlueprint {
  generateBlueprint(
    config: MergedConfiguration & {
      templateContext: {
        module: {
          parameters: FeaturesArchitechWelcomeShadcnParameters;
        };
      };
    }
  ): BlueprintAction[];
}

/**
 * Available parameters for this blueprint
 */
export type FeaturesArchitechWelcomeShadcnParameters = {
  features: {
    techStack: boolean; /** Show technology stack visualization */
    componentShowcase: boolean; /** Show interactive component library showcase */
    projectStructure: boolean; /** Show project structure and architecture */
    quickStart: boolean; /** Show quick start guide */
    architechBranding: boolean; /** Show Architech branding and links */
  };
  customTitle: string; /** Custom welcome page title */
  customDescription: string; /** Custom welcome page description */
  primaryColor: string; /** Primary color theme for the welcome page */
  showTechStack: boolean; /** Show technology stack visualization */
  showComponents: boolean; /** Show interactive component library showcase */
  showProjectStructure: boolean; /** Show project structure and architecture */
  showQuickStart: boolean; /** Show quick start guide */
  showArchitechBranding: boolean; /** Show Architech branding and links */
};
```

### 2. Blueprint Index
**Location:** `types/blueprints/index.d.ts`

```typescript
/**
 * Generated Blueprint IDE Types Index
 */

export * from './features-architech-welcome-shadcn.js';
export * from './features-ai-chat-frontend-shadcn.js';
// ... all other blueprints

/**
 * All available blueprint types
 */
export type AllBlueprintTypes = 
  | FeaturesArchitechWelcomeShadcnBlueprint
  | FeaturesAiChatFrontendShadcnBlueprint
  // ... all other blueprint types
```

## 🔧 Usage in Blueprints

### 1. Import Generated Types
```typescript
import { BlueprintAction, MergedConfiguration } from '@thearchitech.xyz/types';
import type { FeaturesArchitechWelcomeShadcnBlueprint } from '../../../types/blueprints/features-architech-welcome-shadcn.js';
```

### 2. Use Type-Safe Function Signature
```typescript
export default function generateBlueprint(
  config: MergedConfiguration & { 
    templateContext: { 
      module: { 
        parameters: FeaturesArchitechWelcomeShadcnParameters 
      } 
    } 
  }
): BlueprintAction[] {
  // Your blueprint logic here
}
```

### 3. Enjoy Full IDE Support
```typescript
// ✅ IDE will provide IntelliSense for all available parameters
const { params, features } = extractTypedModuleParameters<FeaturesArchitechWelcomeShadcnParameters>(config);

// ✅ TypeScript will validate parameter usage
if (features.techStack) {        // ✅ Valid - defined in schema
  // ...
}

if (features.invalidParam) {     // ❌ Error - not defined in schema
  // TypeScript error: Property 'invalidParam' does not exist
}
```

## 🛠️ Generation Commands

### Generate Blueprint IDE Types
```bash
npm run types:generate:blueprint-ide
```

### Generate All Types (Including Blueprint IDE Types)
```bash
npm run types:generate:constitutional && npm run types:generate:blueprint-ide
```

## 🎯 Benefits

### **For Developers**
- **IntelliSense**: Autocomplete for all available parameters
- **Type Safety**: Compile-time validation of parameter usage
- **Documentation**: Hover information from schema descriptions
- **Error Prevention**: Catch invalid parameters before runtime

### **For Maintainers**
- **Schema Consistency**: Parameters are always in sync with schema files
- **Refactoring Safety**: Changes to schema automatically update types
- **Documentation**: Generated types serve as living documentation

### **For the Platform**
- **Quality Assurance**: Ensures only valid parameters are used
- **Developer Experience**: Reduces errors and improves productivity
- **Maintainability**: Centralized parameter validation

## 🔄 Workflow

1. **Update Schema**: Modify `feature.json` or `adapter.json`
2. **Regenerate Types**: Run `npm run types:generate:blueprint-ide`
3. **Update Blueprint**: Import and use generated types
4. **Enjoy IDE Support**: Full IntelliSense and validation

## 📝 Example: Complete Blueprint with IDE Integration

```typescript
import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy, MergedConfiguration } from '@thearchitech.xyz/types';
import { FeaturesArchitechWelcomeShadcnParameters } from '../../../types/blueprint-parameters.js';
import { extractTypedModuleParameters } from '../../../scripts/utilities/blueprint-parameter-extractor.js';
import type { FeaturesArchitechWelcomeShadcnBlueprint } from '../../../types/blueprints/features-architech-welcome-shadcn.js';

export default function generateBlueprint(
  config: MergedConfiguration & { 
    templateContext: { 
      module: { 
        parameters: FeaturesArchitechWelcomeShadcnParameters 
      } 
    } 
  }
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters<FeaturesArchitechWelcomeShadcnParameters>(config);
  
  // Core is always generated
  actions.push(...generateCoreActions(config));
  
  // Optional features based on schema parameters
  // ✅ IDE provides IntelliSense for all available features
  if (features.techStack) {
    actions.push(...generateTechStackActions());
  }
  
  if (features.componentShowcase) {
    actions.push(...generateComponentsActions());
  }
  
  if (features.projectStructure) {
    actions.push(...generateProjectStructureActions());
  }
  
  if (features.quickStart) {
    actions.push(...generateQuickStartActions());
  }
  
  if (features.architechBranding) {
    actions.push(...generateArchitechBrandingActions());
  }
  
  return actions;
}
```

## 🎉 Result

With this integration, developers get:
- **Full IDE support** for blueprint development
- **Type safety** for all parameter usage
- **Schema-driven validation** ensuring consistency
- **Automatic documentation** from schema descriptions
- **Error prevention** through compile-time validation

This creates a **professional development experience** that ensures blueprint parameters are always valid and well-documented! 🚀
