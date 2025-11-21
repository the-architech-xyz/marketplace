/**
 * Single Thought API Route (Hono)
 */

import { Context } from 'hono';
import { db } from '<%= importPath(paths.db) %>db';
// import { thoughts } from '<%= importPath(paths.db) %>db/schema';
import { UpdateThoughtDataSchema } from '<%= importPath(paths.lib) %>synap-capture/schemas';
// import { eq } from 'drizzle-orm';

// GET /api/thoughts/[id]
export async function getThought(c: Context) {
  try {
    const id = c.req.param('id');
    // TODO: Query thought from database
    // const thought = await db.select().from(thoughts).where(eq(thoughts.id, id)).limit(1);
    return c.json({ thought: null });
  } catch (error) {
    return c.json({ error: 'Failed to fetch thought' }, 500);
  }
}

// PATCH /api/thoughts/[id]
export async function updateThought(c: Context) {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const validatedData = UpdateThoughtDataSchema.parse(body);
    
    // TODO: Update thought in database
    // const [updated] = await db.update(thoughts)
    //   .set(validatedData)
    //   .where(eq(thoughts.id, id))
    //   .returning();
    
    return c.json({ thought: { id, ...validatedData } });
  } catch (error) {
    return c.json({ error: 'Failed to update thought' }, 500);
  }
}



