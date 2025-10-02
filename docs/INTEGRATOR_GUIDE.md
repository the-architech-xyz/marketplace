# Integrator Development Guide

## Overview

Integrators are the technical bridge layer that connects exactly two Adapters to ensure they work together seamlessly. They provide standardized APIs and hooks while maintaining the Golden Core standards.

## Integrator Structure

```
marketplace/integrations/
└── adapter1-adapter2-integration/
    ├── integration.json
    ├── blueprint.ts
    └── templates/
        └── *.tpl
```

## Creating an Integrator

### 1. Create Directory Structure
```bash
mkdir -p marketplace/integrations/adapter1-adapter2-integration
mkdir -p marketplace/integrations/adapter1-adapter2-integration/templates
```

### 2. Create integration.json
```json
{
  "id": "integrations/adapter1-adapter2",
  "name": "Adapter1 + Adapter2 Integration",
  "description": "Technical bridge between Adapter1 and Adapter2",
  "version": "1.0.0",
  "category": "integration",
  "adapters": ["adapter1", "adapter2"],
  "dependencies": [
    { "id": "adapter1", "version": "^1.0.0" },
    { "id": "adapter2", "version": "^1.0.0" }
  ],
  "parameters": {
    "enabled": {
      "type": "boolean",
      "default": true,
      "description": "Enable the integration"
    }
  }
}
```

### 3. Create blueprint.ts
```typescript
import { Blueprint } from '@thearchitech.xyz/types';

const blueprint: Blueprint = {
  version: '1.0.0',
  actions: [
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/useAdapter1Adapter2.ts',
      template: 'use-integration.ts.tpl',
      context: {
        adapter1Config: '{{adapters.adapter1.config}}',
        adapter2Config: '{{adapters.adapter2.config}}'
      }
    },
    {
      type: 'ENHANCE_FILE',
      path: 'src/lib/adapter1.ts',
      action: 'addIntegration',
      template: 'adapter1-integration.ts.tpl'
    }
  ]
};

export default blueprint;
```

## Integrator Principles

### 1. Technical Bridge Only
- Connect exactly two adapters
- Provide standardized APIs
- No business logic
- No UI components

### 2. Golden Core Compliance
- Use TanStack Query for data fetching
- Use Zustand for state management
- Follow standardized patterns
- Provide consistent APIs

### 3. Headless Logic
- Generate hooks and utilities
- No UI components
- Pure TypeScript/JavaScript
- Framework agnostic

## Example: Database + Framework Integration

```typescript
// integration.json
{
  "id": "integrations/drizzle-nextjs",
  "name": "Drizzle + Next.js Integration",
  "description": "TanStack Query hooks for Drizzle ORM in Next.js",
  "adapters": ["database/drizzle", "framework/nextjs"],
  "dependencies": [
    { "id": "database/drizzle", "version": "^1.0.0" },
    { "id": "framework/nextjs", "version": "^1.0.0" }
  ]
}

// blueprint.ts
const blueprint: Blueprint = {
  version: '1.0.0',
  actions: [
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/useQuery.ts',
      template: 'use-query.ts.tpl',
      context: {
        queryClient: '{{adapters.tanstack-query.config}}'
      }
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/db.ts',
      template: 'db-client.ts.tpl',
      context: {
        drizzleConfig: '{{adapters.drizzle.config}}'
      }
    }
  ]
};
```

## Standardized APIs

### Data Fetching Hooks
```typescript
// Standard pattern for data fetching
export const useEntity = (id: string) => {
  return useQuery({
    queryKey: ['entity', id],
    queryFn: () => fetchEntity(id)
  });
};

export const useCreateEntity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createEntity,
    onSuccess: () => {
      queryClient.invalidateQueries(['entities']);
    }
  });
};
```

### State Management Hooks
```typescript
// Standard pattern for state management
export const useEntityStore = create<EntityState>((set) => ({
  entities: [],
  selectedEntity: null,
  setEntities: (entities) => set({ entities }),
  setSelectedEntity: (entity) => set({ selectedEntity: entity })
}));
```

## Common Integration Patterns

### 1. Database + Framework
- TanStack Query hooks
- Database client setup
- Type-safe queries

### 2. Auth + Framework
- Authentication hooks
- Route protection
- User session management

### 3. UI + Framework
- Component configuration
- Theme setup
- Styling integration

### 4. State + Framework
- Zustand store setup
- Persistence configuration
- DevTools integration

## Testing Integrators

### 1. Unit Tests
```typescript
import { validateIntegration } from '@thearchitech.xyz/validator';

describe('Database Integration', () => {
  it('should validate adapter dependencies', () => {
    const config = { adapters: ['drizzle', 'nextjs'] };
    expect(validateIntegration('drizzle-nextjs', config)).toBe(true);
  });
});
```

### 2. Integration Tests
```typescript
import { generateProject } from '@thearchitech.xyz/cli';

describe('Database Integration', () => {
  it('should generate working integration', async () => {
    const result = await generateProject({
      modules: [
        { id: 'database/drizzle' },
        { id: 'framework/nextjs' },
        { id: 'integrations/drizzle-nextjs' }
      ]
    });
    
    expect(result.success).toBe(true);
    expect(result.files).toContain('src/hooks/useQuery.ts');
  });
});
```

## Best Practices

1. **Two Adapters Only**: Never connect more than two adapters
2. **Standardized APIs**: Follow Golden Core patterns
3. **Headless Logic**: No UI components
4. **Type Safety**: Full TypeScript support
5. **Documentation**: Clear API documentation

## Common Mistakes

### ❌ Don't Create UI Components
```typescript
// ❌ Wrong - UI in integrator
{ type: 'CREATE_FILE', path: 'components/UserList.tsx' }

// ✅ Correct - Headless logic only
{ type: 'CREATE_FILE', path: 'hooks/useUsers.ts' }
```

### ❌ Don't Connect Multiple Adapters
```typescript
// ❌ Wrong - Too many adapters
"adapters": ["drizzle", "nextjs", "shadcn"]

// ✅ Correct - Two adapters only
"adapters": ["drizzle", "nextjs"]
```

### ❌ Don't Include Business Logic
```typescript
// ❌ Wrong - Business logic
export const useCreateTeam = () => { /* team creation logic */ };

// ✅ Correct - Technical integration
export const useQuery = () => { /* query client setup */ };
```

## Troubleshooting

### Common Issues
1. **Missing Adapters**: Ensure both adapters are installed
2. **API Conflicts**: Check for naming conflicts
3. **Type Errors**: Ensure proper TypeScript types
4. **Dependency Issues**: Verify adapter versions

### Debug Mode
```bash
architech new my-app --verbose
```

This will show detailed logs of the integration process.
