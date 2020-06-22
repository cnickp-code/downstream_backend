BEGIN;

TRUNCATE
    downstream_events
    RESTART IDENTITY CASCADE;

INSERT INTO downstream_events (name, image_url, info_url, description, start_date, end_date, platform)
VALUES
    ('Test Event 1', 'https://www.google.com', 'https://www.google.com', 'test description 1', '2029-01-22T16:28:32.615Z', '2029-01-22T16:28:32.615Z', 'twitch'),
    ('Test Event 2', 'https://www.google.com', 'https://www.google.com', 'test description 2', '2029-01-22T16:28:32.615Z', '2029-01-22T16:28:32.615Z', 'plamp');

COMMIT;