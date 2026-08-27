import React from 'react';
import {
  Navigation,
  Footprints,
  Clock,
  Droplets,
  Flame,
  Sparkles,
  ShieldAlert,
  EyeOff,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import sound from '../utils/audio';

const iconMap = {
  Navigation,
  Footprints,
  Clock,
  Droplets,
  Flame,
  Sparkles,
  ShieldAlert,
  EyeOff
};

export const ChoiceButton = ({
  choice,
  index,
  onSelect,
  disabled = false
}) => {
  const IconComponent = iconMap[choice.icon] || ArrowRight;

  const handleClick = () => {
    if (disabled) return;
    sound.playClick();
    onSelect(choice);
  };

  const getBadgeStyle = () => {
    switch (choice.badge) {
      case 'Recommended':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50';
      case 'Danger':
      case 'Hazardous':
        return 'bg-rose-950/80 text-rose-300 border-rose-500/50';
      case 'Patience':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/50';
      case 'Crimson':
        return 'bg-red-950/80 text-red-300 border-red-500/50';
      case 'Golden':
        return 'bg-yellow-950/80 text-yellow-300 border-yellow-500/50';
      case 'Cobalt':
        return 'bg-blue-950/80 text-blue-300 border-blue-500/50';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-600/50';
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      tabIndex={0}
      aria-label={`Option ${index + 1}: ${choice.text}`}
      style={{
        background: 'rgba(15, 27, 40, 0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(212, 175, 55, 0.25)',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
      }}
      className="w-full group text-left p-4 sm:p-5 transition-all duration-200 hover:border-amber-400 hover:bg-slate-800/90 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgba(245,176,65,0.2)] active:translate-y-[1px] cursor-pointer flex items-center justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
    >
      <div className="flex items-start gap-3.5 sm:gap-4 flex-1">
        {/* Number / Hotkey Badge */}
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-400 font-cinzel font-bold flex items-center justify-center text-sm shadow-inner group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-300 transition-colors">
          {choice.key || index + 1}
        </div>

        {/* Choice Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h4 className="font-cinzel font-bold text-base sm:text-lg text-slate-100 group-hover:text-amber-300 transition-colors flex items-center gap-2">
              <IconComponent size={18} className="text-amber-400/80 group-hover:text-amber-300" />
              {choice.text}
            </h4>
            {choice.badge && (
              <span className={`text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${getBadgeStyle()}`}>
                {choice.badge}
              </span>
            )}
          </div>
          {choice.subtext && (
            <p className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-300 font-sans line-clamp-2">
              {choice.subtext}
            </p>
          )}
        </div>
      </div>

      {/* Arrow Indicator */}
      <div className="flex-shrink-0 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all">
        <ChevronRight size={22} />
      </div>
    </button>
  );
};

export default ChoiceButton;
