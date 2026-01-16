---
sidebar_position: 8
title: Shipping
---

# Shipping API

The Shipping API provides access to shipping zones, methods, rates, and calculations for WooCommerce orders.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/shipping/zones` | List shipping zones |
| GET | `/shipping/zones/{id}` | Get zone details |
| GET | `/shipping/zones/{id}/methods` | Get zone methods |
| GET | `/shipping/methods` | List all shipping methods |
| POST | `/shipping/calculate` | Calculate shipping rates |
| GET | `/shipping/classes` | Get shipping classes |

---

## List Shipping Zones

Retrieve all shipping zones configured in WooCommerce.

```
GET /shipping/zones
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/shipping/zones"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 0,
      "name": "Locations not covered by your other zones",
      "order": 0
    },
    {
      "id": 1,
      "name": "Pakistan",
      "order": 1,
      "locations": [
        {
          "code": "PK",
          "type": "country"
        }
      ]
    },
    {
      "id": 2,
      "name": "Punjab",
      "order": 2,
      "locations": [
        {
          "code": "PK:PB",
          "type": "state"
        }
      ]
    },
    {
      "id": 3,
      "name": "Lahore Metro",
      "order": 3,
      "locations": [
        {
          "code": "54000...54900",
          "type": "postcode"
        }
      ]
    }
  ]
}
```

---

## Get Zone Details

Retrieve details for a specific shipping zone.

```
GET /shipping/zones/{id}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/shipping/zones/1"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Pakistan",
    "order": 1,
    "locations": [
      {
        "code": "PK",
        "type": "country"
      }
    ]
  }
}
```

---

## Get Zone Shipping Methods

Retrieve shipping methods for a specific zone.

```
GET /shipping/zones/{id}/methods
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/shipping/zones/1/methods"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "instance_id": 1,
      "title": "Standard Delivery",
      "method_id": "flat_rate",
      "method_title": "Flat Rate",
      "method_description": "Lets you charge a fixed rate for shipping.",
      "enabled": true,
      "order": 1,
      "settings": {
        "title": "Standard Delivery",
        "tax_status": "taxable",
        "cost": "500"
      }
    },
    {
      "id": 2,
      "instance_id": 2,
      "title": "Express Delivery",
      "method_id": "flat_rate",
      "method_title": "Flat Rate",
      "method_description": "Lets you charge a fixed rate for shipping.",
      "enabled": true,
      "order": 2,
      "settings": {
        "title": "Express Delivery",
        "tax_status": "taxable",
        "cost": "1000"
      }
    },
    {
      "id": 3,
      "instance_id": 3,
      "title": "Free Shipping",
      "method_id": "free_shipping",
      "method_title": "Free Shipping",
      "method_description": "Free shipping is a special method which can be triggered with coupons and minimum spend.",
      "enabled": true,
      "order": 3,
      "settings": {
        "title": "Free Shipping",
        "requires": "min_amount",
        "min_amount": "5000"
      }
    },
    {
      "id": 4,
      "instance_id": 4,
      "title": "Local Pickup",
      "method_id": "local_pickup",
      "method_title": "Local Pickup",
      "method_description": "Allow customers to pick up orders themselves.",
      "enabled": true,
      "order": 4,
      "settings": {
        "title": "Local Pickup",
        "tax_status": "taxable",
        "cost": "0"
      }
    }
  ]
}
```

---

## List All Shipping Methods

Retrieve all available shipping method types.

```
GET /shipping/methods
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/shipping/methods"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "flat_rate",
      "title": "Flat Rate",
      "description": "Lets you charge a fixed rate for shipping.",
      "supports": [
        "shipping-zones",
        "instance-settings"
      ]
    },
    {
      "id": "free_shipping",
      "title": "Free Shipping",
      "description": "Free shipping is a special method which can be triggered with coupons and minimum spend.",
      "supports": [
        "shipping-zones",
        "instance-settings"
      ]
    },
    {
      "id": "local_pickup",
      "title": "Local Pickup",
      "description": "Allow customers to pick up orders themselves.",
      "supports": [
        "shipping-zones",
        "instance-settings"
      ]
    },
    {
      "id": "table_rate",
      "title": "Table Rate",
      "description": "Calculate shipping based on weight, cart total, or item count.",
      "supports": [
        "shipping-zones",
        "instance-settings"
      ]
    }
  ]
}
```

---

## Calculate Shipping Rates

Calculate available shipping rates for a given address and cart.

```
POST /shipping/calculate
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `country` | string | Yes | Country code (ISO 3166-1) |
| `state` | string | No | State/Province code |
| `city` | string | No | City name |
| `postcode` | string | No | ZIP/Postal code |
| `cart_key` | string | No | Cart session key |
| `products` | array | No | Products to calculate (if no cart) |

### Request Example - With Cart Session

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/shipping/calculate" \
  -H "Content-Type: application/json" \
  -d '{
    "country": "PK",
    "state": "PB",
    "city": "Lahore",
    "postcode": "54000",
    "cart_key": "abc123xyz"
  }'
```

### Request Example - With Products Array

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/shipping/calculate" \
  -H "Content-Type: application/json" \
  -d '{
    "country": "PK",
    "state": "PB",
    "postcode": "54000",
    "products": [
      { "product_id": 47, "quantity": 2 },
      { "product_id": 48, "variation_id": 52, "quantity": 1 }
    ]
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "zone": {
      "id": 2,
      "name": "Punjab"
    },
    "packages": [
      {
        "package_id": 0,
        "contents_cost": "5000.00",
        "rates": [
          {
            "id": "flat_rate:1",
            "instance_id": 1,
            "label": "Standard Delivery",
            "cost": "500.00",
            "tax": "0.00",
            "method_id": "flat_rate",
            "meta_data": {
              "delivery_time": "3-5 business days"
            }
          },
          {
            "id": "flat_rate:2",
            "instance_id": 2,
            "label": "Express Delivery",
            "cost": "1000.00",
            "tax": "0.00",
            "method_id": "flat_rate",
            "meta_data": {
              "delivery_time": "1-2 business days"
            }
          },
          {
            "id": "free_shipping:3",
            "instance_id": 3,
            "label": "Free Shipping",
            "cost": "0.00",
            "tax": "0.00",
            "method_id": "free_shipping",
            "meta_data": {
              "min_order": "5000.00"
            }
          },
          {
            "id": "local_pickup:4",
            "instance_id": 4,
            "label": "Local Pickup",
            "cost": "0.00",
            "tax": "0.00",
            "method_id": "local_pickup",
            "meta_data": {
              "pickup_address": "123 Main St, Lahore"
            }
          }
        ]
      }
    ],
    "destination": {
      "country": "PK",
      "state": "PB",
      "city": "Lahore",
      "postcode": "54000"
    }
  }
}
```

---

## Get Shipping Classes

Retrieve product shipping classes for rate differentiation.

```
GET /shipping/classes
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/shipping/classes"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 5,
      "name": "Heavy Items",
      "slug": "heavy-items",
      "description": "Items over 10kg that require special handling",
      "count": 15
    },
    {
      "id": 6,
      "name": "Fragile Items",
      "slug": "fragile-items",
      "description": "Items requiring careful packaging",
      "count": 8
    },
    {
      "id": 7,
      "name": "Bulky Items",
      "slug": "bulky-items",
      "description": "Large items with special shipping requirements",
      "count": 5
    }
  ]
}
```

---

## JavaScript Example

```javascript
class ShippingAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getZones() {
    const response = await fetch(`${this.baseUrl}/shipping/zones`);
    return response.json();
  }

  async getZoneMethods(zoneId) {
    const response = await fetch(`${this.baseUrl}/shipping/zones/${zoneId}/methods`);
    return response.json();
  }

  async getMethods() {
    const response = await fetch(`${this.baseUrl}/shipping/methods`);
    return response.json();
  }

  async getClasses() {
    const response = await fetch(`${this.baseUrl}/shipping/classes`);
    return response.json();
  }

  async calculateRates(address, cartKeyOrProducts) {
    const body = {
      country: address.country,
      state: address.state,
      city: address.city,
      postcode: address.postcode,
    };

    if (typeof cartKeyOrProducts === 'string') {
      body.cart_key = cartKeyOrProducts;
    } else if (Array.isArray(cartKeyOrProducts)) {
      body.products = cartKeyOrProducts;
    }

    const response = await fetch(`${this.baseUrl}/shipping/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    return response.json();
  }
}

// Usage
const shippingApi = new ShippingAPI('https://your-site.com/wp-json/jexi-wch/v1');

// Get all shipping zones
const zones = await shippingApi.getZones();
console.log('Shipping zones:', zones.data);

// Get methods for a zone
const methods = await shippingApi.getZoneMethods(1);
console.log('Zone 1 methods:', methods.data);

// Calculate shipping rates
const address = {
  country: 'PK',
  state: 'PB',
  city: 'Lahore',
  postcode: '54000',
};

// With cart session
const rates = await shippingApi.calculateRates(address, 'cart_session_key');

// Or with products array
const ratesFromProducts = await shippingApi.calculateRates(address, [
  { product_id: 47, quantity: 2 },
  { product_id: 48, quantity: 1 },
]);

// Display shipping options
rates.data.packages[0].rates.forEach(rate => {
  console.log(`${rate.label}: ${rate.cost} (${rate.method_id})`);
});
```

## Complete Shipping Flow Example

```javascript
// 1. User enters shipping address
const address = {
  country: 'PK',
  state: 'PB',
  city: 'Lahore',
  postcode: '54000',
};

// 2. Calculate available shipping rates
const shippingRates = await fetch('/wp-json/jexi-wch/v1/shipping/calculate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ...address,
    cart_key: cartSession.cart_key,
  }),
}).then(r => r.json());

// 3. Display shipping options to user
const rates = shippingRates.data.packages[0].rates;

// 4. User selects a shipping method
const selectedMethod = 'flat_rate:1';

// 5. Apply to cart
await fetch('/wp-json/jexi-wch/v1/cart/shipping', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    cart_key: cartSession.cart_key,
    shipping_method: selectedMethod,
  }),
});

// 6. Get updated cart totals
const cart = await fetch('/wp-json/jexi-wch/v1/cart?cart_key=' + cartSession.cart_key)
  .then(r => r.json());

console.log('Shipping:', cart.data.totals.shipping);
console.log('Total:', cart.data.totals.total);
```

## Shipping Zone Priority

Zones are matched in order of specificity:

1. **Postcode ranges** (most specific)
2. **City**
3. **State/Region**
4. **Country**
5. **Default zone** (Zone 0 - "Locations not covered")

When calculating rates, WooCommerce finds the most specific matching zone.

## Shipping Method Types

| Type | Description |
|------|-------------|
| `flat_rate` | Fixed cost per order |
| `free_shipping` | Free when conditions met |
| `local_pickup` | Customer picks up |
| `table_rate` | Cost based on rules |

## Related Endpoints

- [Cart API](/api-reference/cart) - Apply shipping to cart
- [Checkout API](/api-reference/checkout) - Complete order with shipping
- [Store API](/api-reference/store) - Get countries/states
