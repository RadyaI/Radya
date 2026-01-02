"use client"
import { useEffect, useState } from "react";
import { Globe, Monitor, Battery, Cpu, Wifi, ScanLine, AlertTriangle } from "lucide-react";
import Link from "next/link"
import 'animate.css';

export default function WhoAmI() {
    const [info, setInfo] = useState({
        ip: "Scanning...",
        userAgent: "Analyzing...",
        screen: "Measuring...",
        language: "Detecting...",
        battery: "Checking sensors...",
        connection: "Ping..."
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(async () => {
            let ipData = "Unknown";
            try {
                const req = await fetch('https://api.ipify.org?format=json');
                const res = await req.json();
                ipData = res.ip;
            } catch (e) {
                ipData = "Hidden / Firewall";
            }

            let batteryStatus = "Desktop / No Battery";
            if (navigator.getBattery) {
                try {
                    const bat = await navigator.getBattery();
                    const level = Math.round(bat.level * 100) + "%";
                    const charging = bat.charging ? "⚡ Charging" : "🔋 On Battery";
                    batteryStatus = `${level} (${charging})`;
                } catch (e) { console.log(e) }
            }

            const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            const netType = conn ? conn.effectiveType.toUpperCase() : "Standard";

            setInfo({
                ip: ipData,
                userAgent: navigator.platform + " / " + navigator.vendor,
                screen: `${window.screen.width} x ${window.screen.height} px`,
                language: navigator.language.toUpperCase(), 
                battery: batteryStatus,
                connection: netType + " Connection"
            });
            setLoading(false);

        }, 1500);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-mono p-6 flex flex-col items-center justify-center relative overflow-hidden">
            
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50 blur-[4px] shadow-[0_0_20px_#22c55e] animate-scanline pointer-events-none z-0"></div>

            <div className="relative z-10 w-full max-w-2xl">
                
                <div className="mb-8 text-center animate__animated animate__fadeInDown">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-900/20 border border-green-500/30 rounded-full text-green-400 text-xs font-bold tracking-[0.2em] mb-4">
                        <ScanLine className="w-4 h-4 animate-pulse" /> SYSTEM DIAGNOSTIC
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                        WHOAMI<span className="text-green-500">.EXE</span>
                    </h1>
                    <p className="text-gray-500 mt-2">Identifying User Protocols & Network Signature...</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <DataCard 
                        icon={Globe} 
                        label="PUBLIC IP ADDRESS" 
                        value={info.ip} 
                        loading={loading} 
                        delay="0s"
                        color="text-cyan-400"
                        borderColor="group-hover:border-cyan-500/50"
                    />
                    
                    <DataCard 
                        icon={Monitor} 
                        label="SCREEN RESOLUTION" 
                        value={info.screen} 
                        loading={loading} 
                        delay="0.1s"
                        color="text-purple-400"
                        borderColor="group-hover:border-purple-500/50"
                    />

                    <DataCard 
                        icon={Cpu} 
                        label="SYSTEM PLATFORM" 
                        value={info.userAgent} 
                        loading={loading} 
                        delay="0.2s"
                        color="text-yellow-400"
                        borderColor="group-hover:border-yellow-500/50"
                    />

                    <DataCard 
                        icon={Battery} 
                        label="POWER STATUS" 
                        value={info.battery} 
                        loading={loading} 
                        delay="0.3s"
                        color={info.battery.includes("Charging") ? "text-green-400" : "text-orange-400"}
                        borderColor="group-hover:border-green-500/50"
                    />

                    <DataCard 
                        icon={Wifi} 
                        label="CONNECTION TYPE" 
                        value={info.connection} 
                        loading={loading} 
                        delay="0.4s"
                        color="text-blue-400"
                        borderColor="group-hover:border-blue-500/50"
                    />

                     <DataCard 
                        icon={AlertTriangle} 
                        label="SYSTEM LANGUAGE" 
                        value={info.language} 
                        loading={loading} 
                        delay="0.5s"
                        color="text-pink-400"
                        borderColor="group-hover:border-pink-500/50"
                    />

                </div>

                <div className="mt-10 text-center animate__animated animate__fadeInUp animate__delay-1s">
                    <Link href="/tools" className="inline-block px-8 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/30 transition text-sm font-bold tracking-widest text-gray-400 hover:text-white">
                        TERMINATE SESSION
                    </Link>
                </div>

            </div>
        </div>
    );
}

function DataCard({ icon: Icon, label, value, loading, delay, color, borderColor }) {
    return (
        <div 
            className={`group relative p-5 bg-[#111] border border-white/5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${borderColor} animate__animated animate__fadeInUp`}
            style={{ animationDelay: delay }}
        >
            <div className="flex items-start gap-4">
                <div className={`p-3 bg-white/5 rounded-lg border border-white/5 ${color}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 overflow-hidden">
                    <h4 className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">{label}</h4>
                    
                    {loading ? (
                        <div className="h-6 w-24 bg-white/10 rounded animate-pulse"></div>
                    ) : (
                        <p className={`text-lg md:text-xl font-bold font-mono truncate ${color} drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]`}>
                            {value}
                        </p>
                    )}
                </div>
            </div>

            <div className="absolute top-2 right-2 w-1 h-1 bg-white/20 rounded-full"></div>
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/20 rounded-full"></div>
        </div>
    );
}