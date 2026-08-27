import React from 'react';
import { X, Volume2, VolumeX, Music, Zap, Eye, Trash2 } from 'lucide-react';
import sound from '../utils/audio';

export const SettingsModal = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetSave
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel p-6 sm:p-8 rounded-2xl max-w-md w-full border border-amber-500/40 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors"
          aria-label="Close Settings"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200 mb-6 flex items-center gap-2.5">
          <span>Game Settings</span>
        </h3>

        <div className="space-y-5 text-sm text-slate-200">
          {/* Master Volume */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="flex items-center gap-2 font-medium">
                <Volume2 size={16} className="text-amber-400" /> Master Volume
              </label>
              <span className="font-mono text-xs text-amber-400">
                {Math.round(settings.masterVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.masterVolume}
              onChange={(e) => onUpdateSettings({ masterVolume: parseFloat(e.target.value) })}
              className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Music Volume */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="flex items-center gap-2 font-medium">
                <Music size={16} className="text-amber-400" /> Ocean Ambience
              </label>
              <span className="font-mono text-xs text-amber-400">
                {Math.round(settings.musicVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.musicVolume}
              onChange={(e) => onUpdateSettings({ musicVolume: parseFloat(e.target.value) })}
              className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Sound Effects (SFX) */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="flex items-center gap-2 font-medium">
                <Zap size={16} className="text-amber-400" /> Sound Effects
              </label>
              <span className="font-mono text-xs text-amber-400">
                {Math.round(settings.sfxVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.sfxVolume}
              onChange={(e) => onUpdateSettings({ sfxVolume: parseFloat(e.target.value) })}
              className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Text Speed */}
          <div>
            <label className="block font-medium mb-1.5 text-slate-300">Narrative Typewriter Speed</label>
            <div className="grid grid-cols-4 gap-1.5 text-xs">
              {['slow', 'normal', 'fast', 'instant'].map((spd) => (
                <button
                  key={spd}
                  onClick={() => {
                    sound.playClick();
                    onUpdateSettings({ typewriterSpeed: spd });
                  }}
                  className={`py-1.5 px-2 rounded-md font-medium capitalize border transition-all ${
                    settings.typewriterSpeed === spd
                      ? 'bg-amber-500 text-slate-950 border-amber-300 font-bold'
                      : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {spd}
                </button>
              ))}
            </div>
          </div>

          {/* Accessibility Toggles */}
          <div className="pt-2 border-t border-slate-700/60 space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs sm:text-sm font-medium">Reduced Motion</span>
              <input
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={(e) => onUpdateSettings({ reducedMotion: e.target.checked })}
                className="w-4 h-4 accent-amber-400 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs sm:text-sm font-medium">High Contrast Mode</span>
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={(e) => onUpdateSettings({ highContrast: e.target.checked })}
                className="w-4 h-4 accent-amber-400 cursor-pointer"
              />
            </label>
          </div>

          {/* Danger Zone: Clear Save */}
          <div className="pt-3 border-t border-slate-700/60">
            <button
              onClick={() => {
                if (window.confirm('Delete all saved game progress and restart fresh?')) {
                  localStorage.removeItem('TREASURE_ISLAND_SAVE_V2');
                  window.location.reload();
                }
              }}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors"
            >
              <Trash2 size={14} /> Clear Saved Game Data
            </button>
          </div>
        </div>

        {/* Done Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="btn-primary w-full mt-6 text-xs sm:text-sm py-2.5"
        >
          Save & Close
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
