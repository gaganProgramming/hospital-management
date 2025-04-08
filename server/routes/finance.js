// routes/finance.js

import express from "express";
import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const paidAppointments = await Appointment.find({ "payment.status": "Paid" });
    const unpaidAppointments = await Appointment.find({ "payment.status": "Unpaid" });

    const totalRevenue = paidAppointments.reduce((sum, appt) => sum + appt.payment.feePaid, 0);

    // Filter payments made this month
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const monthlyRevenue = paidAppointments
      .filter((appt) => appt.payment.paymentDate >= startOfMonth)
      .reduce((sum, appt) => sum + appt.payment.feePaid, 0);

    // Latest 5 payments with patient name
    const latestPayments = await Appointment.find({ "payment.status": "Paid" })
      .sort({ "payment.paymentDate": -1 })
      .limit(5)
      .populate("patientId", "name");

    const formattedPayments = latestPayments.map(appt => ({
      _id: appt._id,
      patientName: appt.patientId?.name,
      feePaid: appt.payment.feePaid,
      paymentDate: appt.payment.paymentDate
    }));

    res.json({
      totalRevenue,
      paidCount: paidAppointments.length,
      unpaidCount: unpaidAppointments.length,
      monthlyRevenue,
      latestPayments: formattedPayments
    });
  } catch (err) {
    console.error("Finance route error:", err);
    res.status(500).json({ message: "Failed to fetch financial data" });
  }
});

export default router;
