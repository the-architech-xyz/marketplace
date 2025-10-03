# Vercel Environment Variables
# Copy this file to .env.local and fill in your values

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Authentication
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# API Keys
{{#each module.parameters.envVars}}
{{this.name}}="{{this.value}}"
{{/each}}

# Vercel specific
VERCEL_URL=""
VERCEL_ENV="development"

# Optional: Analytics
VERCEL_ANALYTICS_ID=""

# Optional: Monitoring
SENTRY_DSN=""
