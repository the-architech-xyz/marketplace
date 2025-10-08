import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { stripeApi } from '../lib/stripe-api';

export function useInvoices() {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: stripeApi.invoices.list,
  });
}

export function useInvoice(invoiceId: string) {
  return useQuery({
    queryKey: ['invoice', invoiceId],
    queryFn: () => stripeApi.invoices.retrieve(invoiceId),
    enabled: !!invoiceId,
  });
}

export function useCreateInvoice() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: stripeApi.invoices.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
}

export function useUpdateInvoice() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; [key: string]: any }) => 
      stripeApi.invoices.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['invoice', variables.id] });
    },
  });
}

export function usePayInvoice() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (invoiceId: string) => 
      stripeApi.invoices.pay(invoiceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
}
