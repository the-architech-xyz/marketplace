# Stripe Organization Billing HTTP API Contract

This document defines the HTTP API contract between the PaymentService (TanStack Query layer) and the Stripe-NextJS-Drizzle connector (API layer).

## Base URL

```
{{env.APP_URL}}/api
```

## Authentication

All endpoints require authentication via session cookie. The connector automatically extracts the user ID from the session and validates permissions.

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "type": "validation_error | permission_error | business_error | system_error",
    "organizationId": "org_123",
    "userId": "user_456"
  }
}
```

## Organization Subscriptions

### Get Organization Subscription

**GET** `/organizations/{orgId}/subscriptions`

**Headers:**
- `Cookie: session=...` (required)

**Response:**
```json
{
  "id": "sub_123",
  "organizationId": "org_123",
  "stripeSubscriptionId": "sub_stripe_123",
  "stripeCustomerId": "cus_stripe_123",
  "status": "active",
  "planId": "pro",
  "planName": "Pro Plan",
  "planAmount": 7900,
  "planInterval": "month",
  "seatsIncluded": 25,
  "seatsAdditional": 5,
  "seatsTotal": 30,
  "currentPeriodStart": "2025-01-01T00:00:00Z",
  "currentPeriodEnd": "2025-02-01T00:00:00Z",
  "trialStart": null,
  "trialEnd": null,
  "cancelAtPeriodEnd": false,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Permission denied
- `404` - Subscription not found

### Create Organization Subscription

**POST** `/organizations/{orgId}/subscriptions`

**Headers:**
- `Cookie: session=...` (required)
- `Content-Type: application/json`

**Request:**
```json
{
  "planId": "pro",
  "paymentMethodId": "pm_123",
  "seats": 30,
  "trialDays": 14,
  "metadata": {
    "source": "web"
  }
}
```

**Response:** Same as Get Organization Subscription

**Status Codes:**
- `201` - Created
- `400` - Bad request
- `401` - Unauthorized
- `403` - Permission denied

### Update Organization Subscription

**PUT** `/organizations/{orgId}/subscriptions`

**Headers:**
- `Cookie: session=...` (required)
- `Content-Type: application/json`

**Request:**
```json
{
  "planId": "enterprise",
  "cancelAtPeriodEnd": false,
  "metadata": {
    "updatedBy": "admin"
  }
}
```

**Response:** Same as Get Organization Subscription

### Cancel Organization Subscription

**DELETE** `/organizations/{orgId}/subscriptions?cancelAtPeriodEnd=true`

**Headers:**
- `Cookie: session=...` (required)

**Query Parameters:**
- `cancelAtPeriodEnd` (boolean) - Whether to cancel at period end (default: true)

**Response:** Same as Get Organization Subscription

## Organization Seats

### Get Organization Seats

**GET** `/organizations/{orgId}/seats`

**Headers:**
- `Cookie: session=...` (required)

**Response:**
```json
{
  "current": 25,
  "included": 25,
  "additional": 0,
  "total": 25,
  "cost": 0,
  "pricePerSeat": 500
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Permission denied
- `404` - Seats not found

### Update Organization Seats

**PUT** `/organizations/{orgId}/seats`

**Headers:**
- `Cookie: session=...` (required)
- `Content-Type: application/json`

**Request:**
```json
{
  "seats": 30,
  "reason": "team_growth"
}
```

**Response:** Same as Get Organization Seats

**Status Codes:**
- `200` - Success
- `400` - Bad request
- `401` - Unauthorized
- `403` - Permission denied
- `422` - Business rule violation

### Get Organization Seat History

**GET** `/organizations/{orgId}/seats/history?limit=50&offset=0`

**Headers:**
- `Cookie: session=...` (required)

**Query Parameters:**
- `limit` (number) - Number of records to return (default: 50)
- `offset` (number) - Number of records to skip (default: 0)

**Response:**
```json
[
  {
    "id": "history_123",
    "organizationId": "org_123",
    "subscriptionId": "sub_123",
    "previousSeats": 25,
    "newSeats": 30,
    "changedBy": "user_456",
    "reason": "manual_increase",
    "createdAt": "2025-01-01T00:00:00Z"
  }
]
```

## Organization Billing Info

### Get Organization Billing Info

**GET** `/organizations/{orgId}/billing`

**Headers:**
- `Cookie: session=...` (required)

**Response:**
```json
{
  "organizationId": "org_123",
  "stripeCustomerId": "cus_stripe_123",
  "paymentMethod": {
    "type": "card",
    "last4": "4242",
    "brand": "visa",
    "expiryMonth": 12,
    "expiryYear": 2025
  },
  "email": "billing@company.com",
  "name": "Company Inc",
  "address": {
    "line1": "123 Main St",
    "line2": "Suite 100",
    "city": "San Francisco",
    "state": "CA",
    "postalCode": "94105",
    "country": "US"
  },
  "taxId": "12-3456789"
}
```

### Update Organization Billing Info

**PUT** `/organizations/{orgId}/billing`

**Headers:**
- `Cookie: session=...` (required)
- `Content-Type: application/json`

**Request:**
```json
{
  "email": "new-billing@company.com",
  "name": "New Company Inc",
  "address": {
    "line1": "456 New St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "US"
  },
  "taxId": "98-7654321"
}
```

**Response:** Same as Get Organization Billing Info

## Organization Invoices

### Get Organization Invoices

**GET** `/organizations/{orgId}/invoices?limit=50&offset=0&status=paid`

**Headers:**
- `Cookie: session=...` (required)

**Query Parameters:**
- `limit` (number) - Number of records to return (default: 50)
- `offset` (number) - Number of records to skip (default: 0)
- `status` (string) - Filter by invoice status
- `startDate` (string) - Filter by start date (ISO 8601)
- `endDate` (string) - Filter by end date (ISO 8601)

**Response:**
```json
[
  {
    "id": "inv_123",
    "organizationId": "org_123",
    "stripeInvoiceId": "in_stripe_123",
    "stripeSubscriptionId": "sub_stripe_123",
    "status": "paid",
    "amount": 7900,
    "amountPaid": 7900,
    "amountDue": 0,
    "subtotal": 7500,
    "tax": 400,
    "discount": 0,
    "currency": "usd",
    "description": "Pro Plan - January 2025",
    "dueDate": "2025-01-31T00:00:00Z",
    "paidAt": "2025-01-01T00:00:00Z",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z",
    "lineItems": [
      {
        "id": "item_123",
        "description": "Pro Plan",
        "quantity": 1,
        "unitAmount": 7500,
        "totalAmount": 7500,
        "taxRate": 0.0533
      }
    ]
  }
]
```

### Download Invoice

**GET** `/organizations/{orgId}/invoices/{invoiceId}/download`

**Headers:**
- `Cookie: session=...` (required)

**Response:** Binary PDF file

## Organization Usage

### Get Organization Usage

**GET** `/organizations/{orgId}/usage`

**Headers:**
- `Cookie: session=...` (required)

**Response:**
```json
{
  "organizationId": "org_123",
  "period": {
    "start": "2025-01-01T00:00:00Z",
    "end": "2025-01-31T23:59:59Z"
  },
  "metrics": {
    "apiCalls": 10000,
    "storage": 50,
    "computeTime": 100
  },
  "costs": {
    "base": 7900,
    "seats": 0,
    "usage": 0,
    "total": 7900
  },
  "lastUpdated": "2025-01-15T12:00:00Z"
}
```

### Track Organization Usage

**POST** `/organizations/{orgId}/usage`

**Headers:**
- `Cookie: session=...` (required)
- `Content-Type: application/json`

**Request:**
```json
{
  "metric": "api_calls",
  "quantity": 100,
  "metadata": {
    "endpoint": "/api/users",
    "method": "GET"
  }
}
```

**Response:**
```json
{
  "success": true,
  "usageId": "usage_123"
}
```

## Team Usage

### Get Team Usage

**GET** `/organizations/{orgId}/teams/{teamId}/usage`

**Headers:**
- `Cookie: session=...` (required)

**Response:** Same as Get Organization Usage, but with `teamId` included

### Track Team Usage

**POST** `/organizations/{orgId}/teams/{teamId}/usage`

**Headers:**
- `Cookie: session=...` (required)
- `Content-Type: application/json`

**Request:** Same as Track Organization Usage

**Response:** Same as Track Organization Usage

## Webhooks

### Stripe Webhook

**POST** `/webhooks/stripe`

**Headers:**
- `stripe-signature` (required) - Stripe webhook signature

**Response:**
```json
{
  "received": true
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad request (missing or invalid signature)
- `500` - Internal server error

## Rate Limiting

All endpoints are rate limited to 100 requests per 15-minute window per organization.

## Permission Matrix

| Operation | Owner | Admin | Member |
|-----------|-------|-------|--------|
| View Subscription | ✅ | ✅ | ❌ |
| Create Subscription | ✅ | ✅ | ❌ |
| Update Subscription | ✅ | ✅ | ❌ |
| Cancel Subscription | ✅ | ❌ | ❌ |
| View Billing Info | ✅ | ✅ | ❌ |
| Update Billing Info | ✅ | ❌ | ❌ |
| View Invoices | ✅ | ✅ | ❌ |
| Download Invoices | ✅ | ✅ | ❌ |
| Manage Seats | ✅ | ✅ | ❌ |
| View Usage | ✅ | ✅ | ✅ |
| Track Usage | ✅ | ✅ | ✅ |

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Unprocessable Entity
- `500` - Internal Server Error
