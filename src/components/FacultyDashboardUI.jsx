import React, { useState } from "react";
import { Users, UserPlus, Search, Layers } from "lucide-react";
import FacultyManagement from "./FacultyManagement";
import Matching from "./Matching";

export default function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState("management");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-100 to-green-600 p-6 text-black">
      {/* MAIN HEADING */}
      <h1 className="text-5xl font-sans text-black font-bold text-ellipsis text-center mb-10 drop-shadow-xl">
        FACULTY MATCHING APPLICATION
      </h1>

      {/* TAB BUTTONS */}
      <div className="flex justify-center gap-6 mb-8">
        <button
          onClick={() => setActiveTab("management")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-lg shadow-lg transition-all ${
            activeTab === "management"
              ? "bg-white text-indigo-700 scale-105"
              : "bg-white/20 hover:bg-white/40"
          }`}
        >
          <UserPlus /> Faculty Adding
        </button>

        <button
          onClick={() => setActiveTab("matching")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-lg shadow-lg transition-all ${
            activeTab === "matching"
              ? "bg-white text-indigo-700 scale-105"
              : "bg-white/20 hover:bg-white/40"
          }`}
        >
          <Layers /> Faculty Matching
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-5xl mx-auto">
        {activeTab === "management" ? <FacultyManagement /> : <Matching />}
      </div>
    </div>
  );
}
