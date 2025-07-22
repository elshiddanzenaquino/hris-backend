import express from "express";
import { registerEmployee, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerEmployee);
router.post("/login", login);

export default router;
