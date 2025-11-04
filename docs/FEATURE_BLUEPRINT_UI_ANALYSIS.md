# Feature Blueprint UI Template Analysis

## Current State Analysis

### Feature Categories

#### 1. Core/Tech-Stack Features (Framework-Agnostic)
**Pattern**: Feature has `requiresUI` in feature.json, UI templates in UI marketplace

**Example**: `features/architech-welcome`
- ✅ Already updated to use `ui/...` convention
- Uses: `template: 'ui/architech-welcome/welcome-page.tsx.tpl'`
- UI templates in: `marketplace-shadcn/ui/architech-welcome/`

---

#### 2. UI-Specific Frontend Features
**Pattern**: Feature is already UI-specific (e.g., `features/emailing/frontend/shadcn`)

**Examples**:
- `features/emailing/frontend/blueprint.ts` → Uses `template: 'templates/EmailComposer.tsx.tpl'`
- `features/auth/frontend/blueprint.ts` → Uses `template: 'templates/login-page.tsx.tpl'`
- `features/ai-chat/frontend/blueprint.ts` → Uses `template: 'templates/ChatInterface.tsx.tpl'`
- `features/monitoring/shadcn/blueprint.ts` → Uses `template: 'templates/MonitoringDashboard.tsx.tpl'`
- `features/web3/shadcn/blueprint.ts` → Uses `template: 'templates/WalletConnection.tsx.tpl'`

**Observation**: These reference **local templates** in their own `templates/` directory, but UI templates ALSO exist in `marketplace-shadcn/ui/`:
- `marketplace-shadcn/ui/emailing/EmailComposer.tsx.tpl`
- `marketplace-shadcn/ui/auth/login-page.tsx.tpl`
- `marketplace-shadcn/ui/ai-chat/ChatInterface.tsx.tpl`
- `marketplace-shadcn/ui/monitoring/` (but monitoring/shadcn has local templates)

**Question**: Should these frontend features:
- **Option A**: Keep using local templates (they're already UI-specific)
- **Option B**: Use `ui/...` convention to reference UI marketplace templates
- **Option C**: Both (local for custom logic, `ui/...` for shared UI components)

---

### Current Template Path Patterns

#### Pattern 1: Local Templates (Most Common)
```typescript
{
  type: BlueprintActionType.CREATE_FILE,
  path: '${paths.components}emailing/EmailComposer.tsx',
  template: 'templates/EmailComposer.tsx.tpl'  // ← Local template
}
```
**Used by**: All frontend features (emailing, auth, ai-chat, monitoring, web3, teams-management)

#### Pattern 2: UI Marketplace Convention (New)
```typescript
{
  type: BlueprintActionType.CREATE_FILE,
  path: '${paths.app_root}page.tsx',
  template: 'ui/architech-welcome/welcome-page.tsx.tpl'  // ← UI marketplace
}
```
**Used by**: `architech-welcome` (core feature)

#### Pattern 3: Absolute Paths (Legacy)
```typescript
// Not found in current codebase - already removed
```

---

## Key Findings

### ✅ What's Already Correct

1. **architech-welcome** - Uses `ui/...` convention ✅
2. **All frontend features** - Use local templates (works, but could be improved)

### ❓ What Needs Clarification

**Frontend features currently have DUPLICATE templates**:
- Local templates in `features/{feature}/frontend/templates/`
- UI marketplace templates in `marketplace-shadcn/ui/{feature}/`

**Questions**:
1. Should frontend features move to `ui/...` convention?
2. Should local templates be removed in favor of UI marketplace?
3. Or should they coexist (local for feature-specific, `ui/...` for shared)?

---

## Proposed Strategy

### Option A: Keep Current Pattern (Pragmatic)
**Frontend features keep local templates** - They're already UI-specific, local templates are fine.

**Pros**:
- No migration needed
- Features remain self-contained
- Faster to implement

**Cons**:
- Duplication (templates in both places)
- Harder to share UI templates across features
- Can't easily switch UI frameworks

---

### Option B: Migrate to UI Convention (Ideal)
**Frontend features use `ui/...` convention** - Move templates to UI marketplace, reference via convention.

**Pros**:
- Single source of truth (templates in UI marketplace)
- Easy to switch UI frameworks (shadcn vs tamagui)
- Templates can be shared across features
- Consistent with architecture

**Cons**:
- Migration effort (move templates, update blueprints)
- Need to ensure templates exist in UI marketplace

---

### Option C: Hybrid Approach (Flexible)
**Core features use `ui/...`, frontend features can use either** - Best of both worlds.

**Pros**:
- Core features framework-agnostic (use `ui/...`)
- Frontend features can use local templates (faster development)
- Can gradually migrate frontend features

**Cons**:
- Mixed patterns (need to document when to use what)
- Templates may exist in both places during migration

---

## Recommendation

**Option B: Migrate to UI Convention**

**Rationale**:
1. **Consistency**: All UI templates should be in UI marketplaces
2. **Flexibility**: Easy to support multiple UI frameworks (shadcn, tamagui, mui)
3. **Architecture**: Aligns with separation of concerns (core = logic, UI = rendering)
4. **Future-proof**: Makes it easier to add new UI frameworks

**Migration Plan**:
1. Verify UI marketplace templates exist for each feature
2. Update frontend blueprints to use `ui/...` convention
3. Remove local templates (or keep as fallback initially)
4. Test with both shadcn and tamagui

---

## Implementation Plan

### Phase 1: Analysis
- [x] Identify all feature blueprints
- [x] Map current template patterns
- [x] Identify UI marketplace templates
- [ ] Check for template conflicts/duplicates

### Phase 2: Decision
- [ ] Decide on migration strategy (Option A, B, or C)
- [ ] Document decision and rationale

### Phase 3: Migration (if Option B)
- [ ] Update `features/emailing/frontend/blueprint.ts`
- [ ] Update `features/auth/frontend/blueprint.ts`
- [ ] Update `features/ai-chat/frontend/blueprint.ts`
- [ ] Update `features/monitoring/shadcn/blueprint.ts`
- [ ] Update `features/web3/shadcn/blueprint.ts`
- [ ] Update `features/teams-management/frontend/blueprint.ts`
- [ ] Update `features/payments/frontend/blueprint.ts`

### Phase 4: Cleanup
- [ ] Remove local templates (or archive)
- [ ] Update feature.json files (remove `requiresUI` if not needed)
- [ ] Test with both shadcn and tamagui

---

## Files to Update (if Option B)

1. `features/emailing/frontend/blueprint.ts` - 4 template references
2. `features/auth/frontend/blueprint.ts` - ~15 template references
3. `features/ai-chat/frontend/blueprint.ts` - ~30 template references
4. `features/monitoring/shadcn/blueprint.ts` - ~15 template references
5. `features/web3/shadcn/blueprint.ts` - 2 template references
6. `features/teams-management/frontend/blueprint.ts` - Unknown count
7. `features/payments/frontend/blueprint.ts` - Unknown count

**Total**: ~7 blueprints, ~70+ template references

---

## Questions for User

1. **Should frontend features migrate to `ui/...` convention?**
   - Or keep local templates?

2. **What about templates that exist in both places?**
   - Remove local? Keep as fallback? Merge?

3. **Should we use `${ui.path}` variables in templates themselves?**
   - Or just use `ui/...` convention in blueprint template paths?

4. **Migration priority?**
   - All at once? Or gradual?

