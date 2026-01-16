'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, LogIn, Search, Filter, X } from 'lucide-react'
import { useLearning } from '@/hooks/useLearning'

import PlanCard from '@/components/learning/PlanCard'
import CreateModal from '@/components/learning/CreateModal'
import HeaderDashboard from '@/components/learning/dashboard/Header'
import ActivityStats from '@/components/learning/dashboard/ActivityStats'

import BackgroundEffects from '@/components/learning/UI/BackgroundEffects'
import CursorFollower from '@/components/learning/UI/CursorFollower'

const CATEGORIES = [
  "All Categories",
  "Frontend Development",
  "Backend & Database",
  "Fullstack Development",
  "Computer Science",
  "Data Science & AI",
  "DevOps & Cloud",
  "UI/UX Design",
  "Language & Writing",
  "Other"
]

export default function LearningDashboard() {
  const { user, loading, plans, login, logout, createPlan } = useLearning()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')

  const filteredPlans = useMemo(() => {
    return plans.filter(plan => {
      const matchesSearch = plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === 'All Categories' || plan.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [plans, searchQuery, selectedCategory])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mb-6 border border-blue-500/20">
          <Terminal className="w-10 h-10 text-blue-500" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Track Your <span className="text-blue-500">Growth</span>
        </h1>
        <p className="text-zinc-400 max-w-md mb-8 text-lg">
          Personalized learning management system to organize your studies, track progress, and achieve your goals.
        </p>
        <button
          onClick={login}
          className="group flex items-center gap-3 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95"
        >
          <LogIn className="w-5 h-5" />
          Continue with Google
        </button>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">

      <BackgroundEffects />
      <CursorFollower />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10">

        <HeaderDashboard
          user={user}
          onOpenModal={() => setIsModalOpen(true)}
          onLogout={logout}
        />

        <ActivityStats plans={plans} />

        <div className="bg-zinc-900/30 border border-white/5 p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="relative min-w-[200px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-8 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredPlans.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20"
          >
            {plans.length === 0 ? (
              <>
                <p className="text-zinc-500 mb-4">No learning plans yet. Start your journey!</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="cursor-pointer text-blue-500 hover:text-blue-400 text-sm font-medium"
                >
                  Create your first plan &rarr;
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <p className="text-zinc-400">No plans match your search.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All Categories') }}
                  className="text-blue-500 hover:text-blue-400 text-sm"
                >
                  Clear filters
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode='popLayout'>
              {filteredPlans.map((plan, idx) => (
                <PlanCard key={plan.id} data={plan} index={idx} />
              ))}
            </AnimatePresence>
          </div>
        )}

        <CreateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={createPlan}
        />
      </div>
    </div>
  )
}