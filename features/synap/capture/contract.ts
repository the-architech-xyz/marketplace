/**
 * Synap Capture Feature Contract
 * 
 * This is the single source of truth for the Synap Capture feature.
 * Defines types, interfaces, and business logic for capturing and analyzing thoughts.
 */

// ============================================================================
// CORE TYPES
// ============================================================================

export type ThoughtType = 
  | 'text'       // Plain text thought
  | 'audio'      // Voice memo
  | 'image'      // Image with OCR
  | 'link';      // Shared link

export type ThoughtStatus = 
  | 'draft'      // Being captured
  | 'analyzing'  // AI analysis in progress
  | 'analyzed'   // Analysis complete
  | 'archived';  // Archived

export type IntentType = 
  | 'note'       // General note
  | 'task'       // Actionable task
  | 'list'       // List item
  | 'reminder'   // Reminder/event
  | 'idea'       // Creative idea
  | 'question'   // Question to answer
  | 'unknown';   // Unclear intent

// ============================================================================
// DATA TYPES
// ============================================================================

export interface Thought {
  id: string;
  userId: string;
  content: string;
  type: ThoughtType;
  status: ThoughtStatus;
  
  // AI Analysis results
  tags?: string[];
  entities?: Entity[];
  intent?: IntentType;
  embedding?: number[]; // Vector embedding for semantic search
  
  // Media files
  audioUrl?: string;
  imageUrl?: string;
  linkUrl?: string;
  
  // Metadata
  metadata?: Record<string, unknown>;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  analyzedAt?: string;
}

export interface Entity {
  type: 'person' | 'place' | 'organization' | 'date' | 'time' | 'other';
  value: string;
  confidence?: number;
}

export interface AISuggestion {
  id: string;
  thoughtId: string;
  type: 'convert_to_task' | 'convert_to_list' | 'add_reminder' | 'link_thought';
  title: string;
  description?: string;
  data?: Record<string, unknown>;
  accepted: boolean;
  createdAt: string;
  acceptedAt?: string;
}

// ============================================================================
// INPUT TYPES
// ============================================================================

export interface CreateThoughtData {
  content: string;
  type: ThoughtType;
  audioUrl?: string;
  imageUrl?: string;
  linkUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateThoughtData {
  content?: string;
  tags?: string[];
  status?: ThoughtStatus;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// RESULT TYPES
// ============================================================================

export interface CreateThoughtResult {
  thought: Thought;
  success: boolean;
  message?: string;
}

export interface AnalyzeThoughtResult {
  thought: Thought;
  suggestions?: AISuggestion[];
  success: boolean;
}

// ============================================================================
// BUSINESS LOGIC INTERFACE
// ============================================================================

export interface ISynapCaptureService {
  /**
   * Create a new thought
   * Immediately creates the thought and triggers AI analysis
   */
  createThought: (data: CreateThoughtData) => Promise<CreateThoughtResult>;

  /**
   * Get user's thoughts
   * Returns list of thoughts with optional filters
   */
  getThoughts: (filters?: {
    status?: ThoughtStatus[];
    type?: ThoughtType[];
    tags?: string[];
    search?: string;
  }) => Promise<Thought[]>;

  /**
   * Get a single thought
   */
  getThought: (id: string) => Promise<Thought | null>;

  /**
   * Update a thought
   */
  updateThought: (id: string, data: UpdateThoughtData) => Promise<Thought>;

  /**
   * Accept an AI suggestion
   * Converts the suggestion into an action (e.g., creates a task)
   */
  acceptSuggestion: (suggestionId: string) => Promise<{ success: boolean; action?: unknown }>;
}



