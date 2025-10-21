#!/usr/bin/env node

/**
 * Batch Metadata Updater
 * 
 * Quickly adds role and pattern fields to all remaining modules
 * based on their type and location in the marketplace.
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

interface MetadataUpdate {
  file: string;
  updates: Record<string, any>;
}

async function batchUpdateMetadata() {
  console.log('🚀 Batch Metadata Update Starting...\n');

  const updates: MetadataUpdate[] = [];

  // Group 4: Framework-Wiring Connectors
  console.log('📦 Processing framework-wiring connectors...');
  const connectorFiles = await glob('connectors/**/connector.json', { cwd: process.cwd() });
  
  for (const file of connectorFiles) {
    const data = JSON.parse(readFileSync(file, 'utf8'));
    
    // Skip if already has role
    if (data.role) continue;
    
    // Determine role based on what it provides/connects
    const isInfrastructure = file.includes('/infrastructure/');
    
    updates.push({
      file,
      updates: {
        role: 'framework-wiring-connector',
        pattern: 'infrastructure'
      }
    });
  }

  // Group 5: Frontend Features
  console.log('🎨 Processing frontend features...');
  const frontendFiles = await glob('features/**/frontend/**/feature.json', { cwd: process.cwd() });
  const shadcnFiles = await glob('features/**/shadcn/feature.json', { cwd: process.cwd() });
  
  for (const file of [...frontendFiles, ...shadcnFiles]) {
    const data = JSON.parse(readFileSync(file, 'utf8'));
    
    // Skip if already has role
    if (data.role) continue;
    
    updates.push({
      file,
      updates: {
        role: 'frontend-feature'
      }
    });
  }

  // Group 6: Adapters (just add default role)
  console.log('🔧 Processing adapters...');
  const adapterFiles = await glob('adapters/**/adapter.json', { cwd: process.cwd() });
  
  for (const file of adapterFiles) {
    const data = JSON.parse(readFileSync(file, 'utf8'));
    
    // Skip if already has role
    if (data.role) continue;
    
    updates.push({
      file,
      updates: {
        role: 'adapter'
      }
    });
  }

  // Apply updates
  console.log(`\n📝 Applying ${updates.length} updates...\n`);
  
  for (const { file, updates: updateData } of updates) {
    try {
      const data = JSON.parse(readFileSync(file, 'utf8'));
      
      // Insert updates right after version field (or after id if no version)
      const updated = { ...data };
      
      // Find position to insert (after "version" or "type")
      const keys = Object.keys(data);
      const versionIndex = keys.indexOf('version');
      const typeIndex = keys.indexOf('type');
      const insertAfter = versionIndex >= 0 ? 'version' : (typeIndex >= 0 ? 'type' : 'id');
      
      // Rebuild object with updates in the right position
      const newData: Record<string, any> = {};
      for (const key of keys) {
        newData[key] = data[key];
        if (key === insertAfter) {
          // Insert new fields here
          if (updateData.provides) newData.provides = updateData.provides;
          if (updateData.role) newData.role = updateData.role;
          if (updateData.pattern) newData.pattern = updateData.pattern;
        }
      }
      
      writeFileSync(file, JSON.stringify(newData, null, 2) + '\n');
      console.log(`   ✅ ${file}`);
    } catch (error) {
      console.error(`   ❌ ${file}: ${error}`);
    }
  }

  console.log(`\n✅ Batch update complete! Updated ${updates.length} files.\n`);
  console.log('Run validation to verify: npm run validate:schema');
}

batchUpdateMetadata().catch(console.error);

