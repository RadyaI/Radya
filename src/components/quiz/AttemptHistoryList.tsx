import { format } from 'date-fns'
import { Calendar } from 'lucide-react'

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
          <div key={attempt.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500">
                {attempt.completedAt?.seconds 
                  ? format(new Date(attempt.completedAt.seconds * 1000), 'dd MMM yyyy, HH:mm') 
                  : 'Just now'}
              </span>
              <span className="text-sm font-medium text-zinc-300">
                Correct: {attempt.correctAnswers} / {attempt.totalQuestions}
              </span>
            </div>
            <div className={`text-lg font-bold ${attempt.score >= 80 ? 'text-green-400' : attempt.score >= 60 ? 'text-blue-400' : 'text-zinc-500'}`}>
              {attempt.score}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}