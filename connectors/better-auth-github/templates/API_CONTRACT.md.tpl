# GitHub OAuth API Contract

This document defines the HTTP API contract for the Better Auth GitHub OAuth connector.

## Base URL

```
<%= env.APP_URL %>/auth/github
```

## Overview

This connector provides GitHub OAuth integration endpoints for authentication.
All endpoints follow the OAuth 2.0 authorization code flow.

## Authentication Flow

The GitHub OAuth flow consists of three steps:

1. **Authorize** - Redirect user to GitHub for authentication
2. **Callback** - GitHub redirects back with authorization code
3. **Token Exchange** - Exchange code for access token (handled automatically)

---

## Endpoints

### 1. Initiate GitHub Authorization

**GET** `/auth/github/authorize`

Initiates the GitHub OAuth authorization flow by redirecting the user to GitHub.

**Query Parameters:**
- `redirect` (string, optional) - URL to redirect to after successful authentication
- `state` (string, optional) - State parameter for CSRF protection (auto-generated if not provided)

**Response:**
- **302 Redirect** to GitHub OAuth authorization page

**Example:**
```
GET /auth/github/authorize?redirect=/dashboard
→ Redirects to: https://github.com/login/oauth/authorize?client_id=...&redirect_uri=...&state=...
```

**Error Responses:**
- `400 Bad Request` - Invalid redirect URL
- `500 Internal Server Error` - OAuth configuration error

---

### 2. GitHub OAuth Callback

**GET** `/auth/github/callback`

Handles the OAuth callback from GitHub after user authorization.

**Query Parameters:**
- `code` (string, required) - Authorization code from GitHub
- `state` (string, required) - State parameter for CSRF protection

**Response:**
- **302 Redirect** to application (with session cookie set)
- **Redirect URL**: Original `redirect` parameter or default `/`

**Success Flow:**
```
1. GitHub redirects to: /auth/github/callback?code=abc123&state=xyz789
2. Connector validates state parameter
3. Connector exchanges code for access token
4. Connector creates user session
5. Connector sets session cookie
6. Connector redirects to application
```

**Error Responses:**
```json
{
  "error": {
    "code": "OAUTH_ERROR",
    "message": "GitHub OAuth authentication failed",
    "type": "authentication_error",
    "details": {
      "provider": "github",
      "error_description": "..."
    }
  }
}
```

**Status Codes:**
- `302` - Successful authentication (redirect with session)
- `400` - Invalid or missing code/state parameter
- `401` - Invalid authorization code
- `403` - Access denied by user
- `500` - Internal server error

---

### 3. Revoke GitHub Access

**POST** `/auth/github/revoke`

Revokes the GitHub OAuth access token and disconnects the account.

**Headers:**
- `Cookie: session=...` (required) - User must be authenticated

**Request:**
```json
{
  "accountId": "acc_123" // Optional - account ID to revoke
}
```

**Response:**
```json
{
  "success": true,
  "message": "GitHub account disconnected successfully"
}
```

**Error Responses:**
- `401 Unauthorized` - No active session
- `404 Not Found` - GitHub account not connected
- `500 Internal Server Error` - Failed to revoke token

**Status Codes:**
- `200` - Success
- `401` - Unauthorized (no session)
- `404` - Account not found
- `500` - Server error

---

## Security

### CSRF Protection

The connector implements CSRF protection via the `state` parameter:
- State is generated server-side and stored in session
- State is validated on callback to prevent CSRF attacks
- State expires after 10 minutes

### Session Management

- Sessions are created using Better Auth's session management
- Session cookies are HTTP-only and secure (in production)
- Session duration: 30 days (configurable)

### Token Storage

- GitHub access tokens are stored securely in database
- Tokens are encrypted at rest
- Tokens can be refreshed automatically

---

## Integration with Better Auth

This connector integrates with Better Auth's user management:

```typescript
// Automatic account linking
if (user already exists with same email) {
  // Link GitHub account to existing user
} else {
  // Create new user with GitHub account
}
```

---

## Error Handling

All endpoints use consistent error structure:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "type": "authentication_error | validation_error | permission_error",
    "details": {
      "provider": "github",
      "error_description": "..."
    }
  }
}
```

**Error Codes:**
- `OAUTH_ERROR` - Generic OAuth authentication error
- `INVALID_STATE` - State parameter mismatch (CSRF protection)
- `INVALID_CODE` - Authorization code is invalid or expired
- `ACCESS_DENIED` - User denied access on GitHub
- `ACCOUNT_EXISTS` - Account with this email already exists
- `REVOKE_FAILED` - Failed to revoke GitHub access token

---

## Rate Limiting

All endpoints are rate limited:
- **Authorize**: 10 requests per minute per IP
- **Callback**: 20 requests per minute per IP  
- **Revoke**: 5 requests per minute per user

---

## Webhooks

This connector does not implement webhooks. GitHub OAuth uses redirect-based flow only.

---

## Configuration

Required environment variables:

```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=https://yourdomain.com/auth/github/callback
```

**Scopes Requested:**
- `user:email` - Read user email addresses
- `read:user` - Read user profile information

---

## Status Codes Summary

- `200` - Success
- `302` - Redirect (authorization flow)
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (no session)
- `403` - Forbidden (access denied)
- `404` - Not Found (account not connected)
- `500` - Internal Server Error

---

## Example Flow

### Complete OAuth Flow

```
1. User clicks "Sign in with GitHub"
   → Frontend: window.location.href = '/auth/github/authorize'

2. Connector redirects to GitHub
   → 302 to https://github.com/login/oauth/authorize?client_id=...

3. User authorizes on GitHub
   → GitHub redirects to: /auth/github/callback?code=abc123&state=xyz789

4. Connector handles callback
   → Validates state
   → Exchanges code for token
   → Creates/links user account
   → Sets session cookie
   → Redirects to application

5. User is authenticated
   → Session cookie contains user session
   → Frontend can access user data via Better Auth client
```

---

**This API contract follows The Architech's gold standard (inspired by stripe/nextjs-drizzle).**


