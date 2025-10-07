#!/usr/bin/env node

/**
 * Dynamic Radix UI Dependency Installer
 * 
 * Installs only the Radix UI components needed for the selected shadcn components
 * This reduces bundle size and installation time significantly
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Component to Radix dependency mapping
const COMPONENT_DEPS = {
  'dialog': '@radix-ui/react-dialog@^1.0.5',
  'dropdown-menu': '@radix-ui/react-dropdown-menu@^2.0.6',
  'label': '@radix-ui/react-label@^2.0.2',
  'select': '@radix-ui/react-select@^2.0.0',
  'separator': '@radix-ui/react-separator@^1.0.3',
  'switch': '@radix-ui/react-switch@^1.0.3',
  'tabs': '@radix-ui/react-tabs@^1.0.4',
  'tooltip': '@radix-ui/react-tooltip@^1.0.7',
  'accordion': '@radix-ui/react-accordion@^1.1.2',
  'alert-dialog': '@radix-ui/react-alert-dialog@^1.0.5',
  'avatar': '@radix-ui/react-avatar@^1.0.4',
  'checkbox': '@radix-ui/react-checkbox@^1.0.4',
  'collapsible': '@radix-ui/react-collapsible@^1.0.3',
  'context-menu': '@radix-ui/react-context-menu@^2.1.5',
  'hover-card': '@radix-ui/react-hover-card@^1.0.7',
  'menubar': '@radix-ui/react-menubar@^1.0.4',
  'navigation-menu': '@radix-ui/react-navigation-menu@^1.1.4',
  'popover': '@radix-ui/react-popover@^1.0.7',
  'progress': '@radix-ui/react-progress@^1.0.3',
  'radio-group': '@radix-ui/react-radio-group@^1.1.3',
  'scroll-area': '@radix-ui/react-scroll-area@^1.0.5',
  'slider': '@radix-ui/react-slider@^1.1.2',
  'toggle': '@radix-ui/react-toggle@^1.0.3',
  'toggle-group': '@radix-ui/react-toggle-group@^1.0.4'
};

// Get components from genome parameters
const components = {{#if module.parameters.components}}[
  {{#each module.parameters.components}}
  "{{this}}"{{#unless @last}},{{/unless}}
  {{/each}}
]{{else}}[]{{/if}};

console.log('🎯 Installing Radix UI dependencies for components:', components.join(', '));

// Filter dependencies based on selected components
const dependenciesToInstall = components
  .filter(component => COMPONENT_DEPS[component])
  .map(component => COMPONENT_DEPS[component]);

if (dependenciesToInstall.length === 0) {
  console.log('✅ No additional Radix UI dependencies needed');
  process.exit(0);
}

console.log('📦 Installing Radix UI packages:', dependenciesToInstall.join(', '));

try {
  // Install dependencies
  const installCommand = `npm install ${dependenciesToInstall.join(' ')}`;
  execSync(installCommand, { stdio: 'inherit' });
  
  console.log('✅ Successfully installed Radix UI dependencies');
} catch (error) {
  console.error('❌ Failed to install Radix UI dependencies:', error.message);
  process.exit(1);
}
