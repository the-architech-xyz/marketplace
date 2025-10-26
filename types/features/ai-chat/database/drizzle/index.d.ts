/**
 * AI Chat Database Layer (Drizzle)
 * 
 * Database schema for AI chat feature using Drizzle ORM. Stores conversations, messages, custom prompts, and usage analytics. Works with any AI provider.
 */

export interface FeaturesAiChatDatabaseDrizzleParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable custom prompt library */
    promptLibrary?: boolean;

    /** Enable usage tracking and analytics */
    usageTracking?: boolean;

    /** Enable conversation sharing via links */
    conversationSharing?: boolean;
  };
}

export interface FeaturesAiChatDatabaseDrizzleFeatures {

  /** Enable custom prompt library */
  promptLibrary: boolean;

  /** Enable usage tracking and analytics */
  usageTracking: boolean;

  /** Enable conversation sharing via links */
  conversationSharing: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesAiChatDatabaseDrizzleArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesAiChatDatabaseDrizzleCreates = typeof FeaturesAiChatDatabaseDrizzleArtifacts.creates[number];
export type FeaturesAiChatDatabaseDrizzleEnhances = typeof FeaturesAiChatDatabaseDrizzleArtifacts.enhances[number];
