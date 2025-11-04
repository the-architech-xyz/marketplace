/**
 * Define Genome with Full Type Safety - Type Declarations
 */

import type { TypedGenome } from './genome-types.js';

/**
 * Define a genome with full type safety
 * 
 * @param genome - The genome configuration with type safety
 * @returns The genome with validated types
 */
export declare function defineGenome<T extends TypedGenome>(genome: T): T;
