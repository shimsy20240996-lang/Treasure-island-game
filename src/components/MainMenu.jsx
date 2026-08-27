import React, { useEffect } from 'react';
import { Compass, Play, BookOpen, Settings as SettingsIcon, RotateCcw, Sparkles, Anchor, Trophy } from 'lucide-react';
import sound from '../utils/audio';

export const MainMenu = ({
  hasSave = false,
  onStartNewGame,
  onContinueGame,
  onOpenHowToPlay,
  onOpenSettings,
  victoriesCount = 0,
  deathsCount = 0
}) => {
  useEffect(() => {
    // Start ambient sounds upon user interaction or mount
    const handleFirstTouch = () => {
      sound.resumeContext();
      sound.startOceanAmbience();
    };
    window.addEventListener('click', handleFirstTouch, { once: true });
    return () => window.removeEventListener('click', handleFirstTouch);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 sm:p-8 relative z-20 select-none overflow-hidden">
      {/* Background Cinematic Atmosphere Elements */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#050b11] via-[#091522] to-[#04080d] pointer-events-none" />
      
      {/* Distant Island Silhouette and Light Ray */}
      <div className="fixed inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      <div className="fixed top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-amber-400/10 via-teal-500/5 to-transparent rounded-full filter blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="relative z-10 pt-4 sm:pt-6 flex items-center gap-2 text-amber-400/90 text-xs sm:text-sm font-cinzel font-semibold tracking-widest uppercase bg-amber-950/40 px-4 py-1.5 rounded-full border border-amber-500/30 shadow-md">
        <Sparkles size={14} className="text-amber-400 animate-spin" />
        <span>Interactive Pirate Adventure</span>
      </div>

      {/* Center Hero Banner & Actions */}
      <div className="relative z-10 flex flex-col items-center max-w-xl w-full text-center my-auto py-6">
        {/* Animated Compass Anchor Icon */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-950/70 border-2 border-amber-500/60 flex items-center justify-center text-amber-300 shadow-[0_0_40px_rgba(245,176,65,0.4)] mb-4 float-slow">
          <Anchor size={44} />
        </div>

        {/* Main Title */}
        <h1 className="font-pirate text-5xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-amber-300 to-yellow-600 tracking-wider filter drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] mb-2">
          Treasure Island
        </h1>

        {/* Subtitle */}
        <h2 className="font-cinzel text-sm sm:text-lg text-amber-200/90 tracking-[0.25em] uppercase font-bold mb-8">
          The Lost Treasure
        </h2>

        {/* Menu Buttons Group */}
        <div className="flex flex-col gap-3.5 w-full max-w-xs sm:max-w-sm">
          {/* Begin Adventure / New Game */}
          <button
            onClick={() => {
              sound.playChoice();
              onStartNewGame();
            }}
            className="btn-primary w-full py-4 text-base sm:text-lg flex items-center justify-center gap-3 cursor-pointer group shadow-[0_0_35px_rgba(245,176,65,0.45)]"
          >
            <Play size={20} className="fill-current group-hover:scale-110 transition-transform" />
            <span>Begin Adventure</span>
          </button>

          {/* Continue Game (if save exists) */}
          {hasSave && (
            <button
              onClick={() => {
                sound.playClick();
                onContinueGame();
              }}
              className="btn-secondary w-full py-3.5 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer border-amber-400/50 hover:border-amber-300"
            >
              <RotateCcw size={18} className="text-amber-400" />
              <span>Continue Expedition</span>
            </button>
          )}

          {/* How To Play */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenHowToPlay();
            }}
            className="btn-secondary w-full py-3 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen size={17} />
            <span>How to Play</span>
          </button>

          {/* Settings */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            className="btn-secondary w-full py-3 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
          >
            <SettingsIcon size={17} />
            <span>Settings & Audio</span>
          </button>
        </div>

        {/* Lifetime Record / Stats pill */}
        {(victoriesCount > 0 || deathsCount > 0) && (
          <div className="mt-6 flex items-center gap-4 text-xs text-slate-400 font-cinzel bg-black/40 px-4 py-1.5 rounded-full border border-slate-800">
            <span className="text-amber-300">🏆 Victories: {victoriesCount}</span>
            <span className="text-rose-400">☠️ Defeats: {deathsCount}</span>
          </div>
        )}
      </div>

      {/* Footer info */}
      <footer className="relative z-10 text-center pb-2 text-[11px] sm:text-xs text-slate-500 font-sans">
        <p>A Cinematic Interactive Adaptation of the classic Python Treasure Island Game</p>
      </footer>
    </div>
  );
};

export default MainMenu;
