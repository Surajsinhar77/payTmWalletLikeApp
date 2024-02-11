import { Router } from "express";
import { getBalance } from "../controller/account.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get('/balance', authMiddleware, getBalance);

export default router; 