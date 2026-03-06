import React from 'react';
import { SocialLinks } from './SocialLinks';

export const Hero: React.FC = () => {
  return (
    <section className="py-12 md:py-24 border-b border-white/5">
      <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:items-stretch">
        <div className="flex flex-col">
          <h2 className="font-display text-[12vw] md:text-[8vw] leading-[0.8] uppercase tracking-tighter">
            MOKHLES <br /> ELHENI
          </h2>
          <span className="font-mono text-neon text-[4vw] md:text-[1.5vw] tracking-[0.3em] mt-4 md:mt-6 uppercase block">
            SOFTWARE ENGINEER
          </span>
        </div>

        <div className="flex flex-col justify-between items-start md:items-end w-full md:w-auto mt-8 md:mt-0">
          <SocialLinks className="mb-8 md:mb-0" />
          <div className="max-w-sm text-left md:text-right font-mono text-[12px] md:text-[14px] text-zinc-500 uppercase leading-relaxed mt-auto">
            <span className="text-white block mb-2">INTRODUCTION //</span>
            Senior Software Engineer with 8+ years of experience architecting high-scale observability platforms and leveraging GenAI to optimize complex workflows at scale.
          </div>
        </div>
      </div>
    </section>
  );
};
