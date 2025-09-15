import { Blueprint } from '@thearchitech.xyz/types';

const apiRoutesBlueprint: Blueprint = {
  id: "nextjs-api-routes",
  name: "Next.js API Routes",
  actions: [
    {
      type: "CREATE_FILE",
      path: "src/lib/api/middleware.ts",
      content: "// API middleware and utilities"
    }
  ]
};
export default apiRoutesBlueprint;
