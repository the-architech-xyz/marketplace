import type { CommandDefinition, CLIHandlerArgs } from '../types/cli.js';
import { runTsxScript } from '../lib/run-script.js';

type BuildMode = 'check' | 'build' | 'all';

interface BuildOptions {
  mode: BuildMode;
}

function parseBuildOptions(args: string[]): BuildOptions {
  if (args.length === 0) {
    return { mode: 'all' };
  }

  for (const arg of args) {
    if (arg === '--check' || arg === 'check') {
      return { mode: 'check' };
    }
    if (arg === '--build' || arg === 'build') {
      return { mode: 'build' };
    }
    if (arg === '--all' || arg === 'all') {
      return { mode: 'all' };
    }
  }

  return { mode: 'all' };
}

async function runBuild({ context, options }: CLIHandlerArgs<BuildOptions>): Promise<void> {
  await runTsxScript('scripts/build/run.ts', {
    baseDir: context.marketplaceRoot,
    args: [options.mode],
  });
}

export const buildCommand: CommandDefinition<BuildOptions> = {
  name: 'build',
  description: 'Run marketplace build pipeline (check, build, or all)',
  parseOptions: parseBuildOptions,
  run: runBuild,
};


