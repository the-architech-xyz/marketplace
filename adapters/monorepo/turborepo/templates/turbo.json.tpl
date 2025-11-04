{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [
    "**/.env.*local",
    "tsconfig.json",
    "package.json",
    "turbo.json"
  ],
  "globalEnv": [
    "NODE_ENV",
    "CI",
    "DATABASE_URL",
    "API_KEY",
    "STRIPE_SECRET_KEY",
    "REVENUECAT_SECRET_KEY"
  ],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**", "build/**"],
      "env": ["NODE_ENV", "PUBLIC_API_URL"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"],
      "outputs": []
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"],
      "cache": true,
      "env": ["NODE_ENV", "CI"]
    },
    "type-check": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "clean": {
      "cache": false
    }
  }<% if (module.parameters.remoteCaching) { %>,
  "remoteCache": {
    "enabled": true,
    "signature": true
  }<% } %>
}

