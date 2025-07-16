import prisma from "../../prisma/client.js";

export const getLeave = async (req, res) => {
    try {
        const leave = await prisma.leave.findMany();
        res.json(leave);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createLeave = async (req, res) => {
    try {
        const { date, type } = req.body;
        const leave = await prisma.leave.create({
            data: { date: new Date(date), type },
        });
        res.json(leave);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, type } = req.body;
        const updated = await prisma.leave.update({
            where: { id: parseInt(id) },
            data: { date: new Date(date), type },
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLeave = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.leave.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
