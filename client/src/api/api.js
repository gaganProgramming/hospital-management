import axios from "axios";

// ✅ Set your backend URL via env variable
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:10000/api",
});

// OPTIONAL: Include credentials if needed (e.g., for cookies/auth)
// API.defaults.withCredentials = true;

// ======================= PATIENT =======================
export const fetchPatients = () => API.get("/patients");
export const createPatient = (data) => API.post("/patients", data);
export const updatePatient = (id, updatedData) => API.put(`/patients/${id}`, updatedData);
export const deletePatient = (id) => API.delete(`/patients/${id}`);

// ==================== APPOINTMENTS =====================
export const fetchAppointments = () => API.get("/appointments");
export const createAppointment = (data) => API.post("/appointments", data);
export const updateAppointment = (id, data) => API.put(`/appointments/${id}`, data);
export const deleteAppointment = (id) => API.delete(`/appointments/${id}`);

// ======================== STAFF ========================
export const fetchStaff = () => API.get("/staff");
export const createStaff = (staffData) => API.post("/staff", staffData);
export const updateStaff = (id, updatedData) => API.put(`/staff/${id}`, updatedData);
export const deleteStaff = (id) => API.delete(`/staff/${id}`);

// =================== DASHBOARD SUMMARY =================
export const fetchSummary = () => API.get("/summary");
