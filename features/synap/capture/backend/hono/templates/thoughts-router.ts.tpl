/**
 * Thoughts Router (Hono)
 * 
 * Hono router for thoughts endpoints
 * Mount this in the main app: app.route('/api/thoughts', thoughtsRouter)
 */

import { Hono } from 'hono';
import { db } from '<%= importPath(paths.db) %>db';
// import { thoughts } from '<%= importPath(paths.db) %>db/schema';
import { CreateThoughtDataSchema, UpdateThoughtDataSchema } from '<%= importPath(paths.lib) %>synap-capture/schemas';
import { inngest } from '<%= importPath(paths.jobs) %>jobs/inngest/client';
import { createId } from '@paralleldrive/cuid2';
// import { eq } from 'drizzle-orm';

const thoughtsRouter = new Hono();

// GET /api/thoughts - List thoughts
thoughtsRouter.get('/', async (c) => {
  try {
    // TODO: Get userId from auth middleware
    const userId = 'user-id'; // Replace with actual auth
    
    // TODO: Query thoughts from database
    // const thoughtsList = await db.select().from(thoughts).where(eq(thoughts.userId, userId));
    
    return c.json({ thoughts: [] });
  } catch (error) {
    console.error('Error fetching thoughts:', error);
    return c.json({ error: 'Failed to fetch thoughts' }, 500);
  }
});

// POST /api/thoughts - Create thought
thoughtsRouter.post('/', async (c) => {
  try {
    // TODO: Get userId from auth middleware
    const userId = 'user-id'; // Replace with actual auth
    
    const body = await c.req.json();
    const validatedData = CreateThoughtDataSchema.parse(body);
    
    // TODO: Insert thought into database
    // const [newThought] = await db.insert(thoughts).values({
    //   id: createId(),
    //   userId,
    //   ...validatedData,
    //   status: 'analyzing',
    // }).returning();
    
    // Trigger Inngest event for AI analysis
    await inngest.send({
      name: 'thought.created',
      data: {
        // thoughtId: newThought.id,
        // content: newThought.content,
        // type: newThought.type,
      }
    });
    
    // Return created thought
    return c.json({
      thought: {
        id: createId(),
        ...validatedData,
        status: 'analyzing',
      },
      success: true
    }, 201);
  } catch (error) {
    console.error('Error creating thought:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return c.json({ error: 'Validation failed', details: error.message }, 400);
    }
    return c.json({ error: 'Failed to create thought' }, 500);
  }
});

// GET /api/thoughts/:id - Get single thought
thoughtsRouter.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    // TODO: Query thought from database
    // const thought = await db.select().from(thoughts).where(eq(thoughts.id, id)).limit(1);
    return c.json({ thought: null });
  } catch (error) {
    return c.json({ error: 'Failed to fetch thought' }, 500);
  }
});

// PATCH /api/thoughts/:id - Update thought
thoughtsRouter.patch('/:id', async (c) => {
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
    if (error instanceof Error && error.name === 'ZodError') {
      return c.json({ error: 'Validation failed', details: error.message }, 400);
    }
    return c.json({ error: 'Failed to update thought' }, 500);
  }
});

export { thoughtsRouter };



