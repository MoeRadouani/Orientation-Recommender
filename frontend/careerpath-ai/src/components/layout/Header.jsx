import React from 'react';
import { Sparkles, LayoutDashboard, UserCircle, LogOut, Shield } from 'lucide-react';

const Header = ({ onLogout, user, currentView, onViewChange }) => (
  <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onViewChange('dashboard')}>
        <div className={`p-2 rounded-lg ${user.role === 'admin' ? 'bg-slate-800' : 'bg-indigo-600'}`}>
          {user.role === 'admin' ? <Shield className="text-white h-5 w-5" /> : <Sparkles className="text-white h-5 w-5" />}
        </div>
        <span className={`text-xl font-bold bg-clip-text text-transparent ${user.role === 'admin' ? 'bg-gradient-to-r from-slate-700 to-slate-900' : 'bg-gradient-to-r from-indigo-700 to-blue-600'}`}>
          {user.role === 'admin' ? 'CareerPath Admin' : 'CareerPath.AI'}
        </span>
      </div>
      <nav className="hidden md:flex items-center space-x-2 text-sm font-medium text-slate-500">
        <button 
          onClick={() => onViewChange('dashboard')}
          className={`px-3 py-2 rounded-lg transition-colors flex items-center ${currentView === 'dashboard' ? (user.role === 'admin' ? 'bg-slate-100 text-slate-900' : 'bg-indigo-50 text-indigo-700') : 'hover:text-slate-800'}`}
        >
          <LayoutDashboard className="w-4 h-4 mr-2" /> Tableau de bord
        </button>
        
        {user.role !== 'admin' && (
          <button 
            onClick={() => onViewChange('profile')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center ${currentView === 'profile' ? 'bg-indigo-50 text-indigo-700' : 'hover:text-indigo-600'}`}
          >
            <UserCircle className="w-4 h-4 mr-2" /> Profil
          </button>
        )}
        
        <div className="flex items-center pl-6 border-l border-slate-200 ml-4">
           <div className="flex flex-col items-end mr-3">
             <span className="text-xs font-bold text-slate-700">{user.firstName} {user.lastName}</span>
             <span className="text-[10px] text-slate-400">{user.role === 'admin' ? 'Admin' : "Étudiant"}</span>
           </div>
           <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${user.role === 'admin' ? 'bg-slate-800' : 'bg-indigo-600'}`}>
             {user.firstName[0]}{user.lastName[0]}
           </div>
           <button onClick={onLogout} className="ml-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
             <LogOut className="h-4 w-4" />
           </button>
        </div>
      </nav>
    </div>
  </header>
);

export default Header;