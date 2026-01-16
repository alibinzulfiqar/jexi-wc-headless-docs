---
sidebar_position: 16
title: Taxes
---

# Taxes API

The Taxes API provides access to WooCommerce tax configuration, including tax rates, tax classes, and tax calculation.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/taxes/rates` | List tax rates |
| GET | `/taxes/classes` | List tax classes |
| POST | `/taxes/calculate` | Calculate taxes for items |

---

## List Tax Rates

Retrieve all configured tax rates.

```
GET /taxes/rates
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 100 | Items per page |
| `class` | string | - | Filter by tax class |
| `country` | string | - | Filter by country code |
| `state` | string | - | Filter by state code |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/taxes/rates?country=PK"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "country": "PK",
      "state": "",
      "postcode": "",
      "city": "",
      "rate": "17.0000",
      "name": "GST",
      "priority": 1,
      "compound": false,
      "shipping": true,
      "order": 0,
      "class": "standard"
    },
    {
      "id": 2,
      "country": "PK",
      "state": "PB",
      "postcode": "",
      "city": "",
      "rate": "16.0000",
      "name": "Punjab Tax",
      "priority": 1,
      "compound": false,
      "shipping": true,
      "order": 1,
      "class": "standard"
    },
    {
      "id": 3,
      "country": "PK",
      "state": "",
      "postcode": "",
      "city": "",
      "rate": "5.0000",
      "name": "Reduced GST",
      "priority": 1,
      "compound": false,
      "shipping": false,
      "order": 0,
      "class": "reduced-rate"
    }
  ]
}
```

---

## List Tax Classes

Retrieve all tax classes.

```
GET /taxes/classes
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/taxes/classes"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "slug": "standard",
      "name": "Standard"
    },
    {
      "slug": "reduced-rate",
      "name": "Reduced Rate"
    },
    {
      "slug": "zero-rate",
      "name": "Zero Rate"
    }
  ]
}
```

---

## Calculate Taxes

Calculate taxes for a set of items and address.

```
POST /taxes/calculate
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `country` | string | Yes | Country code |
| `state` | string | No | State code |
| `city` | string | No | City name |
| `postcode` | string | No | Postal code |
| `items` | array | Yes | Items to calculate tax for |

### Items Array Structure

| Field | Type | Description |
|-------|------|-------------|
| `product_id` | integer | Product ID |
| `quantity` | integer | Quantity |
| `price` | string | Item price |
| `tax_class` | string | Tax class (optional) |

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/taxes/calculate" \
  -H "Content-Type: application/json" \
  -d '{
    "country": "PK",
    "state": "PB",
    "city": "Lahore",
    "postcode": "54000",
    "items": [
      {
        "product_id": 47,
        "quantity": 2,
        "price": "2500.00"
      },
      {
        "product_id": 48,
        "quantity": 1,
        "price": "3000.00"
      }
    ]
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "product_id": 47,
        "quantity": 2,
        "subtotal": "5000.00",
        "tax_class": "standard",
        "taxes": [
          {
            "id": 2,
            "name": "Punjab Tax",
            "rate": "16.0000",
            "amount": "800.00"
          }
        ],
        "total_tax": "800.00",
        "total": "5800.00"
      },
      {
        "product_id": 48,
        "quantity": 1,
        "subtotal": "3000.00",
        "tax_class": "standard",
        "taxes": [
          {
            "id": 2,
            "name": "Punjab Tax",
            "rate": "16.0000",
            "amount": "480.00"
          }
        ],
        "total_tax": "480.00",
        "total": "3480.00"
      }
    ],
    "shipping_tax": "0.00",
    "subtotal": "8000.00",
    "total_tax": "1280.00",
    "total": "9280.00",
    "tax_breakdown": [
      {
        "name": "Punjab Tax",
        "rate": "16.0000",
        "amount": "1280.00"
      }
    ]
  }
}
```

---

## JavaScript Example

```javascript
class TaxesAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getRates(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `${this.baseUrl}/taxes/rates${query ? `?${query}` : ''}`
    );
    return response.json();
  }

  async getClasses() {
    const response = await fetch(`${this.baseUrl}/taxes/classes`);
    return response.json();
  }

  async calculateTaxes(address, items) {
    const response = await fetch(`${this.baseUrl}/taxes/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...address,
        items,
      }),
    });
    return response.json();
  }
}

// Usage
const taxesApi = new TaxesAPI('https://your-site.com/wp-json/jexi-wch/v1');

// Get tax classes
const classes = await taxesApi.getClasses();

// Get rates for a country
const rates = await taxesApi.getRates({ country: 'PK' });

// Calculate taxes
const taxCalc = await taxesApi.calculateTaxes(
  { country: 'PK', state: 'PB', city: 'Lahore', postcode: '54000' },
  [
    { product_id: 47, quantity: 2, price: '2500.00' },
    { product_id: 48, quantity: 1, price: '3000.00' },
  ]
);

console.log('Subtotal:', taxCalc.data.subtotal);
console.log('Tax:', taxCalc.data.total_tax);
console.log('Total:', taxCalc.data.total);
```

## Tax Display Settings

WooCommerce stores determine how prices are displayed:

| Setting | Description |
|---------|-------------|
| `prices_include_tax` | Whether entered prices include tax |
| `tax_based_on` | Calculate tax based on: shipping/billing/store address |
| `display_prices_in_shop` | Show prices incl/excl tax in shop |
| `display_prices_in_cart` | Show prices incl/excl tax in cart |

These settings are available in the [Store API](/api-reference/store).

## Related Endpoints

- [Store API](/api-reference/store) - Tax settings
- [Products API](/api-reference/products) - Product tax classes
- [Cart API](/api-reference/cart) - Cart with taxes
- [Checkout API](/api-reference/checkout) - Checkout with taxes
