"use client"
import { useState, useRef, useEffect } from "react";
import { Zap, AlertTriangle, RotateCcw, Trophy } from "lucide-react";
import Tachometer from "./Tachometer";
import { getRank, tips } from "./ranks";
import Cursor from "../../cursor"

export default function ReactionRace() {
    const [gameState, setGameState] = useState("idle");
    const [startTime, setStartTime] = useState(0);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(null);
    const [rankData, setRankData] = useState(null);

    const timerRef = useRef(null);

    const handleAction = () => {
        if (gameState === "idle" || gameState === "result" || gameState === "false") {
            startRace();
        } else if (gameState === "waiting") {
            falseStart();
        } else if (gameState === "now") {
            endRace();
        }
    };

    const startRace = () => {
        setGameState("waiting");
        setScore(0);
        setRankData(null);

        const randomDelay = Math.floor(Math.random() * 3000) + 2000;

        timerRef.current = setTimeout(() => {
            setGameState("now");
            setStartTime(Date.now());
        }, randomDelay);
    };

    const falseStart = () => {
        clearTimeout(timerRef.current);
        setGameState("false");
    };

    const endRace = () => {
        const endTime = Date.now();
        const reactionTime = endTime - startTime;
        setScore(reactionTime);

        if (!bestScore || reactionTime < bestScore) {
            setBestScore(reactionTime);
        }

        setRankData(getRank(reactionTime));
        setGameState("result");
    };

    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);


    const getTheme = () => {
        switch (gameState) {
            case "idle": return "bg-[#111] border-gray-800";
            case "waiting": return "bg-[#1a1a1a] border-yellow-600/50 cursor-wait";
            case "now": return "bg-[#00ff00] border-[#00ff00] cursor-pointer";
            case "result": return "bg-[#111] border-blue-500/50";
            case "false": return "bg-red-600 border-red-900";
            default: return "bg-[#111]";
        }
    };

    return (
        <>
            <Cursor/>
            <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-black text-white font-mono select-none overflow-hidden relative">

                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asphalt-dark.png')]"></div>

                <div className="absolute top-6 w-full max-w-2xl flex justify-between px-6 z-20">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-xs tracking-widest uppercase">Reaction Test</span>
                    </div>
                    {bestScore && (
                        <div className="flex items-center gap-2 text-yellow-500 animate-pulse">
                            <Trophy className="w-4 h-4" />
                            <span className="text-xs font-bold tracking-widest">BEST: {bestScore}ms</span>
                        </div>
                    )}
                </div>

                <div
                    onMouseDown={handleAction}
                    onTouchStart={handleAction}
                    className={`
                    relative w-full max-w-3xl aspect-video md:aspect-[2/1] rounded-2xl border-4 shadow-2xl
                    flex flex-col items-center justify-center transition-all duration-100 transform
                    ${getTheme()}
                    ${gameState === 'waiting' ? 'animate-[wiggle_0.2s_ease-in-out_infinite]' : ''} 
                    ${gameState === 'now' ? 'scale-[1.02] shadow-[0_0_50px_#00ff00]' : ''}
                    hover:scale-[1.01] active:scale-[0.99]
                `}
                >
                    {gameState === "idle" && (
                        <div className="text-center space-y-4 animate-fade-in pointer-events-none">
                            <Zap className="w-16 h-16 mx-auto text-gray-600" />
                            <h2 className="text-4xl font-black uppercase tracking-tighter italic text-white">Start Engine</h2>
                            <p className="text-gray-500 text-sm tracking-widest">Click anywhere to rev up</p>
                        </div>
                    )}

                    {gameState === "waiting" && (
                        <div className="text-center pointer-events-none">
                            <div className="text-6xl font-black text-yellow-500/20 italic animate-pulse">WAIT...</div>
                            <p className="text-yellow-600/50 mt-4 text-xs font-bold uppercase tracking-[0.5em]">Don't Shift Yet</p>
                        </div>
                    )}

                    {gameState === "now" && (
                        <div className="text-center pointer-events-none">
                            <div className="text-8xl font-black text-black italic drop-shadow-xl">SHIFT!</div>
                            <div className="text-black font-bold text-xl mt-2 tracking-widest">TAP NOW!</div>
                        </div>
                    )}

                    {gameState === "false" && (
                        <div className="text-center space-y-2 pointer-events-none">
                            <AlertTriangle className="w-20 h-20 mx-auto text-white mb-4 animate-bounce" />
                            <h2 className="text-4xl font-black uppercase text-white">FALSE START!</h2>
                            <p className="text-white/80 font-bold">Stop, mundur dulu sana!!</p>
                            <div className="mt-8 px-4 py-2 bg-black/30 rounded text-sm text-white/60">Click to restart engine</div>
                        </div>
                    )}

                    {gameState === "result" && rankData && (
                        <div className="text-center z-10 pointer-events-none">
                            <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">Reaction Time</div>
                            <div className="text-7xl font-black text-white mb-2 font-mono flex items-baseline justify-center gap-2">
                                {score} <span className="text-2xl text-gray-500">ms</span>
                            </div>

                            <div className={`text-2xl font-black italic uppercase tracking-tighter ${rankData.color} mb-1`}>
                                {rankData.title}
                            </div>
                            <p className="text-gray-400 text-sm mb-8">{rankData.desc}</p>

                            <div className="flex items-center justify-center gap-2 text-gray-600 text-xs uppercase tracking-widest animate-pulse">
                                <RotateCcw className="w-3 h-3" />
                                Click to Race Again
                            </div>
                        </div>
                    )}

                    <div className="absolute bottom-[-40px] opacity-30 pointer-events-none scale-75 md:scale-100">
                        <Tachometer state={gameState} />
                    </div>

                </div>

                <div className="mt-8 text-center max-w-md">
                    <p className="text-gray-600 text-xs uppercase tracking-widest mb-2">/// DRIVER TIPS ///</p>
                    <p className="text-gray-500 text-sm italic">
                        "{tips[Math.floor(Math.random() * tips.length)]}"
                    </p>
                </div>

                <style>{`
                @keyframes wiggle {
                    0%, 100% { transform: rotate(-1deg); }
                    50% { transform: rotate(1deg); }
                }
            `}</style>
            </div>
        </>
    );
}