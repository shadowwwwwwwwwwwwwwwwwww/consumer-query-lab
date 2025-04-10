
import React, { useEffect, useState } from 'react';
import { FlaskConical, Beaker, Database, Brain } from 'lucide-react';

const ThreeDAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  
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
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-900 text-green-400">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-64 h-64">
            {/* Animated icons */}
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <FlaskConical className="w-24 h-24 text-green-400" />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center opacity-30 animate-spin-slow">
              <div className="w-48 h-48 rounded-full border-4 border-green-500 border-dashed"></div>
            </div>
            
            <div className="absolute top-8 left-0 animate-float-slow">
              <Beaker className="w-10 h-10 text-green-300" />
            </div>
            
            <div className="absolute bottom-8 right-4 animate-float">
              <Database className="w-10 h-10 text-green-300" />
            </div>
            
            <div className="absolute top-4 right-8 animate-float-reverse">
              <Brain className="w-10 h-10 text-green-300" />
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Preparing Your AI Quiz Experience</h2>
        <p className="text-gray-400 mb-6">Loading specialized data models and analysis tools...</p>
        
        <div className="w-full bg-gray-800 rounded-full h-4 mb-2">
          <div 
            className="bg-green-500 h-4 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-sm text-gray-500">{progress}% Complete</p>
      </div>
    </div>
  );
};

export default ThreeDAnimation;
