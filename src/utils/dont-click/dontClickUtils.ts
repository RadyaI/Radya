
export const MAX_CLICKS_BEFORE_CRASH = 50;

const CHAOS_THRESHOLDS = {
  calm: 0,       
  suspicious: 4,
  unstable: 11, 
  chaos: 26,    
  crash: 50,   
} as const;

export type ChaosLevel =
  | "calm"
  | "suspicious"
  | "unstable"
  | "chaos"
  | "crash";


const MESSAGES: Record<ChaosLevel, string[]> = {
  calm: [
    "Nothing happened.",
    "Why are you hovering?",
    "You were told not to click.",
  ],
  suspicious: [
    "Okay… that's enough.",
    "You're testing your luck.",
    "Curiosity is dangerous.",
  ],
  unstable: [
    "This is getting uncomfortable.",
    "Do you enjoy this?",
    "Something feels off.",
    "Please stop.",
  ],
  chaos: [
    "SYSTEM INSTABILITY DETECTED",
    "WHY ARE YOU STILL CLICKING?",
    "THIS WAS A MISTAKE",
    "MAKE IT STOP",
  ],
  crash: [
    "FATAL ERROR",
    "SYSTEM FAILURE",
    "GOOD JOB. YOU BROKE IT.",
  ],
};


export function getChaosLevel(clickCount: number): ChaosLevel {
  if (clickCount >= CHAOS_THRESHOLDS.crash) return "crash";
  if (clickCount >= CHAOS_THRESHOLDS.chaos) return "chaos";
  if (clickCount >= CHAOS_THRESHOLDS.unstable) return "unstable";
  if (clickCount >= CHAOS_THRESHOLDS.suspicious) return "suspicious";
  return "calm";
}

export function getRandomMessage(clickCount: number): string {
  const level = getChaosLevel(clickCount);
  const pool = MESSAGES[level];
  return pool[Math.floor(Math.random() * pool.length)];
}
