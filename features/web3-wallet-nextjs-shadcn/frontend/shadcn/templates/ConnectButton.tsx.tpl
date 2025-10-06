'use client';

import { useConnectWallet } from '@/hooks/web3/use-connect-wallet';
import { useDisconnectWallet } from '@/hooks/web3/use-disconnect-wallet';
import { useWallet } from '@/hooks/web3/use-wallet';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';

export const ConnectButton = () => {
  const { data: wallet, isLoading } = useWallet();
  const { mutate: connectWallet, isPending: isConnecting } = useConnectWallet();
  const { mutate: disconnectWallet, isPending: isDisconnecting } = useDisconnectWallet();

  const handleConnect = () => {
    connectWallet({});
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  if (isLoading) {
    return (
      <Button disabled>
        <Wallet className="mr-2 h-4 w-4" />
        Loading...
      </Button>
    );
  }

  if (wallet?.isConnected) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDisconnect}
          disabled={isDisconnecting}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleConnect} disabled={isConnecting}>
      <Wallet className="mr-2 h-4 w-4" />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
};
