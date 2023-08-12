import { Router } from "express";
import sneakersController from "../controllers/sneakersController/index.js";
import CheckMiddleware from "../middleware/CheckMiddleware.js";
const router = Router();
router.post("/", CheckMiddleware("ADMIN"), sneakersController.create);
router.get("/", sneakersController.getAll);
router.get("/:id", sneakersController.getOne);
router.put("/");
export default router;
//# sourceMappingURL=sneakersRouter.js.map