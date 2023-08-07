import { Router } from "express";
import userRouter from "./usersRouter.js";
import sneakerRouter from "./sneakersRouter.js";
import orderRouter from "./ordersRouter.js";

const router = Router();

router.use("/user", userRouter);
router.use("/sneakers", sneakerRouter);
router.use("/orders", orderRouter);

export default router;
