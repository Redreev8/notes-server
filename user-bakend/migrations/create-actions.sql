CREATE TABLE Actions (
    id SERIAL PRIMARY KEY NOT NULL, 
    action VARCHAR(255) NOT NULL
);

INSERT INTO actions (action) VALUES ('ALL'); -- 1