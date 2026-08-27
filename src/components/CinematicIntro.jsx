import React, { useState, useEffect } from 'react';
import { Compass, ArrowRight, FastForward, Shield, Anchor } from 'lucide-react';
import sound from '../utils/audio';

const asciiChest = `
           |                   |                  |                     |
  _________|________________.=""_;=.______________|_____________________|_______
 |                   |  ,-"_,=""     \`"=.|                  |
 |___________________|__"=._o\`"-._        \`"=.______________|___________________
           |                \`"=._o\`"=._      _\`"=.                     |
  _________|_____________________:=._o "=._."_.-="'"=.__________________|_______
 |                   |    __.--" , ; \`"=._o." ,-"""-._ ".   |
 |___________________|_._"  ,. .\` \` \`\` ,  \`"-._"-._   ". '__|___________________
           |           |o\`"=._\` , "\` \`; .". ,  "-._"-._; ;              |
  _________|___________| ;\`-.o\`"=._; ." \` '\`."\\ \` . "-._ /_______________|_______
 |                   | |o ;    \`"-.o\`"=._\`\`  '\` " ,__.--o;   |
 |___________________|_| ;     (#) \`-.o \`"=. \`_.--"_o.-; ;___|___________________
 ____/______/______/___|o;._    "      \`".o|o_.--"    ;o;____/______/______/____
 /______/______/______/_"=._o--._        ; | ;        ; ;/______/______/______/_
 ____/______/______/______/__"=._o--._   ;o|o;     _._;o;____/______/______/____
 /______/______/______/______/____"=._o._; | ;_.--"o.--"_/______/______/______/_
 ____/______/______/______/______/_____"=.o|o_.--""___/______/______/______/____
 /______/______/______/______/______/______/______/______/______/______/_____ /
`;

export const CinematicIntro = ({ onContinue, reducedMotion = false }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    sound.startOceanAmbience();
    const timer = setTimeout(() => setPhase(1), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-20">
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md pointer-events-none" />

      {/* Main Intro Card */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl max-w-2xl w-full text-center relative z-10 border border-amber-500/40 shadow-2xl animate-fade-in">
        {/* Top Emblem */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-950/70 border border-amber-500/50 flex items-center justify-center text-amber-400 shadow-[0_0_25px_rgba(245,176,65,0.3)] float-slow">
          <Anchor size={32} />
        </div>

        {/* Title */}
        <h2 className="font-pirate text-3xl sm:text-5xl text-amber-300 tracking-wider mb-2">
          Treasure Island
        </h2>
        <p className="font-cinzel text-xs sm:text-sm text-amber-400/80 uppercase tracking-widest font-semibold mb-6">
          The Lost Treasure — Mission Briefing
        </p>

        {/* Preserved ASCII Art from task.py */}
        <div className="hidden sm:block overflow-x-auto bg-black/70 border border-amber-500/20 rounded-xl p-3 mb-6 shadow-inner font-mono text-[9px] leading-[11px] text-amber-400/75 select-none scrollbar-none text-left">
          <pre>{asciiChest}</pre>
        </div>

        {/* Narrative & Original Quote */}
        <div className="space-y-4 mb-8 text-slate-200 text-sm sm:text-base leading-relaxed font-sans bg-slate-950/50 p-5 rounded-xl border border-slate-800">
          <p className="font-serif italic text-amber-200 text-lg sm:text-xl font-bold">
            “Welcome to Treasure Island.”
          </p>
          <p className="text-slate-300">
            For generations, sailors and scoundrels have whispered tales of Captain Flint’s fabled vault. 
            Buried deep within a maze of treacherous paths, guarded by ancient perils and deadly traps.
          </p>
          <p className="font-cinzel text-amber-300 font-semibold text-sm">
            “Your mission is to find the treasure.”
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => {
            sound.playChoice();
            onContinue();
          }}
          className="btn-primary w-full sm:w-auto px-10 py-4 text-base sm:text-lg flex items-center justify-center gap-3 cursor-pointer mx-auto group shadow-[0_0_30px_rgba(245,176,65,0.4)]"
        >
          <span>Step Onto The Shore</span>
          <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default CinematicIntro;
