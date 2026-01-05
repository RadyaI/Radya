"use client"

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Home, ArrowLeft, AlertTriangle, Zap } from 'lucide-react';
import Link from 'next/link'; // ✅ Pakai Link biar gak reload page
import { useRouter } from 'next/navigation'; // ✅ Pakai Router buat navigasi logic

export default function NotFound() {
    const router = useRouter(); // ✅ Init router
    const [mounted, setMounted] = useState(false); // ✅ State penanda browser

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-1, 1], [15, -15]);
    const rotateY = useTransform(mouseXSpring, [-1, 1], [-15, 15]);

    const layerBackX = useTransform(mouseXSpring, [-1, 1], [20, -20]);
    const layerBackY = useTransform(mouseYSpring, [-1, 1], [20, -20]);
    const layerFrontX = useTransform(mouseXSpring, [-1, 1], [-40, 40]);
    const layerFrontY = useTransform(mouseYSpring, [-1, 1], [-40, 40]);

    useEffect(() => {
        // ✅ Tandai bahwa komponen sudah "nempel" di browser
        setMounted(true);

        const handleMouseMove = (e) => {
            const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
            const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
            x.set(normalizedX);
            y.set(normalizedY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0, scale: 0.8 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", bounce: 0.4 }
        }
    };
    
    return (
        <>
            <div className="cursor-default relative min-h-screen w-full bg-[#0A0A0A] flex items-center justify-center overflow-hidden font-sans text-white perspective-[2000px]">

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
                </div>

                {/* ✅ SOLUSI CRASH: Cuma render partikel kalau sudah mounted di browser */}
                {mounted && [...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-cyan-500/20 pointer-events-none"
                        // ✅ Sekarang AMAN panggil window karena ada di dalam block mounted
                        initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, scale: Math.random() }}
                        animate={{
                            y: [null, Math.random() * -500],
                            rotate: [0, Math.random() * 360]
                        }}
                        transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
                    >
                        {i % 2 === 0 ? <Zap size={40 + Math.random() * 100} /> : <AlertTriangle size={30 + Math.random() * 50} />}
                    </motion.div>
                ))}


                <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 flex flex-col items-center text-center p-10"
                >

                    <div className="relative w-[300px] h-[200px] md:w-[500px] md:h-[300px] [transform-style:preserve-3d]">

                        <motion.h1
                            style={{ x: layerBackX, y: layerBackY, z: -100 }}
                            className="absolute inset-0 text-[130px] md:text-[230px] font-black leading-none tracking-tighter text-cyan-900/30 blur-sm select-none"
                        >
                            404
                        </motion.h1>

                        <motion.h1
                            style={{ z: 0 }}
                            className="absolute inset-0 text-[130px] md:text-[230px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 select-none filter drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                        >
                            404
                        </motion.h1>

                        <motion.div
                            style={{ x: layerFrontX, y: layerFrontY, z: 80 }}
                            className="absolute inset-0 text-[150px] md:text-[250px] font-black leading-none tracking-tighter text-white/90 select-none mix-blend-overlay pointer-events-none flex justify-center"
                        >
                            <motion.span style={{ z: 50 }} className="inline-block drop-shadow-2xl">4</motion.span>
                            <motion.span style={{ z: -20, rotateZ: 5 }} className="inline-block text-cyan-300 mx-2">0</motion.span>
                            <motion.span style={{ z: 80 }} className="inline-block drop-shadow-2xl">4</motion.span>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} style={{ translateZ: 60 }} className="space-y-4 max-w-lg">
                        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-500">
                            NOT FOUND
                        </h2>
                        <p className="text-neutral-400 text-lg md:text-xl">
                            Anomali terdeteksi. Halamannya ga ada, ntah udah dipindah, ganti nama, atau emang ga ada.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} style={{ translateZ: 100 }} className="flex flex-col sm:flex-row gap-4 mt-10">
                        <button
                            onClick={() => router.back()}
                            className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-lg"
                        >
                            <div className="absolute inset-0 w-0 bg-cyan-600 transition-all duration-[400ms] ease-out group-hover:w-full"></div>
                            <span className="relative flex items-center gap-2 text-cyan-400 group-hover:text-white transition-colors">
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Re-route
                            </span>
                        </button>

                        <Link
                            href="/"
                            className="relative group px-8 py-3 bg-white text-black rounded-lg font-bold overflow-hidden"
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"></span>

                            <span className="relative flex items-center gap-2 z-10 group-hover:text-white transition-colors">
                                <Home className="w-5 h-5" /> Return to Base
                            </span>
                        </Link>
                    </motion.div>
                </motion.div>

                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,#000_100%)]" />
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000_3px,#000_3px)]" />

            </div>
        </>
    );
}