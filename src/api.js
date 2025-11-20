// frontend/src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'admin-faculty-backend-production.up.railway.appgit add ./api',
  headers: { 'Content-Type': 'application/json' }
});

export default {
  // Faculties
  getFaculties: () => API.get('/admin/faculties'),
  addFaculty: (f) => API.post('/admin/faculties', f),
  updateFaculty: (id,f) => API.put(`/admin/faculties/${id}`, f),
  deleteFaculty: (id) => API.delete(`/admin/faculties/${id}`),

  // Matching
  findMatches: (req) => API.post('/match/find', req),

  // WhatsApp
  createWA: (payload) => API.post('/whatsapp/create-link', payload)
};
