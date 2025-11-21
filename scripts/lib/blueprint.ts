import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, resolve } from 'path';

export interface ParsedAction {
  type: string;
  template?: string;
  modifier?: string;
  path?: string;
}

export interface ParsedBlueprint {
  id: string;
  name: string;
  actions: ParsedAction[];
  filePath: string;
}

export function findBlueprintFiles(marketplaceRoot: string): string[] {
  const blueprintFiles: string[] = [];

  const searchDirectories = ['adapters', 'integrations', 'features', 'connectors'];

  for (const directory of searchDirectories) {
    const dirPath = join(marketplaceRoot, directory);
    if (existsSync(dirPath)) {
      scanDirectoryForBlueprints(dirPath, blueprintFiles);
    }
  }

  return blueprintFiles;
}

function scanDirectoryForBlueprints(dir: string, blueprintFiles: string[]): void {
  try {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        scanDirectoryForBlueprints(fullPath, blueprintFiles);
      } else if (entry.isFile() && entry.name === 'blueprint.ts') {
        blueprintFiles.push(fullPath);
      }
    }
  } catch (error) {
    console.warn(`⚠️  Could not scan directory ${dir}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export function parseBlueprint(blueprintPath: string): ParsedBlueprint | null {
  try {
    const sourceCode = readFileSync(blueprintPath, 'utf-8');

    const idMatch = sourceCode.match(/id:\s*['"`]([^'"`]+)['"`]/);
    const id = idMatch ? idMatch[1] : 'unknown';

    const nameMatch = sourceCode.match(/name:\s*['"`]([^'"`]+)['"`]/);
    const name = nameMatch ? nameMatch[1] : 'unknown';

    const actions = extractActions(sourceCode);

    return {
      id,
      name,
      actions,
      filePath: blueprintPath,
    };
  } catch (error) {
    console.warn(`⚠️  Failed to parse blueprint ${blueprintPath}: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

export function parseAllBlueprints(marketplaceRoot: string): ParsedBlueprint[] {
  const blueprints: ParsedBlueprint[] = [];
  const blueprintFiles = findBlueprintFiles(resolve(marketplaceRoot));

  for (const blueprintFile of blueprintFiles) {
    const parsedBlueprint = parseBlueprint(blueprintFile);
    if (parsedBlueprint) {
      blueprints.push(parsedBlueprint);
    }
  }

  return blueprints;
}

function extractActions(sourceCode: string): ParsedAction[] {
  const actions: ParsedAction[] = [];

  const actionsMatch = sourceCode.match(/actions:\s*\[([\s\S]*?)\]/);
  if (!actionsMatch) {
    return actions;
  }

  const actionsString = actionsMatch[1];

  const actionMatches = actionsString.match(/\{\s*type:\s*['"`]([^'"`]+)['"`][\s\S]*?\}/g);

  if (!actionMatches) {
    return actions;
  }

  for (const actionString of actionMatches) {
    const action: ParsedAction = { type: 'unknown' };

    const typeMatch = actionString.match(/type:\s*['"`]([^'"`]+)['"`]/);
    if (typeMatch) {
      action.type = typeMatch[1];
    }

    const templateMatch = actionString.match(/template:\s*['"`]([^'"`]+)['"`]/);
    if (templateMatch) {
      action.template = templateMatch[1];
    }

    const modifierMatch = actionString.match(/modifier:\s*['"`]([^'"`]+)['"`]/);
    if (modifierMatch) {
      action.modifier = modifierMatch[1];
    }

    const pathMatch = actionString.match(/path:\s*['"`]([^'"`]+)['"`]/);
    if (pathMatch) {
      action.path = pathMatch[1];
    }

    actions.push(action);
  }

  return actions;
}


