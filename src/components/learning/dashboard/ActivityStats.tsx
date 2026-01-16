import { useMemo } from 'react'
import { format, subDays } from 'date-fns'
import { Flame, CalendarDays, FileText, Target } from 'lucide-react'

interface Log {
  id: string
  createdAt: any
}

interface Plan {
  id: string
  progress: number
  logs?: Log[]
}

interface Props {
  plans: Plan[]
}

export default function ActivityStats({ plans }: Props) {
  const stats = useMemo(() => {
    let totalLogs = 0
    let totalProgress = 0
    const activeDates = new Set<string>()

    plans.forEach(plan => {
      totalProgress += plan.progress || 0
      plan.logs?.forEach(log => {
        totalLogs++
        if (log.createdAt?.seconds) {
          activeDates.add(format(new Date(log.createdAt.seconds * 1000), 'yyyy-MM-dd'))
        }
      })
    })

    let streak = 0
    const today = new Date()
    const yesterday = subDays(today, 1)
    
    const todayStr = format(today, 'yyyy-MM-dd')
    const yesterdayStr = format(yesterday, 'yyyy-MM-dd')
    const isStreakAlive = activeDates.has(todayStr) || activeDates.has(yesterdayStr)

    if (isStreakAlive) {
      let currentCheck = activeDates.has(todayStr) ? today : yesterday
      while (activeDates.has(format(currentCheck, 'yyyy-MM-dd'))) {
        streak++
        currentCheck = subDays(currentCheck, 1)
      }
    }

    const avgProgress = plans.length > 0 ? Math.round(totalProgress / plans.length) : 0

    return {
      streak,
      activeDays: activeDates.size,
      totalLogs,
      avgProgress
    }
  }, [plans])

  const statItems = [
    {
      label: "Current Streak",
      value: `${stats.streak} Days`,
      icon: <Flame className="w-5 h-5 text-amber-500" fill="currentColor" />,
      bg: "bg-amber-500/10 border-amber-500/20"
    },
    {
      label: "Active Days",
      value: stats.activeDays,
      icon: <CalendarDays className="w-5 h-5 text-blue-500" />,
      bg: "bg-blue-500/10 border-blue-500/20"
    },
    {
      label: "Total Logs",
      value: stats.totalLogs,
      icon: <FileText className="w-5 h-5 text-emerald-500" />,
      bg: "bg-emerald-500/10 border-emerald-500/20"
    },
    {
      label: "Avg. Progress",
      value: `${stats.avgProgress}%`,
      icon: <Target className="w-5 h-5 text-purple-500" />,
      bg: "bg-purple-500/10 border-purple-500/20"
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statItems.map((item, idx) => (
        <div key={idx} className="bg-zinc-900/30 border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:bg-zinc-900/50 transition-colors group">
          <div className={`p-3 rounded-xl border ${item.bg} group-hover:scale-110 transition-transform`}>
            {item.icon}
          </div>
          <div>
            <p className="text-xs text-zinc-500 font-medium mb-0.5">{item.label}</p>
            <p className="text-xl font-bold text-white">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}