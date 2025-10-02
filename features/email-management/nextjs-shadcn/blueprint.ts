import { Blueprint } from '@thearchitech.xyz/types';

const emailManagementNextjsShadcnBlueprint: Blueprint = {
  id: 'email-management-nextjs-shadcn',
  name: 'Email Management (Next.js + Shadcn)',
  description: 'Complete email management system with Next.js and Shadcn/ui',
  version: '1.0.0',
  actions: [
    // Create Email UI Components (CONSUMES: resend-nextjs hooks)
    {
      type: 'CREATE_FILE',
      path: 'src/components/email/EmailComposer.tsx',
      template: 'templates/EmailComposer.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/email/EmailTemplateEditor.tsx',
      template: 'templates/EmailTemplateEditor.tsx.tpl',
      condition: '{{#if feature.parameters.features.templates}}'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/email/EmailAnalytics.tsx',
      template: 'templates/EmailAnalytics.tsx.tpl',
      condition: '{{#if feature.parameters.features.analytics}}'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/email/EmailList.tsx',
      template: 'templates/EmailList.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/email/EmailPreview.tsx',
      template: 'templates/EmailPreview.tsx.tpl',
      condition: '{{#if feature.parameters.features.preview}}'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/email/EmailSettings.tsx',
      template: 'templates/EmailSettings.tsx.tpl'
    },
    // Create email management page
    {
      type: 'CREATE_FILE',
      path: 'src/app/email/page.tsx',
      template: 'templates/email-page.tsx.tpl'
    },
    // Create email template page
    {
      type: 'CREATE_FILE',
      path: 'src/app/email/templates/page.tsx',
      template: 'templates/email-templates-page.tsx.tpl',
      condition: '{{#if feature.parameters.features.templates}}'
    },
    // Create email analytics page
    {
      type: 'CREATE_FILE',
      path: 'src/app/email/analytics/page.tsx',
      template: 'templates/email-analytics-page.tsx.tpl',
      condition: '{{#if feature.parameters.features.analytics}}'
    },
    // Install Dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        'monaco-editor',
        'html-to-text'
      ],
      isDev: false
    }
  ]
};

export default emailManagementNextjsShadcnBlueprint;
