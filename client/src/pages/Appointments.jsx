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

    if (editingId) {
      // Update flow
      try {
        await updateAppointment(editingId, form);
        await getAllAppointments();
        resetForm();
      } catch (err) {
        console.error("❌ Error updating appointment:", err);
      }
    } else {
      // Create flow
      try {
        await createAppointment(form);
        await getAllAppointments();
        resetForm();
      } catch (error) {
        console.error("❌ Error creating appointment:", error);
      }
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
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📅 Appointments</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <select
          className="p-2 border rounded"
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
          className="p-2 border rounded"
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
          className="p-2 border rounded"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="time"
          className="p-2 border rounded"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        <input
          className="p-2 border rounded col-span-2"
          placeholder="Reason"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />

        <button
          type="submit"
          className={`col-span-2 ${
            editingId ? "bg-blue-600" : "bg-green-600"
          } text-white py-2 px-4 rounded hover:opacity-90`}
        >
          {editingId ? "✅ Update Appointment" : "➕ Add Appointment"}
        </button>
      </form>

      {/* Appointments List */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Appointment List</h3>
        <ul className="space-y-3">
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <li
                key={appt._id}
                className="p-4 border rounded shadow-sm bg-gray-50"
              >
                <div className="mb-2">
                  <strong>🧍 Patient:</strong> {appt.patientId?.name || "N/A"}
                  <br />
                  <strong>👨‍⚕️ Doctor:</strong> {appt.doctorId?.name || "N/A"}
                  <br />
                  <strong>📅 Date:</strong>{" "}
                  {appt.date
                    ? new Date(appt.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                  <br />
                  <strong>🕒 Time:</strong> {appt.time || "N/A"} <br />
                  <strong>📝 Reason:</strong> {appt.reason || "N/A"}
                </div>

                <div className="flex gap-2">
                <button
                    className="px-3 py-1 bg-yellow-300 hover:bg-yellow-400 text-gray-800 rounded transition"
                    onClick={() => handleEdit(p)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-rose-300 hover:bg-rose-400 text-white rounded transition"
                    onClick={() => handleDelete(p._id)}
                  >
                     Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No appointments found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Appointments;
