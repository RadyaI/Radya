import { useState } from 'react'
import { db } from '@/utils/firebase'
import { collection, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export const useAdminQuiz = () => {
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const createQuiz = async (data: any, userEmail: string) => {
    setSaving(true)
    try {
      await addDoc(collection(db, 'quizzes'), {
        ...data,
        createdBy: userEmail,
        createdAt: serverTimestamp()
      })
      toast.success('Quiz Created! 🎉')
      router.push('/learning/quiz')
    } catch (error) {
      console.error(error)
      toast.error('Error creating quiz')
    } finally {
      setSaving(false)
    }
  }

  const updateQuiz = async (id: string, data: any) => {
    setSaving(true)
    try {
      const cleanData = JSON.parse(JSON.stringify(data))
      
      await updateDoc(doc(db, 'quizzes', id), {
        ...cleanData,
        updatedAt: serverTimestamp()
      })
      toast.success('Quiz Updated! 📝')
      router.push('/learning/quiz')
    } catch (error) {
      console.error(error)
      toast.error('Error updating quiz')
    } finally {
      setSaving(false)
    }
  }

  const deleteQuiz = async (id: string) => {
    if (!confirm('Are you sure? This cannot be undone.')) return
    try {
      await deleteDoc(doc(db, 'quizzes', id))
      toast.success('Quiz Deleted 🗑️')
      router.push('/learning/quiz')
      router.refresh()
    } catch (error) {
      toast.error('Error deleting quiz')
    }
  }

  return { saving, createQuiz, updateQuiz, deleteQuiz }
}