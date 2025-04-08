import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  gender: String,
  contact: String,
  medicalHistory: [String], // e.g., ["Diabetes", "Hypertension"]
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
