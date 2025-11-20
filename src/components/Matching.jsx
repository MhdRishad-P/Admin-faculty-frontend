// frontend/src/components/Matching.jsx
import React, {useState} from 'react';
import api from '../api';

export default function Matching(){
  const [req, setReq] = useState({studentName:'', subject:'', syllabus:'', languagePreference:'', classFrom:'14:00', classTo:'16:00', requestedGrade:''});
  const [results, setResults] = useState([]);

  const find = async (e) => {
    e.preventDefault();
    const res = await api.findMatches(req);
    setResults(res.data);
  };

  const sendWA = async (faculty) => {
    const message = `Hello ${faculty.fullName}, we have a class for ${req.studentName} on ${req.subject} from ${req.classFrom} to ${req.classTo}. Please confirm.`;
    // open click-to-chat (also backend can return link)
    const r = await api.createWA({ phone: faculty.whatsappNumber, message });
    const link = r.data.waLink;
    window.open(link, '_blank');
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Faculty Matching</h2>
      <form onSubmit={find} className="space-y-2 mb-3">
        <input className="w-full border p-2" placeholder="Student name" value={req.studentName} onChange={e=>setReq({...req, studentName:e.target.value})}/>
        <input className="w-full border p-2" placeholder="Subject" value={req.subject} onChange={e=>setReq({...req, subject:e.target.value})}/>
        <input className="w-full border p-2" placeholder="Syllabus" value={req.syllabus} onChange={e=>setReq({...req, syllabus:e.target.value})}/>
        <input className="w-full border p-2" placeholder="Language preference" value={req.languagePreference} onChange={e=>setReq({...req, languagePreference:e.target.value})}/>
        <div className="flex gap-2">
          <input type="time" value={req.classFrom} onChange={e=>setReq({...req, classFrom:e.target.value})} className="border p-2"/>
          <input type="time" value={req.classTo} onChange={e=>setReq({...req, classTo:e.target.value})} className="border p-2"/>
        </div>
        <input className="w-full border p-2" placeholder="Requested grade (optional)" value={req.requestedGrade} onChange={e=>setReq({...req, requestedGrade:e.target.value})}/>
        <div>
          <button className="bg-indigo-600 text-white px-3 py-1 rounded" type="submit">Find Matches</button>
        </div>
      </form>

      <div>
        <h3 className="font-semibold">Results</h3>
        <ul>
          {results.map(r => (
            <li key={r.facultyId} className="border p-2 rounded mb-2 flex justify-between items-center">
              <div>
                <div className="font-medium">{r.fullName} <span className="text-sm text-gray-500">({r.score})</span></div>
                <div className="text-xs text-gray-600">{r.matchedReasons?.join(', ')}</div>
              </div>
              <div className="space-x-2">
                <button className="text-green-600" onClick={()=>sendWA(r)}>Send WhatsApp</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
