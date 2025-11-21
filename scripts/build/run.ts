#!/usr/bin/env node

/**
 * Marketplace Build Orchestrator
 *
 * Runs validation and build stages without spawning a swarm of separate tsx processes.
 * Usage:
 *   pnpm run check       -> tsx scripts/build/run.ts check
 *   pnpm run build:dist  -> tsx scripts/build/run.ts build
 *   pnpm run build       -> tsx scripts/build/run.ts all
 */

import { spawn } from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { glob } from 'glob';
import { generateFeatureManifests } from '../generation/generate-feature-manifests.js';
import { generateCapabilityFirstManifest } from '../generation/generate-capability-first-manifest.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const marketplaceRoot = path.join(__dirname, '..', '..');

async function runCommand(command: string, args: string[]): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: marketplaceRoot,
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed: ${command} ${args.join(' ')} (code ${code})`));
      }
    });
    child.on('error', reject);
  });
}

async function runCheck(): Promise<void> {
  console.log('🔎 Running marketplace validations...');
  await runCommand('tsx', ['scripts/validation/validate-contract-correctness.ts']);
  await runCommand('tsx', ['scripts/validation/validate-module-schema.ts']);
  console.log('✅ Validations complete.');
}

async function compileTypeScript(): Promise<void> {
  console.log('🛠️  Compiling TypeScript sources...');
  await runCommand('tsc', ['--maxNodeModuleJsDepth', '0']);
  console.log('✅ TypeScript compilation complete.');
}

async function syncTypeDeclarations(): Promise<void> {
  const source = path.join(marketplaceRoot, 'types');
  const destination = path.join(marketplaceRoot, 'dist', 'types');

  console.log('📋 Syncing type declaration assets...');

  const declarationFiles = await glob('**/*.d.ts', {
    cwd: source,
    dot: false,
    nodir: true
  });

  for (const relativePath of declarationFiles) {
    const from = path.join(source, relativePath);
    const to = path.join(destination, relativePath);
    await fs.mkdir(path.dirname(to), { recursive: true });
    await fs.copyFile(from, to);
  }

  console.log('✅ Type declaration assets synced.');
}

async function runBuild(): Promise<void> {
  console.log('�� Building marketplace artifacts...');
  await generateFeatureManifests();
  await generateCapabilityFirstManifest(marketplaceRoot, path.join(marketplaceRoot, 'dist'));
  await compileTypeScript();
  await syncTypeDeclarations();
  console.log('🎉 Marketplace build complete.');
}

async function main(): Promise<void> {
  const mode = process.argv[2] ?? 'all';

  if (mode === 'check') {
    await runCheck();
    return;
  }

  if (mode === 'build') {
    await runBuild();
    return;
  }

  if (mode === 'all') {
    await runCheck();
    await runBuild();
    return;
  }

  console.error(`Unknown mode "${mode}". Expected "check", "build", or "all".`);
  process.exit(1);
}

main().catch((error) => {
  console.error('❌ Marketplace build failed:', error);
  process.exit(1);
});
