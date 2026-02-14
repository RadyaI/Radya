"use client";
import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { quizData } from '@/utils/quiz-data';
import { saveQuizResult } from '@/utils/quiz/firebase-quiz';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowLeft, ArrowRight, CheckCircle, Disc, PenTool } from 'lucide-react';
import NoiseBackground from '@/components/quiz/ui/NoiseBackground';
import ThemeToggle from '@/components/quiz/ui/ThemeToggle';
import { useAntiCheat } from '@/hooks/useAntiCheat';
import { Toaster } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

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

  useAntiCheat(true)

  const markdownComponents = {
    pre: ({ node, ...props }: any) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto my-4 font-mono text-sm shadow-md border-l-4 border-yellow-500 text-left" {...props} />
    ),
    code: ({ node, inline, className, children, ...props }: any) => {
      if (inline) {
        return (
          <code className="bg-gray-200 text-red-600 px-1.5 py-0.5 rounded-md font-mono text-sm font-bold" {...props}>
            {children}
          </code>
        );
      }
      return <code className="bg-transparent font-mono text-inherit" {...props}>{children}</code>;
    },
    p: ({ node, ...props }: any) => <p className="mb-2 last:mb-0" {...props} />,
    ul: ({ node, ...props }: any) => <ul className="list-disc pl-5 space-y-1 my-2" {...props} />,
    ol: ({ node, ...props }: any) => <ol className="list-decimal pl-5 space-y-1 my-2" {...props} />,
  };

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

  const handleAnswerChange = (val: string) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = val;
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

    try {
      const formattedAnswers = quiz.questions.map((q, idx) => {
        const userAnswer = answers[idx] || "Skipped";
        let isCorrect = false;
        let correctAnswerText = "";

        if (q.type === 'essay') {
          const userString = String(userAnswer).toLowerCase().trim();
          const keyString = (q.answerKey || "").toLowerCase().trim();

          isCorrect = userString === keyString;
          correctAnswerText = q.answerKey || "";
        } else {
          const correctOpt = q.options && q.correctIndex !== undefined
            ? q.options[q.correctIndex]
            : "";

          isCorrect = userAnswer === correctOpt;
          correctAnswerText = correctOpt || "";
        }

        return {
          questionId: q.id,
          selectedOption: userAnswer,
          isCorrect: isCorrect,
          correctAnswer: correctAnswerText,

          explanation: q.explanation || null,

          type: q.type || "multiple-choice"
        };
      });

      const scorableQuestions = quiz.questions.filter(q => q.type !== 'essay');

      const correctCount = formattedAnswers.filter(a => {
        const originalQ = quiz.questions.find(q => q.id === a.questionId);
        return originalQ?.type !== 'essay' && a.isCorrect;
      }).length;

      const finalScore = scorableQuestions.length > 0
        ? Math.round((correctCount / scorableQuestions.length) * 100)
        : 0;

      const resultId = await saveQuizResult(
        user.uid,
        user.displayName,
        user.email,
        slug as string,
        finalScore,
        quiz.questions.length,
        formattedAnswers
      );

      if (resultId) {
        router.push(`/quiz/${slug}/result?id=${resultId}`);
      } else {
        setIsSubmitting(false);
      }

    } catch (error) {
      console.error("Error submitting quiz:", error);
      setIsSubmitting(false);
    }
  };

  if (!quiz) return <div className="p-10 font-mono">Loading...</div>;

  const progress = ((currentIndex + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentIndex === quiz.questions.length - 1;
  const currentQuestion = quiz.questions[currentIndex];
  const currentAnswer = answers[currentIndex];

  const theme = isDark ? "bg-[#111] text-white" : "bg-[#f4f3ef] text-black";
  const cardBg = isDark ? "bg-[#1a1a1a] border-white" : "bg-white border-black";
  const optionDefault = isDark ? "border-white/20 hover:bg-white/10" : "border-black/20 hover:bg-yellow-50";
  const optionSelected = isDark ? "bg-white text-black border-white" : "bg-black text-white border-black";

  const inputStyle = isDark
    ? "bg-[#111] text-white border-white focus:border-green-400 placeholder-gray-600"
    : "bg-gray-50 text-black border-black focus:border-yellow-500 placeholder-gray-400";

  return (
    <main ref={containerRef} className={`min-h-screen flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden transition-colors duration-300 ${theme}`}>
      <NoiseBackground />
      <Toaster position="top-right" />
      <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />

      <div className="fixed top-0 left-0 w-full h-2 bg-none z-50">
        <div className={`h-full transition-all duration-500 ease-out ${isDark ? 'bg-green-300' : 'bg-black'}`} style={{ width: `${progress}%` }} />
      </div>

      <div className="w-full max-w-3xl relative z-10">

        <div className="flex justify-between items-end mb-8 font-mono font-bold">
          <div className="flex flex-col">
            <span className="text-xs opacity-60 tracking-widest mb-1">QUESTION</span>
            <span className="text-xl">0{currentIndex + 1} <span className="opacity-40">/ {quiz.questions.length}</span></span>
          </div>
          <div className={`px-3 py-1 border text-xs tracking-widest flex items-center gap-2 ${isDark ? 'border-white' : 'border-black'}`}>
            {currentQuestion.type === 'essay' ? <PenTool size={12} /> : <Disc size={12} />}
            {currentQuestion.type === 'essay' ? 'ESSAY' : 'CHOICE'}
          </div>
        </div>

        <div className={`question-card border-4 p-8 md:p-12 shadow-[12px_12px_0_0_rgba(0,0,0,0.1)] relative ${cardBg}`}>
          <div className="select-none text-xl md:text-2xl font-serif font-black leading-relaxed mb-10 text-left">
            <ReactMarkdown components={markdownComponents}>
              {currentQuestion.q}
            </ReactMarkdown>
          </div>

          {currentQuestion.type === 'essay' ? (
            <div className="relative">
              <textarea
                value={currentAnswer || ""}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="Type your answer strictly here..."
                rows={4}
                className={`w-full p-5 border-2 font-mono font-bold text-lg outline-none transition-all resize-none shadow-inner ${inputStyle}`}
                spellCheck={false}
              />
              <div className="mt-2 text-xs font-mono opacity-50 text-right">
                {currentAnswer ? currentAnswer.length : 0} chars
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {currentQuestion.options?.map((opt, idx) => {
                const isSelected = currentAnswer === opt;
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerChange(opt)}
                    className={`select-none w-full text-left p-5 border-2 font-mono font-bold text-md transition-all flex justify-between items-center group ${isSelected ? optionSelected : optionDefault}`}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <span className={`w-8 h-8 flex-shrink-0 flex items-center justify-center border rounded-full text-sm ${isSelected ? (isDark ? 'border-black' : 'border-white') : (isDark ? 'border-white' : 'border-black')}`}>
                        {String.fromCharCode(65 + idx)}
                      </span>

                      <div className="text-left flex-1 min-w-0">
                        <ReactMarkdown components={markdownComponents}>
                          {opt}
                        </ReactMarkdown>
                      </div>
                    </div>
                    {isSelected && <CheckCircle size={20} />}
                  </button>
                );
              })}
            </div>
          )}
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
            disabled={!currentAnswer || currentAnswer.trim() === "" || isSubmitting}
            className={`flex items-center gap-2 font-mono font-bold px-8 py-3 border-2 transition-all shadow-[6px_6px_0_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed ${isDark
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