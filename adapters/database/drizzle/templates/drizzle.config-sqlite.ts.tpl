import type { Config } from 'drizzle-kit';

export default {
  schema: '<%= project.structure === "monorepo" ? "./packages/database/src/db/schema.ts" : "./src/lib/db/schema.ts" %>',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_PATH || './local.db',
  },
} satisfies Config;

