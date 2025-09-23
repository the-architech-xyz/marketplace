import { betterAuth } from "better-auth";

// Framework-agnostic Better Auth configuration
// Database integration will be handled by V2 AI or manual integration
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  trustedOrigins: [
    process.env.AUTH_URL || "{{env.APP_URL}}",
  ],
});

export type Session = typeof auth.$Infer.Session;

// Export auth handler for framework integration
export const authHandler = auth.handler;

