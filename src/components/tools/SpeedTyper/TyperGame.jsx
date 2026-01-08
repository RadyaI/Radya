"use client"
import { useState, useEffect, useRef } from "react";
import { generateParagraph } from "./snippets";
import { RefreshCcw, Trophy, Moon, Sun, Languages } from "lucide-react";

export default function TyperGame() {
    const [gameState, setGameState] = useState("idle");
    const [targetText, setTargetText] = useState("");
    const [userInput, setUserInput] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [isError, setIsError] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [lang, setLang] = useState('id');

    const inputRef = useRef(null);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval = null;
        if (gameState === "playing") {
            interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [gameState]);

    useEffect(() => {
        let interval = null;
        if (gameState === "playing" && startTime) {
            interval = setInterval(() => {
                const now = Date.now();
                const durationInMinutes = (now - startTime) / 60000;

                if (durationInMinutes < 0.001) return;

                const currentWPM = Math.round((userInput.length / 5) / durationInMinutes);
                setWpm(currentWPM < 0 || !isFinite(currentWPM) ? 0 : currentWPM);
            }, 500);
        }
        return () => clearInterval(interval);
    }, [gameState, startTime, userInput]);

    useEffect(() => {
        resetGame();
    }, [lang]);

    const resetGame = () => {
        const data = generateParagraph(lang, 30);
        setTargetText(data.text);
        setUserInput("");
        setGameState("idle");
        setWpm(0);
        setTime(0);
        setStartTime(null);
        setIsError(false);

        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleInput = (e) => {
        if (gameState === "finished") return;

        const val = e.target.value;
        const now = Date.now();

        if (gameState === "idle") {
            setGameState("playing");
            setStartTime(now);
        }

        if (val.length < userInput.length) {
            setUserInput(val);
            return;
        }

        const nextChar = val.slice(-1);
        const targetChar = targetText[userInput.length];

        if (nextChar === targetChar) {
            setUserInput(val);
            setIsError(false);

            if (startTime) {
                const durationInMinutes = (now - startTime) / 60000;
                if (durationInMinutes > 0) {
                    const currentWPM = Math.round((val.length / 5) / durationInMinutes);
                    setWpm(currentWPM);
                }
            }

            if (val.length === targetText.length) {
                finishGame();
            }
        } else {
            setIsError(true);
            setTimeout(() => setIsError(false), 200);
        }
    };

    const finishGame = () => {
        setGameState("finished");

        if (startTime) {
            const now = Date.now();
            const timeInMinutes = (now - startTime) / 60000;
            const finalWPM = Math.round((targetText.length / 5) / timeInMinutes);
            setWpm(finalWPM);
        }
    };

    const theme = isDarkMode ? {
        bg: "bg-[#111]",
        paper: "bg-[#1a1a1a]",
        text: "text-gray-200",
        dimText: "text-gray-600",
        border: "border-gray-700",
        shadow: "shadow-[10px_10px_0px_rgba(50,50,50,0.5)]",
        highlight: "text-white",
        cursor: "bg-yellow-100",
        accent: "text-green-400"
    } : {
        bg: "bg-[#e8e4d9]",
        paper: "bg-[#f4f1ea]",
        text: "text-black",
        dimText: "text-gray-400",
        border: "border-[#d3cec4]",
        shadow: "shadow-[10px_10px_0px_rgba(0,0,0,0.2)]",
        highlight: "text-black",
        cursor: "bg-blue-500",
        accent: "text-blue-600"
    };

    return (
        <div className={`w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-10 relative overflow-hidden ${theme.bg} transition-colors duration-500`}>

            <div className="absolute top-6 right-6 flex gap-3 z-50">
                <button
                    onClick={() => setLang(l => l === 'id' ? 'en' : 'id')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all
                        ${isDarkMode ? 'bg-[#222] text-white hover:bg-[#333]' : 'bg-white text-black hover:bg-gray-100'}
                    `}
                >
                    <Languages className="w-4 h-4" />
                    {lang}
                </button>

                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`p-2 rounded-lg transition-all
                        ${isDarkMode ? 'bg-[#222] text-yellow-400 hover:bg-[#333]' : 'bg-white text-gray-800 hover:bg-gray-100'}
                    `}
                >
                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
            </div>

            <div
                onClick={() => inputRef.current?.focus()}
                className={`
                    relative w-full max-w-4xl min-h-[400px] 
                    p-8 md:p-12 flex flex-col gap-6 transition-all duration-300 rounded-xl border-2
                    ${theme.paper} ${theme.border} ${theme.shadow}
                    ${isError ? "translate-x-[-5px] border-red-500/50" : ""}
                `}
            >
                <div className={`flex justify-between items-end border-b-2 ${theme.border} pb-4 border-dashed`}>
                    <div>
                        <h1 className={`text-2xl font-mono font-bold tracking-tighter ${theme.text}`}>
                            TYPER_TEST<span className={`${theme.accent} animate-pulse`}>_</span>
                        </h1>
                        <p className={`text-xs ${theme.dimText} mt-1 uppercase tracking-widest`}>
                            Mode: Stop-On-Error • Lang: {lang === 'id' ? 'Indonesia' : 'English'}
                        </p>
                        <p className={`text-xs ${theme.dimText} mt-1 uppercase tracking-widest`}>
                            {time} {lang === "id" ? "Detik" : "Second"}
                        </p>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className={`text-4xl font-mono font-black leading-none ${theme.text}`}>{wpm}</span>
                        <span className={`text-[10px] font-bold ${theme.dimText}`}>WPM</span>
                    </div>
                </div>

                <div className="flex-1 relative text-xl md:text-2xl leading-relaxed font-mono outline-none cursor-text select-none mt-4">
                    <p className="break-words">
                        {targetText.split("").map((char, index) => {
                            let colorClass = theme.dimText;
                            if (index < userInput.length) {
                                colorClass = theme.highlight;
                            }

                            const isCursor = index === userInput.length;

                            return (
                                <span key={index} className={`relative ${colorClass} transition-colors duration-75`}>
                                    {isCursor && gameState !== 'finished' && (
                                        <span className={`absolute inset-0 opacity-50 ${theme.cursor} animate-pulse`}></span>
                                    )}
                                    <span className="relative z-10">{char}</span>
                                </span>
                            );
                        })}
                    </p>
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={handleInput}
                    className="absolute opacity-0 top-0 left-0 w-full h-full cursor-default z-20"
                    autoComplete="off"
                    spellCheck="false"
                />

                <div className={`mt-auto pt-6 border-t-2 ${theme.border} border-dashed flex justify-between items-center z-30`}>
                    <button
                        onClick={resetGame}
                        className={`flex items-center gap-2 text-sm font-bold transition-colors group
                            ${theme.dimText} hover:${theme.text}
                        `}
                    >
                        <RefreshCcw className={`w-4 h-4 group-hover:rotate-180 transition-transform duration-500`} />
                        <span className="uppercase tracking-widest">Restart Test</span>
                    </button>

                    {gameState === 'idle' && (
                        <div className={`text-sm ${theme.accent} animate-bounce font-mono`}>
                            Start typing...
                        </div>
                    )}
                </div>
            </div>

            {gameState === "finished" && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className={`${isDarkMode ? 'bg-[#222] text-white border-gray-700' : 'bg-white text-black border-gray-200'} 
                        p-8 max-w-sm w-full shadow-2xl rounded-xl border-2 flex flex-col items-center text-center`}
                    >
                        <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
                        <h2 className="text-3xl font-black uppercase mb-2 font-mono">Completed!</h2>

                        <div className="grid grid-cols-2 gap-4 w-full mb-6 mt-4">
                            <div className={`p-3 rounded ${isDarkMode ? 'bg-[#111]' : 'bg-gray-100'}`}>
                                <div className="text-xs text-gray-500 uppercase">Speed</div>
                                <div className="text-3xl font-black">{wpm} <span className="text-sm">WPM</span></div>
                            </div>
                            <div className={`p-3 rounded ${isDarkMode ? 'bg-[#111]' : 'bg-gray-100'}`}>
                                <div className="text-xs text-gray-500 uppercase">Accuracy</div>
                                <div className="text-3xl font-black text-green-500">100%</div>
                            </div>
                        </div>

                        <button
                            onClick={resetGame}
                            className={`w-full py-3 font-bold rounded hover:opacity-90 transition-all uppercase tracking-widest
                                ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}
                            `}
                        >
                            Test Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}