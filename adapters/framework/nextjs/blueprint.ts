/**
 * Next.js 15+ Base Blueprint
 * 
 * Creates a modern Next.js 15+ project with React 19, App Router, and TypeScript
 * This blueprint provides the core foundation - UI and styling are handled by other modules
 * 
 * NOTE: In monorepos, create-next-app detects workspace and generates workspace:* protocol
 * which npm doesn't support. We use --skip-install and clean the package.json before installing.
 * 
 * NOTE: StructureInitializationLayer no longer creates files in app directories,
 * so create-next-app can run without conflicts from existing files.
 */

import { BlueprintAction, BlueprintActionType } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'framework/nextjs'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);
  const actions: BlueprintAction[] = [];
  
  // Check if we're in a monorepo
  const project = (config as any).templateContext?.project || (config as any).project;
  const isMonorepo = project?.structure === 'monorepo';
  
  // In monorepo, hide root package.json temporarily to prevent create-next-app from detecting workspace
  // This is the most reliable solution: create-next-app won't see the workspace and won't generate workspace:*
  if (isMonorepo) {
    // Temporarily rename root package.json to hide it from create-next-app
    actions.push({
      type: BlueprintActionType.RUN_COMMAND,
      command: 'cd ../.. && if [ -f package.json ]; then mv package.json package.json.tmp; fi'
    });
  }
  
  // Build create-next-app command
  const createNextAppCommand = [
    'npx create-next-app@latest .',
    '--typescript',
    params?.eslint ? '--eslint' : '',
    '--app',
    '--src-dir',
    `--import-alias "${params?.importAlias || '@'}/"`,
    isMonorepo ? '--skip-install' : '',
    '--yes'
  ].filter(Boolean).join(' ');
  
  actions.push({
    type: BlueprintActionType.RUN_COMMAND,
    command: createNextAppCommand
  });
  
  // Restore root package.json after create-next-app completes
  if (isMonorepo) {
    actions.push({
      type: BlueprintActionType.RUN_COMMAND,
      command: 'cd ../.. && if [ -f package.json.tmp ]; then mv package.json.tmp package.json; fi'
    });
    
    // NOTE: npm install is handled centrally by OrchestratorAgent.installDependencies()
    // This avoids double installations and ENFILE errors (file table overflow)
    // The orchestrator will install dependencies after all modules are executed
  }
  
  // Dynamically install React version based on parameter (only if specified)
  if (params?.reactVersion) {
    actions.push({
      type: BlueprintActionType.RUN_COMMAND,
      command: `npm install react@${params.reactVersion} react-dom@${params.reactVersion} @types/react@^${params.reactVersion}.0.0 @types/react-dom@^${params.reactVersion}.0.0 --legacy-peer-deps`
    });
  }
  
  return actions;
}
