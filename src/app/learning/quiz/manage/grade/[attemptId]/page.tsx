'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQuiz } from '@/hooks/useQuiz'
import { useAdminQuiz } from '@/hooks/useAdminQuiz'
import { Loader2, Save, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

export default function GradingPage() {
  const { attemptId } = useParams()
  const router = useRouter()
  const { getAttemptDetail, getQuizDetail } = useQuiz()
  
  const { gradeAttempt, saving } = useAdminQuiz()
  
  const [attempt, setAttempt] = useState<any>(null)
  const [quiz, setQuiz] = useState<any>(null)
  const [finalScore, setFinalScore] = useState(0)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    const load = async () => {
        const att = await getAttemptDetail(attemptId as string)
        if (att) {
            setAttempt(att)
            setFinalScore((att as any).score || 0)
            setFeedback((att as any).adminFeedback || '')
            const q = await getQuizDetail((att as any).quizId)
            setQuiz(q)
        }
    }
    load()
  }, [attemptId])

  if (!attempt || !quiz) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>

  return (
    <div className="min-h-screen bg-black p-8 text-white pb-32">
        <div className="max-w-3xl mx-auto">
            <button onClick={() => router.back()} className="text-zinc-500 hover:text-white mb-4 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to List
            </button>
            <h1 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Manual Grading: {quiz.title}</h1>

            <div className="space-y-8">
                {quiz.questions.map((q: any, idx: number) => (
                    <div key={idx} className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl">
                        <p className="text-zinc-400 text-sm mb-2">Question {idx + 1}</p>
                        <h3 className="text-xl font-bold mb-4">{q.question}</h3>
                        
                        <div className="bg-black p-4 rounded-xl border border-white/5 mb-4">
                            <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">User Answer</p>
                            <p className="whitespace-pre-wrap text-blue-100">{attempt.answers[idx] || '-'}</p>
                        </div>

                        <div className="bg-green-900/20 p-4 rounded-xl border border-green-500/10">
                            <p className="text-xs text-green-500/70 mb-2 uppercase tracking-wider">Grading Key / Explanation</p>
                            <p className="text-green-400 text-sm">{q.explanation || 'No key provided'}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-white/10 p-4 z-50 shadow-2xl">
                <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-1 w-full">
                        <label className="text-xs text-zinc-400">Admin Feedback (Optional)</label>
                        <input 
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none"
                            placeholder="Example: Good analysis, but missed the SEO point."
                        />
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div>
                            <label className="text-xs text-zinc-400">Score (0-100)</label>
                            <input 
                                type="number" 
                                value={finalScore}
                                onChange={(e) => setFinalScore(parseInt(e.target.value))}
                                className="w-24 bg-black border border-white/10 rounded-lg px-3 py-2 text-xl font-bold text-white text-center focus:border-blue-500 outline-none"
                            />
                        </div>
                        <button 
                            onClick={() => {
                                if(finalScore < 0 || finalScore > 100) return toast.error('Score must be 0-100')
                                gradeAttempt(attemptId as string, finalScore, feedback)
                            }}
                            disabled={saving}
                            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                            Save Grade
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}