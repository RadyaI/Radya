"use client";
import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { quizData } from '@/utils/quiz-data';
import { saveQuizResult } from '@/utils/quiz/firebase-quiz';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowLeft, ArrowRight, CheckCircle, Disc } from 'lucide-react';
import NoiseBackground from '@/components/quiz/ui/NoiseBackground';
import ThemeToggle from '@/components/quiz/ui/ThemeToggle';

export default function QuizPlay() {
  const { slug } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const containerRef = useRef(null);
  
  const quiz = quizData.find((q) => q.slug === slug);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]); 
  const [isDark, setIsDark] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (quiz) {
      setAnswers(new Array(quiz.questions.length).fill(null));
    }
  }, [quiz]);

  useGSAP(() => {
    gsap.fromTo(".question-card", 
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.5, ease: "back.out(1.2)" }
    );
  }, { scope: containerRef, dependencies: [currentIndex] });

  const handleSelectOption = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!quiz) return;
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!quiz || !user || isSubmitting) return;
    setIsSubmitting(true);

    const formattedAnswers = quiz.questions.map((q, idx) => ({
      questionId: q.id,
      selectedOption: answers[idx] || "Skipped",
      isCorrect: answers[idx] === q.options[q.correctIndex],
      correctAnswer: q.options[q.correctIndex]
    }));

    const correctCount = formattedAnswers.filter(a => a.isCorrect).length;
    const finalScore = Math.round((correctCount / quiz.questions.length) * 100);

    const resultId = await saveQuizResult(user.uid, user.displayName, user.email, slug as string, finalScore, quiz.questions.length, formattedAnswers);
    
    if (resultId) {
      router.push(`/quiz/${slug}/result?id=${resultId}`);
    } else {
      setIsSubmitting(false);
    }
  };

  if (!quiz) return <div className="p-10 font-mono">Loading...</div>;

  const progress = ((currentIndex + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentIndex === quiz.questions.length - 1;
  const currentQuestion = quiz.questions[currentIndex];
  const selectedOption = answers[currentIndex];

  const theme = isDark ? "bg-[#111] text-white" : "bg-[#f4f3ef] text-black";
  const cardBg = isDark ? "bg-[#1a1a1a] border-white" : "bg-white border-black";
  const optionDefault = isDark ? "border-white/20 hover:bg-white/10" : "border-black/20 hover:bg-yellow-50";
  const optionSelected = isDark ? "bg-white text-black border-white" : "bg-black text-white border-black";

  return (
    <main ref={containerRef} className={`min-h-screen flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden transition-colors duration-300 ${theme}`}>
      <NoiseBackground />
      <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />

      <div className="fixed top-0 left-0 w-full h-2 bg-gray-300 z-50">
         <div className={`h-full transition-all duration-500 ease-out ${isDark ? 'bg-white' : 'bg-black'}`} style={{ width: `${progress}%` }} />
      </div>

      <div className="w-full max-w-3xl relative z-10">
        
        <div className="flex justify-between items-end mb-8 font-mono font-bold">
           <div className="flex flex-col">
              <span className="text-xs opacity-60 tracking-widest mb-1">QUESTION</span>
              <span className="text-xl">0{currentIndex + 1} <span className="opacity-40">/ {quiz.questions.length}</span></span>
           </div>
           <div className={`px-3 py-1 border text-xs tracking-widest ${isDark ? 'border-white' : 'border-black'}`}>
              {quiz.category}
           </div>
        </div>

        <div className={`question-card border-4 p-8 md:p-12 shadow-[12px_12px_0_0_rgba(0,0,0,0.1)] relative ${cardBg}`}>
            <h2 className="text-2xl md:text-2xl font-serif font-black leading-relaxed mb-10">
                {currentQuestion.q}
            </h2>

            <div className="grid gap-4">
                {currentQuestion.options.map((opt, idx) => {
                    const isSelected = selectedOption === opt;
                    return (
                        <button
                            key={idx}
                            onClick={() => handleSelectOption(opt)}
                            className={`w-full text-left p-5 border-2 font-mono font-bold text-md transition-all flex justify-between items-center group ${isSelected ? optionSelected : optionDefault}`}
                        >
                            <div className="flex items-center gap-4">
                                <span className={`w-8 h-8 flex items-center justify-center border rounded-full text-sm ${isSelected ? (isDark ? 'border-black' : 'border-white') : (isDark ? 'border-white' : 'border-black')}`}>
                                    {String.fromCharCode(65 + idx)}
                                </span>
                                <span>{opt}</span>
                            </div>
                            {isSelected && <CheckCircle size={20} />}
                        </button>
                    );
                })}
            </div>
        </div>

        <div className="flex justify-between items-center mt-10">
            <button 
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 font-mono font-bold px-6 py-3 border-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed ${isDark ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}
            >
                <ArrowLeft size={18} /> PREV
            </button>

            <button 
                onClick={handleNext}
                disabled={!selectedOption || isSubmitting} 
                className={`flex items-center gap-2 font-mono font-bold px-8 py-3 border-2 transition-all shadow-[6px_6px_0_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDark 
                    ? 'bg-white text-black border-white hover:bg-gray-200' 
                    : 'bg-black text-white border-black hover:bg-yellow-400 hover:text-black'
                }`}
            >
                {isSubmitting ? (
                    "SAVING..." 
                ) : isLastQuestion ? (
                    <>FINISH <Disc size={18} className={isSubmitting ? "animate-spin" : ""} /></>
                ) : (
                    <>NEXT <ArrowRight size={18} /></>
                )}
            </button>
        </div>

      </div>
    </main>
  );
}