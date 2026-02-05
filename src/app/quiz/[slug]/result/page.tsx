"use client";
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getQuizResultById } from '@/utils/quiz/firebase-quiz';
import { quizData } from '@/utils/quiz-data';
import NoiseBackground from '@/components/quiz/ui/NoiseBackground';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import ResultHeader from '@/components/quiz/result/ResultHeader';
import ScoreSection from '@/components/quiz/result/ScoreSection';
import AnswerList from '@/components/quiz/result/AnswerList';

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
  const hasEssay = currentQuizData?.questions.some(q => q.type === 'essay');

  return (
    <main ref={containerRef} className="min-h-screen p-6 md:p-12 bg-[#f4f3ef] text-black font-sans relative">
      <NoiseBackground />

      <div className="max-w-3xl mx-auto bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] p-8 md:p-12 relative min-h-[80vh]">

        <ResultHeader
          result={result}
          currentQuizData={currentQuizData}
          passed={passed}
        />

        <ScoreSection
          score={result.score}
          hasEssay={!!hasEssay}
        />

        <AnswerList
          result={result}
          answers={result.answers}
          currentQuizData={currentQuizData}
        />

        <Link href={`/quiz/${result.quizSlug}`}>
          <button className="w-full bg-black text-white font-bold py-4 hover:bg-yellow-400 hover:text-black border-2 border-transparent hover:border-black transition-colors">
            BACK TO BRIEFING ROOM
          </button>
        </Link>

      </div>
    </main>
  );
}