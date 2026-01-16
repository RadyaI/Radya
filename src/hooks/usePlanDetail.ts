import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '@/utils/firebase'
import { doc, onSnapshot, updateDoc, arrayUnion, Timestamp, deleteDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'

export interface LogEntry {
    id: string
    content: string
    createdAt: any
}

export interface Milestone {
    id: string
    text: string
    isDone: boolean
}

export interface Resource {
    id: string
    title: string
    url: string
    createdAt: any
}

export const usePlanDetail = (planId: string) => {
    const [plan, setPlan] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (!planId) return

        const unsub = onSnapshot(
            doc(db, 'learning_plans', planId),
            (docSnapshot) => {
                if (docSnapshot.exists()) {
                    setPlan({ id: docSnapshot.id, ...docSnapshot.data() })
                    setLoading(false)
                } else {
                    toast.error("Plan not found")
                    router.push('/learning')
                }
            },
            (error) => {
                console.error("Access Error:", error)

                if (error.code === 'permission-denied') {
                    toast.error("Unauthorized access. Redirecting...")
                    router.push('/learning')
                } else {
                    toast.error("Error loading plan")
                }
                setLoading(false)
            }
        )

        return () => unsub()
    }, [planId, router])

    const updateMilestonesData = async (newMilestones: Milestone[]) => {
        if (!plan) return
        const completed = newMilestones.filter(m => m.isDone).length

        const progress = newMilestones.length > 0
            ? Math.round((completed / newMilestones.length) * 100)
            : 0

        if (progress === 100 && plan.progress < 100) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#3b82f6', '#10b981', '#f59e0b']
            })
            toast.success('Congratulations! Goal Completed! 🎉')
        }

        try {
            await updateDoc(doc(db, 'learning_plans', planId), {
                milestones: newMilestones,
                progress,
                status: progress === 100 ? 'completed' : 'in_progress'
            })
        } catch (e) {
            toast.error('Failed to update')
        }
    }


    const addMilestone = async (text: string) => {
        if (!plan) return
        const newMilestone = { id: Date.now().toString(), text, isDone: false }
        const newMilestones = [...(plan.milestones || []), newMilestone]
        await updateMilestonesData(newMilestones)
        toast.success('Target added')
    }

    const toggleMilestone = async (milestoneId: string, currentStatus: boolean) => {
        if (!plan) return
        const updatedMilestones = plan.milestones.map((m: Milestone) =>
            m.id === milestoneId ? { ...m, isDone: !currentStatus } : m
        )
        await updateMilestonesData(updatedMilestones)
    }

    const editMilestone = async (milestoneId: string, newText: string) => {
        if (!plan) return
        const updatedMilestones = plan.milestones.map((m: Milestone) =>
            m.id === milestoneId ? { ...m, text: newText } : m
        )
        await updateMilestonesData(updatedMilestones)
        toast.success('Updated!')
    }

    const deleteMilestone = async (milestoneId: string) => {
        if (!plan) return
        const updatedMilestones = plan.milestones.filter((m: Milestone) => m.id !== milestoneId)
        await updateMilestonesData(updatedMilestones)
        toast.success('Deleted!')
    }

    const addLog = async (content: string) => {
        try {
            const newLog = {
                id: Date.now().toString(),
                content,
                createdAt: Timestamp.now()
            }
            await updateDoc(doc(db, 'learning_plans', planId), {
                logs: arrayUnion(newLog)
            })
            toast.success('Journal saved!')
            return true
        } catch (e) {
            toast.error('Failed to save journal')
            return false
        }
    }

    const editLog = async (logId: string, newContent: string) => {
        if (!plan) return
        const updatedLogs = plan.logs.map((log: LogEntry) =>
            log.id === logId ? { ...log, content: newContent } : log
        )

        try {
            await updateDoc(doc(db, 'learning_plans', planId), {
                logs: updatedLogs
            })
            toast.success('Log updated!')
        } catch (e) {
            toast.error('Failed to update log')
        }
    }

    const deleteLog = async (logId: string) => {
        if (!plan) return
        const updatedLogs = plan.logs.filter((log: LogEntry) => log.id !== logId)

        try {
            await updateDoc(doc(db, 'learning_plans', planId), {
                logs: updatedLogs
            })
            toast.success('Log deleted!')
        } catch (e) {
            toast.error('Failed to delete log')
        }
    }

    const deletePlan = async () => {
        if (!plan) return

        try {
            await deleteDoc(doc(db, 'learning_plans', planId))
            toast.success('Plan deleted successfully')
            router.push('/learning')
        } catch (e) {
            console.error(e)
            toast.error('Failed to delete plan')
        }
    }

    const addResource = async (title: string, url: string) => {
        try {
            const newResource = {
                id: Date.now().toString(),
                title,
                url,
                createdAt: Timestamp.now()
            }
            await updateDoc(doc(db, 'learning_plans', planId), {
                resources: arrayUnion(newResource)
            })
            toast.success('Link saved!')
        } catch (e) {
            toast.error('Failed to save link')
        }
    }

    const deleteResource = async (resourceId: string) => {
        if (!plan) return
        const updatedResources = plan.resources.filter((r: Resource) => r.id !== resourceId)

        try {
            await updateDoc(doc(db, 'learning_plans', planId), {
                resources: updatedResources
            })
            toast.success('Link deleted')
        } catch (e) {
            toast.error('Failed to delete link')
        }
    }

    return {
        plan,
        deletePlan,
        loading,
        addMilestone,
        toggleMilestone,
        addLog,
        editMilestone,
        deleteMilestone,
        editLog,
        deleteLog,
        addResource,  
        deleteResource
    }
}