-- Insert sample users
INSERT INTO users
    (username, email)
VALUES
    ('john_doe', 'john@example.com'),
    ('jane_smith', 'jane@example.com'),
    ('bob_wilson', 'bob@example.com');

-- Insert sample posts
INSERT INTO posts
    (user_id, title, content)
VALUES
    (1, 'First Post', 'This is the first post by John'),
    (1, 'Second Post', 'Another post by John'),
    (2, 'Hello World', 'Jane''s first post'),
    (3, 'My Thoughts', 'Bob''s perspective on things'); 