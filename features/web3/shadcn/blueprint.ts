/**
 * Web3 Frontend Implementation: Shadcn/ui
 * 
 * This implementation provides the UI components for the Web3 capability
 * using Shadcn/ui. It generates components that consume the hooks defined
 * in the contract.ts file.
 */

import { Blueprint, BlueprintActionType, ModifierType, EnhanceFileFallbackStrategy } from '@thearchitech.xyz/marketplace/types';

export const web3ShadcnBlueprint: Blueprint = {
  id: 'web3-frontend-shadcn',
  name: 'Web3 Frontend (Shadcn/ui)',
  description: 'Frontend implementation for Web3 capability using Shadcn/ui',
  actions: [
    // Install additional dependencies for Web3 UI
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'react-hook-form@^7.48.2',
        '@hookform/resolvers@^3.3.2',
        'zod@^3.22.4',
        'date-fns@^2.30.0',
        'lucide-react@^0.294.0',
        '@tanstack/react-query@^5.0.0',
        'wagmi@^1.4.0',
        '@rainbow-me/rainbowkit@^1.3.0'
      ]
    },

    // Create wallet connection component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}web3/WalletConnection.tsx',
      content: `'use client';

import { useState ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from 'react';
import { useWallet, useConnectWallet, useDisconnectWallet, useBalance } from '@/lib/web3/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Wallet, 
  Copy, 
  ExternalLink, 
  LogOut, 
  Wallet as WalletIcon,
  ChevronDown
} from 'lucide-react';
import { formatEther } from 'ethers';

export function WalletConnection() {
  const { data: wallet, isLoading: walletLoading } = useWallet();
  const { data: balance } = useBalance(wallet?.address);
  const connectWallet = useConnectWallet();
  const disconnectWallet = useDisconnectWallet();

  const handleConnect = async (provider: 'metamask' | 'walletconnect' | 'coinbase' | 'rainbow') => {
    try {
      await connectWallet.mutateAsync({ provider });
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet.mutateAsync();
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const copyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
    }
  };

  const formatAddress = (address: string) => {
    return \`\${address.slice(0, 6)}...\${address.slice(-4)}\`;
  };

  if (walletLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!wallet?.isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WalletIcon className="w-5 h-5" />
            Connect Wallet
          </CardTitle>
          <CardDescription>
            Connect your wallet to interact with Web3 features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => handleConnect('metamask')}
              disabled={connectWallet.isPending}
              className="w-full"
            >
              <Wallet className="w-4 h-4 mr-2" />
              MetaMask
            </Button>
            <Button
              onClick={() => handleConnect('walletconnect')}
              disabled={connectWallet.isPending}
              variant="outline"
              className="w-full"
            >
              <Wallet className="w-4 h-4 mr-2" />
              WalletConnect
            </Button>
            <Button
              onClick={() => handleConnect('coinbase')}
              disabled={connectWallet.isPending}
              variant="outline"
              className="w-full"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Coinbase
            </Button>
            <Button
              onClick={() => handleConnect('rainbow')}
              disabled={connectWallet.isPending}
              variant="outline"
              className="w-full"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Rainbow
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <WalletIcon className="w-5 h-5" />
            Wallet Connected
          </CardTitle>
          <Badge variant="outline" className="text-green-600">
            Connected
          </Badge>
        </div>
        <CardDescription>
          {wallet.ensName || formatAddress(wallet.address)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={wallet.avatar} alt={wallet.ensName || 'Wallet'} />
            <AvatarFallback>
              {wallet.ensName?.charAt(0) || wallet.address.charAt(2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm">{formatAddress(wallet.address)}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyAddress}
                className="h-6 w-6 p-0"
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(\`https://etherscan.io/address/\${wallet.address}\`, '_blank')}
                className="h-6 w-6 p-0"
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 capitalize">{wallet.provider}</p>
          </div>
        </div>

        {balance && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Balance</span>
              <span className="font-semibold">
                {parseFloat(balance.formattedBalance).toFixed(4)} {balance.symbol}
              </span>
            </div>
          </div>
        )}

        <Button
          onClick={handleDisconnect}
          disabled={disconnectWallet.isPending}
          variant="outline"
          className="w-full"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </Button>
      </CardContent>
    </Card>
  );
}`
    },

    // Create transaction form component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}web3/TransactionForm.tsx',
      content: `'use client';

import { useState ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSendTransaction, useWallet } from '@/lib/web3/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Send, ArrowRight } from 'lucide-react';

const transactionSchema = z.object({
  to: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
  value: z.string().min(1, 'Value is required'),
  gasLimit: z.string().optional(),
  data: z.string().optional()
});

type TransactionFormData = z.infer<typeof transactionSchema>;

export function TransactionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: wallet } = useWallet();
  const sendTransaction = useSendTransaction();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema)
  });

  const onSubmit = async (data: TransactionFormData) => {
    if (!wallet?.address) {
      alert('Please connect your wallet first');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await sendTransaction.mutateAsync({
        to: data.to,
        value: data.value,
        gasLimit: data.gasLimit,
        data: data.data
      });
      
      console.log('Transaction sent:', result);
      // TODO: Show success message or redirect
    } catch (error) {
      console.error('Error sending transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!wallet?.isConnected) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-gray-600">Please connect your wallet to send transactions</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="w-5 h-5" />
          Send Transaction
        </CardTitle>
        <CardDescription>
          Send ETH or interact with smart contracts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {sendTransaction.error && (
            <Alert>
              <AlertDescription>{sendTransaction.error.message}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="to">Recipient Address</Label>
            <Input
              id="to"
              placeholder="0x742d35Cc6634C0532925a3b8D0C0C2C0C0C0C0C0"
              {...register('to')}
            />
            {errors.to && (
              <Alert>
                <AlertDescription>{errors.to.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Value (ETH)</Label>
            <Input
              id="value"
              type="number"
              step="0.0001"
              placeholder="0.001"
              {...register('value')}
            />
            {errors.value && (
              <Alert>
                <AlertDescription>{errors.value.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gasLimit">Gas Limit (Optional)</Label>
            <Input
              id="gasLimit"
              type="number"
              placeholder="21000"
              {...register('gasLimit')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="data">Data (Optional)</Label>
            <Input
              id="data"
              placeholder="0x..."
              {...register('data')}
            />
            <p className="text-xs text-gray-600">
              Hex-encoded data for contract interactions
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting || sendTransaction.isPending}>
            {(isSubmitting || sendTransaction.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            <ArrowRight className="w-4 h-4 mr-2" />
            Send Transaction
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}`
    },

    // Create Web3 dashboard page
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}web3/page.tsx',
      content: `import { WalletConnection ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from '@/components/web3/WalletConnection';
import { TransactionForm } from '@/components/web3/TransactionForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Web3Page() {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Web3 Dashboard</h1>
          <p className="text-gray-600">Manage your wallet and interact with blockchain</p>
        </div>

        <Tabs defaultValue="wallet" className="space-y-6">
          <TabsList>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
          </TabsList>

          <TabsContent value="wallet">
            <WalletConnection />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionForm />
          </TabsContent>

          <TabsContent value="contracts">
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">Contract Interactions</h3>
              <p className="text-gray-600">Smart contract interaction features coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}`
    }
  ]
};
