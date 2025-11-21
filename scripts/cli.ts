#!/usr/bin/env tsx

import path from 'path';
import { fileURLToPath } from 'url';
import { normalizeArgs, buildCommandMap } from './lib/cli-utils.js';
import type { CommandDefinition } from './types/cli.js';
import { validateCommand } from './tasks/validate.js';
import { generateCommand } from './tasks/generate.js';
import { buildCommand } from './tasks/build.js';
import { utilitiesCommand } from './tasks/utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const commands: CommandDefinition<any>[] = [
  validateCommand,
  generateCommand,
  buildCommand,
  utilitiesCommand,
];

async function main(): Promise<void> {
  const { command, options } = normalizeArgs(process.argv);

  const commandMap = buildCommandMap(commands);

  if (!command || !commandMap[command]) {
    console.error('Unknown command. Available commands:');
    for (const cmd of commands) {
      console.error(`  - ${cmd.name}: ${cmd.description}`);
    }
    process.exit(1);
  }

  const handler = commandMap[command];

  await handler.run({
    context: {
      marketplaceRoot: path.resolve(__dirname, '..'),
    },
    options: handler.parseOptions(options),
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});


