import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ApiError from "../../error/ApiError.js";
import sql from "../../db.js";
import { GetFavListId } from "../../utils/GetFavListId.js";
const geneateJWT = (id, mail, role) => {
    if (process.env.SECRET_KEY) {
        return jwt.sign({ id, mail, role }, process.env.SECRET_KEY, {
            expiresIn: "24h",
        });
    }
};
class userController {
    async registration(req, res, next) {
        try {
            const { mail, password } = req.body;
            console.log(mail, password);
            if (!!mail || !!password) {
                return next(ApiError.badRequest("Некорректная почта или пароль"));
            }
            const candidate = await sql `SELECT * FROM users WHERE mail = ${mail}`;
            if (candidate.length) {
                return next(ApiError.badRequest("Пользователь с такой почтой уже существует"));
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const user = (await sql `
      INSERT INTO users
        (mail, password)
      values
        (${mail}, ${hashPassword})
      returning *
      `);
            const favList = await sql `INSERT INTO favlist (userid) VALUES (${user[0].id})`;
            const token = geneateJWT(user[0].id, user[0].mail, user[0].role);
            return res.json({ token });
        }
        catch (e) {
            return res.status(500).json({ message: "Непредвиденная ошибка!" });
        }
    }
    async login(req, res, next) {
        try {
            const { mail, password } = req.body;
            const user = await sql `SELECT * FROM users WHERE mail = ${mail}`;
            if (!user.length) {
                return next(ApiError.badRequest("Пользователь не найден"));
            }
            const comparePassword = bcrypt.compareSync(password, user[0].password);
            if (!comparePassword) {
                return next(ApiError.badRequest("Неверный пароль"));
            }
            const token = geneateJWT(user[0].id, user[0].mail, user[0].role);
            return res.json({ token });
        }
        catch (e) {
            return res.status(500).json({ message: "Непредвиденная ошибка!" });
        }
    }
    async check(req, res, next) {
        try {
            const user = req.user;
            const token = geneateJWT(user.id, user.mail, user.role);
            return res.json({ token });
        }
        catch (e) {
            return res.status(500).json({ message: "Непредвиденная ошибка!" });
        }
    }
    async pushInList(req, res, next) {
        try {
            const { sneakerId, userId } = req.body;
            const favListId = await GetFavListId(userId);
            const favItem = await sql `INSERT INTO favitem(favlistid, sneakerid) VALUES (${favListId}, ${sneakerId}) RETURNING *`;
            return res.json(favItem);
        }
        catch (e) {
            return res.status(500).json({ message: "Непредвиденная ошибка!" });
        }
    }
    async getAllFavitem(req, res, next) {
        try {
            const { userId } = req.params;
            const favListId = await GetFavListId(userId);
            const favItems = await sql `SELECT sneakers.id, sneakers.title, sneakers.price, sneakers.imgurl FROM favitem, sneakers WHERE favitem.favlistid = ${favListId} AND favitem.sneakerid = sneakers.id;`;
            return res.json(favItems);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Непредвиденная ошибка!" });
        }
    }
    async deleteFromList(req, res, next) {
        try {
            const { sneakerId, userId } = req.body;
            const favListId = await GetFavListId(userId);
            const delItem = await sql `DELETE FROM favitem WHERE sneakerid = ${sneakerId} and favlistid = ${favListId} RETURNING *`;
            return res.json(delItem);
        }
        catch (e) {
            return res.status(500).json({ message: "Непредвиденная ошибка!" });
        }
    }
}
export default new userController();
//# sourceMappingURL=index.js.map