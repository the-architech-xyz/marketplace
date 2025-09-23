/**
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
}
    },
    // Create server actions components
    {
