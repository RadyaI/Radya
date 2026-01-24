'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Trash2, Tag, Layers, Calendar, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePlanDetail } from '@/hooks/usePlanDetail'
import ChecklistModule from '@/components/learning/ChecklistModule'
import JournalModule from '@/components/learning/JournalModule'
import ResourceModule from '@/components/learning/ResourceModule'
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useEffect, useMemo } from 'react' 

export default function PlanDetail() {
  const { id } = useParams()
  const router = useRouter()
  const {
    plan,
    loading,
    addMilestone,
    toggleMilestone,
    editMilestone,
    deleteMilestone,
    addLog,
    editLog,
    deleteLog,
    deletePlan,
    addResource, deleteResource
  } = usePlanDetail(id as string)

  const catImage = useMemo(() => {
    if (!id) return 'cat.png'
    const planId = Array.isArray(id) ? id[0] : id
    const sum = planId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const cats = ['cat.png', 'cat2.png', 'cat3.png', 'cat4.png', 'cat5.png']
    return cats[sum % cats.length]
  }, [id])

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      deletePlan()
    }
  }

  useEffect(() => {
    router.prefetch("/cat")
  }, [router])

  if (loading) return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center font-pixel text-white">
      <div className="flex gap-2 mb-4">
        <div className="w-4 h-4 bg-white animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-4 h-4 bg-white animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-4 h-4 bg-white animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <p className="text-lg tracking-widest text-zinc-500">LOADING DATA...</p>
    </div>
  )

  if (!plan) return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center font-pixel text-white">
      <div className="text-center border-2 border-zinc-800 p-8 bg-zinc-900 shadow-[8px_8px_0px_0px_#000]">
        <h1 className="text-4xl font-bold mb-2 text-red-500">NOT FOUND</h1>
        <p className="text-zinc-500 mb-6">This plan does not exist.</p>
        <Link href="/learning" className="inline-block px-6 py-3 bg-white text-black font-bold border-2 border-zinc-500 hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#333] transition-all">
          GO BACK
        </Link>
      </div>
    </div>
  )

  const completedSteps = plan.milestones?.filter((m: any) => m.isDone).length || 0
  const totalSteps = plan.milestones?.length || 0

  return (
    <>
      <div className="min-h-screen bg-[#09090b] text-white selection:bg-blue-500 selection:text-white font-pixel">
        
        {}
        <div className="border-b-2 border-zinc-800 bg-zinc-900/50 pt-8 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            {}
            <div className="flex items-center justify-between mb-8">
              <Link 
                href="/learning" 
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-bold uppercase text-sm group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
              </Link>

              <button
                onClick={handleDelete}
                className="group cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border-2 border-transparent hover:border-red-500 font-bold uppercase hover:bg-red-500 hover:text-white transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>

            {}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              
              {}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white font-bold text-xs uppercase tracking-wider mb-4 shadow-[4px_4px_0px_0px_#000]">
                  <Tag className="w-3 h-3" />
                  {plan.category}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-none">
                  {plan.title}
                </h1>
                
                <p className="text-zinc-400 text-lg md:text-xl max-w-3xl leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {}
              <div className="flex flex-col sm:flex-row gap-6 lg:items-end">
                
                {}
                <div className="hidden sm:flex flex-col items-center justify-end">
                    {}
                    <div className="mb-3 bg-white text-black text-[10px] font-bold uppercase px-2 py-1 relative border-2 border-zinc-300 shadow-[2px_2px_0px_0px_#000]">
                        Let's Focus!
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-b-2 border-r-2 border-zinc-300"></div>
                    </div>
                    
                    {}
                    <div className="w-32 h-32 bg-black border-2 border-zinc-800 shadow-[8px_8px_0px_0px_#222] flex items-center justify-center relative overflow-hidden group hover:-translate-y-1 transition-transform">
                        {}
                        <div className="absolute inset-0 opacity-20" 
                             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '8px 8px' }}>
                        </div>
                        
                        {}
                        <img 
                            onClick={() => router.push("/cat")}
                            src={`/images/cats/${catImage}`} 
                            alt="Learning Companion" 
                            className="cursor-pointer w-24 h-24 object-contain relative z-10"
                            style={{ imageRendering: 'pixelated' }} 
                        />
                        
                        {}
                        <div className="absolute bottom-1 right-1 text-[8px] font-bold text-zinc-600 uppercase tracking-widest bg-black/80 px-1 border border-zinc-800">
                            NPC
                        </div>
                    </div>
                </div>

                {}
                <div className="w-full lg:w-80 bg-black border-2 border-zinc-800 p-5 shadow-[8px_8px_0px_0px_#222]">
                   <div className="flex justify-between items-center mb-4 border-b-2 border-zinc-800 pb-2">
                      <span className="text-zinc-500 font-bold uppercase text-xs flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        Progress
                      </span>
                      <span className="text-2xl font-bold text-white">{plan.progress || 0}%</span>
                   </div>

                   {}
                   <div className="w-full h-4 bg-zinc-900 border-2 border-zinc-700 mb-3 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${plan.progress || 0}%` }}
                        className="h-full bg-green-500 relative"
                      />
                   </div>

                   <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase">
                      <span>Steps Done</span>
                      <span className="text-white">
                        {completedSteps} / {totalSteps}
                      </span>
                   </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {}
            <div className="lg:col-span-4 space-y-8">
               <div className="bg-zinc-900 border-2 border-zinc-800 p-1 shadow-[8px_8px_0px_0px_#111]">
                 <ChecklistModule
                    milestones={plan.milestones}
                    onAdd={addMilestone}
                    onToggle={toggleMilestone}
                    onEdit={editMilestone}
                    onDelete={deleteMilestone}
                  />
               </div>
               <div className="bg-zinc-900 border-2 border-zinc-800 p-1 shadow-[8px_8px_0px_0px_#111]">
                  <ResourceModule
                    resources={plan.resources}
                    onAdd={addResource}
                    onDelete={deleteResource}
                  />
               </div>
            </div>

            {}
            <div className="lg:col-span-8">
              <div className="bg-zinc-900 border-2 border-zinc-800 p-1 shadow-[8px_8px_0px_0px_#111]">
                <JournalModule
                  logs={plan.logs}
                  onSave={addLog}
                  onEdit={editLog}
                  onDelete={deleteLog}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <Toaster 
        position='bottom-right' 
        toastOptions={{
          className: '!bg-zinc-900 !text-white !font-pixel !border-2 !border-zinc-700 !shadow-[4px_4px_0px_0px_#000] !rounded-none',
        }}
      />
    </>
  )
}