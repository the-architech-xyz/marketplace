import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.AUTH_URL || "<%= env.APP_URL %>",
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;

