/**
 * UI Marketplace Discovery Utility
 * 
 * Discovers available UI marketplaces (shadcn, tamagui, etc.) for template validation.
 * Supports both dev mode (sibling directories) and prod mode (npm packages).
 */

import * as fs from 'fs';
import * as path from 'path';

export interface UIMarketplace {
  name: string;        // 'shadcn', 'tamagui', etc.
  path: string;        // Full path to marketplace
  exists: boolean;    // Whether marketplace exists
}

/**
 * Discover available UI marketplaces
 * 
 * Checks:
 * 1. Sibling directories (dev mode): marketplace-shadcn, marketplace-tamagui
 * 2. NPM packages (prod mode): @thearchitech/marketplace-shadcn, etc.
 * 3. Custom paths from environment/config (future)
 */
export async function discoverUIMarketplaces(
  coreMarketplacePath: string
): Promise<UIMarketplace[]> {
  const marketplaces: UIMarketplace[] = [];
  
  // Default UI marketplaces to check
  const defaultMarketplaces = ['shadcn', 'tamagui'];
  
  // 1. Check sibling directories (dev mode)
  const parentDir = path.dirname(coreMarketplacePath);
  
  for (const name of defaultMarketplaces) {
    const marketplaceName = `marketplace-${name}`;
    const devPath = path.join(parentDir, marketplaceName);
    
    if (fs.existsSync(devPath) && fs.statSync(devPath).isDirectory()) {
      marketplaces.push({
        name,
        path: devPath,
        exists: true
      });
    }
  }
  
  // 2. Check npm packages (prod mode)
  // Note: This would require checking node_modules, which might not be available
  // in the marketplace validation context. Skip for now, can be added later.
  
  // 3. Future: Check custom paths from config
  
  return marketplaces;
}

/**
 * Find UI template in discovered marketplaces
 * 
 * @param relativePath Template path without 'ui/' prefix (e.g., 'architech-welcome/welcome-page.tsx.tpl')
 * @param marketplaces Discovered UI marketplaces
 * @returns Found marketplace path or null
 */
export function findUITemplateInMarketplaces(
  relativePath: string,
  marketplaces: UIMarketplace[]
): string | null {
  for (const marketplace of marketplaces) {
    if (!marketplace.exists) continue;
    
    const templatePath = path.join(marketplace.path, 'ui', relativePath);
    if (fs.existsSync(templatePath)) {
      return templatePath;
    }
  }
  
  return null;
}

/**
 * Check if a template path is a UI marketplace template
 */
export function isUITemplate(templatePath: string): boolean {
  return templatePath.startsWith('ui/');
}

/**
 * Extract relative path from UI template (removes 'ui/' prefix)
 */
export function extractUIRelativePath(templatePath: string): string {
  if (!templatePath.startsWith('ui/')) {
    throw new Error(`Template path does not start with 'ui/': ${templatePath}`);
  }
  return templatePath.substring(3); // Remove 'ui/' prefix
}

