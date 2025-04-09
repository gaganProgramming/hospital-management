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
    const confirmDelete = window.confirm("Are you sure you want to delete this staff member?");
    if (!confirmDelete) return;
    try {
      await deleteStaff(id);
      await getAllStaff();
    } catch (err) {
      console.error("❌ Error deleting staff:", err);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">👨‍⚕️ Staff Management</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
      >
        <input
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <select
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
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
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />

        <input
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Contact"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
        />

        <input
          type="date"
          className="p-2 border border-gray-300 rounded col-span-1 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={form.joinedDate}
          onChange={(e) => setForm({ ...form, joinedDate: e.target.value })}
        />

        <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
          >
            {editingId ? "✏️ Update Staff" : "➕ Add Staff"}
          </button>
          {editingId && (
            <button
              type="button"
              className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition"
              onClick={resetForm}
            >
              🔄 Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div>
        <h3 className="text-xl font-semibold mb-2 text-center sm:text-left">👥 Staff List</h3>
        <ul className="space-y-3">
          {staffList.length > 0 ? (
            staffList.map((staff) => (
              <li
                key={staff._id}
                className="p-4 border rounded shadow-sm bg-neutral-50 flex flex-col sm:flex-row sm:justify-between gap-3"
              >
                <div className="text-sm text-gray-700">
                  <strong className="text-base">{staff.name}</strong> - {staff.role} in {staff.department}
                  <br />
                  📞 {staff.contact}
                  <br />
                  🗓️ Joined:{" "}
                  {staff.joinedDate
                    ? new Date(staff.joinedDate).toLocaleDateString()
                    : "N/A"}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    className="px-3 py-1 bg-yellow-300 hover:bg-yellow-400 text-gray-800 rounded transition"
                    onClick={() => handleEdit(staff)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-rose-300 hover:bg-rose-400 text-white rounded transition"
                    onClick={() => handleDelete(staff._id)}
                  >
                   Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600">No staff found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Staff;
