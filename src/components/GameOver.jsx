import React, { useEffect } from 'react';
import { Skull, RotateCcw, Home, Clock, Compass, Footprints } from 'lucide-react';
import { formatTimePlayed, calculateProgress } from '../utils/gameLogic';
import sound from '../utils/audio';

export const GameOver = ({
  node,
  timePlayed = 0,
  choicesMade = 0,
  discoveredLocations = [],
  onTryAgain,
  onReturnToMenu
}) => {
  useEffect(() => {
    // Keyboard listeners
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onTryAgain();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onReturnToMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTryAgain, onReturnToMenu]);

  const progressPercent = calculateProgress(node.id, discoveredLocations);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-20">
      {/* Background crimson vignette */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-radial from-rose-950/30 via-transparent to-black pointer-events-none" />

      {/* Main Death Card */}
      <div className="glass-panel-danger p-6 sm:p-10 rounded-3xl max-w-xl w-full text-center relative z-10 border-2 border-rose-600/50 shadow-[0_0_50px_rgba(239,68,68,0.35)] shake-animation">
        {/* Animated Skull Crest */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-2xl bg-rose-950/80 border-2 border-rose-500 flex items-center justify-center text-rose-400 shadow-[0_0_30px_rgba(239,68,68,0.5)]">
          <Skull size={48} className="animate-pulse" />
        </div>

        {/* Title */}
        <h2 className="font-pirate text-3xl sm:text-5xl text-rose-400 tracking-wider mb-1">
          Your Journey Ends
        </h2>
        <p className="font-cinzel text-xs sm:text-sm text-rose-200/80 uppercase tracking-widest mb-6">
          The Island Has Claimed Another Soul
        </p>

        {/* Original Python game outcome quote */}
        <div className="bg-black/60 border border-rose-500/40 rounded-xl p-4 mb-6 text-rose-100 text-sm sm:text-base italic font-serif shadow-inner">
          <span className="text-rose-400 font-bold mr-1.5">“</span>
          {node.originalOutcome || 'Game Over.'}
          <span className="text-rose-400 font-bold ml-1.5">”</span>
        </div>

        {/* Lore Description */}
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
          {node.description}
        </p>

        {/* Expedition Survival Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 bg-rose-950/30 p-3.5 rounded-xl border border-rose-500/20 text-xs sm:text-sm">
          <div className="flex flex-col items-center">
            <span className="text-slate-400 text-[11px] flex items-center gap-1 mb-0.5">
              <Clock size={13} className="text-rose-400" /> Time
            </span>
            <span className="font-bold font-mono text-slate-100">{formatTimePlayed(timePlayed)}</span>
          </div>

          <div className="flex flex-col items-center border-x border-rose-500/20">
            <span className="text-slate-400 text-[11px] flex items-center gap-1 mb-0.5">
              <Footprints size={13} className="text-rose-400" /> Choices
            </span>
            <span className="font-bold font-mono text-slate-100">{choicesMade}</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-slate-400 text-[11px] flex items-center gap-1 mb-0.5">
              <Compass size={13} className="text-rose-400" /> Depth
            </span>
            <span className="font-bold font-mono text-slate-100">{progressPercent}%</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onTryAgain();
            }}
            className="btn-danger w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw size={18} />
            <span>Try Again (Enter)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onReturnToMenu();
            }}
            className="btn-secondary w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home size={18} />
            <span>Main Menu (Esc)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
