import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import payrollRoutes from "./routes/payrollRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/employees", verifyToken, employeeRoutes);
app.use("/api/attendance", verifyToken, attendanceRoutes);
app.use("/api/payroll", verifyToken, payrollRoutes);
app.use("/api/leave", verifyToken, leaveRoutes);


app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});
