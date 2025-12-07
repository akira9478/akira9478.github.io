
import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Search } from 'lucide-react';
import { Exercise } from '../types';
import MuscleMap from './MuscleMap';
import ExerciseIllustration from './ExerciseIllustration';

interface InfoModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ exercise, onClose }) => {
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  
  // Set default variant when exercise opens
  useEffect(() => {
    if (exercise) {
      setSelectedVariant(exercise.variants[0]);
    }
  }, [exercise]);

  if (!exercise) return null;

  const handleSearch = (queryStr: string) => {
    const query = encodeURIComponent(`${queryStr} gym exercise form`);
    window.open(`https://www.google.com/search?tbm=isch&q=${query}`, '_blank');
  };

  const displayImages = (exercise.variantImages && selectedVariant && exercise.variantImages[selectedVariant])
    ? exercise.variantImages[selectedVariant]
    : exercise.images;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop - Fade In Only */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
      
      {/* Content - Slide Up */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh] relative z-10 animate-slide-up">
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white flex justify-between items-start shrink-0">
          <div>
            <h3 className="text-2xl font-bold">{exercise.name}</h3>
            <span className="inline-block mt-2 px-3 py-1 bg-blue-600 text-xs rounded-full font-semibold uppercase tracking-wider">
              {exercise.muscleGroup}
            </span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          
          <div className="mb-6 flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">動作示範</h4>
            
            {/* Carousel & Variant Selector */}
            <div className="w-full bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
               <ExerciseIllustration name={exercise.name} images={displayImages} className="h-56 w-full bg-white" />
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap">切換變體:</span>
              <select 
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {exercise.variants.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">肌群解剖</h4>
            <div className="w-full h-48 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
              <MuscleMap highlightedMuscles={exercise.targetMuscles} className="h-40" />
            </div>
            
            <button 
              onClick={() => handleSearch(exercise.name + ' ' + selectedVariant)}
              className="w-full py-3 bg-blue-50 text-blue-600 font-bold rounded-xl border border-blue-200 hover:bg-blue-100 transition flex items-center justify-center gap-2"
            >
              <Search size={18} />
              在 Google 搜尋動作細節
            </button>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">動作說明</h4>
            <p className="text-slate-700 text-sm leading-relaxed text-justify">{exercise.description}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
             <div className="bg-blue-200 p-2 rounded-full text-blue-700 shrink-0">
                <ExternalLink size={16} />
             </div>
             <div>
               <h5 className="font-bold text-blue-900 text-sm">教練小叮嚀</h5>
               <p className="text-blue-800 text-xs mt-1 leading-relaxed">
                 每個人的身體結構不同，請先輕重量嘗試，找到感受度最佳的變體動作。點擊上方按鈕可查看更多網路教學資源。
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
