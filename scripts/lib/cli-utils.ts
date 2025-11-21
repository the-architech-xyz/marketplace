import type { CommandDefinition } from '../types/cli.js';

export interface CLIContext {
  marketplaceRoot: string;
}

export function buildCommandMap(commands: CommandDefinition[]): Record<string, CommandDefinition> {
  return Object.fromEntries(commands.map(command => [command.name, command]));
}

export function normalizeArgs(argv: string[]): { command?: string; options: string[] } {
  const [, , command, ...options] = argv;
  return { command, options };
}


