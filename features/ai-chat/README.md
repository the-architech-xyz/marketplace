# AI Chat Capability

Complete AI chat interface using Vercel AI SDK and Shadcn UI for conversational AI experiences.

## Overview

The AI Chat capability provides a comprehensive conversational AI system with support for:
- Real-time message streaming
- Multiple AI providers (OpenAI, Anthropic, Cohere)
- File upload and processing
- Voice input and output
- Code highlighting and markdown support
- Chat history and persistence
- Export/import functionality
- Multi-backend and multi-frontend support

## Architecture

This feature follows the Two-Headed architecture pattern:

### Backend Implementations
- **`vercel-ai-sdk/`** - Vercel AI SDK integration
- **`openai/`** - OpenAI API integration (planned)
- **`anthropic/`** - Anthropic Claude integration (planned)
- **`cohere/`** - Cohere API integration (planned)

### Frontend Implementations
- **`shadcn/`** - Shadcn/ui components
- **`mui/`** - Material-UI components (planned)
- **`chakra/`** - Chakra UI components (planned)

## Contract

The feature contract is defined in `feature.json` and includes:

### Hooks
- **Chat Management Hooks**: `useChat`, `useMessages`, `useCreateChat`, `useUpdateChat`, `useDeleteChat`, `useChatHistory`
- **Message Hooks**: `useSendMessage`, `useStreamMessage`
- **Export/Import Hooks**: `useExportChat`, `useImportChat`
- **File Upload Hooks**: `useUploadFile`
- **Voice Hooks**: `useVoiceInput`, `useVoiceOutput`
- **Configuration Hooks**: `useCodeHighlighting`, `useMarkdownSupport`

### API Endpoints
- `GET /api/chat` - Get chat sessions
- `POST /api/chat` - Create new chat
- `PATCH /api/chat/:id` - Update chat
- `DELETE /api/chat/:id` - Delete chat
- `GET /api/chat/messages` - Get messages
- `POST /api/chat/messages` - Send message
- `POST /api/chat/stream` - Stream message
- `POST /api/chat/export` - Export chat
- `POST /api/chat/import` - Import chat
- `POST /api/chat/upload` - Upload file
- `POST /api/chat/voice` - Voice input/output

### Types
- `ChatSession` - Chat session information
- `Message` - Individual message
- `SendMessageData` - Message sending parameters
- `StreamResult` - Streaming response
- `StreamMessageData` - Streaming message parameters
- `CreateChatData` - Chat creation parameters
- `UpdateChatData` - Chat update parameters
- `ExportResult` - Export operation result
- `ExportChatData` - Export parameters
- `ImportChatData` - Import parameters
- `FileUploadResult` - File upload result
- `FileUploadData` - File upload parameters
- `VoiceResult` - Voice operation result
- `VoiceInputData` - Voice input parameters
- `VoiceOutputData` - Voice output parameters
- `CodeHighlightingConfig` - Code highlighting configuration
- `MarkdownConfig` - Markdown rendering configuration

## Implementation Requirements

### Backend Implementation
1. **Must implement all API endpoints** defined in the contract
2. **Must integrate with AI providers** (OpenAI, Anthropic, Cohere)
3. **Must handle message streaming** and real-time responses
4. **Must support file upload** and processing
5. **Must provide voice input/output** functionality

### Frontend Implementation
1. **Must provide chat interface** with message history
2. **Must integrate with backend hooks** using TanStack Query
3. **Must handle message streaming** and real-time updates
4. **Must support file upload** and voice input/output
5. **Must support the selected UI library** (Shadcn, MUI, etc.)

## Usage Example

```typescript
// Using the AI chat hooks
import { useChat, useSendMessage, useStreamMessage } from '@/lib/ai-chat/hooks';

function ChatInterface() {
  const { data: chat } = useChat();
  const sendMessage = useSendMessage();
  const streamMessage = useStreamMessage();

  const handleSendMessage = async (content: string) => {
    await sendMessage.mutateAsync({ content, chatId: chat?.id });
  };

  const handleStreamMessage = async (content: string) => {
    await streamMessage.mutateAsync({ content, chatId: chat?.id });
  };

  return (
    <div className="h-screen flex flex-col">
      <MessageList messages={chat?.messages} />
      <MessageInput
        onSendMessage={handleSendMessage}
        onStreamMessage={handleStreamMessage}
      />
    </div>
  );
}
```

## Configuration

The feature can be configured through the `parameters` section in `feature.json`:

- **`backend`**: Choose AI provider (vercel-ai-sdk, openai, anthropic, cohere)
- **`frontend`**: Choose UI library (shadcn, mui, chakra)
- **`features`**: Enable/disable specific chat features

## AI Providers

### Vercel AI SDK
- **Default provider** with multiple AI model support
- **Streaming support** for real-time responses
- **Tool calling** and function execution
- **Multi-modal** input support

### OpenAI
- **GPT models** (GPT-4, GPT-3.5-turbo)
- **Function calling** and tool use
- **Vision models** for image analysis
- **Embeddings** for semantic search

### Anthropic
- **Claude models** (Claude-3, Claude-2)
- **Constitutional AI** principles
- **Long context** support
- **Safety features** and content filtering

### Cohere
- **Command models** for text generation
- **Embed models** for semantic search
- **Classify models** for text classification
- **Generate models** for content creation

## Features

### Core Features
- **Chat Interface** - Main conversation UI
- **Message History** - Persistent chat history
- **Streaming** - Real-time message streaming
- **File Upload** - Support for various file types

### Advanced Features
- **Voice Input** - Speech-to-text functionality
- **Voice Output** - Text-to-speech responses
- **Code Highlighting** - Syntax highlighting for code blocks
- **Markdown Support** - Rich text rendering
- **Export/Import** - Chat data portability

### UI Features
- **Responsive Design** - Mobile and desktop support
- **Dark/Light Mode** - Theme switching
- **Customizable Layout** - Flexible UI arrangement
- **Accessibility** - Screen reader and keyboard support

## File Upload Support

### Supported File Types
- **Images** - PNG, JPG, GIF, WebP
- **Documents** - PDF, DOC, DOCX, TXT
- **Code Files** - JS, TS, PY, GO, etc.
- **Data Files** - CSV, JSON, XML

### File Processing
- **Text extraction** from documents
- **Image analysis** using vision models
- **Code analysis** and syntax highlighting
- **Data parsing** and visualization

## Voice Features

### Voice Input
- **Speech-to-text** conversion
- **Real-time transcription** during speaking
- **Language detection** and support
- **Noise cancellation** and filtering

### Voice Output
- **Text-to-speech** synthesis
- **Multiple voices** and languages
- **Speed and pitch** control
- **Audio streaming** for long responses

## Export/Import Formats

### Supported Formats
- **JSON** - Native chat format
- **Markdown** - Human-readable format
- **PDF** - Document format
- **CSV** - Data format
- **TXT** - Plain text format

## Dependencies

### Required Adapters
- `vercel-ai-sdk` - AI SDK for multiple providers
- `shadcn-ui` - UI component library

### Required Integrators
- `tanstack-query-nextjs-integration` - Data fetching integration

### Required Capabilities
- `ai-chat` - AI conversation capability
- `streaming` - Real-time data streaming
- `file-upload` - File upload and processing

## Development

To add a new backend implementation:

1. Create a new directory under `backend/`
2. Implement the required API endpoints
3. Integrate with the AI provider
4. Handle message streaming
5. Support file upload and voice features
6. Update the feature.json to include the new implementation

To add a new frontend implementation:

1. Create a new directory under `frontend/`
2. Implement chat UI using the selected library
3. Integrate with the backend hooks
4. Handle message streaming and real-time updates
5. Support file upload and voice features
6. Update the feature.json to include the new implementation

## Advanced Features

### Real-time Collaboration
- **WebSocket integration** for live updates
- **Multi-user chat** support
- **Presence indicators** and user status
- **Conflict resolution** for simultaneous edits

### Performance Optimization
- **Message virtualization** for large chat histories
- **Lazy loading** of chat data
- **Efficient streaming** and buffering
- **Memory management** for long conversations

### Security Features
- **Message encryption** for sensitive data
- **Content filtering** and moderation
- **Rate limiting** and abuse prevention
- **Audit logging** for compliance
