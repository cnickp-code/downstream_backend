BEGIN;

TRUNCATE
    downstream_events,
    downstream_users,
    downstream_schedule
    RESTART IDENTITY CASCADE;

INSERT INTO downstream_events (name, image_url, info_url, description, start_date, end_date, genre, platform)
VALUES
    ('Lost Lands', 'http://placehold.it/500x500', 'https://www.google.com', 'test description 1', '2029-01-22T16:28:32.615Z', '2029-01-22T16:28:32.615Z', 'dubstep', 'twitch'),
    ('EDC', 'http://placehold.it/500x500', 'https://www.google.com', 'test description 2', '2029-01-22T16:28:32.615Z', '2029-01-22T16:28:32.615Z', 'house', 'plamp'),
    ('Shambhala', 'http://placehold.it/500x500', 'https://www.google.com', 'test description 3', '2029-01-22T16:28:32.615Z', '2029-01-22T16:28:32.615Z', 'multi', 'facebook'),
    ('Lightning in a Bottle', 'http://placehold.it/500x500', 'https://www.google.com', 'test description 4', '2029-01-22T16:28:32.615Z', '2029-01-22T16:28:32.615Z', 'other', 'youtube');

INSERT INTO downstream_users (user_name, password, email, date_created)
VALUES
    ('Crayzix', '$2a$04$PeznXjgCRHNCL9121.GWV./JuTdgi05CCkGUJ/uQzHiUe8ALaBZlG', 'nick@nick.com', '2029-01-22T16:28:32.615Z'),
    ('Zixith', '$2a$04$TBsSABXz0fTYGIP6rii2G.xPudiFUsLVsYfMCxo6gTlA3eRN7nFre',  'carlo@carlo.com', '2029-01-22T16:28:32.615Z'),
    ('Zero', '$2a$04$nfsRVowvgmegXt5be1OOR.D2DzR1/7jLfRT4eLu/sL2eY5aXux/de',  'mark@mark.com', '2029-01-22T16:28:32.615Z'),
    ('Bigbarrels', '$2a$04$.mKSfqXboZ2e6n68YYJKVO/Neu9YpqdSHnetsPyYc8Y0frS5m/wUy', 'mario@mario.com', '2029-01-22T16:28:32.615Z'),
    ('Liquid', '$2a$04$mNxKDIpEqSbGtl/YwiAYnesOAQ4zJzJQWvYJ8cORkJcxeVfKmg0Oq', 'hayden@hayden.com', '2029-01-22T16:28:32.615Z');

INSERT INTO downstream_schedule (user_id, event_id)
VALUES
    (1, 3),
    (1, 2),
    (1, 1),
    (2, 1),
    (2, 4),
    (3, 1),
    (3, 3),
    (4, 2);

COMMIT;