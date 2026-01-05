"use client";

import { motion } from "framer-motion";
import { ChaosLevel } from "@/lib/dontClickUtils";

interface ButtonCoreProps {
  clickCount: number;
  chaosLevel: ChaosLevel;
  onClick: () => void;
  disabled?: boolean;
}

export default function ButtonCore({
  clickCount,
  chaosLevel,
  onClick,
  disabled = false,
}: ButtonCoreProps) {
  const getMotionProps = () => {
    switch (chaosLevel) {
      case "suspicious":
        return {
          whileHover: { scale: 1.05 },
        };
      case "unstable":
        return {
          animate: {
            rotate: [-1, 1, -1],
          },
          transition: {
            repeat: Infinity,
            duration: 0.2,
          },
        };
      case "chaos":
        return {
          animate: {
            x: [-4, 4, -4, 4, 0],
            y: [-2, 2, -2, 2, 0],
            rotate: [-2, 2, -2],
          },
          transition: {
            repeat: Infinity,
            duration: 0.15,
          },
        };
      case "crash":
        return {
          animate: {
            scale: [1, 1.2, 0.8],
            opacity: [1, 0.5, 1],
          },
          transition: {
            repeat: Infinity,
            duration: 0.1,
          },
        };
      default:
        return {
          whileHover: { scale: 1.02 },
        };
    }
  };

  return (
    <motion.button
      {...getMotionProps()}
      disabled={disabled}
      onClick={onClick}
      className={`
        relative select-none rounded-2xl px-10 py-6 text-lg font-semibold
        transition-colors duration-300
        ${
          chaosLevel === "calm"
            ? "bg-white text-black hover:bg-gray-200"
            : "bg-red-600 text-white"
        }
        ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
        shadow-xl
      `}
    >
      <span className="relative z-10 tracking-wide">
        DO NOT CLICK
      </span>

      {chaosLevel !== "calm" && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-2xl bg-red-500 blur-xl opacity-40"
        />
      )}

      {clickCount > 10 && (
        <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-red-400">
          still clicking?
        </span>
      )}
    </motion.button>
  );
}
