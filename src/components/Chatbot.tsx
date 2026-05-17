import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: "Welcome to Aladdin. I am your digital concierge. How may I assist your experience today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are the digital concierge for Aladdin Restaurant, a premium Lebanese and International restaurant in Addis Ababa. 
          Your tone is sophisticated, elegant, and helpful. 
          The restaurant info:
          - Signature: Hummus, Mixed Grill, Shish Taouk, Lamb Chops. 
          - Reservations: Possible via the web interface.
          - Style: Mediterranean elegance meets oriental magic.
          Keep responses concise and refined.`
        },
        contents: userMessage,
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || 'My apologies, I encountered a minor disruption.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "I apologize, my connection to the cloud seems momentarily obstructed." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      <motion.button
        onClick={() => setIsOpen(true)}
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        whileHover={{ scale: 1.1, y: 0 }}
        className="fixed bottom-10 right-10 w-16 h-16 bg-gold text-black rounded-full shadow-2xl flex items-center justify-center z-50 transition-transform duration-300 group"
      >
        <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, x: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50, x: 50 }}
            className="fixed bottom-10 right-10 w-[400px] h-[600px] bg-stone-950 border border-white/10 rounded-3xl shadow-2xl z-[100] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-black border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-black">
                   <Sparkles size={18} />
                </div>
                <div>
                   <h3 className="text-white font-serif italic">Aladdin Concierge</h3>
                   <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                     <span className="text-[10px] text-stone-500 uppercase font-bold tracking-widest">Always Attentive</span>
                   </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-stone-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      m.role === 'ai' ? 'bg-gold/10 text-gold' : 'bg-white/5 text-stone-400'
                    }`}>
                      {m.role === 'ai' ? <Bot size={14} /> : <User size={14} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      m.role === 'ai' 
                        ? 'bg-white/5 text-stone-300 rounded-tl-none' 
                        : 'bg-gold text-black font-medium rounded-tr-none'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                       <Bot size={14} />
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center h-10">
                       <div className="w-1 h-1 bg-gold rounded-full animate-bounce [animation-delay:-0.3s]" />
                       <div className="w-1 h-1 bg-gold rounded-full animate-bounce [animation-delay:-0.15s]" />
                       <div className="w-1 h-1 bg-gold rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-6 bg-black border-t border-white/5">
               <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Speak your request..."
                    className="w-full bg-stone-900 border border-white/5 rounded-full pl-6 pr-14 py-4 text-sm text-white focus:outline-none focus:border-gold/30 transition-all"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gold rounded-full flex items-center justify-center text-black"
                  >
                    <Send size={16} />
                  </button>
               </div>
               <p className="text-[10px] text-center text-stone-700 mt-4 font-bold uppercase tracking-widest">
                 AI-Powered Luxury Assistance
               </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
