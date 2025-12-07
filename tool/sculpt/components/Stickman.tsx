import React from 'react';

interface StickmanProps {
  type: 'squat' | 'pushup' | 'jump' | 'generic';
}

const Stickman: React.FC<StickmanProps> = ({ type }) => {
  // Generic / Static pose
  if (type === 'generic') {
    return (
      <div className="w-full h-32 flex items-center justify-center bg-slate-100 rounded-lg overflow-hidden relative">
        <div className="text-slate-400 text-xs absolute top-2 right-2">靜態</div>
        <svg width="60" height="100" viewBox="0 0 100 200" className="stroke-slate-800 stroke-[4] fill-none">
          {/* Head */}
          <circle cx="50" cy="30" r="15" />
          {/* Body */}
          <line x1="50" y1="45" x2="50" y2="100" />
          {/* Arms */}
          <line x1="50" y1="60" x2="20" y2="90" />
          <line x1="50" y1="60" x2="80" y2="90" />
          {/* Legs */}
          <line x1="50" y1="100" x2="30" y2="160" />
          <line x1="50" y1="100" x2="70" y2="160" />
        </svg>
      </div>
    );
  }

  // Squat Animation
  if (type === 'squat') {
    return (
      <div className="w-full h-32 flex items-center justify-center bg-slate-100 rounded-lg overflow-hidden relative">
        <div className="text-blue-500 text-xs absolute top-2 right-2 font-bold">深蹲</div>
        <div className="animate-squat origin-bottom">
           <svg width="60" height="100" viewBox="0 0 100 200" className="stroke-slate-800 stroke-[4] fill-none">
            <circle cx="50" cy="30" r="15" />
            <line x1="50" y1="45" x2="50" y2="100" />
            <line x1="50" y1="60" x2="10" y2="55" /> {/* Arms out for balance */}
            <line x1="50" y1="60" x2="90" y2="55" />
            <line x1="50" y1="100" x2="30" y2="150" />
            <line x1="50" y1="100" x2="70" y2="150" />
          </svg>
        </div>
      </div>
    );
  }

  // Pushup Animation
  if (type === 'pushup') {
    return (
      <div className="w-full h-32 flex items-center justify-center bg-slate-100 rounded-lg overflow-hidden relative">
        <div className="text-blue-500 text-xs absolute top-2 right-2 font-bold">伏地挺身</div>
        <div className="animate-pushup origin-center">
           {/* Horizontal orientation for pushup */}
           <svg width="100" height="60" viewBox="0 0 200 100" className="stroke-slate-800 stroke-[4] fill-none">
            <circle cx="170" cy="30" r="15" />
            <line x1="155" y1="35" x2="50" y2="70" /> {/* Body */}
            <line x1="140" y1="40" x2="130" y2="90" /> {/* Arm */}
            <line x1="50" y1="70" x2="20" y2="90" /> {/* Legs */}
          </svg>
        </div>
      </div>
    );
  }

  // Jump Animation
  if (type === 'jump') {
    return (
      <div className="w-full h-32 flex items-center justify-center bg-slate-100 rounded-lg overflow-hidden relative">
        <div className="text-blue-500 text-xs absolute top-2 right-2 font-bold">有氧</div>
        <div className="animate-jump origin-bottom">
           <svg width="60" height="100" viewBox="0 0 100 200" className="stroke-slate-800 stroke-[4] fill-none">
            <circle cx="50" cy="30" r="15" />
            <line x1="50" y1="45" x2="50" y2="100" />
            <path d="M50 60 L20 40 M50 60 L80 40" /> {/* Arms Up */}
            <line x1="50" y1="100" x2="20" y2="160" />
            <line x1="50" y1="100" x2="80" y2="160" />
          </svg>
        </div>
      </div>
    );
  }

  return null;
};

export default Stickman;