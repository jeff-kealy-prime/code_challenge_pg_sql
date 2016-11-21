-- Database name
sigma
-- Document your create tables SQL here
CREATE TABLE treats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description text,
  pic VARCHAR(100))
  ;
