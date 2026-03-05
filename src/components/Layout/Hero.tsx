import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="py-24 border-b border-white/5">
      <div className="flex flex-col md:flex-row items-end justify-between gap-8">
        <div className="flex flex-col">
          <h2 className="font-display text-[10vw] md:text-[8vw] leading-[0.8] uppercase tracking-tighter">
            MOKHLES <br /> ELHENI
          </h2>
          <span className="font-mono text-neon text-[3vw] md:text-[1.5vw] tracking-[0.3em] mt-6 uppercase block">
            SOFTWARE ENGINEER
          </span>
        </div>
        <div className="max-w-sm text-right font-mono text-[12px] md:text-[14px] text-zinc-500 uppercase leading-relaxed">
          <span className="text-white block mb-2">INTRODUCTION //</span>
          Senior Software Engineer with 8+ years of experience architecting high-scale observability platforms and leveraging GenAI to optimize complex workflows at scale.
        </div>
      </div>
    </section>
  );
};
