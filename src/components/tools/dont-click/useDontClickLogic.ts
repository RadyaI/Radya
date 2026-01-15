"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getChaosLevel,
  getRandomMessage,
  MAX_CLICKS_BEFORE_CRASH,
} from "@/lib/dont-click/dontClickUtils";

export function useDontClickLogic() {
  const [clickCount, setClickCount] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [isCrashed, setIsCrashed] = useState(false);
  const [showJumpScare, setShowJumpScare] = useState(false);

  const chaosLevel = getChaosLevel(clickCount);

  const registerClick = useCallback(() => {
    setClickCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (clickCount === 0) return;

    if (clickCount === 51) {
      setShowJumpScare(true);
      setMessage(null);
      return; 
    }

    setMessage(getRandomMessage(clickCount));

    if (clickCount >= MAX_CLICKS_BEFORE_CRASH) {
      setIsCrashed(true);

      const timer = setTimeout(() => {
        setIsCrashed(false);
        setMessage("Just kidding. You're still here.");
      }, 2000);

      return () => clearTimeout(timer);
    }

  }, [clickCount]);


  return {
    clickCount,
    chaosLevel,
    message,
    registerClick,
    isCrashed,
    showJumpScare,
    setShowJumpScare,
  };

}
