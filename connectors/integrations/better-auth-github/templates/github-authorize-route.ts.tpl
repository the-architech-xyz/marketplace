/**
 * GitHub OAuth Authorize Route
 * 
 * Initiates the OAuth flow by redirecting user to GitHub
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
    const userId = searchParams.get('userId');
    const state = searchParams.get('state');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Generate OAuth URL
    const authResult = oauthService.generateAuthUrl(userId, state || undefined);
    
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error || 'Failed to generate auth URL' },
        { status: 500 }
      );
    }

    // Redirect to GitHub
    return NextResponse.redirect(authResult.data!.url);
  } catch (error) {
    console.error('GitHub OAuth authorize error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
