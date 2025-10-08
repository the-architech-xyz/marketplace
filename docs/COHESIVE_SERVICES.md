# Cohesive Services Pattern

## Overview

The Cohesive Services Pattern is a revolutionary approach to organizing business logic that groups related functionality into cohesive, easy-to-use service interfaces. Instead of scattered individual hooks, we provide unified services that make development more intuitive and maintainable.

## 🎯 The Problem with Granular Hooks

### ❌ Old Granular Approach

```typescript
// Scattered individual hooks (85+ across all features)
usePayments, usePayment, useCreatePayment, useUpdatePayment, useDeletePayment,
useRefundPayment, usePaymentMethods, useCreatePaymentMethod, useUpdatePaymentMethod,
useDeletePaymentMethod, useSubscriptions, useSubscription, useCreateSubscription,
useUpdateSubscription, useCancelSubscription, useInvoices, useInvoice, useCreateInvoice,
useUpdateInvoice, usePaymentAnalytics, useAuth, useUser, useSession, useIsAuthenticated,
useAuthLoading, useAuthError, useSignIn, useSignUp, useSignOut, useOAuthSignIn,
useForgotPassword, useResetPassword, useChangePassword, useUpdateProfile, useDeleteAccount,
useVerifyEmail, useResendVerification, useAccounts, useUnlinkAccount, useSetupTwoFactor,
useVerifyTwoFactor, useDisableTwoFactor, useTeams, useTeam, useCreateTeam, useUpdateTeam,
useDeleteTeam, useLeaveTeam, useTeamMembers, useTeamMember, useUpdateMember, useRemoveMember,
useTeamInvitations, useInvitation, useInviteMember, useAcceptInvitation, useDeclineInvitation,
useCancelInvitation, useResendInvitation, useTeamActivities, useTeamAnalytics, useTeamPermissions,
useHasPermission, useEmails, useEmail, useSendEmail, useSendBulkEmail, useDeleteEmail,
useResendEmail, useTemplates, useTemplate, useCreateTemplate, useUpdateTemplate, useDeleteTemplate,
useDuplicateTemplate, useCampaigns, useCampaign, useCreateCampaign, useUpdateCampaign,
useDeleteCampaign, useStartCampaign, usePauseCampaign, useCancelCampaign, useEmailAnalytics,
useTemplateAnalytics, useCampaignAnalytics, useChats, useChat, useCreateChat, useUpdateChat,
useDeleteChat, useDuplicateChat, useMessages, useSendMessage, useStreamMessage, useDeleteMessage,
useRegenerateMessage, useUploadFile, useDeleteAttachment, useExportChat, useImportChat,
useModels, useModel, useChatAnalytics, useUsageStats
```

**Problems:**
- **Cognitive Overload**: Developers need to remember 20+ hook names per feature
- **Inconsistent Patterns**: Each hook has different naming conventions
- **Poor Discoverability**: Hard to find related functionality
- **Maintenance Nightmare**: 85+ individual hooks to maintain
- **Type Confusion**: Similar hooks with different signatures

## ✅ The Cohesive Services Solution

### 🎯 New Cohesive Approach

```typescript
// Cohesive business services (26 across all features)
const { create, list, get, update, delete, refund } = paymentService.usePayments();
const { create, list, get, update, cancel } = paymentService.useSubscriptions();
const { create, list, get, update } = paymentService.useInvoices();
const { list, create, update, delete } = paymentService.usePaymentMethods();
const { createSession, createPortalSession } = paymentService.useCheckout();
const { getAnalytics } = paymentService.useAnalytics();

const { signIn, signUp, signOut, oauthSignIn, refreshSession } = authService.useAuthentication();
const { getUser, updateProfile, changePassword, deleteAccount } = authService.useProfile();
const { getAccounts, setupTwoFactor, verifyTwoFactor, disableTwoFactor, unlinkAccount } = authService.useSecurity();
const { forgotPassword, resetPassword } = authService.usePasswordManagement();
const { verifyEmail, resendVerification } = authService.useEmailVerification();

const { create, list, get, update, delete, leave } = teamsService.useTeams();
const { list, get, update, remove } = teamsService.useMembers();
const { invite, accept, decline, cancel, resend } = teamsService.useInvitations();
const { getTeamAnalytics, getActivities } = teamsService.useAnalytics();
const { getPermissions, hasPermission } = teamsService.usePermissions();

const { send, sendBulk, delete, resend } = emailService.useEmails();
const { create, update, delete, duplicate } = emailService.useTemplates();
const { create, update, delete, start, pause, cancel } = emailService.useCampaigns();
const { getEmailAnalytics, getTemplateAnalytics, getCampaignAnalytics } = emailService.useAnalytics();

const { create, update, delete, duplicate } = aiChatService.useChats();
const { send, stream, delete, regenerate } = aiChatService.useMessages();
const { upload, delete } = aiChatService.useFiles();
const { export, import } = aiChatService.useImportExport();
const { list, get } = aiChatService.useModels();
const { getChatAnalytics, getUsageStats } = aiChatService.useAnalytics();
```

**Benefits:**
- **Intuitive Organization**: Related functionality grouped together
- **Consistent Patterns**: All services follow the same structure
- **Easy Discovery**: Clear service boundaries and purposes
- **Maintainable**: Only 26 cohesive services to maintain
- **Type Safe**: Consistent TypeScript interfaces

## 🏗️ Service Structure Pattern

### Standard Service Interface

```typescript
export interface I{FeatureName}Service {
  /**
   * {Business Capability} Service
   * Provides all {capability}-related operations in a cohesive interface
   */
  use{Capability}: () => {
    // Query operations
    list: any; // UseQueryResult<{Type}[], Error>
    get: (id: string) => any; // UseQueryResult<{Type}, Error>
    
    // Mutation operations
    create: any; // UseMutationResult<{Type}, Error, Create{Type}Data>
    update: any; // UseMutationResult<{Type}, Error, { id: string; data: Update{Type}Data }>
    delete: any; // UseMutationResult<void, Error, string>
    // ... other operations
  };

  // ... other cohesive services
}
```

### Implementation Pattern

```typescript
export const {FeatureName}Service: I{FeatureName}Service = {
  use{Capability}: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (filters?: {Type}Filters) => useQuery<{Type}[], Error>({
      queryKey: ['{capability}', filters],
      queryFn: () => {capability}Api.get{Capability}s(filters),
    });

    const get = (id: string) => useQuery<{Type}, Error>({
      queryKey: ['{capability}', id],
      queryFn: () => {capability}Api.get{Capability}(id),
    });

    // Mutation operations
    const create = () => useMutation<{Type}, Error, Create{Type}Data>({
      mutationFn: {capability}Api.create{Capability},
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['{capability}'] });
      },
    });

    const update = () => useMutation<{Type}, Error, { id: string; data: Update{Type}Data }>({
      mutationFn: ({ id, data }) => {capability}Api.update{Capability}(id, data),
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['{capability}', id] });
        queryClient.invalidateQueries({ queryKey: ['{capability}'] });
      },
    });

    const del = () => useMutation<void, Error, string>({
      mutationFn: {capability}Api.delete{Capability},
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['{capability}'] });
      },
    });

    return { list, get, create, update, delete: del };
  },

  // ... other services
};
```

## 🎯 Service Design Principles

### 1. Cohesive Grouping
Group related functionality together:
- **Payments**: `usePayments()`, `useSubscriptions()`, `useInvoices()`, `usePaymentMethods()`, `useCheckout()`, `useAnalytics()`
- **Auth**: `useAuthentication()`, `useProfile()`, `useSecurity()`, `usePasswordManagement()`, `useEmailVerification()`
- **Teams**: `useTeams()`, `useMembers()`, `useInvitations()`, `useAnalytics()`, `usePermissions()`

### 2. Consistent Operations
Each service provides standard operations:
- **Query Operations**: `list()`, `get(id)`
- **Mutation Operations**: `create()`, `update()`, `delete()`
- **Specialized Operations**: `refund()`, `cancel()`, `invite()`, etc.

### 3. Business-Focused Naming
Use business terminology, not technical:
- ✅ `usePayments()` - Business capability
- ❌ `usePaymentHooks()` - Technical implementation
- ✅ `useAuthentication()` - Business capability
- ❌ `useAuthQueries()` - Technical implementation

### 4. Return Object Pattern
Each service returns an object with operations:
```typescript
const { list, get, create, update, delete } = service.usePayments();
```

## 🚀 Usage Examples

### Payment Processing

```typescript
import { PaymentService } from '@/features/payments/backend/stripe-nextjs/PaymentService';

function PaymentPage() {
  const { list, create, refund } = PaymentService.usePayments();
  const { list: subscriptions, create: createSubscription } = PaymentService.useSubscriptions();

  // List payments
  const { data: payments, isLoading } = list({ status: 'completed' });

  // Create payment
  const createPayment = create();
  const handlePayment = async (data: CreatePaymentData) => {
    const result = await createPayment.mutateAsync(data);
    console.log('Payment created:', result);
  };

  // Refund payment
  const refundPayment = refund();
  const handleRefund = async (paymentId: string) => {
    await refundPayment.mutateAsync({ paymentId, amount: 100 });
  };

  return (
    <div>
      {/* Payment UI */}
    </div>
  );
}
```

### Authentication

```typescript
import { AuthService } from '@/features/auth/backend/better-auth-nextjs/AuthService';

function AuthPage() {
  const { signIn, signUp, signOut } = AuthService.useAuthentication();
  const { getUser, updateProfile } = AuthService.useProfile();
  const { setupTwoFactor, verifyTwoFactor } = AuthService.useSecurity();

  // Authentication
  const handleSignIn = async (data: SignInData) => {
    const result = await signIn.mutateAsync(data);
    console.log('Signed in:', result);
  };

  // Profile management
  const { data: user } = getUser();
  const updateUser = updateProfile();
  const handleUpdateProfile = async (data: UpdateProfileData) => {
    await updateUser.mutateAsync(data);
  };

  // Security
  const setup2FA = setupTwoFactor();
  const handleSetup2FA = async () => {
    const result = await setup2FA.mutateAsync();
    console.log('2FA setup:', result);
  };

  return (
    <div>
      {/* Auth UI */}
    </div>
  );
}
```

## 🎯 Benefits

### 1. Developer Experience
- **Intuitive**: Related functionality grouped together
- **Discoverable**: Clear service boundaries and purposes
- **Consistent**: Same patterns across all features
- **Type Safe**: Full TypeScript support

### 2. Maintainability
- **Organized**: Clear separation of concerns
- **Scalable**: Easy to add new services
- **Testable**: Services can be tested independently
- **Reusable**: Services can be used across different UIs

### 3. Performance
- **Optimized**: TanStack Query optimizations built-in
- **Cached**: Automatic query caching and invalidation
- **Efficient**: Only necessary data is fetched

### 4. Architecture
- **Contract-Driven**: Clear contracts between layers
- **Technology Agnostic**: Works with any UI framework
- **Future-Proof**: Easy to swap implementations

## 🎉 Conclusion

The Cohesive Services Pattern transforms the development experience from managing 85+ individual hooks to using 26 intuitive, business-focused services. This approach provides better organization, consistency, and maintainability while delivering superior developer experience and performance.

**The result: A more productive, maintainable, and enjoyable development experience!** 🚀
