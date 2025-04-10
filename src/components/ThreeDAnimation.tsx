
import React, { useEffect, useState } from 'react';
import { FlaskConical, Beaker, Database, Brain } from 'lucide-react';
import EarthBackground from './EarthBackground';
import { useIsMobile } from '../hooks/use-mobile';

const ThreeDAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [onComplete]);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-900 text-green-400 relative overflow-hidden">
      <EarthBackground className="opacity-20" />
      <div className="max-w-md w-full text-center space-y-4 sm:space-y-6 z-10 px-4">
        <div className="flex items-center justify-center mb-4 sm:mb-8">
          <div className="relative w-48 sm:w-64 h-48 sm:h-64">
            {/* Animated icons */}
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <FlaskConical className={`${isMobile ? 'w-16 h-16' : 'w-24 h-24'} text-green-400`} />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center opacity-30 animate-spin-slow">
              <div className={`${isMobile ? 'w-40 h-40' : 'w-48 h-48'} rounded-full border-4 border-green-500 border-dashed`}></div>
            </div>
            
            <div className="absolute top-8 left-0 animate-float-slow">
              <Beaker className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} text-green-300`} />
            </div>
            
            <div className="absolute bottom-8 right-4 animate-float">
              <Database className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} text-green-300`} />
            </div>
            
            <div className="absolute top-4 right-8 animate-float-reverse">
              <Brain className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} text-green-300`} />
            </div>
          </div>
        </div>
        
        <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-2`}>Preparing Your AI Quiz Experience</h2>
        <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">Loading specialized data models and analysis tools...</p>
        
        <div className="w-full bg-gray-800 rounded-full h-3 sm:h-4 mb-2">
          <div 
            className="bg-green-500 h-3 sm:h-4 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-xs sm:text-sm text-gray-500">{progress}% Complete</p>
      </div>
    </div>
  );
};

export default ThreeDAnimation;
