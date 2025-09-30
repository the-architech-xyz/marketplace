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
      template: 'templates/relations.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/db/query-helpers.ts',
      template: 'templates/query-helpers.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/db/example-usage.ts',
      template: 'templates/example-usage.ts.tpl'
    }
  ]
};

export default relationsBlueprint;