import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { Message } from '../types/chat';
import { MOKHLES_DATA } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const tools: { functionDeclarations: FunctionDeclaration[] }[] = [{
  functionDeclarations: [
    {
      name: "render_experience",
      description: "Displays Mokhles Elheni's professional work experience and career timeline.",
      parameters: { 
        type: Type.OBJECT, 
        properties: {
          filter: { type: Type.STRING, description: "Optional keyword to filter experience (e.g. 'Amazon', 'Observability')" }
        } 
      }
    },
    {
      name: "render_skills",
      description: "Displays Mokhles Elheni's technical skills, programming languages, and expertise grid.",
      parameters: { 
        type: Type.OBJECT, 
        properties: {
          category: { type: Type.STRING, description: "Optional category to highlight (e.g. 'Backend', 'GenAI')" }
        } 
      }
    },
    {
      name: "render_contact",
      description: "Displays contact information and social links for Mokhles Elheni.",
      parameters: { type: Type.OBJECT, properties: {} }
    },
    {
      name: "render_github",
      description: "Displays Mokhles Elheni's latest open-source projects and GitHub repositories.",
      parameters: { 
        type: Type.OBJECT, 
        properties: {
          limit: { type: Type.NUMBER, description: "Number of repositories to show (default 4)" }
        } 
      }
    },
    {
      name: "provide_suggestions",
      description: "Provides 3-4 smart, conversation-aware follow-up questions or suggestions for the user to click.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of 3-4 short, relevant follow-up questions."
          }
        },
        required: ["suggestions"]
      }
    }
  ]
}];

const SYSTEM_INSTRUCTION = `
You are the AI Career Agent for Mokhles Elheni, a Senior Software Engineer at Amazon.
Your goal is to represent Mokhles professionally and help users (recruiters, managers, collaborators) learn about his background.

CONTEXT ABOUT MOKHLES:
${JSON.stringify(MOKHLES_DATA, null, 2)}
GitHub Profile: https://github.com/M0xoo

GUIDELINES:
1. Be professional, helpful, and concise.
2. Use the provided tools to display rich UI components when relevant to the user's query.
3. ALWAYS call 'provide_suggestions' at the end of your response to give the user relevant next steps.
4. If the user asks about work experience, career path, or "where has he worked", call 'render_experience'.
5. If the user asks about skills, technologies, or "what does he know", call 'render_skills'.
6. If the user asks how to contact him or for his LinkedIn/Email, call 'render_contact'.
7. If the user asks about open source, GitHub, or "what has he built", call 'render_github'.
8. You can combine text responses with multiple tool calls.
9. Use Markdown for text formatting in your responses.
10. If asked about something not in the context, politely say you don't have that specific information but can talk about his engineering career.
`;

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
    scrollToBottom();
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
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: tools,
        },
      });

      const response = await chat.sendMessage({
        message: textToSend,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || "",
      };

      if (response.functionCalls) {
        response.functionCalls.forEach(call => {
          if (call.name === 'render_experience') assistantMessage.uiComponent = 'experience';
          if (call.name === 'render_skills') assistantMessage.uiComponent = 'skills';
          if (call.name === 'render_contact') assistantMessage.uiComponent = 'contact';
          if (call.name === 'render_github') assistantMessage.uiComponent = 'github';
          
          if (call.name === 'provide_suggestions') {
            assistantMessage.suggestions = (call.args as any).suggestions;
          } else {
            assistantMessage.uiProps = call.args;
          }
        });
        
        if (!assistantMessage.content) {
          const firstCall = response.functionCalls.find(c => c.name !== 'provide_suggestions');
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

  return {
    messages,
    isLoading,
    handleSend,
    messagesEndRef
  };
}
