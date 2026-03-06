import React from 'react';
import { GlitchText } from '../ui/GlitchText';
import { MOKHLES_DATA } from '../../constants';

export const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 pointer-events-none flex justify-center">
            <div className="w-full max-w-5xl flex justify-between items-center relative glass rounded-sm px-8 py-4 md:px-10 md:py-5 bg-ink/80 border border-white/10 shadow-[0_0_30px_rgba(0,255,0,0.05)] overflow-hidden">
                {/* Subtle glowing animated background effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-neon/0 via-neon/5 to-neon/0 opacity-50 pointer-events-none animate-pulse" />

                {/* Left side links */}
                <div className="flex gap-6 md:gap-8 pointer-events-auto z-10">
                    <a
                        href="https://medium.com/@emokhles"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] md:text-[12px] text-white uppercase tracking-widest hover:text-neon transition-colors"
                    >
                        <GlitchText text="ARTICLES" />
                    </a>
                    <a
                        href="https://github.com/M0xoo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] md:text-[12px] text-white uppercase tracking-widest hover:text-neon transition-colors"
                    >
                        <GlitchText text="GITHUB" />
                    </a>
                </div>

                {/* Center Icon */}
                <div className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <img src="/favicon.png" alt="Icon" className="w-8 h-8 md:w-10 md:h-10 opacity-80 hover:opacity-100 filter hover:drop-shadow-[0_0_8px_rgba(0,255,0,0.8)] transition-all duration-300" />
                </div>

                {/* Right side links */}
                <div className="flex gap-6 md:gap-8 pointer-events-auto z-10">
                    <a
                        href={MOKHLES_DATA.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] md:text-[12px] text-white uppercase tracking-widest hover:text-neon transition-colors"
                    >
                        <GlitchText text="LINKEDIN" />
                    </a>
                    <a
                        href="https://calendly.com/moelheni/taking-contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] md:text-[12px] text-white uppercase tracking-widest hover:text-neon transition-colors"
                    >
                        <GlitchText text="TAKE CONTACT" />
                    </a>
                </div>
            </div>
        </header>
    );
};
