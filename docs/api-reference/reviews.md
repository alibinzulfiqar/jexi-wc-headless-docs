---
sidebar_position: 14
title: Reviews
---

# Reviews API

The Reviews API provides access to WooCommerce product reviews, enabling customers to read and submit reviews from your headless frontend.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/reviews` | List all reviews |
| GET | `/reviews/{id}` | Get single review |
| GET | `/reviews/product/{product_id}` | Get reviews for a product |
| GET | `/reviews/summary/{product_id}` | Get review summary/stats |
| POST | `/reviews` | Submit a review |

---

## List All Reviews

Retrieve reviews across all products.

```
GET /reviews
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 10 | Items per page |
| `product` | integer | - | Product ID filter |
| `status` | string | approved | Review status |
| `rating` | integer | - | Filter by rating (1-5) |
| `orderby` | string | date | Sort field |
| `order` | string | desc | Sort order |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/reviews?per_page=10"
```

### Response

```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": 25,
        "product_id": 47,
        "product_name": "Premium T-Shirt",
        "product_image": "https://your-site.com/wp-content/uploads/product.jpg",
        "reviewer": {
          "name": "John Doe",
          "email_hash": "abc123xyz",
          "avatar": "https://secure.gravatar.com/avatar/abc123"
        },
        "rating": 5,
        "review": "<p>Excellent quality! The fabric is soft and the fit is perfect. Highly recommend.</p>",
        "verified": true,
        "date_created": "2024-01-20T15:30:00",
        "status": "approved",
        "helpful_count": 5
      },
      {
        "id": 24,
        "product_id": 48,
        "product_name": "Classic Hoodie",
        "product_image": "https://your-site.com/wp-content/uploads/hoodie.jpg",
        "reviewer": {
          "name": "Jane Smith",
          "email_hash": "def456xyz",
          "avatar": "https://secure.gravatar.com/avatar/def456"
        },
        "rating": 4,
        "review": "<p>Great hoodie, very comfortable. Only giving 4 stars because shipping was slow.</p>",
        "verified": true,
        "date_created": "2024-01-19T10:00:00",
        "status": "approved",
        "helpful_count": 2
      }
    ],
    "total": 45,
    "pages": 5,
    "page": 1
  }
}
```

---

## Get Single Review

Retrieve a specific review.

```
GET /reviews/{id}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/reviews/25"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 25,
    "product_id": 47,
    "product_name": "Premium T-Shirt",
    "product_url": "https://your-site.com/product/premium-t-shirt/",
    "product_image": {
      "url": "https://your-site.com/wp-content/uploads/product.jpg",
      "alt": "Premium T-Shirt"
    },
    "reviewer": {
      "name": "John Doe",
      "email_hash": "abc123xyz",
      "avatar": "https://secure.gravatar.com/avatar/abc123"
    },
    "rating": 5,
    "review": "<p>Excellent quality! The fabric is soft and the fit is perfect. Highly recommend.</p>",
    "verified": true,
    "date_created": "2024-01-20T15:30:00",
    "date_created_formatted": "January 20, 2024",
    "status": "approved",
    "helpful_count": 5,
    "images": [
      {
        "url": "https://your-site.com/wp-content/uploads/review-images/review-25-1.jpg",
        "thumbnail": "https://your-site.com/wp-content/uploads/review-images/review-25-1-150x150.jpg"
      }
    ]
  }
}
```

---

## Get Product Reviews

Retrieve all reviews for a specific product.

```
GET /reviews/product/{product_id}
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 10 | Items per page |
| `rating` | integer | - | Filter by rating |
| `verified` | boolean | - | Filter verified only |
| `orderby` | string | date | Sort field |
| `order` | string | desc | Sort order |

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/reviews/product/47?per_page=5"
```

### Response

```json
{
  "success": true,
  "data": {
    "product_id": 47,
    "product_name": "Premium T-Shirt",
    "reviews": [
      {
        "id": 25,
        "reviewer": {
          "name": "John Doe",
          "avatar": "https://secure.gravatar.com/avatar/abc123"
        },
        "rating": 5,
        "review": "<p>Excellent quality! The fabric is soft and the fit is perfect.</p>",
        "verified": true,
        "date_created": "2024-01-20T15:30:00",
        "helpful_count": 5
      },
      {
        "id": 22,
        "reviewer": {
          "name": "Alice Johnson",
          "avatar": "https://secure.gravatar.com/avatar/xyz789"
        },
        "rating": 4,
        "review": "<p>Good shirt, runs a bit small. Order a size up!</p>",
        "verified": true,
        "date_created": "2024-01-15T09:00:00",
        "helpful_count": 8
      }
    ],
    "total": 12,
    "pages": 3,
    "page": 1
  }
}
```

---

## Get Review Summary

Retrieve rating summary statistics for a product.

```
GET /reviews/summary/{product_id}
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/reviews/summary/47"
```

### Response

```json
{
  "success": true,
  "data": {
    "product_id": 47,
    "product_name": "Premium T-Shirt",
    "average_rating": 4.6,
    "review_count": 12,
    "rating_breakdown": {
      "5": {
        "count": 7,
        "percentage": 58
      },
      "4": {
        "count": 3,
        "percentage": 25
      },
      "3": {
        "count": 1,
        "percentage": 8
      },
      "2": {
        "count": 1,
        "percentage": 8
      },
      "1": {
        "count": 0,
        "percentage": 0
      }
    },
    "verified_count": 10,
    "with_images_count": 3,
    "recommended_percentage": 83
  }
}
```

---

## Submit Review

Create a new product review.

```
POST /reviews
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `product_id` | integer | Yes | Product ID |
| `rating` | integer | Yes | Rating (1-5) |
| `review` | string | Yes | Review content |
| `reviewer` | string | No* | Reviewer name |
| `reviewer_email` | string | No* | Reviewer email |

*Required for guest reviews

### Request Example - Authenticated User

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/reviews" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 47,
    "rating": 5,
    "review": "Amazing product! Exceeded my expectations. The quality is outstanding."
  }'
```

### Request Example - Guest

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/reviews" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 47,
    "rating": 5,
    "review": "Amazing product! Exceeded my expectations.",
    "reviewer": "Jane Smith",
    "reviewer_email": "jane@example.com"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 30,
    "product_id": 47,
    "rating": 5,
    "review": "<p>Amazing product! Exceeded my expectations. The quality is outstanding.</p>",
    "status": "hold",
    "message": "Thank you for your review! It will be published after moderation.",
    "verified": true
  }
}
```

### Response - Immediate Approval

```json
{
  "success": true,
  "data": {
    "id": 30,
    "product_id": 47,
    "rating": 5,
    "review": "<p>Amazing product! Exceeded my expectations.</p>",
    "status": "approved",
    "message": "Thank you for your review!",
    "verified": true
  }
}
```

### Error Responses

```json
{
  "success": false,
  "code": "already_reviewed",
  "message": "You have already reviewed this product."
}
```

```json
{
  "success": false,
  "code": "not_purchased",
  "message": "Only customers who purchased this product can leave a review."
}
```

---

## JavaScript Example

```javascript
class ReviewsAPI {
  constructor(baseUrl, token = null) {
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

  async getReviews(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `${this.baseUrl}/reviews${query ? `?${query}` : ''}`
    );
    return response.json();
  }

  async getReview(reviewId) {
    const response = await fetch(`${this.baseUrl}/reviews/${reviewId}`);
    return response.json();
  }

  async getProductReviews(productId, params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `${this.baseUrl}/reviews/product/${productId}${query ? `?${query}` : ''}`
    );
    return response.json();
  }

  async getReviewSummary(productId) {
    const response = await fetch(
      `${this.baseUrl}/reviews/summary/${productId}`
    );
    return response.json();
  }

  async submitReview(productId, rating, review, guestInfo = null) {
    const body = {
      product_id: productId,
      rating,
      review,
    };

    if (guestInfo) {
      body.reviewer = guestInfo.name;
      body.reviewer_email = guestInfo.email;
    }

    const response = await fetch(`${this.baseUrl}/reviews`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    return response.json();
  }
}

// Usage
const reviewsApi = new ReviewsAPI(
  'https://your-site.com/wp-json/jexi-wch/v1',
  'USER_AUTH_TOKEN'
);

// Get product reviews
const reviews = await reviewsApi.getProductReviews(47);
console.log('Reviews:', reviews.data.reviews);

// Get review summary
const summary = await reviewsApi.getReviewSummary(47);
console.log(`Average: ${summary.data.average_rating} (${summary.data.review_count} reviews)`);

// Submit a review (authenticated)
const newReview = await reviewsApi.submitReview(
  47,
  5,
  'This product is amazing! Highly recommend.'
);

// Submit a review (guest)
const guestReview = await reviewsApi.submitReview(
  47,
  4,
  'Good product, fast shipping.',
  { name: 'Jane Smith', email: 'jane@example.com' }
);
```

## React Review Components

### Star Rating Display

```jsx
function StarRating({ rating, max = 5, size = 'md' }) {
  return (
    <div className={`star-rating star-rating-${size}`}>
      {[...Array(max)].map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        
        return (
          <span
            key={i}
            className={`star ${filled ? 'filled' : half ? 'half' : 'empty'}`}
          >
            ★
          </span>
        );
      })}
      <span className="rating-value">{rating.toFixed(1)}</span>
    </div>
  );
}
```

### Rating Summary Component

```jsx
function RatingSummary({ summary }) {
  const { average_rating, review_count, rating_breakdown } = summary;

  return (
    <div className="rating-summary">
      <div className="average">
        <span className="number">{average_rating.toFixed(1)}</span>
        <StarRating rating={average_rating} />
        <span className="count">{review_count} reviews</span>
      </div>
      
      <div className="breakdown">
        {[5, 4, 3, 2, 1].map(stars => (
          <div key={stars} className="breakdown-row">
            <span className="stars">{stars} ★</span>
            <div className="bar">
              <div 
                className="fill"
                style={{ width: `${rating_breakdown[stars].percentage}%` }}
              />
            </div>
            <span className="count">{rating_breakdown[stars].count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Review Form Component

```jsx
import { useState } from 'react';

function ReviewForm({ productId, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (review.trim().length < 10) {
      setError('Review must be at least 10 characters');
      return;
    }

    setSubmitting(true);
    try {
      const result = await onSubmit(productId, rating, review);
      if (result.success) {
        setRating(0);
        setReview('');
        alert('Thank you for your review!');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Write a Review</h3>
      
      {error && <div className="error">{error}</div>}
      
      <div className="rating-input">
        <label>Your Rating:</label>
        <div className="stars-input">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              className={`star ${star <= (hoveredRating || rating) ? 'active' : ''}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      
      <div className="review-input">
        <label>Your Review:</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your experience with this product..."
          rows={5}
          required
        />
      </div>
      
      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
```

### Reviews List Component

```jsx
function ReviewsList({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ rating: null, verified: false });
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadReviews() {
      setLoading(true);
      const params = { page, per_page: 5 };
      if (filter.rating) params.rating = filter.rating;
      if (filter.verified) params.verified = true;

      const [reviewsRes, summaryRes] = await Promise.all([
        reviewsApi.getProductReviews(productId, params),
        reviewsApi.getReviewSummary(productId),
      ]);

      setReviews(reviewsRes.data.reviews);
      setSummary(summaryRes.data);
      setLoading(false);
    }
    loadReviews();
  }, [productId, page, filter]);

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div className="reviews-section">
      {summary && <RatingSummary summary={summary} />}
      
      <div className="review-filters">
        <select 
          value={filter.rating || ''}
          onChange={(e) => setFilter(f => ({ ...f, rating: e.target.value || null }))}
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
        
        <label>
          <input
            type="checkbox"
            checked={filter.verified}
            onChange={(e) => setFilter(f => ({ ...f, verified: e.target.checked }))}
          />
          Verified purchases only
        </label>
      </div>
      
      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="reviewer">
              <img src={review.reviewer.avatar} alt="" />
              <span className="name">{review.reviewer.name}</span>
              {review.verified && <span className="verified">✓ Verified</span>}
            </div>
            <StarRating rating={review.rating} size="sm" />
            <div 
              className="content"
              dangerouslySetInnerHTML={{ __html: review.review }}
            />
            <div className="date">
              {new Date(review.date_created).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
      
      <ReviewForm 
        productId={productId}
        onSubmit={(pid, rating, text) => reviewsApi.submitReview(pid, rating, text)}
      />
    </div>
  );
}
```

## Related Endpoints

- [Products API](/api-reference/products) - Product details
- [Customers API](/api-reference/customers) - Customer accounts
- [Authentication API](/api-reference/authentication) - User authentication
