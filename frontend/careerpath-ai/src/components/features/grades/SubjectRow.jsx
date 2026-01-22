import React from 'react';

// Fonction utilitaire locale pour la couleur
const getProgressColor = (grade) => {
  if (grade < 8) return 'bg-red-400';
  if (grade < 12) return 'bg-yellow-400';
  if (grade < 16) return 'bg-blue-400';
  return 'bg-emerald-500';
};

const SubjectRow = ({ subject, grade, onChange }) => (
  <div className="relative group">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg bg-slate-50 mr-3 ${subject.color}`}>
          {subject.icon}
        </div>
        <label htmlFor={subject.id} className="font-medium text-slate-700 text-sm sm:text-base">
          {subject.label}
        </label>
      </div>
      <div className="flex items-center">
         <input
          type="number"
          id={`input-${subject.id}`}
          min="0"
          max="20"
          value={grade}
          onChange={(e) => onChange(subject.id, e.target.value)}
          className="w-16 text-right font-bold text-slate-900 border-b-2 border-slate-200 focus:border-indigo-500 focus:outline-none bg-transparent transition-colors py-1 mr-1"
        />
        <span className="text-slate-400 text-sm font-medium">/20</span>
      </div>
    </div>
    
    <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
      <div 
        className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-out ${getProgressColor(grade)}`}
        style={{ width: `${(grade / 20) * 100}%` }}
      ></div>
      <input
        type="range"
        id={subject.id}
        min="0"
        max="20"
        step="0.5"
        value={grade}
        onChange={(e) => onChange(subject.id, e.target.value)}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  </div>
);

export default SubjectRow;