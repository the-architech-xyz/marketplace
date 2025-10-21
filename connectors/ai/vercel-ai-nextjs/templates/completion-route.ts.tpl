import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { streamText, generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { 
      prompt,
      model = 'gpt-4',
      provider = 'openai',
      stream = false,
      temperature = 0.7,
      maxTokens = 1000,
      ...options 
    } = await request.json();
    
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    // Select provider SDK
    const providerSDK = provider === 'anthropic' ? anthropic : openai;
    const modelInstance = providerSDK(model);
    
    // Prepare request options
    const requestOptions = {
      model: modelInstance,
      prompt,
      temperature,
      maxTokens,
      topP: options.topP,
      topK: options.topK,
      frequencyPenalty: options.frequencyPenalty,
      presencePenalty: options.presencePenalty,
      stopSequences: options.stopSequences,
    };

    // Handle streaming completion
    if (stream) {
      const result = await streamText(requestOptions);
      
      return result.toDataStreamResponse({
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          'Connection': 'keep-alive',
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
      model,
      provider,
    });
    
  } catch (error) {
    console.error('Completion API error:', error);
    
    // Handle specific errors
    if (error instanceof Error) {
      if (error.message.includes('rate limit') || error.message.includes('429')) {
        return NextResponse.json(
          { error: 'Rate limit exceeded', retryAfter: 60 },
          { status: 429 }
        );
      }
      
      if (error.message.includes('authentication') || error.message.includes('401')) {
        return NextResponse.json(
          { error: 'Authentication failed' },
          { status: 401 }
        );
      }
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to process completion request',
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
    service: 'completion',
    providers: ['openai', 'anthropic'],
    defaultModel: 'gpt-4',
    defaultProvider: 'openai',
  });
}
