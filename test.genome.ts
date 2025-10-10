import { defineGenome } from '@thearchitech.xyz/types';

/**
 * Test Genome - Demonstrating Intelligent Type Safety
 * 
 * This file demonstrates the new intelligent type system with:
 * - Module ID autocompletion
 * - Parameter autocompletion
 * - Value-level validation
 * - Real-time error highlighting
 */
const testGenome = defineGenome({
  version: "1.0.0",
  project: {
    name: "intelligent-types-demo",
    framework: "nextjs",
    description: "Demonstrating the new intelligent type system"
  },
  modules: [
    // ✅ Framework module with type-safe parameters
    {
      id: "framework/nextjs", // ← IDE should provide autocompletion for all ModuleIds
      parameters: {
        appRouter: true,        // ← IDE should autocomplete: appRouter, typescript, tailwind, etc.
        typescript: true,       // ← IDE should know this is boolean
        tailwind: true,         // ← IDE should know this is boolean
        eslint: true,           // ← IDE should know this is boolean
        srcDir: true,           // ← IDE should know this is boolean (not string!)
        importAlias: '@/',      // ← IDE should know this is string
      }
    },
    
    // ✅ Database module with constrained values
    {
      id: "database/drizzle", // ← IDE should provide autocompletion
      parameters: {
        provider: "neon",           // ← IDE should autocomplete: neon, planetscale, supabase, local
        databaseType: "postgresql", // ← IDE should autocomplete: postgresql, mysql, sqlite
        features: {
          core: true,        // ← IDE should know this is boolean
          migrations: true,  // ← IDE should know this is boolean
          studio: false,     // ← IDE should know this is boolean
          relations: false,  // ← IDE should know this is boolean
          seeding: false,    // ← IDE should know this is boolean
        }
      }
    },
    
    // ✅ UI module with component validation
    {
      id: "ui/shadcn-ui", // ← IDE should provide autocompletion
      parameters: {
        components: [
          "button",  // ← IDE should autocomplete valid Shadcn components
          "input",   // ← IDE should autocomplete valid Shadcn components
          "card",    // ← IDE should autocomplete valid Shadcn components
          "form",    // ← IDE should autocomplete valid Shadcn components
          "dialog"   // ← IDE should autocomplete valid Shadcn components
        ]
      }
    },
    
    // ✅ Testing module with features
    {
      id: "testing/vitest", // ← IDE should provide autocompletion
      parameters: {
        environment: "jsdom", // ← IDE should know this is 'jsdom' | 'node' | 'happy-dom'
        features: {
          core: true,        // ← IDE should know this is boolean
          coverage: true,    // ← IDE should know this is boolean
          ui: true,          // ← IDE should know this is boolean
          e2e: false,        // ← IDE should know this is boolean
        }
      }
    },
    
    // ✅ Auth feature with Constitutional Architecture
    {
      id: "features/auth/frontend/shadcn", // ← IDE should provide autocompletion
      parameters: {
        theme: "default", // ← IDE should autocomplete: default, dark, light, minimal
        features: {
          passwordReset: true,  // ← IDE should know this is boolean
          mfa: false,           // ← IDE should know this is boolean
          socialLogins: false,  // ← IDE should know this is boolean
          accountSettingsPage: false, // ← IDE should know this is boolean
          profileManagement: true,    // ← IDE should know this is boolean
        }
      }
    },
    
    // ✅ Connector example
    {
      id: "connectors/better-auth-github", // ← IDE should provide autocompletion
      parameters: {
        clientId: "github_client_id", // ← IDE should know this is string
        clientSecret: "github_client_secret", // ← IDE should know this is string
        redirectUri: "http://localhost:3000/auth/callback", // ← IDE should know this is string
        scopes: ["repo", "user:email"], // ← IDE should know this is string[]
        encryptionKey: "encryption_key_here" // ← IDE should know this is string
      }
    }
  ]
});

export default testGenome;