import bcrypt from "bcrypt";
import prisma from "../../prisma/client.js";

export const getEmployees = async (req, res) => {
    try {
        const employees = await prisma.user.findMany({
            where: { role: "employee" },
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
};

export const createEmployee = async (req, res) => {
    const { name, department, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newEmployee = await prisma.user.create({
            data: {
                name,
                department,
                email,
                password: hashedPassword,
                role: role || "employee", // default to 'employee' if not provided
            },
        });
        res.status(201).json({
            message: "Employee created successfully.",
            user: {
                id: newEmployee.id,
                email: newEmployee.email,
                role: newEmployee.role,
                department: newEmployee.department,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create employee." });
    }
};

export const updateEmployee = async (req, res) => {
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
};

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
