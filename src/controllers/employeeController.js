import prisma from "../utils/prismaClient.js";

export const getEmployees = async (req, res) => {
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
