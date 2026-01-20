'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useQuiz } from '@/hooks/useQuiz'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Trophy, RefreshCcw, Home, XCircle, CheckCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import BackgroundEffects from '@/components/learning/UI/BackgroundEffects'
import QuizReviewModule from '@/components/quiz/QuizReviewModule'

export default function QuizResultPage() {
  const params = useSearchParams()
  const router = useRouter()
  const attemptId = params.get('attemptId')

  const { getAttemptDetail, getQuizDetail } = useQuiz()

  const [attempt, setAttempt] = useState<any>(null)
  const [quiz, setQuiz] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      if (!attemptId) return

      const attData = await getAttemptDetail(attemptId)
      if (attData) {
        setAttempt(attData)
        const quizData = await getQuizDetail((attData as any).quizId)
        if (quizData) setQuiz(quizData)
      }
      setLoading(false)
    }
    loadData()
  }, [attemptId, getAttemptDetail, getQuizDetail])

  useEffect(() => {
    if (attempt && attempt.score >= 80) {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } })
    }
  }, [attempt])

  if (loading || !attempt || !quiz) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  )

  const score = attempt.score

  return (
    <div className="min-h-screen bg-black relative flex flex-col items-center p-4">
      <BackgroundEffects />

      <div className="max-w-3xl w-full relative z-10 pt-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center shadow-2xl mb-8"
        >
          <div className="relative w-40 h-40 mx-auto mb-8 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                strokeWidth="8"
                stroke="#27272a"
              />
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                strokeWidth="8"
                stroke={score >= 80 ? '#4ade80' : score >= 50 ? '#3b82f6' : '#ef4444'}
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * score) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="flex flex-col">
              <span className="text-5xl font-black text-white">{score}</span>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Score</span>
            </div>
          </div>

          <h2 className={`text-xl font-bold mb-2 ${score >= 80 ? 'text-green-400' : 'text-white'}`}>
            {score >= 80 ? 'Excellent! 🔥' : score >= 60 ? 'Good Job! 👍' : 'Keep Trying! 💪'}
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-8 max-w-sm mx-auto">
            <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-xl flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-400 font-bold">{attempt.correctAnswers} Correct</span>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex items-center justify-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-400 font-bold">{attempt.totalQuestions - attempt.correctAnswers} Wrong</span>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Link
              href="/learning/quiz"
              className="py-3 px-6 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold flex items-center gap-2 transition-all"
            >
              <Home className="w-4 h-4" /> Dashboard
            </Link>
            <button
              onClick={() => router.push(`/learning/quiz/${quiz.id}`)}
              className="py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20 transition-all"
            >
              <RefreshCcw className="w-4 h-4" /> Retry
            </button>
          </div>
        </motion.div>

        <QuizReviewModule
          questions={quiz.questions}
          userAnswers={attempt.answers}
        />
      </div>
    </div>
  )
}