CREATE DATABASE sneakersdb;

CREATE TABLE sneakers(id BIGSERIAL PRIMARY key, title TEXT, price INTEGER, imgURL TEXT);

-- insert into users ("title", "price", "imgURL") values ("1123", 12321, "12321")

CREATE TABLE users(id BIGSERIAL PRIMARY key, mail TEXT UNIQUE, password TEXT UNIQUE, role TEXT DEFAULT 'USER');

CREATE TABLE orders(id BIGSERIAL PRIMARY key, date DATE, status TEXT, totalPrice INTEGER, userId INTEGER REFERENCES users (id));

CREATE TABLE sneakers_order(ordersId INTEGER REFERENCES orders (id), sneakersId INTEGER REFERENCES sneakers (id));