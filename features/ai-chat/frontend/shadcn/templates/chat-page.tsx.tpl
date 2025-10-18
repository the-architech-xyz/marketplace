// AI Chat Page Component

"use client";

import React from 'react';
import { ChatInterface } from '@/components/ai-chat/ChatInterface';
import { ChatProvider } from '@/components/ai-chat/ChatProvider';
import { AIProvider } from '@/components/ai-chat/AIProvider';

export default function ChatPage() {
  return (
    <AIProvider>
      <ChatProvider>
        <div className="container mx-auto h-screen flex flex-col py-4">
          <div className="mb-4">
            <h1 className="text-3xl font-bold">AI Chat</h1>
            <p className="text-muted-foreground">
              Start a conversation with AI
            </p>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      </ChatProvider>
    </AIProvider>
  );
}
