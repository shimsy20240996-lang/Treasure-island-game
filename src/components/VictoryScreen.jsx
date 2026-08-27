import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Crown, Sparkles, Trophy, Clock, Compass, Coins, Heart, RotateCcw, Home } from 'lucide-react';
import { formatTimePlayed } from '../utils/gameLogic';
import sound from '../utils/audio';

export const VictoryScreen = ({
  node,
  timePlayed = 0,
  choicesMade = 0,
  health = 100,
  coins = 5000,
  discoveredLocations = [],
  onPlayAgain,
  onReturnToMenu,
  reducedMotion = false
}) => {
  useEffect(() => {
    sound.playChestOpen();

    // Trigger confetti bursts if motion is enabled
    if (!reducedMotion) {
      const duration = 3.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ffd700', '#f5b041', '#ffffff', '#eab308', '#ef4444']
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ffd700', '#f5b041', '#ffffff', '#eab308', '#38bdf8']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }

    // Keyboard listener
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onPlayAgain();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onReturnToMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [reducedMotion, onPlayAgain, onReturnToMenu]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-20">
      {/* Background Golden Glow */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-radial from-amber-600/20 via-black/60 to-black pointer-events-none" />

      {/* Main Victory Card */}
      <div className="glass-panel-victory p-6 sm:p-10 rounded-3xl max-w-2xl w-full text-center relative z-10 border-2 border-amber-400/60 shadow-[0_0_60px_rgba(245,176,65,0.35)] animate-fade-in">
        {/* Animated Crown & Chest Crest */}
        <div className="relative mb-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-amber-950/80 border-2 border-yellow-400 flex items-center justify-center text-yellow-300 shadow-[0_0_40px_rgba(255,215,0,0.6)] float-slow">
            <Crown size={56} className="animate-bounce" />
          </div>
          <Sparkles className="absolute top-0 right-1/3 text-yellow-300 animate-spin" size={24} />
          <Sparkles className="absolute bottom-2 left-1/3 text-amber-400 animate-pulse" size={20} />
        </div>

        {/* Title */}
        <h2 className="font-pirate text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 tracking-wider mb-1">
          You Found The Treasure!
        </h2>
        <p className="font-cinzel text-xs sm:text-sm text-yellow-400/90 uppercase tracking-widest mb-4 font-bold">
          ★ Adventure Complete — The Lost Treasure Is Yours ★
        </p>

        {/* Original Python game outcome quote */}
        <div className="bg-amber-950/60 border border-yellow-400/50 rounded-xl p-3.5 mb-5 text-yellow-200 text-sm sm:text-base italic font-serif shadow-inner">
          <span className="text-yellow-400 font-bold mr-1.5">“</span>
          {node.originalOutcome || 'You found the treasure, you win!'}
          <span className="text-yellow-400 font-bold ml-1.5">”</span>
        </div>

        {/* Lore Description */}
        <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
          {node.description}
        </p>

        {/* Comprehensive Run Statistics */}
        <div className="bg-slate-950/70 rounded-2xl p-4 sm:p-5 border border-amber-500/30 mb-8 shadow-inner">
          <h4 className="font-cinzel font-bold text-xs uppercase tracking-widest text-amber-300 mb-3 flex items-center justify-center gap-2">
            <Trophy size={16} /> Expedition Summary
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center">
              <span className="text-slate-400 text-[11px] flex items-center gap-1 mb-0.5">
                <Clock size={13} className="text-amber-400" /> Time Played
              </span>
              <span className="font-bold font-mono text-amber-200 text-base">{formatTimePlayed(timePlayed)}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center">
              <span className="text-slate-400 text-[11px] flex items-center gap-1 mb-0.5">
                <Coins size={13} className="text-yellow-400" /> Gold Plunder
              </span>
              <span className="font-bold font-mono text-yellow-300 text-base">{coins}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center">
              <span className="text-slate-400 text-[11px] flex items-center gap-1 mb-0.5">
                <Compass size={13} className="text-sky-400" /> Charted Nodes
              </span>
              <span className="font-bold font-mono text-sky-200 text-base">{discoveredLocations.length} / 5</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center">
              <span className="text-slate-400 text-[11px] flex items-center gap-1 mb-0.5">
                <Heart size={13} className="text-rose-400" /> Vitality
              </span>
              <span className="font-bold font-mono text-rose-300 text-base">{health}%</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
            className="btn-primary w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw size={18} />
            <span>Play Again (Enter)</span>
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

export default VictoryScreen;
