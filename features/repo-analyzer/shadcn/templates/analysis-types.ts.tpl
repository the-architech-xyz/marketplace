/**
 * Analysis Types
 * 
 * TypeScript type definitions for repository analysis
 */

export interface AnalysisRequest {
  repoUrl: string;
  options: AnalysisOptions;
  startedAt: number;
}

export interface AnalysisOptions {
  includeDevDependencies?: boolean;
  analyzeTests?: boolean;
  analyzeConfig?: boolean;
  maxDepth?: number;
  excludePatterns?: string[];
  includePatterns?: string[];
}

export interface AnalysisResponse {
  success: boolean;
  data?: {
    genome: DetectedGenome;
    analysis: ProjectAnalysis;
    metadata: AnalysisMetadata;
  };
  error?: string;
}

export interface DetectedGenome {
  project: {
    name: string;
    description: string;
    version: string;
    framework: string;
  };
  modules: {
    adapters: DetectedModule[];
    integrators: DetectedModule[];
    features: DetectedModule[];
  };
  confidence: number;
  analysis: {
    filesAnalyzed: number;
    dependenciesFound: number;
    patternsMatched: number;
    warnings: string[];
  };
}

export interface DetectedModule {
  id: string;
  confidence: number;
  parameters: Record<string, any>;
  evidence: string[];
  version?: string;
}

export interface ProjectAnalysis {
  framework: string;
  adapters: string[];
  confidence: number;
  filesAnalyzed: number;
  dependenciesFound: number;
  patternsMatched: number;
  warnings: string[];
  structure: {
    hasAppRouter: boolean;
    hasPagesRouter: boolean;
    hasAPI: boolean;
    hasTests: boolean;
    hasConfig: boolean;
  };
  dependencies: {
    production: Record<string, string>;
    development: Record<string, string>;
    peer: Record<string, string>;
  };
  files: {
    total: number;
    byType: Record<string, number>;
    byDirectory: Record<string, number>;
  };
}

export interface AnalysisMetadata {
  repoUrl: string;
  analyzedAt: Date;
  analysisTime: number;
  userId?: string;
  sessionId?: string;
}

export interface AnalysisProgress {
  step: 'initializing' | 'validating' | 'cloning' | 'analyzing' | 'generating' | 'cleaning' | 'complete';
  progress: number; // 0-100
  message: string;
}

export interface ExportOptions {
  format: 'typescript' | 'json' | 'yaml';
  includeComments?: boolean;
  includeMetadata?: boolean;
  includeWarnings?: boolean;
}

export interface ExportResponse {
  success: boolean;
  data?: {
    content: string;
    mimeType: string;
    filename: string;
    size: number;
  };
  error?: string;
}

export interface AnalysisHistory {
  analyses: AnalysisHistoryItem[];
  total: number;
  page: number;
  limit: number;
}

export interface AnalysisHistoryItem {
  id: string;
  repoUrl: string;
  repoName: string;
  analyzedAt: Date;
  confidence: number;
  framework: string;
  adaptersCount: number;
  status: 'completed' | 'failed' | 'in_progress';
}

export interface RepositoryInfo {
  name: string;
  fullName: string;
  description: string;
  private: boolean;
  htmlUrl: string;
  cloneUrl: string;
  defaultBranch: string;
  language: string;
  size: number;
  stargazersCount: number;
  forksCount: number;
  openIssuesCount: number;
  createdAt: Date;
  updatedAt: Date;
  pushedAt: Date;
}

export interface AnalysisConfig {
  enabledFeatures: string[];
  confidenceThreshold: number;
  maxAnalysisTime: number;
  maxFileSize: number;
  maxFiles: number;
  excludePatterns: string[];
  includePatterns: string[];
}

export interface AnalysisResult {
  success: boolean;
  genome?: DetectedGenome;
  error?: string;
  warnings?: string[];
  suggestions?: AnalysisSuggestion[];
}

export interface AnalysisSuggestion {
  type: 'adapter' | 'integrator' | 'feature' | 'optimization';
  id: string;
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
}

export interface AnalysisStats {
  totalAnalyses: number;
  successfulAnalyses: number;
  failedAnalyses: number;
  averageConfidence: number;
  mostCommonFrameworks: Array<{ framework: string; count: number }>;
  mostCommonAdapters: Array<{ adapter: string; count: number }>;
  averageAnalysisTime: number;
}

export interface AnalysisError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
}

export interface AnalysisValidation {
  isValid: boolean;
  errors: AnalysisError[];
  warnings: string[];
}

export interface AnalysisFilter {
  frameworks?: string[];
  adapters?: string[];
  confidenceMin?: number;
  confidenceMax?: number;
  dateFrom?: Date;
  dateTo?: Date;
  status?: string[];
}

export interface AnalysisSort {
  field: 'analyzedAt' | 'confidence' | 'repoName' | 'analysisTime';
  direction: 'asc' | 'desc';
}

export interface AnalysisPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AnalysisSearch {
  query: string;
  fields: ('repoName' | 'description' | 'framework' | 'adapters')[];
}

export interface AnalysisComparison {
  repo1: string;
  repo2: string;
  similarities: Array<{
    type: 'adapter' | 'integrator' | 'feature';
    id: string;
    confidence1: number;
    confidence2: number;
  }>;
  differences: Array<{
    type: 'adapter' | 'integrator' | 'feature';
    id: string;
    presentIn: 'repo1' | 'repo2';
    confidence: number;
  }>;
  overallSimilarity: number;
}
