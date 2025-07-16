import prisma from "../../prisma/client.js";

export const getPayroll = async (req, res) => {
    try {
        const payroll = await prisma.payroll.findMany();
        res.json(payroll);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createPayroll = async (req, res) => {
    try {
        const { month, salary } = req.body;
        const payroll = await prisma.payroll.create({
            data: { month, salary: parseInt(salary) },
        });
        res.json(payroll);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePayroll = async (req, res) => {
    try {
        const { id } = req.params;
        const { month, salary } = req.body;
        const updated = await prisma.payroll.update({
            where: { id: parseInt(id) },
            data: { month, salary: parseInt(salary) },
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePayroll = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.payroll.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
