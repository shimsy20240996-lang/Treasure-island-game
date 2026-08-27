import React, { useState } from 'react';
import { gameItems } from '../data/items';
import { Compass, Anchor, Key, Crown, Sparkles, Info, X, Shield } from 'lucide-react';
import sound from '../utils/audio';

const iconMap = {
  Compass,
  Anchor,
  Key,
  Crown,
  Shield
};

export const Inventory = ({ inventory = [] }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const getRarityBadge = (rarity) => {
    switch (rarity) {
      case 'legendary':
        return 'text-amber-400 border-amber-500/60 bg-amber-950/60';
      case 'epic':
        return 'text-purple-400 border-purple-500/60 bg-purple-950/60';
      case 'rare':
        return 'text-blue-400 border-blue-500/60 bg-blue-950/60';
      default:
        return 'text-emerald-400 border-emerald-500/60 bg-emerald-950/60';
    }
  };

  return (
    <div className="glass-panel p-4 rounded-xl flex flex-col h-full border border-amber-500/20">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-amber-400" />
          <h3 className="font-cinzel font-bold text-sm sm:text-base text-amber-200 tracking-wider uppercase">
            Relics & Journal
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
          {inventory.length} Artifacts
        </span>
      </div>

      {/* Relics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 overflow-y-auto max-h-[300px] pr-1">
        {inventory.length === 0 ? (
          <div className="col-span-full py-8 text-center text-slate-500 text-xs sm:text-sm">
            <Compass className="mx-auto mb-2 opacity-40 animate-spin" size={28} />
            No relics collected yet. Explore the island to discover artifacts!
          </div>
        ) : (
          inventory.map((itemId) => {
            const item = gameItems[itemId];
            if (!item) return null;
            const Icon = iconMap[item.icon] || Compass;

            return (
              <button
                key={itemId}
                onClick={() => {
                  sound.playClick();
                  setSelectedItem(item);
                }}
                className="group relative p-3 rounded-lg bg-slate-900/70 hover:bg-slate-800/90 border border-slate-700/60 hover:border-amber-400/80 text-left transition-all duration-200 flex items-start gap-2.5 cursor-pointer shadow-sm hover:shadow-[0_4px_15px_rgba(245,176,65,0.15)] focus:outline-none focus:ring-1 focus:ring-amber-400"
              >
                <div className="w-8 h-8 rounded-md bg-amber-950/40 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-cinzel text-xs sm:text-sm font-bold text-slate-200 group-hover:text-amber-300 truncate">
                    {item.name}
                  </div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded border inline-block mt-0.5 ${getRarityBadge(item.rarity)}`}>
                    {item.rarity}
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Item Inspection Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel p-6 rounded-2xl max-w-sm w-full border border-amber-500/40 shadow-2xl relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-950/70 border border-amber-500/50 flex items-center justify-center text-amber-300 shadow-lg">
                {React.createElement(iconMap[selectedItem.icon] || Compass, { size: 26 })}
              </div>
              <div>
                <h4 className="font-cinzel font-bold text-lg text-amber-200">{selectedItem.name}</h4>
                <span className={`text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border inline-block mt-1 ${getRarityBadge(selectedItem.rarity)}`}>
                  {selectedItem.rarity}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans mb-4 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              {selectedItem.description}
            </p>

            <button
              onClick={() => setSelectedItem(null)}
              className="btn-primary w-full text-xs py-2.5"
            >
              Close Inspection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
