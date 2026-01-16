---
sidebar_position: 1
title: Products
---

# Products API

The Products API provides endpoints to retrieve product information from your WooCommerce store.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | List all products |
| GET | `/products/{id}` | Get single product |
| GET | `/products/slug/{slug}` | Get product by slug |
| GET | `/products/{id}/variations` | Get product variations |
| GET | `/products/featured` | Get featured products |
| GET | `/products/on-sale` | Get products on sale |
| GET | `/products/new` | Get new products |
| GET | `/products/search` | Search products |

---

## List Products

Retrieve a list of products.

```
GET /products
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Current page |
| `per_page` | integer | 10 | Items per page (max 100) |
| `orderby` | string | "date" | Sort by: date, title, price, popularity, rating |
| `order` | string | "desc" | Sort order: asc, desc |
| `search` | string | - | Search term |
| `category` | string | - | Category slug |
| `tag` | string | - | Tag slug |
| `min_price` | number | - | Minimum price filter |
| `max_price` | number | - | Maximum price filter |
| `on_sale` | boolean | - | Only sale items |
| `featured` | boolean | - | Only featured items |
| `in_stock` | boolean | - | Only in-stock items |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/products?per_page=20&category=clothing"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 123,
      "name": "Premium T-Shirt",
      "slug": "premium-t-shirt",
      "type": "variable",
      "status": "publish",
      "description": "A high-quality cotton t-shirt...",
      "short_description": "Premium cotton t-shirt",
      "sku": "TSH-001",
      "price": "29.99",
      "regular_price": "39.99",
      "sale_price": "29.99",
      "on_sale": true,
      "price_html": "<del>$39.99</del> <ins>$29.99</ins>",
      "stock_status": "instock",
      "stock_quantity": 50,
      "manage_stock": true,
      "categories": [
        {
          "id": 15,
          "name": "Clothing",
          "slug": "clothing"
        }
      ],
      "tags": [
        {
          "id": 20,
          "name": "Summer",
          "slug": "summer"
        }
      ],
      "images": [
        {
          "id": 456,
          "src": "https://your-site.com/wp-content/uploads/tshirt.jpg",
          "thumbnail": "https://your-site.com/wp-content/uploads/tshirt-150x150.jpg",
          "alt": "Premium T-Shirt"
        }
      ],
      "attributes": [
        {
          "id": 1,
          "name": "Color",
          "options": ["Red", "Blue", "Black"]
        },
        {
          "id": 2,
          "name": "Size",
          "options": ["S", "M", "L", "XL"]
        }
      ],
      "average_rating": "4.5",
      "rating_count": 12,
      "related_ids": [124, 125, 126]
    }
  ]
}
```

### Response Headers

```
X-WP-Total: 100
X-WP-TotalPages: 10
```

---

## Get Single Product

Retrieve a single product by ID.

```
GET /products/{id}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/products/123"
```

### Response

Returns the full product object with additional details:

```json
{
  "success": true,
  "data": {
    "id": 123,
    "name": "Premium T-Shirt",
    "slug": "premium-t-shirt",
    "type": "variable",
    "description": "<p>Full HTML description...</p>",
    "short_description": "Premium cotton t-shirt",
    "sku": "TSH-001",
    "price": "29.99",
    "regular_price": "39.99",
    "sale_price": "29.99",
    "on_sale": true,
    "purchasable": true,
    "virtual": false,
    "downloadable": false,
    "downloads": [],
    "download_limit": -1,
    "download_expiry": -1,
    "tax_status": "taxable",
    "tax_class": "",
    "manage_stock": true,
    "stock_quantity": 50,
    "stock_status": "instock",
    "backorders": "no",
    "backorders_allowed": false,
    "backordered": false,
    "low_stock_amount": 5,
    "sold_individually": false,
    "weight": "0.5",
    "dimensions": {
      "length": "30",
      "width": "20",
      "height": "2"
    },
    "shipping_required": true,
    "shipping_taxable": true,
    "shipping_class": "",
    "reviews_allowed": true,
    "average_rating": "4.5",
    "rating_count": 12,
    "upsell_ids": [130, 131],
    "cross_sell_ids": [140, 141],
    "parent_id": 0,
    "categories": [...],
    "tags": [...],
    "images": [...],
    "attributes": [
      {
        "id": 1,
        "name": "Color",
        "slug": "pa_color",
        "position": 0,
        "visible": true,
        "variation": true,
        "options": ["Red", "Blue", "Black"]
      }
    ],
    "default_attributes": [
      {
        "id": 1,
        "name": "Color",
        "option": "Blue"
      }
    ],
    "variations": [
      {
        "id": 124,
        "sku": "TSH-001-RED-S",
        "price": "29.99",
        "regular_price": "39.99",
        "sale_price": "29.99",
        "stock_status": "instock",
        "stock_quantity": 10,
        "attributes": [
          { "name": "Color", "option": "Red" },
          { "name": "Size", "option": "S" }
        ],
        "image": {
          "id": 457,
          "src": "https://your-site.com/wp-content/uploads/tshirt-red.jpg"
        }
      }
    ],
    "meta_data": [],
    "date_created": "2024-01-15T10:30:00",
    "date_modified": "2024-01-20T15:45:00"
  }
}
```

---

## Get Product by Slug

Retrieve a product by its URL slug.

```
GET /products/slug/{slug}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/products/slug/premium-t-shirt"
```

---

## Get Product Variations

Retrieve all variations for a variable product.

```
GET /products/{id}/variations
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Current page |
| `per_page` | integer | 100 | Items per page |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/products/123/variations"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 124,
      "sku": "TSH-001-RED-S",
      "price": "29.99",
      "regular_price": "39.99",
      "sale_price": "29.99",
      "on_sale": true,
      "purchasable": true,
      "virtual": false,
      "downloadable": false,
      "manage_stock": true,
      "stock_quantity": 10,
      "stock_status": "instock",
      "backorders": "no",
      "weight": "0.5",
      "dimensions": {
        "length": "30",
        "width": "20",
        "height": "2"
      },
      "image": {
        "id": 457,
        "src": "https://your-site.com/wp-content/uploads/tshirt-red.jpg",
        "alt": "Red T-Shirt"
      },
      "attributes": [
        {
          "id": 1,
          "name": "Color",
          "option": "Red"
        },
        {
          "id": 2,
          "name": "Size",
          "option": "S"
        }
      ]
    },
    {
      "id": 125,
      "sku": "TSH-001-RED-M",
      "price": "29.99",
      "attributes": [
        { "name": "Color", "option": "Red" },
        { "name": "Size", "option": "M" }
      ]
    }
  ]
}
```

---

## Get Featured Products

Retrieve products marked as featured.

```
GET /products/featured
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/products/featured?per_page=8"
```

---

## Get Products on Sale

Retrieve products currently on sale.

```
GET /products/on-sale
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/products/on-sale"
```

---

## Get New Products

Retrieve recently added products.

```
GET /products/new
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `days` | integer | 30 | Products added in last N days |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/products/new?days=7"
```

---

## Search Products

Search products by term.

```
GET /products/search
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query |
| `page` | integer | No | Current page |
| `per_page` | integer | No | Items per page |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/products/search?q=shirt"
```

---

## JavaScript Example

```javascript
class ProductsAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${this.baseUrl}/products?${query}`);
    return response.json();
  }

  async getProduct(id) {
    const response = await fetch(`${this.baseUrl}/products/${id}`);
    return response.json();
  }

  async getProductBySlug(slug) {
    const response = await fetch(`${this.baseUrl}/products/slug/${slug}`);
    return response.json();
  }

  async getVariations(productId) {
    const response = await fetch(`${this.baseUrl}/products/${productId}/variations`);
    return response.json();
  }

  async searchProducts(query) {
    const response = await fetch(`${this.baseUrl}/products/search?q=${encodeURIComponent(query)}`);
    return response.json();
  }
}

// Usage
const api = new ProductsAPI('https://your-site.com/wp-json/jexi-wch/v1');

// Get paginated products
const products = await api.getProducts({ page: 1, per_page: 12, category: 'clothing' });

// Get single product with variations
const product = await api.getProduct(123);
if (product.data.type === 'variable') {
  const variations = await api.getVariations(123);
}
```

## Related Endpoints

- [Categories API](/api-reference/categories) - Product categories
- [Cart API](/api-reference/cart) - Add products to cart
- [Reviews API](/api-reference/reviews) - Product reviews
