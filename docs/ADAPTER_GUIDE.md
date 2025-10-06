# Adapter Development Guide

## Overview

Adapters are the foundational layer of The Architech. They install and configure ONE pure, self-contained technology without any dependencies on other modules.

## Adapter Structure

```
marketplace/adapters/
└── category/
    └── technology/
        ├── adapter.json
        ├── blueprint.ts
        └── templates/
            └── *.tpl
```

## Creating an Adapter

### 1. Create Directory Structure
```bash
# Navigate to marketplace directory
cd marketplace

# Create adapter directory
mkdir -p adapters/category/technology
mkdir -p adapters/category/technology/templates
```

### 2. Create adapter.json
```json
{
  "id": "category/technology",
  "name": "Technology Name",
  "description": "Brief description of the technology",
  "version": "1.0.0",
  "category": "category",
  "technology": "technology",
  "dependencies": [],
  "parameters": {
    "param1": {
      "type": "boolean",
      "default": true,
      "description": "Parameter description"
    }
  },
  "features": {
    "feature1": {
      "name": "Feature Name",
      "description": "Feature description",
      "default": true
    }
  }
}
```

### 3. Create blueprint.ts
```typescript
import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

const blueprint: Blueprint = {
  version: '1.0.0',
  actions: [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'package.json',
      template: 'package.json.tpl',
      context: {
        projectName: '{{project.name}}',
        technologyVersion: '{{parameters.technologyVersion}}'
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/config/technology.ts',
      template: 'config.ts.tpl',
      context: {
        enabled: '{{parameters.enabled}}'
      }
    }
  ]
};

export default blueprint;
```

## Adapter Principles

### 1. Single Responsibility
- Install ONE technology only
- No dependencies on other adapters
- Self-contained configuration

### 2. Pure Technology
- No business logic
- No UI components
- Just technology setup

### 3. Parameterized
- Accept configuration parameters
- Provide sensible defaults
- Document all options

## Example: Database Adapter

```typescript
// adapter.json
{
  "id": "database/drizzle",
  "name": "Drizzle ORM",
  "description": "TypeScript ORM for SQL databases",
  "category": "database",
  "technology": "drizzle",
  "parameters": {
    "provider": {
      "type": "string",
      "enum": ["postgresql", "mysql", "sqlite"],
      "default": "postgresql"
    },
    "migrations": {
      "type": "boolean",
      "default": true
    }
  }
}

// blueprint.ts
const blueprint: Blueprint = {
  version: '1.0.0',
  actions: [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'drizzle.config.ts',
      template: 'drizzle.config.ts.tpl',
      context: {
        provider: '{{parameters.provider}}'
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/db/schema.ts',
      template: 'schema.ts.tpl'
    }
  ]
};
```

## Testing Adapters

### 1. Unit Tests
```typescript
import { validateAdapter } from '@thearchitech.xyz/validator';

describe('Database Adapter', () => {
  it('should validate configuration', () => {
    const config = { provider: 'postgresql' };
    expect(validateAdapter('database/drizzle', config)).toBe(true);
  });
});
```

### 2. Integration Tests
```typescript
import { generateProject } from '@thearchitech.xyz/cli';

describe('Database Adapter Integration', () => {
  it('should generate working database setup', async () => {
    const result = await generateProject({
      modules: [{ id: 'database/drizzle' }]
    });
    
    expect(result.success).toBe(true);
    expect(result.files).toContain('drizzle.config.ts');
  });
});
```

## Best Practices

1. **Keep it Simple**: Adapters should be straightforward
2. **Document Everything**: Clear parameter descriptions
3. **Test Thoroughly**: Both unit and integration tests
4. **Follow Conventions**: Use standard directory structure
5. **Version Carefully**: Semantic versioning for changes

## Common Patterns

### Configuration Files
```typescript
// Always create config files in standard locations
{ type: BlueprintActionType.CREATE_FILE, path: 'config/technology.ts' }
```

### Package Dependencies
```typescript
// Add dependencies to package.json
{ type: BlueprintActionType.ENHANCE_FILE,
 path: 'package.json', action: 'addDependency' }
```

### Environment Variables
```typescript
// Add environment variables
{ type: BlueprintActionType.CREATE_FILE, path: '.env.example', template: 'env.example.tpl' }
```

## Troubleshooting

### Common Issues
1. **Circular Dependencies**: Adapters should never depend on each other
2. **Missing Templates**: Ensure all referenced templates exist
3. **Invalid Parameters**: Validate parameter types and values
4. **File Conflicts**: Check for existing files before creating

### Debug Mode
```bash
architech new my-app --verbose
```

This will show detailed logs of the generation process.
