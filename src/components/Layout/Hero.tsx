import React from 'react';
import { GlitchText } from '../ui/GlitchText';
import { ScrambleText } from '../ui/ScrambleText';

export const Hero: React.FC = () => {
  return (
    <section className="pt-12 pb-6 md:py-24 border-b border-white/5">
      <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:items-stretch">
        <div className="flex flex-col">
          <h2 className="font-display text-[12vw] md:text-[8vw] leading-[0.8] uppercase tracking-tighter cursor-crosshair">
            <GlitchText text="MOKHLES" /> <br /> <GlitchText text="ELHENI" />
          </h2>
          <span className="font-mono text-neon text-[2.5vw] md:text-[0.9vw] tracking-[0.2em] mt-4 md:mt-3 uppercase block min-h-[1.5em] md:min-h-auto flex items-center">
            <ScrambleText text="SOFTWARE ENGINEER — EX AMAZON, CRITEO" className="cursor-crosshair" scrambleOnHover={false} />
          </span>
        </div>

        <div className="flex flex-col justify-between items-start md:items-end w-full md:w-auto mt-8 md:mt-0">
          <div className="max-w-sm text-left md:text-right font-mono text-[12px] md:text-[14px] text-zinc-500 uppercase leading-relaxed mt-auto">
            <span className="text-white block mb-2">INTRODUCTION //</span>
            Senior Software Engineer with 8+ years of experience architecting high-scale observability platforms and leveraging GenAI to optimize complex workflows at scale.
          </div>
        </div>
      </div>
    </section>
  );
};
