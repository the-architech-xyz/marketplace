/**
 * GitHub OAuth Callback Route
 * 
 * Handles the OAuth callback from GitHub
 */

import { NextRequest, NextResponse } from 'next/server';
import { GitHubOAuthConfig } from '@/lib/auth/github-oauth-config';
import { GitHubOAuthService } from '@/lib/auth/github-oauth-service';
import { GitHubTokenManager } from '@/lib/auth/github-token-manager';
import { InMemoryTokenStorage } from '@/lib/auth/github-token-manager';

// Initialize services
const config = GitHubOAuthConfig.fromEnv();
const tokenManager = new GitHubTokenManager(
  new InMemoryTokenStorage(),
  process.env.GITHUB_TOKEN_ENCRYPTION_KEY || 'default-key'
);
const oauthService = new GitHubOAuthService(config, tokenManager);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    // Handle OAuth errors
    if (error) {
      console.error('GitHub OAuth error:', error, errorDescription);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/error?error=${encodeURIComponent(error)}&description=${encodeURIComponent(errorDescription || '')}`
      );
    }

    if (!code || !state) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/error?error=missing_parameters&description=Missing code or state parameter`
      );
    }

    // Extract user ID from state (in production, this should be encrypted)
    const userId = state.split(':')[0]; // Assuming state format: userId:randomString

    // Exchange code for token
    const tokenResult = await oauthService.exchangeCodeForToken(code, state, userId);
    
    if (!tokenResult.success) {
      console.error('Token exchange failed:', tokenResult.error);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/error?error=token_exchange_failed&description=${encodeURIComponent(tokenResult.error || 'Token exchange failed')}`
      );
    }

    // Success - redirect to success page
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/success?github_connected=true`
    );
  } catch (error) {
    console.error('GitHub OAuth callback error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/error?error=internal_error&description=Internal server error`
    );
  }
}
