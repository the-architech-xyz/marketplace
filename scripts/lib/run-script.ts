import { spawn } from 'child_process';
import path from 'path';

export interface RunScriptOptions {
  args?: string[];
  cwd?: string;
  baseDir?: string;
}

export function runTsxScript(relativeScriptPath: string, options: RunScriptOptions = {}): Promise<void> {
  const baseDir = options.baseDir ?? process.cwd();
  const scriptPath = path.join(baseDir, relativeScriptPath);
  const args = options.args ?? [];

  return new Promise((resolve, reject) => {
    const child = spawn('tsx', [scriptPath, ...args], {
      cwd: options.cwd ?? baseDir,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Script ${relativeScriptPath} exited with code ${code}`));
      }
    });

    child.on('error', reject);
  });
}

export function runNodeScript(relativeScriptPath: string, options: RunScriptOptions = {}): Promise<void> {
  const baseDir = options.baseDir ?? process.cwd();
  const scriptPath = path.join(baseDir, relativeScriptPath);
  const args = options.args ?? [];

  return new Promise((resolve, reject) => {
    const child = spawn('node', [scriptPath, ...args], {
      cwd: options.cwd ?? baseDir,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Script ${relativeScriptPath} exited with code ${code}`));
      }
    });

    child.on('error', reject);
  });
}


