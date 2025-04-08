import express from "express";
import Billing from "../models/Billing.js";

const router = express.Router();

// GET: Billing Summary
router.get("/summary", async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const dailyBills = await Billing.aggregate([
      {
        $match: {
          date: { $gte: todayStart, $lte: todayEnd },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const paymentsReceived = await Billing.aggregate([
      {
        $match: { status: "Paid" },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const outstanding = await Billing.aggregate([
      {
        $match: { status: { $in: ["Unpaid", "Overdue"] } },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json({
      dailyBills: dailyBills[0]?.total || 0,
      paymentsReceived: paymentsReceived[0]?.total || 0,
      outstanding: outstanding[0]?.total || 0,
    });
  } catch (err) {
    console.error("Billing summary error:", err);
    res.status(500).json({ message: "Failed to load billing summary" });
  }
});

// ✅ POST: Add New Billing Record
router.post("/", async (req, res) => {
  try {
    const { patientId, amount, status, date } = req.body;

    // Optional validation
    if (!patientId || !amount || !status || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBilling = new Billing({
      patientId,
      amount,
      status,
      date: new Date(date),
    });

    const savedBilling = await newBilling.save();
    res.status(201).json(savedBilling);
  } catch (err) {
    console.error("Error creating billing record:", err);
    res.status(500).json({ message: "Failed to create billing record" });
  }
});

export default router;
