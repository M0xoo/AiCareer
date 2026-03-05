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
    <footer className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl z-20">
      <div className="relative group">
        <div className="absolute inset-0 bg-neon/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-full pl-8 pr-4 shadow-2xl h-20">
          <Terminal size={24} className="text-neon mr-4 flex-shrink-0" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="ASK_ANYTHING..."
            className="flex-1 h-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-white font-mono text-2xl placeholder:text-zinc-700"
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            className="ml-4 w-12 h-12 rounded-full bg-neon text-black flex items-center justify-center hover:scale-110 active:scale-90 transition-all disabled:opacity-30 flex-shrink-0"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};
