CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    email TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    pay INTEGER CHECK (pay >= 0) NOT NULL,
    service_info TEXT NOT NULL,
    posted_by VARCHAR (25)
        REFERENCES users ON DELETE CASCADE,
    liked_by VARCHAR (25)
        REFERENCES users ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(25) NOT NULL,
    item_info TEXT NOT NULL,
    price INTEGER CHECK(price >= 0) NOT NULL,
        posted_by VARCHAR (25)
        REFERENCES users ON DELETE CASCADE,
    liked_by VARCHAR (25)
        REFERENCES users ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE services_comments (
    id SERIAL PRIMARY KEY,
    posted_by VARCHAR(25) 
        REFERENCES users ON DELETE CASCADE,
    services_id INTEGER
        REFERENCES services ON DELETE CASCADE,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sales_comments (
    id SERIAL PRIMARY KEY,
    posted_by VARCHAR(25) 
        REFERENCES users ON DELETE CASCADE,
    sales_id INTEGER
        REFERENCES sales ON DELETE CASCADE,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE services_likes (
    count INTEGER,
    username VARCHAR(25) 
        REFERENCES users ON DELETE CASCADE,
    services_id INTEGER
        REFERENCES services ON DELETE CASCADE,
    PRIMARY KEY (username, services_id)
);

CREATE TABLE sales_likes (
    username VARCHAR(25) 
        REFERENCES users ON DELETE CASCADE,
    sales_id INTEGER
        REFERENCES sales ON DELETE CASCADE,
    PRIMARY KEY (username, sales_id)
);