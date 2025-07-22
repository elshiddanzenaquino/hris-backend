export const getPayroll = async (req, res) => {
  try {
    const dummyPayroll = [
      { id: 1, salary: 15000 },
      { id: 2, salary: 18000 },
    ];
    res.json(dummyPayroll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch payroll." });
  }
};
