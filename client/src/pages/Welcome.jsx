// src/pages/Welcome.jsx or wherever your Welcome component is
import React from "react";
import bgImage from "../assets/bgImage.jpg"; // Adjust the path

const Welcome = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="h-full w-full bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to HealthHub</h1>
        <p className="text-lg mb-6">Your complete hospital management system</p>
        <button className="bg-amber-400 text-black px-6 py-2 rounded hover:bg-amber-500 transition">
          🚀 Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
