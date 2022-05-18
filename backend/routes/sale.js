import express from "express";
import auth from "../middleware/auth.js";
const router = express.Router();

import { createTransaction } from "../controllers/sale.js";

router.post("/", auth, createTransaction);


export default router