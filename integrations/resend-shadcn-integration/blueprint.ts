import { Blueprint } from '@thearchitech.xyz/types';

const resendShadcnIntegrationBlueprint: Blueprint = {
  id: 'resend-shadcn-integration',
  name: 'Resend Shadcn Integration',
  description: 'Beautiful email UI components using Shadcn/ui with Resend for email management, templates, and analytics',
  version: '1.0.0',
  actions: [
    // Create Email UI Components
    {
      type: 'CREATE_FILE',
      path: 'src/components/email/EmailComposer.tsx',
      template: 'templates/EmailComposer.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/email/EmailTemplateEditor.tsx',
      template: 'templates/EmailTemplateEditor.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/email/EmailAnalytics.tsx',
      template: 'templates/EmailAnalytics.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/email/EmailList.tsx',
      template: 'templates/EmailList.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/email/EmailPreview.tsx',
      template: 'templates/EmailPreview.tsx.tpl'
    },
    // Install Dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        'resend',
        'react-hook-form',
        '@hookform/resolvers',
        'zod',
        'monaco-editor',
        'html-to-text'
      ],
    }
  ]
};

export default resendShadcnIntegrationBlueprint;