import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SendMessageData {
  message: string;
  sessionId?: string;
  context?: string;
}

export interface StreamResult {
  content: string;
  isComplete: boolean;
  messageId: string;
}

export class AIService {
  static async sendMessage(data: SendMessageData): Promise<ChatMessage> {
    try {
      const result = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant.' },
          { role: 'user', content: data.message }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      const message: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: result.choices[0]?.message?.content || 'Sorry, I could not generate a response.',
        timestamp: new Date(),
      };

      return message;
    } catch (error) {
      console.error('AI message generation failed:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  static async streamMessage(data: SendMessageData): Promise<ReadableStream> {
    try {
      const result = await streamText({
        model: openai('gpt-4'),
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant.' },
          { role: 'user', content: data.message }
        ],
        maxTokens: 1000,
        temperature: 0.7,
      });

      return result.toDataStreamResponse();
    } catch (error) {
      console.error('AI streaming failed:', error);
      throw new Error('Failed to stream AI response');
    }
  }

  static async createChatSession(title: string): Promise<ChatSession> {
    const session: ChatSession = {
      id: crypto.randomUUID(),
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to database
    return session;
  }

  static async getChatHistory(sessionId: string): Promise<ChatMessage[]> {
    // Fetch chat history from database
    return [];
  }

  static async saveMessage(sessionId: string, message: ChatMessage): Promise<void> {
    // Save message to database
  }

  static async deleteChatSession(sessionId: string): Promise<boolean> {
    // Delete chat session from database
    return true;
  }
}
