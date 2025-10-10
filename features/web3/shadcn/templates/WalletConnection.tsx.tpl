'use client';

import { useState } from 'react';
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
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
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
                onClick={() => window.open(`https://etherscan.io/address/${wallet.address}`, '_blank')}
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
}
