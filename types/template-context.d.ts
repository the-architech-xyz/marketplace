/**
 * Template Context Types
 * 
 * Extended ProjectContext with paths support
 */

import type { ProjectContext as BaseProjectContext } from '@thearchitech.xyz/types';

export interface ProjectContext extends BaseProjectContext {
  paths?: Record<string, string>;
  env?: Record<string, string>;
}

export type { BaseProjectContext } from '@thearchitech.xyz/types';

