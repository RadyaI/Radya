"use client";

import { motion } from "framer-motion";
import { ChaosLevel } from "@/lib/dontClickUtils";

interface ChaosLayerProps {
  chaosLevel: ChaosLevel;
  isCrashed: boolean;
}

export default function ChaosLayer({
  chaosLevel,
  isCrashed,
}: ChaosLayerProps) {
  if (chaosLevel === "calm") return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        animate={getShakeAnimation(chaosLevel, isCrashed)}
        transition={getShakeTransition(chaosLevel, isCrashed)}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        animate={getFlashAnimation(chaosLevel, isCrashed)}
        transition={getFlashTransition(chaosLevel, isCrashed)}
        style={{
          background:
            chaosLevel === "chaos" || chaosLevel === "crash"
              ? "linear-gradient(120deg, rgba(255,0,0,0.15), rgba(255,255,255,0.05))"
              : "rgba(255,255,255,0.03)",
        }}
      />
    </>
  );
}

function getShakeAnimation(level: ChaosLevel, crashed: boolean) {
  if (crashed) {
    return {
      x: [-20, 20, -20, 20, 0],
      y: [-10, 10, -10, 10, 0],
    };
  }

  switch (level) {
    case "unstable":
      return {
        x: [-2, 2, -2, 2, 0],
      };
    case "chaos":
      return {
        x: [-6, 6, -6, 6, 0],
        y: [-3, 3, -3, 3, 0],
      };
    case "crash":
      return {
        x: [-12, 12, -12, 12, 0],
        y: [-6, 6, -6, 6, 0],
      };
    default:
      return {};
  }
}

function getShakeTransition(level: ChaosLevel, crashed: boolean) {
  if (crashed) {
    return {
      duration: 0.2,
      repeat: Infinity,
    };
  }

  return {
    duration: level === "unstable" ? 0.4 : 0.2,
    repeat: Infinity,
  };
}

function getFlashAnimation(level: ChaosLevel, crashed: boolean) {
  if (crashed) {
    return {
      opacity: [0.1, 0.6, 0.1],
    };
  }

  switch (level) {
    case "unstable":
      return { opacity: [0.05, 0.1, 0.05] };
    case "chaos":
      return { opacity: [0.1, 0.3, 0.1] };
    case "crash":
      return { opacity: [0.2, 0.6, 0.2] };
    default:
      return {};
  }
}

function getFlashTransition(level: ChaosLevel, crashed: boolean) {
  return {
    duration: crashed ? 0.1 : level === "unstable" ? 0.6 : 0.3,
    repeat: Infinity,
  };
}
