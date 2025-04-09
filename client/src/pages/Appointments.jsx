import { useEffect, useState } from "react";
import {
  fetchAppointments,
  createAppointment,
  deleteAppointment,
  updateAppointment,
} from "../api/api";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
  });

  const getAllAppointments = async () => {
    try {
      const res = await fetchAppointments();
      setAppointments(res.data);
    } catch (error) {
      console.error("❌ Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    getAllAppointments();

    fetch("http://localhost:10000/api/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error("❌ Error fetching patients:", err));

    fetch("http://localhost:10000/api/staff?role=Doctor")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error("❌ Error fetching doctors:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateAppointment(editingId, form);
      } else {
        await createAppointment(form);
      }
      await getAllAppointments();
      resetForm();
    } catch (error) {
      console.error("❌ Error saving appointment:", error);
    }
  };

  const resetForm = () => {
    setForm({
      patientId: "",
      doctorId: "",
      date: "",
      time: "",
      reason: "",
    });
    setEditingId(null);
  };

  const handleEdit = (appt) => {
    setEditingId(appt._id);
    setForm({
      patientId: appt.patientId?._id || appt.patientId,
      doctorId: appt.doctorId?._id || appt.doctorId,
      date: appt.date?.split("T")[0],
      time: appt.time,
      reason: appt.reason,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      await getAllAppointments();
    } catch (err) {
      console.error("❌ Error deleting appointment:", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">📅 Appointments</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-white p-6 rounded-lg shadow"
      >
        <select
          className="p-2 border border-gray-300 rounded"
          value={form.patientId}
          onChange={(e) => setForm({ ...form, patientId: e.target.value })}
          required
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} ({p.age} yrs)
            </option>
          ))}
        </select>

        <select
          className="p-2 border border-gray-300 rounded"
          value={form.doctorId}
          onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name} ({d.specialization || d.role || "General"})
            </option>
          ))}
        </select>

        <input
          type="date"
          className="p-2 border border-gray-300 rounded"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="time"
          className="p-2 border border-gray-300 rounded"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        <input
          className="p-2 border border-gray-300 rounded col-span-1 md:col-span-2"
          placeholder="Reason"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />

        <button
          type="submit"
          className={`col-span-1 md:col-span-2 ${
            editingId ? "bg-blue-600" : "bg-green-600"
          } text-white py-2 px-4 rounded hover:opacity-90 transition`}
        >
          {editingId ? "✏️ Update Appointment" : "➕ Add Appointment"}
        </button>
      </form>

      {/* Appointments List */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">📋 Appointment List</h3>
        <ul className="space-y-4">
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <li
                key={appt._id}
                className="p-4 border border-gray-200 rounded-lg shadow bg-gray-50"
              >
                <div className="mb-3 text-sm text-gray-800">
                  <strong>🧍 Patient:</strong> {appt.patientId?.name || "N/A"} <br />
                  <strong>👨‍⚕️ Doctor:</strong> {appt.doctorId?.name || "N/A"} <br />
                  <strong>📅 Date:</strong>{" "}
                  {appt.date
                    ? new Date(appt.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}{" "}
                  <br />
                  <strong>🕒 Time:</strong> {appt.time || "N/A"} <br />
                  <strong>📝 Reason:</strong> {appt.reason || "N/A"}
                </div>

                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded"
                    onClick={() => handleEdit(appt)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded"
                    onClick={() => handleDelete(appt._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No appointments found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Appointments;
