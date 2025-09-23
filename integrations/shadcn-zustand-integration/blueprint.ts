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
      template: 'form-store.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/stores/modal-store.ts',
      template: 'modal-store.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/stores/toast-store.ts',
      template: 'toast-store.ts.tpl'
    },
    // Create Form Components
    {
      type: 'CREATE_FILE',
      path: 'src/components/forms/FormProvider.tsx',
      template: 'FormProvider.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/forms/FormField.tsx',
      template: 'FormField.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/forms/FormInput.tsx',
      template: 'FormInput.tsx.tpl'
    },
    // Create Modal Components
    {
      type: 'CREATE_FILE',
      path: 'src/components/modals/Modal.tsx',
      template: 'Modal.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/modals/ModalProvider.tsx',
      template: 'ModalProvider.tsx.tpl'
    },
    // Create Toast Components
    {
      type: 'CREATE_FILE',
      path: 'src/components/toast/Toast.tsx',
      template: 'Toast.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/toast/ToastProvider.tsx',
      template: 'ToastProvider.tsx.tpl'
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
      dev: false
    },
    // Add Store Hooks
    {
      type: 'ENHANCE_FILE',
      path: 'src/hooks/useFormStore.ts',
      modifier: 'ts-module-enhancer',
      params: {
        importsToAdd: [
          { name: 'useFormStore', from: '@/stores/form-store', type: 'import' }
        ],
        statementsToAppend: [
          {
            type: 'raw',
            content: `export { useFormStore } from '@/stores/form-store';
export { useModalStore } from '@/stores/modal-store';
export { useToastStore } from '@/stores/toast-store';`
          }
        ]
      }
    },
    // Add Provider Setup
    {
      type: 'ENHANCE_FILE',
      path: 'src/providers/StoreProvider.tsx',
      modifier: 'ts-module-enhancer',
      params: {
        importsToAdd: [
          { name: 'FormProvider', from: '@/components/forms/FormProvider', type: 'import' },
          { name: 'ModalProvider', from: '@/components/modals/ModalProvider', type: 'import' },
          { name: 'ToastProvider', from: '@/components/toast/ToastProvider', type: 'import' }
        ],
        statementsToAppend: [
          {
            type: 'raw',
            content: `export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <FormProvider>
      <ModalProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </ModalProvider>
    </FormProvider>
  );
}`
          }
        ]
      }
    }
  ]
};

export default shadcnZustandIntegrationBlueprint;