"use client";
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getQuizResultById } from '@/utils/quiz/firebase-quiz';
import { quizData } from '@/utils/quiz-data'; 
import NoiseBackground from '@/components/quiz/ui/NoiseBackground';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function QuizResult() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [result, setResult] = useState<any>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (id) {
      getQuizResultById(id).then(setResult);
    }
  }, [id]);

  useGSAP(() => {
    if (result) {
      gsap.from(".stamp", { scale: 3, opacity: 0, rotation: 45, duration: 0.5, ease: "bounce.out" });
      gsap.from(".item-row", { x: -20, opacity: 0, stagger: 0.1, delay: 0.5 });
    }
  }, { scope: containerRef, dependencies: [result] });

  if (!result) return <div className="p-10 font-mono">Retrieving data...</div>;

  const currentQuizData = quizData.find((q) => q.slug === result.quizSlug);

  const passed = result.score >= 70;

  return (
    <main ref={containerRef} className="min-h-screen p-6 md:p-12 bg-[#f4f3ef] text-black font-sans relative">
      <NoiseBackground />

      <div className="max-w-3xl mx-auto bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] p-8 md:p-12 relative min-h-[80vh]">

        <div className="border-b-4 border-double border-black pb-6 mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-black font-serif uppercase">Quiz Report</h1>
            <p className="font-mono text-sm text-gray-500">ID: {result.id.slice(0, 8)}...</p>
            <p className="font-bold text-lg mt-1">{currentQuizData?.title}</p>
          </div>

          <div className={`stamp border-4 ${passed ? 'border-green-600 text-green-600' : 'border-red-600 text-red-600'}  px-4 py-2 font-black text-2xl uppercase -rotate-12 opacity-80 mix-blend-multiply`}>
            {passed ? 'PASSED' : 'FAILED'}
          </div>
        </div>

        <div className="text-center mb-12">
          <span className="block font-mono text-sm tracking-widest uppercase mb-2">Final Score</span>
          <span className="text-9xl font-black leading-none">{result.score}</span>
          <span className="text-xl font-mono block text-gray-500">/ 100</span>
        </div>

         
        <div className="space-y-4 mb-12">
          <h3 className="font-bold border-b border-black inline-block mb-4">ANSWER BREAKDOWN</h3>

          {result.answers.map((ans: any, idx: number) => {
            const questionText = currentQuizData?.questions[idx]?.q || "Question text unavailable";

            return (
              <div key={idx} className="item-row p-5 border border-black/20 bg-gray-50 flex flex-col gap-4">

                 
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold bg-black text-white px-2 py-0.5 text-xs">Q.{idx + 1}</span>
                  {ans.isCorrect ? (
                    <span className="bg-green-200 text-green-800 text-xs px-2 py-0.5 font-bold border border-green-800">CORRECT</span>
                  ) : (
                    <span className="bg-red-200 text-red-800 text-xs px-2 py-0.5 font-bold border border-red-800">WRONG</span>
                  )}
                </div>

                 
                <p className="font-serif font-bold text-lg leading-snug border-b-2 border-dashed border-black/10 pb-3">
                  {questionText}
                </p>

                <div className="flex flex-col gap-2">

                  <p className="text-sm font-mono text-gray-600">
                    You chose: <span className={`font-bold ${!ans.isCorrect ? 'text-red-600 line-through decoration-2 decoration-red-400' : 'text-black'}`}>
                      {ans.selectedOption}
                    </span>
                  </p>

                  {!ans.isCorrect && (
                    <div className="text-sm font-mono bg-red-50 text-red-700 border-l-4 border-red-500 p-3 mt-1 w-full">
                      <span className="font-bold block text-xs uppercase text-red-400 mb-1">Correct Answer:</span>
                      <span className="font-bold text-black">{ans.correctAnswer}</span>
                    </div>
                  )}
                  
                    <div className="text-sm font-mono bg-blue-50 text-blur-700 border-l-4 border-blue-500 p-3 mt-1 w-full">
                      <span className="font-bold block text-xs uppercase text-blue-400 mb-1">Explanation:</span>
                      <span className="text-black">{ans.explanation}</span>
                    </div>
                </div>

              </div>
            );
          })}
        </div>

        <Link href={`/quiz/${result.quizSlug}`}>
          <button className="w-full bg-black text-white font-bold py-4 hover:bg-yellow-400 hover:text-black border-2 border-transparent hover:border-black transition-colors">
            BACK TO BRIEFING ROOM
          </button>
        </Link>

      </div>
    </main>
  );
}