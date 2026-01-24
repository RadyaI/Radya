'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, LogIn, Search, Filter, X, Grid3X3 } from 'lucide-react'
import { useLearning } from '@/hooks/useLearning'
import gsap from 'gsap' 

import PlanCard from '@/components/learning/PlanCard'
import CreateModal from '@/components/learning/CreateModal'
import HeaderDashboard from '@/components/learning/dashboard/Header'
import ActivityStats from '@/components/learning/dashboard/ActivityStats'
import CursorFollower from '@/components/learning/UI/CursorFollower' 
import { Toaster } from 'react-hot-toast'

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
  
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loading && containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".pixel-item", {
          y: 30,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out" 
        })
      }, containerRef)
      return () => ctx.revert()
    }
  }, [loading, user])

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
      <div className="min-h-[80vh] flex flex-col items-center justify-center font-pixel">
        <div className="flex gap-2 mb-4">
           <div className="w-4 h-4 bg-white animate-bounce" style={{ animationDelay: '0s' }}></div>
           <div className="w-4 h-4 bg-white animate-bounce" style={{ animationDelay: '0.1s' }}></div>
           <div className="w-4 h-4 bg-white animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <p className="text-xl tracking-widest text-zinc-500">SYSTEM LOADING...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="font-pixel relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center">
        {}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        
        <CursorFollower />

        <div className="z-10 flex flex-col items-center justify-center text-center px-4 max-w-2xl">
          <div className="pixel-item w-20 h-20 bg-white text-black border-2 border-zinc-800 flex items-center justify-center mb-8 shadow-[8px_8px_0px_0px_#333]">
            <Terminal className="w-10 h-10" />
          </div>

          <h1 className="pixel-item text-6xl md:text-8xl mb-6 font-bold tracking-tight">
            LEARNING<br/><span className="text-blue-600">LOG_V2</span>
          </h1>
          
          <p className="pixel-item text-zinc-400 text-xl mb-10 max-w-lg leading-relaxed">
            Personalized system to track your engineering growth.
            Structured. Minimal. Effective.
          </p>

          <button
            onClick={login}
            className="pixel-item group relative flex items-center gap-4 bg-white text-black px-10 py-4 text-xl font-bold border-2 border-zinc-800 shadow-[6px_6px_0px_0px_#333] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#333] active:translate-y-[6px] active:shadow-none transition-all"
          >
            <LogIn className="w-6 h-6" />
            <span>INITIALIZE SESSION</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="font-pixel min-h-screen bg-[#050505] text-white pb-20">
      
      {}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <CursorFollower />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10">

        <div className="pixel-item">
           <HeaderDashboard
            user={user}
            onOpenModal={() => setIsModalOpen(true)}
            onLogout={logout}
          />
        </div>

        <div className="pixel-item">
          <ActivityStats plans={plans} />
        </div>

        {}
        <div className="pixel-item mb-8 flex flex-col md:flex-row gap-4 items-stretch">
          
          {}
          <div className="relative flex-1 group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors">
               <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="SEARCH PLANS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 bg-zinc-900 border-2 border-zinc-800 pl-12 pr-4 text-xl text-white placeholder-zinc-600 focus:outline-none focus:border-blue-600 focus:bg-black transition-colors uppercase"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {}
          <div className="relative min-w-[250px] group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500">
               <Filter className="w-5 h-5" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-14 bg-zinc-900 border-2 border-zinc-800 pl-12 pr-10 text-xl text-white focus:outline-none focus:border-blue-600 focus:bg-black appearance-none cursor-pointer uppercase"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat.toUpperCase()}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">▼</div>
          </div>
        </div>

        {}
        {filteredPlans.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pixel-item py-32 border-2 border-dashed border-zinc-800 bg-zinc-900/30 flex flex-col items-center justify-center text-center"
          >
            {plans.length === 0 ? (
              <>
                <Grid3X3 className="w-16 h-16 text-zinc-700 mb-4" />
                <p className="text-zinc-500 text-2xl mb-6">DATABASE EMPTY</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 text-white px-8 py-3 text-lg font-bold hover:bg-blue-500 transition-colors"
                >
                  CREATE FIRST PLAN
                </button>
              </>
            ) : (
              <>
                <p className="text-zinc-500 text-xl">NO DATA FOUND.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All Categories') }}
                  className="mt-4 text-blue-500 hover:text-blue-400 underline decoration-2 underline-offset-4"
                >
                  CLEAR FILTERS
                </button>
              </>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode='popLayout'>
              {filteredPlans.map((plan, idx) => (
                <div key={plan.id} className="pixel-item">
                    <PlanCard data={plan} index={idx} />
                </div>
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
      
      <Toaster 
        position='bottom-right'
        toastOptions={{
            className: '!font-pixel !bg-zinc-900 !text-white !border-2 !border-zinc-700 !shadow-[4px_4px_0_0_#000] !rounded-none',
            duration: 3000
        }}
      />
    </div>
  )
}