{
  "name": "<%= project.name %>",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint",
    "test": "turbo test",
    "type-check": "turbo type-check"
  },
  "devDependencies": {
    "turbo": "^2.0.0"
  },
  "packageManager": "<%= module.parameters.packageManager || 'pnpm' %>@8.0.0"
}

