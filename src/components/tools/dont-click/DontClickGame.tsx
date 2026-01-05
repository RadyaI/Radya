"use client";

import ButtonCore from "./ButtonCore";
import ChaosLayer from "./ChaosLayer";
import MessageOverlay from "./MessageOverlay";
import SpiderJumpScare from "./SpiderJumpScare";
import { useDontClickLogic } from "./useDontClickLogic";

export default function DontClickGame() {
  const {
    clickCount,
    chaosLevel,
    message,
    registerClick,
    isCrashed,
    showJumpScare,
    setShowJumpScare,
  } = useDontClickLogic();

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black via-[#0B0F1A] to-black opacity-90" />

      <ChaosLayer chaosLevel={chaosLevel} isCrashed={isCrashed} />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <h2 className="select-none text-sm uppercase tracking-[0.3em] text-gray-400">
          Experimental Interaction
        </h2>

        <ButtonCore
          clickCount={clickCount}
          chaosLevel={chaosLevel}
          onClick={registerClick}
          disabled={isCrashed}
        />

        <span className="text-xs text-gray-500">
          Clicks: {clickCount}
        </span>
      </div>

      <MessageOverlay message={message} chaosLevel={chaosLevel} />

      <SpiderJumpScare
        active={showJumpScare}
        onComplete={() => setShowJumpScare(false)}
      />

      <footer className="pointer-events-none absolute bottom-6 w-full text-center text-xs text-gray-500">
        You were clearly warned.
      </footer>

    </section>
  );
}
