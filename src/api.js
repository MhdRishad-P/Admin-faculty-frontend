// frontend/src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://admin-faculty-backend-production.up.railway.app',
  headers: { 'Content-Type': 'application/json' }
});

export default {
  // Faculties
  getFaculties: () => API.get('/api/admin/faculties'),
  addFaculty: (f) => API.post('/api/admin/faculties', f),
  updateFaculty: (id, f) => API.put(`/api/admin/faculties/${id}`, f),
  deleteFaculty: (id) => API.delete(`/api/admin/faculties/${id}`),

  // Matching
  findMatches: (req) => API.post('/api/match/find', req),

  // WhatsApp
  createWA: (payload) => API.post('/api/whatsapp/create-link', payload)
};
