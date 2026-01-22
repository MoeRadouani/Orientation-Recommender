import React from 'react';
import { User, Mail, GraduationCap } from 'lucide-react';

const ProfilePage = ({ user }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
         <h1 className="text-3xl font-bold text-slate-900">Mon Profil Étudiant</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
           <div className="absolute -bottom-12 left-8">
             <div className="h-24 w-24 bg-white rounded-full p-1.5 shadow-lg">
                <div className="h-full w-full bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <User size={48} />
                </div>
             </div>
           </div>
        </div>
        
        <div className="pt-16 pb-8 px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
               <label className="text-xs font-bold text-slate-400 uppercase">Identité</label>
               <div className="mt-2 text-lg font-semibold text-slate-900">{user.firstName} {user.lastName}</div>
             </div>
             <div>
               <label className="text-xs font-bold text-slate-400 uppercase">Email</label>
               <div className="mt-2 text-lg font-medium text-slate-700 flex items-center">
                 <Mail className="w-4 h-4 mr-2 text-indigo-500" />
                 {user.email}
               </div>
             </div>
             <div className="md:col-span-2 border-t border-slate-100 pt-6">
               <label className="text-xs font-bold text-slate-400 uppercase">Parcours</label>
               <div className="mt-3 flex items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                 <GraduationCap className="w-6 h-6 text-indigo-600 mr-4" />
                 <div>
                   <div className="font-bold text-indigo-900 text-lg">Licence d'Excellence</div>
                   <div className="text-indigo-600 text-sm">Université Hassan II de Casablanca</div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;