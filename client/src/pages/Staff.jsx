// Staff.jsx
import { useEffect, useState } from "react";
import {
  fetchStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../api/api";

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    department: "",
    contact: "",
    joinedDate: "",
  });

  const roles = [
    "Doctor",
    "Nurse",
    "Admin",
    "Receptionist",
    "Technician",
    "Pharmacist",
  ];

  const getAllStaff = async () => {
    try {
      const res = await fetchStaff();
      setStaffList(res.data);
    } catch (error) {
      console.error("❌ Error fetching staff:", error);
    }
  };

  useEffect(() => {
    getAllStaff();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      role: "",
      department: "",
      contact: "",
      joinedDate: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateStaff(editingId, form);
      } else {
        await createStaff(form);
      }
      await getAllStaff();
      resetForm();
    } catch (err) {
      console.error("❌ Error saving staff:", err);
    }
  };

  const handleEdit = (staff) => {
    setEditingId(staff._id);
    setForm({
      name: staff.name || "",
      role: staff.role || "",
      department: staff.department || "",
      contact: staff.contact || "",
      joinedDate: staff.joinedDate?.split("T")[0] || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteStaff(id);
      await getAllStaff();
    } catch (err) {
      console.error("❌ Error deleting staff:", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">👨‍⚕️ Staff Management</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          className="p-2 border rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        {/* Role Dropdown */}
        <select
          className="p-2 border rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          required
        >
          <option value="">Select Role</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <input
          className="p-2 border rounded"
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />

        <input
          className="p-2 border rounded"
          placeholder="Contact"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
        />

        <input
          type="date"
          className="p-2 border rounded col-span-2"
          value={form.joinedDate}
          onChange={(e) => setForm({ ...form, joinedDate: e.target.value })}
        />

        <button
          type="submit"
          className="col-span-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          {editingId ? "✏️ Update Staff" : "➕ Add Staff"}
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-2">👥 Staff List</h3>
        <ul className="space-y-2">
          {staffList.length > 0 ? (
            staffList.map((staff) => (
              <li key={staff._id} className="p-3 border rounded shadow-sm">
                <strong>{staff.name}</strong> - {staff.role} in {staff.department} <br />
                📞 {staff.contact} <br />
                🗓️ Joined:{" "}
                {staff.joinedDate
                  ? new Date(staff.joinedDate).toLocaleDateString()
                  : "N/A"}{" "}
                <br />
                <div className="flex gap-2 mt-2">
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
            <p>No staff found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Staff;
