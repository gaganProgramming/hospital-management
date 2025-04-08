import React, { useEffect, useState } from "react";

const FinanceCard = ({ title, value, icon }) => (
  <div className="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition">
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
    fetch("http://localhost:10000/api/billing/summary")
      .then((res) => res.json())
      .then((data) => setBillingSummary(data))
      .catch((err) => console.error("Failed to fetch billing summary", err));
  };

  const fetchPatients = () => {
    fetch("http://localhost:10000/api/patients")
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
      const res = await fetch("http://localhost:10000/api/billing", {
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

  if (!billingSummary) return <div>Loading billing data...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Financial Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FinanceCard title="Today's Bills Generated" value={billingSummary.dailyBills} icon="🧾" />
        <FinanceCard title="Payments Received" value={billingSummary.paymentsReceived} icon="💸" />
        <FinanceCard title="Outstanding Amount" value={billingSummary.outstanding} icon="📉" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow max-w-2xl mt-10">
        <h2 className="text-xl font-semibold mb-4">Add Billing Record</h2>

        {message && (
          <div className={`mb-4 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Select Patient</label>
            <select
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
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
            <label className="block text-sm font-medium">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Billing
          </button>
        </form>
      </div>
    </div>
  );
}
