// src/components/SummaryCard.jsx
import React from "react";

const SummaryCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-xl transition duration-300 flex items-center justify-between">
      <div className="text-4xl">{icon}</div>
      <div className="text-right">
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      </div>
    </div>
  );
};

export default SummaryCard;
