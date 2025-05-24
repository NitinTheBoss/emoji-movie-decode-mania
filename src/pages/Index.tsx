
import React, { useState } from 'react';
import HomeScreen from '../components/HomeScreen';
import ModeSelection from '../components/ModeSelection';
import GameScreen from '../components/GameScreen';
import ResultScreen from '../components/ResultScreen';

export type Industry = 'hollywood' | 'bollywood' | 'tollywood' | 'kollywood';
export type Mode = 'daily' | 'infinite';

export interface GameState {
  screen: 'home' | 'mode' | 'game' | 'result';
  selectedIndustry?: Industry;
  selectedMode?: Mode;
  currentMovie?: any;
  guesses: string[];
  isCorrect?: boolean;
  gameOver?: boolean;
  timeTaken?: number;
  completedDailies: Set<Industry>;
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    screen: 'home',
    guesses: [],
    completedDailies: new Set()
  });

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  const resetGame = () => {
    setGameState(prev => ({
      screen: 'home',
      guesses: [],
      completedDailies: prev.completedDailies
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-700">
      {gameState.screen === 'home' && (
        <HomeScreen onIndustrySelect={(industry) => 
          updateGameState({ selectedIndustry: industry, screen: 'mode' })
        } />
      )}
      
      {gameState.screen === 'mode' && (
        <ModeSelection 
          industry={gameState.selectedIndustry!}
          completedDaily={gameState.completedDailies.has(gameState.selectedIndustry!)}
          onModeSelect={(mode) => 
            updateGameState({ selectedMode: mode, screen: 'game', guesses: [] })
          }
          onBack={() => updateGameState({ screen: 'home' })}
        />
      )}
      
      {gameState.screen === 'game' && (
        <GameScreen 
          industry={gameState.selectedIndustry!}
          mode={gameState.selectedMode!}
          gameState={gameState}
          onGameComplete={(isCorrect, movie, timeTaken) => {
            const newCompletedDailies = new Set(gameState.completedDailies);
            if (gameState.selectedMode === 'daily') {
              newCompletedDailies.add(gameState.selectedIndustry!);
            }
            updateGameState({ 
              screen: 'result', 
              isCorrect, 
              currentMovie: movie,
              gameOver: true,
              timeTaken,
              completedDailies: newCompletedDailies
            });
          }}
          onGuess={(guess) => 
            updateGameState({ 
              guesses: [...gameState.guesses, guess] 
            })
          }
          onBack={() => updateGameState({ screen: 'mode' })}
        />
      )}
      
      {gameState.screen === 'result' && (
        <ResultScreen 
          industry={gameState.selectedIndustry!}
          mode={gameState.selectedMode!}
          isCorrect={gameState.isCorrect!}
          movie={gameState.currentMovie}
          attempts={gameState.guesses.length}
          timeTaken={gameState.timeTaken || 0}
          onPlayAgain={() => {
            if (gameState.selectedMode === 'infinite') {
              updateGameState({ 
                screen: 'game', 
                guesses: [], 
                isCorrect: undefined,
                gameOver: false,
                currentMovie: undefined
              });
            } else {
              updateGameState({ screen: 'mode' });
            }
          }}
          onHome={resetGame}
        />
      )}
    </div>
  );
};

export default Index;
