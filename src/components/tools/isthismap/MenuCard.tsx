'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface MenuCardProps {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
    accentColor: string;
    delay?: number;
}

export default function MenuCard({ title, description, href, icon, delay = 0, accentColor }: MenuCardProps) {
    return (
        <Link href={href} className="block h-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
                whileHover={{
                    y: -8,
                    rotate: 2,
                    scale: 1.03
                }}
                className={`group relative h-full overflow-hidden rounded-[2rem] border-2 border-zinc-800 bg-zinc-900/80 p-8 backdrop-blur-xl transition-all hover:border-${accentColor}-500/50 hover:shadow-2xl hover:shadow-${accentColor}-500/20`}
            >
                <div className={`absolute top-0 right-0 -mt-12 -mr-12 h-48 w-48 rounded-full bg-${accentColor}-500/10 blur-3xl transition-all group-hover:bg-${accentColor}-500/20`} />

                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <div className={`mb-6 inline-flex items-center justify-center rounded-2xl bg-zinc-800 p-4 text-${accentColor}-400 shadow-lg ring-1 ring-zinc-700 group-hover:bg-${accentColor}-500 group-hover:text-white transition-colors duration-300`}>
                            {icon}
                        </div>
                        <h3 className="mb-3 text-3xl font-black text-white uppercase tracking-wide">{title}</h3>
                        <p className="text-zinc-400 text-base font-medium leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className={`mt-8 flex items-center text-sm font-bold uppercase tracking-wider text-${accentColor}-400 group-hover:text-${accentColor}-300 transition-colors`}>
                        Start Exploring
                        <ArrowRight className={`ml-3 h-5 w-5 transition-transform group-hover:translate-x-2`} />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}