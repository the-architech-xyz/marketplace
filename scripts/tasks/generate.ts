import type { CommandDefinition, CLIHandlerArgs } from '../types/cli.js';
import { runTsxScript } from '../lib/run-script.js';

type GenerateTarget = 'types' | 'manifest' | 'featureManifests' | 'capabilityFirst';

interface GenerateOptions {
  all: boolean;
  targets: Set<GenerateTarget>;
}

const TARGET_SCRIPTS: Record<GenerateTarget, string> = {
  types: 'scripts/generation/generate-constitutional-types-cli.ts',
  manifest: 'scripts/generation/generate-marketplace-manifest.ts',
  featureManifests: 'scripts/generation/generate-feature-manifests.ts',
  capabilityFirst: 'scripts/generation/generate-capability-first-manifest.ts',
};

const TARGET_ALIASES: Record<string, GenerateTarget> = {
  '--types': 'types',
  '--manifest': 'manifest',
  '--feature-manifests': 'featureManifests',
  '--capability-first': 'capabilityFirst',
};

function parseGenerateOptions(args: string[]): GenerateOptions {
  if (args.length === 0) {
    return { all: true, targets: new Set() };
  }

  const targets = new Set<GenerateTarget>();
  let all = false;

  for (const arg of args) {
    if (arg === '--all') {
      all = true;
      continue;
    }
    const target = TARGET_ALIASES[arg];
    if (target) {
      targets.add(target);
    }
  }

  if (!all && targets.size === 0) {
    all = true;
  }

  return { all, targets };
}

async function runGenerateScripts({ context, options }: CLIHandlerArgs<GenerateOptions>): Promise<void> {
  const targets: GenerateTarget[] = [];

  if (options.all) {
    targets.push('types', 'manifest', 'featureManifests', 'capabilityFirst');
  } else {
    targets.push(...options.targets);
  }

  for (const target of targets) {
    await runTsxScript(TARGET_SCRIPTS[target], { baseDir: context.marketplaceRoot });
  }
}

export const generateCommand: CommandDefinition<GenerateOptions> = {
  name: 'generate',
  description: 'Generate marketplace artifacts (types, manifests, etc.)',
  parseOptions: parseGenerateOptions,
  run: runGenerateScripts,
};


