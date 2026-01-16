---
sidebar_position: 4
title: Authentication
---

# Authentication API

The Authentication API provides token-based authentication for customer accounts, enabling secure login, registration, and profile management without WordPress sessions.

## How It Works

1. User logs in or registers via API
2. Server returns a JWT-like token
3. Frontend stores token (localStorage/cookies)
4. Include token in Authorization header for protected requests
5. Tokens expire after 7 days (configurable)

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login |
| POST | `/auth/register` | User registration |
| GET | `/auth/validate` | Validate token |
| POST | `/auth/refresh` | Refresh token |
| POST | `/auth/logout` | Logout (invalidate token) |
| POST | `/auth/forgot-password` | Request password reset |
| POST | `/auth/reset-password` | Reset password with key |
| POST | `/auth/change-password` | Change password (authenticated) |
| GET | `/auth/me` | Get current user |
| PUT | `/auth/me` | Update current user |

---

## Login

Authenticate a user and receive an access token.

```
POST /auth/login
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | Username or email |
| `password` | string | Yes | User password |

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john@example.com",
    "password": "mypassword"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 604800,
    "user": {
      "id": 5,
      "email": "john@example.com",
      "username": "johndoe",
      "display_name": "John Doe",
      "first_name": "John",
      "last_name": "Doe",
      "avatar": "https://secure.gravatar.com/avatar/..."
    }
  }
}
```

### Error Response

```json
{
  "success": false,
  "code": "authentication_failed",
  "message": "Invalid username or password."
}
```

---

## Register

Create a new user account.

```
POST /auth/register
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | Email address |
| `password` | string | Yes | Password (min 6 characters) |
| `first_name` | string | No | First name |
| `last_name` | string | No | Last name |
| `username` | string | No | Username (defaults to email) |

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "securepassword",
    "first_name": "Jane",
    "last_name": "Smith"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "message": "Registration successful.",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 604800,
    "user": {
      "id": 10,
      "email": "newuser@example.com",
      "username": "newuser@example.com",
      "display_name": "Jane Smith",
      "first_name": "Jane",
      "last_name": "Smith",
      "avatar": "https://secure.gravatar.com/avatar/..."
    }
  }
}
```

### Error Responses

```json
{
  "success": false,
  "code": "email_exists",
  "message": "An account with this email already exists."
}
```

```json
{
  "success": false,
  "code": "registration_disabled",
  "message": "Registration is not allowed."
}
```

---

## Validate Token

Check if a token is valid.

```
GET /auth/validate
```

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/auth/validate" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

### Response

```json
{
  "success": true,
  "data": {
    "valid": true,
    "user": {
      "id": 5,
      "email": "john@example.com",
      "display_name": "John Doe"
    }
  }
}
```

### Invalid Token Response

```json
{
  "success": false,
  "code": "invalid_token",
  "message": "Invalid or expired token."
}
```

---

## Refresh Token

Get a new token before the current one expires.

```
POST /auth/refresh
```

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/auth/refresh" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

### Response

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 604800
  }
}
```

---

## Logout

Invalidate the current token.

```
POST /auth/logout
```

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/auth/logout" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

### Response

```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully."
  }
}
```

---

## Forgot Password

Request a password reset email.

```
POST /auth/forgot-password
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | Email address |

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/auth/forgot-password" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

### Response

Always returns success to prevent email enumeration:

```json
{
  "success": true,
  "data": {
    "message": "If an account with that email exists, a password reset link has been sent."
  }
}
```

---

## Reset Password

Reset password using the key from email.

```
POST /auth/reset-password
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | string | Yes | Reset key from email |
| `login` | string | Yes | Username |
| `password` | string | Yes | New password |

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/auth/reset-password" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "abc123xyz789",
    "login": "johndoe",
    "password": "newpassword123"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "message": "Password reset successfully.",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 604800,
    "user": {
      "id": 5,
      "email": "john@example.com",
      "display_name": "John Doe"
    }
  }
}
```

---

## Change Password

Change password for authenticated user.

```
POST /auth/change-password
```

**Requires Authentication**

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `current_password` | string | Yes | Current password |
| `new_password` | string | Yes | New password |

### Request Example

```bash
curl -X POST "https://your-site.com/wp-json/jexi-wch/v1/auth/change-password" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -H "Content-Type: application/json" \
  -d '{
    "current_password": "oldpassword",
    "new_password": "newpassword123"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "message": "Password changed successfully.",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 604800
  }
}
```

---

## Get Current User

Retrieve the authenticated user's profile.

```
GET /auth/me
```

**Requires Authentication**

### Request Example

```bash
curl -X GET "https://your-site.com/wp-json/jexi-wch/v1/auth/me" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 5,
    "email": "john@example.com",
    "username": "johndoe",
    "display_name": "John Doe",
    "first_name": "John",
    "last_name": "Doe",
    "avatar": "https://secure.gravatar.com/avatar/...",
    "registered": "2024-01-15T10:30:00",
    "roles": ["customer"],
    "billing": {
      "first_name": "John",
      "last_name": "Doe",
      "company": "Acme Inc",
      "address_1": "123 Main St",
      "address_2": "",
      "city": "New York",
      "postcode": "10001",
      "country": "US",
      "state": "NY",
      "email": "john@example.com",
      "phone": "555-123-4567"
    },
    "shipping": {
      "first_name": "John",
      "last_name": "Doe",
      "company": "",
      "address_1": "123 Main St",
      "address_2": "",
      "city": "New York",
      "postcode": "10001",
      "country": "US",
      "state": "NY"
    },
    "is_paying_customer": true,
    "order_count": 5,
    "total_spent": "450.00"
  }
}
```

---

## Update Current User

Update the authenticated user's profile.

```
PUT /auth/me
```

**Requires Authentication**

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `first_name` | string | No | First name |
| `last_name` | string | No | Last name |
| `email` | string | No | Email address |
| `display_name` | string | No | Display name |

### Request Example

```bash
curl -X PUT "https://your-site.com/wp-json/jexi-wch/v1/auth/me" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Johnny",
    "last_name": "Doe",
    "display_name": "Johnny D"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "message": "Profile updated successfully.",
    "user": {
      "id": 5,
      "email": "john@example.com",
      "display_name": "Johnny D",
      "first_name": "Johnny",
      "last_name": "Doe"
    }
  }
}
```

---

## JavaScript Example

```javascript
class AuthAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('auth_token');
  }

  getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  async login(username, password) {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    const result = await response.json();
    
    if (result.success) {
      this.setToken(result.data.token);
    }
    
    return result;
  }

  async register(email, password, firstName = '', lastName = '') {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      }),
    });
    
    const result = await response.json();
    
    if (result.success) {
      this.setToken(result.data.token);
    }
    
    return result;
  }

  async validateToken() {
    if (!this.token) return { success: false };
    
    const response = await fetch(`${this.baseUrl}/auth/validate`, {
      headers: this.getHeaders(),
    });
    
    return response.json();
  }

  async refreshToken() {
    if (!this.token) return { success: false };
    
    const response = await fetch(`${this.baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: this.getHeaders(),
    });
    
    const result = await response.json();
    
    if (result.success) {
      this.setToken(result.data.token);
    }
    
    return result;
  }

  async logout() {
    const response = await fetch(`${this.baseUrl}/auth/logout`, {
      method: 'POST',
      headers: this.getHeaders(),
    });
    
    this.clearToken();
    return response.json();
  }

  async getCurrentUser() {
    const response = await fetch(`${this.baseUrl}/auth/me`, {
      headers: this.getHeaders(),
    });
    
    return response.json();
  }

  async updateProfile(data) {
    const response = await fetch(`${this.baseUrl}/auth/me`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    
    return response.json();
  }

  async forgotPassword(email) {
    const response = await fetch(`${this.baseUrl}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    return response.json();
  }

  async resetPassword(key, login, password) {
    const response = await fetch(`${this.baseUrl}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, login, password }),
    });
    
    const result = await response.json();
    
    if (result.success) {
      this.setToken(result.data.token);
    }
    
    return result;
  }

  async changePassword(currentPassword, newPassword) {
    const response = await fetch(`${this.baseUrl}/auth/change-password`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });
    
    const result = await response.json();
    
    if (result.success) {
      this.setToken(result.data.token);
    }
    
    return result;
  }

  isLoggedIn() {
    return !!this.token;
  }
}

// Usage
const auth = new AuthAPI('https://your-site.com/wp-json/jexi-wch/v1');

// Check if already logged in
if (auth.isLoggedIn()) {
  const validation = await auth.validateToken();
  if (!validation.data?.valid) {
    auth.clearToken();
  }
}

// Login
const loginResult = await auth.login('john@example.com', 'password');
if (loginResult.success) {
  console.log('Welcome,', loginResult.data.user.display_name);
}

// Get profile
const profile = await auth.getCurrentUser();
console.log(profile.data);

// Update profile
await auth.updateProfile({ first_name: 'Johnny' });

// Logout
await auth.logout();
```

## Security Notes

- Tokens expire after 7 days by default
- Logout invalidates the token server-side
- Password changes invalidate all existing tokens
- Store tokens securely (httpOnly cookies recommended for production)

## Related Endpoints

- [Customers API](/api-reference/customers) - Customer management
- [Orders API](/api-reference/orders) - Order history
