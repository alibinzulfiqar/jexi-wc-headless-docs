---
sidebar_position: 5
title: Orders
---

# Orders API

The Orders API provides complete access to WooCommerce orders, including viewing order history, creating orders, updating order status, and managing refunds.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/orders` | List orders |
| GET | `/orders/{id}` | Get single order |
| POST | `/orders` | Create order |
| PUT | `/orders/{id}` | Update order |
| DELETE | `/orders/{id}` | Delete order |
| GET | `/orders/{id}/notes` | Get order notes |
| POST | `/orders/{id}/notes` | Add order note |
| POST | `/orders/{id}/refunds` | Create refund |
| GET | `/orders/statuses` | Get order statuses |

---

## List Orders

Retrieve a list of orders.

```
GET /orders
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 10 | Items per page |
| `status` | string | any | Order status |
| `customer` | integer | - | Customer ID |
| `after` | string | - | Orders after date (ISO 8601) |
| `before` | string | - | Orders before date (ISO 8601) |
| `search` | string | - | Search orders |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/orders?status=processing&per_page=5" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Response

```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": 125,
        "number": "125",
        "status": "processing",
        "currency": "PKR",
        "total": "5500.00",
        "subtotal": "5000.00",
        "shipping_total": "500.00",
        "tax_total": "0.00",
        "discount_total": "0.00",
        "payment_method": "cod",
        "payment_method_title": "Cash on Delivery",
        "date_created": "2024-01-20T15:30:00",
        "date_modified": "2024-01-20T15:35:00",
        "customer_id": 5,
        "billing": {
          "first_name": "John",
          "last_name": "Doe",
          "email": "john@example.com",
          "phone": "555-123-4567",
          "address_1": "123 Main St",
          "city": "Lahore",
          "state": "Punjab",
          "postcode": "54000",
          "country": "PK"
        },
        "shipping": {
          "first_name": "John",
          "last_name": "Doe",
          "address_1": "123 Main St",
          "city": "Lahore",
          "state": "Punjab",
          "postcode": "54000",
          "country": "PK"
        },
        "line_items": [
          {
            "id": 45,
            "name": "Premium T-Shirt",
            "product_id": 47,
            "variation_id": 0,
            "quantity": 2,
            "price": "2500.00",
            "subtotal": "5000.00",
            "total": "5000.00",
            "sku": "TSHIRT-001",
            "image": "https://your-site.com/wp-content/uploads/product.jpg"
          }
        ],
        "shipping_lines": [
          {
            "id": 46,
            "method_title": "Standard Delivery",
            "method_id": "flat_rate:1",
            "total": "500.00"
          }
        ],
        "fee_lines": [],
        "coupon_lines": [],
        "item_count": 2
      }
    ],
    "total": 25,
    "pages": 5,
    "page": 1
  }
}
```

---

## Get Single Order

Retrieve details of a specific order.

```
GET /orders/{id}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/orders/125" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 125,
    "number": "125",
    "order_key": "wc_order_abc123xyz",
    "status": "processing",
    "currency": "PKR",
    "currency_symbol": "Rs",
    "total": "5500.00",
    "subtotal": "5000.00",
    "shipping_total": "500.00",
    "tax_total": "0.00",
    "discount_total": "0.00",
    "payment_method": "cod",
    "payment_method_title": "Cash on Delivery",
    "transaction_id": "",
    "date_created": "2024-01-20T15:30:00",
    "date_modified": "2024-01-20T15:35:00",
    "date_completed": null,
    "date_paid": null,
    "customer_id": 5,
    "customer_note": "Please deliver in the evening.",
    "billing": {
      "first_name": "John",
      "last_name": "Doe",
      "company": "",
      "address_1": "123 Main St",
      "address_2": "",
      "city": "Lahore",
      "state": "Punjab",
      "postcode": "54000",
      "country": "PK",
      "email": "john@example.com",
      "phone": "555-123-4567"
    },
    "shipping": {
      "first_name": "John",
      "last_name": "Doe",
      "company": "",
      "address_1": "123 Main St",
      "address_2": "",
      "city": "Lahore",
      "state": "Punjab",
      "postcode": "54000",
      "country": "PK"
    },
    "line_items": [
      {
        "id": 45,
        "name": "Premium T-Shirt",
        "product_id": 47,
        "variation_id": 0,
        "quantity": 2,
        "price": "2500.00",
        "subtotal": "5000.00",
        "subtotal_tax": "0.00",
        "total": "5000.00",
        "total_tax": "0.00",
        "sku": "TSHIRT-001",
        "image": "https://your-site.com/wp-content/uploads/product.jpg",
        "meta_data": []
      }
    ],
    "shipping_lines": [
      {
        "id": 46,
        "method_title": "Standard Delivery",
        "method_id": "flat_rate:1",
        "total": "500.00",
        "total_tax": "0.00",
        "taxes": []
      }
    ],
    "fee_lines": [],
    "coupon_lines": [],
    "tax_lines": [],
    "refunds": [],
    "is_editable": true,
    "needs_payment": false,
    "needs_processing": true,
    "download_permissions_granted": false,
    "downloadable_items": []
  }
}
```

---

## Create Order

Create a new order programmatically.

```
POST /orders
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `customer_id` | integer | No | Customer ID (0 for guest) |
| `billing` | object | Yes | Billing address |
| `shipping` | object | No | Shipping address |
| `line_items` | array | Yes | Products in order |
| `shipping_lines` | array | No | Shipping methods |
| `coupon_lines` | array | No | Applied coupons |
| `payment_method` | string | No | Payment method ID |
| `status` | string | No | Order status |
| `customer_note` | string | No | Customer note |
| `meta_data` | array | No | Custom meta data |

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/orders" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "customer_id": 5,
    "payment_method": "cod",
    "billing": {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "phone": "555-123-4567",
      "address_1": "123 Main St",
      "city": "Lahore",
      "state": "Punjab",
      "postcode": "54000",
      "country": "PK"
    },
    "shipping": {
      "first_name": "John",
      "last_name": "Doe",
      "address_1": "123 Main St",
      "city": "Lahore",
      "state": "Punjab",
      "postcode": "54000",
      "country": "PK"
    },
    "line_items": [
      {
        "product_id": 47,
        "quantity": 2
      },
      {
        "product_id": 48,
        "variation_id": 52,
        "quantity": 1
      }
    ],
    "shipping_lines": [
      {
        "method_id": "flat_rate:1",
        "method_title": "Standard Delivery",
        "total": "500.00"
      }
    ],
    "customer_note": "Please call before delivery"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 126,
    "number": "126",
    "status": "pending",
    "total": "7000.00"
  }
}
```

---

## Update Order

Update an existing order.

```
PUT /orders/{id}
```

### Request Body

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Order status |
| `billing` | object | Billing address |
| `shipping` | object | Shipping address |
| `customer_note` | string | Customer note |
| `meta_data` | array | Custom meta data |

### Request Example

```bash
curl -X PUT "https://your-site.com/wp-json/jexi-wch/v1/orders/125" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "status": "completed"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 125,
    "status": "completed",
    "message": "Order updated successfully."
  }
}
```

---

## Delete Order

Move an order to trash.

```
DELETE /orders/{id}
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `force` | boolean | false | Force permanent delete |

### Request Example

```bash
curl -X DELETE "https://your-site.com/wp-json/jexi-wch/v1/orders/125?force=true" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 125,
    "message": "Order deleted permanently."
  }
}
```

---

## Get Order Notes

Retrieve notes for an order.

```
GET /orders/{id}/notes
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/orders/125/notes" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 89,
      "date_created": "2024-01-20T15:35:00",
      "note": "Order status changed from Pending to Processing.",
      "customer_note": false,
      "added_by": "system"
    },
    {
      "id": 90,
      "date_created": "2024-01-20T16:00:00",
      "note": "Payment received via Cash on Delivery",
      "customer_note": false,
      "added_by": "admin"
    }
  ]
}
```

---

## Add Order Note

Add a note to an order.

```
POST /orders/{id}/notes
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `note` | string | Yes | Note content |
| `customer_note` | boolean | No | Send to customer |

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/orders/125/notes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "note": "Your order has been shipped!",
    "customer_note": true
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 91,
    "note": "Your order has been shipped!",
    "customer_note": true,
    "date_created": "2024-01-21T10:00:00"
  }
}
```

---

## Create Refund

Create a refund for an order.

```
POST /orders/{id}/refunds
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | string | Yes | Refund amount |
| `reason` | string | No | Refund reason |
| `line_items` | array | No | Specific items to refund |
| `restock_items` | boolean | No | Restock items |
| `api_refund` | boolean | No | Process via payment gateway |

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/orders/125/refunds" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "amount": "2500.00",
    "reason": "Customer returned one item",
    "restock_items": true
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 127,
    "amount": "2500.00",
    "reason": "Customer returned one item",
    "date_created": "2024-01-22T14:00:00"
  }
}
```

---

## Get Order Statuses

Retrieve all available order statuses.

```
GET /orders/statuses
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/orders/statuses"
```

### Response

```json
{
  "success": true,
  "data": {
    "pending": "Pending payment",
    "processing": "Processing",
    "on-hold": "On hold",
    "completed": "Completed",
    "cancelled": "Cancelled",
    "refunded": "Refunded",
    "failed": "Failed"
  }
}
```

---

## JavaScript Example

```javascript
class OrdersAPI {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    };
  }

  async getOrders(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `${this.baseUrl}/orders${query ? `?${query}` : ''}`,
      { headers: this.getHeaders() }
    );
    return response.json();
  }

  async getOrder(orderId) {
    const response = await fetch(
      `${this.baseUrl}/orders/${orderId}`,
      { headers: this.getHeaders() }
    );
    return response.json();
  }

  async createOrder(orderData) {
    const response = await fetch(`${this.baseUrl}/orders`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(orderData),
    });
    return response.json();
  }

  async updateOrder(orderId, data) {
    const response = await fetch(`${this.baseUrl}/orders/${orderId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async cancelOrder(orderId) {
    return this.updateOrder(orderId, { status: 'cancelled' });
  }

  async getOrderNotes(orderId) {
    const response = await fetch(
      `${this.baseUrl}/orders/${orderId}/notes`,
      { headers: this.getHeaders() }
    );
    return response.json();
  }

  async addOrderNote(orderId, note, customerNote = false) {
    const response = await fetch(`${this.baseUrl}/orders/${orderId}/notes`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ note, customer_note: customerNote }),
    });
    return response.json();
  }

  async createRefund(orderId, amount, reason = '') {
    const response = await fetch(`${this.baseUrl}/orders/${orderId}/refunds`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ amount, reason }),
    });
    return response.json();
  }

  async getOrderStatuses() {
    const response = await fetch(`${this.baseUrl}/orders/statuses`, {
      headers: this.getHeaders(),
    });
    return response.json();
  }

  // Customer-specific methods
  async getMyOrders(page = 1, perPage = 10) {
    return this.getOrders({ page, per_page: perPage });
  }

  async trackOrder(orderNumber, email) {
    const response = await fetch(`${this.baseUrl}/orders/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_number: orderNumber, email }),
    });
    return response.json();
  }
}

// Usage
const ordersApi = new OrdersAPI(
  'https://your-site.com/wp-json/jexi-wch/v1',
  'YOUR_AUTH_TOKEN'
);

// Get customer's orders
const myOrders = await ordersApi.getMyOrders();
console.log('My Orders:', myOrders.data.orders);

// Get order details
const order = await ordersApi.getOrder(125);
console.log('Order Status:', order.data.status);

// Cancel an order
await ordersApi.cancelOrder(125);

// Create a new order
const newOrder = await ordersApi.createOrder({
  customer_id: 5,
  billing: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    phone: '555-123-4567',
    address_1: '123 Main St',
    city: 'Lahore',
    country: 'PK',
  },
  line_items: [
    { product_id: 47, quantity: 2 }
  ],
});
```

## Order Statuses

| Status | Description |
|--------|-------------|
| `pending` | Awaiting payment |
| `processing` | Payment received, order is being processed |
| `on-hold` | Awaiting payment confirmation |
| `completed` | Order fulfilled and complete |
| `cancelled` | Cancelled by admin or customer |
| `refunded` | Fully refunded |
| `failed` | Payment failed or declined |

## Related Endpoints

- [Checkout API](/api-reference/checkout) - Create orders from cart
- [Customers API](/api-reference/customers) - Customer information
- [Payment Gateways](/api-reference/payment-gateways) - Payment methods
