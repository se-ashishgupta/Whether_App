import express from "express";
const router = express.Router();
import { getWhether } from "../controllers/control.js";

router.post("/serachwhether", getWhether);

export default router;
