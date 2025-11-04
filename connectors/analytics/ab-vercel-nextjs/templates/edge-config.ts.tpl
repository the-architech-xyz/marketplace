import { getEdgeConfig } from '@vercel/edge-config';
import type { Experiment, ExperimentConfig } from '@/lib/ab-testing/types';
import { registerExperiments } from '@/lib/ab-testing/experiments';

/**
 * Get experiments from Vercel Edge Config
 * 
 * Configure experiments in Vercel Dashboard > Edge Config
 * Store as JSON: { "ab_experiments": { "experiment-id": { ... } } }
 */
export async function getExperimentsFromEdgeConfig(): Promise<ExperimentConfig> {
  try {
    const edgeConfig = getEdgeConfig();
    const experiments = await edgeConfig.get<ExperimentConfig>('ab_experiments');
    
    if (!experiments) {
      return {};
    }

    // Validate and register experiments
    return registerExperiments(experiments);
  } catch (error) {
    console.error('Failed to get experiments from Edge Config:', error);
    return {};
  }
}

/**
 * Get a specific experiment from Edge Config
 */
export async function getExperimentFromEdgeConfig(
  experimentId: string
): Promise<Experiment | null> {
  const experiments = await getExperimentsFromEdgeConfig();
  return experiments[experimentId] || null;
}

/**
 * Fallback to local experiments config if Edge Config is not available
 */
export function getLocalExperiments(): ExperimentConfig {
  // Define your experiments here as fallback
  // This is used when Edge Config is not configured
  return {
    // Example:
    // 'homepage-cta': {
    //   id: 'homepage-cta',
    //   name: 'Homepage CTA Test',
    //   enabled: true,
    //   variants: ['control', 'variant-a'],
    //   trafficSplit: {
    //     control: 0.5,
    //     'variant-a': 0.5,
    //   },
    //   sticky: true,
    // },
  };
}

/**
 * Get experiments (tries Edge Config first, falls back to local)
 */
export async function getExperiments(): Promise<ExperimentConfig> {
  const edgeConfigExperiments = await getExperimentsFromEdgeConfig();
  
  if (Object.keys(edgeConfigExperiments).length > 0) {
    return edgeConfigExperiments;
  }

  // Fallback to local experiments
  return getLocalExperiments();
}




