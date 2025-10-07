# Emailing Capability

Complete emailing capability with sending, templates, lists, subscribers, and analytics.

## Overview

The Emailing capability provides a comprehensive email management system with support for:
- Email sending with multiple providers (Resend, SendGrid, Mailgun)
- Template management and creation
- Email list and subscriber management
- Analytics and tracking
- Multi-backend and multi-frontend support

## Architecture

This feature follows the Two-Headed architecture pattern:

### Backend Implementations
- **`resend-nextjs/`** - Resend integration with Next.js
- **`sendgrid-nextjs/`** - SendGrid integration with Next.js (planned)
- **`mailgun-nextjs/`** - Mailgun integration with Next.js (planned)

### Frontend Implementations
- **`shadcn/`** - Shadcn/ui components
- **`mui/`** - Material-UI components (planned)
- **`chakra/`** - Chakra UI components (planned)

## Contract

The feature contract is defined in `feature.json` and includes:

### Hooks
- **Mutations**: `useSendEmail`, `useCreateTemplate`, `useUpdateTemplate`, `useDeleteTemplate`, `useSubscribe`, `useUnsubscribe`
- **Queries**: `useTemplates`, `useTemplate`, `useEmails`, `useEmailAnalytics`

### API Endpoints
- `POST /api/email/send` - Send emails
- `GET /api/email/templates` - List templates
- `POST /api/email/templates` - Create template
- `PATCH /api/email/templates/:id` - Update template
- `DELETE /api/email/templates/:id` - Delete template
- `GET /api/email/history` - Get email history
- `POST /api/email/subscribers` - Subscribe user
- `DELETE /api/email/subscribers/:id` - Unsubscribe user

### Types
- `EmailResult` - Email sending result
- `SendEmailData` - Email sending parameters
- `EmailTemplate` - Template structure
- `CreateTemplateData` - Template creation parameters
- `EmailAnalytics` - Analytics data

## Implementation Requirements

### Backend Implementation
1. **Must implement all API endpoints** defined in the contract
2. **Must support the selected email provider** (Resend, SendGrid, etc.)
3. **Must handle error tracking** and logging
4. **Must provide template management** functionality
5. **Must support subscriber management** and list operations

### Frontend Implementation
1. **Must provide UI components** for all email operations
2. **Must integrate with backend hooks** using TanStack Query
3. **Must handle loading and error states** appropriately
4. **Must provide responsive design** for all screen sizes
5. **Must support the selected UI library** (Shadcn, MUI, etc.)

## Usage Example

```typescript
// Using the emailing hooks
import { useSendEmail, useTemplates } from '@/lib/emailing/hooks';

function EmailComposer() {
  const sendEmail = useSendEmail();
  const { data: templates } = useTemplates();

  const handleSend = async (emailData) => {
    await sendEmail.mutateAsync(emailData);
  };

  return (
    <div>
      {/* Email composition UI */}
    </div>
  );
}
```

## Configuration

The feature can be configured through the `parameters` section in `feature.json`:

- **`backend`**: Choose email provider implementation
- **`frontend`**: Choose UI library implementation
- **`features`**: Enable/disable specific email features

## Dependencies

### Required Adapters
- `resend` - Email service adapter

### Required Integrators
- `resend-nextjs-integration` - Resend + Next.js integration

### Required Capabilities
- `email-service` - Email sending capability

## Development

To add a new backend implementation:

1. Create a new directory under `backend/`
2. Implement the required API endpoints
3. Create the service layer with email provider integration
4. Update the feature.json to include the new implementation

To add a new frontend implementation:

1. Create a new directory under `frontend/`
2. Implement UI components using the selected library
3. Integrate with the backend hooks
4. Update the feature.json to include the new implementation
