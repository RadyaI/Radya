'use client'

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useGeolocation } from '@/hooks/useGeolocation';
import { calculateDistance } from '@/utils/isthismap/geoLogic';
import { HARDCODED_LOCATIONS } from '@/utils/isthismap/location';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, MapPin, Loader2, GripHorizontal, MousePointerClick } from 'lucide-react';


const MapRouteView = dynamic(
    () => import('@/components/tools/isthismap/how-far/MapRouteView'),
    { ssr: false, loading: () => <div className="h-full w-full bg-zinc-900 flex items-center justify-center text-zinc-500">Loading Map Engine...</div> }
);

export default function HowFarPage() {
    const locationState = useGeolocation();
    const [currentPos, setCurrentPos] = useState<{ lat: number, lng: number } | undefined>(undefined);
    const [isCalculating, setIsCalculating] = useState(false);
    const [loadingText, setLoadingText] = useState("Initializing...");

    const [focusedTarget, setFocusedTarget] = useState<{ lat: number, lng: number } | null>(null);

    useEffect(() => {
        if (locationState.coordinates && !currentPos) {
            startCalculation(locationState.coordinates);
        }
    }, [locationState.coordinates]);

    const startCalculation = (pos: { lat: number, lng: number }) => {
        setCurrentPos(pos);
        setIsCalculating(true);
        setFocusedTarget(null);

        const texts = [
            "Tracking your coordinates...",
            "Hang on...",
            "Searching for your location...",
            "Making sure the Earth is round...",
            "Calculating your distance...",
            "1+1=2...",
            "Yep, location found!"
        ];


        let i = 0;
        setLoadingText(texts[0]);

        const interval = setInterval(() => {
            i++;
            if (i < texts.length) {
                setLoadingText(texts[i]);
            } else {
                clearInterval(interval);
                setTimeout(() => setIsCalculating(false), 300);
            }
        }, 300);
    };

    const handleDragEnd = (newPos: { lat: number, lng: number }) => {
        startCalculation(newPos);
    };

    const handleItemClick = (lat: number, lng: number) => {
        setFocusedTarget({ lat, lng });
    };

    const calculatedDistances = currentPos ? HARDCODED_LOCATIONS.map(loc => {
        const meters = calculateDistance(currentPos.lat, currentPos.lng, loc.lat, loc.lng);
        return { ...loc, meters };
    }).sort((a, b) => a.meters - b.meters) : [];

    return (
        <main className="h-screen w-full bg-[#0a0a0a] flex flex-col md:flex-row overflow-hidden relative">

            <AnimatePresence>
                {isCalculating && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center"
                    >
                        <div className="w-64 text-center">
                            <Loader2 className="h-12 w-12 text-yellow-500 animate-spin mx-auto mb-4" />
                            <h2 className="text-2xl font-black text-white uppercase tracking-widest animate-pulse">{loadingText}</h2>
                            <div className="mt-4 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 5.5, ease: "linear" }}
                                    className="h-full bg-yellow-500"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="w-full md:w-[400px] flex-shrink-0 bg-zinc-900 border-r border-zinc-800 flex flex-col h-[40vh] md:h-full z-10 shadow-2xl">
                <div className="p-6 border-b border-zinc-800 bg-zinc-900 z-20">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-yellow-500 p-2 rounded-lg text-black">
                            <Ruler size={20} />
                        </div>
                        <h1 className="text-xl font-black text-white uppercase italic">Distance Report</h1>
                    </div>
                    <p className="text-xs text-zinc-400 flex items-center gap-1">
                        <GripHorizontal size={14} /> Drag the blue pin on the map to change your location.
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
                    {currentPos ? (
                        calculatedDistances.map((item, idx) => (
                            <motion.button
                                key={item.name}
                                onClick={() => handleItemClick(item.lat, item.lng)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 + 0.5 }}
                                className="w-full bg-zinc-800/50 border border-zinc-700 p-4 rounded-xl flex items-center justify-between hover:bg-zinc-800 hover:border-yellow-500/50 transition-all group text-left focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl group-hover:scale-125 transition-transform">{item.icon}</span>
                                    <div>
                                        <h3 className="font-bold text-zinc-200 text-sm group-hover:text-yellow-400 transition-colors">{item.name}</h3>
                                        <p className="text-[10px] text-zinc-500">{item.desc}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block font-mono font-bold text-yellow-500 text-lg">
                                        {(item.meters / 1000).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                                    </span>
                                    <div className="flex items-center justify-end gap-1 text-[10px] text-zinc-500 uppercase tracking-wide">
                                        <span>KM</span>
                                        <MousePointerClick size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </motion.button>
                        ))
                    ) : (
                        <div className="text-center py-10 text-zinc-600">
                            <MapPin className="h-10 w-10 mx-auto mb-2 opacity-50" />
                            <p>Waiting for your location...</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 h-[60vh] md:h-full relative bg-zinc-950">
                <MapRouteView
                    userPos={currentPos}
                    onUserDragEnd={handleDragEnd}
                    targets={HARDCODED_LOCATIONS}
                    focusedTarget={focusedTarget}
                />

                {!isCalculating && currentPos && !focusedTarget && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[400] bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/10 text-xs text-white pointer-events-none">
                        Click the list in the sidebar to zoom in on the location 👇
                    </div>
                )}
            </div>

        </main>
    );
}