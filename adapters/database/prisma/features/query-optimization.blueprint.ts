/**
 * Prisma Query Optimization Feature
 * 
 * Adds advanced query building and optimization tools
 */

import { Blueprint } from '@thearchitech.xyz/types';

const queryOptimizationBlueprint: Blueprint = {
  id: 'prisma-query-optimization',
  name: 'Prisma Query Optimization',
  actions: [
    {
      type: 'CREATE_FILE',
      path: 'src/lib/db/query-optimizer.ts',
      template: 'adapters/database/prisma/features/templates/query-optimizer.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/db/example-usage.ts',
      template: 'adapters/database/prisma/features/templates/example-usage.ts.tpl'
    }
  ]
};

export default queryOptimizationBlueprint;