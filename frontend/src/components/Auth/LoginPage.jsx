import React, { useState } from "react";
import {
  Sparkles,
  AlertCircle,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { DEFAULT_GRADES } from "../../data/constants";

const LoginPage = ({ onLogin, usersDb, setUsersDb }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email.endsWith("@univh2c.ma")) {
      setTimeout(() => {
        setError("Accès restreint. Utilisez votre email @univh2c.ma");
        setLoading(false);
      }, 500);
      return;
    }
    if (formData.password.length < 4) {
      setTimeout(() => {
        setError("Mot de passe trop court (min 4).");
        setLoading(false);
      }, 500);
      return;
    }

    setTimeout(() => {
      if (isSignUp) {
        const userExists = usersDb.find((u) => u.email === formData.email);
        if (userExists) {
          setError("Un compte existe déjà avec cet email.");
          setLoading(false);
        } else {
          const newUser = {
            id: Date.now(),
            ...formData,
            level: "Licence d'Excellence (S5)",
            role: "student",
            grades: DEFAULT_GRADES,
          };
          setUsersDb((prev) => [...prev, newUser]);
          setLoading(false);
          onLogin(newUser);
        }
      } else {
        const user = usersDb.find(
          (u) => u.email === formData.email && u.password === formData.password,
        );
        if (user) {
          setLoading(false);
          onLogin(user);
        } else {
          setError("Email ou mot de passe incorrect.");
          setLoading(false);
        }
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-indigo-600 p-3 rounded-xl shadow-lg">
            <Sparkles className="text-white h-8 w-8" />
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">
          {isSignUp ? "Inscription Étudiant" : "Portail CareerPath.AI"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl border border-slate-100 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="firstName"
                  placeholder="Prénom"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  name="lastName"
                  placeholder="Nom"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute top-2.5 left-3 h-5 w-5 text-slate-400" />
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="pl-10 w-full px-3 py-2 border rounded-lg"
                placeholder="Email UH2C"
              />
            </div>
            <div className="relative">
              <Lock className="absolute top-2.5 left-3 h-5 w-5 text-slate-400" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="pl-10 pr-10 w-full px-3 py-2 border rounded-lg"
                placeholder="Mot de passe"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2.5 right-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
            >
              {loading ? "..." : isSignUp ? "S'inscrire" : "Se connecter"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              className="text-indigo-600 font-medium text-sm flex items-center justify-center w-full"
            >
              {isSignUp ? "Se connecter" : "Créer un compte"}{" "}
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
