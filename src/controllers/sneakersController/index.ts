import path from "path";
import sql from "../../db.js";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import { Request, Response } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5050;

class sneakersController {
  async create(req: Request, res: Response) {
    try {
      const { title, price } = req.body;
      //@ts-ignore
      const { photo } = req.files;

      //сохранение фотографии
      const fileName = uuidv4() + ".png";
      photo.mv(path.resolve(__dirname, "..", "..", "static", fileName));

      const sneaker = await sql`
      INSERT INTO sneakers
        (title, price, imgurl)
      values
        (${title}, ${price}, ${`http://localhost:${PORT}/static/${fileName}`})
      returning *
      `;

      return res.json(sneaker);
    } catch (e) {
      return res.status(500).json({ message: "Непредвиденная ошибка!" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const sneakers = await sql`SELECT * FROM sneakers`;

      return res.json(sneakers);
    } catch (e) {
      return res.status(500).json({ message: "Непредвиденная ошибка!" });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const sneaker = await sql`SELECT * FROM sneakers WHERE id = ${id}`;

      return res.json(sneaker);
    } catch (e) {
      return res.status(500).json({ message: "Непредвиденная ошибка!" });
    }
  }
}

export default new sneakersController();
