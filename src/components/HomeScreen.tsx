
import React from 'react';
import { Industry } from '../pages/Index';

interface HomeScreenProps {
  onIndustrySelect: (industry: Industry) => void;
}

const HomeScreen = ({ onIndustrySelect }: HomeScreenProps) => {
  const industries = [
    { id: 'hollywood' as Industry, name: 'Hollywood', emoji: '🎥', gradient: 'from-red-500 to-pink-600' },
    { id: 'bollywood' as Industry, name: 'Bollywood', emoji: '💃', gradient: 'from-orange-500 to-yellow-600' },
    { id: 'tollywood' as Industry, name: 'Tollywood', emoji: '🎤', gradient: 'from-green-500 to-teal-600' },
    { id: 'kollywood' as Industry, name: 'Kollywood', emoji: '🛕', gradient: 'from-blue-500 to-purple-600' }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div className="text-center mb-8 sm:mb-12 animate-fade-in">
        <h1 className="text-3xl sm:text-6xl font-bold text-white mb-2 sm:mb-4">
          🎬 Emoji Movie Guessing
        </h1>
        <p className="text-base sm:text-xl text-white/80">
          🧩 Choose a Film Industry
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 max-w-xs sm:max-w-2xl w-full">
        {industries.map((industry, index) => (
          <button
            key={industry.id}
            onClick={() => onIndustrySelect(industry.id)}
            className={`
              bg-gradient-to-r ${industry.gradient} 
              text-white p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl
              transform transition-all duration-300 
              hover:scale-105 hover:shadow-3xl
              animate-fade-in
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-2xl sm:text-4xl mb-2 sm:mb-4">{industry.emoji}</div>
            <div className="text-sm sm:text-2xl font-bold">{industry.name}</div>
          </button>
        ))}
      </div>

      <div className="mt-6 sm:mt-12 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <p className="text-white/60 text-xs sm:text-sm">
          ✨ Guess movies from emoji clues • Daily challenges • Infinite fun
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;
