# Marketplace Scripts Audit & Consolidation Plan

## 1. Current Footprint

- **Build**: `scripts/build/run.ts`
- **Generation**: 10 Type/manifest utilities (`generation/*`)
- **Validation**: 9 one-off validators (`validation/*`)
- **Utilities**: 11 ad-hoc maintenance scripts (`utilities/*`) plus root helpers
- **CLI entry points**: package.json exposes 18 commands pointing directly to individual files

This fragmentation leads to duplicated logic, drift (README no longer matches reality), and scripts that still reference pre-refactor behaviour (e.g. targetPackage helpers).

## 2. Overlap & Redundancy Snapshot

| Area | Script(s) | Observation | Evidence | Suggested Action |
|------|-----------|-------------|----------|------------------|
| Capability type generation | `generation/generate-constitutional-types.ts`, ~~`generation/generate-capability-types.ts`~~ | Constitutional generator already emits capability types (`await this.generateCapabilityTypes(...)`) | ```88:92:marketplace/scripts/generation/generate-constitutional-types.ts
    const capabilityAnalysis = await this.capabilityAnalyzer.analyzeCapabilities();
    await this.generateCapabilityTypes(capabilityAnalysis);
``` | ✅ Removed redundant generator |
| Manifest metadata helpers | `generation/generate-marketplace-manifest.ts`, `generation/generate-capability-first-manifest.ts`, ~~`generation/module-metadata-helpers.ts`~~ | Both manifest scripts needed shared helpers (see repeated comments “reuses logic…”) | ```231:372:marketplace/scripts/generation/generate-capability-first-manifest.ts
// Reuse logic from generate-marketplace-manifest.ts
``` | ✅ Extracted helpers to `scripts/lib/manifest.ts` |
| Target package maintenance | ~~`utilities/add-target-package-to-types.ts`~~, ~~`utilities/remove-target-package-from-genomes.ts`~~, ~~`utilities/remove-target-package-from-types.ts`~~ | Legacy hotfixes predating unified Module type; now harmful | *(scripts removed)* | ✅ Deleted legacy utilities |
| Validation runners | 9 individual `validate-*.ts` scripts invoked separately | Each script re-scans marketplace & re-parses blueprints; `npm run validate:legacy` chains them manually | | Build a single `scripts/cli.ts validate --all/--templates/...` orchestrator with shared parsing utilities |
| Capability resolver | ~~`generation/capability-resolver.ts`~~ | Not imported anywhere (CLI now relies on pre-transformed genomes) | 🔍 Self-referential only | ✅ Removed |
| README accuracy | `scripts/README.md` | Mentions scripts that no longer exist (`fix-conflict-resolution.ts`, `generate-schemas-from-contracts.ts`) and misses new ones | | Rewrite after consolidation |

## 3. Consolidation Blueprint

### 3.1 Directory Layout

```
scripts/
  cli.ts                # single entry point (tsx scripts/cli.ts <command>)
  lib/
    blueprint.ts        # parsing & validation helpers
    manifest.ts         # shared manifest utilities
    capability.ts       # analyzer + resolver shared logic
    templates.ts        # template discovery (ui marketplace, etc.)
  tasks/
    validate.ts         # orchestrates validate subcommands
    generate.ts         # types/manifests
    build.ts            # wraps current build/run orchestrator logic
  legacy/               # temporary parking for removed scripts (optional)
```

### 3.2 Command Surface (single CLI)

| Command | Replaces | Notes |
|---------|----------|-------|
| `scripts/cli.ts validate [--blueprints --templates --contracts --all]` | Every `validate-*.ts` script & `npm run validate:*` entries | Use shared loader in `lib/blueprint.ts` to avoid re-reading FS |
| `scripts/cli.ts validate --templates` | `scripts/validation/validate-templates.ts` | Wrapper added (still shells out today, future inline optimisations) |
| `scripts/cli.ts generate types` | `generate-constitutional-types-cli.ts` | CLI delegates to existing generator |
| `scripts/cli.ts generate manifest` | `generate-marketplace-manifest.ts` | Supports additional flags; currently shells out |
| `scripts/cli.ts build` | `scripts/build/run.ts` | Delegates to existing build orchestrator |
| `scripts/cli.ts utilities fix-use-client` | `fix-use-client-directives.mjs` | Exposes maintenance helpers under one namespace |

### 3.3 Removal List (post-migration)

- ~~`generation/capability-resolver.ts`~~
- Any other one-off “hotfix” scripts superseded by type unification

### 3.4 Refactor Steps

1. **Phase 1 – Shared Library Extraction**
   - Introduce `scripts/lib/{blueprint,manifest,capability,templates}.ts`
   - Move duplicated helpers from validation & manifest scripts *(manifest helpers ✅)*
   - Ensure existing scripts import from library (no behaviour change)

2. **Phase 2 – CLI Wrapper**
   - ✅ Create `scripts/cli.ts` with subcommand router (lightweight custom parser)
   - ✅ Implement `validate`, `generate`, `build`, `utilities` commands (currently shelling out to legacy scripts)
   - ☐ Deprecate direct npm scripts, map to CLI commands in `package.json`

3. **Phase 3 – Purge & Rename**
   - ✅ Remove redundant scripts (targetPackage utilities, capability type generator, module metadata helpers)
   - ✅ Update `package.json` scripts to run `tsx scripts/cli.ts ...`
   - ✅ Rewrite `scripts/README.md` documenting new command surface

4. **Phase 4 – CI/Docs Alignment**
   - Adjust workflows or docs referencing old commands (`docs/MANIFEST_V2_GUIDE.md`, etc.)
   - Ensure `build/run.ts` logic now resides in CLI `build` command

### 3.5 Safeguards

- Add unit/integration coverage for `lib` helpers (can live beside scripts)
- Provide migration shim: keep old filenames exporting CLI calls temporarily with deprecation warning if external tooling still invokes them directly
- Use type-safe enums/interfaces for command args (no `any`)

## 4. Immediate Next Actions

1. Implement Phase 1 extraction for manifest + capability helpers.
2. Draft CLI skeleton with `validate` + `generate types` commands.
3. Remove obsolete targetPackage utilities & capability types generator once CLI consumes shared helpers.
4. Update documentation & package scripts in lock-step to avoid broken commands.

Once these are in place, the marketplace scripts shrink to a coherent toolchain, eliminating redundant generators and manual patch scripts while keeping the door open for future automation (e.g., template linting) via shared libs instead of ad-hoc files.


