import React from 'react';
import { BarChart3, ChevronRight } from 'lucide-react';
import { SUBJECTS_DATA } from '../../../data/subjects.jsx';
import SubjectRow from './SubjectRow';

const GradesCard = ({ grades, onGradeChange, loading, onRecommend, showResult }) => {
  const average = (Object.values(grades).reduce((a, b) => a + b, 0) / Object.values(grades).length).toFixed(1);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-800 flex items-center">
          <BarChart3 className="mr-2 text-indigo-600" />
          Notes par matière
        </h2>
        <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
          Moyenne actuelle : {average}/20
        </span>
      </div>

      <div className="space-y-6">
        {SUBJECTS_DATA.map((subject) => (
          <SubjectRow 
            key={subject.id} 
            subject={subject} 
            grade={grades[subject.id]} 
            onChange={onGradeChange} 
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-8 mt-4 border-t border-slate-100">
          {!showResult && (
            <p className="text-sm text-slate-500 italic hidden sm:block">
              Assurez-vous que toutes les notes sont correctes avant de valider.
            </p>
          )}
        <button
          onClick={onRecommend}
          disabled={loading}
          className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white shadow-lg shadow-indigo-200 flex items-center justify-center transition-all duration-300 transform active:scale-95
            ${loading 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-300'
            }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyse en cours...
            </>
          ) : (
            <>
              Lancer la recommandation
              <ChevronRight className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GradesCard;