---
sidebar_position: 12
title: Media
---

# Media API

The Media API provides access to WordPress media library items including images, videos, audio files, and documents.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/media` | List media items |
| GET | `/media/{id}` | Get single media item |
| GET | `/media/post/{post_id}` | Get media attached to post |
| GET | `/media/gallery` | Get gallery images |
| GET | `/media/sizes` | Get registered image sizes |

---

## List Media

Retrieve a list of media items.

```
GET /media
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 10 | Items per page |
| `media_type` | string | - | Filter by type (image/video/audio/application) |
| `mime_type` | string | - | Filter by MIME type |
| `search` | string | - | Search media |
| `author` | integer | - | Author ID filter |
| `orderby` | string | date | Sort field |
| `order` | string | desc | Sort order |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/media?media_type=image&per_page=20"
```

### Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 150,
        "title": "Product Hero Image",
        "caption": "Featured product showcase",
        "alt": "Premium T-Shirt",
        "description": "Main product image for the premium collection",
        "date": "2024-01-15T10:00:00",
        "modified": "2024-01-15T10:00:00",
        "author": 1,
        "slug": "product-hero-image",
        "mime_type": "image/jpeg",
        "media_type": "image",
        "source_url": "https://your-site.com/wp-content/uploads/2024/01/product-hero.jpg",
        "width": 1920,
        "height": 1080,
        "file_size": 245760,
        "sizes": {
          "thumbnail": {
            "url": "https://your-site.com/wp-content/uploads/2024/01/product-hero-150x150.jpg",
            "width": 150,
            "height": 150
          },
          "medium": {
            "url": "https://your-site.com/wp-content/uploads/2024/01/product-hero-300x169.jpg",
            "width": 300,
            "height": 169
          },
          "medium_large": {
            "url": "https://your-site.com/wp-content/uploads/2024/01/product-hero-768x432.jpg",
            "width": 768,
            "height": 432
          },
          "large": {
            "url": "https://your-site.com/wp-content/uploads/2024/01/product-hero-1024x576.jpg",
            "width": 1024,
            "height": 576
          },
          "full": {
            "url": "https://your-site.com/wp-content/uploads/2024/01/product-hero.jpg",
            "width": 1920,
            "height": 1080
          },
          "woocommerce_thumbnail": {
            "url": "https://your-site.com/wp-content/uploads/2024/01/product-hero-300x300.jpg",
            "width": 300,
            "height": 300
          },
          "woocommerce_single": {
            "url": "https://your-site.com/wp-content/uploads/2024/01/product-hero-600x338.jpg",
            "width": 600,
            "height": 338
          },
          "woocommerce_gallery_thumbnail": {
            "url": "https://your-site.com/wp-content/uploads/2024/01/product-hero-100x100.jpg",
            "width": 100,
            "height": 100
          }
        }
      }
    ],
    "total": 156,
    "pages": 8,
    "page": 1
  }
}
```

---

## Get Single Media

Retrieve details of a specific media item.

```
GET /media/{id}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/media/150"
```

### Response - Image

```json
{
  "success": true,
  "data": {
    "id": 150,
    "title": "Product Hero Image",
    "caption": "Featured product showcase",
    "alt": "Premium T-Shirt",
    "description": "Main product image for the premium collection",
    "date": "2024-01-15T10:00:00",
    "modified": "2024-01-15T10:00:00",
    "author": {
      "id": 1,
      "name": "John Doe"
    },
    "slug": "product-hero-image",
    "mime_type": "image/jpeg",
    "media_type": "image",
    "source_url": "https://your-site.com/wp-content/uploads/2024/01/product-hero.jpg",
    "width": 1920,
    "height": 1080,
    "file_size": 245760,
    "file_size_formatted": "240 KB",
    "sizes": {
      "thumbnail": {
        "url": "https://your-site.com/wp-content/uploads/2024/01/product-hero-150x150.jpg",
        "width": 150,
        "height": 150
      },
      "medium": {
        "url": "https://your-site.com/wp-content/uploads/2024/01/product-hero-300x169.jpg",
        "width": 300,
        "height": 169
      },
      "large": {
        "url": "https://your-site.com/wp-content/uploads/2024/01/product-hero-1024x576.jpg",
        "width": 1024,
        "height": 576
      },
      "full": {
        "url": "https://your-site.com/wp-content/uploads/2024/01/product-hero.jpg",
        "width": 1920,
        "height": 1080
      }
    },
    "image_meta": {
      "aperture": "2.8",
      "camera": "Canon EOS R5",
      "created_timestamp": "1705312000",
      "focal_length": "50",
      "iso": "100",
      "shutter_speed": "0.004",
      "copyright": "© 2024 Photographer Name",
      "keywords": ["product", "fashion", "clothing"]
    },
    "attached_to": {
      "post_id": 47,
      "post_title": "Premium T-Shirt",
      "post_type": "product"
    }
  }
}
```

### Response - Video

```json
{
  "success": true,
  "data": {
    "id": 200,
    "title": "Product Demo Video",
    "caption": "Watch our product in action",
    "description": "",
    "date": "2024-01-18T14:00:00",
    "slug": "product-demo-video",
    "mime_type": "video/mp4",
    "media_type": "video",
    "source_url": "https://your-site.com/wp-content/uploads/2024/01/product-demo.mp4",
    "file_size": 15728640,
    "file_size_formatted": "15 MB",
    "video_meta": {
      "width": 1920,
      "height": 1080,
      "length": 120,
      "length_formatted": "2:00",
      "bitrate": "1048576",
      "codec": "h264"
    },
    "poster": {
      "url": "https://your-site.com/wp-content/uploads/2024/01/product-demo-poster.jpg",
      "width": 1920,
      "height": 1080
    }
  }
}
```

### Response - Audio

```json
{
  "success": true,
  "data": {
    "id": 210,
    "title": "Background Music",
    "mime_type": "audio/mpeg",
    "media_type": "audio",
    "source_url": "https://your-site.com/wp-content/uploads/2024/01/background.mp3",
    "file_size": 5242880,
    "audio_meta": {
      "length": 180,
      "length_formatted": "3:00",
      "bitrate": "320000",
      "artist": "Artist Name",
      "album": "Album Name",
      "year": "2024"
    }
  }
}
```

---

## Get Media by Post

Retrieve all media attached to a specific post/product.

```
GET /media/post/{post_id}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/media/post/47"
```

### Response

```json
{
  "success": true,
  "data": {
    "post_id": 47,
    "post_title": "Premium T-Shirt",
    "featured_image": {
      "id": 150,
      "url": "https://your-site.com/wp-content/uploads/2024/01/product-hero.jpg",
      "alt": "Premium T-Shirt",
      "sizes": {}
    },
    "gallery": [
      {
        "id": 151,
        "url": "https://your-site.com/wp-content/uploads/2024/01/product-front.jpg",
        "alt": "Front view",
        "sizes": {}
      },
      {
        "id": 152,
        "url": "https://your-site.com/wp-content/uploads/2024/01/product-back.jpg",
        "alt": "Back view",
        "sizes": {}
      },
      {
        "id": 153,
        "url": "https://your-site.com/wp-content/uploads/2024/01/product-detail.jpg",
        "alt": "Detail view",
        "sizes": {}
      }
    ],
    "attachments": [
      {
        "id": 160,
        "title": "Size Guide PDF",
        "mime_type": "application/pdf",
        "url": "https://your-site.com/wp-content/uploads/2024/01/size-guide.pdf",
        "file_size": 102400
      }
    ]
  }
}
```

---

## Get Gallery

Retrieve images from a gallery (shortcode or block).

```
GET /media/gallery
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ids` | string | Comma-separated image IDs |
| `orderby` | string | Sort field (menu_order/title/date/rand) |
| `order` | string | Sort order |
| `columns` | integer | Gallery columns (metadata) |
| `size` | string | Image size to return |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/media/gallery?ids=151,152,153,154&size=medium"
```

### Response

```json
{
  "success": true,
  "data": {
    "images": [
      {
        "id": 151,
        "title": "Gallery Image 1",
        "alt": "Description",
        "caption": "Image caption",
        "url": "https://your-site.com/wp-content/uploads/2024/01/gallery-1-300x200.jpg",
        "full_url": "https://your-site.com/wp-content/uploads/2024/01/gallery-1.jpg",
        "width": 300,
        "height": 200,
        "sizes": {}
      }
    ],
    "columns": 4,
    "count": 4
  }
}
```

---

## Get Image Sizes

Retrieve all registered image sizes.

```
GET /media/sizes
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/media/sizes"
```

### Response

```json
{
  "success": true,
  "data": {
    "thumbnail": {
      "width": 150,
      "height": 150,
      "crop": true
    },
    "medium": {
      "width": 300,
      "height": 300,
      "crop": false
    },
    "medium_large": {
      "width": 768,
      "height": 0,
      "crop": false
    },
    "large": {
      "width": 1024,
      "height": 1024,
      "crop": false
    },
    "1536x1536": {
      "width": 1536,
      "height": 1536,
      "crop": false
    },
    "2048x2048": {
      "width": 2048,
      "height": 2048,
      "crop": false
    },
    "woocommerce_thumbnail": {
      "width": 300,
      "height": 300,
      "crop": true
    },
    "woocommerce_single": {
      "width": 600,
      "height": 600,
      "crop": true
    },
    "woocommerce_gallery_thumbnail": {
      "width": 100,
      "height": 100,
      "crop": true
    }
  }
}
```

---

## JavaScript Example

```javascript
class MediaAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getMedia(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `${this.baseUrl}/media${query ? `?${query}` : ''}`
    );
    return response.json();
  }

  async getMediaItem(id) {
    const response = await fetch(`${this.baseUrl}/media/${id}`);
    return response.json();
  }

  async getPostMedia(postId) {
    const response = await fetch(`${this.baseUrl}/media/post/${postId}`);
    return response.json();
  }

  async getGallery(ids, size = 'medium') {
    const response = await fetch(
      `${this.baseUrl}/media/gallery?ids=${ids.join(',')}&size=${size}`
    );
    return response.json();
  }

  async getImageSizes() {
    const response = await fetch(`${this.baseUrl}/media/sizes`);
    return response.json();
  }

  // Helper to get optimal image size
  getOptimalSize(sizes, maxWidth) {
    const sizeKeys = Object.keys(sizes).sort((a, b) => {
      return sizes[a].width - sizes[b].width;
    });

    for (const key of sizeKeys) {
      if (sizes[key].width >= maxWidth) {
        return sizes[key];
      }
    }

    return sizes.full || sizes[sizeKeys[sizeKeys.length - 1]];
  }
}

// Usage
const mediaApi = new MediaAPI('https://your-site.com/wp-json/jexi-wch/v1');

// Get images
const images = await mediaApi.getMedia({
  media_type: 'image',
  per_page: 20,
});

// Get product images
const productMedia = await mediaApi.getPostMedia(47);
console.log('Featured:', productMedia.data.featured_image);
console.log('Gallery:', productMedia.data.gallery);

// Get gallery by IDs
const gallery = await mediaApi.getGallery([151, 152, 153, 154], 'large');

// Get registered sizes
const sizes = await mediaApi.getImageSizes();
console.log('WooCommerce thumbnail:', sizes.data.woocommerce_thumbnail);
```

## React Image Component

```jsx
function ResponsiveImage({ media, size = 'large', className = '' }) {
  if (!media) return null;

  const { title, alt, sizes, source_url } = media;
  const imgSrc = sizes?.[size]?.url || source_url;
  
  // Build srcset for responsive images
  const srcSet = sizes ? Object.entries(sizes)
    .filter(([key]) => key !== 'full')
    .map(([key, data]) => `${data.url} ${data.width}w`)
    .join(', ') : '';

  return (
    <img
      src={imgSrc}
      srcSet={srcSet}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      alt={alt || title || ''}
      className={className}
      loading="lazy"
    />
  );
}

// Usage
<ResponsiveImage media={product.featured_image} size="woocommerce_single" />
```

## Lightbox Gallery Component

```jsx
import { useState } from 'react';

function ProductGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  return (
    <div className="product-gallery">
      {/* Main Image */}
      <div 
        className="main-image"
        onClick={() => setShowLightbox(true)}
      >
        <img 
          src={images[activeIndex]?.sizes?.large?.url || images[activeIndex]?.url}
          alt={images[activeIndex]?.alt}
        />
      </div>

      {/* Thumbnails */}
      <div className="thumbnails">
        {images.map((image, index) => (
          <button
            key={image.id}
            className={index === activeIndex ? 'active' : ''}
            onClick={() => setActiveIndex(index)}
          >
            <img 
              src={image.sizes?.thumbnail?.url || image.url}
              alt={image.alt}
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div className="lightbox" onClick={() => setShowLightbox(false)}>
          <button 
            className="prev"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(i => (i > 0 ? i - 1 : images.length - 1));
            }}
          >
            ←
          </button>
          
          <img 
            src={images[activeIndex]?.sizes?.full?.url || images[activeIndex]?.url}
            alt={images[activeIndex]?.alt}
            onClick={(e) => e.stopPropagation()}
          />
          
          <button 
            className="next"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(i => (i < images.length - 1 ? i + 1 : 0));
            }}
          >
            →
          </button>
          
          <button className="close" onClick={() => setShowLightbox(false)}>
            ×
          </button>
        </div>
      )}
    </div>
  );
}
```

## Image Size Recommendations

| Use Case | Recommended Size |
|----------|------------------|
| Product listing | `woocommerce_thumbnail` |
| Product page | `woocommerce_single` |
| Cart thumbnail | `woocommerce_gallery_thumbnail` |
| Blog featured | `large` or `medium_large` |
| Lightbox/zoom | `full` |
| Thumbnails | `thumbnail` |
| Hero images | `2048x2048` or `full` |

## Related Endpoints

- [Products API](/api-reference/products) - Product images
- [Posts API](/api-reference/posts) - Featured images
- [Store API](/api-reference/store) - Site logo
