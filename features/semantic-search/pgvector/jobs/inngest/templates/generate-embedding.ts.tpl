/**
 * Inngest Function: Generate Embedding
 * 
 * Generates embedding for a document/thought and stores it in the database
 */

import { inngest } from '<%= importPath(paths.jobs) %>jobs/inngest/client';
import { db } from '<%= importPath(paths.db) %>db';
import { embed } from 'ai';
import { openai } from '@ai-sdk/openai';
// import { sql } from 'drizzle-orm';

export const generateEmbedding = inngest.createFunction(
  { id: 'generate-embedding' },
  { event: 'thought.created' }, // or 'thought.updated', customize as needed
  async ({ event, step }) => {
    const { thoughtId, content } = event.data;
    
    // Step 1: Generate embedding
    const embedding = await step.run('generate-embedding', async () => {
      const { embedding } = await embed({
        model: openai.embedding('<%= params.embeddingModel || 'text-embedding-3-small' %>'),
        value: content,
      });
      
      return embedding;
    });
    
    // Step 2: Update database with embedding
    await step.run('update-embedding', async () => {
      const tableName = '<%= params.tableName || 'thoughts' %>';
      
      // TODO: Update embedding column in database
      // Example:
      // await db.execute(sql`
      //   UPDATE ${tableName}
      //   SET embedding = ${embedding}::vector
      //   WHERE id = ${thoughtId}
      // `);
    });
    
    return { success: true, thoughtId };
  }
);



