import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Cpu } from 'lucide-react';

export const SystemBootSequence: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-8"
        >
            <div className="w-12 h-12 border border-neon/50 bg-neon/5 flex items-center justify-center text-neon relative overflow-hidden">
                <div className="absolute inset-0 bg-neon/20 animate-pulse pointer-events-none" />
                <Cpu size={24} className="animate-pulse" />
            </div>
            <div className="flex-1 p-8 glass border-l-4 border-neon/50">
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
