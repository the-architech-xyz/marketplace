/**
 * Inngest Function: Analyze Thought
 * 
 * Analyzes a thought using AI to extract tags, entities, and intent
 */

import { inngest } from '<%= importPath(paths.jobs) %>jobs/inngest/client';
import { db } from '<%= importPath(paths.db) %>db';
// import { thoughts, aiSuggestions } from '<%= importPath(paths.db) %>db/schema';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Analysis schema
const ThoughtAnalysisSchema = z.object({
  tags: z.array(z.string()).describe('Relevant tags for categorization'),
  entities: z.array(z.object({
    type: z.enum(['person', 'place', 'organization', 'date', 'time', 'other']),
    value: z.string(),
  })).describe('Extracted entities'),
  intent: z.enum(['note', 'task', 'list', 'reminder', 'idea', 'question', 'unknown']).describe('Detected intent'),
  suggestion: z.object({
    type: z.enum(['convert_to_task', 'convert_to_list', 'add_reminder', 'link_thought']).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional().describe('Suggested action if intent is clear'),
});

export const analyzeThought = inngest.createFunction(
  { id: 'analyze-thought' },
  { event: 'thought.created' },
  async ({ event, step }) => {
    const { thoughtId, content, type } = event.data;
    
    // Step 1: Analyze with AI
    const analysis = await step.run('analyze-content', async () => {
      const { object } = await generateObject({
        model: openai('gpt-4o'),
        schema: ThoughtAnalysisSchema,
        prompt: `Analyze this thought and extract:
- Tags for categorization
- Named entities (people, places, organizations, dates, times)
- Intent (note, task, list, reminder, idea, question, or unknown)
- If intent is clear, suggest an action

Thought: ${content}
Type: ${type}`,
      });
      
      return object;
    });
    
    // Step 2: Update thought in database
    await step.run('update-thought', async () => {
      // TODO: Update thought with analysis results
      // await db.update(thoughts)
      //   .set({
      //     tags: analysis.tags,
      //     entities: analysis.entities,
      //     intent: analysis.intent,
      //     status: 'analyzed',
      //     analyzedAt: new Date(),
      //   })
      //   .where(eq(thoughts.id, thoughtId));
    });
    
    // Step 3: Create suggestion if applicable
    if (analysis.suggestion?.type) {
      await step.run('create-suggestion', async () => {
        // TODO: Insert AI suggestion
        // await db.insert(aiSuggestions).values({
        //   id: createId(),
        //   thoughtId,
        //   type: analysis.suggestion.type,
        //   title: analysis.suggestion.title || '',
        //   description: analysis.suggestion.description,
        //   accepted: false,
        // });
      });
    }
    
    return { success: true, analysis };
  }
);



