import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff", // Doctor comes from staff collection
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // e.g. "10:30 AM"
    required: true,
  },
  reason: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled",
  },
  payment: {
    status: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid"
    },
    feePaid: {
      type: Number,
      default: 0
    },
    paymentDate: Date
  }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
