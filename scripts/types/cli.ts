export interface CLIHandlerArgs<TOptions = unknown> {
  context: {
    marketplaceRoot: string;
  };
  options: TOptions;
}

export interface CommandDefinition<TOptions = unknown> {
  name: string;
  description: string;
  parseOptions: (args: string[]) => TOptions;
  run: (args: CLIHandlerArgs<TOptions>) => Promise<void>;
}


