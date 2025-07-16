import express from "express";
import {
    getPayroll,
    createPayroll,
    updatePayroll,
    deletePayroll,
} from "../controllers/payrollController.js";

const router = express.Router();

router.get("/", getPayroll);
router.post("/", createPayroll);
router.put("/:id", updatePayroll);
router.delete("/:id", deletePayroll);

export default router;
