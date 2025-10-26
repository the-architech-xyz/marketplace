# Email Tech-Stack Layer

## Architecture Overview

The email tech-stack layer follows a **standard + override** pattern:

```
tech-stack/emailing/
├── standard/              # Generic TanStack Query hooks (Priority: 1)
│   └── templates/
│       ├── hooks.ts.tpl   # fetch-based hooks (DEFAULT)
│       ├── schemas.ts.tpl # Zod schemas
│       ├── types.ts.tpl   # TypeScript types
│       └── stores.ts.tpl  # Zustand stores
└── overrides/             # SDK-specific hooks (Priority: 2) - FUTURE
    └── (none currently)   # Resend is server-only, no client hooks needed
```

## Current Architecture

### ✅ Email is Server-Only
Unlike auth (Better Auth has client hooks), email services like **Resend** are **server-only**:
- No client-side SDK
- No React hooks from Resend
- All email sending happens server-side

**Result:** The current **standard hooks** (fetch-based) are perfect! No override needed.

---

## How It Works

### 1. Standard Layer (Priority: 1) ✅
Generic TanStack Query hooks that call server APIs:
- **Hooks**: TanStack Query hooks using `fetch('/api/email/*')`
- **Schemas**: Zod validation schemas
- **Types**: TypeScript types from contract
- **Stores**: Zustand stores for UI state

### 2. Connector Layer (Priority: 2)
Framework-specific wiring (NOT in tech-stack):
- **resend-nextjs**: Next.js config, API routes, email sender
- **resend-remix**: (future) Remix config, actions
- **resend-expo**: (future) Expo config (if backend API)

---

## File Generation Flow

1. **Standard layer generates** (default for ALL email providers):
   - `@/lib/emailing/hooks.ts` (fetch-based - perfect!)
   - `@/lib/emailing/schemas.ts` (Zod)
   - `@/lib/emailing/types.ts` (TypeScript)
   - `@/lib/emailing/stores.ts` (Zustand)

2. **Connector adds** (if Resend + Next.js selected):
   - `@/lib/emailing/config.ts` (Resend config)
   - `@/lib/emailing/sender.ts` (Email sender util)
   - `app/api/email/send/route.ts` (API route)

3. **Backend feature adds** (if templates/campaigns selected):
   - `app/api/email/templates/route.ts` (Templates API)
   - `app/api/email/campaigns/route.ts` (Campaigns API)
   - Template management logic
   - Campaign management logic

---

## Why No Override for Resend?

### Server-Only SDKs
```typescript
// Resend SDK (server-only)
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

// Used ONLY in API routes
await resend.emails.send({...});

// ❌ No client-side hooks
// ❌ No authClient.useSession() equivalent
// ❌ All email operations are server-side
```

### Standard Hooks Work Perfect
```typescript
// Frontend uses standard TanStack Query hooks
import { useEmailSend } from '@/lib/emailing/hooks';

const { mutate: sendEmail } = useEmailSend();

// Calls: POST /api/email/send
// Server uses Resend SDK
// Perfect separation!
```

---

## Future Override Example

If a client-side email SDK ever exists (hypothetical):

```
tech-stack/emailing/overrides/hypothetical-sdk/
├── override.json
├── blueprint.ts
└── templates/
    ├── client.ts.tpl
    └── hooks.ts.tpl
```

**But currently:** No email SDKs have client-side hooks, so no overrides needed!

---

## Comparison with Auth

| Aspect | Auth (Better Auth) | Email (Resend) |
|--------|-------------------|----------------|
| **Client-side SDK** | ✅ Yes (`authClient`) | ❌ No |
| **React Hooks** | ✅ Yes (`useSession`) | ❌ No |
| **Override Needed** | ✅ Yes | ❌ No |
| **Standard Hooks** | Replaced by SDK | ✅ Perfect as-is |

---

## Benefits

### ✅ Simple Architecture
- No override needed
- Standard hooks work perfectly
- Clear server/client separation

### ✅ Framework Agnostic
```typescript
// Same hooks work with:
- Resend (server-side)
- SendGrid (server-side)
- Mailgun (server-side)
- Custom SMTP (server-side)

// Frontend always:
import { useEmailSend } from '@/lib/emailing/hooks';
```

### ✅ Easy to Extend
```typescript
// Add new email provider:
connectors/email/sendgrid-nextjs/
├── config.ts.tpl       # SendGrid config
├── sender.ts.tpl       # SendGrid sender
└── send-route.ts.tpl   # API route

// Frontend hooks: Already there! No changes needed!
```

---

## Usage

### Sending Email (Frontend)
```typescript
import { useEmailSend } from '@/lib/emailing/hooks';

function MyComponent() {
  const { mutate: sendEmail, isPending } = useEmailSend();
  
  const handleSend = () => {
    sendEmail({
      to: 'user@example.com',
      subject: 'Hello',
      html: '<p>Hello world!</p>'
    });
  };
  
  return <button onClick={handleSend} disabled={isPending}>Send</button>;
}
```

### Email Templates (Frontend)
```typescript
import { useTemplatesList, useEmailSendTemplate } from '@/lib/emailing/hooks';

function TemplateManager() {
  const { data: templates } = useTemplatesList();
  const { mutate: sendTemplate } = useEmailSendTemplate();
  
  const handleSendTemplate = (templateName: string) => {
    sendTemplate({
      templateName,
      to: 'user@example.com',
      variables: { name: 'John' }
    });
  };
  
  return <div>{/* ... */}</div>;
}
```

### Email Campaigns (Frontend)
```typescript
import { useCampaignsList, useCampaignsStart } from '@/lib/emailing/hooks';

function CampaignManager() {
  const { data: campaigns } = useCampaignsList();
  const { mutate: startCampaign } = useCampaignsStart();
  
  return <div>{/* ... */}</div>;
}
```

---

## Architecture Validation

### ✅ Follows Principles
1. **Tech-stack is contract** - Hooks define data layer
2. **Standard hooks are default** - fetch-based works perfect
3. **Connectors handle wiring** - Server-side SDK integration
4. **UI imports centralized** - Always `@/lib/emailing/hooks`

### ✅ Server/Client Separation
```typescript
// Client: Standard TanStack Query hooks
import { useEmailSend } from '@/lib/emailing/hooks';

// Server: SDK-specific implementation
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
```

### ✅ Architecturally Correct
- Hooks in **tech-stack standard** (not connector) ✅
- Server SDK in **connector** (framework-specific) ✅
- Clear priorities (1 → 2) ✅
- No unnecessary complexity ✅

---

## Migration Notes

**No migration needed!** The current structure is already optimal:
- ✅ Standard hooks in tech-stack
- ✅ Server SDK in connector
- ✅ Clear separation of concerns

---

**Status:** ✅ **EMAIL ARCHITECTURE ALREADY CORRECT**

**No changes needed!** Email follows best practices by default.

**Future:** Add overrides folder structure for potential future SDKs (but currently none exist).

---

**Document Version:** 1.0  
**Last Updated:** January 2025


