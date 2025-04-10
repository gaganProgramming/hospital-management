import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// 🌐 Load environment variables
dotenv.config();

// 🛠 Routes
import patientRoutes from "./routes/patients.js";
import appointmentRoutes from "./routes/appointments.js";
import staffRoutes from "./routes/staff.js";
import summaryRoutes from "./routes/summary.js";
import dashboardRoutes from "./routes/dashboard.js";
import financeRoutes from "./routes/finance.js";
import billingRoutes from "./routes/billing.js";
import authRoutes from "./routes/auth.js";

// ⚙️ App Configuration
const app = express();
const PORT = process.env.PORT || 5000;

// 🌍 Allowed Frontend Origins (update with your deployed frontend domain)
const allowedOrigins = [
  "https://hospital-management-delta-jet.vercel.app",
  "http://localhost:5173"
];

// 🔐 CORS Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// 📦 Middleware
app.use(express.json()); // Parses incoming JSON requests

// 🔌 Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1); // Exit the app if DB fails
});

// 🛣 API Routes
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/auth", authRoutes);

// 🏠 Root route
app.get("/", (req, res) => {
  res.send("🏥 Hospital Management API is live!");
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});
