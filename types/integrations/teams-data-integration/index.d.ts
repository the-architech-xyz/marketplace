/**
 * Teams Data Integration
 * 
 * Technical bridge connecting auth and database for teams data - provides headless teams hooks
 */

export interface TeamsDataIntegrationParams {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const TeamsDataIntegrationArtifacts: {
  creates: [
    'src/lib/api/teams.ts',
    'src/hooks/use-teams.ts',
    'src/hooks/use-team-members.ts',
    'src/hooks/use-team-invitations.ts',
    'src/app/api/teams/route.ts',
    'src/app/api/teams/[id]/route.ts',
    'src/app/api/teams/[id]/members/route.ts',
    'src/app/api/teams/[id]/invitations/route.ts',
    'src/types/teams.ts'
  ],
  enhances: [
    { path: 'src/lib/db/schema.ts' }
  ],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type TeamsDataIntegrationCreates = typeof TeamsDataIntegrationArtifacts.creates[number];
export type TeamsDataIntegrationEnhances = typeof TeamsDataIntegrationArtifacts.enhances[number];
