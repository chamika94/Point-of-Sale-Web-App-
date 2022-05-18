import express from "express";
import auth from "../middleware/auth.js";
const router = express.Router();

import { deleteTour, updateTour, getToursByUser, createTour, getTours, getTour} from "../controllers/tour.js";

router.post("/", auth, createTour);
router.get("/",getTours);
router.get("/:id",getTour);
router.get("/userTours/:id", auth, getToursByUser);
router.patch("/:id", auth, updateTour);
router.post("/:id", deleteTour);

export default router