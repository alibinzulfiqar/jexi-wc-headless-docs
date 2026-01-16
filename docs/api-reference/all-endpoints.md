---
sidebar_position: 99
title: All Endpoints
---

# Complete Endpoint Reference

Quick reference for all available API endpoints in Jexi WC Headless.

:::info API Version
**Version 1.0.0** | Developed by [Ali Bin Zulfiqar](https://alibinzulfiqar.live)
:::

## Base URL

```
https://your-site.com/wp-json/jexi-wch/v1
```

---

## Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | List products |
| GET | `/products/{id}` | Get single product |
| GET | `/products/slug/{slug}` | Get product by slug |
| GET | `/products/{id}/variations` | Get product variations |
| GET | `/products/featured` | Get featured products |
| GET | `/products/on-sale` | Get sale products |
| GET | `/products/new` | Get new arrivals |
| GET | `/products/best-sellers` | Get best sellers |
| GET | `/products/related/{id}` | Get related products |

---

## Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cart` | Get cart contents |
| POST | `/cart/add` | Add item to cart |
| PUT | `/cart/update` | Update cart item |
| DELETE | `/cart/remove` | Remove cart item |
| DELETE | `/cart/clear` | Clear entire cart |
| POST | `/cart/coupon` | Apply coupon |
| DELETE | `/cart/coupon` | Remove coupon |
| POST | `/cart/shipping` | Set shipping method |

---

## Checkout

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/checkout` | Process checkout |
| POST | `/checkout/validate` | Validate checkout data |
| GET | `/checkout/fields` | Get checkout form fields |
| POST | `/checkout/review` | Get order review |
| POST | `/checkout/pay/{order_id}` | Pay for existing order |

---

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login |
| POST | `/auth/register` | User registration |
| GET | `/auth/validate` | Validate token |
| POST | `/auth/refresh` | Refresh token |
| POST | `/auth/logout` | Logout |
| POST | `/auth/forgot-password` | Request password reset |
| POST | `/auth/reset-password` | Reset password |
| POST | `/auth/change-password` | Change password |
| GET | `/auth/me` | Get current user |
| PUT | `/auth/me` | Update current user |

---

## Orders

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

## Customers

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/customers` | List customers |
| GET | `/customers/{id}` | Get customer |
| POST | `/customers` | Create customer |
| PUT | `/customers/{id}` | Update customer |
| DELETE | `/customers/{id}` | Delete customer |
| GET | `/customers/{id}/orders` | Get customer orders |
| GET | `/customers/{id}/downloads` | Get downloads |
| PUT | `/customers/{id}/billing` | Update billing address |
| PUT | `/customers/{id}/shipping` | Update shipping address |

---

## Payment Gateways

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/payment-gateways` | List payment gateways |
| GET | `/payment-gateways/{id}` | Get gateway details |
| POST | `/payment-gateways/process` | Process payment |

---

## Shipping

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/shipping/zones` | List shipping zones |
| GET | `/shipping/zones/{id}` | Get zone details |
| GET | `/shipping/zones/{id}/methods` | Get zone methods |
| GET | `/shipping/methods` | List all methods |
| POST | `/shipping/calculate` | Calculate rates |
| GET | `/shipping/classes` | Get shipping classes |

---

## Taxes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/taxes/rates` | List tax rates |
| GET | `/taxes/classes` | List tax classes |
| POST | `/taxes/calculate` | Calculate taxes |

---

## Categories & Taxonomies

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | List product categories |
| GET | `/categories/{id}` | Get single category |
| GET | `/categories/slug/{slug}` | Get category by slug |
| GET | `/tags` | List product tags |
| GET | `/attributes` | List attributes |
| GET | `/attributes/{id}/terms` | Get attribute terms |
| GET | `/brands` | List product brands |

---

## Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/reviews` | List all reviews |
| GET | `/reviews/{id}` | Get single review |
| GET | `/reviews/product/{id}` | Get product reviews |
| GET | `/reviews/summary/{id}` | Get review summary |
| POST | `/reviews` | Submit review |

---

## Coupons

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/coupons/validate` | Validate coupon |
| GET | `/coupons/{code}` | Get coupon details |
| GET | `/coupons/cart` | Get cart coupons |

---

## Store Settings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/store` | Get all store settings |
| GET | `/store/currency` | Get currency settings |
| GET | `/store/countries` | List countries |
| GET | `/store/countries/{code}/states` | Get states |
| GET | `/store/site` | Get site info |
| GET | `/store/pages` | Get WooCommerce pages |
| GET | `/store/widgets` | Get widgets |
| GET | `/store/customizer` | Get customizer settings |

---

## Menus

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/menus` | List all menus |
| GET | `/menus/{id}` | Get menu by ID |
| GET | `/menus/slug/{slug}` | Get menu by slug |
| GET | `/menus/locations` | List menu locations |
| GET | `/menus/locations/{location}` | Get menu by location |

---

## Posts & Pages

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/content/posts` | List posts |
| GET | `/content/posts/{id}` | Get single post |
| GET | `/content/posts/slug/{slug}` | Get post by slug |
| GET | `/content/pages` | List pages |
| GET | `/content/pages/{id}` | Get single page |
| GET | `/content/pages/slug/{slug}` | Get page by slug |
| GET | `/content/{post_type}` | List custom post type |
| GET | `/content/categories` | List post categories |
| GET | `/content/tags` | List post tags |
| GET | `/authors` | List authors |
| GET | `/authors/{id}` | Get author details |
| GET | `/content/comments` | List comments |
| POST | `/content/comments` | Submit comment |
| GET | `/content/archives` | Get archives |

---

## Media

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/media` | List media items |
| GET | `/media/{id}` | Get single media |
| GET | `/media/post/{id}` | Get post media |
| GET | `/media/gallery` | Get gallery images |
| GET | `/media/sizes` | Get image sizes |

---

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 500 | Server Error |

---

## Response Format

All responses follow this format:

### Success Response

```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "code": "error_code",
  "message": "Human-readable error message",
  "data": { ... }
}
```

---

## Authentication Methods

### Bearer Token

```
Authorization: Bearer YOUR_TOKEN
```

### WooCommerce API Keys (for admin endpoints)

```
Authorization: Basic base64(consumer_key:consumer_secret)
```

Or via query string:

```
?consumer_key=ck_xxx&consumer_secret=cs_xxx
```
