// PART 1

-- SELECT *
-- FROM invoice i
-- JOIN invoice_line il ON il.invoice_id = i.invoice_id
-- WHERE il.unit_price > 0.99;

-- SELECT i.invoice_date, c.first_name, c.last_name, i.total
-- FROM invoice i
-- JOIN customer c ON i.customer_id = c.customer_id;

-- SELECT c.first_name, c.last_name, e.first_name, e.last_name
-- FROM customer c
-- JOIN employee e ON c.support_rep_id = e.employee_id;

-- SELECT al.title, ar.name
-- FROM album al
-- JOIN artist ar ON al.artist_id = ar.artist_id;

-- SELECT pt.track_id
-- FROM playlist_track pt
-- JOIN playlist p ON p.playlist_id = pt.playlist_id
-- WHERE p.name = 'Music';

-- SELECT t.name
-- FROM track t
-- JOIN playlist_track pt ON pt.track_id = t.track_id
-- WHERE pt.playlist_id = 5;

-- SELECT t.name, p.name
-- FROM track t
-- JOIN playlist_track pt ON t.track_id = pt.track_id
-- JOIN playlist p ON pt.playlist_id = p.playlist_id;

-- SELECT t.name, a.title
-- FROM track t
-- JOIN album a ON t.album_id = a.album_id
-- JOIN genre g ON g.genre_id = t.genre_id
-- WHERE g.name = 'Alternative & Punk';

//PART 2

-- SELECT * FROM invoice
-- WHERE invoice_id IN ( SELECT invoice_id FROM invoice_line WHERE unit_price > 0.99 );

-- SELECT * FROM playlist_track
-- WHERE playlist_id IN ( SELECT playlist_id FROM playlist WHERE name = 'Music' );

-- SELECT name FROM track
-- WHERE track_id IN ( SELECT track_id FROM playlist_track WHERE playlist_id = 5 );

-- SELECT * FROM track
-- WHERE genre_id IN ( SELECT genre_id FROM genre WHERE name = 'Comedy' );
 
-- SELECT * FROM track
-- WHERE album_id IN ( SELECT album_id FROM album WHERE title = 'Fireball' );

-- SELECT * FROM track
-- WHERE album_id IN ( 
--   SELECT album_id FROM album WHERE artist_id IN (SELECT artist_id FROM artist WHERE name = 'Queen')
-- );

// PART 3

-- UPDATE customer
-- SET fax = null
-- WHERE fax IS NOT null;

-- UPDATE customer
-- SET company = 'Self'
-- WHERE company IS null;

-- UPDATE customer 
-- SET last_name = 'Thompson' 
-- WHERE first_name = 'Julia' AND last_name = 'Barnett';

-- SELECT * FROM customer 
-- WHERE first_name= 'Julia';

-- UPDATE customer
-- SET support_rep_id = 4
-- WHERE email = 'luisrojas@yahoo.cl';

-- UPDATE track
-- SET composer = 'The darkness around us'
-- WHERE genre_id = ( SELECT genre_id FROM genre WHERE name = 'Metal' )
-- AND composer IS null;

//PART 4

-- SELECT COUNT(*), g.name
-- FROM track t
-- JOIN genre g ON t.genre_id = g.genre_id
-- GROUP BY g.name;

-- SELECT COUNT(*), g.name
-- FROM track t
-- JOIN genre g ON g.genre_id = t.genre_id
-- WHERE g.name = 'Pop' OR g.name = 'Rock'
-- GROUP BY g.name;

-- SELECT ar.name, COUNT(*)
-- FROM album al
-- JOIN artist ar ON ar.artist_id = al.artist_id
-- GROUP BY ar.name;

// PART 5

-- SELECT DISTINCT composer FROM track;

-- SELECT DISTINCT billing_postal_code FROM invoice;

-- SELECT DISTINCT company FROM customer;

// PART 6

-- SELECT * FROM practice_delete 
-- WHERE type = 'bronze';

-- DELETE FROM practice_delete 
-- WHERE type = 'bronze';

-- SELECT * FROM practice_delete;

-- SELECT * FROM practice_delete 
-- WHERE type = 'silver';

-- DELETE FROM practice_delete 
-- WHERE type = 'silver';

-- SELECT * FROM practice_delete;

-- SELECT * FROM practice_delete 
-- WHERE value = 150;

-- DELETE FROM practice_delete 
-- WHERE value = 150;

-- SELECT * FROM practice_delete;

// ECOMMERCE 

-- CREATE TABLE users ( 
-- user_id SERIAL PRIMARY KEY,
-- first_name VARCHAR(50),
-- email VARCHAR(150)
-- );

-- CREATE TABLE products (
--   product_id SERIAL PRIMARY KEY, 
--   product_name VARCHAR(50),
--   price INTEGER 
--   );

--   CREATE TABLE orders (
--   	order_id SERIAL PRIMARY KEY,
--     product_id INTEGER REFERENCES products(product_id)
--   );

INSERT INTO users (first_name, email)
VALUES ('Winifred', 'bettemidler@gmail.com'),('Sarah', 'sarahjparker@ymail.com'),('Mary', 'kathynajimy@zmail.com');

INSERT INTO products (product_name, price)
-- VALUES ('cauldron', 250),('candle', 2),('broomstick', 10);


