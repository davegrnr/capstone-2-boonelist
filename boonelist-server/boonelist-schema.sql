CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone VARCHAR(15),
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1),
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
        REFERENCES users ON DELETE CASCADE
);

CREATE TABLE for_sale (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(25) NOT NULL,
    item_info TEXT NOT NULL,
    price INTEGER CHECK(price >= 0) NOT NULL,
        posted_by VARCHAR (25)
        REFERENCES users ON DELETE CASCADE,
    liked_by VARCHAR (25)
        REFERENCES users ON DELETE CASCADE
);

CREATE TABLE services_comment (
    username VARCHAR(25) 
        REFERENCES users ON DELETE CASCADE,
    services_id INTEGER
        REFERENCES services ON DELETE CASCADE,
    PRIMARY KEY (username, services_id)
    comment_text TEXT NOT NULL
);

CREATE TABLE for_sale_comment (
    username VARCHAR(25) 
        REFERENCES users ON DELETE CASCADE,
    for_sale_id INTEGER
        REFERENCES for_sale ON DELETE CASCADE,
    PRIMARY KEY (username, for_sale_id)
    comment_text TEXT NOT NULL
);

CREATE TABLE services_likes (
    count INTEGER,
    username VARCHAR(25) 
        REFERENCES users ON DELETE CASCADE,
    services_id INTEGER
        REFERENCES services ON DELETE CASCADE,
    PRIMARY KEY (username, services_id)
);

CREATE TABLE for_sale_likes (
    username VARCHAR(25) 
        REFERENCES users ON DELETE CASCADE,
    for_sale_id INTEGER
        REFERENCES for_sale ON DELETE CASCADE,
    PRIMARY KEY (username, for_sale_id)
);