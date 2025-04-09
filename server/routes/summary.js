import express from 'express';
import Patient from '../models/Patient.js';
import Staff from '../models/Staff.js';
import Appointment from '../models/Appointment.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const patientsCount = await Patient.countDocuments();
    const staffCount = await Staff.countDocuments();
    const appointmentsCount = await Appointment.countDocuments();

    res.json({
      patients: patientsCount,
      staff: staffCount,
      appointments: appointmentsCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

export default router;
