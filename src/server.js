import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";
import payrollRoutes from "./routes/payrollRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/employees", verifyToken, employeeRoutes);
app.use("/api/attendance", verifyToken, attendanceRoutes);
app.use("/api/leave", verifyToken, leaveRoutes);

app.get("/", (req, res) => {
  res.send("Backend running.");
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
