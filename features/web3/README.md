# Web3 Capability

Complete Web3 capability with wallet management, transactions, DeFi, and blockchain interactions.

## Overview

The Web3 capability provides a comprehensive blockchain interaction system with support for:
- Wallet connection and management
- Transaction sending and tracking
- Smart contract interactions
- Network switching and management
- Asset management and token operations
- DeFi operations (swaps, staking, liquidity)

## Architecture

This feature follows the Two-Headed architecture pattern:

### Backend Implementations
- **`web3-nextjs/`** - Web3 libraries integration with Next.js
- **`web3-express/`** - Web3 libraries integration with Express (planned)
- **`web3-fastify/`** - Web3 libraries integration with Fastify (planned)

### Frontend Implementations
- **`shadcn/`** - Shadcn/ui components
- **`mui/`** - Material-UI components (planned)
- **`chakra/`** - Chakra UI components (planned)

## Contract

The feature contract is defined in `feature.json` and includes:

### Hooks
- **Wallet Hooks**: `useWallet`, `useBalance`, `useIsConnected`, `useConnectWallet`, `useDisconnectWallet`
- **Transaction Hooks**: `useTransactions`, `useTransaction`, `useSendTransaction`
- **Contract Hooks**: `useContractRead`, `useContractWrite`
- **Network Hooks**: `useNetworks`, `useCurrentNetwork`, `useSwitchNetwork`, `useAddNetwork`
- **Asset Hooks**: `useAssets`, `useAsset`, `useAddToken`, `useRemoveToken`
- **DeFi Hooks**: `useSwapQuote`, `useLiquidityPools`, `useStakingInfo`, `useSwap`, `useAddLiquidity`, `useRemoveLiquidity`, `useStake`, `useUnstake`

### API Endpoints
- `POST /api/web3/connect` - Connect wallet
- `POST /api/web3/disconnect` - Disconnect wallet
- `GET /api/web3/balance` - Get wallet balance
- `GET /api/web3/transactions` - List transactions
- `POST /api/web3/transactions` - Send transaction
- `POST /api/web3/contract/read` - Read contract
- `POST /api/web3/contract/write` - Write contract
- `GET /api/web3/networks` - List networks
- `POST /api/web3/switch-network` - Switch network
- `GET /api/web3/assets` - List assets
- `POST /api/web3/assets` - Add token

### Types
- `WalletConnection` - Wallet connection data
- `WalletBalance` - Wallet balance information
- `Transaction` - Transaction data
- `TransactionResult` - Transaction result
- `Network` - Blockchain network information
- `Asset` - Token/asset information
- `ConnectWalletData` - Wallet connection parameters
- `SendTransactionData` - Transaction sending parameters
- `ContractReadData` - Contract read parameters
- `ContractWriteData` - Contract write parameters
- `SwitchNetworkData` - Network switching parameters
- `AddTokenData` - Token addition parameters

## Implementation Requirements

### Backend Implementation
1. **Must implement all API endpoints** defined in the contract
2. **Must integrate with Web3 libraries** (Web3.js, Ethers.js, etc.)
3. **Must support multiple blockchain networks** (Ethereum, Polygon, Arbitrum, etc.)
4. **Must handle transaction processing** and status tracking
5. **Must provide contract interaction** capabilities

### Frontend Implementation
1. **Must provide wallet connection UI** for multiple providers
2. **Must integrate with backend hooks** using TanStack Query
3. **Must handle transaction states** and error handling
4. **Must provide network switching** interface
5. **Must support the selected UI library** (Shadcn, MUI, etc.)

## Usage Example

```typescript
// Using the Web3 hooks
import { useWallet, useConnectWallet, useSendTransaction } from '@/lib/web3/hooks';

function WalletConnection() {
  const { data: wallet } = useWallet();
  const connectWallet = useConnectWallet();
  const sendTransaction = useSendTransaction();

  const handleConnect = async () => {
    await connectWallet.mutateAsync({ provider: 'metamask' });
  };

  const handleSend = async (transactionData) => {
    await sendTransaction.mutateAsync(transactionData);
  };

  return (
    <div>
      {wallet ? (
        <div>
          <p>Connected: {wallet.address}</p>
          <button onClick={handleSend}>Send Transaction</button>
        </div>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
}
```

## Configuration

The feature can be configured through the `parameters` section in `feature.json`:

- **`backend`**: Choose Web3 implementation
- **`frontend`**: Choose UI library implementation
- **`features`**: Enable/disable specific Web3 features
- **`networks`**: Configure supported blockchain networks

## Security Considerations

- **Never expose private keys** on the frontend
- **Use secure wallet providers** (MetaMask, WalletConnect, etc.)
- **Validate all transaction data** on the backend
- **Handle network switching** securely
- **Implement proper error handling** for failed transactions
- **Use HTTPS** for all Web3 endpoints

## Dependencies

### Required Adapters
- `web3` - Web3 service adapter

### Required Integrators
- `web3-nextjs-integration` - Web3 + Next.js integration

### Required Capabilities
- `blockchain-interaction` - Blockchain interaction capability

## Development

To add a new backend implementation:

1. Create a new directory under `backend/`
2. Implement the required API endpoints
3. Create the service layer with Web3 library integration
4. Handle transaction processing and network management
5. Update the feature.json to include the new implementation

To add a new frontend implementation:

1. Create a new directory under `frontend/`
2. Implement Web3 UI components using the selected library
3. Integrate with the backend hooks
4. Handle wallet connection and transaction states
5. Update the feature.json to include the new implementation
