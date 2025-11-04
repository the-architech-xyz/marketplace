# Feature Blueprint UI Template Migration Plan

## Current State

### ✅ Already Using `ui/...` Convention
- `features/architech-welcome/blueprint.ts` - ✅ Complete

### ❌ Using Local Templates (Need Migration)
1. **Frontend Features** (UI-specific implementations):
   - `features/emailing/frontend/blueprint.ts` - 4 templates
   - `features/auth/frontend/blueprint.ts` - 22 templates  
   - `features/ai-chat/frontend/blueprint.ts` - 41 templates
   - `features/monitoring/shadcn/blueprint.ts` - 19 templates
   - `features/web3/shadcn/blueprint.ts` - 2 templates
   - `features/teams-management/frontend/blueprint.ts` - 9 templates
   - `features/payments/frontend/blueprint.ts` - 17 templates

**Total**: ~114 template references using local `templates/` pattern

---

## Migration Strategy

### Decision: Option B - Migrate to UI Convention

**Rationale**:
- UI templates exist in UI marketplace (`marketplace-shadcn/ui/`)
- Consistent with architecture (core = logic, UI = rendering)
- Enables multi-framework support (shadcn, tamagui)
- Aligns with `architech-welcome` pattern

---

## Template Mapping

### Feature: emailing/frontend
**Local Templates** → **UI Marketplace Templates**:
- `templates/EmailComposer.tsx.tpl` → `ui/emailing/EmailComposer.tsx.tpl` ✅
- `templates/EmailList.tsx.tpl` → `ui/emailing/EmailList.tsx.tpl` ✅
- `templates/TemplateManager.tsx.tpl` → `ui/emailing/TemplateManager.tsx.tpl` ✅
- `templates/emailing-page.tsx.tpl` → `ui/emailing/emailing-page.tsx.tpl` ✅

### Feature: auth/frontend
**Local Templates** → **UI Marketplace Templates**:
- `templates/login-page.tsx.tpl` → `ui/auth/login-page.tsx.tpl` ✅
- `templates/signup-page.tsx.tpl` → `ui/auth/signup-page.tsx.tpl` ✅
- `templates/AuthForm.tsx.tpl` → `ui/auth/AuthForm.tsx.tpl` ✅
- ... (check all 22 templates)

### Feature: ai-chat/frontend
**Local Templates** → **UI Marketplace Templates**:
- `templates/ChatInterface.tsx.tpl` → `ui/ai-chat/ChatInterface.tsx.tpl` ✅
- `templates/MessageBubble.tsx.tpl` → `ui/ai-chat/MessageBubble.tsx.tpl` ✅
- ... (check all 41 templates)

### Feature: monitoring/shadcn
**Local Templates** → **UI Marketplace Templates**:
- `templates/MonitoringDashboard.tsx.tpl` → `ui/monitoring/MonitoringDashboard.tsx.tpl` ❓
- (Check if UI marketplace has monitoring templates)

### Feature: payments/frontend
**Local Templates** → **UI Marketplace Templates**:
- `templates/PaymentForm.tsx.tpl` → `ui/payments/PaymentForm.tsx.tpl` ✅
- `templates/CheckoutForm.tsx.tpl` → `ui/payments/CheckoutForm.tsx.tpl` ✅
- ... (check all 17 templates)

### Feature: teams-management/frontend
**Local Templates** → **UI Marketplace Templates**:
- `templates/TeamsList.tsx.tpl` → `ui/teams-management/TeamsList.tsx.tpl` ✅
- ... (check all 9 templates)

### Feature: web3/shadcn
**Local Templates** → **UI Marketplace Templates**:
- `templates/WalletConnection.tsx.tpl` → `ui/web3/WalletConnection.tsx.tpl` ❓
- (Check if UI marketplace has web3 templates)

---

## Implementation Steps

### Step 1: Verify UI Marketplace Templates
- [ ] Check `marketplace-shadcn/ui/emailing/` has all templates
- [ ] Check `marketplace-shadcn/ui/auth/` has all templates
- [ ] Check `marketplace-shadcn/ui/ai-chat/` has all templates
- [ ] Check `marketplace-shadcn/ui/payments/` has all templates
- [ ] Check `marketplace-shadcn/ui/teams-management/` has all templates
- [ ] Check `marketplace-shadcn/ui/monitoring/` (if exists)
- [ ] Check `marketplace-shadcn/ui/web3/` (if exists)

### Step 2: Update Blueprints
For each frontend blueprint:
1. Change `template: 'templates/...'` → `template: 'ui/{feature}/...'`
2. Update comments to reflect new convention
3. Remove `requiresUI` from feature.json (if present)

### Step 3: Test
- [ ] Test with shadcn marketplace
- [ ] Test with tamagui marketplace (if templates exist)
- [ ] Verify all templates load correctly

### Step 4: Cleanup
- [ ] Remove local templates (or archive)
- [ ] Update documentation

---

## Files to Update

1. `features/emailing/frontend/blueprint.ts` - 4 changes
2. `features/auth/frontend/blueprint.ts` - 22 changes
3. `features/ai-chat/frontend/blueprint.ts` - 41 changes
4. `features/monitoring/shadcn/blueprint.ts` - 19 changes
5. `features/web3/shadcn/blueprint.ts` - 2 changes
6. `features/teams-management/frontend/blueprint.ts` - 9 changes
7. `features/payments/frontend/blueprint.ts` - 17 changes

**Total**: 7 blueprints, ~114 template path updates

---

## Template Path Pattern Changes

### Before
```typescript
{
  type: BlueprintActionType.CREATE_FILE,
  path: '${paths.components}emailing/EmailComposer.tsx',
  template: 'templates/EmailComposer.tsx.tpl'  // ← Local template
}
```

### After
```typescript
{
  type: BlueprintActionType.CREATE_FILE,
  path: '${paths.components}emailing/EmailComposer.tsx',
  template: 'ui/emailing/EmailComposer.tsx.tpl'  // ← UI marketplace convention
}
```

---

## About `${ui.path}` Variables

**Question**: Should blueprints use `${ui.path}` in template paths?

**Answer**: No - Use `ui/...` convention instead.

**Why**:
- `ui/...` convention is simpler and automatic
- `${ui.path}` is available in templates themselves (for imports, etc.)
- MarketplaceService handles `ui/...` resolution automatically

**Example**:
```typescript
// Blueprint (use convention)
template: 'ui/emailing/EmailComposer.tsx.tpl'

// Inside template file (can use variable if needed)
import { Button } from '${ui.path}/components/ui/button'
// But this is rare - usually use import aliases like '@/components/ui/button'
```

---

## Next Steps

1. **Verify UI marketplace templates exist** for all features
2. **Create missing templates** if needed
3. **Update blueprints** to use `ui/...` convention
4. **Test** with both shadcn and tamagui
5. **Cleanup** local templates

