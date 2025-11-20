// frontend/src/components/FacultyForm.jsx
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FacultyForm({ initial, onSave, onCancel }) {
  
  const SUBJECT_OPTIONS = [
    "Maths", "Chemistry", "Biology", "Physics", "Social Science",
    "Malayalam", "English", "Arabic", "Hindi", "French",
    "Accountancy", "Economics", "Business Studies", "Science"
  ];

  const LECTURING_LANG_OPTIONS = [
    "Fluent in English","English+Malayalam Mix","Malayalam only"
  ];

  const GRADE_OPTIONS = [
    "LKG","UKG","1st","2nd","3rd","4th","5th","6th",
    "7th","8th","9th","10th","+1","+2"
  ];

  const [data, setData] = useState({
    id: null,
    fullName: "",
    whatsappNumber: "",
    subjects: [],
    lecturingLanguage: [],
    teachingGrades: [],
    availableHours: [],
  });

  const [openSubjects, setOpenSubjects] = useState(false);
  const [openLecturingLang, setOpenLecturingLang] = useState(false);
  const [openGrades, setOpenGrades] = useState(false);

  useEffect(() => {
    if (initial) {
      setData({
        id: initial.id,
        fullName: initial.fullName || "",
        whatsappNumber: initial.whatsappNumber || "",
        subjects: initial.subjects || [],
        lecturingLanguage: initial.lecturingLanguage || [],
        teachingGrades: initial.teachingGrades || [],
        availableHours: initial.availableHours || [],
      });
    }
  }, [initial]);

  const toggleSelected = (key, value) => {
    const arr = [...data[key]];
    if (arr.includes(value)) arr.splice(arr.indexOf(value), 1);
    else arr.push(value);
    setData({ ...data, [key]: arr });
  };

  const submit = (e) => {
    e.preventDefault();
    onSave(data);
  };

  const addSlot = () => {
    setData({
      ...data,
      availableHours: [...data.availableHours, { from: "09:00", to: "10:00" }],
    });
  };

  return (
    <form
      className="bg-gray-50 p-5 border rounded-xl mb-5 shadow-sm"
      onSubmit={submit}
    >
      {/* FULL NAME */}
      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Full Name"
        value={data.fullName}
        required
        onChange={(e) => setData({ ...data, fullName: e.target.value })}
      />

      {/* WHATSAPP NUMBER */}
      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="WhatsApp Number"
        value={data.whatsappNumber}
        required
        onChange={(e) => setData({ ...data, whatsappNumber: e.target.value })}
      />

      {/* SUBJECTS */}
      <div className="mb-3">
        <label className="font-medium">Subjects</label>

        <div
          className="border p-2 w-full rounded bg-white flex justify-between cursor-pointer"
          onClick={() => setOpenSubjects(!openSubjects)}
        >
          <span>
            {data.subjects.length > 0 ? data.subjects.join(", ") : "Select Subjects"}
          </span>
          <ChevronDown size={18} />
        </div>

        {openSubjects && (
          <div className="border rounded mt-1 bg-white shadow-md max-h-40 overflow-y-auto">
            {SUBJECT_OPTIONS.map((sub) => (
              <div
                key={sub}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                  data.subjects.includes(sub) ? "bg-blue-100" : ""
                }`}
                onClick={() => toggleSelected("subjects", sub)}
              >
                {sub}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LECTURING LANGUAGE */}
      <div className="mb-3">
        <label className="font-medium">Lecturing Language</label>

        <div
          className="border p-2 w-full rounded bg-white flex justify-between cursor-pointer"
          onClick={() => setOpenLecturingLang(!openLecturingLang)}
        >
          <span>
            {data.lecturingLanguage.length > 0
              ? data.lecturingLanguage.join(", ")
              : "Select Lecturing Languages"}
          </span>
          <ChevronDown size={18} />
        </div>

        {openLecturingLang && (
          <div className="border rounded mt-1 bg-white shadow-md max-h-40 overflow-y-auto">
            {LECTURING_LANG_OPTIONS.map((lang) => (
              <div
                key={lang}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                  data.lecturingLanguage.includes(lang) ? "bg-purple-100" : ""
                }`}
                onClick={() => toggleSelected("lecturingLanguage", lang)}
              >
                {lang}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TEACHING GRADES */}
      <div className="mb-3">
        <label className="font-medium">Teaching Grades</label>

        <div
          className="border p-2 w-full rounded bg-white flex justify-between cursor-pointer"
          onClick={() => setOpenGrades(!openGrades)}
        >
          <span>
            {data.teachingGrades.length > 0
              ? data.teachingGrades.join(", ")
              : "Select Grades"}
          </span>
          <ChevronDown size={18} />
        </div>

        {openGrades && (
          <div className="border rounded mt-1 bg-white shadow-md max-h-40 overflow-y-auto">
            {GRADE_OPTIONS.map((grade) => (
              <div
                key={grade}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                  data.teachingGrades.includes(grade) ? "bg-orange-100" : ""
                }`}
                onClick={() => toggleSelected("teachingGrades", grade)}
              >
                {grade}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AVAILABLE HOURS */}
      <div className="mb-3">
        <label className="font-medium">Available Time Slots</label>

        {data.availableHours.map((slot, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <input
              type="time"
              className="border p-2 rounded"
              value={slot.from}
              onChange={(e) => {
                const arr = [...data.availableHours];
                arr[i].from = e.target.value;
                setData({ ...data, availableHours: arr });
              }}
            />
            <input
              type="time"
              className="border p-2 rounded"
              value={slot.to}
              onChange={(e) => {
                const arr = [...data.availableHours];
                arr[i].to = e.target.value;
                setData({ ...data, availableHours: arr });
              }}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addSlot}
          className="text-blue-600 text-sm mt-2"
        >
          + Add Slot
        </button>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 mt-3">
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>

    </form>
  );
}
