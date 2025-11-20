// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FacultyDashboard from "./components/FacultyDashboardUI";
import FacultyManagement from "./components/FacultyManagement";
import Matching from "./components/Matching";

export default function App() {
  return (
    <Routes>
    
      
          {/* MAIN DASHBOARD */}
          <Route path="/" element={<FacultyDashboard />} />

          {/* OPTIONAL DIRECT ROUTES */}
          <Route path="/faculty-management" element={<FacultyManagement />} />
          <Route path="/faculty-matching" element={<Matching />} />
        
      
    </Routes>
  );
}
