/**
 * GitHub OAuth Revoke Route
 * 
 * Revokes GitHub OAuth token for a user
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

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Revoke token
    const revokeResult = await oauthService.revokeToken(userId);
    
    if (!revokeResult.success) {
      return NextResponse.json(
        { error: revokeResult.error || 'Failed to revoke token' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'GitHub token revoked successfully'
    });
  } catch (error) {
    console.error('GitHub OAuth revoke error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
