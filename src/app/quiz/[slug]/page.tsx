"use client";
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { useAuth } from '@/hooks/useAuth'; 
import { quizData } from '@/utils/quiz-data';
import { getQuizHistory } from '@/utils/quiz/firebase-quiz';

import NoiseBackground from '@/components/quiz/ui/NoiseBackground';
import ThemeToggle from '@/components/quiz/ui/ThemeToggle';
import BackgroundDecor from '@/components/quiz/ui/BackgroundDecor'; 
import MarqueeLine from '@/components/quiz/ui/MarqueeLine'; 

export default function QuizDetail() {
  const { slug } = useParams();
  const { user } = useAuth(); 
  const [history, setHistory] = useState<any[]>([]);
  const [isDark, setIsDark] = useState(false); 
  const quiz = quizData.find((q) => q.slug === slug);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".reveal", { 
        y: 50, 
        opacity: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power2.out" 
    });
    
    gsap.from(".stamp-effect", { scale: 2, opacity: 0, rotation: 45, delay: 0.5, duration: 0.4, ease: "back.out(1.7)" });
  }, { scope: containerRef });

  useEffect(() => {
    if (user && slug) {
      getQuizHistory(user.uid, slug as string).then(setHistory);
    }
  }, [user, slug]);

  if (!quiz) return <div>Data Not Found</div>;

  const themeClasses = isDark ? "bg-[#1a1a1a] text-white selection:bg-white selection:text-black" : "bg-[#f4f3ef] text-black selection:bg-black selection:text-white";
  const cardClasses = isDark ? "bg-[#222] border-white" : "bg-white border-black";
  const secondaryText = isDark ? "text-gray-400" : "text-gray-600";
  const buttonClasses = isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-yellow-400 hover:text-black";

  return (
    <main ref={containerRef} className={`min-h-screen p-6 md:p-12 font-sans relative overflow-hidden transition-colors duration-300 ${themeClasses}`}>
      
      {}
      <NoiseBackground />
      <BackgroundDecor isDark={isDark} />
      <MarqueeLine isDark={isDark} />
      
      {}
      <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />

      {}
      <div className="relative z-10">
          
          <Link href="/quiz" className={`inline-block mb-8 font-mono font-bold hover:underline px-4 py-1 border-2 transition-all hover:-translate-y-1 ${isDark ? 'border-white bg-black' : 'border-black bg-white'}`}>
            ← RETURN TO ARCHIVE
          </Link>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-8 mb-24">
            
            {}
            <div className="space-y-6 relative">
              {}
              <div className={`absolute -top-6 -left-6 w-12 h-12 rounded-full border-2 border-dashed ${isDark ? 'border-white' : 'border-black'} animate-spin-slow opacity-50`}></div>

              <div className={`reveal border-l-8 pl-8 py-4 ${isDark ? 'border-white' : 'border-black'}`}>
                 <span className={`px-2 py-1 font-mono text-xs mb-4 inline-block tracking-widest border ${isDark ? 'bg-white text-black border-transparent' : 'bg-black text-white border-transparent'}`}>
                    BRIEF: {quiz.category.toUpperCase()}
                 </span>
                 <h1 className="text-6xl md:text-7xl font-serif font-black leading-[0.9] tracking-tighter drop-shadow-xl">{quiz.title}</h1>
              </div>
              
              <div className={`reveal font-mono text-sm leading-relaxed border-y-2 border-dashed py-6 ${isDark ? 'border-white/30' : 'border-black/30'} ${secondaryText}`}>
                 <p className="mb-4 text-lg">{quiz.description}</p>
                 <div className="flex gap-4">
                    <div className={`border px-3 py-1 ${isDark ? 'border-white text-white' : 'border-black text-black'}`}>
                        LVL: <span className="font-bold">{quiz.level}</span>
                    </div>
                    <div className={`border px-3 py-1 ${isDark ? 'border-white text-white' : 'border-black text-black'}`}>
                        QTY: <span className="font-bold">{quiz.questions.length}</span>
                    </div>
                 </div>
              </div>

              <div className="reveal relative group">
                 {}
                 <div className={`absolute top-2 left-2 w-full h-full border-2 ${isDark ? 'border-white bg-white/10' : 'border-black bg-black'} -z-10 transition-transform group-hover:translate-x-1 group-hover:translate-y-1`}></div>
                 
                 {user ? (
                    <Link href={`/quiz/${slug}/play`}>
                      <button className={`w-full py-1 font-bold text-2xl uppercase tracking-wider border-2 border-transparent hover:border-current transition-all ${buttonClasses}`}>
                        START
                      </button>
                    </Link>
                 ) : (
                    <div className="bg-red-500/10 border-2 border-red-500 p-4 font-mono text-red-500 text-center font-bold">
                       ACCESS DENIED. PLEASE LOGIN FIRST.
                    </div>
                 )}
              </div>
            </div>

            {}
            <div className={`reveal border-4 p-8 relative shadow-[10px_10px_0px_0px_rgba(0,0,0,0.2)] ${cardClasses}`}>
              {}
              <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-12 border-x-2 border-t-2 rounded-t-full bg-transparent ${isDark ? 'border-white' : 'border-black'}`}></div>

              <div className={`absolute -top-4 right-4 px-4 py-1 font-mono text-xs font-bold rotate-2 border ${isDark ? 'bg-blue-600 text-white border-white' : 'bg-blue-500 text-white border-black'}`}>
                 ATTEMPT LOGS
              </div>
              
              <div className="mt-6 space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {history.length === 0 ? (
                   <div className={`text-center py-12 border-2 border-dashed ${isDark ? 'border-white/20' : 'border-black/20'}`}>
                        <p className="font-mono opacity-50">NO DATA FOUND</p>
                        <p className="text-4xl mt-2 opacity-30">?</p>
                   </div>
                ) : (
                   history.map((h, i) => (
                     <Link href={`/quiz/${slug}/result?id=${h.id}`} key={h.id}>
                        <div className={`group flex justify-between items-center border-b-2 py-4 cursor-pointer transition-colors ${isDark ? 'border-white/20 hover:bg-white/10' : 'border-black/10 hover:bg-yellow-50'}`}>
                           <div>
                              <p className="font-black text-2xl">{h.score}%</p>
                              <p className={`text-xs font-mono uppercase tracking-widest ${secondaryText}`}>
                                {new Date(h.timestamp.seconds * 1000).toLocaleDateString()}
                              </p>
                           </div>
                           <span className="group-hover:translate-x-2 transition-transform font-bold text-xl">
                             →
                           </span>
                        </div>
                     </Link>
                   ))
                )}
              </div>

              {}
              <div className={`stamp-effect absolute bottom-4 right-4 opacity-20 pointer-events-none border-4 rounded-full w-24 h-24 flex items-center justify-center -rotate-12 ${isDark ? 'border-white text-white' : 'border-black text-black'}`}>
                <span className="font-black text-xs">MIAW CERTIFIED</span>
              </div>
            </div>

          </div>
      </div>
    </main>
  );
}