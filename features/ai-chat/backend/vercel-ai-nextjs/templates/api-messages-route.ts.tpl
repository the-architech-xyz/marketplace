import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    if (!conversationId) {
      return NextResponse.json(
        { error: 'Conversation ID is required' },
        { status: 400 }
      );
    }

    // Get messages for conversation
    const messages = [];

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversationId, messageText, role, metadata } = body;

    if (!conversationId || !messageText || !role) {
      return NextResponse.json(
        { error: 'Conversation ID, message text, and role are required' },
        { status: 400 }
      );
    }

    // Create message
    const message = {
      id: 'message-' + Date.now(),
      conversationId,
      messageText,
      role,
      metadata: metadata || {},
      status: 'sent',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    );
  }
}
