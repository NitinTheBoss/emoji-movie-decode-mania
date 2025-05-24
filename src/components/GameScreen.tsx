
import React, { useState, useEffect } from 'react';
import { Industry, Mode, GameState } from '../pages/Index';
import { Home } from 'lucide-react';

interface GameScreenProps {
  industry: Industry;
  mode: Mode;
  gameState: GameState;
  onGameComplete: (isCorrect: boolean, movie: any, timeTaken: number) => void;
  onGuess: (guess: string) => void;
  onBack: () => void;
}

interface Movie {
  title: string;
  emojis: string;
  hints: string[];
}

const GameScreen = ({ industry, mode, gameState, onGameComplete, onGuess, onBack }: GameScreenProps) => {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [guess, setGuess] = useState('');
  const [currentHintIndex, setCurrentHintIndex] = useState(-1);
  const [startTime, setStartTime] = useState<number>(Date.now());

  // Sample movie data (in a real app, this would come from an API)
  const movieData: Record<Industry, Movie[]> = {
    hollywood: [
      { title: 'Jurassic Park', emojis: '🦖🌴🌋', hints: ['Dinosaur adventure', 'Based on a novel', 'Theme park gone wrong'] },
      { title: 'Frozen', emojis: '❄️👸🏰', hints: ['Disney animated', 'Ice powers', 'Let it go'] },
      { title: 'The Lion King', emojis: '🦁👑🌅', hints: ['Disney classic', 'African savanna', 'Circle of life'] },
      { title: 'Toy Story', emojis: '🤠🚀🧸', hints: ['Pixar animation', 'Toys come alive', 'Woody and Buzz'] }
    ],
    bollywood: [
      { title: 'Dangal', emojis: '🤼‍♀️👨‍👧‍👧🏅', hints: ['Wrestling drama', 'Father-daughter story', 'Aamir Khan'] },
      { title: '3 Idiots', emojis: '🎓👨‍🎓🤝', hints: ['College comedy', 'Engineering students', 'Aamir Khan'] },
      { title: 'Sholay', emojis: '🤠🔫🐎', hints: ['Classic western', 'Friendship', 'Jai and Veeru'] }
    ],
    tollywood: [
      { title: 'Baahubali', emojis: '⚔️👑🏰', hints: ['Epic drama', 'Kingdom war', 'Prabhas'] },
      { title: 'Arjun Reddy', emojis: '💔🏥💊', hints: ['Romance drama', 'Medical student', 'Intense love story'] }
    ],
    kollywood: [
      { title: 'Vikram', emojis: '🔍🔫👨‍💼', hints: ['Action thriller', 'Kamal Haasan', 'Drug cartel'] },
      { title: 'Super Deluxe', emojis: '🌟🎭🔄', hints: ['Anthology', 'Multiple stories', 'Dark comedy'] }
    ]
  };

  useEffect(() => {
    if (!gameState.currentMovie) {
      const movies = movieData[industry];
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setCurrentMovie(randomMovie);
      setStartTime(Date.now());
      setCurrentHintIndex(-1);
    } else {
      setCurrentMovie(gameState.currentMovie);
    }
  }, [industry, gameState.currentMovie]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess.trim() || !currentMovie) return;

    onGuess(guess);
    
    const isCorrect = guess.toLowerCase().trim() === currentMovie.title.toLowerCase();
    
    if (isCorrect) {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      onGameComplete(isCorrect, currentMovie, timeTaken);
    } else {
      const newHintIndex = Math.min(currentHintIndex + 1, 2);
      setCurrentHintIndex(newHintIndex);
      
      if (gameState.guesses.length >= 4) { // Max 5 attempts (including current)
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        onGameComplete(false, currentMovie, timeTaken);
      }
    }
    
    setGuess('');
  };

  if (!currentMovie) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  const shouldShowAllHints = gameState.guesses.length >= 4;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 text-white/80 hover:text-white transition-colors duration-200"
      >
        <Home size={20} className="sm:w-6 sm:h-6" />
      </button>

      <div className="text-center mb-4 sm:mb-6 animate-fade-in">
        <h2 className="text-lg sm:text-xl text-white/80 mb-2">
          {mode === 'daily' ? '📆 Daily Challenge' : '♾️ Infinite Mode'}
        </h2>
        <p className="text-sm text-white/60">Attempt {gameState.guesses.length + 1} of 5</p>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-sm w-full text-center animate-scale-in">
        <div className="text-3xl sm:text-5xl mb-4 flex justify-center gap-1">
          {currentMovie.emojis}
        </div>

        {currentHintIndex >= 0 && !shouldShowAllHints && (
          <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-yellow-500/20 rounded-lg animate-fade-in">
            <p className="text-yellow-200 text-xs sm:text-sm">
              💡 Hint {currentHintIndex + 1}: {currentMovie.hints[currentHintIndex]}
            </p>
          </div>
        )}

        {shouldShowAllHints && (
          <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-500/20 rounded-lg animate-fade-in">
            <p className="text-red-200 text-xs sm:text-sm mb-2">💡 All Hints:</p>
            {currentMovie.hints.map((hint, index) => (
              <p key={index} className="text-red-200 text-xs sm:text-sm">
                {index + 1}. {hint}
              </p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Your Guess?"
            className="w-full p-2 sm:p-3 rounded-xl bg-white/20 text-white placeholder-white/60 border-0 focus:ring-2 focus:ring-white/50 focus:outline-none text-sm sm:text-base"
          />
          
          <button
            type="submit"
            disabled={!guess.trim()}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl font-semibold transition-colors duration-200 text-sm sm:text-base"
          >
            Submit
          </button>
        </form>

        {gameState.guesses.length > 0 && (
          <div className="mt-3 sm:mt-4 space-y-2">
            <p className="text-white/80 text-xs sm:text-sm">Previous guesses:</p>
            {gameState.guesses.map((prevGuess, index) => (
              <div key={index} className="text-white/60 text-xs sm:text-sm bg-white/10 rounded-lg p-2">
                {prevGuess}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
