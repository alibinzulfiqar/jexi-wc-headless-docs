---
slug: /
sidebar_position: 1
title: Introduction
---

# Jexi WC Headless API

Welcome to the **Jexi WC Headless API** documentation. This comprehensive REST API enables you to build fully headless e-commerce applications powered by WooCommerce, without requiring customers to ever visit your WordPress admin or checkout pages.

:::info Developer
Developed by **[Ali Bin Zulfiqar](https://alibinzulfiqar.live)**
:::

## What is Jexi WC Headless?

Jexi WC Headless is a WordPress plugin that extends WooCommerce with a complete set of REST API endpoints designed specifically for headless frontend development. It provides:

- **Complete Cart Management** - Add, update, remove items and apply coupons via API
- **Headless Checkout** - Process orders without redirecting to WordPress
- **All Payment Gateways** - Access any payment method configured in WooCommerce
- **Product Variations** - Full support for variable products, attributes, and variations
- **WordPress Content** - Access posts, pages, menus, and media through the same API
- **Token-based Authentication** - Secure JWT-like authentication for customer accounts

## Quick Start

### Base URL

All API endpoints are available at:

```
https://your-site.com/wp-json/jexi-wch/v1/
```

### Basic Request

```bash
# Get all products
curl https://your-site.com/wp-json/jexi-wch/v1/products

# Get store information
curl https://your-site.com/wp-json/jexi-wch/v1/store
```

### Authentication

For protected endpoints, include the Bearer token:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://your-site.com/wp-json/jexi-wch/v1/auth/me
```

## API Categories

| Category | Description | Endpoints |
|----------|-------------|-----------|
| [Products](/api-reference/products) | Product catalog, variations, attributes | `/products`, `/categories`, `/attributes` |
| [Cart](/api-reference/cart) | Cart management for checkout | `/cart`, `/cart/add`, `/cart/coupon` |
| [Checkout](/api-reference/checkout) | Order processing | `/checkout`, `/checkout/validate` |
| [Orders](/api-reference/orders) | Order management | `/orders`, `/orders/{id}` |
| [Customers](/api-reference/customers) | Customer accounts | `/customers`, `/customers/{id}` |
| [Authentication](/api-reference/authentication) | User auth & registration | `/auth/login`, `/auth/register` |
| [Store](/api-reference/store) | Store settings & info | `/store`, `/store/currency` |
| [Content](/api-reference/content) | WordPress posts & pages | `/content/posts`, `/content/pages` |
| [Menus](/api-reference/menus) | Navigation menus | `/menus`, `/menus/locations` |

## Response Format

All responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data here
  }
}
```

### Error Response

```json
{
  "success": false,
  "code": "error_code",
  "message": "Human-readable error message"
}
```

## Features

### 🛒 Complete E-commerce Flow

Build a complete shopping experience without any WordPress redirects:

1. Browse products via `/products`
2. Add to cart via `/cart/add`
3. Apply coupons via `/cart/coupon`
4. Calculate shipping via `/shipping/calculate`
5. Process checkout via `/checkout`
6. Track orders via `/orders`

### 🔐 Secure Authentication

Token-based authentication system:

- User registration via `/auth/register`
- Login via `/auth/login`
- Password reset via `/auth/forgot-password`
- Token refresh via `/auth/refresh`

### 💳 All Payment Methods

Access any WooCommerce payment gateway:

- Cash on Delivery (COD)
- Bank Transfer (BACS)
- Check Payments
- PayPal, Stripe, and any other installed gateway

### 📦 All Product Types

Full support for:

- Simple products
- Variable products with variations
- Grouped products
- External/Affiliate products
- Downloadable products
- Virtual products

## Next Steps

- [Getting Started](/getting-started) - Set up your development environment
- [Authentication](/api-reference/authentication) - Implement user authentication
- [Products API](/api-reference/products) - Browse the product catalog
- [Cart & Checkout](/api-reference/cart) - Build the shopping cart
