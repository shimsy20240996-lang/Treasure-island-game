import React from 'react';
import { calculateProgress } from '../utils/gameLogic';
import { Compass, Sparkles } from 'lucide-react';

export const ProgressBar = ({ currentNodeId, discoveredLocations }) => {
  const progressPercent = calculateProgress(currentNodeId, discoveredLocations);

  return (
    <div className="w-full flex flex-col gap-1.5 select-none">
      <div className="flex items-center justify-between text-xs font-cinzel font-bold text-amber-200/90 px-1">
        <span className="flex items-center gap-1.5">
          <Compass size={14} className="text-amber-400" />
          <span>Expedition Depth</span>
        </span>
        <span className="text-amber-400 font-mono tracking-wider">{progressPercent}%</span>
      </div>

      <div className="w-full h-2.5 bg-slate-950/80 rounded-full border border-amber-500/30 overflow-hidden relative shadow-inner p-0.5">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out relative"
          style={{
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #d4af37 0%, #f5b041 50%, #ffd700 100%)',
            boxShadow: '0 0 10px rgba(245, 176, 65, 0.6)'
          }}
        >
          {progressPercent > 0 && (
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/70 rounded-full animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
