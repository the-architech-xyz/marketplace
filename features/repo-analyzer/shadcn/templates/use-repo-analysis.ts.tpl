/**
 * Repository Analysis Hook
 * 
 * React hook for managing repository analysis state and operations
 */

import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  AnalysisRequest, 
  AnalysisResponse, 
  DetectedGenome, 
  ExportOptions,
  ExportResponse,
  AnalysisProgress
} from '@/lib/analysis/analysis-types';

export function useRepoAnalysis() {
  const [progress, setProgress] = useState<AnalysisProgress | null>(null);
  const queryClient = useQueryClient();

  // Analyze repository mutation
  const analyzeMutation = useMutation({
    mutationFn: async (request: AnalysisRequest): Promise<AnalysisResponse> => {
      const response = await fetch('/api/analysis/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate analysis history query
      queryClient.invalidateQueries({ queryKey: ['analysis-history'] });
    },
  });

  // Export genome mutation
  const exportMutation = useMutation({
    mutationFn: async ({ 
      genome, 
      options 
    }: { 
      genome: DetectedGenome; 
      options: ExportOptions 
    }): Promise<ExportResponse> => {
      const response = await fetch('/api/analysis/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ genome, options }),
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      return response.json();
    },
  });

  // Analysis history query
  const { data: analysisHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: ['analysis-history'],
    queryFn: async () => {
      const response = await fetch('/api/analysis/history');
      if (!response.ok) {
        throw new Error('Failed to fetch analysis history');
      }
      return response.json();
    },
  });

  // Analyze repository function
  const analyzeRepository = useCallback(async (request: AnalysisRequest) => {
    setProgress({ step: 'initializing', progress: 0, message: 'Starting analysis...' });
    
    try {
      const result = await analyzeMutation.mutateAsync(request);
      setProgress(null);
      return result;
    } catch (error) {
      setProgress(null);
      throw error;
    }
  }, [analyzeMutation]);

  // Export genome function
  const exportGenome = useCallback(async (genome: DetectedGenome, options: ExportOptions) => {
    try {
      const result = await exportMutation.mutateAsync({ genome, options });
      return result;
    } catch (error) {
      throw error;
    }
  }, [exportMutation]);

  // Get analysis by ID
  const getAnalysis = useCallback(async (analysisId: string) => {
    const response = await fetch(`/api/analysis/${analysisId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch analysis');
    }
    return response.json();
  }, []);

  // Delete analysis
  const deleteAnalysis = useCallback(async (analysisId: string) => {
    const response = await fetch(`/api/analysis/${analysisId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete analysis');
    }
    
    // Invalidate queries
    queryClient.invalidateQueries({ queryKey: ['analysis-history'] });
  }, [queryClient]);

  // Compare analyses
  const compareAnalyses = useCallback(async (analysisId1: string, analysisId2: string) => {
    const response = await fetch(`/api/analysis/compare?analysis1=${analysisId1}&analysis2=${analysisId2}`);
    if (!response.ok) {
      throw new Error('Failed to compare analyses');
    }
    return response.json();
  }, []);

  return {
    // State
    progress,
    analysisHistory,
    
    // Loading states
    isAnalyzing: analyzeMutation.isPending,
    isExporting: exportMutation.isPending,
    isLoadingHistory,
    
    // Functions
    analyzeRepository,
    exportGenome,
    getAnalysis,
    deleteAnalysis,
    compareAnalyses,
    
    // Mutation states
    analysisError: analyzeMutation.error,
    exportError: exportMutation.error,
  };
}

// Hook for individual analysis
export function useAnalysis(analysisId: string) {
  return useQuery({
    queryKey: ['analysis', analysisId],
    queryFn: async () => {
      const response = await fetch(`/api/analysis/${analysisId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch analysis');
      }
      return response.json();
    },
    enabled: !!analysisId,
  });
}

// Hook for analysis comparison
export function useAnalysisComparison(analysisId1: string, analysisId2: string) {
  return useQuery({
    queryKey: ['analysis-comparison', analysisId1, analysisId2],
    queryFn: async () => {
      const response = await fetch(`/api/analysis/compare?analysis1=${analysisId1}&analysis2=${analysisId2}`);
      if (!response.ok) {
        throw new Error('Failed to compare analyses');
      }
      return response.json();
    },
    enabled: !!analysisId1 && !!analysisId2,
  });
}
