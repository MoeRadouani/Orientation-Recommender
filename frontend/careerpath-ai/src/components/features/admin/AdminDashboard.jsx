import React, { useState } from "react";
import { Users, Trash2, Eye, X } from "lucide-react";
import { createPortal } from "react-dom";
import Header from "../../layout/Header";
import { SUBJECTS_DATA } from "../../../data/subjects.jsx";

const AdminDashboard = ({ onLogout, user, users, setUsers }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const students = users.filter(u => u?.role === "student");

  const handleDeleteUser = (id) => {
    if (window.confirm("Supprimer cet étudiant ?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onLogout={onLogout} user={user} currentView="dashboard" />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <Users /> Étudiants
        </h1>

        {/* FULL WIDTH TABLE */}
        <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden -mt-2">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
  <tr>
    <th className="px-6 py-3 text-left">Nom</th>
    <th className="px-6 py-3 text-left">Email</th>
    <th className="px-6 py-3 text-left">Recommandation</th>
    <th className="px-6 py-3 text-right">Actions</th>
  </tr>
</thead>
            <tbody className="divide-y">
              {students.map(s => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">
                    {s.firstName} {s.lastName}
                  </td>
                  <td className="px-6 py-4">{s.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                      {s.prediction?.recommended_domain || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => setSelectedUser(s)}
                      className="p-1 text-indigo-600 hover:bg-indigo-50 rounded"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(s.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* POP-OUT MODAL */}
      {selectedUser &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full p-6 relative scale-95">
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>

              <h2 className="text-xl font-bold mb-4">
                {selectedUser.firstName} {selectedUser.lastName}
              </h2>

              {/* GRADES */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {SUBJECTS_DATA.map(s => (
                  <div
                    key={s.id}
                    className="flex justify-between bg-slate-50 px-3 py-2 rounded"
                  >
                    <span>{s.label}</span>
                    <span className="font-semibold">
                      {selectedUser.grades?.[s.id] ?? 0}/20
                    </span>
                  </div>
                ))}
              </div>

              {/* BEST RECOMMENDATION */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                <h3 className="text-sm font-bold text-indigo-700 mb-1">
                  Orientation recommandée
                </h3>
                <p className="text-indigo-900 font-semibold">
                  {selectedUser.prediction?.recommended_domain || "Non disponible"}
                </p>
                
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default AdminDashboard;
