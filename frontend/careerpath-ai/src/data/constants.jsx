import React from 'react';
import { Code2, Cpu, Network, Globe, Database, BrainCircuit } from 'lucide-react';

// ✅ MUST MATCH BACKEND MODEL INPUT KEYS
export const DEFAULT_GRADES = {
  java: 0,
  python: 0,
  database: 0,
  web_dev: 0,
  networks: 0,
  machine_learning: 0,
  cybersecurity: 0,
  mobile_dev: 0,
};

export const INITIAL_DB = [
  {
    id: 1,
    email: 'etudiant@univh2c.ma',
    password: 'password123',
    firstName: 'Amine',
    lastName: 'Benali',
    level: "Etudiant",
    role: 'student',
    grades: {
      java: 14,
      python: 12,
      database: 13,
      web_dev: 16,
      networks: 11,
      machine_learning: 9,
      cybersecurity: 10,
      mobile_dev: 12,
    },
  },
  {
    id: 99,
    email: 'admin@univh2c.ma',
    password: 'admin',
    firstName: 'Administrateur',
    lastName: 'Système',
    level: "N/A",
    role: 'admin',
    grades: DEFAULT_GRADES,
  },
];
