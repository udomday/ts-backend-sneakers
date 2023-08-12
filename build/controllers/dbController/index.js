import sql from '../../db.js';
export class dbController {
    async createDB() {
        try {
            await sql `CREATE TABLE sneakers(id BIGSERIAL PRIMARY key, title TEXT, price INTEGER, imgURL TEXT)`;
            await sql `CREATE TABLE users(id BIGSERIAL PRIMARY key, mail TEXT UNIQUE, password TEXT UNIQUE, role TEXT DEFAULT "USER")`;
            await sql `CREATE TABLE orders(id BIGSERIAL PRIMARY key, date DATE, status TEXT, totalPrice INTEGER, userId INTEGER REFERENCES users (id))`;
            await sql `CREATE TABLE sneakers_order(ordersId INTEGER REFERENCES orders (id), sneakersId INTEGER REFERENCES sneakers (id))`;
        }
        catch (e) {
            console.log('Таблицы уже существуют');
        }
    }
}
export default new dbController();
//# sourceMappingURL=index.js.map