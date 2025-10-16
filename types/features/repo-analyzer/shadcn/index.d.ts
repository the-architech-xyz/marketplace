/**
 * Repository Analyzer Feature (Shadcn)
 * 
 * Complete modular repository analysis interface using Shadcn components
 */

export interface FeaturesRepoAnalyzerShadcnParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Basic repository analysis and detection */
    core?: boolean;

    /** Analysis dashboard and overview */
    dashboard?: boolean;

    /** Architecture visualization and diagrams */
    visualization?: boolean;

    /** Genome export and generation */
    export?: boolean;

    /** Analysis summary and reporting */
    summary?: boolean;

    /** Advanced module detection */
    detection?: boolean;

    /** Analysis API endpoints */
    api?: boolean;

    /** Navigation and routing */
    navigation?: boolean;

    /** Generate app-manifest.json from repository analysis */
    manifest?: boolean;
  };

  /** Minimum confidence threshold for suggestions */
  confidenceThreshold?: number;
}

export interface FeaturesRepoAnalyzerShadcnFeatures {

  /** Basic repository analysis and detection */
  core: boolean;

  /** Analysis dashboard and overview */
  dashboard: boolean;

  /** Architecture visualization and diagrams */
  visualization: boolean;

  /** Genome export and generation */
  export: boolean;

  /** Analysis summary and reporting */
  summary: boolean;

  /** Advanced module detection */
  detection: boolean;

  /** Analysis API endpoints */
  api: boolean;

  /** Navigation and routing */
  navigation: boolean;

  /** Generate app-manifest.json from repository analysis */
  manifest: boolean;
}

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
