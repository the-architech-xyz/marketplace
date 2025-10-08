/**
 * Repository Analyzer Service
 * 
 * Service for analyzing GitHub repositories and detecting their architecture
 */

import { GitHubOAuthClient } from '@/lib/auth/github-oauth-client';
import { 
  AnalysisRequest, 
  AnalysisResponse, 
  DetectedGenome, 
  AnalysisProgress,
  ExportOptions,
  ExportResponse
} from './analysis-types';

export class RepoAnalyzerService {
  private githubClient: GitHubOAuthClient;

  constructor(githubClient: GitHubOAuthClient) {
    this.githubClient = githubClient;
  }

  /**
   * Analyze a GitHub repository
   */
  async analyzeRepository(
    request: AnalysisRequest,
    onProgress?: (progress: AnalysisProgress) => void
  ): Promise<AnalysisResponse> {
    try {
      onProgress?.({ step: 'initializing', progress: 0, message: 'Initializing analysis...' });

      // 1. Validate repository access
      onProgress?.({ step: 'validating', progress: 10, message: 'Validating repository access...' });
      const hasAccess = await this.validateRepositoryAccess(request.repoUrl);
      if (!hasAccess) {
        return {
          success: false,
          error: 'No access to repository or repository not found'
        };
      }

      // 2. Clone repository
      onProgress?.({ step: 'cloning', progress: 20, message: 'Cloning repository...' });
      const localPath = await this.cloneRepository(request.repoUrl);
      
      // 3. Analyze project structure
      onProgress?.({ step: 'analyzing', progress: 40, message: 'Analyzing project structure...' });
      const analysis = await this.performAnalysis(localPath, request.options);
      
      // 4. Generate genome
      onProgress?.({ step: 'generating', progress: 80, message: 'Generating genome...' });
      const genome = await this.generateGenome(analysis);
      
      // 5. Cleanup
      onProgress?.({ step: 'cleaning', progress: 90, message: 'Cleaning up...' });
      await this.cleanup(localPath);
      
      onProgress?.({ step: 'complete', progress: 100, message: 'Analysis complete!' });

      return {
        success: true,
        data: {
          genome,
          analysis,
          metadata: {
            repoUrl: request.repoUrl,
            analyzedAt: new Date(),
            analysisTime: Date.now() - request.startedAt
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Export genome in various formats
   */
  async exportGenome(
    genome: DetectedGenome,
    options: ExportOptions
  ): Promise<ExportResponse> {
    try {
      let content: string;
      let mimeType: string;
      let filename: string;

      switch (options.format) {
        case 'typescript':
          content = this.generateTypeScriptGenome(genome);
          mimeType = 'text/typescript';
          filename = `${genome.project.name}.genome.ts`;
          break;
        case 'json':
          content = JSON.stringify(genome, null, 2);
          mimeType = 'application/json';
          filename = `${genome.project.name}.genome.json`;
          break;
        case 'yaml':
          content = this.generateYamlGenome(genome);
          mimeType = 'text/yaml';
          filename = `${genome.project.name}.genome.yaml`;
          break;
        default:
          throw new Error(`Unsupported export format: ${options.format}`);
      }

      return {
        success: true,
        data: {
          content,
          mimeType,
          filename,
          size: content.length
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Export failed'
      };
    }
  }

  /**
   * Get analysis history for user
   */
  async getAnalysisHistory(userId: string): Promise<AnalysisResponse> {
    try {
      // This would typically query a database
      // For now, return empty history
      return {
        success: true,
        data: {
          analyses: [],
          total: 0
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get analysis history'
      };
    }
  }

  /**
   * Validate repository access
   */
  private async validateRepositoryAccess(repoUrl: string): Promise<boolean> {
    try {
      // Extract owner and repo from URL
      const { owner, repo } = this.parseGitHubUrl(repoUrl);
      if (!owner || !repo) {
        return false;
      }

      // Check if we can access the repository
      const repoInfo = await this.githubClient.getRepository(owner, repo);
      return repoInfo.success;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clone repository to temporary location
   */
  private async cloneRepository(repoUrl: string): Promise<string> {
    // This would use the GitClient from Phase 1
    // For now, return a mock path
    const tempDir = `/tmp/architech-analyze-${Date.now()}`;
    // await this.gitClient.cloneRepository(repoUrl, tempDir);
    return tempDir;
  }

  /**
   * Perform detailed analysis
   */
  private async performAnalysis(
    localPath: string, 
    options: any
  ): Promise<any> {
    // This would use the GenomeDetector from Phase 2
    // For now, return mock analysis
    return {
      framework: 'nextjs',
      adapters: ['database/drizzle', 'ui/shadcn-ui'],
      confidence: 85,
      filesAnalyzed: 150,
      dependenciesFound: 25
    };
  }

  /**
   * Generate genome from analysis
   */
  private async generateGenome(analysis: any): Promise<DetectedGenome> {
    // This would use the GenomeDetector to generate the actual genome
    // For now, return mock genome
    return {
      project: {
        name: 'analyzed-project',
        description: 'Detected project',
        version: '1.0.0',
        framework: analysis.framework
      },
      modules: {
        adapters: analysis.adapters.map((id: string) => ({
          id,
          confidence: 85,
          parameters: {},
          evidence: ['Detected in analysis']
        })),
        integrators: [],
        features: []
      },
      confidence: analysis.confidence,
      analysis: {
        filesAnalyzed: analysis.filesAnalyzed,
        dependenciesFound: analysis.dependenciesFound,
        patternsMatched: 10,
        warnings: []
      }
    };
  }

  /**
   * Cleanup temporary files
   */
  private async cleanup(localPath: string): Promise<void> {
    // Remove temporary directory
    // await fs.rm(localPath, { recursive: true });
  }

  /**
   * Parse GitHub URL to extract owner and repo
   */
  private parseGitHubUrl(url: string): { owner: string | null; repo: string | null } {
    try {
      const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (match) {
        return {
          owner: match[1],
          repo: match[2].replace('.git', '')
        };
      }
      return { owner: null, repo: null };
    } catch (error) {
      return { owner: null, repo: null };
    }
  }

  /**
   * Generate TypeScript genome
   */
  private generateTypeScriptGenome(genome: DetectedGenome): string {
    const adapters = genome.modules.adapters.map(a => `    '${a.id}'`).join(',\n');
    const integrators = genome.modules.integrators.map(i => `    '${i.id}'`).join(',\n');
    const features = genome.modules.features.map(f => `    '${f.id}'`).join(',\n');

    return `import { Genome } from '@thearchitech.xyz/marketplace-types';

export const detectedGenome: Genome = {
  project: {
    name: '${genome.project.name}',
    description: '${genome.project.description}',
    version: '${genome.project.version}'
  },
  modules: {
    adapters: [
${adapters}
    ],
    integrators: [
${integrators}
    ],
    features: [
${features}
    ]
  }
};

// Analysis confidence: ${genome.confidence}%
// Files analyzed: ${genome.analysis.filesAnalyzed}
// Dependencies found: ${genome.analysis.dependenciesFound}
// Patterns matched: ${genome.analysis.patternsMatched}
${genome.analysis.warnings.length > 0 ? `\n// Warnings:\n${genome.analysis.warnings.map(w => `// - ${w}`).join('\n')}` : ''}
`;
  }

  /**
   * Generate YAML genome
   */
  private generateYamlGenome(genome: DetectedGenome): string {
    return `project:
  name: ${genome.project.name}
  description: ${genome.project.description}
  version: ${genome.project.version}

modules:
  adapters:
${genome.modules.adapters.map(a => `    - ${a.id}`).join('\n')}
  integrators:
${genome.modules.integrators.map(i => `    - ${i.id}`).join('\n')}
  features:
${genome.modules.features.map(f => `    - ${f.id}`).join('\n')}

# Analysis confidence: ${genome.confidence}%
# Files analyzed: ${genome.analysis.filesAnalyzed}
# Dependencies found: ${genome.analysis.dependenciesFound}
# Patterns matched: ${genome.analysis.patternsMatched}
${genome.analysis.warnings.length > 0 ? `\n# Warnings:\n${genome.analysis.warnings.map(w => `# - ${w}`).join('\n')}` : ''}
`;
  }
}
