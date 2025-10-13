import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { twoFactor } from "better-auth/plugins";
import { organization } from "better-auth/plugins";
import { EmailServiceStatic } from "@/features/emailing/backend/resend-nextjs/EmailService";

// Enhanced Better Auth configuration with all security features
// Database integration will be handled by V2 AI or manual integration
export const auth = betterAuth({
  // Core authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      try {
        await EmailServiceStatic.send({
          to: user.email,
          subject: 'Reset your password',
          template: 'password-reset',
          context: {
            userName: user.name || 'User',
            resetUrl: url,
            projectName: process.env.APP_NAME || 'The Architech'
          }
        });
      } catch (error) {
        console.error('Failed to send password reset email:', error);
        // Don't throw - Better Auth will handle the error gracefully
      }
    },
  },
  
  // Email verification
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      try {
        await EmailServiceStatic.send({
          to: user.email,
          subject: 'Verify your email address',
          template: 'email-verification',
          context: {
            userName: user.name || 'User',
            verificationUrl: url,
            projectName: process.env.APP_NAME || 'The Architech'
          }
        });
      } catch (error) {
        console.error('Failed to send email verification:', error);
        // Don't throw - Better Auth will handle the error gracefully
      }
    },
    sendOnSignUp: true,
  },
  
  // OAuth providers
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  
  // Session management
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  
  // Advanced security
  rateLimit: {
    enabled: true,
    window: 60, // 1 minute
    max: 10, // 10 requests per minute
    storage: 'memory',
  },
  
  // Trusted origins for CSRF protection
  trustedOrigins: [
    process.env.AUTH_URL || "<%= env.APP_URL %>",
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ],
  
  // Advanced security settings
  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
    cookiePrefix: 'architech_auth',
    defaultCookieAttributes: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  },
  
  // Plugins - CRITICAL: nextCookies must be first
  plugins: [
    nextCookies(), // ⚠️ CRITICAL: Must be first for Next.js
    twoFactor({
      issuer: process.env.APP_NAME || 'The Architech',
      otpOptions: {
        period: 30,
      },
    }),
    // Organizations plugin - OPTIONAL (subfeature)
    ...(process.env.ENABLE_ORGANIZATIONS === 'true' ? [
      organization({
        allowUserToCreateOrganization: true,
        organizationLimit: 5,
        // Teams within organizations - OPTIONAL
        teams: {
          enabled: process.env.ENABLE_TEAMS === 'true',
          maximumTeams: 10,
          allowRemovingAllTeams: false,
        },
      })
    ] : []),
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.User;

// Export auth handler for framework integration
export const authHandler = auth.handler;

