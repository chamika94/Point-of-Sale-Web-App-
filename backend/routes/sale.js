import express from "express";
import auth from "../middleware/auth.js";
const router = express.Router();

import { getTransactions, createTransaction, getItems } from "../controllers/sale.js";

router.post("/", auth, createTransaction);
router.get("/transaction", auth, getTransactions);
router.get("/items", getItems);


export default router