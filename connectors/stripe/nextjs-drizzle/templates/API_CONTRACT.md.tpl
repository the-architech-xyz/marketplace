# Stripe Organization Billing API Contract

This document defines the HTTP API contract for the Stripe Organization Billing connector.

## Base URL

```
{{env.APP_URL}}/api
```

## Authentication

All endpoints require authentication via session cookie or Bearer token.

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "type": "validation_error | permission_error | business_error | system_error",
    "organizationId": "org_123",
    "userId": "user_456",
    "details": {}
  }
}
```

## Organization Subscriptions

### Get Organization Subscription

**GET** `/organizations/{orgId}/subscriptions`

Get the current subscription for an organization.

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

**Error Codes:**
- `UNAUTHORIZED` (401) - Authentication required
- `PERMISSION_DENIED` (403) - Insufficient permissions
- `SUBSCRIPTION_NOT_FOUND` (404) - No subscription found

### Create Organization Subscription

**POST** `/organizations/{orgId}/subscriptions`

Create a new subscription for an organization.

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

**Error Codes:**
- `UNAUTHORIZED` (401) - Authentication required
- `PERMISSION_DENIED` (403) - Insufficient permissions
- `VALIDATION_ERROR` (400) - Invalid request data

### Update Organization Subscription

**PUT** `/organizations/{orgId}/subscriptions`

Update an existing subscription.

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

Cancel an organization subscription.

**Query Parameters:**
- `cancelAtPeriodEnd` (boolean) - Whether to cancel at period end (default: true)

**Response:** Same as Get Organization Subscription

## Organization Seats

### Get Organization Seats

**GET** `/organizations/{orgId}/seats`

Get seat information for an organization.

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

**Error Codes:**
- `UNAUTHORIZED` (401) - Authentication required
- `PERMISSION_DENIED` (403) - Insufficient permissions
- `SEATS_NOT_FOUND` (404) - No seat information found

### Update Organization Seats

**PUT** `/organizations/{orgId}/seats`

Update the number of seats for an organization.

**Request:**
```json
{
  "seats": 30,
  "reason": "team_growth"
}
```

**Response:** Same as Get Organization Seats

**Error Codes:**
- `UNAUTHORIZED` (401) - Authentication required
- `PERMISSION_DENIED` (403) - Insufficient permissions
- `VALIDATION_ERROR` (400) - Invalid request data
- `BUSINESS_ERROR` (422) - Business rule violation

### Get Organization Seat History

**GET** `/organizations/{orgId}/seats/history?limit=50&offset=0`

Get the seat change history for an organization.

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

Get billing information for an organization.

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

Update billing information for an organization.

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

Get invoices for an organization.

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

## Organization Usage

### Get Organization Usage

**GET** `/organizations/{orgId}/usage`

Get usage information for an organization.

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

Track usage for an organization.

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

Get usage information for a specific team.

**Response:** Same as Get Organization Usage, but with `teamId` included.

### Track Team Usage

**POST** `/organizations/{orgId}/teams/{teamId}/usage`

Track usage for a specific team.

**Request:** Same as Track Organization Usage

**Response:** Same as Track Organization Usage

## Webhooks

### Stripe Webhook

**POST** `/webhooks/stripe`

Handle Stripe webhook events.

**Headers:**
- `stripe-signature` (required) - Stripe webhook signature

**Response:**
```json
{
  "received": true
}
```

**Error Codes:**
- `MISSING_SIGNATURE` (400) - Stripe signature is required
- `INVALID_SIGNATURE` (400) - Invalid webhook signature
- `WEBHOOK_PROCESSING_ERROR` (500) - Failed to process webhook

## Rate Limiting

All endpoints are rate limited to 100 requests per 15-minute window per organization.

## Webhook Events

The following Stripe webhook events are supported:

- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.paid`
- `invoice.payment_failed`
- `customer.updated`

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Unprocessable Entity
- `500` - Internal Server Error
