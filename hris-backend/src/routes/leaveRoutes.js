import express from "express";
import {
    getLeave,
    createLeave,
    updateLeave,
    deleteLeave,
} from "../controllers/leaveController.js";

const router = express.Router();

router.get("/", getLeave);
router.post("/", createLeave);
router.put("/:id", updateLeave);
router.delete("/:id", deleteLeave);

export default router;
