import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

const teamsDataIntegrationBlueprint: Blueprint = {
  id: 'teams-data-integration',
  name: 'Teams Data Integration',
  description: 'Technical bridge connecting auth and database for teams data - provides headless teams hooks',
  version: '1.0.0',
  actions: [
    // Create database schema for teams
    {
      type: BlueprintActionType.ENHANCE_FILE,

      path: 'src/lib/db/schema.ts',
      modifier: ModifierType.TS_MODULE_ENHANCER,
      params: {
        statementsToAppend: [
          {
            type: 'raw',
            content: `// Teams schema
export const teams = pgTable('teams', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  description: text('description'),
  ownerId: text('owner_id').notNull().references(() => users.id),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const teamMembers = pgTable('team_members', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  teamId: text('team_id').notNull().references(() => teams.id),
  userId: text('user_id').notNull().references(() => users.id),
  role: text('role').notNull().default('member'),
  joinedAt: timestamp('joined_at').defaultNow(),
});

export const teamInvitations = pgTable('team_invitations', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  teamId: text('team_id').notNull().references(() => teams.id),
  email: text('email').notNull(),
  role: text('role').notNull().default('member'),
  status: text('status').notNull().default('pending'),
  invitedBy: text('invited_by').notNull().references(() => users.id),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});`
          }
        ]
      }
    },
    
    // Create teams API service layer
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/api/teams.ts',
      template: 'templates/teams-api.ts.tpl'
    },
    
    // Create teams data hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-teams.ts',
      template: 'templates/use-teams.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-team-members.ts',
      template: 'templates/use-team-members.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-team-invitations.ts',
      template: 'templates/use-team-invitations.ts.tpl'
    },
    
    // Create API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/teams/route.ts',
      template: 'templates/teams-route.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/teams/[id]/route.ts',
      template: 'templates/team-route.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/teams/[id]/members/route.ts',
      template: 'templates/team-members-route.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/teams/[id]/invitations/route.ts',
      template: 'templates/team-invitations-route.ts.tpl'
    },
    
    // Create types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/types/teams.ts',
      template: 'templates/teams-types.ts.tpl'
    }
  ]
};

export default teamsDataIntegrationBlueprint;
