#!/usr/bin/env node

/**
 * Feature Manifest Generator
 * 
 * This script scans the marketplace features directory and generates
 * implementation manifests for each feature. These manifests are consumed
 * by the CLI to resolve abstract features into concrete implementations.
 * 
 * Architecture: "The Marketplace is the Source of Truth, the CLI is a Blind Executor"
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ============================================================================
// TYPES
// ============================================================================

interface FeatureImplementation {
  type: 'backend' | 'frontend';
  stack: string[];           // ['better-auth', 'nextjs']
  moduleId: string;          // 'features/auth/backend/better-auth-nextjs'
  capabilities: string[];    // ['authentication', 'session-management']
  dependencies: string[];    // ['ui/shadcn-ui', 'auth/better-auth']
  parameters?: Record<string, any>;
  constraints?: Record<string, any>;
}

interface FeatureManifest {
  id: string;                // 'auth'
  name: string;              // 'Authentication'
  description: string;       // 'Complete authentication system'
  contract?: string;         // 'features/auth/contract.ts'
  implementations: FeatureImplementation[];
  defaultStack?: {
    backend?: string[];
    frontend?: string[];
  };
  version: string;
  lastGenerated: string;
}

interface FeatureMetadata {
  id: string;
  name: string;
  description: string;
  version: string;
  type: string;
  prerequisites?: {
    capabilities?: string[];
    adapters?: string[];
  };
  provides?: string[];
  parameters?: Record<string, any>;
  constraints?: Record<string, any>;
}

// ============================================================================
// MAIN CLASS
// ============================================================================

class FeatureManifestGenerator {
  private marketplaceRoot: string;
  private featuresDir: string;
  private distDir: string;

  constructor() {
    this.marketplaceRoot = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..');
    this.featuresDir = path.join(this.marketplaceRoot, 'features');
    this.distDir = path.join(this.marketplaceRoot, 'dist', 'features');
  }

  async generateAllManifests(): Promise<void> {
    console.log('🚀 Starting Feature Manifest Generation...');
    console.log(`📁 Features directory: ${this.featuresDir}`);
    console.log(`📁 Output directory: ${this.distDir}`);

    // Ensure dist directory exists
    await fs.mkdir(this.distDir, { recursive: true });

    // Scan features directory
    const features = await this.scanFeaturesDirectory();
    console.log(`📋 Found ${features.length} features: ${features.join(', ')}`);

    // Generate manifests for each feature
    for (const featureId of features) {
      try {
        console.log(`\n🔍 Processing feature: ${featureId}`);
        const manifest = await this.generateFeatureManifest(featureId);
        
        // Write manifest to dist
        const manifestPath = path.join(this.distDir, `${featureId}.manifest.json`);
        await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
        console.log(`✅ Generated manifest: ${manifestPath}`);
        
      } catch (error) {
        console.error(`❌ Failed to generate manifest for ${featureId}:`, error);
        throw error;
      }
    }

    // Generate index manifest
    await this.generateIndexManifest(features);
    
    console.log('\n🎉 Feature Manifest Generation Complete!');
  }

  private async scanFeaturesDirectory(): Promise<string[]> {
    const entries = await fs.readdir(this.featuresDir, { withFileTypes: true });
    return entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .filter(name => !name.startsWith('.'));
  }

  private async generateFeatureManifest(featureId: string): Promise<FeatureManifest> {
    const featurePath = path.join(this.featuresDir, featureId);
    
    // Read feature contract (optional for legacy features)
    const contractPath = path.join(featurePath, 'contract.ts');
    const contractExists = await this.fileExists(contractPath);
    
    if (!contractExists) {
      console.log(`⚠️  No contract found for ${featureId}, treating as legacy feature`);
    }

    // Discover implementations
    const implementations = await this.discoverImplementations(featureId, featurePath);
    
    if (implementations.length === 0) {
      throw new Error(`No implementations found for feature: ${featureId}`);
    }

    // Analyze default stack
    const defaultStack = this.analyzeDefaultStack(implementations);

    // Read feature metadata from contract or README
    const metadata = await this.extractFeatureMetadata(featureId, featurePath);

    return {
      id: featureId,
      name: metadata.name || this.capitalizeFirst(featureId),
      description: metadata.description || `Complete ${featureId} system`,
      contract: contractExists ? `features/${featureId}/contract.ts` : undefined,
      implementations,
      defaultStack,
      version: metadata.version || '1.0.0',
      lastGenerated: new Date().toISOString()
    };
  }

  private async discoverImplementations(featureId: string, featurePath: string): Promise<FeatureImplementation[]> {
    const implementations: FeatureImplementation[] = [];

    // Check for backend implementations
    const backendPath = path.join(featurePath, 'backend');
    if (await this.directoryExists(backendPath)) {
      const backendImpls = await this.scanImplementationDirectory(featureId, backendPath, 'backend');
      implementations.push(...backendImpls);
    }

    // Check for frontend implementations
    const frontendPath = path.join(featurePath, 'frontend');
    if (await this.directoryExists(frontendPath)) {
      const frontendImpls = await this.scanImplementationDirectory(featureId, frontendPath, 'frontend');
      implementations.push(...frontendImpls);
    }

    // Check for legacy implementations (directly in feature folder)
    const legacyImpls = await this.scanLegacyImplementations(featureId, featurePath);
    implementations.push(...legacyImpls);

    return implementations;
  }

  private async scanImplementationDirectory(
    featureId: string, 
    implDir: string, 
    type: 'backend' | 'frontend'
  ): Promise<FeatureImplementation[]> {
    const implementations: FeatureImplementation[] = [];
    const entries = await fs.readdir(implDir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const implPath = path.join(implDir, entry.name);
      const moduleId = `features/${featureId}/${type}/${entry.name}`;

      try {
        const impl = await this.analyzeImplementation(moduleId, implPath, type);
        implementations.push(impl);
      } catch (error) {
        console.warn(`⚠️  Skipping implementation ${moduleId}: ${error}`);
      }
    }

    return implementations;
  }

  private async scanLegacyImplementations(featureId: string, featurePath: string): Promise<FeatureImplementation[]> {
    const implementations: FeatureImplementation[] = [];
    const entries = await fs.readdir(featurePath, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name === 'backend' || entry.name === 'frontend') continue;

      const implPath = path.join(featurePath, entry.name);
      const moduleId = `features/${featureId}/${entry.name}`;

      // Try to determine if this is a frontend or backend implementation
      const type = await this.determineImplementationType(implPath);
      
      try {
        const impl = await this.analyzeImplementation(moduleId, implPath, type);
        implementations.push(impl);
      } catch (error) {
        console.warn(`⚠️  Skipping legacy implementation ${moduleId}: ${error}`);
      }
    }

    return implementations;
  }

  private async analyzeImplementation(
    moduleId: string, 
    implPath: string, 
    type: 'backend' | 'frontend'
  ): Promise<FeatureImplementation> {
    // Read implementation metadata
    const metadata = await this.readImplementationMetadata(implPath, type);
    
    // Extract stack information
    const stack = this.extractStackFromMetadata(metadata, implPath);
    
    // Extract capabilities
    const capabilities = this.extractCapabilities(metadata);
    
    // Extract dependencies
    const dependencies = this.extractDependencies(metadata);

    return {
      type,
      stack,
      moduleId,
      capabilities,
      dependencies,
      parameters: metadata.parameters,
      constraints: metadata.constraints
    };
  }

  private async readImplementationMetadata(implPath: string, type: 'backend' | 'frontend'): Promise<FeatureMetadata> {
    // Try different metadata files
    const metadataFiles = [
      'feature.json',
      'capability.json',
      'integration.json',
      'package.json'
    ];

    for (const filename of metadataFiles) {
      const filePath = path.join(implPath, filename);
      if (await this.fileExists(filePath)) {
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content);
      }
    }

    // Fallback: create minimal metadata
    return {
      id: path.basename(implPath),
      name: this.capitalizeFirst(path.basename(implPath)),
      description: `${type} implementation`,
      version: '1.0.0',
      type: type === 'backend' ? 'capability' : 'feature'
    };
  }

  private extractStackFromMetadata(metadata: FeatureMetadata, implPath: string): string[] {
    const stack: string[] = [];

    // Extract from module ID path
    const pathParts = implPath.split('/');
    const implName = pathParts[pathParts.length - 1];
    
    // Parse implementation name for stack hints
    if (implName.includes('shadcn')) stack.push('shadcn');
    if (implName.includes('mui')) stack.push('mui');
    if (implName.includes('nextjs')) stack.push('nextjs');
    if (implName.includes('better-auth')) stack.push('better-auth');
    if (implName.includes('stripe')) stack.push('stripe');
    if (implName.includes('resend')) stack.push('resend');
    if (implName.includes('vercel-ai')) stack.push('vercel-ai');

    // Extract from prerequisites
    if (metadata.prerequisites?.adapters) {
      for (const adapter of metadata.prerequisites.adapters) {
        if (adapter.includes('/')) {
          const tech = adapter.split('/')[1];
          if (!stack.includes(tech)) {
            stack.push(tech);
          }
        }
      }
    }

    // Extract from requires (handle both array and object formats)
    if (metadata.requires) {
      if (Array.isArray(metadata.requires)) {
        for (const req of metadata.requires) {
          if (req.includes('/')) {
            const tech = req.split('/')[1];
            if (!stack.includes(tech)) {
              stack.push(tech);
            }
          }
        }
      }
      // If requires is an object, skip iteration (it's a different format)
    }

    return stack.length > 0 ? stack : ['unknown'];
  }

  private extractCapabilities(metadata: FeatureMetadata): string[] {
    const capabilities: string[] = [];

    // Extract from provides
    if (metadata.provides && Array.isArray(metadata.provides)) {
      capabilities.push(...metadata.provides);
    }

    // Extract from id
    if (metadata.id) {
      const idParts = metadata.id.split('-');
      if (idParts.length > 1) {
        capabilities.push(idParts[0]);
      }
    }

    return capabilities.length > 0 ? capabilities : ['unknown'];
  }

  private extractDependencies(metadata: FeatureMetadata): string[] {
    const dependencies: string[] = [];

    // Extract from prerequisites
    if (metadata.prerequisites?.adapters && Array.isArray(metadata.prerequisites.adapters)) {
      dependencies.push(...metadata.prerequisites.adapters);
    }

    // Extract from requires
    if (metadata.requires && Array.isArray(metadata.requires)) {
      dependencies.push(...metadata.requires);
    }

    return dependencies;
  }

  private async determineImplementationType(implPath: string): Promise<'backend' | 'frontend'> {
    // Check for backend indicators
    const backendFiles = ['capability.json', 'integration.json'];
    for (const file of backendFiles) {
      if (await this.fileExists(path.join(implPath, file))) {
        return 'backend';
      }
    }

    // Check for frontend indicators
    const frontendFiles = ['feature.json'];
    for (const file of frontendFiles) {
      if (await this.fileExists(path.join(implPath, file))) {
        return 'frontend';
      }
    }

    // Check for React/UI indicators in templates
    const templatesDir = path.join(implPath, 'templates');
    if (await this.directoryExists(templatesDir)) {
      const templates = await fs.readdir(templatesDir);
      const hasReactFiles = templates.some(t => t.endsWith('.tsx') || t.endsWith('.jsx'));
      if (hasReactFiles) {
        return 'frontend';
      }
    }

    // Default to frontend for legacy implementations
    return 'frontend';
  }

  private analyzeDefaultStack(implementations: FeatureImplementation[]): { backend?: string[]; frontend?: string[] } {
    const defaultStack: { backend?: string[]; frontend?: string[] } = {};

    // Find most common backend stack
    const backendImpls = implementations.filter(impl => impl.type === 'backend');
    if (backendImpls.length > 0) {
      const stackCounts = new Map<string, number>();
      for (const impl of backendImpls) {
        for (const tech of impl.stack) {
          stackCounts.set(tech, (stackCounts.get(tech) || 0) + 1);
        }
      }
      const mostCommonBackend = Array.from(stackCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([tech]) => tech);
      defaultStack.backend = mostCommonBackend;
    }

    // Find most common frontend stack
    const frontendImpls = implementations.filter(impl => impl.type === 'frontend');
    if (frontendImpls.length > 0) {
      const stackCounts = new Map<string, number>();
      for (const impl of frontendImpls) {
        for (const tech of impl.stack) {
          stackCounts.set(tech, (stackCounts.get(tech) || 0) + 1);
        }
      }
      const mostCommonFrontend = Array.from(stackCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([tech]) => tech);
      defaultStack.frontend = mostCommonFrontend;
    }

    return defaultStack;
  }

  private async extractFeatureMetadata(featureId: string, featurePath: string): Promise<FeatureMetadata> {
    // Try to read from README or contract
    const readmePath = path.join(featurePath, 'README.md');
    if (await this.fileExists(readmePath)) {
      const readme = await fs.readFile(readmePath, 'utf-8');
      const lines = readme.split('\n');
      
      return {
        id: featureId,
        name: this.capitalizeFirst(featureId),
        description: lines.find(line => line.startsWith('# '))?.replace('# ', '') || `Complete ${featureId} system`,
        version: '1.0.0',
        type: 'feature'
      };
    }

    // Fallback
    return {
      id: featureId,
      name: this.capitalizeFirst(featureId),
      description: `Complete ${featureId} system`,
      version: '1.0.0',
      type: 'feature'
    };
  }

  private async generateIndexManifest(features: string[]): Promise<void> {
    const indexManifest = {
      version: '1.0.0',
      lastGenerated: new Date().toISOString(),
      features: features.map(featureId => ({
        id: featureId,
        manifest: `features/${featureId}.manifest.json`
      }))
    };

    const indexPath = path.join(this.distDir, 'index.json');
    await fs.writeFile(indexPath, JSON.stringify(indexManifest, null, 2));
    console.log(`✅ Generated index manifest: ${indexPath}`);
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  private async directoryExists(dirPath: string): Promise<boolean> {
    try {
      const stat = await fs.stat(dirPath);
      return stat.isDirectory();
    } catch {
      return false;
    }
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

// ============================================================================
// EXECUTION
// ============================================================================

async function main() {
  try {
    const generator = new FeatureManifestGenerator();
    await generator.generateAllManifests();
    process.exit(0);
  } catch (error) {
    console.error('❌ Manifest generation failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { FeatureManifestGenerator };
