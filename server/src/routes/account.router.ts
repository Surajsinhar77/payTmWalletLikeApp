import { Router } from "express";
import { getBalance,amountTransfer } from "../controller/account.controller";

const router = Router();

router.get('/balance', getBalance);
router.post('/transfer', amountTransfer);

export default router; 