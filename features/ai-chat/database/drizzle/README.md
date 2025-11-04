# AI Chat Database Layer (Drizzle)

## 🎯 **Overview**

This is the **database layer** for the AI Chat feature. It provides persistence for chat conversations, messages, custom prompts, and usage analytics.

**Important:** This layer complements Vercel AI SDK - the SDK handles streaming, this layer handles persistence.

## 📊 **Database Schema**

### **Tables**

1. **`ai_conversations`**
   - Chat sessions/conversations
   - Model configuration (GPT-4, Claude, etc.)
   - Statistics (tokens, cost, message count)
   - Status (active, archived, deleted)

2. **`ai_messages`**
   - Individual messages within conversations
   - Role (user, assistant, system, function)
   - Content and metadata
   - Token count and cost
   - Attachments and function calls

3. **`ai_prompts`**
   - Custom prompt library
   - Private, team, or public prompts
   - Categories and tags
   - Usage tracking

4. **`ai_usage`**
   - Token usage tracking
   - Cost tracking
   - Analytics data

5. **`ai_conversation_shares`** (Optional)
   - Shareable conversation links
   - Access control
   - View tracking

---

## 🔑 **Key Features**

### **1. Conversation Management**
```typescript
// Create conversation
const [conversation] = await db.insert(aiConversations).values({
  userId: 'user_123',
  title: 'My Chat',
  model: 'gpt-4',
  provider: 'openai',
}).returning();

// List conversations
const conversations = await db.query.aiConversations.findMany({
  where: eq(aiConversations.userId, 'user_123'),
  orderBy: desc(aiConversations.lastMessageAt),
});
```

### **2. Message Persistence**
```typescript
// Save messages after streaming completes
await db.insert(aiMessages).values([
  {
    conversationId: conversation.id,
    role: 'user',
    content: 'Hello, AI!',
  },
  {
    conversationId: conversation.id,
    role: 'assistant',
    content: 'Hello! How can I help you today?',
    tokens: 15,
    cost: 2, // cents
  },
]);
```

### **3. Usage Analytics**
```typescript
// Track usage
await db.insert(aiUsage).values({
  userId: 'user_123',
  conversationId: conversation.id,
  model: 'gpt-4',
  provider: 'openai',
  promptTokens: 50,
  completionTokens: 100,
  totalTokens: 150,
  cost: 10, // cents
});

// Get monthly usage
const usage = await db.select({
  totalTokens: sum(aiUsage.totalTokens),
  totalCost: sum(aiUsage.cost),
}).from(aiUsage)
  .where(and(
    eq(aiUsage.userId, 'user_123'),
    gte(aiUsage.createdAt, startOfMonth)
  ));
```

### **4. Custom Prompts**
```typescript
// Save custom prompt
await db.insert(aiPrompts).values({
  userId: 'user_123',
  name: 'Code Reviewer',
  prompt: 'Review this code for best practices...',
  category: 'coding',
  visibility: 'private',
});

// Use prompt
const prompt = await db.query.aiPrompts.findFirst({
  where: eq(aiPrompts.id, 'prompt_123'),
});
// Apply prompt in conversation
```

---

## 🔄 **Integration with Vercel AI SDK**

### **Backend API Route Example**

```typescript
// app/api/chat/route.ts
import { StreamingTextResponse } from 'ai';
import { openai } from '@/lib/ai/config';
import { db } from '@/lib/db';
import { aiConversations, aiMessages } from '@/lib/db/schema/ai-chat';

export async function POST(req: Request) {
  const { messages, conversationId, userId } = await req.json();
  
  // Load or create conversation
  let conversation;
  if (conversationId) {
    conversation = await db.query.aiConversations.findFirst({
      where: eq(aiConversations.id, conversationId)
    });
  } else {
    [conversation] = await db.insert(aiConversations).values({
      userId,
      title: messages[0]?.content.slice(0, 50) || 'New Chat',
      model: 'gpt-4',
      provider: 'openai',
    }).returning();
  }
  
  // Stream from Vercel AI SDK
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages,
    stream: true,
  });
  
  // Track response for saving
  let fullResponse = '';
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullResponse += content;
        controller.enqueue(content);
      }
      
      // Save messages after streaming completes
      await db.insert(aiMessages).values([
        {
          conversationId: conversation.id,
          role: 'user',
          content: messages[messages.length - 1].content,
        },
        {
          conversationId: conversation.id,
          role: 'assistant',
          content: fullResponse,
        },
      ]);
      
      // Update conversation stats
      await db.update(aiConversations)
        .set({
          totalMessages: conversation.totalMessages + 2,
          lastMessageAt: new Date(),
        })
        .where(eq(aiConversations.id, conversation.id));
      
      controller.close();
    },
  });
  
  return new StreamingTextResponse(stream);
}
```

---

## 🎨 **Usage**

### **Load Chat History**

```typescript
// Get conversation with messages
const conversation = await db.query.aiConversations.findFirst({
  where: eq(aiConversations.id, conversationId),
  with: {
    messages: {
      orderBy: asc(aiMessages.createdAt),
    },
  },
});
```

### **Search Conversations**

```typescript
// Search by title
const conversations = await db.query.aiConversations.findMany({
  where: and(
    eq(aiConversations.userId, userId),
    ilike(aiConversations.title, `%${searchTerm}%`)
  ),
});
```

### **Archive Conversation**

```typescript
await db.update(aiConversations)
  .set({ status: 'archived' })
  .where(eq(aiConversations.id, conversationId));
```

---

## 🔄 **Relation to Other Modules**

```
features/ai-chat/database/drizzle/     ← YOU ARE HERE
  ↓ provides schema
adapters/ai/vercel-ai-sdk/              ← SDK for streaming
  ↓ used by
features/ai-chat/backend/vercel-ai-nextjs/ ← API routes (SDK + DB)
  ↓ provides API
features/ai-chat/tech-stack/            ← Generic hooks
  ↓ provides UI hooks
features/ai-chat/frontend/shadcn/       ← UI components
```

---

## 📁 **Files**

- **`feature.json`**: Module metadata
- **`blueprint.ts`**: Blueprint for generating schema and migrations
- **`templates/schema.ts.tpl`**: Drizzle schema definition
- **`templates/migration.sql.tpl`**: SQL migration file
- **`README.md`**: This file

---

## 🚀 **Benefits**

### **1. Persistent Chat History**
- Users don't lose conversations on page refresh
- Can resume conversations anytime
- Full message history

### **2. Analytics & Billing**
- Track token usage per user
- Calculate costs
- Monitor AI spending

### **3. Custom Prompts**
- Save frequently used prompts
- Share prompts with team
- Build prompt library

### **4. Conversation Management**
- Archive old conversations
- Search conversations
- Share conversations (optional)

---

## 💡 **Architecture Notes**

### **Vercel AI SDK Role**
- ✅ Handles real-time streaming
- ✅ Provides React hooks
- ✅ Manages provider connections
- ❌ Does NOT handle persistence

### **Database Layer Role**
- ✅ Stores conversations permanently
- ✅ Tracks usage and costs
- ✅ Manages custom prompts
- ✅ Enables analytics

**Together:** Best of both worlds! 🎉

---

**Document Version:** 1.0  
**Created:** January 2025



