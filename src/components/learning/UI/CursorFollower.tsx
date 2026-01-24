'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 40, stiffness: 300, mass: 0.8 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const mouseDown = () => setIsClicking(true)
    const mouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', mouseDown)
    window.addEventListener('mouseup', mouseUp)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', mouseDown)
      window.removeEventListener('mouseup', mouseUp)
    }
  }, [cursorX, cursorY, isVisible])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <div className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {}
      <motion.div
        style={{ 
          x: cursorX, 
          y: cursorY,
        }}
        className="fixed top-0 left-0 w-3 h-3 bg-[#f6c177] rounded-none -translate-x-1/2 -translate-y-1/2 mix-blend-normal border border-black shadow-sm"
      />

      {}
      <motion.div
        style={{ 
          x: springX, 
          y: springY,
        }}
        animate={{
            scale: isClicking ? 0.8 : 1, 
            rotate: isClicking ? 90 : 0, 
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-[#ebbcba] border-dashed rounded-none -translate-x-1/2 -translate-y-1/2 opacity-60"
      >
        {}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-white"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-white"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white"></div>
      </motion.div>

      {}
      <motion.div
        style={{ x: springX, y: springY }}
        className="fixed top-0 left-0 ml-8 mt-4 text-[8px] font-mono text-[#908caa] font-bold tracking-widest hidden md:block"
      >
        TARGET_LOCKED
      </motion.div>

    </div>
  )
}