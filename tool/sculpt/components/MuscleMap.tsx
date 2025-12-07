
import React from 'react';
import { MuscleID } from '../types';

interface MuscleMapProps {
  highlightedMuscles: MuscleID[];
  className?: string;
}

const MuscleMap: React.FC<MuscleMapProps> = ({ highlightedMuscles, className = "h-48" }) => {
  const isHighlighted = (id: MuscleID) => highlightedMuscles.includes(id);

  const getFill = (id: MuscleID) => isHighlighted(id) ? "#ef4444" : "#cbd5e1"; // Red-500 vs Slate-300
  const getOpacity = (id: MuscleID) => isHighlighted(id) ? "1" : "0.5";

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      {/* --- Front View --- */}
      <svg viewBox="0 0 100 200" className="h-full w-auto drop-shadow-sm">
        <g stroke="#64748b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          
          {/* Head & Neck (Base) */}
          <circle cx="50" cy="25" r="12" fill="#f1f5f9" />
          
          {/* Chest (Pectorals) */}
          <path 
            d="M35 45 Q50 55 65 45 L65 60 Q50 70 35 60 Z" 
            fill={getFill('chest')} opacity={getOpacity('chest')}
          />
          
          {/* Shoulders (Front Delts) */}
          <path 
            d="M25 45 Q30 40 35 45 L35 55 L25 50 Z" 
            fill={getFill('front-delts')} opacity={getOpacity('front-delts')}
          />
           <path 
            d="M75 45 Q70 40 65 45 L65 55 L75 50 Z" 
            fill={getFill('front-delts')} opacity={getOpacity('front-delts')}
          />

          {/* Abs */}
          <path 
            d="M40 60 H60 V90 H40 Z" 
            fill={getFill('abs')} opacity={getOpacity('abs')}
          />
          {/* Obliques */}
          <path 
            d="M35 60 H40 V90 H35 Q30 75 35 60 Z" 
            fill={getFill('obliques')} opacity={getOpacity('obliques')}
          />
           <path 
            d="M60 60 H65 Q70 75 65 90 H60 Z" 
            fill={getFill('obliques')} opacity={getOpacity('obliques')}
          />

          {/* Arms (Biceps) */}
          <path d="M25 50 L20 70 L30 70 Z" fill={getFill('biceps')} opacity={getOpacity('biceps')} />
          <path d="M75 50 L80 70 L70 70 Z" fill={getFill('biceps')} opacity={getOpacity('biceps')} />

          {/* Forearms */}
          <path d="M20 70 L15 95 L25 95 Z" fill={getFill('forearms')} opacity={getOpacity('forearms')} />
          <path d="M80 70 L85 95 L75 95 Z" fill={getFill('forearms')} opacity={getOpacity('forearms')} />

          {/* Legs (Quads) */}
          <path 
            d="M35 90 H50 V140 H40 Q35 115 35 90 Z" 
            fill={getFill('quads')} opacity={getOpacity('quads')}
          />
          <path 
            d="M50 90 H65 Q65 115 60 140 H50 Z" 
            fill={getFill('quads')} opacity={getOpacity('quads')}
          />

           {/* Calves (Front visible) */}
           <path d="M40 140 L38 180 H48 L50 140 Z" fill={getFill('calves')} opacity={getOpacity('calves')} />
           <path d="M60 140 L62 180 H52 L50 140 Z" fill={getFill('calves')} opacity={getOpacity('calves')} />

        </g>
        {/* Label */}
        <text x="50" y="195" textAnchor="middle" fontSize="8" fill="#94a3b8">正面</text>
      </svg>

      {/* --- Back View --- */}
      <svg viewBox="0 0 100 200" className="h-full w-auto drop-shadow-sm">
         <g stroke="#64748b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          
          {/* Head & Neck */}
          <circle cx="50" cy="25" r="12" fill="#f1f5f9" />

          {/* Traps */}
          <path d="M40 40 L50 35 L60 40 L50 55 Z" fill={getFill('traps')} opacity={getOpacity('traps')} />

          {/* Lats */}
          <path d="M35 50 L40 85 L50 90 L60 85 L65 50 L50 55 Z" fill={getFill('lats')} opacity={getOpacity('lats')} />

          {/* Rear Delts */}
          <path d="M25 45 L35 48 L35 55 L25 50 Z" fill={getFill('rear-delts')} opacity={getOpacity('rear-delts')} />
          <path d="M75 45 L65 48 L65 55 L75 50 Z" fill={getFill('rear-delts')} opacity={getOpacity('rear-delts')} />

          {/* Triceps */}
          <path d="M25 50 L22 70 L32 70 Z" fill={getFill('triceps')} opacity={getOpacity('triceps')} />
          <path d="M75 50 L78 70 L68 70 Z" fill={getFill('triceps')} opacity={getOpacity('triceps')} />

          {/* Lower Back */}
          <path d="M42 85 H58 L55 95 H45 Z" fill={getFill('lower-back')} opacity={getOpacity('lower-back')} />

          {/* Glutes */}
          <path d="M35 95 H65 Q70 110 50 115 Q30 110 35 95 Z" fill={getFill('glutes')} opacity={getOpacity('glutes')} />

          {/* Hamstrings */}
          <path d="M38 115 H50 V145 H42 Z" fill={getFill('hamstrings')} opacity={getOpacity('hamstrings')} />
          <path d="M62 115 H50 V145 H58 Z" fill={getFill('hamstrings')} opacity={getOpacity('hamstrings')} />

          {/* Calves (Back) */}
          <path d="M42 145 L40 175 H48 L50 145 Z" fill={getFill('calves')} opacity={getOpacity('calves')} />
          <path d="M58 145 L60 175 H52 L50 145 Z" fill={getFill('calves')} opacity={getOpacity('calves')} />

        </g>
        <text x="50" y="195" textAnchor="middle" fontSize="8" fill="#94a3b8">背面</text>
      </svg>
    </div>
  );
};

export default MuscleMap;
