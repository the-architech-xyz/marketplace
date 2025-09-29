# Development Workflow

## Pre-commit Type Generation

This repository uses a pre-commit hook to automatically generate TypeScript types when adapter or integration schemas change.

### How It Works

1. **Pre-commit Hook**: When you commit changes, husky runs `lint-staged`
2. **Type Generation**: If any `.json` files in `adapters/` or `integrations/` change, types are regenerated
3. **Auto-add**: Generated types are automatically added to the commit
4. **Single Commit**: Both schema changes and generated types are committed together

### Files That Trigger Type Generation

- `adapters/**/*.json` - Any adapter schema changes
- `integrations/**/*.json` - Any integration schema changes  
- `scripts/generate-types.ts` - Type generation script changes

### Generated Files

The following files are automatically generated and committed:
- `types/index.d.ts` - Main type definitions
- `types/adapters/**/*.d.ts` - Adapter type definitions
- `types/integrations/**/*.d.ts` - Integration type definitions

### Manual Type Generation

To manually regenerate types:
```bash
npm run types:generate
```

### Setup (for new developers)

```bash
npm install
npm run prepare  # Sets up husky hooks
```

## Workflow Benefits

- ✅ **Single Commit**: Schema changes and generated types in one commit
- ✅ **Always In Sync**: Types are never out of date
- ✅ **No Manual Steps**: Automatic type generation on commit
- ✅ **Clean History**: No separate commits for generated files
