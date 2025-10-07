/**
 * Payments Frontend Implementation: Shadcn/ui
 * 
 * This implementation provides the UI components for the payments capability
 * using Shadcn/ui. It generates components that consume the hooks defined
 * in the contract.ts file.
 */

import { Blueprint, BlueprintActionType, ModifierType, EnhanceFileFallbackStrategy } from '@thearchitech.xyz/types';

export const paymentsShadcnBlueprint: Blueprint = {
  id: 'payments-frontend-shadcn',
  name: 'Payments Frontend (Shadcn/ui)',
  description: 'Frontend implementation for payments capability using Shadcn/ui',
  actions: [
    // Install additional dependencies for payments UI
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'react-hook-form@^7.48.2',
        '@hookform/resolvers@^3.3.2',
        'zod@^3.22.4',
        'date-fns@^2.30.0',
        'lucide-react@^0.294.0',
        '@tanstack/react-query@^5.0.0',
        '@stripe/stripe-js@^2.1.11',
        '@stripe/react-stripe-js@^2.4.0'
      ]
    },

    // Create payment form component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/payments/PaymentForm.tsx',
      content: `'use client';

import { useState ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreatePaymentIntent } from '@/lib/payments/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, DollarSign } from 'lucide-react';

const paymentFormSchema = z.object({
  amount: z.number().min(1, 'Amount must be at least $0.01'),
  currency: z.string().min(1, 'Currency is required'),
  description: z.string().optional(),
  customerId: z.string().optional()
});

type PaymentFormData = z.infer<typeof paymentFormSchema>;

export function PaymentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createPaymentIntent = useCreatePaymentIntent();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      currency: 'usd'
    }
  });

  const amount = watch('amount');

  const onSubmit = async (data: PaymentFormData) => {
    setIsSubmitting(true);
    try {
      const paymentIntent = await createPaymentIntent.mutateAsync({
        amount: Math.round(data.amount * 100), // Convert to cents
        currency: data.currency,
        description: data.description,
        customerId: data.customerId
      });
      
      // TODO: Handle payment intent (redirect to Stripe Checkout or show payment form)
      console.log('Payment intent created:', paymentIntent);
    } catch (error) {
      console.error('Error creating payment intent:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Process Payment
        </CardTitle>
        <CardDescription>
          Create a payment intent for processing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  className="pl-10"
                  {...register('amount', { valueAsNumber: true })}
                />
              </div>
              {errors.amount && (
                <Alert>
                  <AlertDescription>{errors.amount.message}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select {...register('currency')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD - US Dollar</SelectItem>
                  <SelectItem value="eur">EUR - Euro</SelectItem>
                  <SelectItem value="gbp">GBP - British Pound</SelectItem>
                  <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                </SelectContent>
              </Select>
              {errors.currency && (
                <Alert>
                  <AlertDescription>{errors.currency.message}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="Payment description"
              {...register('description')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerId">Customer ID (Optional)</Label>
            <Input
              id="customerId"
              placeholder="cus_..."
              {...register('customerId')}
            />
          </div>

          {amount && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Amount:</span>
                <span className="text-lg font-semibold">{formatAmount(amount)}</span>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            <CreditCard className="w-4 h-4 mr-2" />
            Create Payment Intent
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}`
    },

    // Create subscription management component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/payments/SubscriptionManager.tsx',
      content: `'use client';

import { useState ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSubscriptions, useCreateSubscription, useCancelSubscription, usePlans } from '@/lib/payments/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Plus, CreditCard, Calendar, DollarSign, X } from 'lucide-react';
import { format } from 'date-fns';

const subscriptionFormSchema = z.object({
  customerId: z.string().min(1, 'Customer ID is required'),
  planId: z.string().min(1, 'Plan is required'),
  trialPeriodDays: z.number().min(0).optional()
});

type SubscriptionFormData = z.infer<typeof subscriptionFormSchema>;

export function SubscriptionManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: subscriptions, isLoading: subscriptionsLoading } = useSubscriptions();
  const { data: plans } = usePlans({ active: true });
  const createSubscription = useCreateSubscription();
  const cancelSubscription = useCancelSubscription();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionFormSchema)
  });

  const onSubmit = async (data: SubscriptionFormData) => {
    try {
      await createSubscription.mutateAsync(data);
      setIsDialogOpen(false);
      reset();
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  };

  const handleCancel = async (subscriptionId: string) => {
    if (confirm('Are you sure you want to cancel this subscription?')) {
      await cancelSubscription.mutateAsync(subscriptionId);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'trialing':
        return 'bg-blue-100 text-blue-800';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount / 100);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Subscriptions
              </CardTitle>
              <CardDescription>
                Manage customer subscriptions and billing
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => reset()}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Subscription
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Subscription</DialogTitle>
                  <DialogDescription>
                    Create a new subscription for a customer
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerId">Customer ID</Label>
                    <Input
                      id="customerId"
                      placeholder="cus_..."
                      {...register('customerId')}
                    />
                    {errors.customerId && (
                      <Alert>
                        <AlertDescription>{errors.customerId.message}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="planId">Plan</Label>
                    <Select {...register('planId')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {plans?.map((plan) => (
                          <SelectItem key={plan.id} value={plan.id}>
                            {plan.name} - {formatAmount(plan.amount, plan.currency)}/{plan.interval}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.planId && (
                      <Alert>
                        <AlertDescription>{errors.planId.message}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trialPeriodDays">Trial Period (Days)</Label>
                    <Input
                      id="trialPeriodDays"
                      type="number"
                      min="0"
                      placeholder="0"
                      {...register('trialPeriodDays', { valueAsNumber: true })}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" disabled={createSubscription.isPending}>
                      {createSubscription.isPending && (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      Create Subscription
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {subscriptionsLoading ? (
            <div>Loading subscriptions...</div>
          ) : subscriptions?.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No subscriptions yet</h3>
              <p className="text-gray-600 mb-4">Create your first subscription to get started</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Subscription
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Current Period</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions?.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell className="font-medium">
                      {subscription.customerId}
                    </TableCell>
                    <TableCell>{subscription.plan.name}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(subscription.status)}>
                        {subscription.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {format(new Date(subscription.currentPeriodStart), 'MMM dd')} - {' '}
                          {format(new Date(subscription.currentPeriodEnd), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-gray-600" />
                        <span className="font-medium">
                          {formatAmount(subscription.plan.amount, subscription.plan.currency)}
                        </span>
                        <span className="text-sm text-gray-600">
                          /{subscription.plan.interval}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {subscription.status === 'active' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCancel(subscription.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}`
    },

    // Create customer management component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/payments/CustomerManager.tsx',
      content: `'use client';

import { useState ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCustomers, useCreateCustomer, useUpdateCustomer } from '@/lib/payments/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Plus, Edit, Users, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';

const customerFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().optional(),
  address: z.object({
    line1: z.string().min(1, 'Address line 1 is required'),
    line2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required'),
  }).optional()
});

type CustomerFormData = z.infer<typeof customerFormSchema>;

export function CustomerManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const { data: customers, isLoading } = useCustomers();
  const createCustomer = useCreateCustomer();
  const updateCustomer = useUpdateCustomer();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerFormSchema)
  });

  const onSubmit = async (data: CustomerFormData) => {
    try {
      if (editingCustomer) {
        await updateCustomer.mutateAsync({ id: editingCustomer.id, data });
      } else {
        await createCustomer.mutateAsync(data);
      }
      setIsDialogOpen(false);
      setEditingCustomer(null);
      reset();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleEdit = (customer: any) => {
    setEditingCustomer(customer);
    setValue('email', customer.email);
    setValue('name', customer.name || '');
    setValue('phone', customer.phone || '');
    if (customer.address) {
      setValue('address', customer.address);
    }
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Customers
              </CardTitle>
              <CardDescription>
                Manage your customer database
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setEditingCustomer(null); reset(); }}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Customer
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingCustomer ? 'Edit Customer' : 'Create New Customer'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingCustomer ? 'Update customer information' : 'Add a new customer to your database'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="customer@example.com"
                        {...register('email')}
                      />
                      {errors.email && (
                        <Alert>
                          <AlertDescription>{errors.email.message}</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        {...register('name')}
                      />
                      {errors.name && (
                        <Alert>
                          <AlertDescription>{errors.name.message}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      {...register('phone')}
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Address (Optional)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="line1">Address Line 1</Label>
                        <Input
                          id="line1"
                          placeholder="123 Main St"
                          {...register('address.line1')}
                        />
                        {errors.address?.line1 && (
                          <Alert>
                            <AlertDescription>{errors.address.line1.message}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="line2">Address Line 2</Label>
                        <Input
                          id="line2"
                          placeholder="Apt 4B"
                          {...register('address.line2')}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="New York"
                          {...register('address.city')}
                        />
                        {errors.address?.city && (
                          <Alert>
                            <AlertDescription>{errors.address.city.message}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          placeholder="NY"
                          {...register('address.state')}
                        />
                        {errors.address?.state && (
                          <Alert>
                            <AlertDescription>{errors.address.state.message}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          placeholder="10001"
                          {...register('address.postalCode')}
                        />
                        {errors.address?.postalCode && (
                          <Alert>
                            <AlertDescription>{errors.address.postalCode.message}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          placeholder="US"
                          {...register('address.country')}
                        />
                        {errors.address?.country && (
                          <Alert>
                            <AlertDescription>{errors.address.country.message}</AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" disabled={createCustomer.isPending || updateCustomer.isPending}>
                      {(createCustomer.isPending || updateCustomer.isPending) && (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      {editingCustomer ? 'Update Customer' : 'Create Customer'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading customers...</div>
          ) : customers?.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No customers yet</h3>
              <p className="text-gray-600 mb-4">Add your first customer to get started</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers?.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-gray-600" />
                        <span>{customer.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {customer.phone ? (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-gray-600" />
                          <span>{customer.phone}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>{format(new Date(customer.createdAt), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(customer)}>
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}`
    },

    // Create payments dashboard page
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/payments/page.tsx',
      content: `import { PaymentForm ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from '@/components/payments/PaymentForm';
import { SubscriptionManager } from '@/components/payments/SubscriptionManager';
import { CustomerManager } from '@/components/payments/CustomerManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PaymentsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Payment Management</h1>
          <p className="text-gray-600">Process payments, manage subscriptions, and track customers</p>
        </div>

        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="payments">
            <PaymentForm />
          </TabsContent>

          <TabsContent value="subscriptions">
            <SubscriptionManager />
          </TabsContent>

          <TabsContent value="customers">
            <CustomerManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}`
    }
  ]
};
