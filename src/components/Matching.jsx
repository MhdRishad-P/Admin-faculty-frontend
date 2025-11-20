// frontend/src/components/Matching.jsx
import React, { useState } from "react";
import api from "../api";
import { ChevronDown } from "lucide-react";

export default function Matching() {
  const SUBJECT_OPTIONS = [
    "Maths", "Chemistry", "Biology", "Physics", "Social Science",
    "Malayalam", "English", "Arabic", "Hindi", "French",
    "Accountancy", "Economics", "Business Studies", "Science"
  ];

  const SYLLABUS_OPTIONS = ["CBSE", "State", "ICSE", "NCERT"];

  const LANGUAGE_OPTIONS = [
    "Fluent in English",
    "English+Malayalam Mix",
    "Malayalam only"
  ];

  const GRADE_OPTIONS = [
    "LKG","UKG","1st","2nd","3rd","4th","5th","6th",
    "7th","8th","9th","10th","+1","+2"
  ];

  const [req, setReq] = useState({
    studentName: "",
    subject: [],
    syllabus: [],
    languagePreference: [],
    classFrom: "14:00",
    classTo: "16:00",
    requestedGrade: [],
  });

  const [open, setOpen] = useState({
    subject: false,
    syllabus: false,
    language: false,
    grade: false,
  });

  const [results, setResults] = useState([]);

  const toggleSelect = (key, value) => {
    const arr = [...req[key]];
    if (arr.includes(value)) arr.splice(arr.indexOf(value), 1);
    else arr.push(value);
    setReq({ ...req, [key]: arr });
  };

  // ✅ FIXED: convert arrays → comma-separated strings to avoid 400 error
  const find = async (e) => {
    e.preventDefault();

    const payload = {
      ...req,
      subject: req.subject.join(","),
      syllabus: req.syllabus.join(","),
      languagePreference: req.languagePreference.join(","),
      requestedGrade: req.requestedGrade.join(","),
    };

    const res = await api.findMatches(payload);
    setResults(res.data);
  };

  const sendWA = async (faculty) => {
    const message = `Hello ${faculty.fullName}, we have a class for ${req.studentName} on ${req.subject.join(
      ", "
    )} from ${req.classFrom} to ${req.classTo}. Please confirm.`;

    const r = await api.createWA({ phone: faculty.whatsappNumber, message });
    window.open(r.data.waLink, "_blank");
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Faculty Matching</h2>

      <form onSubmit={find} className="space-y-3 mb-4">

        {/* Student Name */}
        <input
          className="w-full border p-2 rounded"
          placeholder="Student Name"
          value={req.studentName}
          onChange={(e) => setReq({ ...req, studentName: e.target.value })}
        />

        {/* SUBJECT MULTISELECT */}
        <div>
          <label className="font-medium">Subject</label>
          <div
            className="border p-2 rounded flex justify-between cursor-pointer bg-white"
            onClick={() => setOpen({ ...open, subject: !open.subject })}
          >
            <span>
              {req.subject.length > 0
                ? req.subject.join(", ")
                : "Select Subjects"}
            </span>
            <ChevronDown size={18} />
          </div>

          {open.subject && (
            <div className="border rounded mt-1 bg-white shadow max-h-40 overflow-y-auto">
              {SUBJECT_OPTIONS.map((s) => (
                <div
                  key={s}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    req.subject.includes(s) ? "bg-blue-100" : ""
                  }`}
                  onClick={() => toggleSelect("subject", s)}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SYLLABUS MULTISELECT */}
        <div>
          <label className="font-medium">Syllabus</label>
          <div
            className="border p-2 rounded flex justify-between cursor-pointer bg-white"
            onClick={() => setOpen({ ...open, syllabus: !open.syllabus })}
          >
            <span>
              {req.syllabus.length > 0
                ? req.syllabus.join(", ")
                : "Select Syllabus"}
            </span>
            <ChevronDown size={18} />
          </div>

          {open.syllabus && (
            <div className="border rounded mt-1 bg-white shadow max-h-40 overflow-y-auto">
              {SYLLABUS_OPTIONS.map((sy) => (
                <div
                  key={sy}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    req.syllabus.includes(sy) ? "bg-green-100" : ""
                  }`}
                  onClick={() => toggleSelect("syllabus", sy)}
                >
                  {sy}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* LANGUAGE MULTISELECT */}
        <div>
          <label className="font-medium">Language Preference</label>
          <div
            className="border p-2 rounded flex justify-between cursor-pointer bg-white"
            onClick={() => setOpen({ ...open, language: !open.language })}
          >
            <span>
              {req.languagePreference.length > 0
                ? req.languagePreference.join(", ")
                : "Select Languages"}
            </span>
            <ChevronDown size={18} />
          </div>

          {open.language && (
            <div className="border rounded mt-1 bg-white shadow max-h-40 overflow-y-auto">
              {LANGUAGE_OPTIONS.map((l) => (
                <div
                  key={l}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    req.languagePreference.includes(l) ? "bg-purple-100" : ""
                  }`}
                  onClick={() => toggleSelect("languagePreference", l)}
                >
                  {l}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TIME INPUTS */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="font-medium text-sm">From</label>
            <input
              type="time"
              value={req.classFrom}
              onChange={(e) => setReq({ ...req, classFrom: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex-1">
            <label className="font-medium text-sm">To</label>
            <input
              type="time"
              value={req.classTo}
              onChange={(e) => setReq({ ...req, classTo: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        {/* GRADE MULTISELECT */}
        <div>
          <label className="font-medium">Requested Grade (optional)</label>
          <div
            className="border p-2 rounded flex justify-between cursor-pointer bg-white"
            onClick={() => setOpen({ ...open, grade: !open.grade })}
          >
            <span>
              {req.requestedGrade.length > 0
                ? req.requestedGrade.join(", ")
                : "Select Grades"}
            </span>
            <ChevronDown size={18} />
          </div>

          {open.grade && (
            <div className="border rounded mt-1 bg-white shadow max-h-40 overflow-y-auto">
              {GRADE_OPTIONS.map((g) => (
                <div
                  key={g}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    req.requestedGrade.includes(g) ? "bg-orange-100" : ""
                  }`}
                  onClick={() => toggleSelect("requestedGrade", g)}
                >
                  {g}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Find Matches
        </button>
      </form>

      {/* RESULTS */}
      <div>
        <h3 className="font-semibold mb-2">Results</h3>
        <ul>
          {results.map((r) => (
            <li
              key={r.facultyId}
              className="border p-2 rounded mb-2 flex justify-between items-center"
            >
              <div>
                <div className="font-medium">
                  {r.fullName}{" "}
                  <span className="text-sm text-gray-500">({r.score})</span>
                </div>
                <div className="text-xs text-gray-600">
                  {r.matchedReasons?.join(", ")}
                </div>
              </div>

              <button
                className="text-green-600"
                onClick={() => sendWA(r)}
              >
                Send WhatsApp
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
