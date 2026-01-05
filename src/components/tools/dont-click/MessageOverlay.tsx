"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChaosLevel } from "@/lib/dont-click/dontClickUtils";

interface MessageOverlayProps {
  message: string | null;
  chaosLevel: ChaosLevel;
}

export default function MessageOverlay({
  message,
  chaosLevel,
}: MessageOverlayProps) {
  if (!message || chaosLevel === "calm") return null;

  return (
    <AnimatePresence>
      <motion.div
        key={message}
        aria-hidden
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={getAnimateProps(chaosLevel)}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{
          duration: chaosLevel === "chaos" ? 0.15 : 0.3,
        }}
        className={`
          pointer-events-none absolute inset-x-0 top-24 z-20
          flex justify-center px-4
        `}
      >
        <div
          className={`
            rounded-xl px-6 py-3 text-center text-sm font-semibold tracking-wide
            ${
              chaosLevel === "unstable"
                ? "bg-white/10 text-white"
                : "bg-red-700/80 text-white"
            }
            backdrop-blur-md shadow-2xl
          `}
        >
          {message}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function getAnimateProps(level: ChaosLevel) {
  switch (level) {
    case "unstable":
      return {
        opacity: 1,
        y: [0, -4, 0],
      };
    case "chaos":
      return {
        opacity: [1, 0.6, 1],
        scale: [1, 1.05, 1],
        rotate: [-1, 1, -1],
      };
    case "crash":
      return {
        opacity: [1, 0.3, 1],
        scale: [1, 1.1, 0.9],
        rotate: [-2, 2, -2],
      };
    default:
      return { opacity: 1 };
  }
}
