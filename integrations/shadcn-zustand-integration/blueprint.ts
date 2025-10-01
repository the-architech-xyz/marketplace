import { Blueprint } from '@thearchitech.xyz/types';

const shadcnZustandIntegrationBlueprint: Blueprint = {
  id: 'shadcn-zustand-integration',
  name: 'Shadcn Zustand Integration',
  description: 'State management components using Zustand with Shadcn/ui for forms, modals, and notifications',
  version: '1.0.0',
  actions: [
    // Create Zustand Stores
    {
      type: 'CREATE_FILE',
      path: 'src/stores/form-store.ts',
      template: 'templates/form-store.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/stores/modal-store.ts',
      template: 'templates/modal-store.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/stores/toast-store.ts',
      template: 'templates/toast-store.ts.tpl'
    },
    // Create Form Components
    {
      type: 'CREATE_FILE',
      path: 'src/components/forms/FormProvider.tsx',
      template: 'templates/FormProvider.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/forms/FormField.tsx',
      template: 'templates/FormField.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/forms/FormInput.tsx',
      template: 'templates/FormInput.tsx.tpl'
    },
    // Create Modal Components
    {
      type: 'CREATE_FILE',
      path: 'src/components/modals/Modal.tsx',
      template: 'templates/Modal.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/modals/ModalProvider.tsx',
      template: 'templates/ModalProvider.tsx.tpl'
    },
    // Create Toast Components
    {
      type: 'CREATE_FILE',
      path: 'src/components/toast/Toast.tsx',
      template: 'templates/Toast.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/toast/ToastProvider.tsx',
      template: 'templates/ToastProvider.tsx.tpl'
    },
    // Install Dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        'zustand',
        'immer',
        'react-hook-form',
        '@hookform/resolvers',
        'zod'
      ],
    },
    // Add Store Hooks
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/useFormStore.ts',
      template: 'templates/useFormStore.ts.tpl'
    },
    // Add Provider Setup
    {
      type: 'CREATE_FILE',
      path: 'src/providers/StoreProvider.tsx',
      template: 'templates/StoreProvider.tsx.tpl'
    }
  ]
};

export default shadcnZustandIntegrationBlueprint;