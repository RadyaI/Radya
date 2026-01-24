'use client'

import { motion } from 'framer-motion'
import { Eye, Clock, Trophy, ArrowRight, Edit2, FileText, ListChecks } from 'lucide-react'
import Link from 'next/link'
import { useLearning } from '@/hooks/useLearning'
import { isAdmin } from '@/utils/admins'

interface QuizProps {
  id: string
  title: string
  description: string
  category: string
  difficulty: string
  timeLimit: number
  questionCount: number
  type?: string
}

export default function QuizCard({ data, index }: { data: QuizProps, index: number }) {
  const { user } = useLearning()

  const difficultyColor = {
    Easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    Hard: 'text-red-400 bg-red-400/10 border-red-400/20',
    Expert: 'text-purple-400 bg-purple-400/10 border-purple-400/20'
  }[data.difficulty] || 'text-zinc-400 bg-zinc-400/10'

  const isEssay = data.type === 'essay'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 hover:border-blue-500/30 rounded-3xl p-6 overflow-hidden transition-all hover:bg-zinc-900/60 flex flex-col h-full"
    >
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-[50px] group-hover:bg-blue-500/30 transition-all pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-bold tracking-wider text-blue-500 uppercase bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-500/20">
            {data.category}
          </span>
          <div className="flex gap-2">
            <span className={`text-xs font-medium px-2 py-1 rounded-lg border flex items-center gap-1 ${isEssay ? 'text-blue-300 bg-blue-500/10 border-blue-500/20' : 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20'}`}>
              {isEssay ? <FileText className="w-3 h-3" /> : <ListChecks className="w-3 h-3" />}
            </span>
            <span className={`text-xs font-medium px-2 py-1 rounded-lg border ${difficultyColor}`}>
              {data.difficulty}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
          {data.title}
        </h3>
        <p className="text-sm text-zinc-400 mb-6 line-clamp-2 flex-1">
          {data.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono mb-6">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {data.timeLimit > 0 ? `${Math.ceil(data.timeLimit / 60)}m` : '∞'}
          </div>
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" />
            {data.questionCount} Qs
          </div>
        </div>

        <div className="flex gap-3 mt-auto">
          <Link
            href={`/learning/quiz/${data.id}`}
            className="flex-1 py-3 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-95 transition-all shadow-lg hover:shadow-white/20"
          >
            Start Challenge
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {user && isAdmin(user.email) && (
            <div className="flex gap-2">
              <Link
                href={`/learning/quiz/manage/${data.id}/results`}
                className="px-4 py-3 bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 border border-blue-500/30 rounded-xl transition-all flex items-center justify-center"
                title="Monitor Results"
              >
                <Eye className="w-5 h-5" />
              </Link>
              <Link
                href={`/learning/quiz/manage/${data.id}`}
                className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl border border-zinc-700 transition-all flex items-center justify-center"
                title="Edit Quiz"
              >
                <Edit2 className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}