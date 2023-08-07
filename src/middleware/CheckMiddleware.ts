import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export default function (role: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization?.split(" ")[1]; //Bearer

      if (!token) {
        return res.status(401).json({ message: "Не авторизован" });
      }

      //@ts-ignore
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      //@ts-ignore
      if (decoded.role !== role) {
        return res.status(403).json({ message: "Нет доступа" });
      }

      //@ts-ignore
      req.user = decoded;
      next();
    } catch (e) {
      return res.status(401).json({ message: "Не авторизован" });
    }
  };
}
