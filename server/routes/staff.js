import express from "express";
import Staff from "../models/Staff.js";

const router = express.Router();

// Create staff
router.post("/", async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(400).json({ message: "Error creating staff", error });
  }
});

// Get all staff
router.get("/", async (req, res) => {
  try {
    const staffList = await Staff.find().sort({ createdAt: -1 });
    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get only doctors
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Staff.find({ role: "Doctor" });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update a patient
router.put("/:id", async (req, res) => {
    try {
      const updated = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Delete a patient
  router.delete("/:id", async (req, res) => {
    try {
      await Staff.findByIdAndDelete(req.params.id);
      res.json({ message: "Staff deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;
