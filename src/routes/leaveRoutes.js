import express from "express";
import { getLeave, createLeave } from "../controllers/leaveController.js";

const router = express.Router();

router.get("/", getLeave);
router.post("/", createLeave);

export default router;
