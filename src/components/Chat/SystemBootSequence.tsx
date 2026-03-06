import React from 'react';
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

export const SystemBootSequence: React.FC = () => {
    const glitchAnimation = {
        x: [0, -2, 2, -1, 1, 0],
        y: [0, 1, -1, 2, -2, 0],
        opacity: [1, 0.8, 1, 0.5, 1],
        filter: [
            'hue-rotate(0deg) contrast(1)',
            'hue-rotate(90deg) contrast(2) brightness(1.5)',
            'hue-rotate(0deg) contrast(1)',
            'hue-rotate(-90deg) contrast(1.5) brightness(1.2)',
            'hue-rotate(0deg) contrast(1)',
        ],
        scale: [1, 1.05, 0.95, 1, 1.02, 1],
        skewX: [0, -5, 5, -2, 2, 0]
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 md:gap-8 flex-row"
        >
            <div className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center relative overflow-hidden bg-white/5 rounded-sm">
                <motion.div
                    animate={glitchAnimation}
                    transition={{
                        duration: 0.3,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "linear",
                    }}
                    className="w-full h-full p-1 md:p-2 z-10 relative"
                >
                    <img src="/favicon.png" alt="System Booting" className="w-full h-full object-contain" />
                </motion.div>

                <motion.div
                    animate={{ top: ['-10%', '110%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 w-full h-[2px] bg-neon/80 z-20 pointer-events-none shadow-[0_0_8px_#00FF00]"
                />

                <motion.div
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                    className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC41IiBwb2ludGVyLWV2ZW50cz0ibm9uZSIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] mix-blend-overlay z-0"
                />
            </div>
            <div className="flex-1 p-4 md:p-8 glass border-l-4 border-neon/50">
                <div className="flex flex-col gap-2 font-mono text-xs">
                    <div className="text-neon flex items-center gap-2">
                        <Terminal size={14} /> <span>CONNECTING_TO_NEURAL_STATION...</span>
                    </div>
                    <div className="h-1 w-48 bg-white/10 overflow-hidden rounded relative mt-2 mb-2">
                        <div className="absolute inset-y-0 left-0 bg-neon loading-bar"></div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                        className="text-zinc-500"
                    >
                        &gt; ESTABLISHING_SECURE_LINK [OK]
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
                        className="text-zinc-500"
                    >
                        &gt; LOADING_PERSONA_DATA [OK]
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
                        className="text-neon animate-pulse mt-1"
                    >
                        &gt; WAKING_AGENT...
                    </motion.div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        .loading-bar { animation: load 2.5s ease-in-out forwards; }
        @keyframes load { 0% { width: 0%; } 100% { width: 100%; } }
      `}} />
        </motion.div>
    );
};
