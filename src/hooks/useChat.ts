import { useState, useRef, useEffect } from 'react';
import { Message } from '../types/chat';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "SYSTEM INITIALIZED. I am the AI Career Agent for Mokhles Elheni. Senior Software Engineer @ Amazon. Specialized in high-scale platforms and GenAI. \n\nHow can I assist your inquiry today?",
      suggestions: [
        "What is his experience at Amazon?",
        "Show me his technical skills",
        "What open-source projects has he built?",
        "How can I contact him?"
      ]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Only scroll if a new message was added (more than the initial greeting)
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSend = async (input: string, overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      if (!resp.ok) {
        throw new Error("Failed to fetch chat response");
      }

      const response = await resp.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || "",
      };

      if (response.functionCalls && Array.isArray(response.functionCalls)) {
        response.functionCalls.forEach((call: any) => {
          if (call.name === 'render_experience') assistantMessage.uiComponent = 'experience';
          if (call.name === 'render_skills') assistantMessage.uiComponent = 'skills';
          if (call.name === 'render_contact') assistantMessage.uiComponent = 'contact';
          if (call.name === 'render_github') assistantMessage.uiComponent = 'github';

          if (call.name === 'provide_suggestions') {
            assistantMessage.suggestions = call.args?.suggestions;
          } else {
            assistantMessage.uiProps = call.args;
          }
        });

        if (!assistantMessage.content) {
          const firstCall = response.functionCalls.find((c: any) => c.name !== 'provide_suggestions');
          if (firstCall) {
            if (firstCall.name === 'render_experience') assistantMessage.content = "Here is a detailed look at my professional journey:";
            if (firstCall.name === 'render_skills') assistantMessage.content = "I've built a diverse technical stack over the years:";
            if (firstCall.name === 'render_contact') assistantMessage.content = "You can reach out to me through these channels:";
            if (firstCall.name === 'render_github') assistantMessage.content = "Here are some of my latest open-source contributions:";
          }
        }
      }

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "FATAL ERROR: NEURAL_LINK_INTERRUPTED. Please retry initialization.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    handleSend,
    messagesEndRef
  };
}
