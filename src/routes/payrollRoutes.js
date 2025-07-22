import express from "express";
import { getPayroll } from "../controllers/payrollController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getPayroll);

export default router;
