---
sidebar_position: 13
title: Categories & Taxonomies
---

# Categories & Taxonomies API

The Categories API provides access to WooCommerce product categories, tags, attributes, and brands for building dynamic navigation and filtering.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | List product categories |
| GET | `/categories/{id}` | Get single category |
| GET | `/categories/slug/{slug}` | Get category by slug |
| GET | `/tags` | List product tags |
| GET | `/attributes` | List product attributes |
| GET | `/attributes/{id}/terms` | Get attribute terms |
| GET | `/brands` | List product brands |

---

## List Product Categories

Retrieve WooCommerce product categories.

```
GET /categories
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 100 | Items per page |
| `parent` | integer | - | Parent category ID |
| `hide_empty` | boolean | false | Hide empty categories |
| `orderby` | string | name | Sort field |
| `order` | string | asc | Sort order |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/categories?hide_empty=true"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 15,
      "name": "Clothing",
      "slug": "clothing",
      "description": "Shop our clothing collection",
      "parent": 0,
      "count": 45,
      "image": {
        "id": 200,
        "url": "https://your-site.com/wp-content/uploads/categories/clothing.jpg",
        "alt": "Clothing Category"
      },
      "display": "default",
      "menu_order": 1,
      "children": [
        {
          "id": 16,
          "name": "T-Shirts",
          "slug": "t-shirts",
          "description": "",
          "parent": 15,
          "count": 20,
          "image": null,
          "children": []
        },
        {
          "id": 17,
          "name": "Pants",
          "slug": "pants",
          "description": "",
          "parent": 15,
          "count": 15,
          "image": null,
          "children": [
            {
              "id": 20,
              "name": "Jeans",
              "slug": "jeans",
              "parent": 17,
              "count": 8,
              "children": []
            }
          ]
        },
        {
          "id": 18,
          "name": "Jackets",
          "slug": "jackets",
          "description": "",
          "parent": 15,
          "count": 10,
          "image": null,
          "children": []
        }
      ]
    },
    {
      "id": 25,
      "name": "Electronics",
      "slug": "electronics",
      "description": "Latest electronics and gadgets",
      "parent": 0,
      "count": 30,
      "image": {
        "id": 201,
        "url": "https://your-site.com/wp-content/uploads/categories/electronics.jpg",
        "alt": "Electronics Category"
      },
      "display": "default",
      "menu_order": 2,
      "children": []
    }
  ]
}
```

---

## Get Single Category

Retrieve details for a specific category.

```
GET /categories/{id}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/categories/15"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 15,
    "name": "Clothing",
    "slug": "clothing",
    "description": "Shop our clothing collection with the latest styles and trends.",
    "parent": 0,
    "count": 45,
    "image": {
      "id": 200,
      "url": "https://your-site.com/wp-content/uploads/categories/clothing.jpg",
      "alt": "Clothing Category",
      "sizes": {
        "thumbnail": "...",
        "medium": "...",
        "large": "..."
      }
    },
    "display": "default",
    "menu_order": 1,
    "acf": {},
    "breadcrumbs": [
      {
        "id": 0,
        "name": "Home",
        "slug": "",
        "url": "https://your-site.com/"
      },
      {
        "id": 15,
        "name": "Clothing",
        "slug": "clothing",
        "url": "https://your-site.com/product-category/clothing/"
      }
    ],
    "children": [
      {
        "id": 16,
        "name": "T-Shirts",
        "slug": "t-shirts",
        "count": 20
      },
      {
        "id": 17,
        "name": "Pants",
        "slug": "pants",
        "count": 15
      }
    ],
    "parent_category": null
  }
}
```

---

## Get Category by Slug

Retrieve a category using its URL slug.

```
GET /categories/slug/{slug}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/categories/slug/clothing"
```

---

## List Product Tags

Retrieve all product tags.

```
GET /tags
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 100 | Items per page |
| `hide_empty` | boolean | false | Hide empty tags |
| `search` | string | - | Search tags |
| `orderby` | string | name | Sort field |
| `order` | string | asc | Sort order |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/tags?hide_empty=true"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 30,
      "name": "Best Seller",
      "slug": "best-seller",
      "description": "",
      "count": 12
    },
    {
      "id": 31,
      "name": "New Arrival",
      "slug": "new-arrival",
      "description": "",
      "count": 25
    },
    {
      "id": 32,
      "name": "Sale",
      "slug": "sale",
      "description": "",
      "count": 18
    },
    {
      "id": 33,
      "name": "Eco-Friendly",
      "slug": "eco-friendly",
      "description": "Sustainable and environmentally friendly products",
      "count": 8
    }
  ]
}
```

---

## List Product Attributes

Retrieve all product attributes (like Color, Size, etc.).

```
GET /attributes
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/attributes"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Color",
      "slug": "pa_color",
      "type": "select",
      "order_by": "menu_order",
      "has_archives": true,
      "term_count": 8
    },
    {
      "id": 2,
      "name": "Size",
      "slug": "pa_size",
      "type": "select",
      "order_by": "menu_order",
      "has_archives": true,
      "term_count": 5
    },
    {
      "id": 3,
      "name": "Material",
      "slug": "pa_material",
      "type": "select",
      "order_by": "name",
      "has_archives": false,
      "term_count": 6
    }
  ]
}
```

---

## Get Attribute Terms

Retrieve all terms for a specific attribute.

```
GET /attributes/{id}/terms
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/attributes/1/terms"
```

### Response

```json
{
  "success": true,
  "data": {
    "attribute": {
      "id": 1,
      "name": "Color",
      "slug": "pa_color"
    },
    "terms": [
      {
        "id": 40,
        "name": "Red",
        "slug": "red",
        "description": "",
        "count": 15,
        "menu_order": 1,
        "color": "#ff0000"
      },
      {
        "id": 41,
        "name": "Blue",
        "slug": "blue",
        "description": "",
        "count": 12,
        "menu_order": 2,
        "color": "#0000ff"
      },
      {
        "id": 42,
        "name": "Green",
        "slug": "green",
        "description": "",
        "count": 8,
        "menu_order": 3,
        "color": "#00ff00"
      },
      {
        "id": 43,
        "name": "Black",
        "slug": "black",
        "description": "",
        "count": 25,
        "menu_order": 4,
        "color": "#000000"
      },
      {
        "id": 44,
        "name": "White",
        "slug": "white",
        "description": "",
        "count": 20,
        "menu_order": 5,
        "color": "#ffffff"
      }
    ]
  }
}
```

---

## List Product Brands

Retrieve product brands (if brand taxonomy is enabled).

```
GET /brands
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 100 | Items per page |
| `hide_empty` | boolean | false | Hide empty brands |
| `orderby` | string | name | Sort field |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/brands"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 50,
      "name": "Nike",
      "slug": "nike",
      "description": "Official Nike products",
      "count": 35,
      "logo": {
        "url": "https://your-site.com/wp-content/uploads/brands/nike.png",
        "alt": "Nike"
      }
    },
    {
      "id": 51,
      "name": "Adidas",
      "slug": "adidas",
      "description": "Official Adidas products",
      "count": 28,
      "logo": {
        "url": "https://your-site.com/wp-content/uploads/brands/adidas.png",
        "alt": "Adidas"
      }
    },
    {
      "id": 52,
      "name": "Puma",
      "slug": "puma",
      "description": "Official Puma products",
      "count": 22,
      "logo": {
        "url": "https://your-site.com/wp-content/uploads/brands/puma.png",
        "alt": "Puma"
      }
    }
  ]
}
```

---

## JavaScript Example

```javascript
class TaxonomyAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.cache = new Map();
  }

  async getCategories(params = {}) {
    const query = new URLSearchParams(params).toString();
    const cacheKey = `categories_${query}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const response = await fetch(
      `${this.baseUrl}/categories${query ? `?${query}` : ''}`
    );
    const data = await response.json();
    
    this.cache.set(cacheKey, data);
    return data;
  }

  async getCategory(idOrSlug) {
    const endpoint = typeof idOrSlug === 'number'
      ? `/categories/${idOrSlug}`
      : `/categories/slug/${idOrSlug}`;
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    return response.json();
  }

  async getTags(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `${this.baseUrl}/tags${query ? `?${query}` : ''}`
    );
    return response.json();
  }

  async getAttributes() {
    if (this.cache.has('attributes')) {
      return this.cache.get('attributes');
    }

    const response = await fetch(`${this.baseUrl}/attributes`);
    const data = await response.json();
    
    this.cache.set('attributes', data);
    return data;
  }

  async getAttributeTerms(attributeId) {
    const cacheKey = `attr_terms_${attributeId}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const response = await fetch(`${this.baseUrl}/attributes/${attributeId}/terms`);
    const data = await response.json();
    
    this.cache.set(cacheKey, data);
    return data;
  }

  async getBrands(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `${this.baseUrl}/brands${query ? `?${query}` : ''}`
    );
    return response.json();
  }

  // Helper to build category tree
  buildCategoryTree(categories, parentId = 0) {
    return categories
      .filter(cat => cat.parent === parentId)
      .map(cat => ({
        ...cat,
        children: this.buildCategoryTree(categories, cat.id),
      }));
  }

  // Flatten category tree
  flattenCategories(categories, result = [], depth = 0) {
    for (const cat of categories) {
      result.push({ ...cat, depth });
      if (cat.children?.length) {
        this.flattenCategories(cat.children, result, depth + 1);
      }
    }
    return result;
  }
}

// Usage
const taxonomy = new TaxonomyAPI('https://your-site.com/wp-json/jexi-wch/v1');

// Get all categories
const categories = await taxonomy.getCategories({ hide_empty: true });
console.log('Categories:', categories.data);

// Get category by slug
const clothing = await taxonomy.getCategory('clothing');
console.log('Clothing:', clothing.data);

// Get product tags
const tags = await taxonomy.getTags();
console.log('Tags:', tags.data);

// Get all attributes and their terms
const attributes = await taxonomy.getAttributes();
for (const attr of attributes.data) {
  const terms = await taxonomy.getAttributeTerms(attr.id);
  console.log(`${attr.name}:`, terms.data.terms);
}
```

## React Category Navigation

```jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';

function CategoryNav({ categories, currentSlug }) {
  const renderCategory = (category, depth = 0) => {
    const isActive = category.slug === currentSlug;
    const hasChildren = category.children?.length > 0;

    return (
      <li 
        key={category.id} 
        className={`depth-${depth} ${isActive ? 'active' : ''}`}
      >
        <Link href={`/category/${category.slug}`}>
          <span>{category.name}</span>
          {category.count > 0 && (
            <span className="count">({category.count})</span>
          )}
        </Link>
        
        {hasChildren && (
          <ul className="subcategories">
            {category.children.map(child => renderCategory(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav className="category-nav">
      <ul>
        {categories.map(cat => renderCategory(cat))}
      </ul>
    </nav>
  );
}

// Category filter with checkboxes
function CategoryFilter({ categories, selected, onChange }) {
  const [expanded, setExpanded] = useState(new Set());

  const toggleExpand = (id) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderCategory = (category, depth = 0) => {
    const isSelected = selected.includes(category.id);
    const hasChildren = category.children?.length > 0;
    const isExpanded = expanded.has(category.id);

    return (
      <div key={category.id} className={`filter-item depth-${depth}`}>
        <label>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onChange(category.id)}
          />
          <span>{category.name}</span>
          <span className="count">({category.count})</span>
        </label>
        
        {hasChildren && (
          <>
            <button
              className="expand-toggle"
              onClick={() => toggleExpand(category.id)}
            >
              {isExpanded ? '−' : '+'}
            </button>
            
            {isExpanded && (
              <div className="children">
                {category.children.map(child => renderCategory(child, depth + 1))}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="category-filter">
      <h3>Categories</h3>
      {categories.map(cat => renderCategory(cat))}
    </div>
  );
}
```

## Attribute Color Swatches

```jsx
function ColorSwatches({ terms, selected, onChange }) {
  return (
    <div className="color-swatches">
      {terms.map(term => (
        <button
          key={term.id}
          className={`swatch ${selected === term.slug ? 'active' : ''}`}
          style={{ backgroundColor: term.color }}
          title={term.name}
          onClick={() => onChange(term.slug)}
        >
          <span className="sr-only">{term.name}</span>
        </button>
      ))}
    </div>
  );
}

function SizeSelector({ terms, selected, onChange }) {
  return (
    <div className="size-selector">
      {terms.map(term => (
        <button
          key={term.id}
          className={`size-btn ${selected === term.slug ? 'active' : ''}`}
          onClick={() => onChange(term.slug)}
          disabled={term.count === 0}
        >
          {term.name}
        </button>
      ))}
    </div>
  );
}
```

## Related Endpoints

- [Products API](/api-reference/products) - Filter products by category
- [Menus API](/api-reference/menus) - Category navigation
- [Store API](/api-reference/store) - Widget categories
