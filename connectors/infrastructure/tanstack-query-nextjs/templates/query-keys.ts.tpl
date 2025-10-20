// Query key factory for consistent key management
export const queryKeys = {
  // Auth related keys
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
  },

  // Users related keys
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },

  // Products related keys
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.products.lists(), { filters }] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
    categories: () => [...queryKeys.products.all, 'categories'] as const,
    search: (query: string) => [...queryKeys.products.all, 'search', query] as const,
  },

  // Teams related keys
  teams: {
    all: ['teams'] as const,
    lists: () => [...queryKeys.teams.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.teams.lists(), { filters }] as const,
    details: () => [...queryKeys.teams.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.teams.details(), id] as const,
    members: (teamId: string) => [...queryKeys.teams.detail(teamId), 'members'] as const,
  },

  // Email related keys
  email: {
    all: ['email'] as const,
    templates: () => [...queryKeys.email.all, 'templates'] as const,
  },

  // Web3 related keys
  web3: {
    all: ['web3'] as const,
    balance: (address: string) => [...queryKeys.web3.all, 'balance', address] as const,
    contract: (address: string, chainId: number) => [...queryKeys.web3.all, 'contract', address, chainId] as const,
    transaction: (hash: string) => [...queryKeys.web3.all, 'transaction', hash] as const,
  },
} as const;

// Helper function to create consistent query keys
export function createQueryKey(baseKey: string[], ...segments: (string | number | Record<string, any>)[]) {
  return [...baseKey, ...segments] as const;
}
