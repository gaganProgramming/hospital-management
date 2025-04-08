// routes/dashboard.js
import express from "express";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import Staff from "../models/Staff.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalStaff = await Staff.countDocuments();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const appointmentsToday = await Appointment.countDocuments({
      date: { $gte: todayStart, $lte: todayEnd }
    });

    const revenueThisMonth = appointmentsToday * 500; // change this logic if needed

    res.json({
      totalPatients,
      appointmentsToday,
      totalStaff,
      revenueThisMonth,
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    res.status(500).json({ message: "Dashboard data failed to load" });
  }
});

export default router;
