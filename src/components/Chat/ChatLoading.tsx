import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const ChatLoading: React.FC = () => {
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
        {/* The Cyberpunk thinking effect on the agent icon */}
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
          <img src="/favicon.png" alt="AI Thinking" className="w-full h-full object-contain" />
        </motion.div>

        {/* Scanline overlay for that extra debugging/hacker feel */}
        <motion.div
          animate={{
            top: ['-10%', '110%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-0 w-full h-[2px] bg-neon/80 z-20 pointer-events-none shadow-[0_0_8px_#00FF00]"
        />

        {/* Background static/noise */}
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 0.2, repeat: Infinity }}
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC41IiBwb2ludGVyLWV2ZW50cz0ibm9uZSIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] mix-blend-overlay z-0"
        />
      </div>
    </motion.div>
  );
};
