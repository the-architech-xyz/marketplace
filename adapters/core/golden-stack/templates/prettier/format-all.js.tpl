#!/usr/bin/env node

/**
 * Format All Files
 * 
 * Script to format all files in the project using Prettier.
 * This script is used by the quality/prettier adapter.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const CONFIG = {
  // File patterns to format
  patterns: [
    '**/*.{js,jsx,ts,tsx,json,css,scss,md,yml,yaml}',
    '!node_modules/**',
    '!.next/**',
    '!dist/**',
    '!build/**',
    '!.git/**',
  ],
  
  // Prettier options
  prettierOptions: {
    '--write': true,
    '--config': '.prettierrc',
    '--ignore-path': '.prettierignore',
  },
  
  // Exit codes
  EXIT_CODES: {
    SUCCESS: 0,
    ERROR: 1,
    NO_FILES: 2,
  },
};

/**
 * Check if Prettier is installed
 */
function checkPrettierInstalled() {
  try {
    execSync('npx prettier --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    console.error('❌ Prettier is not installed. Please install it first:');
    console.error('   npm install --save-dev prettier');
    return false;
  }
}

/**
 * Check if Prettier config exists
 */
function checkPrettierConfig() {
  const configFiles = ['.prettierrc', '.prettierrc.js', '.prettierrc.json', 'prettier.config.js'];
  
  for (const configFile of configFiles) {
    if (fs.existsSync(configFile)) {
      return true;
    }
  }
  
  console.warn('⚠️  No Prettier configuration file found. Using default settings.');
  return false;
}

/**
 * Get files to format
 */
function getFilesToFormat() {
  try {
    const command = `npx prettier --list ${CONFIG.patterns.join(' ')}`;
    const output = execSync(command, { encoding: 'utf8' });
    return output.trim().split('\n').filter(file => file.length > 0);
  } catch (error) {
    console.error('❌ Error getting files to format:', error.message);
    return [];
  }
}

/**
 * Format files using Prettier
 */
function formatFiles(files) {
  if (files.length === 0) {
    console.log('✅ No files to format.');
    return CONFIG.EXIT_CODES.NO_FILES;
  }
  
  try {
    console.log(`🎨 Formatting ${files.length} files...`);
    
    const command = `npx prettier ${Object.entries(CONFIG.prettierOptions)
      .map(([key, value]) => value === true ? key : `${key} ${value}`)
      .join(' ')} ${CONFIG.patterns.join(' ')}`;
    
    execSync(command, { stdio: 'inherit' });
    
    console.log('✅ All files formatted successfully!');
    return CONFIG.EXIT_CODES.SUCCESS;
  } catch (error) {
    console.error('❌ Error formatting files:', error.message);
    return CONFIG.EXIT_CODES.ERROR;
  }
}

/**
 * Check if files are already formatted
 */
function checkFormatting(files) {
  try {
    console.log('🔍 Checking if files are already formatted...');
    
    const command = `npx prettier --check ${CONFIG.patterns.join(' ')}`;
    execSync(command, { stdio: 'pipe' });
    
    console.log('✅ All files are already formatted!');
    return CONFIG.EXIT_CODES.SUCCESS;
  } catch (error) {
    // Files need formatting
    return formatFiles(files);
  }
}

/**
 * Main function
 */
function main() {
  console.log('🚀 Starting Prettier formatting...');
  
  // Check if Prettier is installed
  if (!checkPrettierInstalled()) {
    process.exit(CONFIG.EXIT_CODES.ERROR);
  }
  
  // Check if Prettier config exists
  checkPrettierConfig();
  
  // Get files to format
  const files = getFilesToFormat();
  
  if (files.length === 0) {
    console.log('✅ No files to format.');
    process.exit(CONFIG.EXIT_CODES.NO_FILES);
  }
  
  // Check if files need formatting
  const exitCode = checkFormatting(files);
  process.exit(exitCode);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  formatFiles,
  checkFormatting,
  getFilesToFormat,
  checkPrettierInstalled,
  checkPrettierConfig,
};
