import express from "express";
import prisma from "../utils/prismaClient.js";
import { getEmployees } from "../controllers/employeeController.js";

const router = express.Router();

// ✅ GET all employees (role: Employee only)
router.get("/", async (req, res) => {
  try {
    const employees = await prisma.user.findMany({
      where: { role: "Employee" },
      select: {
        id: true,
        name: true,
        department: true,
        email: true,
        role: true,
      },
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ UPDATE Employee
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, email } = req.body;
    const updated = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, department, email },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE Employee
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
