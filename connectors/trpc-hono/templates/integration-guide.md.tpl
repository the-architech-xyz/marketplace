# tRPC + Hono Integration Guide

To mount tRPC in your Hono app, add the following to `app.ts` before the `export default app` statement:

```typescript
// tRPC integration
import { trpcHandler } from './trpc/handler';

// Mount tRPC handler
app.all('<%= params.path || "/trpc" %>/*', async (c) => {
  return await trpcHandler(c.req.raw);
});
```

This will make tRPC available at the `<%= params.path || "/trpc" %>` endpoint.

