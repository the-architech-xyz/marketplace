/**
 * Thoughts API Route (Hono)
 * 
 * Handles GET (list) and POST (create) for thoughts
 */

import { Context } from 'hono';
import { db } from '<%= importPath(paths.db) %>db';
// import { thoughts } from '<%= importPath(paths.db) %>db/schema';
import { CreateThoughtDataSchema } from '<%= importPath(paths.lib) %>synap-capture/schemas';
import { inngest } from '<%= importPath(paths.jobs) %>jobs/inngest/client';
import { createId } from '@paralleldrive/cuid2';

// GET /api/thoughts - List thoughts
export async function getThoughts(c: Context) {
  try {
    // TODO: Get userId from auth
    const userId = 'user-id'; // Replace with actual auth
    
    // TODO: Query thoughts from database
    // const thoughtsList = await db.select().from(thoughts).where(eq(thoughts.userId, userId));
    
    return c.json({ thoughts: [] });
  } catch (error) {
    console.error('Error fetching thoughts:', error);
    return c.json({ error: 'Failed to fetch thoughts' }, 500);
  }
}

// POST /api/thoughts - Create thought
export async function createThought(c: Context) {
  try {
    // TODO: Get userId from auth
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
    return c.json({ error: 'Failed to create thought' }, 500);
  }
}



