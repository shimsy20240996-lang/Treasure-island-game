import React from 'react';
import { X, Compass, Navigation, MapPin, Backpack, Heart, Trophy, Keyboard } from 'lucide-react';
import sound from '../utils/audio';

export const HowToPlayModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel p-6 sm:p-8 rounded-2xl max-w-lg w-full border border-amber-500/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors"
          aria-label="Close Guide"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200 mb-4 flex items-center gap-2.5">
          <span>How To Play</span>
        </h3>

        <div className="space-y-4 text-sm text-slate-300 font-sans leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <h4 className="font-cinzel font-bold text-amber-300 flex items-center gap-2 mb-1">
              <Navigation size={16} /> Making Choices
            </h4>
            <p className="text-xs text-slate-400">
              At each location, review the story narrative and select your desired action. You can click with your mouse, tap on touchscreen, or press numerical hotkeys <span className="font-mono text-amber-400 font-bold">[1]</span>, <span className="font-mono text-amber-400 font-bold">[2]</span>, <span className="font-mono text-amber-400 font-bold">[3]</span> on your keyboard.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <h4 className="font-cinzel font-bold text-amber-300 flex items-center gap-2 mb-1">
              <MapPin size={16} /> The Expedition Map
            </h4>
            <p className="text-xs text-slate-400">
              The parchment map on the left updates dynamically as you discover new landmarks. Dotted trails show your traversed path from the crossroads to the legendary treasure vault.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <h4 className="font-cinzel font-bold text-amber-300 flex items-center gap-2 mb-1">
              <Backpack size={16} /> Relics & Journal
            </h4>
            <p className="text-xs text-slate-400">
              Unique artifacts (compass, boat tokens, keys, crowns) are collected in your inventory as you progress. Click on any relic to inspect its lore!
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <h4 className="font-cinzel font-bold text-amber-300 flex items-center gap-2 mb-1">
              <Trophy size={16} /> The Original Python Logic
            </h4>
            <p className="text-xs text-slate-400">
              Every choice, outcome, and death trap directly mirrors the original Python game logic. Choose your path wisely to claim Captain Flint’s gold!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="btn-primary w-full mt-6 text-xs sm:text-sm py-2.5"
        >
          Understood, Ready to Sail!
        </button>
      </div>
    </div>
  );
};

export default HowToPlayModal;
