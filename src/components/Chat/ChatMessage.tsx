import React from 'react';
import { motion } from 'motion/react';
import { User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../../types/chat';
import { cn } from '../../lib/utils';
import { ExperienceTimeline, SkillsGrid, ContactCard, GithubRepos } from '../GenerativeUI';

interface ChatMessageProps {
  message: Message;
  onSuggestionClick: (suggestion: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onSuggestionClick }) => {
  const renderContent = () => {
    return (
      <div className="space-y-6">
        {message.content && (
          <div className="prose prose-invert max-w-none text-base leading-relaxed font-sans">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
        {message.uiComponent === 'experience' && <ExperienceTimeline {...message.uiProps} />}
        {message.uiComponent === 'skills' && <SkillsGrid {...message.uiProps} />}
        {message.uiComponent === 'contact' && <ContactCard {...message.uiProps} />}
        {message.uiComponent === 'github' && <GithubRepos {...message.uiProps} />}

        {message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/5">
            {message.suggestions.map((suggestion, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSuggestionClick(suggestion)}
                className="text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 border border-zinc-800 text-zinc-500 hover:border-neon hover:text-neon transition-all duration-300"
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex gap-3 md:gap-8",
        message.role === 'user' ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div className={cn(
        "w-8 h-8 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center",
        message.role === 'assistant' ? "relative overflow-hidden bg-white/5 rounded-sm text-neon" : "text-white"
      )}>
        {message.role === 'assistant' ? (
          <div className="w-full h-full p-1 md:p-2 z-10 relative">
            <img src="/favicon.png" alt="AI" className="w-full h-full object-contain" />
          </div>
        ) : (
          <User size={18} className="w-[18px] h-[18px] md:w-6 md:h-6" />
        )}
      </div>
      <div className={cn(
        "max-w-[85%] md:max-w-3xl flex flex-col",
        message.role === 'user' ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "p-4 md:p-8 glass transition-all duration-500 w-fit",
          message.role === 'user' ? "border-r-4 border-white text-right" : "border-l-4 border-neon text-left"
        )}>
          {renderContent()}
        </div>
        <div className={cn(
          "mt-2 font-mono text-[9px] uppercase tracking-widest text-zinc-600",
          message.role === 'user' ? "text-right" : "text-left"
        )}>
          {message.role === 'assistant' ? "AGENT_RESPONSE_STREAM" : "USER_INPUT_SIGNAL"} // {new Date().toLocaleTimeString()}
        </div>
      </div>
    </motion.div>
  );
};
