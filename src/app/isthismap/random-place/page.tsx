'use client'

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { getSmartRandomCoordinates } from '@/utils/isthismap/geoLogic';
import { OCEAN_QUOTES, LAND_QUOTES } from '@/utils/isthismap/location';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Anchor, Trees, RefreshCw, Zap, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const MapRandom = dynamic(
  () => import('@/components/tools/isthismap/random-place/MapRandom'),
  { ssr: false, loading: () => <div className="h-full w-full bg-zinc-950 flex items-center justify-center text-zinc-600">Initializing Portal...</div> }
);

interface LocationInfo {
    name: string;
    type: 'land' | 'ocean' | 'unknown';
}

export default function RandomPlacePage() {
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [isTeleporting, setIsTeleporting] = useState(false);
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [funStatus, setFunStatus] = useState("Ready to jump?");

  const handleTeleport = async () => {
    if (isTeleporting) return;

    setIsTeleporting(true);
    setFunStatus("Warping...");
    setLocationInfo(null);
    
    setTimeout(async () => {
        const result = getSmartRandomCoordinates();
        setCoords({ lat: result.lat, lng: result.lng });

        if (result.type === 'predefined_land') {
            setLocationInfo({ name: result.name, type: 'land' });
            setFunStatus(LAND_QUOTES[Math.floor(Math.random() * LAND_QUOTES.length)]);
            toast.success(`Welcome to ${result.name}`, { icon: '🏙️' });
        } 
        else if (result.type === 'predefined_ocean') {
            setLocationInfo({ name: result.name, type: 'ocean' });
            setFunStatus(OCEAN_QUOTES[Math.floor(Math.random() * OCEAN_QUOTES.length)]);
            toast("Splash! Into the water.", { icon: '🌊' });
        } 
        else {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${result.lat}&lon=${result.lng}&zoom=10`);
                const data = await response.json();
                
                if (data && data.address) {
                    const placeName = data.address.city || data.address.country || "Unknown Land";
                    setLocationInfo({ name: placeName, type: 'land' });
                    setFunStatus("You found a hidden spot!");
                } else {
                    setLocationInfo({ name: "Middle of Nowhere", type: 'ocean' });
                    setFunStatus("Teleportation complete.");
                }
            } catch (e) {
                setLocationInfo({ name: "Unknown Coordinates", type: 'unknown' });
            }
        }
        
        setIsTeleporting(false);
    }, 1000); 
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
                {isTeleporting ? `WARPING...` : coords ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : "WAITING_INPUT..."}
            </p>
        </div>
      </div>

      <AnimatePresence>
        {!isTeleporting && coords && locationInfo && (
            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="absolute top-32 left-6 z-20 max-w-sm"
            >
                <div className={`backdrop-blur-xl border-2 p-6 rounded-3xl shadow-2xl ${locationInfo.type === 'land' ? 'bg-emerald-950/80 border-emerald-500/50' : 'bg-blue-950/80 border-blue-500/50'}`}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-xl ${locationInfo.type === 'land' ? 'bg-emerald-500 text-black' : 'bg-blue-500 text-white'}`}>
                            {locationInfo.type === 'land' ? <Trees size={24}/> : <Anchor size={24}/>}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white uppercase">
                                {locationInfo.type === 'land' ? "Land Detected" : "Ocean / Water"}
                            </h2>
                            <p className={`text-xs font-mono ${locationInfo.type === 'land' ? 'text-emerald-300' : 'text-blue-300'}`}>
                                Target: {locationInfo.name}
                            </p>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <p className="text-white text-lg font-medium leading-tight">
                            {funStatus}
                        </p>
                        <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-zinc-400 text-sm">
                            <MapPin size={14} />
                            {locationInfo.name}
                        </div>
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
                <> <RefreshCw className="animate-spin" /> Teleporting... </>
            ) : (
                <> <Zap className="fill-black group-hover:text-violet-600 transition-colors" /> JUMP! </>
            )}
        </button>
      </div>

    </main>
  );
}