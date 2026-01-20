'use client'

import { useState, useEffect } from 'react'
import { Search, BrainCircuit, Plus, Loader2 } from 'lucide-react'
import { useLearning } from '@/hooks/useLearning'
import { isAdmin } from '@/utils/admins'
import { db } from '@/utils/firebase'
import { collection, query, getDocs, orderBy } from 'firebase/firestore'
import Link from 'next/link'
import BackgroundEffects from '@/components/learning/UI/BackgroundEffects'
import QuizCard from '@/components/quiz/QuizCard'

export default function QuizDashboard() {
  const { user, login, logout } = useLearning()
  const [quizzes, setQuizzes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const q = query(collection(db, 'quizzes'), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any))
        
        const filtered = isAdmin(user?.email) 
          ? data 
          : data.filter(d => d.isPublic)
          
        setQuizzes(filtered)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchQuizzes()
  }, [user])

  const filteredList = quizzes.filter(q => 
    q.title.toLowerCase().includes(search.toLowerCase()) || 
    q.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-black relative">
      <BackgroundEffects />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <BrainCircuit className="w-8 h-8 text-blue-500" />
              Skill Assessments
            </h1>
            <p className="text-zinc-400">Test your knowledge limits with rigorous challenges.</p>
          </div>

          {user && isAdmin(user.email) && (
            <Link 
              href="/learning/quiz/manage"
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-xl border border-zinc-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Quiz</span>
            </Link>
          )}
        </div>

        <div className="relative max-w-xl mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input 
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search for challenge..."
            className="w-full bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:border-blue-500/50 outline-none transition-all"
          />
        </div>

        {loading ? (
           <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-blue-500 animate-spin" /></div>
        ) : filteredList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredList.map((quiz, idx) => (
              <QuizCard 
                key={quiz.id} 
                data={{...quiz, questionCount: quiz.questions?.length || 0}} 
                index={idx} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
            <p className="text-zinc-500">No active challenges found.</p>
          </div>
        )}
      </div>
    </div>
  )
}