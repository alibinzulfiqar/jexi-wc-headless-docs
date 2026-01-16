---
sidebar_position: 6
title: Customers
---

# Customers API

The Customers API provides access to customer accounts, including registration, profile management, addresses, and order history.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/customers` | List customers |
| GET | `/customers/{id}` | Get customer |
| POST | `/customers` | Create customer |
| PUT | `/customers/{id}` | Update customer |
| DELETE | `/customers/{id}` | Delete customer |
| GET | `/customers/{id}/orders` | Get customer orders |
| GET | `/customers/{id}/downloads` | Get downloadable files |
| PUT | `/customers/{id}/billing` | Update billing address |
| PUT | `/customers/{id}/shipping` | Update shipping address |

---

## List Customers

Retrieve a list of customers.

```
GET /customers
```

**Requires Admin Authentication**

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 10 | Items per page |
| `search` | string | - | Search by name or email |
| `role` | string | customer | User role filter |
| `orderby` | string | registered_date | Sort field |
| `order` | string | desc | Sort order (asc/desc) |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/customers?search=john" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Response

```json
{
  "success": true,
  "data": {
    "customers": [
      {
        "id": 5,
        "email": "john@example.com",
        "username": "johndoe",
        "first_name": "John",
        "last_name": "Doe",
        "display_name": "John Doe",
        "avatar": "https://secure.gravatar.com/avatar/...",
        "date_registered": "2024-01-10T10:00:00",
        "is_paying_customer": true,
        "orders_count": 5,
        "total_spent": "12500.00",
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
        }
      }
    ],
    "total": 50,
    "pages": 5,
    "page": 1
  }
}
```

---

## Get Single Customer

Retrieve a specific customer's details.

```
GET /customers/{id}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/customers/5" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 5,
    "email": "john@example.com",
    "username": "johndoe",
    "first_name": "John",
    "last_name": "Doe",
    "display_name": "John Doe",
    "avatar": "https://secure.gravatar.com/avatar/...",
    "date_registered": "2024-01-10T10:00:00",
    "role": "customer",
    "is_paying_customer": true,
    "orders_count": 5,
    "total_spent": "12500.00",
    "average_order_value": "2500.00",
    "billing": {
      "first_name": "John",
      "last_name": "Doe",
      "company": "Acme Inc",
      "address_1": "123 Main St",
      "address_2": "Suite 100",
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
    "meta_data": []
  }
}
```

---

## Create Customer

Create a new customer account.

```
POST /customers
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | Email address |
| `password` | string | No | Password (auto-generated if empty) |
| `first_name` | string | No | First name |
| `last_name` | string | No | Last name |
| `username` | string | No | Username |
| `billing` | object | No | Billing address |
| `shipping` | object | No | Shipping address |

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/customers" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "email": "newcustomer@example.com",
    "password": "securepassword",
    "first_name": "Jane",
    "last_name": "Smith",
    "billing": {
      "first_name": "Jane",
      "last_name": "Smith",
      "email": "newcustomer@example.com",
      "phone": "555-987-6543",
      "address_1": "456 Oak Ave",
      "city": "Karachi",
      "state": "Sindh",
      "postcode": "74000",
      "country": "PK"
    }
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 15,
    "email": "newcustomer@example.com",
    "username": "newcustomer",
    "first_name": "Jane",
    "last_name": "Smith",
    "message": "Customer created successfully."
  }
}
```

---

## Update Customer

Update an existing customer's information.

```
PUT /customers/{id}
```

### Request Body

| Parameter | Type | Description |
|-----------|------|-------------|
| `email` | string | Email address |
| `first_name` | string | First name |
| `last_name` | string | Last name |
| `billing` | object | Billing address |
| `shipping` | object | Shipping address |
| `meta_data` | array | Custom meta data |

### Request Example

```bash
curl -X PUT "https://your-site.com/wp-json/jexi-wch/v1/customers/5" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "first_name": "Johnny",
    "billing": {
      "phone": "555-111-2222"
    }
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 5,
    "first_name": "Johnny",
    "message": "Customer updated successfully."
  }
}
```

---

## Delete Customer

Delete a customer account.

```
DELETE /customers/{id}
```

**Requires Admin Authentication**

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `force` | boolean | false | Bypass trash |
| `reassign` | integer | - | Reassign posts to this user ID |

### Request Example

```bash
curl -X DELETE "https://your-site.com/wp-json/jexi-wch/v1/customers/15?force=true" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 15,
    "message": "Customer deleted successfully."
  }
}
```

---

## Get Customer Orders

Retrieve a customer's order history.

```
GET /customers/{id}/orders
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 10 | Items per page |
| `status` | string | any | Filter by status |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/customers/5/orders?per_page=5" \
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
        "status": "completed",
        "total": "5500.00",
        "date_created": "2024-01-20T15:30:00",
        "item_count": 2
      },
      {
        "id": 120,
        "number": "120",
        "status": "completed",
        "total": "3000.00",
        "date_created": "2024-01-15T10:00:00",
        "item_count": 1
      }
    ],
    "total": 5,
    "pages": 1,
    "page": 1
  }
}
```

---

## Get Customer Downloads

Retrieve a customer's downloadable products.

```
GET /customers/{id}/downloads
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/customers/5/downloads" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "download_id": "abc123",
      "download_url": "https://your-site.com/?download_file=50&order=wc_order_xyz&email=john@example.com&key=abc123",
      "product_id": 50,
      "product_name": "Digital Album",
      "product_url": "https://your-site.com/product/digital-album/",
      "download_name": "album.zip",
      "order_id": 125,
      "order_key": "wc_order_xyz",
      "downloads_remaining": "unlimited",
      "access_expires": null,
      "file": {
        "name": "album.zip",
        "file": "https://your-site.com/wp-content/uploads/woocommerce_uploads/album.zip"
      }
    }
  ]
}
```

---

## Update Billing Address

Update only the billing address.

```
PUT /customers/{id}/billing
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `first_name` | string | No | First name |
| `last_name` | string | No | Last name |
| `company` | string | No | Company |
| `address_1` | string | No | Address line 1 |
| `address_2` | string | No | Address line 2 |
| `city` | string | No | City |
| `state` | string | No | State/Province |
| `postcode` | string | No | ZIP/Postal code |
| `country` | string | No | Country code |
| `email` | string | No | Email |
| `phone` | string | No | Phone |

### Request Example

```bash
curl -X PUT "https://your-site.com/wp-json/jexi-wch/v1/customers/5/billing" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "address_1": "789 New Street",
    "city": "Islamabad",
    "state": "ICT",
    "postcode": "44000"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "message": "Billing address updated successfully.",
    "billing": {
      "first_name": "John",
      "last_name": "Doe",
      "company": "",
      "address_1": "789 New Street",
      "address_2": "",
      "city": "Islamabad",
      "state": "ICT",
      "postcode": "44000",
      "country": "PK",
      "email": "john@example.com",
      "phone": "555-123-4567"
    }
  }
}
```

---

## Update Shipping Address

Update only the shipping address.

```
PUT /customers/{id}/shipping
```

### Request Body

Same fields as billing, except `email` and `phone`.

### Request Example

```bash
curl -X PUT "https://your-site.com/wp-json/jexi-wch/v1/customers/5/shipping" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "address_1": "789 New Street",
    "city": "Islamabad",
    "state": "ICT",
    "postcode": "44000"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "message": "Shipping address updated successfully.",
    "shipping": {
      "first_name": "John",
      "last_name": "Doe",
      "company": "",
      "address_1": "789 New Street",
      "address_2": "",
      "city": "Islamabad",
      "state": "ICT",
      "postcode": "44000",
      "country": "PK"
    }
  }
}
```

---

## JavaScript Example

```javascript
class CustomersAPI {
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

  async getProfile(customerId) {
    const response = await fetch(
      `${this.baseUrl}/customers/${customerId}`,
      { headers: this.getHeaders() }
    );
    return response.json();
  }

  async updateProfile(customerId, data) {
    const response = await fetch(`${this.baseUrl}/customers/${customerId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async updateBillingAddress(customerId, address) {
    const response = await fetch(
      `${this.baseUrl}/customers/${customerId}/billing`,
      {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(address),
      }
    );
    return response.json();
  }

  async updateShippingAddress(customerId, address) {
    const response = await fetch(
      `${this.baseUrl}/customers/${customerId}/shipping`,
      {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(address),
      }
    );
    return response.json();
  }

  async getOrders(customerId, params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `${this.baseUrl}/customers/${customerId}/orders${query ? `?${query}` : ''}`,
      { headers: this.getHeaders() }
    );
    return response.json();
  }

  async getDownloads(customerId) {
    const response = await fetch(
      `${this.baseUrl}/customers/${customerId}/downloads`,
      { headers: this.getHeaders() }
    );
    return response.json();
  }
}

// Usage
const customersApi = new CustomersAPI(
  'https://your-site.com/wp-json/jexi-wch/v1',
  'YOUR_TOKEN'
);

// Get profile
const profile = await customersApi.getProfile(5);
console.log('Customer:', profile.data);

// Update name
await customersApi.updateProfile(5, {
  first_name: 'Johnny',
  last_name: 'Doe',
});

// Update billing address
await customersApi.updateBillingAddress(5, {
  address_1: '456 New Street',
  city: 'Karachi',
  postcode: '74000',
});

// Get order history
const orders = await customersApi.getOrders(5, { per_page: 10 });
console.log('Orders:', orders.data.orders);

// Get downloadable files
const downloads = await customersApi.getDownloads(5);
downloads.data.forEach(item => {
  console.log(`Download: ${item.product_name} - ${item.download_url}`);
});
```

## Address Object Structure

### Billing Address Fields

| Field | Type | Description |
|-------|------|-------------|
| `first_name` | string | First name |
| `last_name` | string | Last name |
| `company` | string | Company name |
| `address_1` | string | Address line 1 |
| `address_2` | string | Address line 2 |
| `city` | string | City |
| `state` | string | State/Province code |
| `postcode` | string | ZIP/Postal code |
| `country` | string | Country code (ISO 3166-1 alpha-2) |
| `email` | string | Email address |
| `phone` | string | Phone number |

### Shipping Address Fields

Same as billing except no `email` or `phone` fields.

## Related Endpoints

- [Authentication API](/api-reference/authentication) - Login/registration
- [Orders API](/api-reference/orders) - Order management
- [Store API](/api-reference/store) - Get countries/states
