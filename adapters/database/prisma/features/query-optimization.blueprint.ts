/**
 * Prisma Query Optimization Feature
 * 
 * Adds advanced query building and optimization tools
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

const queryOptimizationBlueprint: Blueprint = {
  id: 'prisma-query-optimization',
  name: 'Prisma Query Optimization',
  actions: [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/db/query-optimizer.ts',
      template: 'templates/query-optimizer.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/db/example-usage.ts',
      template: 'templates/example-usage.ts.tpl'
    }
  ]
};

export default queryOptimizationBlueprint;