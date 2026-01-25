"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { quizData } from '@/utils/quiz-data';
import QuizCard from '@/components/quiz/QuizCard';
import Header from '@/components/quiz/Header';
import Marquee from '@/components/quiz/Marquee';
import NoiseBackground from '@/components/quiz/ui/NoiseBackground';

export default function QuizDashboard() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.to(".cat-decor", {
      y: "15px",
      rotation: 5,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      stagger: 0.5
    });

    gsap.to(".abstract-decor", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "linear"
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen text-black p-6 md:p-12 overflow-hidden relative font-sans">
      <NoiseBackground />

      <img 
        src="/images/cats/cat.png" 
        className="cat-decor absolute top-[150px] -left-12 w-48 md:w-64 z-0 rotate-12 opacity-90" 
        alt="decoration" 
      />

      <img 
        src="/images/cats/cat2.png" 
        className="cat-decor absolute bottom-[5%] -right-8 w-40 md:w-56 z-20 -rotate-12" 
        alt="decoration" 
      />

      <img 
        src="/images/cats/cat3.png" 
        className="cat-decor absolute top-10 right-[10%] w-24 md:w-32 z-0 blur-[1px] opacity-60" 
        alt="decoration" 
      />

      <div className="abstract-decor absolute top-1/2 left-[5%] text-9xl select-none opacity-10 font-black">
        ❋
      </div>
      <div className="absolute top-[40%] right-[15%] w-64 h-64 border-4 border-black rounded-full opacity-5 border-dashed pointer-events-none animate-spin-slow"></div>


      <div className="max-w-7xl mx-auto relative z-10">
        <Header />
        
        <Marquee text="MUEHEH // PURE KNOWLEDGE // USE UR BRAIN" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 my-20 px-4">
          {quizData.map((quiz, index) => (
            <QuizCard key={quiz.slug} data={quiz} index={index} />
          ))}
        </div>

        <div className="mt-32 flex flex-col items-center justify-center relative">
            <img src="/images/cats/cat4.png" className="w-24 mb-4" alt="footer cat" />
            <div className="bg-black text-white px-4 py-1 rotate-2 font-mono text-sm">
                BUILT BY RADYA // 2026
            </div>
        </div>
      </div>
    </main>
  );
}