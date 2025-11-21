import { promises as fs } from 'fs';
import * as path from 'path';
import { glob } from 'glob';

export function toPosixPath(filePath: string): string {
  return filePath.split(path.sep).join('/');
}

export async function resolveBlueprintForModule(
  moduleDir: string,
  marketplaceRoot: string
): Promise<{ file: string; runtime: 'source' | 'compiled' }> {
  const sourceBlueprint = path.join(marketplaceRoot, moduleDir, 'blueprint.ts');
  try {
    await fs.access(sourceBlueprint);
    return {
      file: toPosixPath(path.posix.join(moduleDir, 'blueprint.ts')),
      runtime: 'source'
    };
  } catch {
    // no-op
  }

  const compiledBlueprint = path.join(marketplaceRoot, 'dist', moduleDir, 'blueprint.js');
  try {
    await fs.access(compiledBlueprint);
    return {
      file: toPosixPath(path.posix.join('dist', moduleDir, 'blueprint.js')),
      runtime: 'compiled'
    };
  } catch {
    // no-op
  }

  return {
    file: toPosixPath(path.posix.join(moduleDir, 'blueprint.ts')),
    runtime: 'source'
  };
}

export async function collectTemplatesForModule(
  moduleDir: string,
  marketplaceRoot: string
): Promise<string[]> {
  const templatesDir = path.join(marketplaceRoot, moduleDir, 'templates');
  try {
    await fs.access(templatesDir);
  } catch {
    return [];
  }

  const files = await glob('**/*.tpl', { cwd: templatesDir, windowsPathsNoEscape: true });
  return files.map(templatePath => toPosixPath(path.posix.join(moduleDir, 'templates', templatePath)));
}


