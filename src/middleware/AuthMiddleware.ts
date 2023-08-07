import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
config();

export default function (req: Request, res: Response, next: NextFunction) {
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
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Не авторизован" });
  }
}
