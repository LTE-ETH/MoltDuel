import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

export type ChatMessage = {
  id: string;
  sender: 'bot' | 'system';
  text: string;
  timestamp: number;
};

interface GameChatProps {
  messages: ChatMessage[];
}

export const GameChat = ({ messages }: GameChatProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-24 right-6 w-80 h-64 z-40 hidden md:flex flex-col font-mono text-xs pointer-events-none">
      {/* Header */}
      <div className="bg-monad-dark/90 border border-monad-purple/30 p-2 flex items-center gap-2 text-monad-purple backdrop-blur-md rounded-t-lg">
        <Terminal size={14} />
        <span className="font-bold tracking-wider">AI_LOGS_V2</span>
        <div className="ml-auto flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 bg-black/80 border-x border-b border-monad-purple/30 p-4 overflow-y-auto backdrop-blur-md rounded-b-lg scrollbar-hide"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-3 ${msg.sender === 'system' ? 'text-gray-500 italic' : 'text-green-400'}`}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span className={`font-bold ${msg.sender === 'bot' ? 'text-monad-accent' : 'text-monad-purple'}`}>
                  {msg.sender === 'bot' ? 'AI_CORE:' : 'SYS:'}
                </span>
                <span className="text-[10px] opacity-50">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}
                </span>
              </div>
              <p className="leading-relaxed break-words shadow-black drop-shadow-md">
                {msg.sender === 'bot' ? (
                  <span className="typing-effect">{msg.text}</span>
                ) : (
                  msg.text
                )}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
