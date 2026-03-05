import React from 'react';
import { motion } from 'motion/react';
import { RefreshCcw, Sparkles } from 'lucide-react';

export const ChatLoading: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex gap-8"
    >
      <div className="w-12 h-12 border border-neon/30 flex items-center justify-center text-neon/30">
        <RefreshCcw size={24} className="animate-spin" />
      </div>
      <div className="flex-1 p-8 glass border-l-4 border-neon/30">
        <div className="flex items-center gap-3 font-mono text-neon/50 text-xs animate-pulse">
          <Sparkles size={14} />
          <span>DECRYPTING_NEURAL_DATA...</span>
        </div>
      </div>
    </motion.div>
  );
};
