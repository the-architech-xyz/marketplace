/**
 * Database Transactions
 * 
 * Comprehensive transaction utilities for Drizzle ORM
 * Provides safe, reliable database operations with rollback support
 */

import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';

/**
 * Transaction result type
 */
interface TransactionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  rollback?: () => Promise<void>;
}

/**
 * Transaction options
 */
interface TransactionOptions {
  isolationLevel?: 'READ UNCOMMITTED' | 'READ COMMITTED' | 'REPEATABLE READ' | 'SERIALIZABLE';
  timeout?: number; // in milliseconds
  retries?: number;
  retryDelay?: number; // in milliseconds
}

/**
 * Execute a function within a database transaction
 * 
 * @param fn - Function to execute within the transaction
 * @param options - Transaction options
 * @returns Transaction result
 */
export async function withTransaction<T>(
  fn: (tx: typeof db) => Promise<T>,
  options: TransactionOptions = {}
): Promise<TransactionResult<T>> {
  const {
    isolationLevel = 'READ COMMITTED',
    timeout = 30000, // 30 seconds
    retries = 3,
    retryDelay = 1000 // 1 second
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await db.transaction(async (tx) => {
        // Set isolation level if supported
        if (isolationLevel !== 'READ COMMITTED') {
          await tx.execute(sql`SET TRANSACTION ISOLATION LEVEL ${sql.raw(isolationLevel)}`);
        }

        // Set timeout if supported
        if (timeout > 0) {
          await tx.execute(sql`SET LOCAL statement_timeout = ${timeout}`);
        }

        // Execute the function
        return await fn(tx);
      });

      return {
        success: true,
        data: result
      };
    } catch (error) {
      lastError = error as Error;
      
      // If this is the last attempt, return the error
      if (attempt === retries) {
        return {
          success: false,
          error: lastError.message
        };
      }

      // Wait before retrying
      if (retryDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }

  return {
    success: false,
    error: lastError?.message || 'Transaction failed after all retries'
  };
}

/**
 * Execute multiple operations in a single transaction
 * 
 * @param operations - Array of operations to execute
 * @param options - Transaction options
 * @returns Transaction result
 */
export async function withBatchTransaction<T>(
  operations: Array<(tx: typeof db) => Promise<T>>,
  options: TransactionOptions = {}
): Promise<TransactionResult<T[]>> {
  return withTransaction(async (tx) => {
    const results: T[] = [];
    
    for (const operation of operations) {
      const result = await operation(tx);
      results.push(result);
    }
    
    return results;
  }, options);
}

/**
 * Execute operations with conditional rollback
 * 
 * @param operations - Array of operations to execute
 * @param rollbackCondition - Function to determine if rollback is needed
 * @param options - Transaction options
 * @returns Transaction result
 */
export async function withConditionalTransaction<T>(
  operations: Array<(tx: typeof db) => Promise<T>>,
  rollbackCondition: (results: T[]) => boolean,
  options: TransactionOptions = {}
): Promise<TransactionResult<T[]>> {
  return withTransaction(async (tx) => {
    const results: T[] = [];
    
    for (const operation of operations) {
      const result = await operation(tx);
      results.push(result);
    }
    
    // Check if rollback is needed
    if (rollbackCondition(results)) {
      throw new Error('Rollback condition met');
    }
    
    return results;
  }, options);
}

/**
 * Execute operations with automatic retry on deadlock
 * 
 * @param fn - Function to execute within the transaction
 * @param options - Transaction options
 * @returns Transaction result
 */
export async function withRetryOnDeadlock<T>(
  fn: (tx: typeof db) => Promise<T>,
  options: TransactionOptions = {}
): Promise<TransactionResult<T>> {
  const maxRetries = options.retries || 5;
  const retryDelay = options.retryDelay || 1000;
  
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await withTransaction(fn, { ...options, retries: 0 });
    } catch (error) {
      lastError = error as Error;
      
      // Check if it's a deadlock error
      const isDeadlock = lastError.message.includes('deadlock') || 
                        lastError.message.includes('Deadlock') ||
                        lastError.message.includes('DEADLOCK');
      
      if (!isDeadlock || attempt === maxRetries) {
        return {
          success: false,
          error: lastError.message
        };
      }

      // Wait with exponential backoff
      const delay = retryDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  return {
    success: false,
    error: lastError?.message || 'Transaction failed after all retries'
  };
}

/**
 * Execute operations with optimistic locking
 * 
 * @param fn - Function to execute within the transaction
 * @param versionField - Field name for version checking
 * @param options - Transaction options
 * @returns Transaction result
 */
export async function withOptimisticLocking<T>(
  fn: (tx: typeof db) => Promise<T>,
  versionField: string = 'version',
  options: TransactionOptions = {}
): Promise<TransactionResult<T>> {
  const maxRetries = options.retries || 3;
  const retryDelay = options.retryDelay || 100;
  
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await withTransaction(fn, { ...options, retries: 0 });
    } catch (error) {
      lastError = error as Error;
      
      // Check if it's a version conflict error
      const isVersionConflict = lastError.message.includes('version') || 
                               lastError.message.includes('Version') ||
                               lastError.message.includes('VERSION');
      
      if (!isVersionConflict || attempt === maxRetries) {
        return {
          success: false,
          error: lastError.message
        };
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }

  return {
    success: false,
    error: lastError?.message || 'Transaction failed after all retries'
  };
}

/**
 * Execute operations with read-only transaction
 * 
 * @param fn - Function to execute within the read-only transaction
 * @param options - Transaction options
 * @returns Transaction result
 */
export async function withReadOnlyTransaction<T>(
  fn: (tx: typeof db) => Promise<T>,
  options: TransactionOptions = {}
): Promise<TransactionResult<T>> {
  return withTransaction(async (tx) => {
    // Set transaction to read-only
    await tx.execute(sql`SET TRANSACTION READ ONLY`);
    
    return await fn(tx);
  }, options);
}

/**
 * Execute operations with write transaction
 * 
 * @param fn - Function to execute within the write transaction
 * @param options - Transaction options
 * @returns Transaction result
 */
export async function withWriteTransaction<T>(
  fn: (tx: typeof db) => Promise<T>,
  options: TransactionOptions = {}
): Promise<TransactionResult<T>> {
  return withTransaction(async (tx) => {
    // Set transaction to read-write
    await tx.execute(sql`SET TRANSACTION READ WRITE`);
    
    return await fn(tx);
  }, options);
}

/**
 * Execute operations with savepoint support
 * 
 * @param fn - Function to execute within the transaction
 * @param savepoints - Array of savepoint names
 * @param options - Transaction options
 * @returns Transaction result
 */
export async function withSavepoints<T>(
  fn: (tx: typeof db) => Promise<T>,
  savepoints: string[] = [],
  options: TransactionOptions = {}
): Promise<TransactionResult<T>> {
  return withTransaction(async (tx) => {
    const createdSavepoints: string[] = [];
    
    try {
      // Create savepoints
      for (const savepoint of savepoints) {
        await tx.execute(sql`SAVEPOINT ${sql.raw(savepoint)}`);
        createdSavepoints.push(savepoint);
      }
      
      return await fn(tx);
    } catch (error) {
      // Rollback to the last savepoint
      if (createdSavepoints.length > 0) {
        const lastSavepoint = createdSavepoints[createdSavepoints.length - 1];
        await tx.execute(sql`ROLLBACK TO SAVEPOINT ${sql.raw(lastSavepoint)}`);
      }
      
      throw error;
    }
  }, options);
}

/**
 * Transaction utilities
 */
export class TransactionUtils {
  /**
   * Check if a transaction is active
   */
  static isTransactionActive(): boolean {
    // This would need to be implemented based on your database driver
    // For now, we'll return false as a placeholder
    return false;
  }

  /**
   * Get current transaction ID
   */
  static getCurrentTransactionId(): string | null {
    // This would need to be implemented based on your database driver
    // For now, we'll return null as a placeholder
    return null;
  }

  /**
   * Get transaction status
   */
  static async getTransactionStatus(): Promise<{
    isActive: boolean;
    isolationLevel: string;
    isReadOnly: boolean;
  }> {
    // This would need to be implemented based on your database driver
    // For now, we'll return default values
    return {
      isActive: false,
      isolationLevel: 'READ COMMITTED',
      isReadOnly: false
    };
  }
}

/**
 * Common transaction patterns
 */
export class TransactionPatterns {
  /**
   * Create or update pattern
   * Tries to create, if exists then update
   */
  static async createOrUpdate<T>(
    createFn: (tx: typeof db) => Promise<T>,
    updateFn: (tx: typeof db) => Promise<T>,
    existsFn: (tx: typeof db) => Promise<boolean>
  ): Promise<TransactionResult<T>> {
    return withTransaction(async (tx) => {
      const exists = await existsFn(tx);
      
      if (exists) {
        return await updateFn(tx);
      } else {
        return await createFn(tx);
      }
    });
  }

  /**
   * Upsert pattern
   * Insert or update based on conflict
   */
  static async upsert<T>(
    insertFn: (tx: typeof db) => Promise<T>,
    updateFn: (tx: typeof db) => Promise<T>,
    conflictColumns: string[]
  ): Promise<TransactionResult<T>> {
    return withTransaction(async (tx) => {
      try {
        return await insertFn(tx);
      } catch (error) {
        // If it's a unique constraint violation, try update
        if (error instanceof Error && error.message.includes('unique')) {
          return await updateFn(tx);
        }
        throw error;
      }
    });
  }

  /**
   * Delete cascade pattern
   * Delete with related records
   */
  static async deleteCascade<T>(
    deleteFn: (tx: typeof db) => Promise<T>,
    cascadeFns: Array<(tx: typeof db) => Promise<any>>
  ): Promise<TransactionResult<T>> {
    return withTransaction(async (tx) => {
      // Execute cascade operations first
      for (const cascadeFn of cascadeFns) {
        await cascadeFn(tx);
      }
      
      // Then delete the main record
      return await deleteFn(tx);
    });
  }

  /**
   * Batch insert pattern
   * Insert multiple records efficiently
   */
  static async batchInsert<T>(
    insertFn: (tx: typeof db, batch: T[]) => Promise<any>,
    records: T[],
    batchSize: number = 1000
  ): Promise<TransactionResult<any[]>> {
    return withTransaction(async (tx) => {
      const results: any[] = [];
      
      for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        const result = await insertFn(tx, batch);
        results.push(result);
      }
      
      return results;
    });
  }
}
