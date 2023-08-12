import sql from "../../db.js";
class ordersController {
    async createOrder(req, res, next) {
        try {
            const { userId, sneakers, date, totalPrice } = req.body;
            const order = await sql `INSERT INTO orders(date, totalprice, userid) VALUES (${date}, ${totalPrice}, ${userId}) RETURNING id`;
            sneakers.map(async (sneaker) => {
                await sql `INSET INTO sneakers_order(ordersid, sneakersid) VALUES (${order[0].id}, ${sneaker.id})`;
            });
        }
        catch (e) {
            return res.status(500).json({ message: "Непредвиденная ошибка!" });
        }
    }
    async getAllOrders(req, res, next) {
        try {
            const { userId } = req.body;
            const orders = await sql `SELECT * FROM orders WHERE userid = ${userId}`;
            return res.json(orders);
        }
        catch (e) {
            return res.status(500).json({ message: "Непредвиденная ошибка!" });
        }
    }
    async getOneOrder(req, res, next) {
        try {
            const { id } = req.params;
            const order = await sql `SELECT * FROM orders WHERE id = ${id}`;
            return res.json(order);
        }
        catch (e) {
            return res.status(500).json({ message: "Непредвиденная ошибка!" });
        }
    }
    async deleteOrder(req, res, next) {
        try {
            const { id } = req.params;
            const order = await sql `DELETE FROM orders WHERE id = ${id} RETURNING *`;
            return res.json(order);
        }
        catch (e) {
            return res.status(500).json({ message: "Непредвиденная ошибка!" });
        }
    }
    async updateStatusOrder(req, res, next) {
        try {
            const { id, status } = req.body;
            const order = sql `UPDATE orders SET status = ${status} WHERE id = ${id} RETURNING *`;
            return res.json(order);
        }
        catch (e) {
            return res.status(500).json({ message: "Непредвиденная ошибка!" });
        }
    }
}
export default new ordersController();
//# sourceMappingURL=index.js.map