/**
 * Repository Analyzer Feature Blueprint
 * 
 * Provides UI components and functionality for analyzing existing repositories
 */

import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

export const repoAnalyzerBlueprint: Blueprint = {
  id: 'repo-analyzer-setup',
  name: 'Repository Analyzer Setup',
  actions: [
    // Install analysis dependencies
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@tanstack/react-query', 'recharts', 'react-flow-renderer', 'lucide-react']
    },
    
    // Create analysis service
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}/analysis/repo-analyzer-service.ts',
      template: 'templates/repo-analyzer-service.ts.tpl'
    },
    
    // Create analysis types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}/analysis/analysis-types.ts',
      template: 'templates/analysis-types.ts.tpl'
    },
    
    // Create analysis dashboard page
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app}}/analysis/page.tsx',
      template: 'templates/analysis-page.tsx.tpl'
    },
    
    // Create analysis components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}/analysis/analysis-dashboard.tsx',
      template: 'templates/analysis-dashboard.tsx.tpl'
    },
    
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}/analysis/architecture-visualizer.tsx',
      template: 'templates/architecture-visualizer.tsx.tpl'
    },
    
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}/analysis/genome-exporter.tsx',
      template: 'templates/genome-exporter.tsx.tpl'
    },
    
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}/analysis/analysis-summary.tsx',
      template: 'templates/analysis-summary.tsx.tpl'
    },
    
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}/analysis/module-detector.tsx',
      template: 'templates/module-detector.tsx.tpl'
    },
    
    // Create analysis hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}/use-repo-analysis.ts',
      template: 'templates/use-repo-analysis.ts.tpl'
    },
    
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}/use-genome-export.ts',
      template: 'templates/use-genome-export.ts.tpl'
    },
    
    // Create API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.api_routes}}/analysis/analyze/route.ts',
      template: 'templates/analyze-api-route.ts.tpl'
    },
    
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.api_routes}}/analysis/export/route.ts',
      template: 'templates/export-api-route.ts.tpl'
    },
    
    // Add navigation
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}/navigation/nav-analysis-link.tsx',
      template: 'templates/nav-analysis-link.tsx.tpl',
      conflictResolution: { strategy: ConflictResolutionStrategy.SKIP }
    }
  ]
};

export default repoAnalyzerBlueprint;
