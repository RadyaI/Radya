import { format } from 'date-fns'
import { Calendar, ChevronRight, Eye } from 'lucide-react'
import Link from 'next/link'

export default function AttemptHistoryList({ history }: { history: any[] }) {
  if (history.length === 0) return null

  return (
    <div className="mt-8 bg-zinc-900/30 border border-white/5 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-zinc-400" />
        Attempt History
      </h3>
      <div className="custom-scrollbar space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-700">
        {history.map((attempt) => (
          <Link 
            key={attempt.id} 
            href={`/learning/quiz/${attempt.quizId}/result?attemptId=${attempt.id}`}
            className="group flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500 group-hover:text-blue-200/70 transition-colors">
                {attempt.completedAt?.seconds 
                  ? format(new Date(attempt.completedAt.seconds * 1000), 'dd MMM yyyy, HH:mm') 
                  : 'Just now'}
              </span>
              
              {attempt.status !== 'graded' && !attempt.correctAnswers && attempt.correctAnswers !== 0 ? (
                 <span className="text-sm font-medium text-yellow-500 flex items-center gap-1">
                    Pending Review
                 </span>
              ) : (
                 <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                    Score: {attempt.score}
                 </span>
              )}
            </div>

            <div className="flex items-center gap-3">
                <div className={`text-lg font-bold ${
                    attempt.status !== 'graded' && !attempt.correctAnswers && attempt.correctAnswers !== 0
                        ? 'text-yellow-500' 
                        : attempt.score >= 80 ? 'text-green-400' : attempt.score >= 60 ? 'text-blue-400' : 'text-zinc-500'
                }`}>
                  {attempt.score}
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}