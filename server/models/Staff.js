import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Doctor", "Nurse", "Receptionist", "Admin"],
    required: true,
  },
  department: String,
  phone: String,
  email: String,
});

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
