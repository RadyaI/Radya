'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuiz } from '@/hooks/useQuiz'
import AdminQuizForm from '@/components/quiz1/AdminQuizForm'
import { Loader2 } from 'lucide-react'
import BackgroundEffects from '@/components/learning/UI/BackgroundEffects'
import { Toaster } from 'react-hot-toast'

export default function EditQuizPage() {
  const { id } = useParams()
  const { getQuizDetail, loading } = useQuiz()
  const [initialData, setInitialData] = useState<any>(null)

  useEffect(() => {
    if (id) {
      getQuizDetail(id as string).then(data => {
        if (data) setInitialData(data)
      })
    }
  }, [id, getQuizDetail])

  if (loading || !initialData) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-500" />
    </div>
  )

  return (
    <>
    <Toaster position='top-right' />
      <div className="min-h-screen bg-black relative">
        <BackgroundEffects />
        <div className="max-w-5xl mx-auto px-4 py-12 relative z-10">
          <h1 className="text-3xl text-white font-bold mb-8">Edit Quiz</h1>
          <AdminQuizForm userEmail="admin" initialData={initialData} isEditMode={true} />
        </div>
      </div>
    </>
  )
}