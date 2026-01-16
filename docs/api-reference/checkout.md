---
sidebar_position: 3
title: Checkout
---

# Checkout API

The Checkout API enables complete headless checkout without redirecting to WordPress.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/checkout` | Process checkout and create order |
| POST | `/checkout/validate` | Validate checkout data |
| GET | `/checkout/fields` | Get checkout form fields |
| GET | `/checkout/review` | Get order review/totals |
| POST | `/checkout/pay/{order_id}` | Pay for existing order |

---

## Process Checkout

Process the checkout and create an order.

```
POST /checkout
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `payment_method` | string | Yes | Payment gateway ID |
| `billing` | object | Yes | Billing address |
| `shipping` | object | No | Shipping address (if different) |
| `ship_to_different_address` | boolean | No | Ship to different address |
| `order_comments` | string | No | Order notes |
| `create_account` | boolean | No | Create account for guest |
| `account_password` | string | No | Password for new account |

### Billing/Shipping Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `first_name` | string | Yes | First name |
| `last_name` | string | Yes | Last name |
| `company` | string | No | Company name |
| `address_1` | string | Yes | Street address |
| `address_2` | string | No | Apartment, suite, etc. |
| `city` | string | Yes | City |
| `state` | string | Depends | State/Province code |
| `postcode` | string | Yes | ZIP/Postal code |
| `country` | string | Yes | Country code (e.g., "US") |
| `email` | string | Yes* | Email (*billing only) |
| `phone` | string | No | Phone number |

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/checkout" \
  -H "Content-Type: application/json" \
  -d '{
    "payment_method": "cod",
    "billing": {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "phone": "555-123-4567",
      "address_1": "123 Main Street",
      "address_2": "Apt 4B",
      "city": "New York",
      "state": "NY",
      "postcode": "10001",
      "country": "US"
    },
    "shipping": {
      "first_name": "John",
      "last_name": "Doe",
      "address_1": "456 Oak Avenue",
      "city": "Brooklyn",
      "state": "NY",
      "postcode": "11201",
      "country": "US"
    },
    "ship_to_different_address": true,
    "order_comments": "Please leave at door"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "order_id": 1234,
    "order_key": "wc_order_abc123xyz",
    "order_number": "1234",
    "status": "processing",
    "payment_method": "cod",
    "payment_method_title": "Cash on Delivery",
    "needs_payment": true,
    "total": "89.99",
    "currency": "USD",
    "redirect_url": null,
    "message": "Order placed successfully",
    "customer_id": 5
  }
}
```

### Payment Gateway Response

For payment gateways that require redirect (like PayPal):

```json
{
  "success": true,
  "data": {
    "order_id": 1234,
    "order_key": "wc_order_abc123xyz",
    "status": "pending",
    "payment_method": "paypal",
    "needs_payment": true,
    "redirect_url": "https://www.paypal.com/cgi-bin/webscr?...",
    "message": "Please complete payment"
  }
}
```

### Error Response

```json
{
  "success": false,
  "code": "checkout_error",
  "message": "Please enter a valid email address.",
  "errors": {
    "billing_email": ["Please enter a valid email address."]
  }
}
```

---

## Validate Checkout

Validate checkout data without creating an order.

```
POST /checkout/validate
```

### Request Body

Same as checkout endpoint.

### Response

```json
{
  "success": true,
  "data": {
    "valid": true,
    "message": "Checkout data is valid"
  }
}
```

### Validation Error Response

```json
{
  "success": false,
  "code": "validation_error",
  "message": "Please fix the following errors",
  "errors": {
    "billing_email": ["Please enter a valid email address."],
    "billing_postcode": ["Please enter a valid postcode/ZIP."]
  }
}
```

---

## Get Checkout Fields

Retrieve the checkout form field configuration.

```
GET /checkout/fields
```

### Response

```json
{
  "success": true,
  "data": {
    "billing": {
      "billing_first_name": {
        "label": "First name",
        "required": true,
        "type": "text",
        "priority": 10,
        "autocomplete": "given-name"
      },
      "billing_last_name": {
        "label": "Last name",
        "required": true,
        "type": "text",
        "priority": 20,
        "autocomplete": "family-name"
      },
      "billing_company": {
        "label": "Company name",
        "required": false,
        "type": "text",
        "priority": 30,
        "autocomplete": "organization"
      },
      "billing_country": {
        "label": "Country / Region",
        "required": true,
        "type": "country",
        "priority": 40,
        "autocomplete": "country"
      },
      "billing_address_1": {
        "label": "Street address",
        "required": true,
        "type": "text",
        "priority": 50,
        "placeholder": "House number and street name",
        "autocomplete": "address-line1"
      },
      "billing_address_2": {
        "label": "Apartment, suite, etc.",
        "required": false,
        "type": "text",
        "priority": 60,
        "autocomplete": "address-line2"
      },
      "billing_city": {
        "label": "Town / City",
        "required": true,
        "type": "text",
        "priority": 70,
        "autocomplete": "address-level2"
      },
      "billing_state": {
        "label": "State / County",
        "required": true,
        "type": "state",
        "priority": 80,
        "autocomplete": "address-level1"
      },
      "billing_postcode": {
        "label": "Postcode / ZIP",
        "required": true,
        "type": "text",
        "priority": 90,
        "autocomplete": "postal-code"
      },
      "billing_phone": {
        "label": "Phone",
        "required": false,
        "type": "tel",
        "priority": 100,
        "autocomplete": "tel"
      },
      "billing_email": {
        "label": "Email address",
        "required": true,
        "type": "email",
        "priority": 110,
        "autocomplete": "email"
      }
    },
    "shipping": {
      "shipping_first_name": {
        "label": "First name",
        "required": true,
        "type": "text",
        "priority": 10
      }
      // ... similar fields
    },
    "order": {
      "order_comments": {
        "label": "Order notes",
        "required": false,
        "type": "textarea",
        "placeholder": "Notes about your order, e.g. special notes for delivery"
      }
    }
  }
}
```

---

## Get Order Review

Get a summary of the order before checkout.

```
GET /checkout/review
```

### Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "key": "abc123",
        "product_id": 123,
        "name": "Premium T-Shirt - Red / M",
        "quantity": 2,
        "subtotal": "59.98",
        "total": "53.98"
      }
    ],
    "subtotal": "59.98",
    "discount_total": "6.00",
    "shipping_total": "10.00",
    "shipping_method": "Flat Rate",
    "tax_total": "5.12",
    "total": "69.10",
    "coupons": [
      {
        "code": "SAVE10",
        "discount": "6.00"
      }
    ],
    "shipping_address": {
      "country": "US",
      "state": "CA",
      "postcode": "90210"
    },
    "available_payment_methods": [
      {
        "id": "cod",
        "title": "Cash on Delivery",
        "description": "Pay with cash upon delivery."
      },
      {
        "id": "bacs",
        "title": "Direct Bank Transfer",
        "description": "Make your payment directly into our bank account."
      }
    ],
    "terms_page_id": 123,
    "privacy_policy_page_id": 124
  }
}
```

---

## Pay for Existing Order

Process payment for an existing unpaid order.

```
POST /checkout/pay/{order_id}
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `payment_method` | string | Yes | Payment gateway ID |
| `order_key` | string | Yes | Order key for verification |

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/checkout/pay/1234" \
  -H "Content-Type: application/json" \
  -d '{
    "payment_method": "bacs",
    "order_key": "wc_order_abc123xyz"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "order_id": 1234,
    "status": "on-hold",
    "payment_method": "bacs",
    "payment_instructions": "Please use the following details for payment:\n\nBank: Example Bank\nAccount: 1234567890\nSort Code: 12-34-56\n\nYour order will be processed once payment is received.",
    "message": "Order payment processed"
  }
}
```

---

## JavaScript Example

```javascript
class CheckoutAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getFields() {
    const response = await fetch(`${this.baseUrl}/checkout/fields`, {
      credentials: 'include',
    });
    return response.json();
  }

  async getReview() {
    const response = await fetch(`${this.baseUrl}/checkout/review`, {
      credentials: 'include',
    });
    return response.json();
  }

  async validate(data) {
    const response = await fetch(`${this.baseUrl}/checkout/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async processCheckout(data) {
    const response = await fetch(`${this.baseUrl}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async payOrder(orderId, paymentMethod, orderKey) {
    const response = await fetch(`${this.baseUrl}/checkout/pay/${orderId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        payment_method: paymentMethod,
        order_key: orderKey,
      }),
    });
    return response.json();
  }
}

// Usage Example
const checkout = new CheckoutAPI('https://your-site.com/wp-json/jexi-wch/v1');

// Complete checkout flow
async function completeCheckout(formData) {
  // 1. Validate first
  const validation = await checkout.validate(formData);
  if (!validation.data.valid) {
    throw new Error(validation.message);
  }

  // 2. Process checkout
  const result = await checkout.processCheckout(formData);
  
  if (!result.success) {
    throw new Error(result.message);
  }

  // 3. Handle payment redirect if needed
  if (result.data.redirect_url) {
    window.location.href = result.data.redirect_url;
    return;
  }

  // 4. Order complete
  return result.data;
}

// Form submission
document.getElementById('checkout-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    payment_method: document.getElementById('payment_method').value,
    billing: {
      first_name: document.getElementById('billing_first_name').value,
      last_name: document.getElementById('billing_last_name').value,
      email: document.getElementById('billing_email').value,
      phone: document.getElementById('billing_phone').value,
      address_1: document.getElementById('billing_address_1').value,
      city: document.getElementById('billing_city').value,
      state: document.getElementById('billing_state').value,
      postcode: document.getElementById('billing_postcode').value,
      country: document.getElementById('billing_country').value,
    },
    order_comments: document.getElementById('order_comments').value,
  };

  try {
    const order = await completeCheckout(formData);
    alert(`Order #${order.order_number} placed successfully!`);
    window.location.href = `/order-confirmation/${order.order_id}`;
  } catch (error) {
    alert(error.message);
  }
});
```

## Related Endpoints

- [Cart API](/api-reference/cart) - Cart management
- [Payment Gateways API](/api-reference/payment-gateways) - Available payment methods
- [Orders API](/api-reference/orders) - Order management
