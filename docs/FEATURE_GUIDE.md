# Feature Development Guide

## Overview

Features are the business capability layer that provides high-level, end-user functionality. They consume Adapters and Integrators to deliver complete, working features.

## Feature Structure

```
marketplace/features/
└── feature-name/
    └── framework-ui/
        ├── feature.json
        ├── blueprint.ts
        └── templates/
            └── *.tpl
```

## Creating a Feature

### 1. Create Directory Structure
```bash
# Navigate to marketplace directory
cd marketplace

# Create feature directory
mkdir -p features/feature-name/framework-ui
mkdir -p features/feature-name/framework-ui/templates
```

### 2. Create feature.json
```json
{
  "id": "features/feature-name/framework-ui",
  "name": "Feature Name",
  "description": "Complete feature description",
  "version": "1.0.0",
  "category": "feature",
  "framework": "nextjs",
  "ui": "shadcn",
  "dependencies": [
    { "id": "framework/nextjs", "version": "^1.0.0" },
    { "id": "ui/shadcn-ui", "version": "^1.0.0" },
    { "id": "integrations/drizzle-nextjs", "version": "^1.0.0" }
  ],
  "parameters": {
    "enabled": {
      "type": "boolean",
      "default": true,
      "description": "Enable the feature"
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
      path: 'src/components/FeatureName.tsx',
      template: 'FeatureName.tsx.tpl',
      context: {
        featureName: '{{feature.name}}',
        framework: '{{feature.framework}}'
      }
    },
    {
      type: 'CREATE_FILE',
      path: 'src/pages/feature-name.tsx',
      template: 'page.tsx.tpl'
    }
  ]
};

export default blueprint;
```

## Feature Principles

### 1. Complete Business Capability
- End-to-end functionality
- User-facing features
- Complete UI implementation
- Business logic included

### 2. Stack-Specific Implementation
- One implementation per stack
- Framework + UI specific
- Optimized for the stack
- Native patterns

### 3. Consume Integrators
- Use standardized APIs
- Leverage headless logic
- Build on solid foundations
- Maintain consistency

## Example: Teams Dashboard Feature

```typescript
// feature.json
{
  "id": "features/teams-dashboard/nextjs-shadcn",
  "name": "Teams Dashboard",
  "description": "Complete team management dashboard",
  "framework": "nextjs",
  "ui": "shadcn",
  "dependencies": [
    { "id": "framework/nextjs" },
    { "id": "ui/shadcn-ui" },
    { "id": "database/drizzle" },
    { "id": "integrations/drizzle-nextjs" },
    { "id": "integrations/teams-data-integration" }
  ]
}

// blueprint.ts
const blueprint: Blueprint = {
  version: '1.0.0',
  actions: [
    {
      type: 'CREATE_FILE',
      path: 'src/components/TeamsDashboard.tsx',
      template: 'TeamsDashboard.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/TeamCard.tsx',
      template: 'TeamCard.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/CreateTeamForm.tsx',
      template: 'CreateTeamForm.tsx.tpl'
    }
  ]
};
```

## Feature Patterns

### 1. Dashboard Features
- Main dashboard component
- Data visualization
- Action buttons
- Status indicators

### 2. Management Features
- CRUD operations
- Form handling
- Data tables
- Search and filters

### 3. Integration Features
- Third-party service integration
- API connections
- Data synchronization
- Error handling

## Component Templates

### Main Feature Component
```tsx
// TeamsDashboard.tsx.tpl
import React from 'react';
import { useTeams } from '@/hooks/use-teams';
import { TeamCard } from './TeamCard';
import { CreateTeamForm } from './CreateTeamForm';

export const TeamsDashboard: React.FC = () => {
  const { teams, isLoading, error } = useTeams();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="teams-dashboard">
      <h1>Teams Dashboard</h1>
      <CreateTeamForm />
      <div className="teams-grid">
        {teams?.map(team => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
};
```

### Form Components
```tsx
// CreateTeamForm.tsx.tpl
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateTeam } from '@/hooks/use-teams';

const createTeamSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional()
});

type CreateTeamData = z.infer<typeof createTeamSchema>;

export const CreateTeamForm: React.FC = () => {
  const createTeam = useCreateTeam();
  
  const { register, handleSubmit, formState: { errors } } = useForm<CreateTeamData>({
    resolver: zodResolver(createTeamSchema)
  });

  const onSubmit = (data: CreateTeamData) => {
    createTeam.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('name')}
        placeholder="Team name"
        className={errors.name ? 'error' : ''}
      />
      {errors.name && <span>{errors.name.message}</span>}
      
      <textarea
        {...register('description')}
        placeholder="Team description"
      />
      
      <button type="submit" disabled={createTeam.isPending}>
        Create Team
      </button>
    </form>
  );
};
```

## Testing Features

### 1. Component Tests
```typescript
import { render, screen } from '@testing-library/react';
import { TeamsDashboard } from './TeamsDashboard';

describe('TeamsDashboard', () => {
  it('should render teams dashboard', () => {
    render(<TeamsDashboard />);
    expect(screen.getByText('Teams Dashboard')).toBeInTheDocument();
  });
});
```

### 2. Integration Tests
```typescript
import { generateProject } from '@thearchitech.xyz/cli';

describe('Teams Dashboard Feature', () => {
  it('should generate working feature', async () => {
    const result = await generateProject({
      modules: [
        { id: 'framework/nextjs' },
        { id: 'ui/shadcn-ui' },
        { id: 'features/teams-dashboard/nextjs-shadcn' }
      ]
    });
    
    expect(result.success).toBe(true);
    expect(result.files).toContain('src/components/TeamsDashboard.tsx');
  });
});
```

## Best Practices

1. **Complete Implementation**: End-to-end functionality
2. **Stack Optimization**: Use framework-specific patterns
3. **Consistent APIs**: Follow Golden Core standards
4. **Error Handling**: Proper error states and loading
5. **Accessibility**: WCAG compliance

## Common Patterns

### 1. Data Fetching
```typescript
// Use integrator hooks
const { data, isLoading, error } = useEntity();
```

### 2. State Management
```typescript
// Use Zustand stores
const { entities, setEntities } = useEntityStore();
```

### 3. Form Handling
```typescript
// Use React Hook Form + Zod
const { register, handleSubmit } = useForm<Schema>({
  resolver: zodResolver(schema)
});
```

### 4. Error Boundaries
```typescript
// Wrap components in error boundaries
<ErrorBoundary fallback={<ErrorFallback />}>
  <FeatureComponent />
</ErrorBoundary>
```

## Troubleshooting

### Common Issues
1. **Missing Dependencies**: Ensure all required adapters/integrators
2. **Hook Errors**: Check integrator hook implementations
3. **Type Errors**: Verify TypeScript types
4. **Styling Issues**: Check UI library integration

### Debug Mode
```bash
architech new my-app --verbose
```

This will show detailed logs of the feature generation process.
