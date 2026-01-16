---
sidebar_position: 2
title: Getting Started
---

# Getting Started

This guide will help you set up your development environment and make your first API calls to the Jexi WC Headless API.

:::tip About
Jexi WC Headless is developed by **[Ali Bin Zulfiqar](https://alibinzulfiqar.live)**. For support and inquiries, visit the developer's website.
:::

## Prerequisites

Before you begin, ensure you have:

- WordPress 5.8 or higher
- WooCommerce 6.0 or higher
- PHP 7.4 or higher
- Jexi WC Headless plugin installed and activated

## Installation

1. Download the Jexi WC Headless plugin
2. Upload to `/wp-content/plugins/jexi-wc-headless/`
3. Activate through WordPress admin
4. Navigate to **WooCommerce → Jexi Headless** to configure

## Configuration

### Enable CORS

If your frontend is on a different domain, enable CORS in the plugin settings:

```php
// In your theme's functions.php or custom plugin
add_filter('jexi_wch_cors_origins', function($origins) {
    $origins[] = 'https://your-frontend.com';
    return $origins;
});
```

Or enable for all origins in the plugin settings (development only).

### API Base URL

Your API base URL follows this format:

```
https://your-wordpress-site.com/wp-json/jexi-wch/v1/
```

## Making Your First Request

### Fetch Products

```javascript
// JavaScript/Fetch
const response = await fetch('https://your-site.com/wp-json/jexi-wch/v1/products');
const data = await response.json();

console.log(data);
// {
//   success: true,
//   data: [
//     { id: 1, name: 'Product 1', price: '19.99', ... },
//     { id: 2, name: 'Product 2', price: '29.99', ... },
//   ]
// }
```

```bash
# cURL
curl -X GET https://your-site.com/wp-json/jexi-wch/v1/products
```

### Get Store Information

```javascript
const response = await fetch('https://your-site.com/wp-json/jexi-wch/v1/store');
const { data } = await response.json();

console.log(data.name);        // "My Store"
console.log(data.currency);    // { code: "USD", symbol: "$", ... }
```

## Authentication Flow

For protected endpoints (like placing orders or managing customer accounts), you need to authenticate:

### 1. Register a New User

```javascript
const response = await fetch('https://your-site.com/wp-json/jexi-wch/v1/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'customer@example.com',
    password: 'securepassword',
    first_name: 'John',
    last_name: 'Doe',
  }),
});

const { data } = await response.json();
// Save the token
localStorage.setItem('auth_token', data.token);
```

### 2. Login Existing User

```javascript
const response = await fetch('https://your-site.com/wp-json/jexi-wch/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'customer@example.com',
    password: 'securepassword',
  }),
});

const { data } = await response.json();
localStorage.setItem('auth_token', data.token);
```

### 3. Make Authenticated Requests

```javascript
const token = localStorage.getItem('auth_token');

const response = await fetch('https://your-site.com/wp-json/jexi-wch/v1/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

const { data } = await response.json();
console.log(data.email); // "customer@example.com"
```

## Complete Shopping Flow Example

Here's a complete example of the shopping flow:

```javascript
const API_BASE = 'https://your-site.com/wp-json/jexi-wch/v1';

// 1. Browse products
const products = await fetch(`${API_BASE}/products`).then(r => r.json());

// 2. Add item to cart
await fetch(`${API_BASE}/cart/add`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    product_id: 123,
    quantity: 2,
  }),
});

// 3. Get cart contents
const cart = await fetch(`${API_BASE}/cart`).then(r => r.json());

// 4. Apply coupon
await fetch(`${API_BASE}/cart/coupon`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ code: 'SAVE10' }),
});

// 5. Get available payment gateways
const gateways = await fetch(`${API_BASE}/payment-gateways/available`)
  .then(r => r.json());

// 6. Calculate shipping
await fetch(`${API_BASE}/shipping/calculate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    country: 'US',
    state: 'CA',
    postcode: '90210',
  }),
});

// 7. Process checkout
const order = await fetch(`${API_BASE}/checkout`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    payment_method: 'cod',
    billing: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone: '555-1234',
      address_1: '123 Main St',
      city: 'Los Angeles',
      state: 'CA',
      postcode: '90210',
      country: 'US',
    },
    shipping: {
      first_name: 'John',
      last_name: 'Doe',
      address_1: '123 Main St',
      city: 'Los Angeles',
      state: 'CA',
      postcode: '90210',
      country: 'US',
    },
  }),
});

console.log('Order placed!', order.data.order_id);
```

## Error Handling

Always handle errors gracefully:

```javascript
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'API Error');
    }

    return data.data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}

// Usage
try {
  const products = await apiCall('/products');
} catch (error) {
  // Handle error (show toast, etc.)
}
```

## Next Steps

Now that you have the basics, explore the API reference:

- [Products API](/api-reference/products) - Product catalog endpoints
- [Cart API](/api-reference/cart) - Shopping cart management
- [Checkout API](/api-reference/checkout) - Order processing
- [Authentication API](/api-reference/authentication) - User authentication
