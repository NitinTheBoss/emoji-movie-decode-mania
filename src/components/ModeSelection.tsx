
import React from 'react';
import { Industry, Mode } from '../pages/Index';
import { Home } from 'lucide-react';

interface ModeSelectionProps {
  industry: Industry;
  onModeSelect: (mode: Mode) => void;
  onBack: () => void;
  completedDaily?: boolean;
}

const ModeSelection = ({ industry, onModeSelect, onBack, completedDaily = false }: ModeSelectionProps) => {
  const industryNames = {
    hollywood: 'Hollywood',
    bollywood: 'Bollywood',
    tollywood: 'Tollywood',
    kollywood: 'Kollywood'
  };

  const industryEmojis = {
    hollywood: '🎥',
    bollywood: '💃',
    tollywood: '🎤',
    kollywood: '🛕'
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-white/80 hover:text-white transition-colors duration-200"
      >
        <Home size={24} />
      </button>

      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl font-bold text-white mb-4">
          🎞️ {industryEmojis[industry]} {industryNames[industry]}
        </h1>
        <p className="text-xl text-white/80">
          Select a Mode
        </p>
      </div>

      <div className="space-y-6 max-w-md w-full">
        <div className="relative">
          <button
            onClick={() => !completedDaily && onModeSelect('daily')}
            disabled={completedDaily}
            className={`
              w-full p-8 rounded-2xl shadow-2xl
              transform transition-all duration-300 
              animate-fade-in
              ${completedDaily 
                ? 'bg-gray-500/50 text-white/50 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:scale-105 hover:shadow-3xl'
              }
            `}
            title={completedDaily ? 'Come back tomorrow' : undefined}
          >
            <div className="text-4xl mb-4">📆</div>
            <div className="text-2xl font-bold mb-2">Daily Challenge</div>
            <div className="text-sm text-white/80">
              {completedDaily 
                ? 'Come back tomorrow for a new challenge' 
                : 'A new emoji movie puzzle each day. One chance. Same for everyone.'
              }
            </div>
          </button>
          {completedDaily && (
            <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center">
              <span className="text-white/80 text-lg font-semibold">Completed ✅</span>
            </div>
          )}
        </div>

        <button
          onClick={() => onModeSelect('infinite')}
          className="
            w-full bg-gradient-to-r from-blue-500 to-indigo-600 
            text-white p-8 rounded-2xl shadow-2xl
            transform transition-all duration-300 
            hover:scale-105 hover:shadow-3xl
            animate-fade-in
          "
          style={{ animationDelay: '0.1s' }}
        >
          <div className="text-4xl mb-4">♾️</div>
          <div className="text-2xl font-bold mb-2">Infinite Mode</div>
          <div className="text-sm text-white/80">
            Play unlimited emoji puzzles, one after another.
          </div>
        </button>
      </div>
    </div>
  );
};

export default ModeSelection;
