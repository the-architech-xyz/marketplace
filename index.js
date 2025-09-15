/**
 * The Architech Marketplace
 * 
 * Main entry point for the marketplace package.
 * Provides utilities for loading adapters and integrations.
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get the marketplace root directory
 */
export function getMarketplaceRoot() {
  return __dirname;
}

/**
 * Load the marketplace manifest
 */
export function loadManifest() {
  try {
    const manifestPath = join(__dirname, 'manifest.json');
    const manifestContent = readFileSync(manifestPath, 'utf-8');
    return JSON.parse(manifestContent);
  } catch (error) {
    throw new Error(`Failed to load marketplace manifest: ${error.message}`);
  }
}

/**
 * Load an adapter configuration
 */
export function loadAdapter(category, adapterId) {
  try {
    const adapterPath = join(__dirname, 'adapters', category, adapterId, 'adapter.json');
    const adapterContent = readFileSync(adapterPath, 'utf-8');
    return JSON.parse(adapterContent);
  } catch (error) {
    throw new Error(`Failed to load adapter ${category}/${adapterId}: ${error.message}`);
  }
}

/**
 * Load an integration configuration
 */
export function loadIntegration(integrationId) {
  try {
    const integrationPath = join(__dirname, 'integrations', integrationId, 'integration.json');
    const integrationContent = readFileSync(integrationPath, 'utf-8');
    return JSON.parse(integrationContent);
  } catch (error) {
    throw new Error(`Failed to load integration ${integrationId}: ${error.message}`);
  }
}

/**
 * Load a blueprint file (TypeScript)
 */
export function loadBlueprint(category, moduleId, type = 'adapter') {
  try {
    const blueprintPath = join(
      __dirname, 
      type === 'adapter' ? 'adapters' : 'integrations',
      type === 'adapter' ? category : moduleId,
      type === 'adapter' ? moduleId : moduleId,
      'blueprint.ts'
    );
    return readFileSync(blueprintPath, 'utf-8');
  } catch (error) {
    throw new Error(`Failed to load blueprint for ${type} ${category}/${moduleId}: ${error.message}`);
  }
}

/**
 * Get all available adapters
 */
export function getAllAdapters() {
  const manifest = loadManifest();
  return manifest.adapters || [];
}

/**
 * Get all available integrations
 */
export function getAllIntegrations() {
  const manifest = loadManifest();
  return manifest.integrations || [];
}

/**
 * Check if an adapter exists
 */
export function adapterExists(category, adapterId) {
  try {
    loadAdapter(category, adapterId);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if an integration exists
 */
export function integrationExists(integrationId) {
  try {
    loadIntegration(integrationId);
    return true;
  } catch {
    return false;
  }
}


