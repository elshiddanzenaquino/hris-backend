import prisma from "../utils/prismaClient.js";

export const getLeave = async (req, res) => {
  try {
    const email = req.user.email;

    const leave = await prisma.leave.findMany({
      where: { email },
      orderBy: { id: "asc" },
    });

    res.json(leave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch leave requests." });
  }
};

export const createLeave = async (req, res) => {
  try {
    const email = req.user.email;
    const { startDate, endDate, type } = req.body;

    await prisma.leave.create({
      data: {
        email,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        type,
      },
    });

    res.status(201).json({ message: "Leave request saved." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to request leave." });
  }
};
