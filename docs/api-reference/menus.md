---
sidebar_position: 10
title: Menus
---

# Menus API

The Menus API provides access to WordPress navigation menus, enabling headless frontends to display dynamic navigation structures.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/menus` | List all menus |
| GET | `/menus/{id}` | Get menu by ID |
| GET | `/menus/slug/{slug}` | Get menu by slug |
| GET | `/menus/locations` | List registered menu locations |
| GET | `/menus/locations/{location}` | Get menu by location |

---

## List All Menus

Retrieve all registered navigation menus.

```
GET /menus
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/menus"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "name": "Primary Navigation",
      "slug": "primary-navigation",
      "description": "Main site navigation",
      "count": 8,
      "locations": ["primary"]
    },
    {
      "id": 3,
      "name": "Footer Menu",
      "slug": "footer-menu",
      "description": "Links in the footer",
      "count": 5,
      "locations": ["footer"]
    },
    {
      "id": 4,
      "name": "Mobile Menu",
      "slug": "mobile-menu",
      "description": "",
      "count": 6,
      "locations": ["mobile"]
    }
  ]
}
```

---

## Get Menu by ID

Retrieve a specific menu with all its items.

```
GET /menus/{id}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/menus/2"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "Primary Navigation",
    "slug": "primary-navigation",
    "description": "Main site navigation",
    "locations": ["primary"],
    "items": [
      {
        "id": 10,
        "title": "Home",
        "url": "https://your-site.com/",
        "target": "",
        "attr_title": "",
        "description": "",
        "classes": ["home"],
        "xfn": "",
        "type": "custom",
        "type_label": "Custom Link",
        "object": "custom",
        "object_id": 0,
        "parent": 0,
        "order": 1,
        "children": []
      },
      {
        "id": 11,
        "title": "Shop",
        "url": "https://your-site.com/shop/",
        "target": "",
        "attr_title": "",
        "description": "Browse our products",
        "classes": [],
        "xfn": "",
        "type": "post_type",
        "type_label": "Page",
        "object": "page",
        "object_id": 5,
        "parent": 0,
        "order": 2,
        "children": [
          {
            "id": 12,
            "title": "Clothing",
            "url": "https://your-site.com/product-category/clothing/",
            "target": "",
            "attr_title": "",
            "description": "",
            "classes": [],
            "xfn": "",
            "type": "taxonomy",
            "type_label": "Product Category",
            "object": "product_cat",
            "object_id": 15,
            "parent": 11,
            "order": 3,
            "children": [
              {
                "id": 13,
                "title": "T-Shirts",
                "url": "https://your-site.com/product-category/clothing/t-shirts/",
                "target": "",
                "attr_title": "",
                "description": "",
                "classes": [],
                "xfn": "",
                "type": "taxonomy",
                "type_label": "Product Category",
                "object": "product_cat",
                "object_id": 16,
                "parent": 12,
                "order": 4,
                "children": []
              },
              {
                "id": 14,
                "title": "Pants",
                "url": "https://your-site.com/product-category/clothing/pants/",
                "target": "",
                "attr_title": "",
                "description": "",
                "classes": [],
                "xfn": "",
                "type": "taxonomy",
                "type_label": "Product Category",
                "object": "product_cat",
                "object_id": 17,
                "parent": 12,
                "order": 5,
                "children": []
              }
            ]
          },
          {
            "id": 15,
            "title": "Electronics",
            "url": "https://your-site.com/product-category/electronics/",
            "target": "",
            "attr_title": "",
            "description": "",
            "classes": [],
            "xfn": "",
            "type": "taxonomy",
            "type_label": "Product Category",
            "object": "product_cat",
            "object_id": 18,
            "parent": 11,
            "order": 6,
            "children": []
          }
        ]
      },
      {
        "id": 16,
        "title": "About",
        "url": "https://your-site.com/about/",
        "target": "",
        "attr_title": "",
        "description": "",
        "classes": [],
        "xfn": "",
        "type": "post_type",
        "type_label": "Page",
        "object": "page",
        "object_id": 20,
        "parent": 0,
        "order": 7,
        "children": []
      },
      {
        "id": 17,
        "title": "Contact",
        "url": "https://your-site.com/contact/",
        "target": "",
        "attr_title": "",
        "description": "",
        "classes": [],
        "xfn": "",
        "type": "post_type",
        "type_label": "Page",
        "object": "page",
        "object_id": 21,
        "parent": 0,
        "order": 8,
        "children": []
      }
    ]
  }
}
```

---

## Get Menu by Slug

Retrieve a menu using its slug.

```
GET /menus/slug/{slug}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/menus/slug/primary-navigation"
```

### Response

Same format as Get Menu by ID.

---

## List Menu Locations

Retrieve all registered theme menu locations.

```
GET /menus/locations
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/menus/locations"
```

### Response

```json
{
  "success": true,
  "data": {
    "primary": {
      "name": "Primary Menu",
      "description": "Main navigation menu",
      "menu_id": 2,
      "menu_name": "Primary Navigation"
    },
    "footer": {
      "name": "Footer Menu",
      "description": "Footer navigation links",
      "menu_id": 3,
      "menu_name": "Footer Menu"
    },
    "mobile": {
      "name": "Mobile Menu",
      "description": "Navigation for mobile devices",
      "menu_id": 4,
      "menu_name": "Mobile Menu"
    },
    "social": {
      "name": "Social Links",
      "description": "Social media links",
      "menu_id": null,
      "menu_name": null
    }
  }
}
```

---

## Get Menu by Location

Retrieve the menu assigned to a specific location.

```
GET /menus/locations/{location}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/menus/locations/primary"
```

### Response

```json
{
  "success": true,
  "data": {
    "location": "primary",
    "location_name": "Primary Menu",
    "menu": {
      "id": 2,
      "name": "Primary Navigation",
      "slug": "primary-navigation",
      "items": [
        // Same items structure as Get Menu by ID
      ]
    }
  }
}
```

### Error Response (No Menu Assigned)

```json
{
  "success": false,
  "code": "no_menu_assigned",
  "message": "No menu assigned to this location."
}
```

---

## JavaScript Example

```javascript
class MenusAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.cache = new Map();
  }

  async getMenus() {
    const response = await fetch(`${this.baseUrl}/menus`);
    return response.json();
  }

  async getMenu(id) {
    if (this.cache.has(`menu_${id}`)) {
      return this.cache.get(`menu_${id}`);
    }

    const response = await fetch(`${this.baseUrl}/menus/${id}`);
    const data = await response.json();
    
    this.cache.set(`menu_${id}`, data);
    return data;
  }

  async getMenuBySlug(slug) {
    const response = await fetch(`${this.baseUrl}/menus/slug/${slug}`);
    return response.json();
  }

  async getLocations() {
    const response = await fetch(`${this.baseUrl}/menus/locations`);
    return response.json();
  }

  async getMenuByLocation(location) {
    if (this.cache.has(`location_${location}`)) {
      return this.cache.get(`location_${location}`);
    }

    const response = await fetch(`${this.baseUrl}/menus/locations/${location}`);
    const data = await response.json();
    
    this.cache.set(`location_${location}`, data);
    return data;
  }
}

// Usage
const menusApi = new MenusAPI('https://your-site.com/wp-json/jexi-wch/v1');

// Get primary navigation
const primaryMenu = await menusApi.getMenuByLocation('primary');
console.log('Primary Menu:', primaryMenu.data.menu.items);

// Get footer menu
const footerMenu = await menusApi.getMenuByLocation('footer');
```

## React Navigation Component

```jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';

function MenuItem({ item, depth = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  // Convert WordPress URL to internal path
  const getPath = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname;
    } catch {
      return url;
    }
  };

  return (
    <li className={`menu-item menu-item-${item.id} depth-${depth}`}>
      <Link 
        href={getPath(item.url)}
        target={item.target || '_self'}
        className={item.classes?.join(' ')}
        title={item.attr_title || ''}
        onMouseEnter={() => hasChildren && setIsOpen(true)}
        onMouseLeave={() => hasChildren && setIsOpen(false)}
      >
        {item.title}
        {hasChildren && <span className="submenu-toggle">▼</span>}
      </Link>
      
      {hasChildren && isOpen && (
        <ul className="submenu">
          {item.children.map(child => (
            <MenuItem key={child.id} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Navigation({ location = 'primary' }) {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMenu() {
      try {
        const response = await fetch(
          `https://your-site.com/wp-json/jexi-wch/v1/menus/locations/${location}`
        );
        const data = await response.json();
        
        if (data.success) {
          setMenu(data.data.menu);
        }
      } catch (error) {
        console.error('Failed to load menu:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, [location]);

  if (loading) {
    return <nav className="loading">Loading...</nav>;
  }

  if (!menu) {
    return null;
  }

  return (
    <nav className={`navigation navigation-${location}`}>
      <ul className="menu">
        {menu.items.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
}

// Usage
<Navigation location="primary" />
<Navigation location="footer" />
```

## CSS for Menu Styling

```css
.navigation ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.navigation .menu-item {
  position: relative;
}

.navigation .menu-item a {
  display: block;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: inherit;
}

.navigation .menu-item a:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.navigation .submenu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: none;
  flex-direction: column;
}

.navigation .menu-item:hover > .submenu {
  display: flex;
}

.navigation .submenu .submenu {
  top: 0;
  left: 100%;
}

/* Mobile styles */
@media (max-width: 768px) {
  .navigation ul {
    flex-direction: column;
  }

  .navigation .submenu {
    position: static;
    box-shadow: none;
    padding-left: 1rem;
  }
}
```

## Menu Item Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Menu item ID |
| `title` | string | Display title |
| `url` | string | Link URL |
| `target` | string | Link target (_blank, _self) |
| `attr_title` | string | Title attribute |
| `description` | string | Item description |
| `classes` | array | CSS classes |
| `xfn` | string | XFN relationship |
| `type` | string | Item type |
| `type_label` | string | Human-readable type |
| `object` | string | Object type (page, category, etc.) |
| `object_id` | integer | Associated object ID |
| `parent` | integer | Parent menu item ID |
| `order` | integer | Display order |
| `children` | array | Nested menu items |

## Menu Item Types

| Type | Object | Description |
|------|--------|-------------|
| `post_type` | `page` | WordPress page |
| `post_type` | `post` | WordPress post |
| `post_type` | `product` | WooCommerce product |
| `taxonomy` | `category` | Post category |
| `taxonomy` | `product_cat` | Product category |
| `taxonomy` | `post_tag` | Post tag |
| `custom` | `custom` | Custom URL |

## Related Endpoints

- [Posts API](/api-reference/posts) - Get page content
- [Categories API](/api-reference/categories) - Product categories
- [Store API](/api-reference/store) - Site settings
