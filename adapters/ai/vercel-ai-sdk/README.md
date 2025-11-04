# Vercel AI SDK Adapter

## 🎯 **Overview**

**Minimal adapter for Vercel AI SDK** - provides SDK initialization and configuration ONLY.

This is a TRUE adapter following the architectural principle: **Adapters configure, they don't implement.**

---

## ✅ **What This Adapter Provides**

1. **SDK Installation** - Installs Vercel AI SDK packages
2. **SDK Configuration** - `ai/config.ts` with provider settings
3. **SDK Clients** - `ai/client.ts` with pre-configured provider instances
4. **Types** - `ai/types.ts` with TypeScript definitions

**That's it!** Nothing more.

---

## ❌ **What This Adapter Does NOT Provide**

- ❌ **API Routes** → Those go in `features/ai-chat/backend/`
- ❌ **React Hooks** → Use Vercel AI SDK's `'ai/react'` directly
- ❌ **Database** → That goes in `features/ai-chat/database/`
- ❌ **Business Logic** → That goes in `features/ai-chat/backend/`
- ❌ **UI Components** → Those go in `features/ai-chat/frontend/`

---

## 🔄 **Architecture**

```
adapters/ai/vercel-ai-sdk/           ← YOU ARE HERE
├── SDK initialization
└── Provider configuration
    ↓
features/ai-chat/database/drizzle/   ← Database persistence
    ↓
features/ai-chat/backend/vercel-ai-nextjs/ ← API routes + business logic
    ↓
features/ai-chat/tech-stack/         ← Generic hooks (wraps SDK)
    ↓
features/ai-chat/frontend/shadcn/    ← UI components
```

---

## 🎨 **Usage**

### **1. Install the Adapter**

```bash
architech add ai/vercel-ai-sdk
```

### **2. Use SDK Clients in Backend**

```typescript
// app/api/chat/route.ts
import { openai } from '@/lib/ai/client';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const result = await streamText({
    model: openai('gpt-4'),
    messages,
  });
  
  return result.toDataStreamResponse();
}
```

### **3. Use Vercel AI SDK Hooks in Frontend**

```typescript
// components/ChatInterface.tsx
import { useChat } from 'ai/react'; // ← Use SDK directly!

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });
  
  return (
    <form onSubmit={handleSubmit}>
      {messages.map(message => (
        <div key={message.id}>{message.content}</div>
      ))}
      <input value={input} onChange={handleInputChange} />
      <button type="submit">Send</button>
    </form>
  );
}
```

---

## 📁 **Generated Files**

```
lib/
└── ai/
    ├── config.ts      # AI configuration (models, providers, defaults)
    ├── client.ts      # Pre-configured SDK clients (openai, anthropic, etc.)
    └── types.ts       # TypeScript type definitions
```

---

## ⚙️ **Configuration**

### **Environment Variables**

```env
# OpenAI (required)
OPENAI_API_KEY=sk-...

# Anthropic (required)
ANTHROPIC_API_KEY=sk-ant-...

# Optional providers
GOOGLE_API_KEY=...
COHERE_API_KEY=...
HUGGINGFACE_API_KEY=...
```

### **Module Parameters**

```typescript
{
  providers: ['openai', 'anthropic', 'google'],  // AI providers to include
  defaultModel: 'gpt-4',                          // Default model
  maxTokens: 1000,                                // Default max tokens
  temperature: 0.7,                               // Default temperature
  features: {
    streaming: true,                              // Enable streaming
    tools: false,                                 // Enable function calling
    embeddings: false,                            // Enable embeddings
  }
}
```

---

## 🔑 **Key Principles**

### **1. Adapter Role**

```
✅ GOOD: SDK initialization
✅ GOOD: Provider configuration  
✅ GOOD: Type definitions

❌ BAD: API routes
❌ BAD: Business logic
❌ BAD: Database operations
❌ BAD: UI components
```

### **2. Vercel AI SDK Integration**

```typescript
// ✅ CORRECT: Use SDK directly
import { useChat } from 'ai/react';
import { streamText } from 'ai';

// ❌ WRONG: Don't wrap SDK unnecessarily
// import { useChat } from '@/hooks/use-chat'; // No!
```

### **3. Persistence**

```
Vercel AI SDK = Streaming only (ephemeral)
Database Layer = Persistence (permanent)

→ Combine both for complete solution!
```

---

## 🚀 **Next Steps**

After installing this adapter:

1. **Add Database Layer** (for persistence)
   ```bash
   architech add features/ai-chat/database/drizzle
   ```

2. **Add Backend** (for API routes + business logic)
   ```bash
   architech add features/ai-chat/backend/vercel-ai-nextjs
   ```

3. **Add Frontend** (for UI components)
   ```bash
   architech add features/ai-chat/frontend/shadcn
   ```

---

## 📚 **Related Documentation**

- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [AI Chat Backend Feature](../../features/ai-chat/backend/vercel-ai-nextjs/README.md)
- [AI Chat Database Layer](../../features/ai-chat/database/drizzle/README.md)

---

## 💡 **Why This Design?**

### **Problem**

Many AI integrations mix concerns:
- SDK initialization in API routes
- Business logic in hooks
- Database code everywhere
- Unclear separation

### **Solution**

**Separation of Concerns:**

1. **Adapter** = SDK wiring
2. **Database** = Persistence
3. **Backend** = API routes + business logic
4. **Tech-Stack** = Generic hooks
5. **Frontend** = UI

**Result:** Clean, maintainable, testable architecture! ✨

---

**Document Version:** 2.0  
**Created:** January 2025  
**Updated:** Simplified to minimal adapter role



