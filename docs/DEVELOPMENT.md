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

## Defining Module Parameters

Every module’s manifest (`feature.json`, `adapter.json`, `connector.json`) is the single source of truth for parameter definitions. The genome transformer copies these definitions into the resolved genome, so the CLI and the AI layer receive the full schema (types, defaults, descriptions, validations) without any additional guessing.

1. Add a `parameters` block to the manifest:
   ```jsonc
   {
     "parameters": {
       "streaming": {
         "name": "Streaming",
         "description": "Enable real-time message streaming",
         "type": "boolean",
         "default": true
       }
     }
   }
   ```
2. Run `npm run build` (or `pnpm run build`) to regenerate the marketplace manifest and blueprint parameter types.
3. Inside the blueprint, use `extractTypedModuleParameters(config)` to access strongly typed parameters:
   ```ts
   import { extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

   const { params } = extractTypedModuleParameters(config);
   if (params.streaming) {
     // …
   }
   ```

> 💡 Tip: keep descriptions and defaults up to date. They power the CLI prompts and the future AI assistant, so investing a few minutes here saves hours downstream.
