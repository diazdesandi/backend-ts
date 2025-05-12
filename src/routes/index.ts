import { Router } from "express";
import { authRouter } from "./auth.routes";
import { todoRouter } from "./todo.routes";
import { systemRouter } from "./system.routes";

const router = Router();

router.use('/auth', authRouter);
router.use('/todos', todoRouter);
router.use('/system', systemRouter);

export { router as indexRouter }