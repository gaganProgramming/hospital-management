import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:10000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex">
{/* Left Section */}
<div
  className="w-1/2 hidden md:flex flex-col justify-center items-start px-10 py-16 text-white relative"
  style={{
    backgroundImage: `url('https://images.unsplash.com/photo-1600195077074-3cadb1b3a4f1')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="absolute inset-0 bg-[#FFF9E3] bg-opacity-60"></div> {/* Creamy overlay */}
  <div className="relative z-10 text-gray-900">
    <h2 className="text-4xl font-bold mb-4">Welcome  to HealthHub!!</h2>
    <p className="mb-6 max-w-sm">
      Access your hospital dashboard, manage patients, staff and appointments securely.
    </p>
    <div className="flex space-x-4 text-xl text-gray-800">
      <i className="fab fa-facebook-f"></i>
      <i className="fab fa-twitter"></i>
      <i className="fab fa-instagram"></i>
      <i className="fab fa-youtube"></i>
    </div>
  </div>
</div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-10">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Sign in
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-gray-600">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-gray-600">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Lost your password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"
            >
              Sign in now
            </button>
            <p className="text-xs text-gray-500 mt-4 text-center">
              By clicking on "Sign in now" you agree to our{" "}
              <a href="#" className="text-blue-500 underline">
                Terms of Service
              </a>{" "}
              |{" "}
              <a href="#" className="text-blue-500 underline">
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
