'use client'

import dynamic from 'next/dynamic';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useZombieGame } from '@/hooks/useZombieGame';
import ZombieHUD from '@/components/tools/isthismap/zombie/ZombieHUD';

const MapZombie = dynamic(
  () => import('@/components/tools/isthismap/zombie/MapZombie'),
  { ssr: false, loading: () => <div className="h-screen w-full bg-black flex items-center justify-center text-red-900">LOADING TACTICAL MAP...</div> }
);

export default function ZombiePage() {
    const locationState = useGeolocation();
    
    const { 
        gameState, playerPos, zombies, hp, energy, score,
        startGame, handlePlayerMove 
    } = useZombieGame(locationState.coordinates);

    return (
        <main className="h-screen w-full bg-black relative overflow-hidden flex flex-col">
            
            <ZombieHUD 
                gameState={gameState}
                hp={hp}
                energy={energy}
                score={score}
                onStart={startGame}
                hasGPS={!!locationState.coordinates}
            />

            <div className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 ${hp === 1 ? 'opacity-100' : 'opacity-0'} bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,0,0,0.4)_100%)] animate-pulse`} />

            <div className="flex-1 relative">
                {locationState.coordinates ? (
                    <MapZombie 
                        playerPos={playerPos}
                        zombies={zombies}
                        onMapClick={handlePlayerMove}
                        energy={energy}
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-zinc-700 font-mono animate-pulse">
                        SEARCHING GPS SIGNAL...
                    </div>
                )}
            </div>
        </main>
    );
}