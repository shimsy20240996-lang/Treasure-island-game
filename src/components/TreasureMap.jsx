import React, { useState } from 'react';
import { mapLocations, mapPaths } from '../data/locations';
import { Compass, Skull, Waves, Home, Crown, Lock, CheckCircle2, MapPin } from 'lucide-react';
import sound from '../utils/audio';

export const TreasureMap = ({
  currentLocationId = 'crossroad',
  discoveredLocations = ['crossroad'],
  completedLocations = [],
  onSelectLocation
}) => {
  const [hoveredLocation, setHoveredLocation] = useState(null);

  const getLocationStatus = (locId) => {
    if (currentLocationId === locId) return 'current';
    if (completedLocations.includes(locId)) return 'completed';
    if (discoveredLocations.includes(locId)) return 'discovered';
    return 'locked';
  };

  const getIconForType = (type, status) => {
    if (status === 'locked') return <Lock size={14} className="opacity-60" />;
    switch (type) {
      case 'water': return <Waves size={16} />;
      case 'building': return <Home size={16} />;
      case 'danger': return <Skull size={16} />;
      case 'treasure': return <Crown size={18} className="text-yellow-400" />;
      default: return <Compass size={16} />;
    }
  };

  return (
    <div className="parchment-bg rounded-xl p-3 sm:p-4 relative overflow-hidden select-none shadow-2xl border-2 border-[#9e825a] flex flex-col h-full">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#9e825a]/40 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-[#8b5a2b]" />
          <h3 className="font-cinzel font-bold text-sm sm:text-base text-[#4a2e12] tracking-wider uppercase">
            Expedition Chart
          </h3>
        </div>
        <span className="text-xs font-semibold text-[#8b5a2b] bg-[#e6d3af] px-2 py-0.5 rounded-full border border-[#9e825a]/50">
          {discoveredLocations.length} / 5 Found
        </span>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative flex-1 min-h-[220px] w-full flex items-center justify-center">
        <svg
          viewBox="0 0 700 560"
          className="w-full h-full max-h-[360px] filter drop-shadow-sm"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Compass Gradient */}
            <radialGradient id="compassGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffd700" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#b8860b" stopOpacity="0" />
            </radialGradient>

            {/* Island Shoreline Filter */}
            <filter id="parchmentRoughness" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          {/* Island Coastlines (Old Map Aesthetic) */}
          <path
            d="M 60,380 C 40,240 180,80 380,60 C 580,40 660,180 640,360 C 620,500 440,540 280,530 C 140,520 80,480 60,380 Z"
            fill="#ede0c3"
            stroke="#9e825a"
            strokeWidth="3"
            strokeDasharray="6,4"
            className="opacity-70"
          />

          {/* Water Waves Illustration */}
          <path d="M 90,160 Q 110,150 130,160 Q 150,170 170,160" stroke="#8b9da8" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M 450,480 Q 470,470 490,480 Q 510,490 530,480" stroke="#8b9da8" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M 520,380 Q 540,370 560,380" stroke="#8b9da8" strokeWidth="1.5" fill="none" opacity="0.5" />

          {/* Lake Feature */}
          <ellipse cx="310" cy="300" rx="90" ry="60" fill="#c3d9de" stroke="#7a9ba6" strokeWidth="2" strokeDasharray="3,3" opacity="0.7" />
          <text x="310" y="305" textAnchor="middle" fill="#4d6f7c" fontSize="13" fontFamily="MedievalSharp" fontStyle="italic">
            Lake of Shadows
          </text>

          {/* Sea Monster / Kraken Silhouette */}
          <path
            d="M 360,320 Q 375,295 385,315 Q 395,290 405,310"
            stroke="#5c7a88"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Compass Rose in Corner */}
          <g transform="translate(620, 90) scale(0.65)" opacity="0.75">
            <circle cx="0" cy="0" r="45" fill="none" stroke="#7a5830" strokeWidth="2" strokeDasharray="2,2" />
            <polygon points="0,-45 8,-12 0,0 -8,-12" fill="#8b2500" />
            <polygon points="0,45 8,12 0,0 -8,12" fill="#7a5830" />
            <polygon points="45,0 12,8 0,0 12,-8" fill="#7a5830" />
            <polygon points="-45,0 -12,8 0,0 -12,-8" fill="#7a5830" />
            <text x="0" y="-50" textAnchor="middle" fill="#8b2500" fontWeight="bold" fontSize="16" fontFamily="Cinzel">N</text>
          </g>

          {/* Mountain & Tree sketches */}
          <g opacity="0.4" stroke="#684a28" strokeWidth="1.5" fill="none">
            {/* Mountains */}
            <path d="M 170,190 L 195,150 L 220,190" />
            <path d="M 210,190 L 230,160 L 250,190" />
            <path d="M 195,150 L 202,165 L 188,165" fill="#684a28" opacity="0.3" />
            {/* Palm Trees */}
            <path d="M 100,320 Q 95,300 90,285 M 90,285 Q 75,280 70,290 M 90,285 Q 90,270 80,270 M 90,285 Q 105,280 110,290" />
            <path d="M 520,440 Q 525,420 530,405 M 530,405 Q 515,400 510,410 M 530,405 Q 545,400 550,410" />
          </g>

          {/* Dotted Trails / Paths */}
          {mapPaths.map((path, idx) => {
            const fromStatus = getLocationStatus(path.from);
            const toStatus = getLocationStatus(path.to);
            const isTraversed = (fromStatus === 'current' || fromStatus === 'completed') && (toStatus === 'current' || toStatus === 'completed' || toStatus === 'discovered');

            return (
              <path
                key={idx}
                d={path.d}
                fill="none"
                stroke={isTraversed ? '#b85d19' : '#b09673'}
                strokeWidth={isTraversed ? '3.5' : '2'}
                strokeDasharray={isTraversed ? '6,6' : '3,6'}
                strokeLinecap="round"
                className={isTraversed ? 'animate-pulse' : 'opacity-40'}
              />
            );
          })}

          {/* Big X for Vault */}
          <g transform="translate(540, 90)">
            <line x1="-14" y1="-14" x2="14" y2="14" stroke="#c0392b" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="14" y1="-14" x2="-14" y2="14" stroke="#c0392b" strokeWidth="4.5" strokeLinecap="round" />
            <text x="0" y="32" textAnchor="middle" fill="#8b1e10" fontWeight="bold" fontSize="13" fontFamily="Pirata One">
              TREASURE VAULT
            </text>
          </g>

          {/* Location Nodes */}
          {Object.values(mapLocations).map(loc => {
            const status = getLocationStatus(loc.id);
            const isCurrent = status === 'current';
            const isDiscovered = status === 'discovered';
            const isCompleted = status === 'completed';
            const isHovered = hoveredLocation?.id === loc.id;

            let fillColor = '#d5be9b';
            let strokeColor = '#8a6538';
            let textColor = '#5a3d1b';

            if (isCurrent) {
              fillColor = '#f5b041';
              strokeColor = '#b8860b';
              textColor = '#873600';
            } else if (isCompleted) {
              fillColor = '#a3e4d7';
              strokeColor = '#117864';
            } else if (isDiscovered) {
              fillColor = '#f9e79f';
              strokeColor = '#b7950b';
            }

            return (
              <g
                key={loc.id}
                transform={`translate(${loc.x}, ${loc.y})`}
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => {
                  setHoveredLocation(loc);
                  sound.playClick();
                }}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => onSelectLocation && onSelectLocation(loc.id)}
              >
                {/* Pulsing Aura if Current */}
                {isCurrent && (
                  <>
                    <circle cx="0" cy="0" r="28" fill="url(#compassGlow)" className="animate-ping opacity-40" />
                    <circle cx="0" cy="0" r="22" fill="none" stroke="#d4af37" strokeWidth="2.5" strokeDasharray="4,2" />
                  </>
                )}

                {/* Main Node Circle */}
                <circle
                  cx="0"
                  cy="0"
                  r={isHovered ? 18 : 15}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={isCurrent ? '3' : '2'}
                  filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.35))"
                  className="transition-all duration-200"
                />

                {/* Center Pin Indicator */}
                {isCurrent ? (
                  <polygon points="0,-10 6,4 0,1 -6,4" fill="#900c3f" />
                ) : isCompleted ? (
                  <polyline points="-5,0 -2,4 5,-3" fill="none" stroke="#0e6251" strokeWidth="2.5" strokeLinecap="round" />
                ) : (
                  <circle cx="0" cy="0" r="4" fill={strokeColor} />
                )}

                {/* Node Label */}
                <text
                  x="0"
                  y="26"
                  textAnchor="middle"
                  fill={textColor}
                  fontWeight={isCurrent ? 'bold' : '600'}
                  fontSize={isCurrent ? '13' : '11'}
                  fontFamily="Cinzel"
                  className="pointer-events-none drop-shadow-sm"
                >
                  {loc.shortName}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Dynamic Tooltip on Hover */}
        {hoveredLocation && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#2c1810]/95 text-[#f4ecd8] px-3 py-1.5 rounded-lg text-xs shadow-xl border border-[#d4af37] max-w-[85%] text-center pointer-events-none transition-all animate-fade-in z-20">
            <div className="font-bold font-cinzel text-yellow-400">{hoveredLocation.name}</div>
            <div className="text-[11px] opacity-90">{hoveredLocation.description}</div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="mt-1 pt-1.5 border-t border-[#9e825a]/30 flex items-center justify-between text-[11px] text-[#6d4c2b] font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f5b041] border border-[#b8860b] inline-block animate-pulse"></span>
          <span>Current</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f9e79f] border border-[#b7950b] inline-block"></span>
          <span>Discovered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#a3e4d7] border border-[#117864] inline-block"></span>
          <span>Cleared</span>
        </div>
      </div>
    </div>
  );
};

export default TreasureMap;
