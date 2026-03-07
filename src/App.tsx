import React, { useRef, useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { useChat } from './hooks/useChat';
import { ChatMessage } from './components/Chat/ChatMessage';
import { ChatInput } from './components/Chat/ChatInput';
import { ChatLoading } from './components/Chat/ChatLoading';
import { SystemBootSequence } from './components/Chat/SystemBootSequence';
import { Header } from './components/Layout/Header';
import { Hero } from './components/Layout/Hero';

import { PortfolioSection } from './components/Layout/PortfolioSection';

export default function App() {
  const aiSectionRef = useRef<HTMLDivElement>(null);
  const [hasScrolledToAI, setHasScrolledToAI] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasScrolledToAI(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // trigger when 10% visible
    );

    if (aiSectionRef.current) {
      observer.observe(aiSectionRef.current);
    }

    return () => {
      if (aiSectionRef.current) observer.unobserve(aiSectionRef.current);
      observer.disconnect();
    };
  }, []);

  const { messages, isLoading, isBooting, handleSend, messagesEndRef } = useChat(hasScrolledToAI);

  return (
    <div className="flex flex-col h-screen bg-ink relative overflow-hidden selection:bg-neon selection:text-black">
      {/* Grainy Overlay */}
      <div className="absolute inset-0 grainy-bg z-50 pointer-events-none" />

      {/* Atmospheric Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Floating Shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none floating-shape">
        <div className="w-full h-full rounded-full border border-white/20 flex items-center justify-center">
          <div className="w-[80%] h-[80%] rounded-full border border-white/10 flex items-center justify-center">
            <div className="w-[60%] h-[60%] rounded-full border border-neon/20" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <Header />
      <main id="main-scroll-container" className="flex-1 overflow-y-auto pt-24 pb-6 px-6 md:p-12 z-10 custom-scrollbar relative">


        <div className="max-w-5xl mx-auto space-y-8 md:space-y-16">
          <Hero />
          <PortfolioSection />

          {/* Chat Messages */}
          <div ref={aiSectionRef} className="space-y-12 pb-32 min-h-[50vh]">
            <AnimatePresence initial={false}>
              {isBooting ? (
                hasScrolledToAI && <SystemBootSequence />
              ) : (
                messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    onSuggestionClick={(suggestion) => handleSend('', suggestion)}
                  />
                ))
              )}
            </AnimatePresence>

            {isLoading && <ChatLoading />}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      <ChatInput onSend={(input) => handleSend(input)} isLoading={isLoading || isBooting} />

      <style dangerouslySetInnerHTML={{
        __html: `
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
