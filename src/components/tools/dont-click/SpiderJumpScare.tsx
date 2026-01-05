"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SpiderJumpScareProps {
  active: boolean;
  onComplete: () => void;
}

export default function SpiderJumpScare({
  active,
  onComplete,
}: SpiderJumpScareProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0.9] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onAnimationComplete={onComplete}
        >
          <motion.div
            initial={{ scale: 0.05, y: -300, rotate: -25 }}
            animate={{
              scale: [0.05, 4, 2.8],
              y: [-300, 0, 0],
              rotate: [-25, 8, -4],
            }}
            transition={{
              duration: 0.18,
              ease: "linear",
            }}
          >
            <Image
              src="/images/labalaba.png"
              alt="Spider jumpscare"
              width={700}
              height={700}
              priority
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ duration: 0.08 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
