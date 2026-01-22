import React, { useState } from 'react';
import Header from '../../layout/Header';
import { StudentCard, HelpBox, GradesCard, ResultCard, ProfilePage } from './StudentWidgets';
import { DEFAULT_GRADES } from '../../../data/constants';
import { predictOrientation } from "../../../services/api.js";
import { createPortal } from "react-dom";


const StudentDashboard = ({ onLogout, user, onUpdateUser }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [grades, setGrades] = useState({
  ...DEFAULT_GRADES,
  ...(user.grades || {})
});
  const [prediction, setPrediction] = useState(null);

  const handleGradeChange = (id, value) => {
    let numValue = parseFloat(value);
    if (numValue > 20) numValue = 20;
    if (numValue < 0) numValue = 0;
    if (isNaN(numValue)) numValue = 0;

    setGrades(prev => ({ ...prev, [id]: numValue }));
  };

  const handleRecommend = async () => {
    setLoading(true);

    try {
      // 🔹 Call AI backend
      const result = await predictOrientation(grades);

      // 🔹 Save grades to user profile
      onUpdateUser({ ...user, grades, prediction: result, });

      // 🔹 Save AI prediction
      setPrediction(result);
      setShowResult(true);

      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } catch (error) {
      console.error("Recommendation failed:", error);
      alert("L’analyse IA a échoué. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header
        onLogout={onLogout}
        user={user}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {currentView === 'profile' ? (
        <ProfilePage user={user} />
      ) : (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-4 space-y-6">
              <StudentCard user={user} />

              

              <HelpBox />
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-8 space-y-8">

              {/* GRADES INPUT */}
              <GradesCard
                grades={grades}
                onGradeChange={handleGradeChange}
                loading={loading}
                onRecommend={handleRecommend}
                showResult={showResult}
              />

              {/* AI RESULT */}
              {showResult && prediction &&
  createPortal(
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      
      <div className="relative max-w-4xl w-full animate-in fade-in duration-300 scale-90">
        
        <button
          onClick={() => {
            setShowResult(false);
            document.body.style.overflow = "auto";
          }}
          className="absolute -top-4 -right-4 bg-white text-slate-800 rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg hover:bg-slate-100 transition"
        >
          ✕
        </button>

        <ResultCard grades={grades} prediction={prediction} />
      </div>
    </div>,
    document.body
  )
}


            </div>

          </div>
        </main>
      )}
    </div>
  );
};

export default StudentDashboard;
