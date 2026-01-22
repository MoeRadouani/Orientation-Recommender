import React from 'react';
import { Info } from 'lucide-react';

const HelpBox = () => (
  <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
    <div className="flex items-start">
      <Info className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
      <div className="ml-3">
        <h3 className="text-sm font-bold text-indigo-900">Comment ça marche ?</h3>
        <p className="text-sm text-indigo-700 mt-1 leading-relaxed">
          L'algorithme pondère vos notes. Par exemple, une note élevée en <strong>Java</strong> et <strong>Algo</strong> favorisera un profil <em>Backend</em>, tandis que <strong>IA</strong> et <strong>Bases de Données</strong> orienteront vers la <em>Data Science</em>.
        </p>
      </div>
    </div>
  </div>
);

export default HelpBox;