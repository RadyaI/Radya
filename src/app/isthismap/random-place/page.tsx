'use client'

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { getRandomCoordinates, OCEAN_QUOTES, LAND_QUOTES } from '@/utils/isthismap/geoLogic';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Map, Anchor, Trees, RefreshCw, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const MapRandom = dynamic(
  () => import('@/components/tools/isthismap/random-place/MapRandom'),
  { ssr: false, loading: () => <div className="h-full w-full bg-zinc-950 flex items-center justify-center text-zinc-600">Initializing Portal...</div> }
);

interface LocationInfo {
    address?: {
        country?: string;
        city?: string;
        state?: string;
    };
    display_name?: string;
    type: 'land' | 'ocean';
}

export default function RandomPlacePage() {
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [isTeleporting, setIsTeleporting] = useState(false);
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [funStatus, setFunStatus] = useState("Ready to jump?");

  const handleTeleport = async () => {
    if (isTeleporting) return;

    setIsTeleporting(true);
    setFunStatus("Initiating Quantum Jump...");
    setLocationInfo(null);
    
    const newCoords = getRandomCoordinates();
    
    setTimeout(async () => {
        setCoords(newCoords);
        
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${newCoords.lat}&lon=${newCoords.lng}&zoom=10`);
            const data = await response.json();

            if (data && data.address) {
                setLocationInfo({
                    address: data.address,
                    display_name: data.display_name,
                    type: 'land'
                });
                setFunStatus(LAND_QUOTES[Math.floor(Math.random() * LAND_QUOTES.length)]);
                toast.success("Land Ho! Civilization detected.");
            } else {
                throw new Error("No address found");
            }
        } catch (error) {
            setLocationInfo({ type: 'ocean' });
            setFunStatus(OCEAN_QUOTES[Math.floor(Math.random() * OCEAN_QUOTES.length)]);
            toast("Splash! You are in the ocean.", { icon: '🌊' });
        } finally {
            setIsTeleporting(false);
        }
    }, 2000);
  };

  return (
    <main className="h-screen w-full bg-[#050505] relative overflow-hidden flex flex-col">
      
      <div className="absolute top-0 left-0 w-full z-20 p-6 pointer-events-none flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
        <div>
            <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
                <Shuffle className="text-violet-500" size={40} />
                Random<span className="text-violet-500">Teleport</span>
            </h1>
            <p className="text-zinc-400 font-mono text-sm mt-1">
                Generated Coords: {coords ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : "WAITING_INPUT..."}
            </p>
        </div>

        <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 px-4 py-2 rounded-full shadow-2xl">
            <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${isTeleporting ? 'bg-yellow-500 animate-ping' : 'bg-green-500'}`} />
                <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">
                    {isTeleporting ? "WARPING..." : "SYSTEM ONLINE"}
                </span>
            </div>
        </div>
      </div>

      <AnimatePresence>
        {!isTeleporting && coords && (
            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="absolute top-32 left-6 z-20 max-w-sm"
            >
                <div className={`backdrop-blur-xl border-2 p-6 rounded-3xl shadow-2xl ${locationInfo?.type === 'land' ? 'bg-emerald-950/80 border-emerald-500/50' : 'bg-blue-950/80 border-blue-500/50'}`}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-xl ${locationInfo?.type === 'land' ? 'bg-emerald-500 text-black' : 'bg-blue-500 text-white'}`}>
                            {locationInfo?.type === 'land' ? <Trees size={24}/> : <Anchor size={24}/>}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white uppercase">
                                {locationInfo?.type === 'land' ? "Land Detected" : "Ocean / Unknown"}
                            </h2>
                            <p className={`text-xs font-mono ${locationInfo?.type === 'land' ? 'text-emerald-300' : 'text-blue-300'}`}>
                                Survival Probability: {locationInfo?.type === 'land' ? "85%" : "1%"}
                            </p>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <p className="text-white text-lg font-medium leading-tight">
                            {funStatus}
                        </p>
                        {locationInfo?.address && (
                            <div className="mt-3 pt-3 border-t border-white/10">
                                <p className="text-sm text-zinc-300">
                                    <span className="block text-xs text-zinc-500 uppercase">Country</span>
                                    {locationInfo.address.country || "Unknown Territory"}
                                </p>
                                {locationInfo.address.city && (
                                    <p className="text-sm text-zinc-300 mt-1">
                                        <span className="block text-xs text-zinc-500 uppercase">City/Region</span>
                                        {locationInfo.address.city || locationInfo.address.state}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <div className={`flex-1 relative transition-all duration-1000 ${isTeleporting ? 'scale-110 blur-sm' : 'scale-100 blur-0'}`}>
        <MapRandom coords={coords} />
        
        {isTeleporting && (
            <div className="absolute inset-0 z-50 bg-violet-500/10 mix-blend-overlay pointer-events-none flex items-center justify-center">
                <Zap className="h-32 w-32 text-white animate-pulse" />
            </div>
        )}
      </div>

      <div className="absolute bottom-10 left-0 w-full z-30 flex justify-center px-4 pointer-events-none">
        <button 
            onClick={handleTeleport}
            disabled={isTeleporting}
            className="group pointer-events-auto relative bg-white text-black px-8 py-6 rounded-[2rem] font-black text-xl uppercase tracking-wider hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] flex items-center gap-4"
        >
            {isTeleporting ? (
                <>
                   <RefreshCw className="animate-spin" /> Teleporting...
                </>
            ) : (
                <>
                   <Zap className="fill-black group-hover:text-violet-600 transition-colors" /> Teleport Me!
                </>
            )}
        </button>
      </div>

    </main>
  );
}