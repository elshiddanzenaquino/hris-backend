import prisma from "../utils/prismaClient.js";

export const getAttendance = async (req, res) => {
  try {
    const email = req.user.email;
    const attendance = await prisma.attendance.findMany({
      where: { email },
      orderBy: { date: "desc" },
    });
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch attendance." });
  }
};

export const createAttendance = async (req, res) => {
  try {
    const email = req.user.email;
    const { date, timeIn, timeOut } = req.body;
    await prisma.attendance.create({
      data: {
        email,
        date: new Date(date),
        timeIn: new Date(timeIn),
        timeOut: new Date(timeOut),
        status: "Present",
      },
    });
    res.status(201).json({ message: "Attendance saved." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create attendance.", error });
  }
};

export const timeIn = async (req, res) => {
  try {
    const email = req.user.email;
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        email,
        date: {
          gte: todayStart,
          lt: todayEnd,
        },
      },
    });

    if (existingAttendance) {
      return res.status(400).json({ message: "Already timed-in today." });
    }

    await prisma.attendance.create({
      data: {
        email,
        date: new Date(),
        timeIn: new Date(),
        status: "Present",
      },
    });

    res.status(201).json({ message: "Time-in recorded." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to time-in." });
  }
};

export const timeOut = async (req, res) => {
  try {
    const email = req.user.email;
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        email,
        date: {
          gte: todayStart,
          lt: todayEnd,
        },
      },
    });

    if (!existingAttendance) {
      return res.status(400).json({ message: "No time-in record found." });
    }

    if (existingAttendance.timeOut) {
      return res.status(400).json({ message: "Already timed-out today." });
    }

    await prisma.attendance.update({
      where: { id: existingAttendance.id },
      data: {
        timeOut: new Date(),
      },
    });

    res.json({ message: "Time-out recorded." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to time-out." });
  }
};
