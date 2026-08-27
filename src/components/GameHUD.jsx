import React from 'react';
import {
  Heart,
  Coins,
  Clock,
  Compass,
  Volume2,
  VolumeX,
  Music,
  Settings,
  RotateCcw,
  Map as MapIcon,
  Backpack
} from 'lucide-react';
import { formatTimePlayed, calculateProgress } from '../utils/gameLogic';
import sound from '../utils/audio';

export const GameHUD = ({
  health = 100,
  coins = 0,
  timePlayed = 0,
  currentNodeId = 'start',
  discoveredLocations = [],
  settings,
  onToggleSound,
  onToggleMusic,
  onOpenSettings,
  onRestart,
  onToggleMapModal,
  onToggleInventoryModal
}) => {
  const progressPercent = calculateProgress(currentNodeId, discoveredLocations);

  return (
    <header className="glass-panel px-3 sm:px-6 py-2.5 sm:py-3 rounded-2xl flex items-center justify-between gap-2 sm:gap-4 border border-amber-500/30 shadow-lg relative z-30">
      {/* Left: Game Title / Logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xl sm:text-2xl filter drop-shadow">🏝️</span>
        <div>
          <h1 className="font-pirate text-lg sm:text-2xl text-amber-300 tracking-wider leading-none">
            Treasure Island
          </h1>
          <span className="hidden sm:inline-block text-[10px] text-amber-400/80 font-cinzel font-semibold tracking-widest uppercase">
            The Lost Treasure
          </span>
        </div>
      </div>

      {/* Center: Key Stats (Health, Coins, Progress, Timer) */}
      <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm">
        {/* Health */}
        <div className="flex items-center gap-1 sm:gap-1.5 font-bold" title="Player Health">
          <Heart
            size={18}
            className={`${health > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-600'} transition-transform ${health > 0 ? 'animate-pulse' : ''}`}
          />
          <span className={`${health > 0 ? 'text-rose-200' : 'text-slate-500'} font-mono`}>
            {health}
          </span>
        </div>

        {/* Coins */}
        <div className="flex items-center gap-1 sm:gap-1.5 font-bold" title="Gold Doubloons">
          <Coins size={18} className="text-amber-400 fill-amber-400/30" />
          <span className="text-amber-200 font-mono">{coins}</span>
        </div>

        {/* Progress % */}
        <div className="hidden md:flex items-center gap-1.5 font-bold" title="Expedition Depth">
          <Compass size={17} className="text-sky-400" />
          <span className="text-sky-200 font-mono">{progressPercent}%</span>
        </div>

        {/* Time Elapsed */}
        <div className="hidden lg:flex items-center gap-1.5 font-bold text-slate-300" title="Time Elapsed">
          <Clock size={16} className="text-slate-400" />
          <span className="font-mono">{formatTimePlayed(timePlayed)}</span>
        </div>
      </div>

      {/* Right: Quick Controls & Mobile Modal Toggles */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Mobile Map Toggle */}
        <button
          onClick={() => {
            sound.playClick();
            onToggleMapModal && onToggleMapModal();
          }}
          className="md:hidden p-2 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 transition-colors"
          title="Open Map"
          aria-label="Open Map"
        >
          <MapIcon size={17} />
        </button>

        {/* Mobile Inventory Toggle */}
        <button
          onClick={() => {
            sound.playClick();
            onToggleInventoryModal && onToggleInventoryModal();
          }}
          className="md:hidden p-2 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 transition-colors"
          title="Open Inventory"
          aria-label="Open Inventory"
        >
          <Backpack size={17} />
        </button>

        {/* Audio Mute Toggle */}
        <button
          onClick={() => {
            sound.playClick();
            onToggleSound && onToggleSound();
          }}
          className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-600/60 text-slate-300 hover:text-amber-300 transition-colors"
          title={settings.isMuted ? 'Unmute Audio' : 'Mute Audio'}
          aria-label={settings.isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {settings.isMuted ? <VolumeX size={17} className="text-rose-400" /> : <Volume2 size={17} />}
        </button>

        {/* Restart Button */}
        <button
          onClick={() => {
            if (window.confirm('Restart current expedition from the beginning?')) {
              onRestart && onRestart();
            }
          }}
          className="hidden sm:flex p-2 rounded-lg bg-slate-800/80 hover:bg-rose-950/60 border border-slate-600/60 hover:border-rose-500/50 text-slate-300 hover:text-rose-300 transition-colors"
          title="Restart Expedition"
          aria-label="Restart Expedition"
        >
          <RotateCcw size={17} />
        </button>

        {/* Settings Button */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenSettings && onOpenSettings();
          }}
          className="p-2 rounded-lg bg-slate-800/80 hover:bg-amber-950/60 border border-slate-600/60 hover:border-amber-500/50 text-slate-300 hover:text-amber-300 transition-colors"
          title="Settings & Audio"
          aria-label="Settings"
        >
          <Settings size={17} />
        </button>
      </div>
    </header>
  );
};

export default GameHUD;
