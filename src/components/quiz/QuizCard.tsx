"use client";
import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { QuizSet } from '@/utils/quiz-data';
import WashiTape from './ui/WashiTape';

export default function QuizCard({ data, index }: { data: QuizSet; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(cardRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      delay: index * 0.1,
      ease: "power2.out"
    });
  }, []);

  const onEnter = () => {
    gsap.to(cardRef.current, { y: -10, rotate: -2, scale: 1.02, duration: 0.3, ease: "back.out(2)" });
  };

  const onLeave = () => {
    gsap.to(cardRef.current, { y: 0, rotate: 0, scale: 1, duration: 0.3, ease: "power2.out" });
  };

  return (
    <div ref={cardRef} onMouseEnter={onEnter} onMouseLeave={onLeave} className="relative group h-full">
      {}
      <WashiTape color={(data as any).tapeColor} className="-top-4 left-1/2 -translate-x-1/2 z-10 rotate-1 w-24" />
      
      {}
      <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col justify-between transition-shadow hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        
        <div>
          <div className="flex justify-between items-start mb-4 border-b-2 border-black border-dashed pb-2">
            <span className="font-mono text-xs font-bold uppercase bg-black text-white px-1">
              {data.category.substring(0, 3)}
            </span>
            <span className="font-mono text-xs font-bold border border-black px-1 rounded-full">
              {data.level}
            </span>
          </div>

          <h3 className="font-serif text-4xl font-black leading-[0.9] mb-4 group-hover:text-blue-600 transition-colors">
            {data.title}
          </h3>
          
          <p className="font-mono text-xs text-gray-500 leading-relaxed mb-8">
            {data.description}
          </p>
        </div>

        <Link href={`/quiz/${data.slug}`} className="block mt-auto">
          <button className="w-full flex items-center justify-between bg-gray-50 hover:bg-black hover:text-white border-2 border-black px-4 py-2 transition-all group-hover:translate-x-1">
            <span className="font-bold text-sm tracking-widest">START</span>
            <span className="font-mono text-xl">→</span>
          </button>
        </Link>
      </div>
    </div>
  );
}