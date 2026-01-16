---
sidebar_position: 11
title: Posts & Pages
---

# Posts & Pages API

The Posts & Pages API provides access to WordPress content including blog posts, pages, custom post types, categories, tags, authors, and comments.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/content/posts` | List blog posts |
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
| GET | `/content/archives` | Get archive links |

---

## List Posts

Retrieve a list of blog posts.

```
GET /content/posts
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 10 | Items per page |
| `category` | integer | - | Category ID filter |
| `tag` | integer | - | Tag ID filter |
| `author` | integer | - | Author ID filter |
| `search` | string | - | Search query |
| `orderby` | string | date | Sort field |
| `order` | string | desc | Sort order |
| `status` | string | publish | Post status |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/content/posts?per_page=5"
```

### Response

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": 42,
        "title": "Getting Started with Headless WooCommerce",
        "slug": "getting-started-headless-woocommerce",
        "excerpt": "Learn how to build a modern e-commerce frontend using our headless API...",
        "content": "<p>Full HTML content here...</p>",
        "date": "2024-01-20T10:00:00",
        "modified": "2024-01-21T14:30:00",
        "status": "publish",
        "type": "post",
        "author": {
          "id": 1,
          "name": "John Doe",
          "avatar": "https://secure.gravatar.com/avatar/..."
        },
        "featured_image": {
          "id": 100,
          "url": "https://your-site.com/wp-content/uploads/2024/01/headless-woo.jpg",
          "alt": "Headless WooCommerce",
          "caption": "",
          "sizes": {
            "thumbnail": "https://your-site.com/wp-content/uploads/2024/01/headless-woo-150x150.jpg",
            "medium": "https://your-site.com/wp-content/uploads/2024/01/headless-woo-300x200.jpg",
            "large": "https://your-site.com/wp-content/uploads/2024/01/headless-woo-1024x683.jpg",
            "full": "https://your-site.com/wp-content/uploads/2024/01/headless-woo.jpg"
          }
        },
        "categories": [
          {
            "id": 5,
            "name": "Tutorials",
            "slug": "tutorials"
          }
        ],
        "tags": [
          {
            "id": 12,
            "name": "WooCommerce",
            "slug": "woocommerce"
          },
          {
            "id": 15,
            "name": "Headless",
            "slug": "headless"
          }
        ],
        "comment_count": 5,
        "comment_status": "open",
        "reading_time": "5 min"
      }
    ],
    "total": 25,
    "pages": 5,
    "page": 1
  }
}
```

---

## Get Single Post

Retrieve a specific blog post.

```
GET /content/posts/{id}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/content/posts/42"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 42,
    "title": "Getting Started with Headless WooCommerce",
    "slug": "getting-started-headless-woocommerce",
    "excerpt": "Learn how to build a modern e-commerce frontend...",
    "content": "<p>Full HTML content...</p>",
    "date": "2024-01-20T10:00:00",
    "modified": "2024-01-21T14:30:00",
    "status": "publish",
    "type": "post",
    "author": {
      "id": 1,
      "name": "John Doe",
      "bio": "Senior Developer at Acme Corp",
      "avatar": "https://secure.gravatar.com/avatar/...",
      "url": "https://johndoe.com"
    },
    "featured_image": {
      "id": 100,
      "url": "https://your-site.com/wp-content/uploads/2024/01/headless-woo.jpg",
      "alt": "Headless WooCommerce",
      "sizes": {}
    },
    "categories": [
      {
        "id": 5,
        "name": "Tutorials",
        "slug": "tutorials"
      }
    ],
    "tags": [
      {
        "id": 12,
        "name": "WooCommerce",
        "slug": "woocommerce"
      }
    ],
    "comment_count": 5,
    "comment_status": "open",
    "meta": {
      "_yoast_seo_title": "Getting Started with Headless WooCommerce",
      "_yoast_seo_description": "Learn how to build modern e-commerce frontends..."
    },
    "related_posts": [
      {
        "id": 38,
        "title": "React E-commerce Tutorial",
        "slug": "react-ecommerce-tutorial",
        "featured_image": "https://..."
      },
      {
        "id": 35,
        "title": "Next.js Shopping Cart",
        "slug": "nextjs-shopping-cart",
        "featured_image": "https://..."
      }
    ],
    "prev_post": {
      "id": 40,
      "title": "Previous Post Title",
      "slug": "previous-post"
    },
    "next_post": {
      "id": 44,
      "title": "Next Post Title",
      "slug": "next-post"
    }
  }
}
```

---

## Get Post by Slug

Retrieve a post using its URL slug.

```
GET /content/posts/slug/{slug}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/content/posts/slug/getting-started-headless-woocommerce"
```

---

## List Pages

Retrieve a list of WordPress pages.

```
GET /content/pages
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 10 | Items per page |
| `parent` | integer | - | Parent page ID |
| `orderby` | string | menu_order | Sort field |
| `order` | string | asc | Sort order |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/content/pages"
```

### Response

```json
{
  "success": true,
  "data": {
    "pages": [
      {
        "id": 2,
        "title": "About Us",
        "slug": "about-us",
        "excerpt": "",
        "content": "<p>About us content...</p>",
        "date": "2024-01-01T10:00:00",
        "modified": "2024-01-15T12:00:00",
        "status": "publish",
        "parent": 0,
        "menu_order": 1,
        "featured_image": null,
        "template": "default",
        "children": [
          {
            "id": 10,
            "title": "Our Team",
            "slug": "our-team"
          },
          {
            "id": 11,
            "title": "Our History",
            "slug": "our-history"
          }
        ]
      }
    ],
    "total": 15,
    "pages": 2,
    "page": 1
  }
}
```

---

## Get Single Page

Retrieve a specific page.

```
GET /content/pages/{id}
GET /content/pages/slug/{slug}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/content/pages/slug/about-us"
```

---

## List Custom Post Type

Retrieve posts from a custom post type.

```
GET /content/{post_type}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/content/testimonials?per_page=5"
```

### Response

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": 150,
        "title": "Great Service!",
        "slug": "great-service",
        "content": "<p>Testimonial content...</p>",
        "date": "2024-01-18T10:00:00",
        "type": "testimonial",
        "meta": {
          "customer_name": "Jane Smith",
          "company": "Acme Corp",
          "rating": 5
        }
      }
    ],
    "total": 12,
    "pages": 3,
    "page": 1
  }
}
```

---

## List Post Categories

Retrieve all post categories.

```
GET /content/categories
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `parent` | integer | - | Parent category ID |
| `hide_empty` | boolean | true | Hide empty categories |
| `orderby` | string | name | Sort field |
| `order` | string | asc | Sort order |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/content/categories"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 5,
      "name": "Tutorials",
      "slug": "tutorials",
      "description": "Step-by-step guides",
      "parent": 0,
      "count": 15,
      "children": []
    },
    {
      "id": 6,
      "name": "News",
      "slug": "news",
      "description": "Latest updates",
      "parent": 0,
      "count": 8,
      "children": []
    }
  ]
}
```

---

## List Post Tags

Retrieve all post tags.

```
GET /content/tags
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/content/tags"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 12,
      "name": "WooCommerce",
      "slug": "woocommerce",
      "count": 10
    },
    {
      "id": 15,
      "name": "Headless",
      "slug": "headless",
      "count": 5
    }
  ]
}
```

---

## List Authors

Retrieve post authors.

```
GET /authors
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/authors"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "slug": "john-doe",
      "bio": "Senior Developer",
      "avatar": "https://secure.gravatar.com/avatar/...",
      "url": "https://johndoe.com",
      "post_count": 15
    }
  ]
}
```

---

## Get Author Details

Retrieve a specific author with their posts.

```
GET /authors/{id}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/authors/1"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "slug": "john-doe",
    "bio": "Senior Developer at Acme Corp. Writing about web development.",
    "avatar": "https://secure.gravatar.com/avatar/...",
    "url": "https://johndoe.com",
    "post_count": 15,
    "recent_posts": [
      {
        "id": 42,
        "title": "Getting Started with Headless WooCommerce",
        "slug": "getting-started-headless-woocommerce",
        "date": "2024-01-20T10:00:00"
      }
    ],
    "social": {
      "twitter": "@johndoe",
      "github": "johndoe"
    }
  }
}
```

---

## List Comments

Retrieve comments for a post.

```
GET /content/comments
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `post_id` | integer | - | Post ID (required) |
| `page` | integer | 1 | Page number |
| `per_page` | integer | 10 | Items per page |
| `order` | string | asc | Sort order |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/content/comments?post_id=42"
```

### Response

```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "id": 100,
        "post_id": 42,
        "parent": 0,
        "author": {
          "name": "Jane Smith",
          "email_hash": "abc123",
          "avatar": "https://secure.gravatar.com/avatar/..."
        },
        "content": "<p>Great article! Very helpful.</p>",
        "date": "2024-01-21T15:00:00",
        "status": "approved",
        "children": [
          {
            "id": 101,
            "post_id": 42,
            "parent": 100,
            "author": {
              "name": "John Doe",
              "avatar": "https://secure.gravatar.com/avatar/..."
            },
            "content": "<p>Thank you!</p>",
            "date": "2024-01-21T16:00:00",
            "status": "approved",
            "children": []
          }
        ]
      }
    ],
    "total": 5,
    "pages": 1,
    "page": 1
  }
}
```

---

## Submit Comment

Add a comment to a post.

```
POST /content/comments
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `post_id` | integer | Yes | Post ID |
| `content` | string | Yes | Comment content |
| `author_name` | string | No* | Author name |
| `author_email` | string | No* | Author email |
| `author_url` | string | No | Author website |
| `parent` | integer | No | Parent comment ID |

*Required for guest comments

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/content/comments" \
  -H "Content-Type: application/json" \
  -d '{
    "post_id": 42,
    "content": "This was very helpful, thanks!",
    "author_name": "Jane Smith",
    "author_email": "jane@example.com"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 102,
    "post_id": 42,
    "content": "<p>This was very helpful, thanks!</p>",
    "status": "hold",
    "message": "Comment submitted for moderation."
  }
}
```

---

## Get Archives

Retrieve archive links (posts by month/year).

```
GET /content/archives
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | string | monthly | Archive type (monthly/yearly) |
| `post_type` | string | post | Post type |
| `limit` | integer | 12 | Number of archives |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/content/archives?type=monthly&limit=6"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "year": 2024,
      "month": 1,
      "label": "January 2024",
      "count": 5,
      "url": "/2024/01/"
    },
    {
      "year": 2023,
      "month": 12,
      "label": "December 2023",
      "count": 3,
      "url": "/2023/12/"
    }
  ]
}
```

---

## JavaScript Example

```javascript
class ContentAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getPosts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `${this.baseUrl}/content/posts${query ? `?${query}` : ''}`
    );
    return response.json();
  }

  async getPost(idOrSlug) {
    const endpoint = typeof idOrSlug === 'number'
      ? `/content/posts/${idOrSlug}`
      : `/content/posts/slug/${idOrSlug}`;
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    return response.json();
  }

  async getPages(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `${this.baseUrl}/content/pages${query ? `?${query}` : ''}`
    );
    return response.json();
  }

  async getPage(idOrSlug) {
    const endpoint = typeof idOrSlug === 'number'
      ? `/content/pages/${idOrSlug}`
      : `/content/pages/slug/${idOrSlug}`;
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    return response.json();
  }

  async getCategories() {
    const response = await fetch(`${this.baseUrl}/content/categories`);
    return response.json();
  }

  async getTags() {
    const response = await fetch(`${this.baseUrl}/content/tags`);
    return response.json();
  }

  async getAuthors() {
    const response = await fetch(`${this.baseUrl}/authors`);
    return response.json();
  }

  async getAuthor(id) {
    const response = await fetch(`${this.baseUrl}/authors/${id}`);
    return response.json();
  }

  async getComments(postId, params = {}) {
    const query = new URLSearchParams({ post_id: postId, ...params }).toString();
    const response = await fetch(`${this.baseUrl}/content/comments?${query}`);
    return response.json();
  }

  async submitComment(postId, content, author = {}) {
    const response = await fetch(`${this.baseUrl}/content/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        post_id: postId,
        content,
        ...author,
      }),
    });
    return response.json();
  }

  async getArchives(type = 'monthly', limit = 12) {
    const response = await fetch(
      `${this.baseUrl}/content/archives?type=${type}&limit=${limit}`
    );
    return response.json();
  }

  async getCustomPostType(postType, params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `${this.baseUrl}/content/${postType}${query ? `?${query}` : ''}`
    );
    return response.json();
  }
}

// Usage
const content = new ContentAPI('https://your-site.com/wp-json/jexi-wch/v1');

// Get latest posts
const posts = await content.getPosts({ per_page: 10 });
console.log('Posts:', posts.data.posts);

// Get single post by slug
const post = await content.getPost('getting-started-headless-woocommerce');
console.log('Post:', post.data.title);

// Get page by slug
const aboutPage = await content.getPage('about-us');
console.log('About:', aboutPage.data.content);

// Get posts by category
const tutorials = await content.getPosts({ category: 5 });

// Get posts by author
const authorPosts = await content.getPosts({ author: 1 });

// Submit a comment
const comment = await content.submitComment(42, 'Great article!', {
  author_name: 'Jane Smith',
  author_email: 'jane@example.com',
});

// Get custom post type
const testimonials = await content.getCustomPostType('testimonials');
```

## SEO Considerations

The API returns SEO meta fields when available:

```json
{
  "meta": {
    "_yoast_seo_title": "Custom SEO Title",
    "_yoast_seo_description": "Custom meta description",
    "_yoast_schema_article": "Article schema data"
  }
}
```

Use these for:
- Page `<title>` tags
- Meta descriptions
- Open Graph tags
- Structured data

## Related Endpoints

- [Menus API](/api-reference/menus) - Navigation menus
- [Media API](/api-reference/media) - Images and files
- [Store API](/api-reference/store) - Site information
