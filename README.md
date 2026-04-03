# Remito

> Internet shop backend for printer consumables, equipment and related services.

## Tech Stack

- **Java 21** + **Spring Boot 3.3**
- **PostgreSQL** — main database
- **Redis** — refresh token storage
- **Flyway** — database migrations
- **Spring Security** + **JWT** + **OAuth2** (Google, Yandex)
- **MapStruct** — DTO mapping
- **Lombok**
- **Gradle (Kotlin DSL)**

## Features

- Product catalog with filtering & sorting (category, brand, color, price range)
- Services catalog (e.g. drum unit replacement, roller replacement)
- Cart via session cookie — no registration required
- Order placement with email notification to admin and customer
- Blog / articles with publish flow
- JWT auth with HttpOnly cookies + refresh token rotation
- OAuth2 login via Google and Yandex
- Role-based access: `ADMIN`, `MANAGER`

## Getting Started

### Prerequisites

- Java 21
- PostgreSQL
- Redis
- Docker (optional)

### Setup

1. **Clone the repo**
```bash
git clone https://github.com/your-username/remito.git
cd remito
```

2. **Create `.env` file**
```env
DB_USERNAME=postgres
DB_PASSWORD=postgres

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

JWT_SECRET=dGhpcyBpcyBhIHZlcnkgc2VjcmV0IGtleSBmb3IgcmVtaXRv

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

YANDEX_CLIENT_ID=your-yandex-client-id
YANDEX_CLIENT_SECRET=your-yandex-client-secret

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your@gmail.com
MAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@remito.com

FRONTEND_URL=http://localhost:3000
```

3. **Run**
```bash
./gradlew bootRun
```

Flyway migrations run automatically on startup.

### Docker (optional)

```bash
docker compose up -d
```

## API Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/signup` | — | Register |
| POST | `/api/v1/auth/login` | — | Login |
| POST | `/api/v1/auth/refresh` | — | Refresh token |
| POST | `/api/v1/auth/logout` | — | Logout |
| GET | `/api/v1/products` | — | Product list with filters |
| GET | `/api/v1/products/{slug}` | — | Single product |
| POST | `/api/v1/products` | ADMIN/MANAGER | Create product |
| GET | `/api/v1/services` | — | Services list |
| GET | `/api/v1/cart` | — | Get cart |
| POST | `/api/v1/cart/items` | — | Add to cart |
| POST | `/api/v1/orders` | — | Place order |
| GET | `/api/v1/orders` | ADMIN/MANAGER | All orders |
| PATCH | `/api/v1/orders/{id}/status` | ADMIN/MANAGER | Update status |
| GET | `/api/v1/articles` | — | Published articles |
| POST | `/api/v1/articles` | ADMIN/MANAGER | Create article |

## Project Structure

```
src/main/java/dev/remito/
├── article/
├── brand/
├── cart/
├── category/
├── color/
├── exception/
├── order/
├── product/
├── security/
├── service/
└── user/
```
