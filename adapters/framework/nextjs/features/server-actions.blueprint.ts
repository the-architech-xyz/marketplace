/**
 * Next.js Server Actions Feature Blueprint
 * 
 * Modern Server Actions implementation for Next.js 15+
 * Provides self-contained examples without external dependencies
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const nextjsServerActionsBlueprint: Blueprint = {
  id: 'nextjs-server-actions-setup',
  name: 'Next.js Server Actions',
  description: 'Modern Server Actions implementation for Next.js 15+',
  actions: [
    // Create server actions utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/server-actions.ts',
      content: `/**
 * Server Actions utilities for Next.js 15+
 */

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Server Action result types
 */
export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

/**
 * Server Action error class
 */
export class ServerActionError extends Error {
  constructor(
    message: string,
    public code: string = 'SERVER_ACTION_ERROR',
    public statusCode: number = 400
  ) {
    super(message);
    this.name = 'ServerActionError';
  }
}

/**
 * Server Actions utility class
 */
export class ServerActions {
  /**
   * Create a successful result
   */
  static success<T>(data: T): ActionResult<T> {
    return {
      success: true,
      data,
    };
  }

  /**
   * Create an error result
   */
  static error(error: string, fieldErrors?: Record<string, string[]>): ActionResult {
    return {
      success: false,
      error,
      fieldErrors,
    };
  }

  /**
   * Handle server action errors
   */
  static handleError(error: unknown): ActionResult {
    if (error instanceof ServerActionError) {
      return {
        success: false,
        error: error.message,
      };
    }

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }

  /**
   * Validate required fields
   */
  static validateRequired(
    data: Record<string, any>,
    requiredFields: string[]
  ): Record<string, string[]> | null {
    const errors: Record<string, string[]> = {};

    requiredFields.forEach(field => {
      if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
        errors[field] = ['This field is required'];
      }
    });

    return Object.keys(errors).length > 0 ? errors : null;
  }

  /**
   * Sanitize input data
   */
  static sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, ''); // Remove event handlers
  }

  /**
   * Revalidate paths after action
   */
  static revalidatePaths(paths: string[]): void {
    paths.forEach(path => revalidatePath(path));
  }

  /**
   * Revalidate tags after action
   */
  static revalidateTags(tags: string[]): void {
    tags.forEach(tag => revalidateTag(tag));
  }

  /**
   * Redirect after successful action
   */
  static redirectTo(path: string): never {
    redirect(path);
  }
}

/**
 * Form validation utilities
 */
export const formValidation = {
  /**
   * Validate email format
   */
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate password strength
   */
  validatePassword: (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate URL format
   */
  validateUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Validate phone number
   */
  validatePhone: (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },
};

/**
 * Rate limiting for server actions
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const rateLimit = {
  /**
   * Check if action is rate limited
   */
  isRateLimited: (identifier: string, maxRequests: number = 10, windowMs: number = 60000): boolean => {
    const now = Date.now();
    const record = rateLimitMap.get(identifier);

    if (!record || now > record.resetTime) {
      rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
      return false;
    }

    if (record.count >= maxRequests) {
      return true;
    }

    record.count++;
    return false;
  },

  /**
   * Clear rate limit for identifier
   */
  clear: (identifier: string): void => {
    rateLimitMap.delete(identifier);
  },
};`
    },
    // Create example server actions
    {
      type: 'CREATE_FILE',
      path: 'src/lib/actions/example-actions.ts',
      content: `/**
 * Example Server Actions for Next.js 15+
 * 
 * These are self-contained examples that don't depend on external services
 */

'use server';

import { ServerActions, ServerActionError, formValidation } from '../server-actions.js';
import { revalidatePath } from 'next/cache';

/**
 * Example: Simple calculation action
 */
export async function calculateSum(a: number, b: number) {
  try {
    // Validate inputs
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new ServerActionError('Invalid input: both values must be numbers');
    }

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      throw new ServerActionError('Invalid input: values must be finite numbers');
    }

    const result = a + b;

    return ServerActions.success({
      result,
      operation: 'addition',
      inputs: { a, b },
    });
  } catch (error) {
    return ServerActions.handleError(error);
  }
}

/**
 * Example: String processing action
 */
export async function processText(text: string, operation: 'uppercase' | 'lowercase' | 'reverse') {
  try {
    // Validate inputs
    if (!text || typeof text !== 'string') {
      throw new ServerActionError('Text is required and must be a string');
    }

    if (!['uppercase', 'lowercase', 'reverse'].includes(operation)) {
      throw new ServerActionError('Invalid operation. Must be uppercase, lowercase, or reverse');
    }

    let processedText: string;

    switch (operation) {
      case 'uppercase':
        processedText = text.toUpperCase();
        break;
      case 'lowercase':
        processedText = text.toLowerCase();
        break;
      case 'reverse':
        processedText = text.split('').reverse().join('');
        break;
    }

    return ServerActions.success({
      original: text,
      processed: processedText,
      operation,
      length: processedText.length,
    });
  } catch (error) {
    return ServerActions.handleError(error);
  }
}

/**
 * Example: Form validation action
 */
export async function validateContactForm(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // Validate required fields
    const requiredFields = ['name', 'email', 'message'];
    const fieldErrors = ServerActions.validateRequired(
      { name, email, message },
      requiredFields
    );

    if (fieldErrors) {
      return ServerActions.error('Please fix the errors below', fieldErrors);
    }

    // Sanitize inputs
    const sanitizedName = ServerActions.sanitizeInput(name);
    const sanitizedEmail = ServerActions.sanitizeInput(email);
    const sanitizedMessage = ServerActions.sanitizeInput(message);

    // Validate email format
    if (!formValidation.validateEmail(sanitizedEmail)) {
      return ServerActions.error('Please enter a valid email address', {
        email: ['Please enter a valid email address'],
      });
    }

    // Validate message length
    if (sanitizedMessage.length < 10) {
      return ServerActions.error('Message must be at least 10 characters long', {
        message: ['Message must be at least 10 characters long'],
      });
    }

    // Simulate processing (in a real app, you might save to database, send email, etc.)
    const contactId = Math.random().toString(36).substr(2, 9);

    return ServerActions.success({
      contactId,
      message: 'Thank you for your message! We will get back to you soon.',
      data: {
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage,
        submittedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return ServerActions.handleError(error);
  }
}

/**
 * Example: Counter action with state management
 */
let counterValue = 0;

export async function getCounter() {
  try {
    return ServerActions.success({
      value: counterValue,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return ServerActions.handleError(error);
  }
}

export async function incrementCounter() {
  try {
    counterValue += 1;
    
    // Revalidate any pages that might display the counter
    revalidatePath('/');
    
    return ServerActions.success({
      value: counterValue,
      message: 'Counter incremented successfully',
    });
  } catch (error) {
    return ServerActions.handleError(error);
  }
}

export async function decrementCounter() {
  try {
    counterValue -= 1;
    
    // Revalidate any pages that might display the counter
    revalidatePath('/');
    
    return ServerActions.success({
      value: counterValue,
      message: 'Counter decremented successfully',
    });
  } catch (error) {
    return ServerActions.handleError(error);
  }
}

export async function resetCounter() {
  try {
    counterValue = 0;
    
    // Revalidate any pages that might display the counter
    revalidatePath('/');
    
    return ServerActions.success({
      value: counterValue,
      message: 'Counter reset successfully',
    });
  } catch (error) {
    return ServerActions.handleError(error);
  }
}

/**
 * Example: File processing action
 */
export async function processFile(file: File) {
  try {
    // Validate file
    if (!file) {
      throw new ServerActionError('No file provided');
    }

    // Check file size (max 1MB)
    const maxSize = 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      throw new ServerActionError('File size must be less than 1MB');
    }

    // Check file type
    const allowedTypes = ['text/plain', 'text/csv', 'application/json'];
    if (!allowedTypes.includes(file.type)) {
      throw new ServerActionError('File type not supported. Allowed types: ' + allowedTypes.join(', '));
    }

    // Read file content
    const content = await file.text();
    
    // Process content based on file type
    let processedContent: any;
    
    switch (file.type) {
      case 'text/plain':
        processedContent = {
          type: 'text',
          content: content,
          wordCount: content.split(/\s+/).length,
          lineCount: content.split('\n').length,
        };
        break;
        
      case 'text/csv':
        const lines = content.split('\n');
        const headers = lines[0]?.split(',') || [];
        const rows = lines.slice(1).map(line => line.split(','));
        processedContent = {
          type: 'csv',
          headers,
          rows,
          rowCount: rows.length,
        };
        break;
        
      case 'application/json':
        try {
          const jsonData = JSON.parse(content);
          processedContent = {
            type: 'json',
            data: jsonData,
            keys: Object.keys(jsonData),
            keyCount: Object.keys(jsonData).length,
          };
        } catch {
          throw new ServerActionError('Invalid JSON format');
        }
        break;
    }

    return ServerActions.success({
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      processed: processedContent,
      processedAt: new Date().toISOString(),
    });
  } catch (error) {
    return ServerActions.handleError(error);
  }
}`
    },
    // Create server actions components
    {
      type: 'CREATE_FILE',
      path: 'src/components/server-actions/Counter.tsx',
      content: `'use client';

import React, { useState, useTransition } from 'react';
import { getCounter, incrementCounter, decrementCounter, resetCounter } from '../../lib/actions/example-actions.js';

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Load initial count
  React.useEffect(() => {
    const loadCount = async () => {
      const result = await getCounter();
      if (result.success && result.data) {
        setCount(result.data.value);
      }
    };
    loadCount();
  }, []);

  const handleIncrement = () => {
    startTransition(async () => {
      setError(null);
      const result = await incrementCounter();
      
      if (result.success && result.data) {
        setCount(result.data.value);
      } else {
        setError(result.error || 'Failed to increment counter');
      }
    });
  };

  const handleDecrement = () => {
    startTransition(async () => {
      setError(null);
      const result = await decrementCounter();
      
      if (result.success && result.data) {
        setCount(result.data.value);
      } else {
        setError(result.error || 'Failed to decrement counter');
      }
    });
  };

  const handleReset = () => {
    startTransition(async () => {
      setError(null);
      const result = await resetCounter();
      
      if (result.success && result.data) {
        setCount(result.data.value);
      } else {
        setError(result.error || 'Failed to reset counter');
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Server Actions Counter</h2>
      
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-blue-600 mb-2">{count}</div>
        <p className="text-gray-600">Current count value</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex gap-2 justify-center">
        <button
          onClick={handleDecrement}
          disabled={isPending}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? '...' : '-'}
        </button>
        
        <button
          onClick={handleReset}
          disabled={isPending}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? '...' : 'Reset'}
        </button>
        
        <button
          onClick={handleIncrement}
          disabled={isPending}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? '...' : '+'}
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        This counter uses Server Actions to manage state
      </div>
    </div>
  );
};`
    },
    // Create contact form component
    {
      type: 'CREATE_FILE',
      path: 'src/components/server-actions/ContactForm.tsx',
      content: `'use client';

import React, { useState, useTransition } from 'react';
import { validateContactForm } from '../../lib/actions/example-actions.js';

export const ContactForm: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message?: string; errors?: Record<string, string[]> } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const actionResult = await validateContactForm(formData);
      setResult(actionResult);
      
      if (actionResult.success) {
        // Reset form on success
        const form = document.getElementById('contact-form') as HTMLFormElement;
        form?.reset();
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
      <p className="text-gray-600 mb-6">
        This form uses Server Actions for validation and processing
      </p>

      {result && (
        <div className={\`mb-4 p-4 rounded \${result.success ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}\`}>
          {result.success ? (
            <div>
              <p className="font-medium">{result.message}</p>
              {result.data && (
                <div className="mt-2 text-sm">
                  <p>Name: {result.data.name}</p>
                  <p>Email: {result.data.email}</p>
                  <p>Submitted: {new Date(result.data.submittedAt).toLocaleString()}</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="font-medium">{result.error}</p>
              {result.fieldErrors && (
                <ul className="mt-2 list-disc list-inside">
                  {Object.entries(result.fieldErrors).map(([field, errors]) => (
                    <li key={field}>
                      {field}: {errors.join(', ')}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}

      <form id="contact-form" action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your message here..."
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};`
    },
    // Create text processor component
    {
      type: 'CREATE_FILE',
      path: 'src/components/server-actions/TextProcessor.tsx',
      content: `'use client';

import React, { useState, useTransition } from 'react';
import { processText } from '../../lib/actions/example-actions.js';

export const TextProcessor: React.FC = () => {
  const [text, setText] = useState('');
  const [operation, setOperation] = useState<'uppercase' | 'lowercase' | 'reverse'>('uppercase');
  const [result, setResult] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleProcess = () => {
    if (!text.trim()) {
      setError('Please enter some text to process');
      return;
    }

    startTransition(async () => {
      setError(null);
      const actionResult = await processText(text, operation);
      
      if (actionResult.success) {
        setResult(actionResult.data);
      } else {
        setError(actionResult.error || 'Failed to process text');
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Text Processor</h2>
      <p className="text-gray-600 mb-6">
        Process text using Server Actions
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
            Text to Process
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter text here..."
          />
        </div>

        <div>
          <label htmlFor="operation" className="block text-sm font-medium text-gray-700 mb-1">
            Operation
          </label>
          <select
            id="operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value as 'uppercase' | 'lowercase' | 'reverse')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="reverse">Reverse</option>
          </select>
        </div>

        <button
          onClick={handleProcess}
          disabled={isPending || !text.trim()}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Processing...' : 'Process Text'}
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-green-50 border border-green-200 p-4 rounded">
            <h3 className="font-medium text-green-800 mb-2">Result:</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Original:</span> {result.original}
              </div>
              <div>
                <span className="font-medium">Processed:</span> {result.processed}
              </div>
              <div>
                <span className="font-medium">Operation:</span> {result.operation}
              </div>
              <div>
                <span className="font-medium">Length:</span> {result.length} characters
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};`
    }
  ]
};
