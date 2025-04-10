import { useEffect, useState } from "react";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    medicalHistory: "",
  });
  const [editId, setEditId] = useState(null);


  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getAllPatients();
  }, []);

  const getAllPatients = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPatients(data);
    } catch (error) {
      console.error("❌ Error fetching patients:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientData = {
      ...form,
      medicalHistory: form.medicalHistory
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      if (editId) {
        // Update patient
        await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patientData),
        });
      } else {
        // Create patient
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patientData),
        });
      }

      await getAllPatients();
      resetForm();
    } catch (err) {
      console.error("❌ Error submitting form:", err);
    }
  };

  const handleEdit = (patient) => {
    setForm({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      contact: patient.contact,
      medicalHistory: (patient.medicalHistory || []).join(", "),
    });
    setEditId(patient._id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
    if (!confirmDelete) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      await getAllPatients();
    } catch (err) {
      console.error("❌ Error deleting patient:", err);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      age: "",
      gender: "",
      contact: "",
      medicalHistory: "",
    });
    setEditId(null);
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center sm:text-left">
        🧍‍♂️ Patients
      </h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
      >
        <input
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-300"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-300"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
        />
        <input
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-300"
          placeholder="Gender"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          required
        />
        <input
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-300"
          placeholder="Contact"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
        />
        <input
          className="p-2 border border-gray-300 rounded col-span-1 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
          placeholder="Medical History (comma separated)"
          value={form.medicalHistory}
          onChange={(e) => setForm({ ...form, medicalHistory: e.target.value })}
        />

        <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className={`w-full sm:w-auto ${
              editId
                ? "bg-yellow-400 hover:bg-yellow-500"
                : "bg-emerald-400 hover:bg-emerald-500"
            } text-white py-2 px-4 rounded transition`}
          >
            {editId ? "✏️ Update Patient" : "➕ Add Patient"}
          </button>

          {editId && (
            <button
              type="button"
              className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded transition"
              onClick={resetForm}
            >
              🔄 Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-700 text-center sm:text-left">
          Patient List
        </h3>
        <ul className="space-y-3">
          {Array.isArray(patients) && patients.length > 0 ? (
            patients.map((p) => (
              <li
                key={p._id}
                className="p-4 border rounded shadow-sm bg-neutral-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="text-sm text-gray-700">
                  <strong className="text-base">{p.name}</strong> (Age: {p.age}, Gender: {p.gender})
                  <br />
                  📞 {p.contact}
                  <br />
                  🏥 History: {p.medicalHistory?.join(", ") || "N/A"}
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
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
            <p className="text-gray-600 text-center">No patients found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Patients;
