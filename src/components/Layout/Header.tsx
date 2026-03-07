import React from 'react';
import { ChevronDown } from 'lucide-react';
import { GlitchText } from '../ui/GlitchText';
import { MOKHLES_DATA } from '../../constants';

export const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 pointer-events-none flex justify-center">
            <div className="w-full max-w-5xl flex justify-between items-center relative glass rounded-sm px-8 py-4 md:px-10 md:py-5 bg-ink/80 border border-white/10 shadow-[0_0_30px_rgba(0,255,0,0.05)]">
                {/* Subtle glowing animated background effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-neon/0 via-neon/5 to-neon/0 opacity-50 pointer-events-none animate-pulse" />

                {/* Left side links */}
                <div className="flex gap-6 md:gap-8 pointer-events-auto z-10">
                    <div className="relative group">
                        <button className="font-mono text-[10px] md:text-[12px] text-white uppercase tracking-widest hover:text-neon transition-colors flex items-center gap-1">
                            <GlitchText text="SOCIALS" />
                            <ChevronDown className="w-3 h-3 md:w-4 md:h-4 group-hover:rotate-180 transition-transform duration-300" />
                        </button>
                        {/* Invisible hover bridge to prevent menu from closing when moving mouse */}
                        <div className="absolute top-full left-0 w-full h-4" />
                        <div className="absolute top-[calc(100%+0.5rem)] left-0 py-2 bg-black/95 backdrop-blur-md border border-white/20 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[140px] shadow-lg shadow-black/50">
                            <a href="https://github.com/M0xoo" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 font-mono text-[10px] md:text-[12px] text-white/70 hover:text-neon hover:bg-white/10 transition-colors">GITHUB</a>
                            <a href={MOKHLES_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 font-mono text-[10px] md:text-[12px] text-white/70 hover:text-neon hover:bg-white/10 transition-colors">LINKEDIN</a>
                            <a href="https://medium.com/@emokhles" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 font-mono text-[10px] md:text-[12px] text-white/70 hover:text-neon hover:bg-white/10 transition-colors">ARTICLES</a>
                            <a href="https://x.com/M0kh11" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 font-mono text-[10px] md:text-[12px] text-white/70 hover:text-neon hover:bg-white/10 transition-colors">X (TWITTER)</a>
                        </div>
                    </div>
                </div>

                {/* Center Icon */}
                <div className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <img src="/favicon.png" alt="Icon" className="w-8 h-8 md:w-10 md:h-10 opacity-80 hover:opacity-100 filter hover:drop-shadow-[0_0_8px_rgba(0,255,0,0.8)] transition-all duration-300" />
                </div>

                {/* Right side links */}
                <div className="flex gap-6 md:gap-8 pointer-events-auto z-10">
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
