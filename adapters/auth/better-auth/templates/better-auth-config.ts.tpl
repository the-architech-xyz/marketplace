import { betterAuth } from "better-auth";
<% if (module.parameters.twoFactor) { %>
import { twoFactor } from "better-auth/plugins";
<% } %>
<% if (module.parameters.organizations) { %>
import { organization } from "better-auth/plugins";
<% } %>

/**
 * Better Auth Server Configuration
 * 
 * This is the ADAPTER layer - universal Better Auth SDK configuration.
 * Framework-specific wiring (Next.js, Express, etc.) is handled by connectors.
 */
export const auth = betterAuth({
  <% if (module.parameters.emailPassword) { %>
  // Email/Password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: <%= module.parameters.emailVerification %>,
  },
  <% } %>

  <% if (module.parameters.emailVerification) { %>
  // Email verification
  emailVerification: {
    sendOnSignUp: true,
  },
  <% } %>

  <% if (module.parameters.oauthProviders && module.parameters.oauthProviders.length > 0) { %>
  // OAuth providers
  socialProviders: {
    <% if (module.parameters.oauthProviders.includes('google')) { %>
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    <% } %>
    <% if (module.parameters.oauthProviders.includes('github')) { %>
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    <% } %>
  },
  <% } %>

  // Session management
  session: {
    expiresIn: <%= module.parameters.sessionExpiry || 604800 %>, // seconds
    updateAge: 86400, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 300, // 5 minutes
    },
  },

  // Security settings
  rateLimit: {
    enabled: true,
    window: 60,
    max: 10,
    storage: 'memory',
  },

  trustedOrigins: [
    process.env.BETTER_AUTH_URL || "http://localhost:3000",
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ],

  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
    cookiePrefix: '<%= project.name %>_auth',
    defaultCookieAttributes: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  },

  // Plugins
  plugins: [
    <% if (module.parameters.twoFactor) { %>
    twoFactor({
      issuer: '<%= project.name %>',
      otpOptions: {
        period: 30,
      },
    }),
    <% } %>
    <% if (module.parameters.organizations) { %>
    organization({
      allowUserToCreateOrganization: true,
      organizationLimit: 5,
      <% if (module.parameters.teams) { %>
      teams: {
        enabled: true,
        maximumTeams: 10,
        allowRemovingAllTeams: false,
      },
      <% } %>
    }),
    <% } %>
  ],
});

// Export inferred types
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.User;

