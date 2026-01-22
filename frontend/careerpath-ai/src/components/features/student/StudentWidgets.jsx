import React, { useState } from 'react';
import { 
  User, Mail, GraduationCap, Info, BarChart3, Save, CheckCircle2, 
  TrendingUp, Award, Brain, Sparkles, AlertCircle, Target, 
  ChevronRight, Calendar, BookOpen, Star
} from 'lucide-react';
import { SUBJECTS_DATA } from '../../../data/subjects.jsx';

// --- PROFILE PAGE (UPGRADED) ---
export const ProfilePage = ({ user }) => {
  const totalModules = 8;
  const completedModules = Object.values(user.grades || {}).filter(v => v > 0).length;
  const completionRate = Math.round((completedModules / totalModules) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative bg-gradient-to-br from-white to-indigo-50 rounded-3xl shadow-2xl border border-indigo-100 overflow-hidden">

        {/* HEADER */}
        <div className="relative h-52 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent_60%)]" />
          
          {/* Avatar */}
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <div className="h-32 w-32 bg-white rounded-3xl p-2 shadow-2xl">
                <div className="h-full w-full bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center text-indigo-600 border-4 border-white">
                  <User size={56} strokeWidth={1.5} />
                </div>
              </div>
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow border-2 border-white">
                Actif
              </span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="pt-24 pb-10 px-8">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* LEFT – IDENTITY */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                {user.firstName} {user.lastName}
                <Award className="text-yellow-500" size={22} />
              </h1>

              <div className="mt-2 flex items-center gap-2 text-slate-600">
                <Mail size={16} />
                <span className="text-sm">{user.email}</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Badge icon={<GraduationCap size={16} />} text="Étudiant" primary />
                <Badge icon={<BookOpen size={16} />} text="Université Hassan II" />
                <Badge icon={<Calendar size={16} />} text="Année 2025 / 2026" amber />
              </div>
            </div>

            {/* RIGHT – STATS */}
            <div className="w-full lg:w-80">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  Statistiques académiques
                </h3>

                {/* Progress */}
                <div className="mb-5">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Modules complétés</span>
                    <span className="font-semibold text-indigo-600">
                      {completedModules}/{totalModules}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>

                <StatRow label="Taux de complétion" value={`${completionRate}%`} color="text-emerald-600" />
                <StatRow label="Recommandations IA" value="1" color="text-purple-600" />
                <StatRow label="Dernière mise à jour" value="Aujourd’hui" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- SMALL UI HELPERS ---------- */

const Badge = ({ icon, text, primary, amber }) => (
  <div
    className={`px-4 py-2 rounded-xl font-medium shadow-sm border flex items-center gap-2
      ${primary && "bg-indigo-600 text-white border-indigo-600"}
      ${amber && "bg-amber-50 text-amber-700 border-amber-200"}
      ${!primary && !amber && "bg-white text-slate-700 border-slate-200"}
    `}
  >
    {icon}
    <span className="text-sm">{text}</span>
  </div>
);

const StatRow = ({ label, value, color = "text-slate-700" }) => (
  <div className="flex justify-between items-center mb-2">
    <span className="text-sm text-slate-600">{label}</span>
    <span className={`font-bold ${color}`}>{value}</span>
  </div>
);


// --- STUDENT CARD ---
export const StudentCard = ({ user }) => (
  <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-lg border border-indigo-100 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
    <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 h-28 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAtMTBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="h-24 w-24 bg-white rounded-full p-1.5 shadow-xl">
          <div className="h-full w-full bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center border-4 border-white">
            <User className="h-12 w-12 text-indigo-600" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </div>
    <div className="pt-16 pb-6 px-6 text-center">
      <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-sm text-slate-500 mt-1 flex items-center justify-center gap-1">
        <GraduationCap size={14} />
        Étudiant UH2C
      </p>
    </div>
  </div>
);

// --- HELP BOX ---
export const HelpBox = () => (
  <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
    <div className="relative flex items-start gap-4">
      <div className="flex-shrink-0 p-3 bg-indigo-600 rounded-xl shadow-lg">
        <Brain className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
          Intelligence Artificielle
          <Sparkles className="h-4 w-4 text-yellow-500" />
        </h3>
        <p className="text-sm text-indigo-700 leading-relaxed">
          Notre système d'IA analyse vos notes pour recommander <strong>l'orientation</strong> la plus adaptée à votre profil académique et à vos compétences.
        </p>
      </div>
    </div>
  </div>
);

// --- GRADES CARD ---
const getProgressColor = (grade) => {
  if (grade < 10) return 'bg-gradient-to-r from-red-400 to-red-500';
  if (grade < 14) return 'bg-gradient-to-r from-yellow-400 to-orange-400';
  if (grade < 16) return 'bg-gradient-to-r from-blue-400 to-indigo-500';
  return 'bg-gradient-to-r from-emerald-400 to-green-500';
};

const getGradeLabel = (grade) => {
  if (grade < 10) return { text: 'À améliorer', color: 'text-red-600', bg: 'bg-red-50' };
  if (grade < 14) return { text: 'Satisfaisant', color: 'text-yellow-700', bg: 'bg-yellow-50' };
  if (grade < 16) return { text: 'Bien', color: 'text-blue-600', bg: 'bg-blue-50' };
  return { text: 'Excellent', color: 'text-emerald-600', bg: 'bg-emerald-50' };
};

export const GradesCard = ({ grades, onGradeChange, loading, onRecommend, showResult }) => {
  const [focusedSubject, setFocusedSubject] = useState(null);
  const average = (Object.values(grades).reduce((a, b) => a + b, 0) / Object.values(grades).length).toFixed(1);
  const gradeLabel = getGradeLabel(parseFloat(average));
  
  const topSubjects = Object.entries(grades)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key, value]) => {
      const subject = SUBJECTS_DATA.find(s => s.id === key);
      return { ...subject, grade: value };
    });

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
              <BarChart3 className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Relevé de Notes</h2>
              <p className="text-sm text-slate-500">Année académique 2025/2026</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-xl ${gradeLabel.bg} ${gradeLabel.color} font-semibold text-sm border-2 border-current border-opacity-20`}>
              {gradeLabel.text}
            </div>
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-xl font-bold shadow-lg flex items-center gap-2">
              <TrendingUp size={18} />
              {average}/20
            </div>
          </div>
        </div>

        {/* Top 3 Subjects Quick View */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {topSubjects.map((subject, idx) => (
            <div key={subject.id} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${subject.color}`}>
                  {subject.icon}
                </div>
                {idx === 0 && <Star className="text-yellow-500 fill-yellow-500" size={16} />}
              </div>
              <p className="text-xs text-slate-500 mb-1">Top {idx + 1}</p>
              <p className="font-semibold text-slate-700 text-sm truncate">{subject.label}</p>
              <p className="text-lg font-bold text-indigo-600">{subject.grade}/20</p>
            </div>
          ))}
        </div>

        {/* Grades Input */}
        <div className="space-y-5">
          {SUBJECTS_DATA.map((subject) => {
            const isFocused = focusedSubject === subject.id;
            return (
              <div 
                key={subject.id} 
                className={`relative group bg-white rounded-2xl p-5 transition-all duration-300 border-2 ${
                  isFocused ? 'border-indigo-400 shadow-lg scale-105' : 'border-slate-100 hover:border-slate-200 hover:shadow-md'
                }`}
                onMouseEnter={() => setFocusedSubject(subject.id)}
                onMouseLeave={() => setFocusedSubject(null)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-3 rounded-xl ${subject.color} shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <label className="font-semibold text-slate-800 text-sm block mb-1">
                        {subject.label}
                      </label>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getGradeLabel(grades[subject.id]).bg} ${getGradeLabel(grades[subject.id]).color} font-medium`}>
                          {getGradeLabel(grades[subject.id]).text}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input 
                      type="number" 
                      min="0" 
                      max="20" 
                      step="0.5"
                      value={grades[subject.id]} 
                      onChange={(e) => onGradeChange(subject.id, e.target.value)} 
                      className="w-20 text-right font-bold text-2xl text-slate-900 border-b-3 border-indigo-300 focus:border-indigo-600 focus:outline-none bg-transparent px-2 py-1 rounded-lg transition-all"
                    />
                    <span className="text-slate-400 text-lg font-medium">/20</span>
                  </div>
                </div>
                
                <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 shadow-sm ${getProgressColor(grades[subject.id])}`}
                    style={{ width: `${(grades[subject.id] / 20) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="20" 
                    step="0.5" 
                    value={grades[subject.id]} 
                    onChange={(e) => onGradeChange(subject.id, e.target.value)} 
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  />
                </div>
                
                {isFocused && (
                  <div className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-in fade-in zoom-in duration-200">
                    {((grades[subject.id] / 20) * 100).toFixed(0)}%
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex justify-end mt-10 pt-6 border-t-2 border-slate-100">
          <button 
            onClick={onRecommend} 
            disabled={loading}
            className="group relative px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 shadow-2xl flex items-center gap-3 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyse en cours...</span>
              </>
            ) : (
              <>
                <Brain className="w-6 h-6" />
                <span>Obtenir ma Recommandation IA</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- RESULT CARD (MODEL-DRIVEN) ---
export const ResultCard = ({ prediction, grades }) => {
  if (!prediction) return null;

  // Expected backend shape:
  // prediction = {
  //   recommended_domain: "AI/ML Engineering",
  //   confidence: 0.52,
  //   probabilities: [{ Domain: "...", Probability: 0.52 }, ...]
  // }

  const recommendedDomain = prediction.recommended_domain;
  const confidence = typeof prediction.confidence === "number" ? prediction.confidence : null;

  const probs = Array.isArray(prediction.probabilities) ? prediction.probabilities : [];
  const topAlternatives = probs
    .slice()
    .sort((a, b) => (b.Probability ?? 0) - (a.Probability ?? 0))
    .slice(0, 4);

  // Strongest subject (for explanation text)
  const topSubjectEntry = Object.entries(grades || {}).sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))[0];
  const topSubjectId = topSubjectEntry?.[0];
  const topSubjectGrade = topSubjectEntry?.[1];

  const topSubjectLabel =
    SUBJECTS_DATA.find(s => s.id === topSubjectId)?.label || topSubjectId || "vos modules";

  // Small helper: build “skill insight” aligned with your engineered features
  const java = grades?.java ?? 0;
  const python = grades?.python ?? 0;
  const database = grades?.database ?? 0;
  const ml = grades?.machine_learning ?? 0;
  const web = grades?.web_dev ?? 0;
  const mobile = grades?.mobile_dev ?? 0;
  const networks = grades?.networks ?? 0;
  const cyber = grades?.cybersecurity ?? 0;

  const avg_programming = (java + python) / 2;
  const avg_data = (database + ml) / 2;
  const avg_development = (web + mobile) / 2;
  const avg_security = (networks + cyber) / 2;

  const skillPairs = [
    { key: "Programmation", value: avg_programming },
    { key: "Données & IA", value: avg_data },
    { key: "Développement", value: avg_development },
    { key: "Systèmes & Sécurité", value: avg_security }
  ].sort((a, b) => b.value - a.value);

  const bestSkill = skillPairs[0];

  // If confidence missing, we still show result but no “fake” confidence.
  const confidenceText = confidence === null ? "—" : `${(confidence * 100).toFixed(0)}%`;

  return (
    <div className="mt-8 relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 rounded-3xl p-8 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 border border-indigo-500 border-opacity-30">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"></div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm border border-white border-opacity-20">
              <Target className="text-indigo-300" size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  Recommandation  
                </h4>
                <Sparkles className="text-yellow-400" size={14} />
              </div>
              
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 bg-emerald-500 bg-opacity-20 px-4 py-2 rounded-xl border border-emerald-400 border-opacity-30">
              <CheckCircle2 className="text-emerald-400" size={20} />
              <span className="text-sm font-semibold text-emerald-300">
                Résultat 
              </span>
            </div>
          </div>
        </div>

        {/* Main Recommendation */}
        <div className="mb-6">
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            {recommendedDomain}
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Cette recommandation est basée sur vos performances académiques.
            Votre point fort actuel semble être <strong className="text-white">{bestSkill.key}</strong>{" "}
            (≈ {bestSkill.value.toFixed(1)}/20), avec une excellente performance en{" "}
            <strong className="text-white">{topSubjectLabel}</strong> ({topSubjectGrade}/20).
          </p>
        </div>

      

        {/* Alternatives from real probabilities */}
        {topAlternatives.length > 0 && (
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 border border-white border-opacity-10 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="text-indigo-300" size={18} />
              <span className="text-xs text-slate-300 uppercase font-semibold">
                Top orientations (probabilités)
              </span>
            </div>

            <div className="space-y-3">
              {topAlternatives.map((p, idx) => {
                const pct = ((p.Probability ?? 0) * 100);
                return (
                  <div key={`${p.Domain}-${idx}`}>
                    <div className="flex justify-between text-sm">
                      <span className={idx === 0 ? "font-bold text-white" : "text-slate-200"}>
                        {p.Domain}
                      </span>
                      <span className="text-slate-300">{pct.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-white bg-opacity-10 rounded-full h-2 mt-1 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
                        style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Next steps */}
        <div className="bg-indigo-500 bg-opacity-20 backdrop-blur-sm rounded-xl p-5 border border-indigo-400 border-opacity-30">
          <div className="flex items-start gap-3">
            <Info className="text-indigo-300 flex-shrink-0 mt-1" size={20} />
            <div>
              <h4 className="font-semibold text-white mb-2">Prochaines étapes</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-indigo-400" />
                  Explorer le programme lié à: <strong className="text-white">{recommendedDomain}</strong>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-indigo-400" />
                  Vérifier les prérequis et modules à renforcer (si besoin)
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-indigo-400" />
                  Demander un avis auprès d’un encadrant / conseiller
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* If probabilities missing, show warning (no fake results) */}
        {topAlternatives.length === 0 && (
          <div className="mt-6 flex items-center gap-2 text-amber-200 text-sm">
            <AlertCircle size={18} />
            <span>
              Le backend n’a pas renvoyé les probabilités. La recommandation affichée est bien celle du modèle,
              mais sans détails de distribution.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
