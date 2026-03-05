import React, { useState } from 'react';
import { Send, Terminal } from 'lucide-react';

interface ChatInputProps {
  onSend: (input: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput('');
  };

  return (
    <footer className="fixed bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 w-[92%] md:w-[90%] max-w-3xl z-20">
      <div className="relative group">
        <div className="absolute inset-0 bg-neon/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-full pl-4 md:pl-8 pr-2 md:pr-4 shadow-2xl h-14 md:h-20">
          <Terminal size={20} className="text-neon mr-3 md:mr-4 flex-shrink-0" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="ASK_ANYTHING..."
            className="flex-1 h-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-white font-mono text-lg md:text-2xl placeholder:text-zinc-700"
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            className="ml-2 md:ml-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-neon text-black flex items-center justify-center hover:scale-110 active:scale-90 transition-all disabled:opacity-30 flex-shrink-0"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};
