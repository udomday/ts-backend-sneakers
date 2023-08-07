import { Request } from "express";
import { User } from "../controllers/userController/typeUser.js";

export interface UserAuthInfoRequest extends Request {
  user: User;
}
