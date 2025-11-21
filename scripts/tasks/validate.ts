import type { CommandDefinition, CLIHandlerArgs } from '../types/cli.js';
import { runTsxScript } from '../lib/run-script.js';

type ValidateFlag =
  | 'blueprints'
  | 'templates'
  | 'paths'
  | 'contracts'
  | 'actions'
  | 'issues'
  | 'conflicts'
  | 'deadTemplates'
  | 'moduleSchema';

interface ValidateOptions {
  runAll: boolean;
  flags: Set<ValidateFlag>;
}

const ORDERED_FLAGS: ValidateFlag[] = [
  'blueprints',
  'templates',
  'paths',
  'contracts',
  'actions',
  'issues',
  'conflicts',
  'deadTemplates',
  'moduleSchema',
];

const SCRIPT_MAP: Record<ValidateFlag, string> = {
  blueprints: 'scripts/validation/validate-blueprints.ts',
  templates: 'scripts/validation/validate-templates.ts',
  paths: 'scripts/validation/validate-blueprint-paths.ts',
  contracts: 'scripts/validation/validate-contract-correctness.ts',
  actions: 'scripts/validation/validate-blueprint-actions.ts',
  issues: 'scripts/validation/validate-blueprint-issues.ts',
  conflicts: 'scripts/validation/validate-conflict-resolution.ts',
  deadTemplates: 'scripts/validation/dead-template-detector.ts',
  moduleSchema: 'scripts/validation/validate-module-schema.ts',
};

const FLAG_ALIASES: Record<string, ValidateFlag | 'all'> = {
  '--blueprints': 'blueprints',
  '--templates': 'templates',
  '--paths': 'paths',
  '--contracts': 'contracts',
  '--actions': 'actions',
  '--issues': 'issues',
  '--conflicts': 'conflicts',
  '--dead-templates': 'deadTemplates',
  '--module-schema': 'moduleSchema',
  '--all': 'all',
  '--comprehensive': 'all',
};

function parseValidateOptions(args: string[]): ValidateOptions {
  const flags = new Set<ValidateFlag>();
  let runAll = false;

  if (args.length === 0) {
    return { runAll: true, flags };
  }

  for (const arg of args) {
    const flag = FLAG_ALIASES[arg];
    if (!flag) continue;
    if (flag === 'all') {
      runAll = true;
      continue;
    }
    flags.add(flag);
  }

  if (!runAll && flags.size === 0) {
    runAll = true;
  }

  return { runAll, flags };
}

async function runValidateScripts({ context, options }: CLIHandlerArgs<ValidateOptions>): Promise<void> {
  const flagsToRun = options.runAll ? ORDERED_FLAGS : Array.from(options.flags);

  for (const flag of flagsToRun) {
    await runTsxScript(SCRIPT_MAP[flag], { baseDir: context.marketplaceRoot });
  }
}

export const validateCommand: CommandDefinition<ValidateOptions> = {
  name: 'validate',
  description: 'Run marketplace validation checks',
  parseOptions: parseValidateOptions,
  run: runValidateScripts,
};

