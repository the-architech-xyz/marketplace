/**
 * Repository Analyzer
 * 
 * Analyze existing GitHub repositories and detect their architecture
 */

export interface FeaturesRepoAnalyzerShadcnParams {

  /** Enable visual architecture diagram */
  enableVisualization?: boolean;

  /** Enable genome export functionality */
  enableExport?: boolean;

  /** Minimum confidence threshold for suggestions */
  confidenceThreshold?: number;
}

export interface FeaturesRepoAnalyzerShadcnFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesRepoAnalyzerShadcnArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesRepoAnalyzerShadcnCreates = typeof FeaturesRepoAnalyzerShadcnArtifacts.creates[number];
export type FeaturesRepoAnalyzerShadcnEnhances = typeof FeaturesRepoAnalyzerShadcnArtifacts.enhances[number];
