import React, { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const FinanceCard = ({ title, value, icon }) => (
  <div className="flex items-center bg-white p-4 rounded-xl shadow hover:shadow-md transition">
    <div className="text-blue-600 text-3xl mr-4">{icon}</div>
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <h2 className="text-2xl font-bold">₹{value}</h2>
    </div>
  </div>
);

export default function Finance() {
  const [billingSummary, setBillingSummary] = useState(null);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientId: "",
    amount: "",
    status: "Unpaid",
    date: new Date().toISOString().slice(0, 10),
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSummary();
    fetchPatients();
  }, []);

  const fetchSummary = () => {
    fetch(`${API_BASE_URL}/api/billing/summary`)
      .then((res) => res.json())
      .then((data) => setBillingSummary(data))
      .catch((err) => console.error("Failed to fetch billing summary", err));
  };

  const fetchPatients = () => {
    fetch(`${API_BASE_URL}/api/patients`)
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error("Failed to fetch patients", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/billing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("✅ Billing record added!");
        setFormData({
          patientId: "",
          amount: "",
          status: "Unpaid",
          date: new Date().toISOString().slice(0, 10),
        });
        fetchSummary();
      } else {
        const data = await res.json();
        setMessage(`❌ ${data.message || "Submission failed"}`);
      }
    } catch (err) {
      setMessage("❌ Failed to submit billing");
    }
  };

  if (!billingSummary) return <div className="p-6">Loading billing data...</div>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-semibold">Financial Overview</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FinanceCard title="Today's Bills Generated" value={billingSummary.dailyBills} icon="🧾" />
        <FinanceCard title="Payments Received" value={billingSummary.paymentsReceived} icon="💸" />
        <FinanceCard title="Outstanding Amount" value={billingSummary.outstanding} icon="📉" />
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Add Billing Record</h2>

        {message && (
          <div className={`mb-4 font-medium ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Patient</label>
            <select
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">-- Select Patient --</option>
              {patients.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.slno ? `${p.slno} - ${p.name}` : p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Billing
          </button>
        </form>
      </div>
    </div>
  );
}
