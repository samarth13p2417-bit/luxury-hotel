"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, User, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  sender: "bot" | "user";
  text: string;
}

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Welcome, guest. I am your Aurum Concierge. How may I orchestrate your luxury stay today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const quickPrompts = [
    { label: "Book Private Yacht", text: "I would like to book a private yacht transfer." },
    { label: "Reserve Spa Massage", text: "Reserve a signature hot stone massage." },
    { label: "Chef's Table Tonight", text: "Is Table No. 9 available at the Chef's Table tonight?" },
  ];

  const getButlerResponse = (text: string): string => {
    const query = text.toLowerCase();
    if (query.includes("yacht") || query.includes("boat")) {
      return "An exceptional choice, guest. I have reserved our 85-foot custom yacht, 'The Golden Sovereign', for your transfer. A chilled bottle of Dom Pérignon will be waiting on board at your preferred departure time. Shall I schedule the boarding for 10:00 AM tomorrow?";
    }
    if (query.includes("spa") || query.includes("massage") || query.includes("treatment")) {
      return "Of course. I have scheduled our Signature Hot Stone Therapy for you in the Steam Suite at 3:00 PM tomorrow. Our master therapist has been notified of your preference for organic jasmine oils and complete privacy.";
    }
    if (query.includes("chef") || query.includes("dine") || query.includes("table") || query.includes("restaurant")) {
      return "Certainly. Our Chef de Cuisine has allocated Table No. 9 overlooking the sunset reef for you tonight at 8:00 PM. A customized 9-course tasting menu paired with rare vintages has been prepared. Your dietary profiles have been applied.";
    }
    if (query.includes("helicopter") || query.includes("heli") || query.includes("fly")) {
      return "The helipad is prepared. Your private Airbus helicopter departure is scheduled for 9:30 AM tomorrow. Your mountain guides are fully briefed and your bespoke winter gear is waiting on board.";
    }
    if (query.includes("room") || query.includes("suite") || query.includes("booking")) {
      return "Your Oceanfront Sanctuary Suite is fully prepared. The smart lighting is preset to 'Sunset Glow', the temperature is configured to a refreshing 21°C, and your private butler has arrived to receive you.";
    }
    return "Indeed, guest. I am coordinating that request directly with our Guest Relations director. It shall be arranged precisely to your standards. Would you like me to notify you via SMS when it is fully finalized?";
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate Butler typing
    setTimeout(() => {
      setIsTyping(false);
      const reply = getButlerResponse(text);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 1800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Concierge Floating Trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => {
              setIsOpen(true);
              setShowBadge(false);
            }}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gold-champagne text-[#0A0A0A] shadow-[0_8px_30px_rgba(200,169,106,0.4)] border border-gold-accent hover:bg-gold-accent transition-all duration-300 group hover:scale-105"
            aria-label="Contact Concierge"
          >
            <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
            <Sparkles className="absolute -top-1 -left-1 w-4.5 h-4.5 text-gold-accent animate-pulse" />
            {showBadge && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-[90vw] sm:w-[400px] h-[550px] rounded-2xl glass-gold-panel shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gold-champagne/20 flex items-center justify-between bg-gold-champagne/[0.03]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gold-champagne/10 flex items-center justify-center border border-gold-champagne/30">
                  <Sparkles className="w-5 h-5 text-gold-champagne animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif text-sm tracking-[0.15em] text-gold-champagne font-semibold uppercase">
                    Aurum Concierge
                  </h3>
                  <span className="text-[10px] text-white/50 tracking-wider flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                    7-Star Elite Butler
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-gold-champagne p-1 rounded-full hover:bg-white/5 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-black/30"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%]`}>
                    {msg.sender === "bot" && (
                      <div className="w-7 h-7 rounded-full bg-gold-champagne/5 border border-gold-champagne/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-gold-champagne text-[10px]">
                        A
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-gold-champagne text-[#0A0A0A] rounded-tr-none font-medium"
                          : "bg-white/5 border border-white/5 text-white/80 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <div className="w-7 h-7 rounded-full bg-gold-champagne/5 border border-gold-champagne/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-gold-champagne text-[10px]">
                      A
                    </div>
                    <div className="rounded-2xl rounded-tl-none px-4 py-3 bg-white/5 border border-white/5 flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-champagne/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-champagne/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-champagne/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick suggestions */}
            {messages.length === 1 && !isTyping && (
              <div className="p-3 bg-black/40 border-t border-white/5 flex flex-wrap gap-2 justify-center">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt.label}
                    onClick={() => handleSendMessage(prompt.text)}
                    className="text-[10px] text-gold-champagne bg-gold-champagne/5 border border-gold-champagne/20 rounded-full px-3 py-1.5 hover:bg-gold-champagne hover:text-[#0A0A0A] transition-all duration-300"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 bg-black/50 border-t border-white/5 flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                placeholder="Request yacht transfer, spa booking..."
                className="flex-1 bg-white/5 border border-white/5 focus:border-gold-champagne/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none transition-all"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                className="w-10 h-10 rounded-xl bg-gold-champagne hover:bg-gold-accent text-[#0A0A0A] flex items-center justify-center transition-colors flex-shrink-0 shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
