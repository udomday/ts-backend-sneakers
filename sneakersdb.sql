CREATE DATABASE sneakersdb;

CREATE TABLE sneakers(id BIGSERIAL PRIMARY key, title TEXT, price INTEGER, imgURL TEXT);

CREATE TABLE users(id BIGSERIAL PRIMARY key, mail TEXT UNIQUE, password TEXT UNIQUE, role TEXT DEFAULT 'USER');

CREATE TABLE orders(id BIGSERIAL PRIMARY key, date DATE, status TEXT DEFAULT 'ОТПРАВЛЕНО', totalPrice INTEGER, userId INTEGER REFERENCES users (id));

CREATE TABLE sneakers_order(ordersId INTEGER REFERENCES orders (id), sneakersId INTEGER REFERENCES sneakers (id));

CREATE TABLE favList(id BIGSERIAL PRIMARY key, userId INTEGER REFERENCES users (id));

CREATE TABLE favItem(id BIGSERIAL PRIMARY key, favListId INTEGER REFERENCES favList (id), sneakerId INTEGER REFERENCES sneakers (id));