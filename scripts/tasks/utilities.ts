import type { CommandDefinition, CLIHandlerArgs } from '../types/cli.js';
import { runNodeScript, runTsxScript } from '../lib/run-script.js';

type UtilityTarget = 'fixUseClient' | 'analyzeTemplates';

interface UtilitiesOptions {
  target?: UtilityTarget;
}

const UTILITY_MAP: Record<UtilityTarget, { path: string; runner: 'node' | 'tsx' }> = {
  fixUseClient: {
    path: 'scripts/fix-use-client-directives.mjs',
    runner: 'node',
  },
  analyzeTemplates: {
    path: 'scripts/utilities/analyze-template-blueprint-consistency.ts',
    runner: 'tsx',
  },
};

const TARGET_ALIASES: Record<string, UtilityTarget> = {
  'fix-use-client': 'fixUseClient',
  '--fix-use-client': 'fixUseClient',
  'analyze-templates': 'analyzeTemplates',
  '--analyze-templates': 'analyzeTemplates',
};

function parseUtilitiesOptions(args: string[]): UtilitiesOptions {
  for (const arg of args) {
    const target = TARGET_ALIASES[arg];
    if (target) {
      return { target };
    }
  }
  return {};
}

async function runUtilities({ context, options }: CLIHandlerArgs<UtilitiesOptions>): Promise<void> {
  if (!options.target) {
    console.error('Please specify a utility target. Available targets:');
    for (const key of Object.keys(TARGET_ALIASES)) {
      if (!key.startsWith('--')) {
        console.error(`  - ${key}`);
      }
    }
    process.exit(1);
  }

  const utility = UTILITY_MAP[options.target];

  if (utility.runner === 'node') {
    await runNodeScript(utility.path, { baseDir: context.marketplaceRoot });
  } else {
    await runTsxScript(utility.path, { baseDir: context.marketplaceRoot });
  }
}

export const utilitiesCommand: CommandDefinition<UtilitiesOptions> = {
  name: 'utilities',
  description: 'Run maintenance utilities (e.g. fix-use-client, analyze-templates)',
  parseOptions: parseUtilitiesOptions,
  run: runUtilities,
};


