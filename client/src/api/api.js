import axios from "axios";

// Use the environment variable for backend base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:10000/api",
});

// ----------------- PATIENT -----------------
export const fetchPatients = () => API.get("/patients");
export const createPatient = (data) => API.post("/patients", data);
export const updatePatient = (id, updatedData) => API.put(`/patients/${id}`, updatedData);
export const deletePatient = (id) => API.delete(`/patients/${id}`);

// ----------------- APPOINTMENTS -----------------
export const fetchAppointments = () => API.get("/appointments");
export const createAppointment = (data) => API.post("/appointments", data);
export const deleteAppointment = (id) => API.delete(`/appointments/${id}`);
export const updateAppointment = (id, data) => API.put(`/appointments/${id}`, data);

// ----------------- STAFF -----------------
export const fetchStaff = () => API.get("/staff");
export const createStaff = (staffData) => API.post("/staff", staffData);
export const updateStaff = (id, updatedData) => API.put(`/staff/${id}`, updatedData);
export const deleteStaff = (id) => API.delete(`/staff/${id}`);
