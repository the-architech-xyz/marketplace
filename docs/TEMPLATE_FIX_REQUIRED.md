# Template Fix Required: JSX Syntax Error

## Problem

UI marketplace templates use `${}` for JSX object props, but JSX requires `{}`.

**Current (Wrong)**:
```tsx
initial=${ opacity: 0, y: 20 }
```

**Should Be**:
```tsx
initial={{ opacity: 0, y: 20 }}
```

## Root Cause

Templates use EJS syntax (`<%= %>`) for variables, but mistakenly use `${}` for JSX object literals. JSX requires `{}` for object props, not `${}`.

## Files to Fix

All files in `marketplace-shadcn/ui/architech-welcome/`:
1. `welcome-page.tsx.tpl` - 24 occurrences
2. `welcome-layout.tsx.tpl` - 3 occurrences  
3. `tech-stack-card.tsx.tpl` - 3 occurrences
4. `component-showcase.tsx.tpl` - Unknown count
5. `project-structure.tsx.tpl` - 6 occurrences
6. `quick-start-guide.tsx.tpl` - 5 occurrences

**Total**: ~41+ occurrences across 6 files

## Fix Pattern

**Find**: `initial=${` → **Replace**: `initial={{`
**Find**: `animate=${` → **Replace**: `animate={{`
**Find**: `transition=${` → **Replace**: `transition={{`
**Find**: `whileHover=${` → **Replace**: `whileHover={{`
**Find**: `whileTap=${` → **Replace**: `whileTap={{`

**And close with**: `}` → `}}`

## Additional Issues

1. **Missing Dependencies**: `framer-motion` not in package.json
2. **Missing Components**: Badge, Checkbox, Switch, Tabs, Alert not generated
3. **Incomplete Rendering**: Page sections commented out

## Priority

**CRITICAL** - Project cannot build without this fix.


