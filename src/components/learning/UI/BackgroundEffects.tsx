'use client'

import { motion } from 'framer-motion'

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      
      <div 
        className="absolute inset-0 opacity-[0.2]" 
        style={{
          backgroundImage: `radial-gradient(#333 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
      
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[100px] opacity-40"
      />

      <motion.div
        animate={{ x: [0, -30, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] opacity-30"
      />

    </div>
  )
}