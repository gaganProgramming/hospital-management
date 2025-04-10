import React, { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Patient() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    contact: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    fetch(`${API_BASE_URL}/api/patients`)
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error("❌ Failed to fetch patients", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("✅ Patient added successfully!");
        setFormData({ name: "", age: "", gender: "Male", contact: "" });
        fetchPatients();
      } else {
        const data = await res.json();
        setMessage(`❌ ${data.message || "Failed to add patient"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error while adding patient");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-semibold">Patients</h1>

      {/* Message */}
      {message && (
        <div className={`font-medium ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </div>
      )}

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Add New Patient</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Patient Name"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            placeholder="Age"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            placeholder="Contact Number"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Patient
          </button>
        </form>
      </div>

      {/* List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Patient List</h2>
        <ul className="divide-y">
          {patients.length === 0 ? (
            <p className="text-gray-500">No patients found.</p>
          ) : (
            patients.map((p) => (
              <li key={p._id} className="py-3">
                <span className="font-medium">{p.name}</span> — {p.age} years, {p.gender}, 📞 {p.contact}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
