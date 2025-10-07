# E-commerce Capability

Complete e-commerce capability with products, cart, orders, and inventory management.

## Overview

The E-commerce capability provides a comprehensive online store system with support for:
- Product management and catalog
- Shopping cart functionality
- Order processing and management
- Inventory tracking and stock management
- Product reviews and ratings
- Search and filtering capabilities
- Multi-backend and multi-frontend support

## Architecture

This feature follows the Two-Headed architecture pattern:

### Backend Implementations
- **`database-nextjs/`** - Database integration with Next.js
- **`database-express/`** - Database integration with Express (planned)
- **`database-fastify/`** - Database integration with Fastify (planned)

### Frontend Implementations
- **`shadcn/`** - Shadcn/ui components
- **`mui/`** - Material-UI components (planned)
- **`chakra/`** - Chakra UI components (planned)

## Contract

The feature contract is defined in `feature.json` and includes:

### Hooks
- **Product Hooks**: `useProducts`, `useProduct`, `useProductCategories`, `useProductSearch`, `useProductReviews`, `useCreateProduct`, `useUpdateProduct`, `useDeleteProduct`
- **Cart Hooks**: `useCart`, `useCartItems`, `useAddToCart`, `useUpdateCartItem`, `useRemoveFromCart`, `useClearCart`, `useCartCalculations`
- **Order Hooks**: `useOrders`, `useOrder`, `useCreateOrder`, `useUpdateOrderStatus`, `useOrderHistory`
- **Inventory Hooks**: `useInventory`, `useUpdateInventory`, `useCheckStock`

### API Endpoints
- `GET /api/products` - List products
- `POST /api/products` - Create product
- `PATCH /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/categories` - List categories
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `PATCH /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart
- `GET /api/orders` - List orders
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id` - Update order status
- `GET /api/inventory` - List inventory
- `PATCH /api/inventory/:id` - Update inventory
- `GET /api/reviews` - List reviews

### Types
- `Product` - Product information
- `Category` - Product category
- `Review` - Product review
- `Cart` - Shopping cart
- `CartItem` - Cart item
- `Order` - Order information
- `InventoryItem` - Inventory item
- `CreateProductData` - Product creation parameters
- `UpdateProductData` - Product update parameters
- `AddToCartData` - Add to cart parameters
- `UpdateCartItemData` - Cart item update parameters
- `CreateOrderData` - Order creation parameters
- `UpdateOrderStatusData` - Order status update parameters
- `UpdateInventoryData` - Inventory update parameters
- `StockStatus` - Stock availability status
- `CartCalculations` - Cart totals and calculations

## Implementation Requirements

### Backend Implementation
1. **Must implement all API endpoints** defined in the contract
2. **Must integrate with database** for data persistence
3. **Must handle inventory tracking** and stock management
4. **Must provide order processing** functionality
5. **Must support product search** and filtering

### Frontend Implementation
1. **Must provide product catalog** and detail pages
2. **Must integrate with backend hooks** using TanStack Query
3. **Must handle shopping cart** functionality
4. **Must provide order management** UI
5. **Must support the selected UI library** (Shadcn, MUI, etc.)

## Usage Example

```typescript
// Using the e-commerce hooks
import { useProducts, useCart, useAddToCart } from '@/lib/ecommerce/hooks';

function ProductCatalog() {
  const { data: products } = useProducts();
  const { data: cart } = useCart();
  const addToCart = useAddToCart();

  const handleAddToCart = async (productId: string, quantity: number) => {
    await addToCart.mutateAsync({ productId, quantity });
  };

  return (
    <div>
      {products?.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <button onClick={() => handleAddToCart(product.id, 1)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
```

## Configuration

The feature can be configured through the `parameters` section in `feature.json`:

- **`backend`**: Choose database implementation
- **`frontend`**: Choose UI library implementation
- **`features`**: Enable/disable specific e-commerce features

## Dependencies

### Required Adapters
- `database` - Database service adapter
- `storage` - File storage adapter

### Required Integrators
- `database-nextjs-integration` - Database + Next.js integration

### Required Capabilities
- `data-persistence` - Data storage capability
- `file-storage` - File storage capability

## Development

To add a new backend implementation:

1. Create a new directory under `backend/`
2. Implement the required API endpoints
3. Create the service layer with database integration
4. Handle inventory and order management
5. Update the feature.json to include the new implementation

To add a new frontend implementation:

1. Create a new directory under `frontend/`
2. Implement e-commerce UI components using the selected library
3. Integrate with the backend hooks
4. Handle cart and order management
5. Update the feature.json to include the new implementation
