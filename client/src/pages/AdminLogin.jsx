import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:10000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("✅ Logged in successfully!");
      navigate("/"); // or /dashboard, wherever your home is
    } catch (err) {
      console.error("Login error:", err);
      alert("❌ Invalid email or password");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 border shadow rounded bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">🔐 Admin Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="p-2 border rounded w-full"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          className="p-2 border rounded w-full"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
