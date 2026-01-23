import { useState, useCallback } from 'react'
import { db } from '@/utils/firebase'
import { doc, getDoc, collection, query, where, getDocs, orderBy, addDoc, serverTimestamp } from 'firebase/firestore'
import toast from 'react-hot-toast'

export const useQuiz = (quizId?: string) => {
  const [loading, setLoading] = useState(false)

  const getQuizDetail = useCallback(async (idOverride?: string) => {
    const targetId = idOverride || quizId
    if (!targetId) return null
    
    setLoading(true)
    try {
      const docSnap = await getDoc(doc(db, 'quizzes', targetId))
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      }
      return null
    } catch (error) {
      console.error(error)
      return null
    } finally {
      setLoading(false)
    }
  }, [quizId])

  const getQuizHistory = useCallback(async (userId: string) => {
    if (!quizId || !userId) return []
    try {
      const q = query(
        collection(db, 'quiz_attempts'),
        where('userId', '==', userId),
        where('quizId', '==', quizId),
        orderBy('completedAt', 'desc')
      )
      const snap = await getDocs(q)
      return snap.docs.map(d => ({ id: d.id, ...d.data() }))
    } catch (error) {
      console.error(error)
      return []
    }
  }, [quizId])

  const getAttemptDetail = useCallback(async (attemptId: string) => {
    setLoading(true)
    try {
      const docSnap = await getDoc(doc(db, 'quiz_attempts', attemptId))
      if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() }
      return null
    } catch (error) {
      console.error(error)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const submitQuiz = async (userId: string, email: string, displayName: string, quizData: any, score: number, correct: number, answers: any) => {
    try {
      const docRef = await addDoc(collection(db, 'quiz_attempts'), {
        quizId: quizData.id,
        userId,
        email,
        displayName,
        score,
        totalQuestions: quizData.questions.length,
        correctAnswers: correct,
        answers,
        completedAt: serverTimestamp()
      })
      return docRef.id
    } catch (error) {
      toast.error('Failed to save result')
      throw error
    }
  }

  return { loading, getQuizDetail, getQuizHistory, getAttemptDetail, submitQuiz }
}