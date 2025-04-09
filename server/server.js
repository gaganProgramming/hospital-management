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
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Setup dynamic allowed origins (add your frontend URL here)
const allowedOrigins = [
  "https://hospital-management-delta-jet.vercel.app/",
  "http://localhost:5173"
  
];

// ✅ CORS middleware with whitelist logic
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Routes
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/auth", authRoutes);

// Root
app.get("/", (req, res) => {
  res.send("🏥 Hospital Management API Running...");
});

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running at: http://localhost:${PORT}`)
);
