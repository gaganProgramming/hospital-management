import mongoose from "mongoose";

const billingSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: false,
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Paid", "Unpaid", "Overdue"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  paymentDate: Date,
  dueDate: Date,
  insuranceClaimed: {
    type: Boolean,
    default: false,
  },
});

const Billing = mongoose.model("Billing", billingSchema);
export default Billing;
