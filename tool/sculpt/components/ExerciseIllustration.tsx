
import React, { useState, useEffect } from 'react';

interface Props {
  name: string;
  images?: string[]; // 支援多張圖片
  className?: string;
}

const ExerciseIllustration: React.FC<Props> = ({ name, images = [], className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Fallback
  const displayText = encodeURIComponent(name);
  const placeholderUrl = `https://placehold.co/600x400/f8fafc/cbd5e1?text=${displayText}&font=roboto`;
  
  // Reset index when images source changes (e.g. variant change)
  useEffect(() => {
    setCurrentIndex(0);
    setHasError(false);
  }, [images]);

  // Carousel Logic
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 1500); // 每 1.5 秒切換一次，模擬動作

    return () => clearInterval(interval);
  }, [images]);

  const currentImageUrl = (images && images.length > 0 && !hasError) 
    ? images[currentIndex] 
    : placeholderUrl;

  return (
    <div className={`relative group overflow-hidden bg-white flex items-center justify-center select-none ${className}`}>
      {/* Main Image */}
      <img 
        src={currentImageUrl} 
        alt={`${name} step ${currentIndex + 1}`}
        onError={() => setHasError(true)}
        className="w-full h-full object-contain p-4 transition-opacity duration-500"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      
      {/* Indicators (only if multiple images) */}
      {images.length > 1 && !hasError && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, idx) => (
            <div 
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-blue-500' : 'bg-slate-200'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseIllustration;
