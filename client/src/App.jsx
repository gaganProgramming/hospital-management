// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import Patients from "./pages/Patients";
import Staff from "./pages/Staff";
import Appointments from "./pages/Appointments";
import Finance from "./pages/Finance";
import Login from "./pages/Login"; // ✅ Use your Login page
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="patients" element={<PrivateRoute><Patients /></PrivateRoute>} />
          <Route path="staff" element={<PrivateRoute><Staff /></PrivateRoute>} />
          <Route path="appointments" element={<PrivateRoute><Appointments /></PrivateRoute>} />
          <Route path="finance" element={<PrivateRoute><Finance /></PrivateRoute>} />
          <Route path="login" element={<Login />} /> {/* ✅ Keep login public */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
