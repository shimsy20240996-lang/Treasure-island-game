import React, { useState, useEffect, useRef } from 'react';
import { ChoiceButton } from './ChoiceButton';
import { Compass, Waves, Home, Crown, Skull, FastForward } from 'lucide-react';
import sound from '../utils/audio';

const iconMap = {
  Compass,
  Waves,
  Home,
  Crown,
  Skull
};

export const StoryPanel = ({
  node,
  onMakeChoice,
  speed = 'normal',
  reducedMotion = false
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = node.description || '';
  const textIndexRef = useRef(0);
  const typingTimerRef = useRef(null);

  // Typewriter speed mapping in ms
  const speedMs = reducedMotion || speed === 'instant' ? 0 : speed === 'fast' ? 12 : speed === 'slow' ? 35 : 20;

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    textIndexRef.current = 0;

    if (speedMs === 0) {
      setDisplayedText(fullText);
      setIsTyping(false);
      return;
    }

    const typeNextChar = () => {
      if (textIndexRef.current < fullText.length) {
        textIndexRef.current += 1;
        setDisplayedText(fullText.slice(0, textIndexRef.current));
        
        // Play typewriter sound periodically
        if (textIndexRef.current % 4 === 0) {
          sound.playTypewriter();
        }
        typingTimerRef.current = setTimeout(typeNextChar, speedMs);
      } else {
        setIsTyping(false);
      }
    };

    typingTimerRef.current = setTimeout(typeNextChar, speedMs);

    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, [node.id, fullText, speedMs]);

  // Click to complete typewriter
  const handleSkipTyping = () => {
    if (isTyping) {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      setDisplayedText(fullText);
      setIsTyping(false);
      sound.playClick();
    }
  };

  // Keyboard shortcut listener for choices (1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!node.choices || node.choices.length === 0) return;
      const key = e.key;
      const choiceIndex = parseInt(key, 10) - 1;
      if (!isNaN(choiceIndex) && choiceIndex >= 0 && choiceIndex < node.choices.length) {
        e.preventDefault();
        onMakeChoice(node.choices[choiceIndex], node.choices[choiceIndex].nextId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [node, onMakeChoice]);

  const LocationIcon = iconMap[node.icon] || Compass;

  return (
    <div className="glass-panel p-4 sm:p-7 rounded-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-300">
      {/* Decorative Atmosphere Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Story Content Area */}
      <div className="relative z-10">
        {/* Node Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md">
              <LocationIcon size={22} />
            </div>
            <div>
              <h2 className="font-cinzel text-lg sm:text-2xl font-bold text-amber-200 tracking-wide">
                {node.title}
              </h2>
              {node.subtitle && (
                <p className="text-xs sm:text-sm text-slate-400 font-sans">
                  {node.subtitle}
                </p>
              )}
            </div>
          </div>

          {isTyping && (
            <button
              onClick={handleSkipTyping}
              className="text-xs text-amber-400/80 hover:text-amber-300 flex items-center gap-1 bg-amber-950/40 hover:bg-amber-950/70 border border-amber-500/30 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
              title="Click to reveal text instantly"
            >
              <FastForward size={14} />
              <span>Skip</span>
            </button>
          )}
        </div>

        {/* Narrative Text Area */}
        <div
          onClick={handleSkipTyping}
          className="cursor-pointer min-h-[140px] text-slate-200 text-sm sm:text-base leading-relaxed space-y-3 font-sans"
        >
          {displayedText.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="tracking-wide">
              {paragraph}
            </p>
          ))}
          {isTyping && (
            <span className="inline-block w-2 h-4 bg-amber-400 ml-1 animate-pulse" />
          )}
        </div>

        {/* Original Python game quote banner */}
        {node.originalPrompt && (
          <div className="mt-4 p-3 rounded-lg bg-amber-950/30 border-l-4 border-amber-500 text-amber-300/90 text-xs sm:text-sm italic font-serif">
            <span className="font-bold mr-1">“</span>
            {node.originalPrompt}
            <span className="font-bold ml-1">”</span>
          </div>
        )}
      </div>

      {/* Choice Buttons Section */}
      <div className="mt-6 pt-4 border-t border-slate-700/50 relative z-10">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3 flex items-center justify-between">
          <span>Choose Your Action:</span>
          <span className="text-[11px] text-slate-500">Press 1-{node.choices?.length || 1} on keyboard</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {node.choices?.map((choice, idx) => (
            <ChoiceButton
              key={choice.id || idx}
              choice={choice}
              index={idx}
              onSelect={() => onMakeChoice(choice, choice.nextId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryPanel;
