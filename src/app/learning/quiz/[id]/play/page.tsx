'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useLearning } from '@/hooks/useLearning'
import { useQuiz } from '@/hooks/useQuiz'
import { useAntiCheat } from '@/hooks/useAntiCheat'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, CheckCircle, ChevronRight, Code, Loader2 } from 'lucide-react'
import BackgroundEffects from '@/components/learning/UI/BackgroundEffects'
import toast, { Toaster } from 'react-hot-toast'

export default function PlayQuizPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useLearning()
  const { getQuizDetail, submitQuiz, loading: quizLoading } = useQuiz(id as string)

  const [quiz, setQuiz] = useState<any>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useAntiCheat(!!quiz && !isSubmitting)

  useEffect(() => {
    if (!id || !user) return

    getQuizDetail().then(data => {
      if (data) {
        setQuiz(data)
        if ((data as any).timeLimit > 0) setTimeLeft((data as any).timeLimit)
      } else {
        router.push('/learning/quiz')
      }
    })
  }, [id, user, getQuizDetail, router])

  const handleFinish = useCallback(async () => {
    if (isSubmitting || !user || !quiz) return
    setIsSubmitting(true)

    let correctCount = 0
    quiz.questions.forEach((q: any, idx: number) => {
      const selectedOptionIdx = answers[idx]
      if (selectedOptionIdx !== undefined && q.options[selectedOptionIdx].isCorrect) {
        correctCount++
      }
    })

    const finalScore = Math.round((correctCount / quiz.questions.length) * 100)

    try {
      const attemptId = await submitQuiz(
        user.uid,
        quiz,
        finalScore,
        correctCount,
        answers
      )

      router.replace(`/learning/quiz/${id}/result?attemptId=${attemptId}`)

    } catch (e) {
      setIsSubmitting(false)
    }
  }, [answers, isSubmitting, quiz, user, submitQuiz, id, router])

  useEffect(() => {
    if (!quiz || quiz.timeLimit === 0 || isSubmitting) return
    if (timeLeft <= 0) {
      handleFinish()
      return
    }
    const timer = setInterval(() => setTimeLeft(p => p - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft, quiz, isSubmitting, handleFinish])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  if (quizLoading || !quiz) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  )

  const currentQ = quiz.questions[currentIndex]

  const getDirectImageUrl = (url: string) => {
    if (!url) return ''

    const idRegex = /\/d\/(.*?)(?:\/|$)|id=(.*?)(?:&|$)/;
    const match = url.match(idRegex);
    const id = match ? (match[1] || match[2]) : null;

    if (id) {
      return `https://lh3.googleusercontent.com/d/${id}`
    }

    return url
  }

  return (
    <>
      <div className="min-h-screen bg-black relative flex flex-col select-none">
        <BackgroundEffects />

        <div className="relative z-20 px-4 py-6 flex items-center justify-between max-w-5xl mx-auto w-full">
          <div className="text-sm font-mono text-zinc-400">
            Question <span className="text-white font-bold">{currentIndex + 1}</span> / {quiz.questions.length}
          </div>
          {quiz.timeLimit > 0 && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${timeLeft < 30 ? 'bg-red-500/10 border-red-500/50 text-red-500 animate-pulse' : 'bg-zinc-900 border-zinc-700 text-white'}`}>
              <Clock className="w-4 h-4" />
              <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>

        <div className="h-1 w-full bg-zinc-900 fixed top-0 left-0 z-50">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10 max-w-4xl mx-auto w-full">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-relaxed">
                {currentQ.question}
              </h2>

              {currentQ.imageUrl && (
                <div className="mb-6 rounded-2xl overflow-hidden border border-white/10 max-h-[300px] w-fit mx-auto bg-black/50">
                  <img
                    src={getDirectImageUrl(currentQ.imageUrl)}
                    alt="Question Reference"

                    referrerPolicy="no-referrer"

                    className="object-contain h-full max-h-[300px]"
                    onError={(e) => {
                      console.error("Gagal load gambar:", e.currentTarget.src)
                      e.currentTarget.style.display = 'none'
                      toast.error('Gambar rusak/tidak public')
                    }}
                  />
                </div>
              )}

              {currentQ.codeSnippet && (
                <div className="mb-8 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950/80 relative group">
                  <div className="absolute top-3 right-3 opacity-50"><Code className="w-5 h-5 text-zinc-500" /></div>
                  <pre className="p-4 overflow-x-auto text-sm font-mono text-green-400 scrollbar-thin scrollbar-thumb-zinc-800">
                    <code>{currentQ.codeSnippet}</code>
                  </pre>
                </div>
              )}

              <div className="grid grid-cols-1 gap-3 mb-10">
                {currentQ.options.map((opt: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setAnswers(prev => ({ ...prev, [currentIndex]: idx }))}
                    className={`relative p-5 rounded-2xl text-left transition-all border group ${answers[currentIndex] === idx
                      ? 'bg-blue-600 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                      : 'bg-zinc-900/40 border-white/10 hover:bg-zinc-800 hover:border-white/20'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold transition-colors ${answers[currentIndex] === idx ? 'bg-white text-blue-600 border-white' : 'border-zinc-600 text-zinc-500 group-hover:border-zinc-400 group-hover:text-zinc-300'
                        }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className={`text-lg ${answers[currentIndex] === idx ? 'text-white font-semibold' : 'text-zinc-300'}`}>
                        {opt.text}
                      </span>
                    </div>
                    {answers[currentIndex] === idx && (
                      <motion.div layoutId="check" className="absolute right-5 top-1/2 -translate-y-1/2">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="p-6 border-t border-white/5 bg-black/50 backdrop-blur-md sticky bottom-0 z-20">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="px-6 py-3 rounded-xl text-zinc-400 font-medium hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
            >
              Previous
            </button>

            {currentIndex === quiz.questions.length - 1 ? (
              <button
                onClick={handleFinish}
                disabled={isSubmitting}
                className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold shadow-lg shadow-green-900/20 transition-all flex items-center gap-2"
              >
                {isSubmitting ? 'Submitting...' : 'Finish Quiz'}
                {!isSubmitting && <CheckCircle className="w-5 h-5" />}
              </button>
            ) : (
              <button
                onClick={() => setCurrentIndex(prev => prev + 1)}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2"
              >
                Next Question
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
      <Toaster position='top-right' />
    </>
  )
}