'use client';

import { useCreatePayment } from '@/hooks/stripe/use-create-payment';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const paymentSchema = z.object({
  amount: z.number().min(1, 'Amount must be greater than 0'),
  currency: z.string().min(3, 'Currency is required'),
  description: z.string().min(1, 'Description is required'),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export const PaymentForm = () => {
  const { mutate: createPayment, isPending } = useCreatePayment();
  
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const onSubmit = (data: PaymentFormData) => {
    createPayment(data);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>Enter payment details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              {...form.register('amount', { valueAsNumber: true })}
              placeholder="0.00"
            />
            {form.formState.errors.amount && (
              <p className="text-sm text-destructive">
                {form.formState.errors.amount.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input
              id="currency"
              {...form.register('currency')}
              placeholder="USD"
            />
            {form.formState.errors.currency && (
              <p className="text-sm text-destructive">
                {form.formState.errors.currency.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              {...form.register('description')}
              placeholder="Payment description"
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>
          
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Processing...' : 'Pay Now'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
