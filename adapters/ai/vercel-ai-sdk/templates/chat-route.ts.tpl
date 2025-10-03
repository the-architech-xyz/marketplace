import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { streamText, generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { AI_CONFIG, getModelConfig } from '@/lib/ai/config';

export async function POST(request: NextRequest) {
  try {
    const { messages, model, provider = 'openai', ...options } = await request.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Get model configuration
    const modelConfig = getModelConfig(provider, model);
    
    // Prepare the request
    const requestOptions = {
      model: modelConfig.provider(modelConfig.model),
      messages,
      maxTokens: options.maxTokens || AI_CONFIG.maxTokens,
      temperature: options.temperature || AI_CONFIG.temperature,
      ...options,
    };

    // Handle streaming vs non-streaming
    if (options.stream !== false && AI_CONFIG.features.streaming) {
      const result = await streamText(requestOptions);
      
      return result.toDataStreamResponse({
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } else {
      const result = await generateText(requestOptions);
      
      return NextResponse.json({
        text: result.text,
        usage: result.usage,
        finishReason: result.finishReason,
      });
    }
  } catch (error) {
    console.error('Chat API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    features: AI_CONFIG.features,
    providers: Object.keys(AI_CONFIG.models),
    defaultModel: AI_CONFIG.defaultModel,
  });
}
