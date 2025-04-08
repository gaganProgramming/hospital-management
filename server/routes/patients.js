// routes/patients.js
import express from "express";
import Patient from "../models/Patient.js";


const router = express.Router();

// Create a new patient
router.post("/", async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single patient by ID
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a patient
router.put("/:id", async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a patient
router.delete("/:id", async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get patient list for dropdown (only _id, name, slno)
router.get("/list", async (req, res) => {
  try {
    const patients = await Patient.find({}, "_id name slno").sort({ slno: 1 });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
