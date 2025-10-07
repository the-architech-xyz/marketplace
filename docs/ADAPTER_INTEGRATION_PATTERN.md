# Adapter-Integration Pattern

## Overview

The Adapter-Integration pattern is a key architectural principle in The Architech marketplace that separates **pure, framework-agnostic functionality** (Adapters) from **framework-specific implementations** (Integrations).

## The Problem

When building a modular system, we face a fundamental question:
- Should TanStack Query be framework-agnostic?
- Should we have separate Next.js, Remix, and Vite integrations?
- How do we handle conflicts when both create similar files?

## The Solution: Layered Architecture

### 1. **Adapters** (Pure, Framework-Agnostic)
```typescript
// adapters/data-fetching/tanstack-query
- Pure TanStack Query setup
- Generic React patterns
- No framework-specific code
- Can be used with any React framework
- Provides fallback implementations
```

### 2. **Integrations** (Framework-Specific)
```typescript
// integrations/tanstack-query-nextjs-integration
- Next.js-specific optimizations
- SSR/SSG support
- Next.js App Router integration
- Framework-specific patterns
- Overrides adapter files when needed
```

## Conflict Resolution Strategy

### Priority System
- **Adapters**: `priority: 0` (lowest)
- **Integrations**: `priority: 1` (higher)

### Resolution Strategies

#### 1. **Skip Strategy** (Adapters)
```typescript
{
  type: BlueprintActionType.CREATE_FILE,
  path: 'src/lib/query-client.ts',
  template: 'templates/query-client.ts.tpl',
  conflictResolution: {
    strategy: 'skip',
    priority: 0
  }
}
```
- **When**: Adapter files that integrations should override
- **Behavior**: Skip if file exists (let integration handle it)

#### 2. **Replace Strategy** (Integrations)
```typescript
{
  type: BlueprintActionType.CREATE_FILE,
  path: 'src/lib/query-client.ts',
  template: 'templates/query-client.ts.tpl',
  conflictResolution: {
    strategy: 'replace',
    priority: 1
  }
}
```
- **When**: Integration files that should override adapters
- **Behavior**: Replace existing file with framework-specific version

#### 3. **Merge Strategy** (Complex Cases)
```typescript
{
  type: BlueprintActionType.CREATE_FILE,
  path: 'src/lib/query-client.ts',
  template: 'templates/query-client.ts.tpl',
  conflictResolution: {
    strategy: 'merge',
    mergeStrategy: 'js',
    priority: 1
  }
}
```
- **When**: Files that need to combine adapter + integration code
- **Behavior**: Merge content intelligently

## File Conflict Matrix

| File | Adapter Strategy | Integration Strategy | Result |
|------|------------------|---------------------|---------|
| `query-client.ts` | `skip` | `replace` | Integration version |
| `QueryProvider.tsx` | `skip` | `replace` | Integration version |
| `QueryErrorBoundary.tsx` | `skip` | `replace` | Integration version |
| `query-keys.ts` | `skip` | `replace` | Integration version |
| `use-query.ts` | `create` | - | Adapter version |
| `use-mutation.ts` | `create` | - | Adapter version |
| `query-ssr.ts` | - | `create` | Integration only |

## Benefits

### 1. **Flexibility**
- Use adapter alone for generic React apps
- Use integration for framework-specific optimizations
- Mix and match as needed

### 2. **Maintainability**
- Clear separation of concerns
- Framework-specific code isolated
- Pure adapters remain framework-agnostic

### 3. **Conflict Resolution**
- Predictable file resolution
- No more "file already exists" errors
- Clear priority system

### 4. **Extensibility**
- Easy to add new framework integrations
- Adapters provide fallback implementations
- Integrations can override as needed

## Usage Patterns

### Pattern 1: Adapter Only
```bash
# For generic React apps
architech generate --modules data-fetching/tanstack-query
```
**Result**: Pure TanStack Query setup, no framework-specific code

### Pattern 2: Integration Only
```bash
# For Next.js apps (includes adapter automatically)
architech generate --modules integrations/tanstack-query-nextjs-integration
```
**Result**: Next.js-optimized TanStack Query setup

### Pattern 3: Custom Mix
```bash
# Use adapter + custom integration
architech generate --modules data-fetching/tanstack-query,integrations/custom-query-integration
```
**Result**: Adapter base + custom integration overrides

## Implementation Guidelines

### For Adapter Authors
1. **Use `skip` strategy** for files that integrations should override
2. **Provide fallback implementations** for all core functionality
3. **Keep code framework-agnostic**
4. **Set `priority: 0`**

### For Integration Authors
1. **Use `replace` strategy** for framework-specific files
2. **Extend adapter functionality** rather than replacing entirely
3. **Add framework-specific optimizations**
4. **Set `priority: 1`**

### For Blueprint Validators
1. **Detect adapter-integration conflicts**
2. **Validate conflict resolution strategies**
3. **Ensure proper priority ordering**
4. **Warn about missing strategies**

## Examples

### TanStack Query Adapter
```typescript
// adapters/data-fetching/tanstack-query/blueprint.ts
{
  type: BlueprintActionType.CREATE_FILE,
  path: 'src/lib/query-client.ts',
  template: 'templates/query-client.ts.tpl',
  conflictResolution: {
    strategy: 'skip',  // Let integrations override
    priority: 0
  }
}
```

### Next.js Integration
```typescript
// integrations/tanstack-query-nextjs-integration/blueprint.ts
{
  type: BlueprintActionType.CREATE_FILE,
  path: 'src/lib/query-client.ts',
  template: 'templates/query-client.ts.tpl',
  conflictResolution: {
    strategy: 'replace',  // Override adapter
    priority: 1
  }
}
```

## Future Extensions

### Remix Integration
```typescript
// integrations/tanstack-query-remix-integration/blueprint.ts
{
  type: BlueprintActionType.CREATE_FILE,
  path: 'src/lib/query-client.ts',
  template: 'templates/query-client.ts.tpl',
  conflictResolution: {
    strategy: 'replace',
    priority: 1
  }
}
```

### Vite Integration
```typescript
// integrations/tanstack-query-vite-integration/blueprint.ts
{
  type: BlueprintActionType.CREATE_FILE,
  path: 'src/lib/query-client.ts',
  template: 'templates/query-client.ts.tpl',
  conflictResolution: {
    strategy: 'replace',
    priority: 1
  }
}
```

## Conclusion

The Adapter-Integration pattern provides a clean, scalable architecture that:
- Separates concerns between pure functionality and framework-specific code
- Resolves conflicts predictably
- Enables flexible composition
- Maintains backward compatibility
- Supports future framework additions

This pattern should be applied to all similar cases in the marketplace where we have both generic and framework-specific implementations.
