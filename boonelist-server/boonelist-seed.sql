-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, phone, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        '8285555555',
        'winnie@winnie.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        '5671293300',
        'timber@timber.com',
        TRUE);

INSERT INTO services (title, pay, service_info, posted_by)
VALUES ('Lawn Care',
        50,
        'Pick up sticks and mow the grass',
        'testadmin'
        ),
        ('Dog sitter',
        250,
        'Walk and feed the dogs',
        'testuser'
        );

INSERT INTO sales (item_name, item_info, price)
VALUES (
        'Legos',
        'Dont step on them!',
        33
        );