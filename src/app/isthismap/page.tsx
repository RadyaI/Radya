import { Metadata } from 'next';
import MenuCard from '@/components/tools/isthismap/MenuCard';
import { LocateFixed, Shuffle, Skull } from 'lucide-react';

export const metadata: Metadata = {
    title: 'IsthisMap? - Peta Absurd untuk Gabut Maksimal | Radya.my.id',
    description: 'Tools peta interaktif untuk menghitung jarak ke Point Nemo, teleportasi random, dan simulasi zombie.',
};

function BackgroundMapPattern() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden opacity-20 pointer-events-none">
            <svg className="absolute h-full w-full animate-[spin_60s_linear_infinite]" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <defs>
                    <pattern id="map_pattern" patternUnits="userSpaceOnUse" width="100" height="100" viewBox="0 0 100 100">
                        <path d="M0 0 L100 100 M100 0 L0 100 M50 0 L50 100 M0 50 L100 50" stroke="#ffffff" strokeWidth="0.5" fill="none" strokeDasharray="2 4" />
                        <circle cx="50" cy="50" r="10" stroke="#ffffff" strokeWidth="0.5" fill="none" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map_pattern)" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
        </div>
    );
}

export default function IsthisMapPage() {
    return (
        <main className="min-h-screen w-full bg-[#0a0a0a] relative flex flex-col items-center justify-center p-6 overflow-hidden">
            <BackgroundMapPattern />

            <div className="relative z-10 max-w-6xl w-full mx-auto space-y-16 py-12">
                <div className="text-center space-y-6">
                    <div className="inline-block animate-bounce mb-2">👇</div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase" style={{ textShadow: '0 0 30px rgba(255,255,255,0.2)' }}>
                        Is This <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">Map?</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-300 font-bold max-w-3xl mx-auto leading-relaxed">
                        An <span className="underline decoration-wavy decoration-yellow-500">absurd</span> geography experiment.
                        Checking distances to random middle-of-nowhere places or getting lost in random coordinates.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <MenuCard
                        title="How Far Bro?"
                        description="Measuring the distance from where you're sitting right now to the edge of the world. Point Nemo? Everest? Let's go."
                        href="/isthismap/how-far"
                        icon={<LocateFixed className="h-8 w-8" />}
                        accentColor="yellow"
                        delay={0.1}
                    />
                    <MenuCard
                        title="Random Teleport"
                        description="Click the button and let fate take you to a random coordinate on Earth. Watch out, you might land in the ocean."
                        href="/isthismap/random-place"
                        icon={<Shuffle className="h-8 w-8" />}
                        accentColor="blue"
                        delay={0.2}
                    />
                    <MenuCard
                        title="Zombie!"
                        description="A small-scale apocalypse simulation. Five zombies spawn around you. How safe is your position?"
                        href="/isthismap/zombie"
                        icon={<Skull className="h-8 w-8" />}
                        accentColor="red"
                        delay={0.3}
                    />
                </div>
            </div>
        </main>
    );
}