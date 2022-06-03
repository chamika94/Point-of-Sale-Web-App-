import express  from "express";
import auth from "../middleware/auth.js";
import { signup,signin, getEmployee, googleSignIn, deleteEmployee } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleSignIn", googleSignIn);
router.get("/employee", getEmployee);
router.post("/employee/:id", deleteEmployee);

export default router;