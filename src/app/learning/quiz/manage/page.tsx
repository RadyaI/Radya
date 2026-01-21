'use client'

import { useLearning } from '@/hooks/useLearning'
import { isAdmin } from '@/utils/admins'
import AdminQuizForm from '@/components/quiz/AdminQuizForm'
import { ShieldAlert, Loader2 } from 'lucide-react'
import Link from 'next/link'
import BackgroundEffects from '@/components/learning/UI/BackgroundEffects'
import { Toaster } from 'react-hot-toast'

export default function ManageQuizPage() {
  const { user, loading } = useLearning()

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  )

  if (!user || !isAdmin(user.email)) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center">
        <BackgroundEffects />
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
          <ShieldAlert className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Restricted Access</h1>
        <p className="text-zinc-400 max-w-md mb-8">
          This area is classified. Only authorized personnel with clearance level 5 (Admins) can enter.
        </p>
        <Link href="/learning/quiz" className="bg-white text-black px-6 py-2 rounded-full font-medium hover:scale-105 transition-transform">
          Return to Safety
        </Link>
      </div>
    )
  }

  return (
    <>
    <Toaster position='top-right' />
      <div className="min-h-screen bg-black relative">
        <BackgroundEffects />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 relative z-10">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 mb-2">
              Quiz Command Center
            </h1>
            <p className="text-zinc-400">Create rigorous assessments to test their limits.</p>
          </div>
          <AdminQuizForm userEmail={user.email!} />
        </div>
      </div>
    </>
  )
}