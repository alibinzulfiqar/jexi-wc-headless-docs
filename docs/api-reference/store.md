---
sidebar_position: 9
title: Store Settings
---

# Store Settings API

The Store Settings API provides access to WooCommerce store configuration, including currency settings, countries, site information, and general settings needed for frontend development.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/store` | Get all store settings |
| GET | `/store/currency` | Get currency settings |
| GET | `/store/countries` | List all countries |
| GET | `/store/countries/{code}/states` | Get states for country |
| GET | `/store/site` | Get site information |
| GET | `/store/pages` | Get WooCommerce pages |
| GET | `/store/widgets` | Get sidebar widgets |
| GET | `/store/customizer` | Get theme customizer settings |

---

## Get Store Settings

Retrieve all store settings in one request.

```
GET /store
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/store"
```

### Response

```json
{
  "success": true,
  "data": {
    "name": "My WooCommerce Store",
    "description": "Your one-stop shop for everything",
    "url": "https://your-site.com",
    "home_url": "https://your-site.com",
    "language": "en_US",
    "timezone": "Asia/Karachi",
    "currency": {
      "code": "PKR",
      "symbol": "Rs",
      "position": "left",
      "thousand_separator": ",",
      "decimal_separator": ".",
      "decimals": 2
    },
    "weight_unit": "kg",
    "dimension_unit": "cm",
    "address": {
      "address_1": "123 Main Street",
      "address_2": "",
      "city": "Lahore",
      "state": "PB",
      "postcode": "54000",
      "country": "PK"
    },
    "selling_locations": {
      "type": "all",
      "countries": []
    },
    "shipping_locations": {
      "type": "all",
      "countries": []
    },
    "tax_settings": {
      "enabled": true,
      "prices_include_tax": false,
      "tax_based_on": "shipping",
      "shipping_tax_class": "standard"
    },
    "registration": {
      "enabled": true,
      "generate_username": true,
      "generate_password": false
    },
    "checkout_settings": {
      "guest_checkout": true,
      "create_account_default": false,
      "terms_page_id": 3
    }
  }
}
```

---

## Get Currency Settings

Retrieve currency configuration for price formatting.

```
GET /store/currency
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/store/currency"
```

### Response

```json
{
  "success": true,
  "data": {
    "code": "PKR",
    "symbol": "Rs",
    "symbol_html": "&#82;&#115;",
    "name": "Pakistani rupee",
    "position": "left",
    "thousand_separator": ",",
    "decimal_separator": ".",
    "decimals": 2,
    "rounding": "disabled",
    "format": {
      "price_format": "%1$s%2$s",
      "example": "Rs1,234.56"
    },
    "exchange_rates": {
      "base": "PKR",
      "rates": {}
    }
  }
}
```

---

## List Countries

Retrieve all available countries.

```
GET /store/countries
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selling` | boolean | false | Only selling countries |
| `shipping` | boolean | false | Only shipping countries |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/store/countries"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "code": "AF",
      "name": "Afghanistan",
      "has_states": true
    },
    {
      "code": "PK",
      "name": "Pakistan",
      "has_states": true
    },
    {
      "code": "IN",
      "name": "India",
      "has_states": true
    },
    {
      "code": "US",
      "name": "United States",
      "has_states": true
    },
    {
      "code": "GB",
      "name": "United Kingdom",
      "has_states": false
    }
  ]
}
```

---

## Get Country States

Retrieve states/provinces for a specific country.

```
GET /store/countries/{code}/states
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/store/countries/PK/states"
```

### Response

```json
{
  "success": true,
  "data": {
    "country": {
      "code": "PK",
      "name": "Pakistan"
    },
    "states": [
      {
        "code": "BA",
        "name": "Balochistan"
      },
      {
        "code": "IS",
        "name": "Islamabad Capital Territory"
      },
      {
        "code": "KP",
        "name": "Khyber Pakhtunkhwa"
      },
      {
        "code": "PB",
        "name": "Punjab"
      },
      {
        "code": "SD",
        "name": "Sindh"
      }
    ]
  }
}
```

---

## Get Site Information

Retrieve general site/WordPress information.

```
GET /store/site
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/store/site"
```

### Response

```json
{
  "success": true,
  "data": {
    "name": "My WooCommerce Store",
    "description": "Your one-stop shop for everything",
    "url": "https://your-site.com",
    "home": "https://your-site.com",
    "admin_email": "admin@example.com",
    "language": "en_US",
    "timezone_string": "Asia/Karachi",
    "gmt_offset": 5,
    "date_format": "F j, Y",
    "time_format": "g:i a",
    "logo": {
      "url": "https://your-site.com/wp-content/uploads/2024/01/logo.png",
      "width": 200,
      "height": 60,
      "alt": "My WooCommerce Store"
    },
    "favicon": "https://your-site.com/wp-content/uploads/2024/01/favicon.ico",
    "social": {
      "facebook": "https://facebook.com/mystore",
      "twitter": "https://twitter.com/mystore",
      "instagram": "https://instagram.com/mystore"
    },
    "woocommerce": {
      "version": "10.4.3",
      "currency": "PKR",
      "weight_unit": "kg",
      "dimension_unit": "cm"
    }
  }
}
```

---

## Get WooCommerce Pages

Retrieve important WooCommerce page IDs and URLs.

```
GET /store/pages
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/store/pages"
```

### Response

```json
{
  "success": true,
  "data": {
    "shop": {
      "id": 5,
      "title": "Shop",
      "slug": "shop",
      "url": "https://your-site.com/shop/"
    },
    "cart": {
      "id": 6,
      "title": "Cart",
      "slug": "cart",
      "url": "https://your-site.com/cart/"
    },
    "checkout": {
      "id": 7,
      "title": "Checkout",
      "slug": "checkout",
      "url": "https://your-site.com/checkout/"
    },
    "my_account": {
      "id": 8,
      "title": "My Account",
      "slug": "my-account",
      "url": "https://your-site.com/my-account/"
    },
    "terms": {
      "id": 9,
      "title": "Terms and Conditions",
      "slug": "terms-and-conditions",
      "url": "https://your-site.com/terms-and-conditions/"
    },
    "privacy_policy": {
      "id": 10,
      "title": "Privacy Policy",
      "slug": "privacy-policy",
      "url": "https://your-site.com/privacy-policy/"
    },
    "refund_policy": {
      "id": 11,
      "title": "Refund Policy",
      "slug": "refund-policy",
      "url": "https://your-site.com/refund-policy/"
    }
  }
}
```

---

## Get Widget Areas

Retrieve sidebar/widget area contents.

```
GET /store/widgets
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `sidebar` | string | Specific sidebar ID |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/store/widgets?sidebar=shop-sidebar"
```

### Response

```json
{
  "success": true,
  "data": {
    "sidebars": {
      "shop-sidebar": {
        "id": "shop-sidebar",
        "name": "Shop Sidebar",
        "widgets": [
          {
            "id": "woocommerce_product_categories-2",
            "type": "woocommerce_product_categories",
            "title": "Product Categories",
            "content": {
              "dropdown": false,
              "count": true,
              "hierarchical": true,
              "categories": [
                {
                  "id": 15,
                  "name": "Clothing",
                  "slug": "clothing",
                  "count": 25,
                  "children": [
                    {
                      "id": 16,
                      "name": "T-Shirts",
                      "slug": "t-shirts",
                      "count": 12
                    }
                  ]
                }
              ]
            }
          },
          {
            "id": "woocommerce_price_filter-1",
            "type": "woocommerce_price_filter",
            "title": "Filter by Price",
            "content": {
              "min_price": 0,
              "max_price": 50000
            }
          }
        ]
      },
      "footer-1": {
        "id": "footer-1",
        "name": "Footer Column 1",
        "widgets": []
      }
    }
  }
}
```

---

## Get Customizer Settings

Retrieve theme customizer settings.

```
GET /store/customizer
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/store/customizer"
```

### Response

```json
{
  "success": true,
  "data": {
    "identity": {
      "site_title": "My WooCommerce Store",
      "tagline": "Your one-stop shop",
      "logo": "https://your-site.com/wp-content/uploads/logo.png",
      "site_icon": "https://your-site.com/wp-content/uploads/favicon.ico"
    },
    "colors": {
      "primary": "#3b82f6",
      "secondary": "#1e40af",
      "accent": "#f59e0b",
      "background": "#ffffff",
      "text": "#1f2937"
    },
    "typography": {
      "body_font": "Inter",
      "heading_font": "Inter",
      "base_size": "16px"
    },
    "header": {
      "layout": "standard",
      "sticky": true,
      "transparent": false
    },
    "footer": {
      "columns": 4,
      "copyright": "© 2024 My Store. All rights reserved."
    },
    "woocommerce": {
      "catalog_columns": 4,
      "catalog_rows": 4,
      "product_page_layout": "standard",
      "related_products_count": 4
    }
  }
}
```

---

## JavaScript Example

```javascript
class StoreAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.cache = new Map();
  }

  async get(endpoint, cacheKey = null) {
    if (cacheKey && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`);
    const data = await response.json();

    if (cacheKey) {
      this.cache.set(cacheKey, data);
    }

    return data;
  }

  async getSettings() {
    return this.get('/store', 'store_settings');
  }

  async getCurrency() {
    return this.get('/store/currency', 'currency');
  }

  async getCountries() {
    return this.get('/store/countries', 'countries');
  }

  async getStates(countryCode) {
    return this.get(`/store/countries/${countryCode}/states`, `states_${countryCode}`);
  }

  async getSiteInfo() {
    return this.get('/store/site', 'site_info');
  }

  async getPages() {
    return this.get('/store/pages', 'pages');
  }

  async getWidgets(sidebar = null) {
    const endpoint = sidebar 
      ? `/store/widgets?sidebar=${sidebar}`
      : '/store/widgets';
    return this.get(endpoint);
  }

  async getCustomizer() {
    return this.get('/store/customizer', 'customizer');
  }

  // Format price according to store settings
  formatPrice(amount) {
    const currency = this.cache.get('currency')?.data;
    if (!currency) return amount;

    const formatted = parseFloat(amount).toFixed(currency.decimals);
    const parts = formatted.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, currency.thousand_separator);
    const number = parts.join(currency.decimal_separator);

    if (currency.position === 'left') {
      return `${currency.symbol}${number}`;
    } else if (currency.position === 'right') {
      return `${number}${currency.symbol}`;
    } else if (currency.position === 'left_space') {
      return `${currency.symbol} ${number}`;
    } else {
      return `${number} ${currency.symbol}`;
    }
  }
}

// Usage
const storeApi = new StoreAPI('https://your-site.com/wp-json/jexi-wch/v1');

// Initialize store settings
async function initializeStore() {
  // Load essential settings
  const [settings, currency, site] = await Promise.all([
    storeApi.getSettings(),
    storeApi.getCurrency(),
    storeApi.getSiteInfo(),
  ]);

  console.log('Store:', settings.data.name);
  console.log('Currency:', currency.data.code);

  // Format prices
  console.log('Price:', storeApi.formatPrice(1234.56)); // Rs1,234.56
}

// Build country/state dropdowns
async function buildAddressForm() {
  const countries = await storeApi.getCountries();

  // Populate country dropdown
  const countrySelect = document.getElementById('country');
  countries.data.forEach(country => {
    const option = document.createElement('option');
    option.value = country.code;
    option.textContent = country.name;
    countrySelect.appendChild(option);
  });

  // When country changes, load states
  countrySelect.addEventListener('change', async (e) => {
    const stateSelect = document.getElementById('state');
    stateSelect.innerHTML = '<option value="">Select State</option>';

    if (e.target.value) {
      const states = await storeApi.getStates(e.target.value);
      states.data.states.forEach(state => {
        const option = document.createElement('option');
        option.value = state.code;
        option.textContent = state.name;
        stateSelect.appendChild(option);
      });
    }
  });
}

// Apply theme colors
async function applyThemeColors() {
  const customizer = await storeApi.getCustomizer();
  const colors = customizer.data.colors;

  document.documentElement.style.setProperty('--color-primary', colors.primary);
  document.documentElement.style.setProperty('--color-secondary', colors.secondary);
  document.documentElement.style.setProperty('--color-accent', colors.accent);
}

initializeStore();
buildAddressForm();
applyThemeColors();
```

## Price Formatting Helper

```javascript
// Utility function for price formatting
function formatWooCommercePrice(amount, currency) {
  const num = parseFloat(amount);
  const formatted = num.toLocaleString(undefined, {
    minimumFractionDigits: currency.decimals,
    maximumFractionDigits: currency.decimals,
  });

  switch (currency.position) {
    case 'left':
      return `${currency.symbol}${formatted}`;
    case 'right':
      return `${formatted}${currency.symbol}`;
    case 'left_space':
      return `${currency.symbol} ${formatted}`;
    case 'right_space':
      return `${formatted} ${currency.symbol}`;
    default:
      return `${currency.symbol}${formatted}`;
  }
}
```

## Related Endpoints

- [Products API](/api-reference/products) - Product listings
- [Shipping API](/api-reference/shipping) - Shipping zones by country
- [Categories API](/api-reference/categories) - Product categories
