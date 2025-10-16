# Vercel Environment Variables
# Copy this file to .env.local and fill in your values

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Authentication
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# API Keys
<% if (module.parameters.envVars && module.parameters.envVars.length > 0) { %>
<% module.parameters.envVars.forEach((item) => { %>
<%= item.name %>="<%= item.value %>"
<% }); %>
<% } %>

# Vercel specific
VERCEL_URL=""
VERCEL_ENV="development"

# Optional: Analytics
VERCEL_ANALYTICS_ID=""

# Optional: Monitoring
SENTRY_DSN=""
