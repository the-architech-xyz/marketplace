/**
 * tRPC Initialization
 * 
 * Sets up tRPC with the configured transformer.
 */

import { initTRPC } from '@trpc/server';
<% if (params.transformer === 'superjson') { %>
import superjson from 'superjson';
<% } else if (params.transformer === 'devalue') { %>
import { devalue } from 'devalue';
<% } %>

import { type Context } from './context';

<% if (params.transformer === 'superjson') { %>
const transformer = superjson;
<% } else if (params.transformer === 'devalue') { %>
const transformer = {
  input: {
    serialize: (data: any) => devalue(data),
    deserialize: (data: any) => eval(`(${data})`),
  },
  output: {
    serialize: (data: any) => devalue(data),
    deserialize: (data: any) => eval(`(${data})`),
  },
};
<% } else { %>
const transformer = undefined;
<% } %>

export const t = initTRPC.context<Context>().create({
  transformer,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof Error && error.cause.name === 'ZodError'
          ? error.cause.flatten()
          : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

