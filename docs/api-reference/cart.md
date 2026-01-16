---
sidebar_position: 2
title: Cart
---

# Cart API

The Cart API provides endpoints to manage the shopping cart for headless checkout.

## Important Notes

- Cart uses session-based storage
- Include cookies in requests to maintain cart state
- Cart persists for guest users via session cookie

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cart` | Get cart contents |
| POST | `/cart/add` | Add item to cart |
| POST | `/cart/update` | Update item quantity |
| POST | `/cart/remove` | Remove item from cart |
| POST | `/cart/clear` | Clear entire cart |
| POST | `/cart/coupon` | Apply coupon code |
| DELETE | `/cart/coupon` | Remove coupon |
| POST | `/cart/shipping` | Calculate shipping |
| POST | `/cart/shipping/method` | Set shipping method |

---

## Get Cart

Retrieve current cart contents and totals.

```
GET /cart
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/cart" \
  -H "Cookie: wp_woocommerce_session_xxx=session_id"
```

### Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "key": "abc123def456",
        "product_id": 123,
        "variation_id": 124,
        "name": "Premium T-Shirt - Red / M",
        "quantity": 2,
        "price": 29.99,
        "line_total": 59.98,
        "line_subtotal": 79.98,
        "image": "https://your-site.com/wp-content/uploads/tshirt-red.jpg",
        "product_url": "https://your-site.com/product/premium-t-shirt/",
        "variation": {
          "Color": "Red",
          "Size": "M"
        }
      }
    ],
    "item_count": 2,
    "total_quantity": 2,
    "needs_shipping": true,
    "coupons": [
      {
        "code": "SAVE10",
        "discount": "5.99",
        "discount_type": "percent"
      }
    ],
    "totals": {
      "subtotal": "79.98",
      "discount": "5.99",
      "shipping": "5.00",
      "tax": "6.40",
      "total": "85.39"
    },
    "shipping": {
      "packages": [
        {
          "rates": [
            {
              "id": "flat_rate:1",
              "label": "Flat Rate",
              "cost": "5.00",
              "selected": true
            },
            {
              "id": "free_shipping:2",
              "label": "Free Shipping",
              "cost": "0.00",
              "selected": false
            }
          ]
        }
      ],
      "destination": {
        "country": "US",
        "state": "CA",
        "postcode": "90210"
      }
    },
    "fees": [],
    "currency": {
      "code": "USD",
      "symbol": "$",
      "position": "left"
    }
  }
}
```

---

## Add to Cart

Add a product to the cart.

```
POST /cart/add
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `product_id` | integer | Yes | Product ID |
| `quantity` | integer | No | Quantity (default: 1) |
| `variation_id` | integer | No | Variation ID for variable products |
| `variation` | object | No | Variation attributes |

### Request Examples

**Simple Product:**

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/cart/add" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 123,
    "quantity": 2
  }'
```

**Variable Product:**

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/cart/add" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 123,
    "variation_id": 124,
    "quantity": 1,
    "variation": {
      "attribute_pa_color": "red",
      "attribute_pa_size": "medium"
    }
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "cart_item_key": "abc123def456",
    "product_id": 123,
    "variation_id": 124,
    "quantity": 1,
    "cart_item_count": 3,
    "cart_total": "89.97",
    "message": "Product added to cart"
  }
}
```

### Error Response

```json
{
  "success": false,
  "code": "out_of_stock",
  "message": "Sorry, this product is out of stock."
}
```

---

## Update Cart Item

Update the quantity of an item in the cart.

```
POST /cart/update
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cart_item_key` | string | Yes | Cart item key |
| `quantity` | integer | Yes | New quantity (0 to remove) |

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/cart/update" \
  -H "Content-Type: application/json" \
  -d '{
    "cart_item_key": "abc123def456",
    "quantity": 3
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "cart_item_key": "abc123def456",
    "quantity": 3,
    "line_total": "89.97",
    "cart_total": "89.97",
    "message": "Cart updated"
  }
}
```

---

## Remove Cart Item

Remove an item from the cart.

```
POST /cart/remove
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cart_item_key` | string | Yes | Cart item key |

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/cart/remove" \
  -H "Content-Type: application/json" \
  -d '{
    "cart_item_key": "abc123def456"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "removed": true,
    "cart_item_count": 1,
    "cart_total": "29.99",
    "message": "Item removed from cart"
  }
}
```

---

## Clear Cart

Remove all items from the cart.

```
POST /cart/clear
```

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/cart/clear"
```

### Response

```json
{
  "success": true,
  "data": {
    "cleared": true,
    "message": "Cart cleared"
  }
}
```

---

## Apply Coupon

Apply a coupon code to the cart.

```
POST /cart/coupon
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | Yes | Coupon code |

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/cart/coupon" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SAVE10"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "coupon": {
      "code": "SAVE10",
      "discount": "5.99",
      "discount_type": "percent",
      "description": "10% off your order"
    },
    "cart_total": "53.99",
    "message": "Coupon applied successfully"
  }
}
```

### Error Response

```json
{
  "success": false,
  "code": "invalid_coupon",
  "message": "This coupon has expired."
}
```

---

## Remove Coupon

Remove a coupon from the cart.

```
DELETE /cart/coupon
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | Yes | Coupon code to remove |

### Request Example

```bash
curl -X DELETE "https://your-site.com/wp-json/jexi-wch/v1/cart/coupon" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SAVE10"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "removed": true,
    "cart_total": "59.98",
    "message": "Coupon removed"
  }
}
```

---

## Calculate Shipping

Calculate shipping rates for given destination.

```
POST /cart/shipping
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `country` | string | Yes | Country code (e.g., "US") |
| `state` | string | No | State code (e.g., "CA") |
| `postcode` | string | No | Postal code |
| `city` | string | No | City name |

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/cart/shipping" \
  -H "Content-Type: application/json" \
  -d '{
    "country": "US",
    "state": "CA",
    "postcode": "90210",
    "city": "Beverly Hills"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "destination": {
      "country": "US",
      "state": "CA",
      "postcode": "90210",
      "city": "Beverly Hills"
    },
    "packages": [
      {
        "package_id": 0,
        "rates": [
          {
            "id": "flat_rate:1",
            "method_id": "flat_rate",
            "instance_id": 1,
            "label": "Flat Rate",
            "cost": "10.00",
            "taxes": "0.80",
            "html": "$10.00"
          },
          {
            "id": "free_shipping:2",
            "method_id": "free_shipping",
            "instance_id": 2,
            "label": "Free Shipping",
            "cost": "0.00",
            "taxes": "0.00",
            "html": "Free!"
          }
        ]
      }
    ],
    "cart_total": "69.98"
  }
}
```

---

## Set Shipping Method

Select a shipping method for checkout.

```
POST /cart/shipping/method
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `method_id` | string | Yes | Shipping method ID |

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/cart/shipping/method" \
  -H "Content-Type: application/json" \
  -d '{
    "method_id": "flat_rate:1"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "selected_method": "flat_rate:1",
    "shipping_cost": "10.00",
    "cart_total": "69.98",
    "message": "Shipping method updated"
  }
}
```

---

## JavaScript Example

```javascript
class CartAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getCart() {
    const response = await fetch(`${this.baseUrl}/cart`, {
      credentials: 'include', // Important for session cookies
    });
    return response.json();
  }

  async addToCart(productId, quantity = 1, variationId = null, variation = null) {
    const body = {
      product_id: productId,
      quantity,
    };

    if (variationId) {
      body.variation_id = variationId;
    }
    if (variation) {
      body.variation = variation;
    }

    const response = await fetch(`${this.baseUrl}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    return response.json();
  }

  async updateQuantity(cartItemKey, quantity) {
    const response = await fetch(`${this.baseUrl}/cart/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ cart_item_key: cartItemKey, quantity }),
    });
    return response.json();
  }

  async removeItem(cartItemKey) {
    const response = await fetch(`${this.baseUrl}/cart/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ cart_item_key: cartItemKey }),
    });
    return response.json();
  }

  async applyCoupon(code) {
    const response = await fetch(`${this.baseUrl}/cart/coupon`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ code }),
    });
    return response.json();
  }

  async removeCoupon(code) {
    const response = await fetch(`${this.baseUrl}/cart/coupon`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ code }),
    });
    return response.json();
  }

  async calculateShipping(address) {
    const response = await fetch(`${this.baseUrl}/cart/shipping`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(address),
    });
    return response.json();
  }

  async setShippingMethod(methodId) {
    const response = await fetch(`${this.baseUrl}/cart/shipping/method`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ method_id: methodId }),
    });
    return response.json();
  }

  async clearCart() {
    const response = await fetch(`${this.baseUrl}/cart/clear`, {
      method: 'POST',
      credentials: 'include',
    });
    return response.json();
  }
}

// Usage
const cart = new CartAPI('https://your-site.com/wp-json/jexi-wch/v1');

// Add simple product
await cart.addToCart(123, 2);

// Add variable product
await cart.addToCart(456, 1, 457, {
  attribute_pa_color: 'blue',
  attribute_pa_size: 'large'
});

// Apply coupon
await cart.applyCoupon('SAVE10');

// Calculate shipping
await cart.calculateShipping({
  country: 'US',
  state: 'CA',
  postcode: '90210'
});

// Get cart state
const cartData = await cart.getCart();
console.log(cartData.data.totals.total);
```

## Related Endpoints

- [Checkout API](/api-reference/checkout) - Process order
- [Shipping API](/api-reference/shipping) - Shipping configuration
- [Coupons API](/api-reference/coupons) - Coupon management
