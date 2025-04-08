import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import patientRoutes from "./routes/patients.js";
import appointmentRoutes from "./routes/appointments.js";
import staffRoutes from "./routes/staff.js";
import summaryRoutes from "./routes/summary.js";
import dashboardRoutes from "./routes/dashboard.js";
import financeRoutes from "./routes/finance.js";
import billingRoutes from "./routes/billing.js";
import authRoutes from "./routes/auth.js"; // 👈 Add this route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware ✅ for frontend communication
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,               // to allow cookies / headers if needed
}));

// JSON Body Parser
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Routes
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/auth", authRoutes); // 👈 Add auth route

// Root Endpoint
app.get("/", (req, res) => {
  res.send("🏥 Hospital Management API Running...");
});

// Server Start
app.listen(PORT, () =>
  console.log(`🚀 Server running at: http://localhost:${PORT}`)
);
