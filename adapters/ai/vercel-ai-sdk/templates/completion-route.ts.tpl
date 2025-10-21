import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { streamText, generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { AI_CONFIG, getModelConfig } from '@/lib/ai/config';

export async function POST(request: NextRequest) {
  try {
    const { 
      prompt,
      model, 
      provider = 'openai',
      stream = false,
      ...options 
    } = await request.json();
    
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    // Get model configuration
    const modelConfig = getModelConfig(provider, model);
    
    if (!modelConfig) {
      return NextResponse.json(
        { 
          error: 'Invalid model configuration',
          provider,
          model,
          availableProviders: Object.keys(AI_CONFIG.models)
        },
        { status: 400 }
      );
    }
    
    // Prepare the request options
    const requestOptions = {
      model: modelConfig.provider(modelConfig.model),
      prompt,
      maxTokens: options.maxTokens || AI_CONFIG.maxTokens,
      temperature: options.temperature || AI_CONFIG.temperature,
      topP: options.topP,
      topK: options.topK,
      frequencyPenalty: options.frequencyPenalty,
      presencePenalty: options.presencePenalty,
      stopSequences: options.stopSequences,
    };

    // Handle streaming completion
    if (stream && AI_CONFIG.features.streaming) {
      const result = await streamText(requestOptions);
      
      return result.toDataStreamResponse({
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          'Connection': 'keep-alive',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    }
    
    // Handle non-streaming completion
    const result = await generateText(requestOptions);
    
    return NextResponse.json({
      text: result.text,
      usage: {
        promptTokens: result.usage.promptTokens,
        completionTokens: result.usage.completionTokens,
        totalTokens: result.usage.totalTokens,
      },
      finishReason: result.finishReason,
      model: modelConfig.model,
      provider: modelConfig.provider.name,
    });
    
  } catch (error) {
    console.error('Completion API error:', error);
    
    // Handle specific AI SDK errors
    if (error instanceof Error) {
      // Rate limit errors
      if (error.message.includes('rate limit') || error.message.includes('429')) {
        return NextResponse.json(
          { 
            error: 'Rate limit exceeded',
            details: 'Too many requests. Please try again later.',
            retryAfter: 60,
          },
          { status: 429 }
        );
      }
      
      // Authentication errors
      if (error.message.includes('authentication') || error.message.includes('401')) {
        return NextResponse.json(
          { 
            error: 'Authentication failed',
            details: 'Invalid API key or credentials',
          },
          { status: 401 }
        );
      }
      
      // Content filtering errors
      if (error.message.includes('content_filter') || error.message.includes('safety')) {
        return NextResponse.json(
          { 
            error: 'Content filtered',
            details: 'The request was filtered due to content policy',
          },
          { status: 400 }
        );
      }
    }
    
    // Generic error response
    return NextResponse.json(
      { 
        error: 'Failed to process completion request',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

// Health check and configuration endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'completion',
    features: AI_CONFIG.features,
    models: Object.keys(AI_CONFIG.models),
    defaultModel: AI_CONFIG.defaultModel,
    defaultProvider: 'openai',
    maxTokens: AI_CONFIG.maxTokens,
    temperature: AI_CONFIG.temperature,
  });
}
