# Features Directory

This directory contains high-level business capabilities that consume Adapters and Integrators to provide tangible, end-user functionality.

## Architecture

Features are organized by capability, then by stack implementation:

```
/features/
├── {capability-name}/
│   ├── nextjs-shadcn/          # Next.js + Shadcn/ui implementation
│   ├── nextjs-mui/             # Next.js + MUI implementation
│   ├── remix-shadcn/           # Remix + Shadcn/ui implementation
│   └── ...
```

## Feature Structure

Each feature implementation contains:

- `feature.json` - Metadata and prerequisites
- `blueprint.ts` - Blueprint actions for the feature
- `templates/` - Template files for UI components

## Prerequisites

Features can depend on:
- **Adapters**: Pure technologies (nextjs, shadcn-ui, drizzle, etc.)
- **Integrators**: Technical bridges (drizzle-nextjs, better-auth-nextjs, etc.)

## Example

```json
{
  "id": "teams-dashboard-nextjs-shadcn",
  "name": "Teams Dashboard (Next.js + Shadcn)",
  "description": "Complete teams management dashboard with Next.js and Shadcn/ui",
  "version": "1.0.0",
  "prerequisites": {
    "capabilities": ["teams-data-hooks", "shadcn-ui", "user-authentication"],
    "adapters": ["nextjs"],
    "integrators": ["drizzle-nextjs-integration"]
  },
  "provides": {
    "capabilities": ["teams-management", "user-dashboard", "team-collaboration", "team-settings", "team-members", "team-invitations"]
  }
}
```

## Philosophy

Features are the "functional appliances" of our ecosystem. They consume the capabilities provided by Adapters and Integrators to deliver real business value to end users.
