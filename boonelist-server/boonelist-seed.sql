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

INSERT INTO sales (item_name, item_info, price, posted_by)
VALUES (
        'Legos',
        'Dont step on them!',
        33,
        'testadmin'
        ),
        (
        'Rocking chair',
        'Great condition',
        70,
        'testuser'
        );

INSERT INTO services_comments(posted_by, services_id, comment_text)
VALUES (
        'testuser',
        1,
        'Ill do it!'
        ),
        (
        'testadmin',
        2,
        'What kinds of dogs?'
        );

INSERT INTO sales_comments(posted_by, sales_id, comment_text)
VALUES (
        'testuser',
        1,
        'How many legos?'
        ),
        (
        'testadmin',
        2,
        'Is it made of elder wood?'
        );