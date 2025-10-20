#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🔧 Running ESLint fix...');

try {
  execSync('eslint . --ext .js,.jsx,.ts,.tsx --fix', {
    stdio: 'inherit',
    cwd: process.cwd(),
  });
  console.log('✅ ESLint fix completed successfully');
} catch (error) {
  console.error('❌ ESLint fix failed:', error.message);
  process.exit(1);
}
