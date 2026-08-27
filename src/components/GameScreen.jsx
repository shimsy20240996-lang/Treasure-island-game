import React, { useState } from 'react';
import { GameHUD } from './GameHUD';
import { StoryPanel } from './StoryPanel';
import { TreasureMap } from './TreasureMap';
import { Inventory } from './Inventory';
import { ProgressBar } from './ProgressBar';
import { SettingsModal } from './SettingsModal';
import { HowToPlayModal } from './HowToPlayModal';
import { getStoryNode } from '../utils/gameLogic';
import { X } from 'lucide-react';
import sound from '../utils/audio';

export const GameScreen = ({
  gameState,
  settings,
  onMakeChoice,
  onRestart,
  onReturnToMenu,
  onUpdateSettings
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isMobileMapOpen, setIsMobileMapOpen] = useState(false);
  const [isMobileInventoryOpen, setIsMobileInventoryOpen] = useState(false);

  const currentNode = getStoryNode(gameState.currentNodeId);

  return (
    <div className="min-h-screen flex flex-col p-3 sm:p-6 max-w-7xl mx-auto relative z-10 select-none">
      {/* Top Game HUD */}
      <GameHUD
        health={gameState.health}
        coins={gameState.coins}
        timePlayed={gameState.timePlayed}
        currentNodeId={gameState.currentNodeId}
        discoveredLocations={gameState.discoveredLocations}
        settings={settings}
        onToggleSound={() => onUpdateSettings({ isMuted: !settings.isMuted })}
        onToggleMusic={() => onUpdateSettings({ isMusicMuted: !settings.isMusicMuted })}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onRestart={onRestart}
        onToggleMapModal={() => setIsMobileMapOpen(true)}
        onToggleInventoryModal={() => setIsMobileInventoryOpen(true)}
      />

      {/* Main 3-Column Desktop Grid / Responsive Mobile Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mt-4 sm:mt-6 flex-1 items-start">
        {/* Left Column: Interactive Map & Progress (Hidden on mobile unless in drawer) */}
        <div className="hidden lg:flex lg:col-span-4 flex-col gap-4 sticky top-6">
          <div className="glass-panel p-4 rounded-2xl border border-amber-500/20">
            <ProgressBar
              currentNodeId={gameState.currentNodeId}
              discoveredLocations={gameState.discoveredLocations}
            />
          </div>

          <div className="h-[420px]">
            <TreasureMap
              currentLocationId={currentNode.locationId || 'crossroad'}
              discoveredLocations={gameState.discoveredLocations}
              completedLocations={gameState.completedLocations}
            />
          </div>
        </div>

        {/* Center Column: Story Panel & Choices (Primary View) */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-4">
          {/* Mobile Progress Bar */}
          <div className="lg:hidden glass-panel p-3 rounded-xl border border-amber-500/20">
            <ProgressBar
              currentNodeId={gameState.currentNodeId}
              discoveredLocations={gameState.discoveredLocations}
            />
          </div>

          <StoryPanel
            node={currentNode}
            onMakeChoice={onMakeChoice}
            speed={settings.typewriterSpeed}
            reducedMotion={settings.reducedMotion}
          />
        </div>

        {/* Right Column: Inventory & Relics (Hidden on mobile unless in drawer) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 sticky top-6">
          <div className="h-[480px]">
            <Inventory inventory={gameState.inventory} />
          </div>
        </div>
      </div>

      {/* Mobile Map Drawer Modal */}
      {isMobileMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm lg:hidden animate-fade-in">
          <div className="w-full max-w-md max-h-[85vh] overflow-y-auto relative rounded-2xl">
            <button
              onClick={() => setIsMobileMapOpen(false)}
              className="absolute top-3 right-3 z-30 text-white bg-slate-900/90 p-1.5 rounded-full border border-amber-500/50 shadow-lg"
              aria-label="Close Map"
            >
              <X size={18} />
            </button>
            <TreasureMap
              currentLocationId={currentNode.locationId || 'crossroad'}
              discoveredLocations={gameState.discoveredLocations}
              completedLocations={gameState.completedLocations}
            />
          </div>
        </div>
      )}

      {/* Mobile Inventory Drawer Modal */}
      {isMobileInventoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm lg:hidden animate-fade-in">
          <div className="w-full max-w-md max-h-[85vh] overflow-y-auto relative rounded-2xl">
            <button
              onClick={() => setIsMobileInventoryOpen(false)}
              className="absolute top-3 right-3 z-30 text-white bg-slate-900/90 p-1.5 rounded-full border border-amber-500/50 shadow-lg"
              aria-label="Close Inventory"
            >
              <X size={18} />
            </button>
            <div className="h-[420px]">
              <Inventory inventory={gameState.inventory} />
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={onUpdateSettings}
      />

      {/* How To Play Modal */}
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />
    </div>
  );
};

export default GameScreen;
