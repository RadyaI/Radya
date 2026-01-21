'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuiz } from '@/hooks/useQuiz'
import { db } from '@/utils/firebase'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { Loader2, CheckCircle, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export default function QuizResultsList() {
  const { id } = useParams()
  const { getQuizDetail } = useQuiz(id as string)
  const [attempts, setAttempts] = useState<any[]>([])
  const [quiz, setQuiz] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
        const qData = await getQuizDetail()
        setQuiz(qData)

        const q = query(
            collection(db, 'quiz_attempts'), 
            where('quizId', '==', id),
            orderBy('completedAt', 'desc')
        )
        const snap = await getDocs(q)
        setAttempts(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        setLoading(false)
    }
    fetchData()
  }, [id])

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>

  return (
    <div className="min-h-screen bg-black p-8 text-white">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">Grading Dashboard</h1>
            <p className="text-zinc-400 mb-8">Results for: <span className="text-white font-bold">{quiz?.title}</span></p>

            <div className="space-y-4">
                {attempts.map((att) => (
                    <div key={att.id} className="bg-zinc-900 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-xs text-zinc-500 mb-1">User ID: {att.userId}</p>
                            <p className="text-xs text-zinc-500">
                                Submitted: {att.completedAt ? format(new Date(att.completedAt.seconds * 1000), 'dd MMM HH:mm') : '-'}
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                {att.status === 'graded' ? (
                                    <span className="flex items-center gap-1 text-green-400 text-sm font-bold">
                                        <CheckCircle className="w-4 h-4" /> {att.score} Points
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                                        <Clock className="w-4 h-4" /> Pending Review
                                    </span>
                                )}
                            </div>
                            
                            <Link 
                                href={`/learning/quiz/manage/grade/${att.id}`}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold text-sm flex items-center gap-2 transition-all"
                            >
                                Grade <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}