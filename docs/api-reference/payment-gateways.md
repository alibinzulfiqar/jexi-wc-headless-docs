---
sidebar_position: 7
title: Payment Gateways
---

# Payment Gateways API

The Payment Gateways API provides access to all available payment methods in your WooCommerce store, enabling frontend applications to display payment options and process payments without redirecting to WordPress.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/payment-gateways` | List all enabled payment gateways |
| GET | `/payment-gateways/{id}` | Get gateway details |
| POST | `/payment-gateways/process` | Process payment |

---

## List Payment Gateways

Retrieve all enabled payment gateways.

```
GET /payment-gateways
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/payment-gateways"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "cod",
      "title": "Cash on Delivery",
      "description": "Pay with cash upon delivery.",
      "enabled": true,
      "method_title": "Cash on Delivery",
      "method_description": "Have your customers pay with cash upon delivery.",
      "order": 0,
      "supports": [
        "products"
      ],
      "has_fields": false,
      "icon": "",
      "countries": "PK"
    },
    {
      "id": "bacs",
      "title": "Direct Bank Transfer",
      "description": "Make your payment directly into our bank account.",
      "enabled": true,
      "method_title": "Direct Bank Transfer",
      "method_description": "Take payments in person via BACS.",
      "order": 1,
      "supports": [
        "products"
      ],
      "has_fields": false,
      "icon": "",
      "countries": "",
      "settings": {
        "account_name": "Your Company Name",
        "account_number": "1234567890",
        "bank_name": "Bank of Commerce",
        "sort_code": "12-34-56",
        "iban": "",
        "bic": ""
      }
    },
    {
      "id": "stripe",
      "title": "Credit Card (Stripe)",
      "description": "Pay with your credit or debit card via Stripe.",
      "enabled": true,
      "method_title": "Stripe",
      "method_description": "Stripe payment gateway.",
      "order": 2,
      "supports": [
        "products",
        "refunds",
        "subscriptions",
        "subscription_cancellation",
        "subscription_suspension",
        "subscription_reactivation",
        "tokenization",
        "add_payment_method"
      ],
      "has_fields": true,
      "icon": "https://your-site.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/stripe.svg",
      "countries": "",
      "publishable_key": "pk_live_xxxxx"
    },
    {
      "id": "paypal",
      "title": "PayPal",
      "description": "Pay via PayPal; you can pay with your credit card if you don't have a PayPal account.",
      "enabled": true,
      "method_title": "PayPal Standard",
      "method_description": "PayPal Standard redirects customers to PayPal to enter their payment information.",
      "order": 3,
      "supports": [
        "products",
        "refunds"
      ],
      "has_fields": false,
      "icon": "https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg",
      "countries": ""
    }
  ]
}
```

---

## Get Gateway Details

Retrieve details for a specific payment gateway.

```
GET /payment-gateways/{id}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/payment-gateways/stripe"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "stripe",
    "title": "Credit Card (Stripe)",
    "description": "Pay with your credit or debit card via Stripe.",
    "enabled": true,
    "method_title": "Stripe",
    "method_description": "Stripe payment gateway.",
    "order": 2,
    "supports": [
      "products",
      "refunds",
      "subscriptions",
      "subscription_cancellation",
      "subscription_suspension",
      "subscription_reactivation",
      "tokenization",
      "add_payment_method"
    ],
    "has_fields": true,
    "icon": "https://your-site.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/stripe.svg",
    "countries": "",
    "settings": {
      "publishable_key": "pk_live_xxxxx",
      "testmode": "no",
      "capture": "yes",
      "payment_request": "yes",
      "saved_cards": "yes"
    },
    "form_fields": [
      {
        "name": "card_number",
        "label": "Card Number",
        "type": "text",
        "required": true,
        "placeholder": "•••• •••• •••• ••••"
      },
      {
        "name": "card_expiry",
        "label": "Expiry Date",
        "type": "text",
        "required": true,
        "placeholder": "MM / YY"
      },
      {
        "name": "card_cvc",
        "label": "CVC",
        "type": "text",
        "required": true,
        "placeholder": "CVC"
      }
    ]
  }
}
```

---

## Process Payment

Process a payment for an order.

```
POST /payment-gateways/process
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `order_id` | integer | Yes | Order ID to pay |
| `payment_method` | string | Yes | Gateway ID |
| `payment_data` | object | Varies | Gateway-specific data |

### Request Example - Cash on Delivery

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/payment-gateways/process" \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": 125,
    "payment_method": "cod"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "result": "success",
    "order_id": 125,
    "order_status": "processing",
    "redirect": null,
    "message": "Order placed successfully."
  }
}
```

### Request Example - Stripe

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/payment-gateways/process" \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": 126,
    "payment_method": "stripe",
    "payment_data": {
      "token": "tok_1234567890abcdef",
      "save_card": true
    }
  }'
```

### Response - Payment Success

```json
{
  "success": true,
  "data": {
    "result": "success",
    "order_id": 126,
    "order_status": "processing",
    "redirect": null,
    "transaction_id": "ch_1234567890",
    "message": "Payment successful."
  }
}
```

### Response - Requires Action (3D Secure)

```json
{
  "success": true,
  "data": {
    "result": "success",
    "requires_action": true,
    "order_id": 126,
    "client_secret": "pi_1234567890_secret_abcdef",
    "redirect": null,
    "message": "Additional authentication required."
  }
}
```

### Request Example - PayPal

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/payment-gateways/process" \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": 127,
    "payment_method": "paypal"
  }'
```

### Response - Redirect Required

```json
{
  "success": true,
  "data": {
    "result": "success",
    "order_id": 127,
    "order_status": "pending",
    "redirect": "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-12345",
    "message": "Redirect to PayPal to complete payment."
  }
}
```

---

## JavaScript Example

```javascript
class PaymentAPI {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async getPaymentGateways() {
    const response = await fetch(`${this.baseUrl}/payment-gateways`, {
      headers: this.getHeaders(),
    });
    return response.json();
  }

  async getGatewayDetails(gatewayId) {
    const response = await fetch(
      `${this.baseUrl}/payment-gateways/${gatewayId}`,
      { headers: this.getHeaders() }
    );
    return response.json();
  }

  async processPayment(orderId, paymentMethod, paymentData = {}) {
    const response = await fetch(`${this.baseUrl}/payment-gateways/process`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        order_id: orderId,
        payment_method: paymentMethod,
        payment_data: paymentData,
      }),
    });
    return response.json();
  }

  // Stripe-specific helper
  async processStripePayment(orderId, stripe, cardElement) {
    // Create Stripe payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // Process payment
    const result = await this.processPayment(orderId, 'stripe', {
      payment_method_id: paymentMethod.id,
    });

    // Handle 3D Secure
    if (result.data?.requires_action) {
      const { error: confirmError } = await stripe.confirmCardPayment(
        result.data.client_secret
      );

      if (confirmError) {
        return { success: false, error: confirmError.message };
      }

      // Confirm payment completion
      return this.processPayment(orderId, 'stripe', {
        payment_intent_id: result.data.client_secret.split('_secret')[0],
      });
    }

    return result;
  }
}

// Usage
const paymentApi = new PaymentAPI(
  'https://your-site.com/wp-json/jexi-wch/v1',
  'YOUR_TOKEN'
);

// List available payment methods
const gateways = await paymentApi.getPaymentGateways();
console.log('Available methods:', gateways.data.map(g => g.title));

// Display payment options in UI
gateways.data.forEach(gateway => {
  console.log(`
    ID: ${gateway.id}
    Title: ${gateway.title}
    Description: ${gateway.description}
    Icon: ${gateway.icon}
  `);
});

// Process COD payment
const codResult = await paymentApi.processPayment(125, 'cod');
if (codResult.success) {
  console.log('Order placed!', codResult.data.order_id);
}

// Process Stripe payment (with Stripe.js)
const stripe = Stripe('pk_live_xxxxx');
const elements = stripe.elements();
const cardElement = elements.create('card');

// When user submits payment form
const stripeResult = await paymentApi.processStripePayment(
  126,
  stripe,
  cardElement
);

if (stripeResult.success) {
  console.log('Payment successful!');
} else {
  console.error('Payment failed:', stripeResult.error);
}
```

## Stripe Integration

For Stripe payments in a headless setup:

### 1. Load Stripe.js

```html
<script src="https://js.stripe.com/v3/"></script>
```

### 2. Create Card Element

```javascript
const stripe = Stripe('pk_live_your_publishable_key');
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');
```

### 3. Handle Payment

```javascript
async function handlePayment(orderId) {
  // Create payment method
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
  });

  if (error) {
    showError(error.message);
    return;
  }

  // Send to your API
  const response = await fetch('/wp-json/jexi-wch/v1/payment-gateways/process', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      order_id: orderId,
      payment_method: 'stripe',
      payment_data: { payment_method_id: paymentMethod.id },
    }),
  });

  const result = await response.json();

  if (result.data?.requires_action) {
    // Handle 3D Secure authentication
    const { error } = await stripe.confirmCardPayment(result.data.client_secret);
    if (error) {
      showError(error.message);
    } else {
      showSuccess('Payment complete!');
    }
  } else if (result.success) {
    showSuccess('Payment complete!');
  } else {
    showError(result.message);
  }
}
```

## PayPal Integration

For PayPal in a headless setup, handle the redirect:

```javascript
async function handlePayPalPayment(orderId) {
  const response = await fetch('/wp-json/jexi-wch/v1/payment-gateways/process', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      order_id: orderId,
      payment_method: 'paypal',
    }),
  });

  const result = await response.json();

  if (result.data?.redirect) {
    // Redirect to PayPal
    window.location.href = result.data.redirect;
  } else if (result.success) {
    showSuccess('Order placed!');
  }
}
```

## Gateway Capabilities

| Gateway | Refunds | Subscriptions | Tokenization | 3D Secure |
|---------|---------|---------------|--------------|-----------|
| COD | No | No | No | No |
| BACS | Manual | No | No | No |
| Stripe | Yes | Yes | Yes | Yes |
| PayPal | Yes | Some | No | N/A |

## Related Endpoints

- [Checkout API](/api-reference/checkout) - Create orders
- [Orders API](/api-reference/orders) - Order management
- [Cart API](/api-reference/cart) - Cart management
