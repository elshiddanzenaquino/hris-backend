import prisma from "../../prisma/client.js";

export const getAttendance = async (req, res) => {
    try {
        const attendance = await prisma.attendance.findMany();
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createAttendance = async (req, res) => {
    try {
        const { date, status } = req.body;
        const attendance = await prisma.attendance.create({
            data: { date: new Date(date), status },
        });
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, status } = req.body;
        const updated = await prisma.attendance.update({
            where: { id: parseInt(id) },
            data: { date: new Date(date), status },
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.attendance.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
