// routes/summary.js
const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Staff = require('../models/Staff');
const Appointment = require('../models/Appointment');

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

module.exports = router;
