// File: src/data/subjects.js
import {
  Code2,
  Cpu,
  Network,
  Globe,
  Database,
  BrainCircuit,
  Shield,
  Smartphone
} from "lucide-react";

// ✅ MUST MATCH BACKEND MODEL INPUT KEYS
export const SUBJECTS_DATA = [
  {
    id: "java",
    label: "Java",
    icon: <Code2 size={20} />,
    color: "text-orange-500"
  },
  {
    id: "python",
    label: "Python",
    icon: <Code2 size={20} />,
    color: "text-yellow-500"
  },
  {
    id: "database",
    label: "Databases",
    icon: <Database size={20} />,
    color: "text-emerald-500"
  },
  {
    id: "web_dev",
    label: "Web Development",
    icon: <Globe size={20} />,
    color: "text-cyan-500"
  },
  {
    id: "mobile_dev",
    label: "Mobile Development",
    icon: <Smartphone size={20} />,
    color: "text-purple-500"
  },
  {
    id: "networks",
    label: "Computer Networks",
    icon: <Network size={20} />,
    color: "text-blue-500"
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    icon: <Shield size={20} />,
    color: "text-red-500"
  },
  {
    id: "machine_learning",
    label: "Machine Learning",
    icon: <BrainCircuit size={20} />,
    color: "text-rose-500"
  }
];
