import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import payrollRoutes from "./routes/payrollRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/employees", verifyToken, employeeRoutes);
app.use("/api/attendance", verifyToken, attendanceRoutes);
app.use("/api/payroll", verifyToken, payrollRoutes);
app.use("/api/leave", verifyToken, leaveRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found", path: req.originalUrl });
});

export default app;
