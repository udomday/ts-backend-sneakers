import { Router } from "express";
import userController from "../controllers/userController/index.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", AuthMiddleware, userController.check);
router.put("/update");

router.post("/favlist", userController.pushInList);
router.get("/favlist/:userId", userController.getAllFavitem);
router.delete("/favlist", userController.deleteFromList);

export default router;
