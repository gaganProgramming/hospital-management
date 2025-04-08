import express from "express";
import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import Staff from "../models/Staff.js";

const router = express.Router();

// ✅ Create an appointment
router.post("/", async (req, res) => {
  try {
    const { patientId, doctorId, date, time, reason } = req.body;

    if (!patientId || !doctorId || !date || !time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    const doctor = await Staff.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const appointment = new Appointment({
      patientId,
      doctorId,
      date,
      time,
      reason,
    });

    const saved = await appointment.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
    .populate("patientId", "name")
    .populate("doctorId", "name role specialization"); // ✅
  

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get single appointment
router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patientId", "name")
      .populate("doctorId", "name");

    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update appointment
router.put("/:id", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Delete appointment
router.delete("/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
