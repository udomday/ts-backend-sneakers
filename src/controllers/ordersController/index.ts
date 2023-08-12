import { NextFunction, Request, Response } from "express";
import sql from "../../db.js";

class ordersController {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, sneakers, date, totalPrice, status } = req.body;

      const order =
        await sql`INSERT INTO orders(date, totalprice, status, userid) VALUES (${date}, ${totalPrice}, ${status},${userId}) RETURNING id`;

      sneakers.map(async (sneaker: any) => {
        await sql`INSERT INTO sneakers_order(ordersid, sneakersid) VALUES (${order[0].id}, ${sneaker.id})`;
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Непредвиденная ошибка!" });
    }
  }

  async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.query;
      const orders =
        await sql`SELECT orders.id, orders.date, orders.status, orders.totalprice, json_agg(sneakers.*) as sneakers FROM orders, sneakers_order, sneakers WHERE userid = ${
          userId as string
        } AND sneakers_order.ordersid = orders.id AND sneakers_order.sneakersid = sneakers.id GROUP BY orders.id`;

      return res.json(orders);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Непредвиденная ошибка!" });
    }
  }

  async getOneOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const order = await sql`SELECT * FROM orders WHERE id = ${id}`;

      return res.json(order);
    } catch (e) {
      return res.status(500).json({ message: "Непредвиденная ошибка!" });
    }
  }

  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const order = await sql`DELETE FROM orders WHERE id = ${id} RETURNING *`;

      return res.json(order);
    } catch (e) {
      return res.status(500).json({ message: "Непредвиденная ошибка!" });
    }
  }

  async updateStatusOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, status } = req.body;

      const order = sql`UPDATE orders SET status = ${status} WHERE id = ${id} RETURNING *`;

      return res.json(order);
    } catch (e) {
      return res.status(500).json({ message: "Непредвиденная ошибка!" });
    }
  }
}

export default new ordersController();
