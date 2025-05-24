
import React, { useState, useEffect } from 'react';
import { Industry, Mode, GameState } from '../pages/Index';
import { home } from 'lucide-react';

interface GameScreenProps {
  industry: Industry;
  mode: Mode;
  gameState: GameState;
  onGameComplete: (isCorrect: boolean, movie: any) => void;
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
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

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
    if (!currentMovie) {
      const movies = movieData[industry];
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setCurrentMovie(randomMovie);
    }
  }, [industry, currentMovie]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess.trim() || !currentMovie) return;

    onGuess(guess);
    
    const isCorrect = guess.toLowerCase().trim() === currentMovie.title.toLowerCase();
    
    if (isCorrect || gameState.guesses.length >= 2) { // Max 3 attempts (including current)
      onGameComplete(isCorrect, currentMovie);
    }
    
    setGuess('');
  };

  const handleSkip = () => {
    if (currentMovie) {
      onGameComplete(false, currentMovie);
    }
  };

  const handleHint = () => {
    if (!showHint) {
      setShowHint(true);
    } else if (hintIndex < (currentMovie?.hints.length || 0) - 1) {
      setHintIndex(prev => prev + 1);
    }
  };

  if (!currentMovie) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-white/80 hover:text-white transition-colors duration-200"
      >
        <home size={24} />
      </button>

      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-2xl text-white/80 mb-4">
          {mode === 'daily' ? '📆 Daily Challenge' : '♾️ Infinite Mode'}
        </h2>
        <p className="text-white/60">Attempt {gameState.guesses.length + 1} of 3</p>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full text-center animate-scale-in">
        <div className="text-6xl mb-6 animate-pulse">
          {currentMovie.emojis}
        </div>

        {showHint && (
          <div className="mb-6 p-4 bg-yellow-500/20 rounded-lg animate-fade-in">
            <p className="text-yellow-200 text-sm">
              💡 Hint: {currentMovie.hints[hintIndex]}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Your Guess?"
            className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/60 border-0 focus:ring-2 focus:ring-white/50 focus:outline-none"
          />
          
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!guess.trim()}
              className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200"
            >
              Submit
            </button>
            
            <button
              type="button"
              onClick={handleHint}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200"
            >
              Hint
            </button>
            
            <button
              type="button"
              onClick={handleSkip}
              className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200"
            >
              Skip
            </button>
          </div>
        </form>

        {gameState.guesses.length > 0 && (
          <div className="mt-6 space-y-2">
            <p className="text-white/80 text-sm">Previous guesses:</p>
            {gameState.guesses.map((prevGuess, index) => (
              <div key={index} className="text-white/60 text-sm bg-white/10 rounded-lg p-2">
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
