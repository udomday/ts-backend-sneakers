import { Router } from "express";
import ordersController from "../controllers/ordersController/index.js";
import CheckMiddleware from "../middleware/CheckMiddleware.js";
const router = Router();
router.post("/", ordersController.createOrder);
router.get("/", ordersController.getAllOrders);
router.get("/:id", ordersController.getOneOrder);
router.put("/", CheckMiddleware("ADMIN"), ordersController.updateStatusOrder);
router.delete("/:id", ordersController.deleteOrder);
export default router;
//# sourceMappingURL=ordersRouter.js.map