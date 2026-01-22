import React, { useState, useEffect } from 'react';
import { INITIAL_DB } from './data/constants';
import LoginPage from './components/Auth/LoginPage';
import StudentDashboard from './components/features/student/StudentDashboard';
import AdminDashboard from './components/features/admin/AdminDashboard';


const CareerPathApp = () => {
  // --- MODIFICATION 1 : Charger l'utilisateur depuis le LocalStorage au démarrage ---
  const [user, setUser] = useState(() => {
    const savedSession = localStorage.getItem('careerPathSession');
    return savedSession ? JSON.parse(savedSession) : null;
  });
  
  // CHARGEMENT DB (Reste inchangé)
  const [usersDb, setUsersDb] = useState(() => {
    const savedDb = localStorage.getItem('careerPathUsers');
    return savedDb ? JSON.parse(savedDb) : INITIAL_DB;
  });

  // SAUVEGARDE DB AUTO (Reste inchangé)
  useEffect(() => {
    localStorage.setItem('careerPathUsers', JSON.stringify(usersDb));
  }, [usersDb]);

  // --- MODIFICATION 2 : Sauvegarder la session à chaque changement de l'user ---
  useEffect(() => {
    if (user) {
      // Si connecté, on enregistre dans le navigateur
      localStorage.setItem('careerPathSession', JSON.stringify(user));
    } else {
      // Si déconnecté (user est null), on nettoie le navigateur
      localStorage.removeItem('careerPathSession');
    }
  }, [user]);

  // Mise à jour des infos (Notes, etc.)
  const handleUpdateUser = (updatedUser) => {
    // 1. Mettre à jour la grosse Base de Données
    setUsersDb(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    
    // 2. Mettre à jour l'utilisateur courant (et donc la session grâce au useEffect ci-dessus)
    setUser(updatedUser);
  };

  // --- RENDU ---

  if (!user) {
    return <LoginPage onLogin={setUser} usersDb={usersDb} setUsersDb={setUsersDb} />;
  }

  if (user.role === 'admin') {
    return <AdminDashboard onLogout={() => setUser(null)} user={user} users={usersDb} setUsers={setUsersDb} />;
  }

  return <StudentDashboard onLogout={() => setUser(null)} user={user} onUpdateUser={handleUpdateUser} />;
};

export default CareerPathApp;

