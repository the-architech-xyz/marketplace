/**
 * Analysis Page
 * 
 * Main page for repository analysis functionality
 */

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Search, 
  Download, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  GitBranch,
  Code,
  Layers
} from 'lucide-react';
import { AnalysisDashboard } from '@/components/analysis/analysis-dashboard';
import { ArchitectureVisualizer } from '@/components/analysis/architecture-visualizer';
import { GenomeExporter } from '@/components/analysis/genome-exporter';
import { useRepoAnalysis } from '@/hooks/use-repo-analysis';

export default function AnalysisPage() {
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const { analyzeRepository, exportGenome, isLoading } = useRepoAnalysis();

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) {
      setError('Please enter a repository URL');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeRepository({
        repoUrl: repoUrl.trim(),
        options: {
          includeDevDependencies: true,
          analyzeTests: true,
          analyzeConfig: true
        }
      });

      if (result.success) {
        setAnalysisResult(result.data);
      } else {
        setError(result.error || 'Analysis failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExport = async (format: 'typescript' | 'json' | 'yaml') => {
    if (!analysisResult?.genome) return;

    try {
      const result = await exportGenome(analysisResult.genome, { format });
      if (result.success && result.data) {
        // Download file
        const blob = new Blob([result.data.content], { type: result.data.mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = result.data.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Repository Analyzer</h1>
        <p className="text-xl text-muted-foreground">
          Analyze existing GitHub repositories and detect their architecture
        </p>
      </div>

      {/* Analysis Input */}
      <Card>
        <CardHeader>
          <CardTitle>Analyze Repository</CardTitle>
          <CardDescription>
            Enter a GitHub repository URL to analyze its architecture and generate a genome
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="repo-url">Repository URL</Label>
            <div className="flex space-x-2">
              <Input
                id="repo-url"
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                disabled={isAnalyzing}
              />
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing || !repoUrl.trim()}
                className="min-w-[120px]"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="visualization">Architecture</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AnalysisDashboard 
              genome={analysisResult.genome}
              analysis={analysisResult.analysis}
              metadata={analysisResult.metadata}
            />
          </TabsContent>

          <TabsContent value="visualization">
            <ArchitectureVisualizer genome={analysisResult.genome} />
          </TabsContent>

          <TabsContent value="export">
            <GenomeExporter 
              genome={analysisResult.genome}
              onExport={handleExport}
            />
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Analysis Details</CardTitle>
                <CardDescription>
                  Detailed information about the analysis process and results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Files Analyzed</Label>
                    <p className="text-2xl font-bold">{analysisResult.analysis.filesAnalyzed}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Dependencies Found</Label>
                    <p className="text-2xl font-bold">{analysisResult.analysis.dependenciesFound}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Patterns Matched</Label>
                    <p className="text-2xl font-bold">{analysisResult.analysis.patternsMatched}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Analysis Time</Label>
                    <p className="text-2xl font-bold">{analysisResult.metadata.analysisTime}ms</p>
                  </div>
                </div>

                {analysisResult.analysis.warnings.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Warnings</Label>
                    <div className="space-y-2">
                      {analysisResult.analysis.warnings.map((warning: string, index: number) => (
                        <Alert key={index} variant="warning">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{warning}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common analysis tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <GitBranch className="w-6 h-6" />
              <span>Analyze My Repos</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Code className="w-6 h-6" />
              <span>Compare Repos</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Layers className="w-6 h-6" />
              <span>Template Library</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
