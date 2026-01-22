import React from 'react';
import { User, Mail, GraduationCap } from 'lucide-react';

// Note: Je reçois maintenant 'user' en props, plus de setStudent ici
const StudentCard = ({ user }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 h-24 relative">
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="h-20 w-20 bg-white rounded-full p-1 shadow-md">
          <div className="h-full w-full bg-slate-100 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
    <div className="pt-12 pb-6 px-6 text-center">
      <h2 className="text-xl font-bold text-slate-800">{user.firstName} {user.lastName}</h2>
      <p className="text-sm text-slate-500 mt-1">Étudiant UH2C</p>
      
      <div className="mt-6 space-y-4 text-left">
        <div className="group">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
          <div className="flex items-center mt-1 bg-slate-50 p-2 rounded-lg border border-transparent">
            <Mail className="h-4 w-4 text-indigo-500 mr-2" />
            <span className="text-sm font-medium text-slate-700 truncate">{user.email}</span>
          </div>
        </div>
        
        <div className="group">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Niveau</label>
          <div className="flex items-center mt-1 bg-indigo-50 p-2 rounded-lg border border-indigo-100">
            <GraduationCap className="h-4 w-4 text-indigo-600 mr-2" />
            <span className="text-sm font-bold text-indigo-800">{user.level}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default StudentCard;