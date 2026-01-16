---
sidebar_position: 15
title: Coupons
---

# Coupons API

The Coupons API provides access to WooCommerce coupon functionality, enabling customers to validate and apply discount codes to their cart.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/coupons/validate` | Validate a coupon code |
| GET | `/coupons/{code}` | Get coupon details |
| GET | `/coupons/cart` | Get coupons in cart |

---

## Validate Coupon

Check if a coupon code is valid for the current cart.

```
POST /coupons/validate
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | Yes | Coupon code |
| `cart_key` | string | No | Cart session key |

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/coupons/validate" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SAVE20",
    "cart_key": "abc123xyz"
  }'
```

### Response - Valid Coupon

```json
{
  "success": true,
  "data": {
    "valid": true,
    "code": "SAVE20",
    "discount_type": "percent",
    "amount": "20",
    "description": "Save 20% on your order",
    "free_shipping": false,
    "expiry_date": "2024-12-31",
    "minimum_amount": "1000.00",
    "maximum_amount": null,
    "individual_use": false,
    "exclude_sale_items": false,
    "usage_limit": 100,
    "usage_count": 45,
    "usage_remaining": 55,
    "estimated_discount": "1000.00",
    "message": "Coupon is valid! You'll save Rs1,000.00"
  }
}
```

### Response - Invalid Coupon

```json
{
  "success": false,
  "code": "coupon_invalid",
  "message": "This coupon does not exist.",
  "data": {
    "valid": false
  }
}
```

### Response - Minimum Not Met

```json
{
  "success": false,
  "code": "coupon_min_spend_not_met",
  "message": "The minimum spend for this coupon is Rs1,000.00. Your cart total is Rs750.00.",
  "data": {
    "valid": false,
    "minimum_amount": "1000.00",
    "cart_total": "750.00"
  }
}
```

### Response - Expired

```json
{
  "success": false,
  "code": "coupon_expired",
  "message": "This coupon has expired.",
  "data": {
    "valid": false,
    "expiry_date": "2024-01-01"
  }
}
```

---

## Get Coupon Details

Retrieve details about a coupon (without applying it).

```
GET /coupons/{code}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/coupons/SAVE20"
```

### Response

```json
{
  "success": true,
  "data": {
    "code": "SAVE20",
    "discount_type": "percent",
    "amount": "20",
    "description": "Save 20% on your order",
    "free_shipping": false,
    "expiry_date": "2024-12-31",
    "minimum_amount": "1000.00",
    "maximum_amount": null,
    "individual_use": false,
    "exclude_sale_items": false,
    "product_ids": [],
    "excluded_product_ids": [],
    "product_categories": [],
    "excluded_product_categories": [],
    "usage_limit": 100,
    "usage_count": 45,
    "limit_per_user": 1
  }
}
```

---

## Get Cart Coupons

Get all coupons currently applied to the cart.

```
GET /coupons/cart
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cart_key` | string | Yes | Cart session key |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/coupons/cart?cart_key=abc123xyz"
```

### Response

```json
{
  "success": true,
  "data": {
    "coupons": [
      {
        "code": "SAVE20",
        "discount_type": "percent",
        "amount": "20",
        "discount_amount": "1000.00",
        "free_shipping": false
      }
    ],
    "total_discount": "1000.00"
  }
}
```

---

## Coupon Types

| Type | Description |
|------|-------------|
| `percent` | Percentage discount off cart total |
| `fixed_cart` | Fixed amount off entire cart |
| `fixed_product` | Fixed amount off each qualifying product |

---

## JavaScript Example

```javascript
class CouponsAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async validateCoupon(code, cartKey = null) {
    const body = { code };
    if (cartKey) body.cart_key = cartKey;

    const response = await fetch(`${this.baseUrl}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return response.json();
  }

  async getCouponDetails(code) {
    const response = await fetch(`${this.baseUrl}/coupons/${code}`);
    return response.json();
  }

  async getCartCoupons(cartKey) {
    const response = await fetch(
      `${this.baseUrl}/coupons/cart?cart_key=${cartKey}`
    );
    return response.json();
  }
}

// Usage
const couponsApi = new CouponsAPI('https://your-site.com/wp-json/jexi-wch/v1');

// Validate coupon
const validation = await couponsApi.validateCoupon('SAVE20', cartKey);
if (validation.success && validation.data.valid) {
  console.log(`Valid! You'll save ${validation.data.estimated_discount}`);
} else {
  console.log('Invalid:', validation.message);
}
```

## React Coupon Component

```jsx
import { useState } from 'react';

function CouponInput({ cartKey, onApply }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!code.trim()) {
      setError('Please enter a coupon code');
      return;
    }

    setLoading(true);
    try {
      const result = await fetch('/wp-json/jexi-wch/v1/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim(), cart_key: cartKey }),
      }).then(r => r.json());

      if (result.success && result.data.valid) {
        setSuccess(result.data.message);
        onApply(code.trim());
        setCode('');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to validate coupon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="coupon-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter coupon code"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Applying...' : 'Apply'}
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </form>
  );
}
```

## Related Endpoints

- [Cart API](/api-reference/cart) - Apply coupons to cart
- [Checkout API](/api-reference/checkout) - Checkout with coupons
