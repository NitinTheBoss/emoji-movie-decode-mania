
import React from 'react';
import { Industry, Mode } from '../pages/Index';
import { Share } from 'lucide-react';

interface ResultScreenProps {
  industry: Industry;
  mode: Mode;
  isCorrect: boolean;
  movie: any;
  attempts: number;
  timeTaken: number;
  onPlayAgain: () => void;
  onHome: () => void;
}

const ResultScreen = ({ industry, mode, isCorrect, movie, attempts, timeTaken, onPlayAgain, onHome }: ResultScreenProps) => {
  const industryNames = {
    hollywood: 'Hollywood',
    bollywood: 'Bollywood',
    tollywood: 'Tollywood',
    kollywood: 'Kollywood'
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const shareText = isCorrect 
    ? `🎬 Emoji Movie Guessing - ${mode === 'daily' ? 'Daily Challenge' : 'Infinite Mode'}
I guessed the ${industryNames[industry]} movie in ${attempts} tries and ${formatTime(timeTaken)}!
🧩 Clue: ${movie.emojis}
Can you beat me?

Play now 👉 ${window.location.origin}`
    : `🎬 Emoji Movie Guessing - ${mode === 'daily' ? 'Daily Challenge' : 'Infinite Mode'}
I couldn't guess the ${industryNames[industry]} movie!
🧩 Clue: ${movie.emojis}

Can you do better? 👉 ${window.location.origin}`;

  const handleShare = async (platform?: string) => {
    if (navigator.share && !platform) {
      try {
        await navigator.share({
          title: 'Emoji Movie Guessing Game',
          text: shareText
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareText);
      // You could show a toast notification here
    }
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full text-center animate-scale-in">
        <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">
          {isCorrect ? '🎉' : '😅'}
        </div>

        <div className="mb-4 sm:mb-6">
          {isCorrect ? (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">
                ✅ Correct!
              </h2>
              <p className="text-white">
                You guessed it in {attempts} {attempts === 1 ? 'try' : 'tries'}!
              </p>
              <p className="text-white/80 text-sm mt-2">
                Time: {formatTime(timeTaken)}
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-red-400 mb-2">
                ❌ Oops!
              </h2>
              <p className="text-white">
                The answer was: <span className="font-bold">{movie.title}</span>
              </p>
            </div>
          )}
        </div>

        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white/10 rounded-lg">
          <p className="text-white/80 text-sm mb-2">The clue was:</p>
          <p className="text-2xl sm:text-3xl">{movie.emojis}</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={onPlayAgain}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 sm:py-3 px-3 sm:px-6 rounded-xl font-semibold transition-colors duration-200 text-sm sm:text-base"
            >
              {mode === 'infinite' ? '🔁 Play Again' : '♾️ Try Infinite'}
            </button>
            
            <button
              onClick={onHome}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 sm:py-3 px-3 sm:px-6 rounded-xl font-semibold transition-colors duration-200 text-sm sm:text-base"
            >
              🏠 Home
            </button>
          </div>

          {mode === 'daily' && (
            <div className="border-t border-white/20 pt-3 sm:pt-4">
              <p className="text-white/80 text-sm mb-3">📤 Share Your Result</p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleShare()}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2"
                >
                  <Share size={14} className="sm:w-4 sm:h-4" />
                  Share
                </button>
                
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-200"
                >
                  💬 WhatsApp
                </button>
                
                <button
                  onClick={handleTwitter}
                  className="flex-1 bg-blue-400 hover:bg-blue-500 text-white py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-200"
                >
                  🐦 Twitter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
