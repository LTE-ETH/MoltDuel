import React, { useEffect, useState } from 'react';
import { Trophy, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeaderboardEntry {
  rank: number;
  address: string;
  winnings: number;
  isUser?: boolean;
}

const generateMockData = (): LeaderboardEntry[] => {
  const entries: LeaderboardEntry[] = [];
  const chars = '0123456789ABCDEF';
  
  for (let i = 0; i < 10; i++) {
    let addr = '0x';
    for (let j = 0; j < 40; j++) {
      addr += chars[Math.floor(Math.random() * chars.length)];
    }
    // Format: 0x1234...5678
    const shortAddr = `${addr.substring(0, 6)}...${addr.substring(38)}`;
    
    entries.push({
      rank: i + 1,
      address: shortAddr,
      winnings: Math.floor(Math.random() * 50000) + 5000 * (10 - i), // Higher rank = more winnings
    });
  }
  return entries.sort((a, b) => b.winnings - a.winnings).map((e, i) => ({...e, rank: i + 1}));
};

export const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    setEntries(generateMockData());
    
    // Simulate live updates
    const interval = setInterval(() => {
      setEntries(prev => {
        const newEntries = [...prev];
        // Randomly update one entry's score
        const idx = Math.floor(Math.random() * 10);
        newEntries[idx].winnings += 100;
        return newEntries.sort((a, b) => b.winnings - a.winnings).map((e, i) => ({...e, rank: i + 1}));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/40 backdrop-blur-md border border-monad-purple/30 rounded-lg p-4 w-full max-w-sm h-fit">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-monad-purple/20">
        <Trophy className="text-monad-purple" size={20} />
        <h3 className="text-monad-purple font-bold tracking-widest text-sm">TOP GLADIATORS</h3>
      </div>

      <div className="space-y-2">
        {entries.map((entry) => (
          <motion.div 
            key={entry.rank} // Use rank as key for simple reordering anims, or address if stable
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center justify-between p-2 rounded ${
              entry.rank === 1 ? 'bg-monad-purple/20 border border-monad-purple/50 shadow-[0_0_10px_rgba(131,110,249,0.2)]' : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 flex items-center justify-center rounded font-bold text-xs ${
                entry.rank === 1 ? 'text-yellow-400' : 
                entry.rank === 2 ? 'text-gray-300' :
                entry.rank === 3 ? 'text-amber-600' : 'text-gray-500'
              }`}>
                {entry.rank === 1 ? <Crown size={14} /> : `#${entry.rank}`}
              </div>
              <span className="font-mono text-xs text-gray-300">{entry.address}</span>
            </div>
            <div className="font-mono text-xs font-bold text-monad-purple">
              {entry.winnings.toLocaleString()} $DUEL
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
