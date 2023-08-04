import path from 'path';
import sql from '../../db.js';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { SneakerReq } from './typeSneakers.js';
import { Application } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT: string = '5050';

class sneakersController {
  async create(req: SneakerReq, res: any) {
    try {
      const { title, price } = req.body;
      const { photo } = req.files;

      //сохранение фотографии
      const fileName = uuidv4() + '.png';
      photo.mv(path.resolve(__dirname, '..', '..', 'static', fileName));

      const sneaker = await sql`
      INSERT INTO sneakers
        (title, price, imgurl)
      values
        (${title}, ${price}, ${`http://localhost:${PORT}/static/${fileName}`})
      returning *
      `;

      return res.json(sneaker);
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(req: SneakerReq, res: any) {
    try {
      const sneakers = await sql`SELECT * FROM sneakers`;

      return res.json(sneakers);
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(req: { params: { id: number } }, res: any) {
    try {
      const { id } = req.params;
      const sneaker = await sql`SELECT * FROM sneakers WHERE id = ${id}`;

      return res.json(sneaker);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new sneakersController();
