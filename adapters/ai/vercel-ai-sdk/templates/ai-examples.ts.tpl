/**
 * AI SDK Examples and Advanced Usage Patterns
 * 
 * This file contains commented-out examples of advanced AI features
 * that developers can uncomment and customize for their specific needs.
 */

// ============================================================================
// EMBEDDINGS EXAMPLE
// ============================================================================

/*
import { embed } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function generateEmbeddings(text: string) {
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: text,
  });
  
  return embedding;
}

// Usage example:
// const embeddings = await generateEmbeddings('Your text here');
*/

// ============================================================================
// FUNCTION CALLING EXAMPLE
// ============================================================================

/*
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const weatherSchema = z.object({
  location: z.string().describe('The city and state'),
  temperature: z.number().describe('The temperature in Celsius'),
  description: z.string().describe('The weather description'),
});

export async function getWeatherInfo(prompt: string) {
  const { object } = await generateObject({
    model: openai('gpt-4'),
    schema: weatherSchema,
    prompt: `Get weather information for: ${prompt}`,
  });
  
  return object;
}

// Usage example:
// const weather = await getWeatherInfo('What is the weather in Paris?');
*/

// ============================================================================
// IMAGE GENERATION EXAMPLE
// ============================================================================

/*
import { generateImage } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function generateImageFromPrompt(prompt: string) {
  const { image } = await generateImage({
    model: openai('dall-e-3'),
    prompt: prompt,
    size: '1024x1024',
    quality: 'standard',
  });
  
  return image;
}

// Usage example:
// const image = await generateImageFromPrompt('A beautiful sunset over mountains');
*/

// ============================================================================
// STREAMING WITH TOOLS EXAMPLE
// ============================================================================

/*
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const calculatorSchema = z.object({
  operation: z.enum(['add', 'subtract', 'multiply', 'divide']),
  a: z.number(),
  b: z.number(),
});

export async function* streamWithCalculator(prompt: string) {
  const result = await streamText({
    model: openai('gpt-4'),
    prompt: prompt,
    tools: {
      calculator: {
        description: 'Perform basic math operations',
        parameters: calculatorSchema,
        execute: async ({ operation, a, b }) => {
          switch (operation) {
            case 'add': return { result: a + b };
            case 'subtract': return { result: a - b };
            case 'multiply': return { result: a * b };
            case 'divide': return { result: a / b };
          }
        },
      },
    },
  });
  
  for await (const delta of result.textStream) {
    yield delta;
  }
}

// Usage example:
// for await (const chunk of streamWithCalculator('What is 15 + 27?')) {
//   console.log(chunk);
// }
*/

// ============================================================================
// MULTI-MODAL EXAMPLE (TEXT + IMAGE)
// ============================================================================

/*
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function analyzeImageWithText(imageUrl: string, question: string) {
  const { text } = await generateText({
    model: openai('gpt-4-vision-preview'),
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: question },
          { type: 'image', image: imageUrl },
        ],
      },
    ],
  });
  
  return text;
}

// Usage example:
// const analysis = await analyzeImageWithText(
//   'https://example.com/image.jpg',
//   'What do you see in this image?'
// );
*/

// ============================================================================
// CUSTOM PROVIDER EXAMPLE
// ============================================================================

/*
import { createOpenAI } from '@ai-sdk/openai';

// Custom OpenAI provider with different configuration
export const customOpenAI = createOpenAI({
  apiKey: process.env.CUSTOM_OPENAI_API_KEY,
  baseURL: 'https://your-custom-endpoint.com/v1',
});

export async function useCustomProvider(prompt: string) {
  const { text } = await generateText({
    model: customOpenAI('gpt-4'),
    prompt: prompt,
  });
  
  return text;
}
*/

// ============================================================================
// ERROR HANDLING AND RETRY EXAMPLE
// ============================================================================

/*
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function generateWithRetry(prompt: string, maxRetries = 3) {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const { text } = await generateText({
        model: openai('gpt-4'),
        prompt: prompt,
        maxRetries: 0, // Disable built-in retries
      });
      
      return text;
    } catch (error) {
      lastError = error as Error;
      console.warn(`Attempt ${attempt} failed:`, error);
      
      if (attempt < maxRetries) {
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }
  
  throw new Error(`Failed after ${maxRetries} attempts: ${lastError?.message}`);
}

// Usage example:
// try {
//   const result = await generateWithRetry('Your prompt here');
//   console.log(result);
// } catch (error) {
//   console.error('Generation failed:', error);
// }
*/
