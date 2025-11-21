# Scripts Directory

This directory contains all the scripts for the Architech marketplace, organized into logical subfolders for better maintainability and clarity.

## 📁 Directory Structure

### `cli.ts` - Unified Entry Point
Single entry point for marketplace operations:
- `tsx scripts/cli.ts validate [--templates --contracts --all]`
- `tsx scripts/cli.ts generate [--types --manifest --all]`
- `tsx scripts/cli.ts build [--check|--build|--all]`
- `tsx scripts/cli.ts utilities <target>`

### `/lib/` - Shared Helpers
Reusable building blocks shared across scripts:

- **`manifest.ts`** - Common functions for blueprint/template discovery used by manifest generators.
- **`cli-utils.ts`** - Lightweight argument parsing helpers for the CLI wrapper.
- **`run-script.ts`** - Utility to execute existing scripts with consistent logging.
- **`blueprint.ts`** - Blueprint discovery and parsing helpers.

### `/validation/` - Validation Scripts
Scripts that validate the marketplace integrity and compliance:

- **`validate-blueprints.ts`** - Main blueprint validator (templates, modifiers, structure)
- **`validate-templates.ts`** - Template existence and syntax validation
- **`validate-conflict-resolution.ts`** - Conflict resolution validation
- **`validate-contract-correctness.ts`** - Contract compliance validation
- **`validate-blueprint-actions.ts`** - Blueprint actions validation
- **`validate-blueprint-issues.ts`** - Common blueprint issues detection
- **`validate-blueprint-paths.ts`** - Blueprint path variables validation
- **`dead-template-detector.ts`** - Detects unused template files

### `/generation/` - Generation Scripts
Scripts that generate types, manifests, and other artifacts:

- **`generate-constitutional-types-cli.ts`** - CLI for type generation
- **`generate-constitutional-types.ts`** - Core type generation logic
- **`generate-constitutional-types-helpers.ts`** - Type generation utilities
- **`generate-feature-manifests.ts`** - Feature manifest generation
- **`generate-marketplace-manifest.ts`** - Marketplace manifest generation
- **`generate-capability-first-manifest.ts`** - Capability-first manifest generator

### `/utilities/` - Utility Scripts
Helper scripts and utilities:

- **`analyze-template-blueprint-consistency.ts`** - Cross-check template usage
- **`blueprint-parser.ts`** - Blueprint file parsing and analysis
- **`module-id-extractor.ts`** - Derive module IDs from file paths
- **`schema-loader.ts`** - Shared JSON schema loader
- **`template-path-resolver.ts`** - Template path resolution utilities
- **`ui-marketplace-discovery.ts`** - Locate UI marketplace overlays
- **`ui-param-filter.ts`** - Filter UI parameters for capability genomes

## 🚀 Usage

### Validation
```bash
# Run all validations
npm run validate:all

# Run specific validations
npm run validate:blueprints
npm run validate:templates
npm run validate:contracts
# Run comprehensive pass (alias for --all)
npm run validate -- --comprehensive
```

### Generation
```bash
# Generate types
npm run types:generate:constitutional

# Generate manifests
npm run generate:manifest
npm run generate:feature-manifests

# Generate schemas
npm run generate:schemas
```

### Utilities
```bash
# Fix conflicts
npm run fix:conflicts
```

## 📋 Script Categories

### Core Validation
- **Blueprint Structure**: Validates blueprint syntax and structure (`cli validate --blueprints`)
- **Template Integrity**: Ensures all templates exist and are valid
- **Contract Compliance**: Validates feature contracts against implementations
- **Conflict Resolution**: Checks for proper conflict handling

### Type Generation
- **Constitutional Types**: Generates TypeScript types for the Constitutional Architecture (`cli generate --types`)
- **Module Parameters**: Creates type-safe parameter interfaces
- **Genome Types**: Generates genome definition types with autocompletion

### Manifest Generation
- **Marketplace Manifest**: Creates the main marketplace index (`cli generate --manifest`)
- **Feature Manifests**: Generates individual feature manifests
- **Capability Types**: Creates capability type definitions

## 🔧 Development

When adding new scripts:

1. **Choose the right folder** based on the script's purpose
2. **Update package.json** with the new script command
3. **Use relative imports** when referencing other scripts
4. **Follow naming conventions** (kebab-case for files)
5. **Add documentation** in this README

## 📝 Notes

- All scripts use `tsx` for TypeScript execution
- Import paths are relative to the script's location
- Scripts should be self-contained and not depend on external state
- Use proper error handling and exit codes for CI/CD integration
