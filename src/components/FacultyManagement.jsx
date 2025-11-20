// frontend/src/components/FacultyManagement.jsx
import React, { useEffect, useState } from "react";
import { Plus, Edit3, Trash, Filter, Book, PhoneCall, Search } from "lucide-react";
import api from "../api";
import FacultyForm from "./FacultyForm";

export default function FacultyManagement() {
  const [faculties, setFaculties] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const load = async () => {
    const res = await api.getFaculties();
    setFaculties(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = faculties.filter((f) => {
    const s = search.toLowerCase();
    return (
      f.fullName.toLowerCase().includes(s) ||
      (f.subjects || []).join(" ").toLowerCase().includes(s) ||
      f.whatsappNumber.toLowerCase().includes(s)
    );
  });

  const onSave = async (dto) => {
    if (dto.id) await api.updateFaculty(dto.id, dto);
    else await api.addFaculty(dto);
    setShowForm(false);
    setEditing(null);
    load();
  };

  const onDelete = async (id) => {
    if (confirm("Delete this faculty?")) {
      await api.deleteFaculty(id);
      load();
    }
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl border border-gray-100">

      {/* Header */}
      <div className="flex justify-between mb-6 items-center">
        <h2 className="text-2xl font-bold text-gray-800">Faculty Management</h2>

        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-md transition"
        >
          <Plus size={20} />
          Add Faculty
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search name, subjects or WhatsApp..."
          className="w-full pl-10 p-3 rounded-xl border border-gray-300 focus:ring focus:ring-blue-300 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <FacultyForm
          initial={editing}
          onSave={onSave}
          onCancel={() => {
            setEditing(null);
            setShowForm(false);
          }}
        />
      )}

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200 shadow-md">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left text-gray-700 font-semibold">Name</th>
              <th className="p-3 text-left text-gray-700 font-semibold">Subjects</th>
              <th className="p-3 text-left text-gray-700 font-semibold">WhatsApp</th>
              <th className="p-3 text-center text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-6 text-gray-500">
                  No faculty found.
                </td>
              </tr>
            ) : (
              filtered.map((f) => (
                <tr
                  key={f.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium text-gray-800">{f.fullName}</td>

                  {/* Tag-like subjects */}
                  <td className="p-3 flex flex-wrap gap-2">
                    {(f.subjects || []).map((sub, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1"
                      >
                        <Book size={14} /> {sub}
                      </span>
                    ))}
                  </td>

                  <td className="p-3 flex items-center gap-2 text-gray-700">
                    <PhoneCall size={18} className="text-green-600" />
                    {f.whatsappNumber}
                  </td>

                  <td className="p-3 text-center flex justify-center gap-4">

                    {/* Edit */}
                    <button
                      onClick={() => {
                        setEditing(f);
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Edit3 size={20} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => onDelete(f.id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash size={20} />
                    </button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
