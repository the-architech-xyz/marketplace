import { FormProvider } from '@/components/forms/FormProvider';
import { ModalProvider } from '@/components/modals/ModalProvider';
import { ToastProvider } from '@/components/toast/ToastProvider';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <FormProvider>
      <ModalProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </ModalProvider>
    </FormProvider>
  );
}
