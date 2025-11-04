/**
 * Vercel AI SDK Client Instances
 * 
 * Pre-configured AI provider clients.
 * Import these in your backend API routes.
 */

import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
<% if (params.providers?.includes('google')) { %>
import { createGoogleGenerativeAI } from '@ai-sdk/google';
<% } %>
<% if (params.providers?.includes('cohere')) { %>
import { createCohere } from '@ai-sdk/cohere';
<% } %>
<% if (params.providers?.includes('huggingface')) { %>
import { createHuggingFace } from '@ai-sdk/huggingface';
<% } %>
import { PROVIDER_CONFIG } from './config';

/**
 * OpenAI Client
 * 
 * Usage:
 * ```typescript
 * import { openai } from '@/lib/ai/client';
 * const model = openai('gpt-4');
 * ```
 */
export const openai = createOpenAI({
  apiKey: PROVIDER_CONFIG.openai.apiKey,
  baseURL: PROVIDER_CONFIG.openai.baseURL,
});

/**
 * Anthropic Client
 * 
 * Usage:
 * ```typescript
 * import { anthropic } from '@/lib/ai/client';
 * const model = anthropic('claude-3-sonnet');
 * ```
 */
export const anthropic = createAnthropic({
  apiKey: PROVIDER_CONFIG.anthropic.apiKey,
  baseURL: PROVIDER_CONFIG.anthropic.baseURL,
});

<% if (params.providers?.includes('google')) { %>
/**
 * Google AI Client
 * 
 * Usage:
 * ```typescript
 * import { google } from '@/lib/ai/client';
 * const model = google('gemini-pro');
 * ```
 */
export const google = createGoogleGenerativeAI({
  apiKey: PROVIDER_CONFIG.google.apiKey,
});
<% } %>

<% if (params.providers?.includes('cohere')) { %>
/**
 * Cohere Client
 * 
 * Usage:
 * ```typescript
 * import { cohere } from '@/lib/ai/client';
 * const model = cohere('command');
 * ```
 */
export const cohere = createCohere({
  apiKey: PROVIDER_CONFIG.cohere.apiKey,
});
<% } %>

<% if (params.providers?.includes('huggingface')) { %>
/**
 * HuggingFace Client
 * 
 * Usage:
 * ```typescript
 * import { huggingface } from '@/lib/ai/client';
 * const model = huggingface('meta-llama/Llama-2-7b-chat-hf');
 * ```
 */
export const huggingface = createHuggingFace({
  apiKey: PROVIDER_CONFIG.huggingface.apiKey,
});
<% } %>

/**
 * Get Model by ID
 * 
 * Helper function to get the correct model instance by ID.
 * 
 * @example
 * ```typescript
 * const model = getModel('gpt-4');
 * const model = getModel('claude-3-sonnet');
 * ```
 */
export function getModel(modelId: string) {
  // OpenAI models
  if (modelId.startsWith('gpt-')) {
    return openai(modelId);
  }
  
  // Anthropic models
  if (modelId.startsWith('claude-')) {
    return anthropic(modelId);
  }
  
  <% if (params.providers?.includes('google')) { %>
  // Google models
  if (modelId.startsWith('gemini-')) {
    return google(modelId);
  }
  <% } %>
  
  <% if (params.providers?.includes('cohere')) { %>
  // Cohere models
  if (modelId.startsWith('command')) {
    return cohere(modelId);
  }
  <% } %>
  
  // Default to OpenAI
  return openai(modelId);
}



