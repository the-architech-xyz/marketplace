/**
 * Drizzle Relations Feature Blueprint
 * 
 * Adds comprehensive relationship management for Drizzle ORM
 */

import { Blueprint } from '@thearchitech.xyz/types';

const relationsBlueprint: Blueprint = {
  id: 'drizzle-relations',
  name: 'Drizzle Relations',
  actions: [
    {
      type: 'CREATE_FILE',
      path: 'src/lib/db/relations.ts',
      template: 'adapters/database/drizzle/features/templates/relations.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/db/query-helpers.ts',
      template: 'adapters/database/drizzle/features/templates/query-helpers.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/db/example-usage.ts',
      template: 'adapters/database/drizzle/features/templates/example-usage.ts.tpl'
    }
  ]
};

export default relationsBlueprint;