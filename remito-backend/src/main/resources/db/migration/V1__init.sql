-- ------------------------------------------------------------
-- ROLES & USERS
-- ------------------------------------------------------------
CREATE TABLE roles
(
    id   BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE -- ADMIN, MANAGER
);

CREATE TABLE users
(
    id            BIGSERIAL PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role_id       BIGINT       NOT NULL REFERENCES roles (id),
    is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- BRANDS & COLORS
-- ------------------------------------------------------------
CREATE TABLE brands
(
    id        BIGSERIAL PRIMARY KEY,
    name      VARCHAR(100) NOT NULL UNIQUE, -- Samsung, Canon, Xerox...
    logo_url  VARCHAR(500),
    is_active BOOLEAN      NOT NULL DEFAULT TRUE
);

CREATE TABLE colors
(
    id       BIGSERIAL PRIMARY KEY,
    name     VARCHAR(50) NOT NULL UNIQUE, -- Голубой, Чёрный, Пурпурный...
    hex_code VARCHAR(7)  NOT NULL
);

-- ------------------------------------------------------------
-- CATEGORIES  (дерево через parent_id)
-- ------------------------------------------------------------
CREATE TABLE categories
(
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    slug        VARCHAR(100) NOT NULL UNIQUE,
    parent_id   BIGINT REFERENCES categories (id),
    description TEXT,
    is_active   BOOLEAN      NOT NULL DEFAULT TRUE
);

-- ------------------------------------------------------------
-- PRODUCTS
-- ------------------------------------------------------------
CREATE TABLE products
(
    id             BIGSERIAL PRIMARY KEY,
    name           VARCHAR(255)   NOT NULL,
    slug           VARCHAR(255)   NOT NULL UNIQUE,
    description    TEXT,
    price          NUMERIC(12, 2) NOT NULL,
    stock_quantity INT            NOT NULL DEFAULT 0,
    category_id    BIGINT         NOT NULL REFERENCES categories (id),
    brand_id       BIGINT REFERENCES brands (id),
    color_id       BIGINT REFERENCES colors (id), -- только для цветных расходников
    image_url      VARCHAR(500),
    is_active      BOOLEAN        NOT NULL DEFAULT TRUE,
    created_at     TIMESTAMP      NOT NULL DEFAULT NOW()
);

CREATE TABLE product_images
(
    id         BIGSERIAL PRIMARY KEY,
    product_id BIGINT       NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    url        VARCHAR(500) NOT NULL,
    sort_order INT          NOT NULL DEFAULT 0
);

-- ------------------------------------------------------------
-- SERVICES  (услуги: замена вала, барабана и т.д.)
-- ------------------------------------------------------------
CREATE TABLE service_items
(
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255)   NOT NULL,
    slug        VARCHAR(255)   NOT NULL UNIQUE,
    description TEXT,
    price       NUMERIC(12, 2) NOT NULL,
    brand_id    BIGINT REFERENCES brands (id),
    image_url   VARCHAR(500),
    is_active   BOOLEAN        NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP      NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- CART
-- ------------------------------------------------------------
CREATE TABLE carts
(
    id            BIGSERIAL PRIMARY KEY,
    session_token UUID      NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    created_at    TIMESTAMP NOT NULL        DEFAULT NOW(),
    expires_at    TIMESTAMP NOT NULL        DEFAULT NOW() + INTERVAL '7 days'
);

CREATE TABLE cart_items
(
    id             BIGSERIAL PRIMARY KEY,
    cart_id        BIGINT         NOT NULL REFERENCES carts (id) ON DELETE CASCADE,
    product_id     BIGINT REFERENCES products (id),
    service_id     BIGINT REFERENCES service_items (id),
    quantity       INT            NOT NULL DEFAULT 1,
    price_snapshot NUMERIC(12, 2) NOT NULL, -- цена на момент добавления
    CONSTRAINT chk_cart_item_type CHECK (
        (product_id IS NOT NULL AND service_id IS NULL) OR
        (product_id IS NULL AND service_id IS NOT NULL)
        )
);

-- ------------------------------------------------------------
-- ORDERS
-- ------------------------------------------------------------
CREATE TYPE payer_type AS ENUM ('INDIVIDUAL', 'LEGAL_ENTITY');
CREATE TYPE payment_method AS ENUM ('CASH', 'CARD', 'INVOICE');
CREATE TYPE order_status AS ENUM ('NEW', 'CONFIRMED', 'COMPLETED', 'CANCELLED');

CREATE TABLE orders
(
    id             BIGSERIAL PRIMARY KEY,
    order_number   VARCHAR(50)    NOT NULL UNIQUE, -- RM-00001
    customer_name  VARCHAR(255)   NOT NULL,
    customer_email VARCHAR(255)   NOT NULL,
    customer_phone VARCHAR(50)    NOT NULL,
    payer_type     payer_type     NOT NULL DEFAULT 'INDIVIDUAL',
    payment_method payment_method NOT NULL DEFAULT 'CASH',
    comment        TEXT,
    pickup_point   VARCHAR(255),
    address        VARCHAR(500),
    status         order_status   NOT NULL DEFAULT 'NEW',
    total_amount   NUMERIC(12, 2) NOT NULL,
    created_at     TIMESTAMP      NOT NULL DEFAULT NOW()
);

CREATE TABLE order_items
(
    id             BIGSERIAL PRIMARY KEY,
    order_id       BIGINT         NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
    product_id     BIGINT REFERENCES products (id),
    service_id     BIGINT REFERENCES service_items (id),
    name_snapshot  VARCHAR(255)   NOT NULL, -- название на момент заказа
    price_snapshot NUMERIC(12, 2) NOT NULL,
    quantity       INT            NOT NULL DEFAULT 1,
    CONSTRAINT chk_order_item_type CHECK (
        (product_id IS NOT NULL AND service_id IS NULL) OR
        (product_id IS NULL AND service_id IS NOT NULL)
        )
);

-- ------------------------------------------------------------
-- ARTICLES (блог)
-- ------------------------------------------------------------
CREATE TABLE articles
(
    id           BIGSERIAL PRIMARY KEY,
    title        VARCHAR(255) NOT NULL,
    slug         VARCHAR(255) NOT NULL UNIQUE,
    content      TEXT         NOT NULL,
    preview_text TEXT,
    cover_image  VARCHAR(500),
    author_id    BIGINT REFERENCES users (id),
    is_published BOOLEAN      NOT NULL DEFAULT FALSE,
    published_at TIMESTAMP,
    created_at   TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- SEED: базовые роли и категории
-- ------------------------------------------------------------
INSERT INTO roles (name)
VALUES ('ADMIN'),
       ('MANAGER');

INSERT INTO colors (name, hex_code)
VALUES ('Чёрный', '#000000'),
       ('Голубой', '#00AEEF'),
       ('Пурпурный', '#EC008C'),
       ('Жёлтый', '#FFF200');

INSERT INTO categories (name, slug, parent_id)
VALUES ('Товары', 'tovary', NULL),
       ('Картриджи', 'kartridzhi', 1),
       ('Лазерные картриджи', 'lazernye', 2),
       ('Струйные картриджи', 'struynye', 2),
       ('Чернила', 'chernila', 1),
       ('Расходные материалы', 'rashodnye', 1),
       ('Принтеры и МФУ', 'printery-mfu', 1),
       ('ПО', 'po', 1),
       ('Аксессуары', 'aksessuary', 1),
       ('Услуги', 'uslugi', NULL);