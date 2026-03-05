import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Github, 
  Linkedin, 
  Mail, 
  Terminal,
  ChevronRight,
  RefreshCcw,
  ExternalLink
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { MOKHLES_DATA } from './constants';
import { ExperienceTimeline, SkillsGrid, ContactCard, GithubRepos } from './components/GenerativeUI';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'experience' | 'skills' | 'contact' | 'projects';
}

const SYSTEM_INSTRUCTION = `
You are the AI Career Agent for Mokhles Elheni, a Senior Software Engineer at Amazon.
Your goal is to represent Mokhles professionally and help users (recruiters, managers, collaborators) learn about his background.

CONTEXT ABOUT MOKHLES:
${JSON.stringify(MOKHLES_DATA, null, 2)}
GitHub Profile: https://github.com/M0xoo

GUIDELINES:
1. Be professional, helpful, and concise.
2. If the user asks about work experience, career path, or "where has he worked", respond with text and then trigger the experience component by including the exact string "[RENDER_EXPERIENCE]" in your response.
3. If the user asks about skills, technologies, or "what does he know", respond with text and trigger the skills component by including "[RENDER_SKILLS]".
4. If the user asks how to contact him or for his LinkedIn/Email, trigger "[RENDER_CONTACT]".
5. If the user asks about open source, GitHub, or "what has he built", respond with text and trigger the GitHub component by including "[RENDER_GITHUB]".
6. Use Markdown for text formatting.
7. If asked about something not in the context, politely say you don't have that specific information but can talk about his engineering career.
`;

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "SYSTEM INITIALIZED. I am the AI Career Agent for Mokhles Elheni. Senior Software Engineer @ Amazon. Specialized in high-scale platforms and GenAI. \n\nHow can I assist your inquiry today?",
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/medium-articles');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };
    fetchArticles();
  }, []);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      const response = await chat.sendMessage({
        message: input,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || "ERROR: RESPONSE_UNDEFINED",
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "FATAL ERROR: NEURAL_LINK_INTERRUPTED. Please retry initialization.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = (content: string) => {
    const parts = content.split(/(\[RENDER_EXPERIENCE\]|\[RENDER_SKILLS\]|\[RENDER_CONTACT\]|\[RENDER_GITHUB\])/);
    
    return parts.map((part, index) => {
      if (part === '[RENDER_EXPERIENCE]') return <ExperienceTimeline key={index} />;
      if (part === '[RENDER_SKILLS]') return <SkillsGrid key={index} />;
      if (part === '[RENDER_CONTACT]') return <ContactCard key={index} />;
      if (part === '[RENDER_GITHUB]') return <GithubRepos key={index} />;
      
      return (
        <div key={index} className="prose prose-invert max-w-none text-base leading-relaxed font-sans">
          <ReactMarkdown>{part}</ReactMarkdown>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-screen bg-ink relative overflow-hidden selection:bg-neon selection:text-black">
      {/* Grainy Overlay */}
      <div className="absolute inset-0 grainy-bg z-50 pointer-events-none" />
      
      {/* Atmospheric Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-white/5 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Floating Shape (Inspiration) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none floating-shape">
        <div className="w-full h-full rounded-full border border-white/20 flex items-center justify-center">
          <div className="w-[80%] h-[80%] rounded-full border border-white/10 flex items-center justify-center">
            <div className="w-[60%] h-[60%] rounded-full border border-neon/20" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 z-10 custom-scrollbar relative">
        {/* Social Icons (Scrolls with content) */}
        <div className="absolute top-12 right-12 flex items-center gap-4 z-50">
          <a href={MOKHLES_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-neon transition-colors cursor-pointer group bg-ink/50 backdrop-blur-md">
            <Linkedin size={20} className="group-hover:text-neon transition-colors" />
          </a>
          <a href={`mailto:${MOKHLES_DATA.email}`} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-neon transition-colors cursor-pointer group bg-ink/50 backdrop-blur-md">
            <Mail size={20} className="group-hover:text-neon transition-colors" />
          </a>
        </div>

        <div className="max-w-5xl mx-auto space-y-16">
          {/* Hero Section (Brutalist) */}
          <section className="py-24 border-b border-white/5">
            <div className="flex flex-col md:flex-row items-end justify-between gap-8">
              <div className="flex flex-col">
                <h2 className="font-display text-[10vw] md:text-[8vw] leading-[0.8] uppercase tracking-tighter">
                  MOKHLES <br /> ELHENI
                </h2>
                <span className="font-mono text-neon text-[3vw] md:text-[1.5vw] tracking-[0.3em] mt-6 uppercase block">
                  SOFTWARE ENGINEER
                </span>
              </div>
              <div className="max-w-sm text-right font-mono text-[12px] md:text-[14px] text-zinc-500 uppercase leading-relaxed">
                <span className="text-white block mb-2">INTRODUCTION //</span>
                Senior Software Engineer with 8+ years of experience architecting high-scale observability platforms and leveraging GenAI to optimize complex workflows at scale.
              </div>
            </div>
          </section>

          {/* Medium Articles Section */}
          {articles.length > 0 && (
            <section className="py-12 border-b border-white/5">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-neon">
                  LATEST_PUBLICATIONS // MEDIUM
                </h3>
                <a 
                  href="https://medium.com/@emokhles" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors flex items-center gap-2"
                >
                  VIEW_ALL <ExternalLink size={12} />
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.slice(0, 4).map((article, idx) => (
                  <a 
                    key={idx}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-6 glass border-l-2 border-white/10 hover:border-neon transition-all duration-500"
                  >
                    <div className="flex flex-col h-full">
                      <span className="font-mono text-[9px] text-zinc-600 mb-2 uppercase">
                        {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <h4 className="font-display text-xl uppercase tracking-tight mb-3 group-hover:text-neon transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="font-mono text-[11px] text-zinc-500 leading-relaxed line-clamp-3 mb-4">
                        {article.snippet}
                      </p>
                      <div className="mt-auto flex flex-wrap gap-2">
                        {article.categories?.slice(0, 3).map((cat: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 border border-white/5 rounded-full text-[8px] font-mono text-zinc-600 uppercase">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Chat Messages */}
          <div className="space-y-12 pb-32">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-8",
                    message.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 flex-shrink-0 flex items-center justify-center border",
                    message.role === 'assistant' ? "border-neon text-neon" : "border-white text-white"
                  )}>
                    {message.role === 'assistant' ? <Bot size={24} /> : <User size={24} />}
                  </div>
                  <div className={cn(
                    "max-w-3xl flex flex-col",
                    message.role === 'user' ? "items-end" : "items-start"
                  )}>
                    <div className={cn(
                      "p-6 md:p-8 glass transition-all duration-500 w-fit",
                      message.role === 'user' ? "border-r-4 border-white text-right" : "border-l-4 border-neon text-left"
                    )}>
                      {renderContent(message.content)}
                    </div>
                    <div className={cn(
                      "mt-2 font-mono text-[9px] uppercase tracking-widest text-zinc-600",
                      message.role === 'user' ? "text-right" : "text-left"
                    )}>
                      {message.role === 'assistant' ? "AGENT_RESPONSE_STREAM" : "USER_INPUT_SIGNAL"} // {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
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
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Input Bar (Pill Shape from Inspiration) */}
      <footer className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl z-20">
        <div className="relative group">
          <div className="absolute inset-0 bg-neon/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-full pl-8 pr-4 shadow-2xl h-20">
            <Terminal size={24} className="text-neon mr-4 flex-shrink-0" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="ASK_ANYTHING..."
              className="flex-1 h-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-white font-mono text-2xl placeholder:text-zinc-700"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="ml-4 w-12 h-12 rounded-full bg-neon text-black flex items-center justify-center hover:scale-110 active:scale-90 transition-all disabled:opacity-30 flex-shrink-0"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00FF00;
        }
      `}} />
    </div>
  );
}
