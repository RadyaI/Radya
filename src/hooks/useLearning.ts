import { useState, useEffect } from 'react'
import { auth, db } from '@/utils/firebase'
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  User 
} from 'firebase/auth'
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  Query
} from 'firebase/firestore'
import toast from 'react-hot-toast'

export interface LearningPlan {
  id: string
  title: string
  description: string
  category: string
  status: 'planned' | 'in_progress' | 'completed' | 'on_hold'
  progress: number
  userId: string
  createdAt: any
}

export const useLearning = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [plans, setPlans] = useState<LearningPlan[]>([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!user) {
      setPlans([])
      return
    }

    let q: Query;

    if (user.email === 'radyaiftikhar@gmail.com') {
      q = query(
        collection(db, 'learning_plans'),
        orderBy('createdAt', 'desc')
      )
    } else {
      q = query(
        collection(db, 'learning_plans'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      )
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as LearningPlan[]
      setPlans(data)
    })

    return () => unsubscribe()
  }, [user])

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      toast.success('Welcome back!')
    } catch (error) {
      toast.error('Login failed')
    }
  }

  const logout = async () => {
    await signOut(auth)
    toast.success('Signed out')
  }

  const createPlan = async (title: string, description: string, category: string) => {
    if (!user) return
    try {
      await addDoc(collection(db, 'learning_plans'), {
        userId: user.uid,
        title,
        description,
        category,
        status: 'planned',
        progress: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      toast.success('New plan created!')
      return true
    } catch (error) {
      toast.error('Failed to create plan')
      return false
    }
  }

  return { user, loading, plans, login, logout, createPlan }
}