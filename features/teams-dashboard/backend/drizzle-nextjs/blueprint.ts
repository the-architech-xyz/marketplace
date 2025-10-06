import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

const teamsDashboardBackendBlueprint: Blueprint = {
  id: 'teams-dashboard-backend-drizzle-nextjs',
  name: 'Teams Dashboard Backend (Drizzle + Next.js)',
  description: 'Backend implementation of teams-dashboard using Drizzle ORM and Next.js API routes',
  version: '1.0.0',
  actions: [
    // Create database schema for teams
    {
      type: BlueprintActionType.ENHANCE_FILE,

      path: 'src/lib/db/schema.ts',
      modifier: ModifierType.TS_MODULE_ENHANCER,
      params: {
        importsToAdd: [
          { name: 'pgTable', from: 'drizzle-orm/pg-core', type: 'import' },
          { name: 'text', from: 'drizzle-orm/pg-core', type: 'import' },
          { name: 'timestamp', from: 'drizzle-orm/pg-core', type: 'import' },
          { name: 'uuid', from: 'drizzle-orm/pg-core', type: 'import' },
          { name: 'boolean', from: 'drizzle-orm/pg-core', type: 'import' }
        ],
        statementsToAppend: [
          {
            type: 'raw',
            content: `// Teams Dashboard Schema
export const teams = pgTable('teams', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  slug: text('slug').notNull().unique(),
  ownerId: text('owner_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  isActive: boolean('is_active').default(true).notNull(),
});

export const teamMembers = pgTable('team_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  teamId: uuid('team_id').notNull().references(() => teams.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(),
  role: text('role').notNull().default('member'),
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
  isActive: boolean('is_active').default(true).notNull(),
});

export const teamInvitations = pgTable('team_invitations', {
  id: uuid('id').primaryKey().defaultRandom(),
  teamId: uuid('team_id').notNull().references(() => teams.id, { onDelete: 'cascade' }),
  email: text('email').notNull(),
  role: text('role').notNull().default('member'),
  token: text('token').notNull().unique(),
  status: text('status').notNull().default('pending'),
  invitedAt: timestamp('invited_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  acceptedAt: timestamp('accepted_at'),
});

// Types for the schema
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type TeamInvitation = typeof teamInvitations.$inferSelect;
export type NewTeamInvitation = typeof teamInvitations.$inferInsert;

export type TeamRole = 'owner' | 'admin' | 'member';
export type InvitationStatus = 'pending' | 'accepted' | 'expired' | 'cancelled';

export interface CreateTeamData {
  name: string;
  description?: string;
  slug: string;
}

export interface UpdateTeamData {
  name?: string;
  description?: string;
  slug?: string;
}

export interface TeamFilters {
  ownerId?: string;
  isActive?: boolean;
  search?: string;
}`
          }
        ]
      }
    },

    // Create API routes for teams
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/teams/route.ts',
      template: 'templates/api-teams-route.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/teams/[id]/route.ts',
      template: 'templates/api-team-route.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/teams/[id]/members/route.ts',
      template: 'templates/api-team-members-route.ts.tpl'
    },

    // Create headless hooks that implement the master schema contract
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/teams/use-teams.ts',
      template: 'templates/use-teams.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/teams/use-create-team.ts',
      template: 'templates/use-create-team.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/teams/use-update-team.ts',
      template: 'templates/use-update-team.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/teams/use-delete-team.ts',
      template: 'templates/use-delete-team.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/teams/use-team-members.ts',
      template: 'templates/use-team-members.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/teams/use-add-team-member.ts',
      template: 'templates/use-add-team-member.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/teams/use-remove-team-member.ts',
      template: 'templates/use-remove-team-member.ts.tpl'
    },

    // Create API service layer
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/api/teams.ts',
      template: 'templates/teams-api.ts.tpl'
    },

    // Create types file that exports the master schema types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/types/teams.ts',
      template: 'templates/teams-types.ts.tpl'
    }
  ]
};

export default teamsDashboardBackendBlueprint;
