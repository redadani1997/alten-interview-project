CREATE TABLE products (
    id BIGINT NOT NULL AUTO_INCREMENT,
    code TEXT,
    name TEXT,
    image TEXT,
    category TEXT,
    price DOUBLE PRECISION,
    quantity TEXT,
    internal_reference TEXT,
    shelf_id TEXT,
    inventory_status TEXT,
    rating TEXT,
    created_at BIGINT,
    updated_at BIGINT,

    PRIMARY KEY (id)
)