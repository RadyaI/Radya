'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useLearning } from '@/hooks/useLearning'
import { useQuiz } from '@/hooks/useQuiz'
import { motion } from 'framer-motion'
import { Play, Clock, Trophy, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import BackgroundEffects from '@/components/learning/UI/BackgroundEffects'
import AttemptHistoryList from '../../../../components/quiz1/AttemptHistoryList'

export default function QuizPreStartPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user, loading: authLoading } = useLearning()
  const { getQuizDetail, getQuizHistory, loading: quizLoading } = useQuiz(id as string)

  const [quiz, setQuiz] = useState<any>(null)
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    if (!id || authLoading) return

    getQuizDetail().then(data => {
      if (data) setQuiz(data)
      else router.push('/learning/quiz')
    })

    if (user) {
      getQuizHistory(user.uid).then(setHistory)
    }
  }, [id, user, authLoading, router, getQuizDetail, getQuizHistory])

  const handleStart = () => {
    if (!user) return router.push('/learning/quiz')
    router.push(`/learning/quiz/${id}/play`)
  }

  if (authLoading || quizLoading || !quiz) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  )

  const bestScore = history.length > 0 ? Math.max(...history.map(h => h.score)) : null

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center p-4">
      <BackgroundEffects />
      
      <div className="max-w-2xl w-full relative z-10 py-10">
        <Link href="/learning/quiz" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden relative"
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-500/20">
                {quiz.category} • {quiz.difficulty}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                {quiz.title}
              </h1>
            </div>
            {bestScore !== null && (
              <div className="text-right">
                <p className="text-xs text-zinc-500 uppercase tracking-wide">Best Score</p>
                <div className="text-3xl font-black text-green-400">{bestScore}</div>
              </div>
            )}
          </div>

          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            {quiz.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-black/30 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">{quiz.questions?.length || 0}</div>
                <div className="text-xs text-zinc-500">Questions</div>
              </div>
            </div>
            <div className="bg-black/30 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">
                  {quiz.timeLimit > 0 ? `${Math.ceil(quiz.timeLimit / 60)}m` : '∞'}
                </div>
                <div className="text-xs text-zinc-500">Time Limit</div>
              </div>
            </div>
          </div>

          {!user ? (
             <div className="text-center">
               <p className="text-zinc-500 mb-2">Please login to start</p>
               <button onClick={() => router.push("/learning")} className="w-full py-4 bg-zinc-800 rounded-xl text-zinc-500 font-bold cursor-not-allowed">
                 Login Required
               </button>
             </div>
          ) : (
            <button 
              onClick={handleStart}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 transition-all flex items-center justify-center gap-2 group"
            >
              Start Challenge
              <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform fill-current" />
            </button>
          )}

          <AttemptHistoryList history={history} />
        </motion.div>
      </div>
    </div>
  )
}