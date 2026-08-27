import React, { useState, useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { CanvasParticles } from './components/CanvasParticles';
import { MainMenu } from './components/MainMenu';
import { CinematicIntro } from './components/CinematicIntro';
import { GameScreen } from './components/GameScreen';
import { GameOver } from './components/GameOver';
import { VictoryScreen } from './components/VictoryScreen';
import { SettingsModal } from './components/SettingsModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { getStoryNode } from './utils/gameLogic';

export function App() {
  const {
    gameState,
    settings,
    hasSave,
    startNewGame,
    continueGame,
    finishIntro,
    makeChoice,
    restartGame,
    returnToMenu,
    updateSettings
  } = useGameState();

  const [isMenuSettingsOpen, setIsMenuSettingsOpen] = useState(false);
  const [isMenuHowToPlayOpen, setIsMenuHowToPlayOpen] = useState(false);

  // Apply high contrast mode class
  useEffect(() => {
    if (settings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [settings.highContrast]);

  const currentNode = getStoryNode(gameState.currentNodeId);

  // Determine ambient particle mood
  const particleMood = gameState.screen === 'victory'
    ? 'victory'
    : gameState.currentNodeId === 'fire'
    ? 'fire'
    : 'ocean';

  return (
    <div className={`min-h-screen relative font-sans text-slate-100 ${settings.highContrast ? 'high-contrast' : ''}`}>
      {/* Dynamic Ambient Canvas Particles */}
      <CanvasParticles mood={particleMood} reducedMotion={settings.reducedMotion} />

      {/* Screen Router */}
      {gameState.screen === 'menu' && (
        <MainMenu
          hasSave={hasSave}
          onStartNewGame={startNewGame}
          onContinueGame={continueGame}
          onOpenHowToPlay={() => setIsMenuHowToPlayOpen(true)}
          onOpenSettings={() => setIsMenuSettingsOpen(true)}
          victoriesCount={gameState.victoriesCount}
          deathsCount={gameState.deathsCount}
        />
      )}

      {gameState.screen === 'intro' && (
        <CinematicIntro
          onContinue={finishIntro}
          reducedMotion={settings.reducedMotion}
        />
      )}

      {gameState.screen === 'game' && (
        <GameScreen
          gameState={gameState}
          settings={settings}
          onMakeChoice={makeChoice}
          onRestart={restartGame}
          onReturnToMenu={returnToMenu}
          onUpdateSettings={updateSettings}
        />
      )}

      {gameState.screen === 'gameover' && (
        <GameOver
          node={currentNode}
          timePlayed={gameState.timePlayed}
          choicesMade={gameState.choicesMade}
          discoveredLocations={gameState.discoveredLocations}
          onTryAgain={restartGame}
          onReturnToMenu={returnToMenu}
        />
      )}

      {gameState.screen === 'victory' && (
        <VictoryScreen
          node={currentNode}
          timePlayed={gameState.timePlayed}
          choicesMade={gameState.choicesMade}
          health={gameState.health}
          coins={gameState.coins}
          discoveredLocations={gameState.discoveredLocations}
          onPlayAgain={startNewGame}
          onReturnToMenu={returnToMenu}
          reducedMotion={settings.reducedMotion}
        />
      )}

      {/* Menu Settings & How to Play Modals */}
      <SettingsModal
        isOpen={isMenuSettingsOpen}
        onClose={() => setIsMenuSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
      />

      <HowToPlayModal
        isOpen={isMenuHowToPlayOpen}
        onClose={() => setIsMenuHowToPlayOpen(false)}
      />
    </div>
  );
}

export default App;
