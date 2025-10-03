import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { stripeApi } from '../lib/stripe-api';

export function useSubscriptions() {
  return useQuery({
    queryKey: ['subscriptions'],
    queryFn: stripeApi.subscriptions.list,
  });
}

export function useSubscription(subscriptionId: string) {
  return useQuery({
    queryKey: ['subscription', subscriptionId],
    queryFn: () => stripeApi.subscriptions.retrieve(subscriptionId),
    enabled: !!subscriptionId,
  });
}

export function useCreateSubscription() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: stripeApi.subscriptions.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });
}

export function useUpdateSubscription() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; [key: string]: any }) => 
      stripeApi.subscriptions.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['subscription', variables.id] });
    },
  });
}

export function useCancelSubscription() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (subscriptionId: string) => 
      stripeApi.subscriptions.cancel(subscriptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });
}
