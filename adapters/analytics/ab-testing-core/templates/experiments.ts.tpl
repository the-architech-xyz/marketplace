// Experiment management utilities
import type { Experiment, ExperimentConfig, Variant } from './types.js';
import { DEFAULT_EXPERIMENT_CONFIG } from './config.js';
import { validateTrafficSplit, isExperimentActive } from './utils.js';

/**
 * Create a new experiment configuration
 */
export function createExperiment(
  id: string,
  name: string,
  variants: Variant[],
  options?: {
    description?: string;
    trafficSplit?: { [variant: string]: number };
    enabled?: boolean;
    sticky?: boolean;
    allowOverride?: boolean;
    startDate?: Date | string;
    endDate?: Date | string;
    metadata?: Record<string, unknown>;
  }
): Experiment {
  // Default traffic split (equal distribution)
  const defaultSplit: { [variant: string]: number } = {};
  const variantCount = variants.length;
  const equalSplit = 1.0 / variantCount;
  
  variants.forEach((variant) => {
    defaultSplit[variant] = equalSplit;
  });

  const trafficSplit = options?.trafficSplit || defaultSplit;
  
  // Validate traffic split
  const validation = validateTrafficSplit(trafficSplit);
  if (!validation.valid) {
    throw new Error(`Invalid traffic split for experiment ${id}: ${validation.error}`);
  }

  return {
    id,
    name,
    description: options?.description,
    enabled: options?.enabled ?? DEFAULT_EXPERIMENT_CONFIG.enabled,
    variants,
    trafficSplit,
    sticky: options?.sticky ?? DEFAULT_EXPERIMENT_CONFIG.sticky,
    allowOverride: options?.allowOverride ?? DEFAULT_EXPERIMENT_CONFIG.allowOverride,
    startDate: options?.startDate,
    endDate: options?.endDate,
    metadata: options?.metadata,
  };
}

/**
 * Register experiments configuration
 */
export function registerExperiments(config: ExperimentConfig): ExperimentConfig {
  // Validate all experiments
  Object.values(config).forEach((experiment) => {
    const validation = validateTrafficSplit(experiment.trafficSplit);
    if (!validation.valid) {
      throw new Error(`Invalid traffic split for experiment ${experiment.id}: ${validation.error}`);
    }
  });

  return config;
}

/**
 * Get experiment by ID
 */
export function getExperiment(
  experimentId: string,
  experiments: ExperimentConfig
): Experiment | null {
  return experiments[experimentId] || null;
}

/**
 * Get active experiments
 */
export function getActiveExperiments(experiments: ExperimentConfig): Experiment[] {
  return Object.values(experiments).filter((experiment) => isExperimentActive(experiment));
}

/**
 * Check if experiment exists
 */
export function experimentExists(experimentId: string, experiments: ExperimentConfig): boolean {
  return experimentId in experiments;
}




