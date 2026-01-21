'use client'

import { useParams } from 'next/navigation'
import { ArrowLeft, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { usePlanDetail } from '@/hooks/usePlanDetail'
import ChecklistModule from '@/components/learning/ChecklistModule'
import JournalModule from '@/components/learning/JournalModule'
import ResourceModule from '@/components/learning/ResourceModule'
import { Toaster } from 'react-hot-toast'

export default function PlanDetail() {
    const { id } = useParams()
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

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this entire plan? This action cannot be undone.')) {
            deletePlan()
        }
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-full" />
                <div className="w-32 h-4 bg-zinc-800 rounded" />
            </div>
        </div>
    )

    if (!plan) return <div className="text-white p-10">Plan not found</div>

    return (
        <>
            <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
                <div className="relative bg-gradient-to-b from-zinc-900 to-black border-b border-white/5 pb-12 pt-10 md:pt-10 px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">

                        <div className="flex items-center justify-between mb-6">
                            <Link href="/learning" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back to Dashboard
                            </Link>

                            <button
                                onClick={handleDelete}
                                className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-red-500/70 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete Plan
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <span className="text-blue-500 font-mono text-sm tracking-wider uppercase mb-2 block">
                                    {plan.category}
                                </span>
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
                                    {plan.title}
                                </h1>
                                <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 bg-zinc-900/50 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                                <div className="relative w-16 h-16 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-zinc-800" />
                                        <circle
                                            cx="32" cy="32" r="28"
                                            stroke="currentColor" strokeWidth="4" fill="none"
                                            strokeDasharray={175}
                                            strokeDashoffset={175 - (175 * (plan.progress || 0)) / 100}
                                            className="text-blue-500 transition-all duration-1000 ease-out"
                                        />
                                    </svg>
                                    <span className="absolute text-xs font-bold">{plan.progress || 0}%</span>
                                </div>
                                <div>
                                    <div className="text-sm text-zinc-400">Total Progress</div>
                                    <div className="text-lg font-bold text-white">
                                        {plan.milestones?.filter((m: any) => m.isDone).length || 0} / {plan.milestones?.length || 0} Steps
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                <ChecklistModule
                                    milestones={plan.milestones}
                                    onAdd={addMilestone}
                                    onToggle={toggleMilestone}
                                    onEdit={editMilestone}
                                    onDelete={deleteMilestone}
                                />

                                <ResourceModule
                                    resources={plan.resources}
                                    onAdd={addResource}
                                    onDelete={deleteResource}
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-2">
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
            <Toaster position='top-right' />
        </>
    )
}