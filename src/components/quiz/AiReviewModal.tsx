'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Loader2 } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
  loading: boolean
  response: string
}

export default function AiReviewModal({ isOpen, onClose, loading, response }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-zinc-900 border border-purple-500/30 w-full max-w-2xl max-h-[80vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-purple-900/20 to-transparent">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Bot className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">AI Quick Review</h3>
                            <p className="text-xs text-purple-300">Unofficial feedback powered by Groq</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-5 h-5 text-zinc-400" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 space-y-4">
                            <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
                            <p className="text-zinc-400 animate-pulse">AI lagi baca jawaban kamu...</p>
                        </div>
                    ) : (
                        <div className="prose prose-invert prose-sm max-w-none">
                            <div className="bg-purple-500/5 border border-purple-500/10 p-4 rounded-xl mb-4">
                                <p className="text-xs text-purple-400/80 italic">
                                    Disclaimer: Ini adalah estimasi instan dari AI.
                                </p>
                            </div>
                            <p className="whitespace-pre-wrap text-zinc-200 leading-relaxed text-base">
                                {response}
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}