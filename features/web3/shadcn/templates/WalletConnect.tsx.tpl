'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWeb3, useConnectWallet, useDisconnectWallet } from '@/lib/hooks/use-web3';

export function WalletConnect() {
  const [isConnecting, setIsConnecting] = useState(false);
  const { data: web3State } = useWeb3();
  const connectWallet = useConnectWallet();
  const disconnectWallet = useDisconnectWallet();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connectWallet.mutateAsync({
        walletType: 'metamask'
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet.mutateAsync();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Wallet Connection</CardTitle>
        <CardDescription>
          Connect your Web3 wallet to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        {web3State?.isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Connected</Badge>
              <span className="text-sm text-gray-600">
                {web3State.account?.slice(0, 6)}...{web3State.account?.slice(-4)}
              </span>
            </div>
            <Button onClick={handleDisconnect} variant="outline" className="w-full">
              Disconnect Wallet
            </Button>
          </div>
        ) : (
          <Button 
            onClick={handleConnect} 
            className="w-full" 
            disabled={isConnecting}
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
