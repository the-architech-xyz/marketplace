// A/B Testing Types

export type Variant = string;

export type TrafficSplit = {
  [variant: string]: number; // Percentage (0.0 to 1.0)
};

export interface Experiment {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  variants: Variant[];
  trafficSplit: TrafficSplit;
  startDate?: Date | string;
  endDate?: Date | string;
  sticky?: boolean; // User stays in same variant
  allowOverride?: boolean; // Allow manual override via query param
  metadata?: Record<string, unknown>;
}

export interface ExperimentConfig {
  [experimentId: string]: Experiment;
}

export interface VariantAssignment {
  experimentId: string;
  variant: Variant;
  assignedAt: Date;
  userId?: string;
  sessionId?: string;
}

export interface ExperimentResult {
  experimentId: string;
  variant: Variant;
  conversions?: number;
  conversionRate?: number;
  visitors?: number;
  metadata?: Record<string, unknown>;
}

export interface VariantContext {
  experimentId: string;
  variant: Variant;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}




