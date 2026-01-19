'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { Siren, Heart, Zap, Clock } from 'lucide-react';

interface ZombieHUDProps {
  gameState: string;
  hp: number;
  energy: number;
  score: number;
  onStart: () => void;
  hasGPS: boolean;
}

export default function ZombieHUD({ gameState, hp, energy, score, onStart, hasGPS }: ZombieHUDProps) {
  return (
    <>
      {gameState === 'PLAYING' && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4 flex flex-col gap-2 pointer-events-none">
            
            <div className="flex items-center gap-2">
                <Heart className="text-red-500 fill-red-500" size={24} />
                <div className="flex-1 h-4 bg-black/50 rounded-full overflow-hidden border border-red-900/50 backdrop-blur-sm">
                    <motion.div 
                        initial={{ width: "100%" }}
                        animate={{ width: `${(hp / 3) * 100}%` }}
                        className="h-full bg-red-600"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Zap className={energy < 30 ? "text-zinc-500" : "text-yellow-400 fill-yellow-400"} size={24} />
                <div className="flex-1 h-3 bg-black/50 rounded-full overflow-hidden border border-yellow-900/50 backdrop-blur-sm">
                    <motion.div 
                        initial={{ width: "100%" }}
                        animate={{ width: `${energy}%` }}
                        className={`h-full transition-colors ${energy < 30 ? 'bg-red-500' : 'bg-yellow-400'}`}
                    />
                </div>
            </div>
            
            {energy < 30 && (
                <p className="text-red-500 text-center font-black text-xs animate-pulse bg-black/50 rounded px-2">
                    RECHARGING STAMINA...
                </p>
            )}

            <div className="absolute top-14 right-4 bg-zinc-900/80 px-3 py-1 rounded-lg border border-zinc-700 flex items-center gap-2">
                <Clock size={16} className="text-white"/>
                <span className="text-white font-mono font-bold">{score}s</span>
            </div>
        </div>
      )}

      {gameState === 'IDLE' && hasGPS && (
        <div className="absolute bottom-10 left-0 w-full z-30 flex justify-center pointer-events-auto">
            <button onClick={onStart} className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-4 rounded-full text-xl shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all hover:scale-105 active:scale-95 flex items-center gap-3 animate-bounce">
                <Siren size={24}/> SURVIVE THE HORDE
            </button>
        </div>
      )}

      <AnimatePresence>
        {gameState === 'GAMEOVER' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 flex items-center justify-center bg-red-900/90 pointer-events-auto">
                <div className="text-center p-8 bg-black/80 rounded-3xl border-2 border-red-500 shadow-2xl">
                    <h2 className="text-6xl font-black text-white italic mb-2">YOU DIED</h2>
                    <p className="text-red-400 mb-6 font-mono">SURVIVED FOR: {score} SECONDS</p>
                    <button onClick={onStart} className="bg-white text-black font-black py-3 px-8 rounded-xl hover:scale-105 transition-transform">
                        TRY AGAIN
                    </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}