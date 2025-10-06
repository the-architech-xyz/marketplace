/**
 * Analysis Dashboard Component
 * 
 * Main dashboard showing analysis results and detected modules
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Code, 
  Database, 
  Palette, 
  Shield, 
  CreditCard,
  TestTube,
  Zap,
  Layers,
  GitBranch,
  Clock,
  FileText
} from 'lucide-react';
import { DetectedGenome, ProjectAnalysis, AnalysisMetadata } from '@/lib/analysis/analysis-types';

interface AnalysisDashboardProps {
  genome: DetectedGenome;
  analysis: ProjectAnalysis;
  metadata: AnalysisMetadata;
}

export function AnalysisDashboard({ genome, analysis, metadata }: AnalysisDashboardProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBadgeVariant = (confidence: number) => {
    if (confidence >= 80) return 'default';
    if (confidence >= 60) return 'secondary';
    return 'destructive';
  };

  const getModuleIcon = (moduleId: string) => {
    if (moduleId.includes('database')) return <Database className="w-4 h-4" />;
    if (moduleId.includes('ui')) return <Palette className="w-4 h-4" />;
    if (moduleId.includes('auth')) return <Shield className="w-4 h-4" />;
    if (moduleId.includes('payment')) return <CreditCard className="w-4 h-4" />;
    if (moduleId.includes('test')) return <TestTube className="w-4 h-4" />;
    if (moduleId.includes('data-fetching')) return <Zap className="w-4 h-4" />;
    if (moduleId.includes('state')) return <Layers className="w-4 h-4" />;
    return <Code className="w-4 h-4" />;
  };

  const getModuleCategory = (moduleId: string) => {
    if (moduleId.includes('framework')) return 'Framework';
    if (moduleId.includes('database')) return 'Database';
    if (moduleId.includes('ui')) return 'UI Library';
    if (moduleId.includes('auth')) return 'Authentication';
    if (moduleId.includes('payment')) return 'Payment';
    if (moduleId.includes('test')) return 'Testing';
    if (moduleId.includes('data-fetching')) return 'Data Fetching';
    if (moduleId.includes('state')) return 'State Management';
    if (moduleId.includes('integration')) return 'Integration';
    if (moduleId.includes('feature')) return 'Feature';
    return 'Other';
  };

  return (
    <div className="space-y-6">
      {/* Project Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GitBranch className="w-5 h-5" />
            <span>Project Overview</span>
          </CardTitle>
          <CardDescription>
            Basic information about the analyzed project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Project Name</Label>
              <p className="text-lg font-semibold">{genome.project.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Framework</Label>
              <p className="text-lg font-semibold">{genome.project.framework}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Version</Label>
              <p className="text-lg font-semibold">{genome.project.version}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Confidence</Label>
              <div className="flex items-center space-x-2">
                <Progress value={genome.confidence} className="flex-1" />
                <Badge variant={getConfidenceBadgeVariant(genome.confidence)}>
                  {genome.confidence}%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{analysis.filesAnalyzed}</p>
                <p className="text-sm text-muted-foreground">Files Analyzed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{analysis.dependenciesFound}</p>
                <p className="text-sm text-muted-foreground">Dependencies</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{metadata.analysisTime}ms</p>
                <p className="text-sm text-muted-foreground">Analysis Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detected Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Adapters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="w-5 h-5" />
              <span>Adapters ({genome.modules.adapters.length})</span>
            </CardTitle>
            <CardDescription>
              Core technology adapters detected
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {genome.modules.adapters.map((adapter, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getModuleIcon(adapter.id)}
                  <div>
                    <p className="font-medium">{adapter.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {getModuleCategory(adapter.id)}
                    </p>
                  </div>
                </div>
                <Badge variant={getConfidenceBadgeVariant(adapter.confidence)}>
                  {adapter.confidence}%
                </Badge>
              </div>
            ))}
            {genome.modules.adapters.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No adapters detected
              </p>
            )}
          </CardContent>
        </Card>

        {/* Integrators */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Layers className="w-5 h-5" />
              <span>Integrators ({genome.modules.integrators.length})</span>
            </CardTitle>
            <CardDescription>
              Integration modules detected
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {genome.modules.integrators.map((integrator, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Layers className="w-4 h-4" />
                  <div>
                    <p className="font-medium">{integrator.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {getModuleCategory(integrator.id)}
                    </p>
                  </div>
                </div>
                <Badge variant={getConfidenceBadgeVariant(integrator.confidence)}>
                  {integrator.confidence}%
                </Badge>
              </div>
            ))}
            {genome.modules.integrators.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No integrators detected
              </p>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Features ({genome.modules.features.length})</span>
            </CardTitle>
            <CardDescription>
              High-level features detected
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {genome.modules.features.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Zap className="w-4 h-4" />
                  <div>
                    <p className="font-medium">{feature.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {getModuleCategory(feature.id)}
                    </p>
                  </div>
                </div>
                <Badge variant={getConfidenceBadgeVariant(feature.confidence)}>
                  {feature.confidence}%
                </Badge>
              </div>
            ))}
            {genome.modules.features.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No features detected
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Warnings */}
      {genome.analysis.warnings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <span>Analysis Warnings</span>
            </CardTitle>
            <CardDescription>
              Issues or limitations found during analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {genome.analysis.warnings.map((warning, index) => (
                <Alert key={index} variant="warning">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{warning}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Evidence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="w-5 h-5" />
            <span>Detection Evidence</span>
          </CardTitle>
          <CardDescription>
            How each module was detected
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...genome.modules.adapters, ...genome.modules.integrators, ...genome.modules.features].map((module, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{module.id}</h4>
                  <Badge variant={getConfidenceBadgeVariant(module.confidence)}>
                    {module.confidence}%
                  </Badge>
                </div>
                <div className="space-y-1">
                  {module.evidence.map((evidence, evidenceIndex) => (
                    <p key={evidenceIndex} className="text-sm text-muted-foreground">
                      • {evidence}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
