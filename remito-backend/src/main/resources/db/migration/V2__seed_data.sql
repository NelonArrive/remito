-- ROLES
INSERT INTO roles (name)
VALUES ('ADMIN'),
       ('MANAGER');

-- CATEGORIES
INSERT INTO categories (id, name, slug, is_active)
VALUES (1, 'Smartphones', 'smartphones', true),
       (2, 'Laptops', 'laptops', true),
       (3, 'Tablets', 'tablets', true),
       (4, 'Accessories', 'accessories', true),
       (5, 'Smartwatches', 'smartwatches', true);

-- BRANDS
INSERT INTO brands (id, name, logo_url, is_active)
VALUES (1, 'Apple', '/img/apple.png', true),
       (2, 'Samsung', '/img/samsung.png', true),
       (3, 'Xiaomi', '/img/xiaomi.png', true),
       (4, 'Google', '/img/google.png', true),
       (5, 'OnePlus', '/img/oneplus.png', true);

-- COLORS
INSERT INTO colors (id, name, hex_code)
VALUES (1, 'Black', '#000000'),
       (2, 'Silver', '#C0C0C0'),
       (3, 'White', '#FFFFFF'),
       (4, 'Blue', '#1E90FF'),
       (5, 'Green', '#00C853');


-- PRODUCTS
INSERT INTO products
(
    id,
    name,
    slug,
    description,
    price,
    stock_quantity,
    category_id,
    brand_id,
    color_id,
    image_url,
    is_active,
    created_at
)
VALUES
    (
        1,
        'Samsung Galaxy S24',
        'samsung-galaxy-s24',
        'Flagship Samsung phone with AI features',
        999.99,
        30,
        1,
        2,
        2,
        'https://example.com/samsung-s24.jpg',
        TRUE,
        NOW()
    ),
    (
        2,
        'iPhone 15 Pro',
        'iphone-15-pro',
        'Apple premium smartphone with titanium body',
        1199.99,
        25,
        1,
        1,
        3,
        'https://example.com/iphone15pro.jpg',
        TRUE,
        NOW()
    ),
    (
        3,
        'Xiaomi 14',
        'xiaomi-14',
        'High performance Android smartphone',
        799.99,
        40,
        1,
        3,
        1,
        'https://example.com/xiaomi14.jpg',
        TRUE,
        NOW()
    ),
    (
        4,
        'MacBook Pro 14 M3',
        'macbook-pro-14-m3',
        'Apple laptop for professionals',
        1999.99,
        15,
        2,
        1,
        2,
        'https://example.com/macbookpro14.jpg',
        TRUE,
        NOW()
    ),
    (
        5,
        'Samsung Galaxy Watch 6',
        'galaxy-watch-6',
        'Smartwatch with health tracking',
        349.99,
        50,
        5,
        2,
        1,
        'https://example.com/galaxywatch6.jpg',
        TRUE,
        NOW()
    );
