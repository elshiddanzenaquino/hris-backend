import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";  

import {
  getAttendance,
  createAttendance,
  timeIn,
  timeOut,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/", verifyToken, getAttendance);
router.post("/", verifyToken, createAttendance);
router.post("/time-in", verifyToken, timeIn);
router.post("/time-out", verifyToken, timeOut);

export default router;
