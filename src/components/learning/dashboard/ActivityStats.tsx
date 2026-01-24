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
      label: "STREAK",
      value: `${stats.streak} DAYS`,
      icon: <Flame className="w-6 h-6" strokeWidth={3} />,
      colorClass: "text-yellow-400 border-yellow-400 bg-yellow-400/10",
      wrapperHover: "hover:border-yellow-400"
    },
    {
      label: "ACTIVE DAYS",
      value: stats.activeDays,
      icon: <CalendarDays className="w-6 h-6" strokeWidth={3} />,
      colorClass: "text-blue-500 border-blue-500 bg-blue-500/10",
      wrapperHover: "hover:border-blue-500"
    },
    {
      label: "TOTAL LOGS",
      value: stats.totalLogs,
      icon: <FileText className="w-6 h-6" strokeWidth={3} />,
      colorClass: "text-green-500 border-green-500 bg-green-500/10",
      wrapperHover: "hover:border-green-500"
    },
    {
      label: "AVG. LVL", 
      value: `${stats.avgProgress}%`,
      icon: <Target className="w-6 h-6" strokeWidth={3} />,
      colorClass: "text-purple-500 border-purple-500 bg-purple-500/10",
      wrapperHover: "hover:border-purple-500"
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statItems.map((item, idx) => (
        <div 
          key={idx} 
          className={`group relative bg-zinc-900 border-2 border-zinc-800 p-4 flex flex-col items-start gap-4 shadow-[4px_4px_0px_0px_#111] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#111] ${item.wrapperHover}`}
        >
          {}
          <div className="flex w-full justify-between items-start">
            <div className={`p-2 border-2 ${item.colorClass} shadow-sm transition-colors`}>
              {item.icon}
            </div>
            
            {}
            <div className="flex gap-1 pt-1">
                <div className="w-1.5 h-1.5 bg-zinc-700"></div>
                <div className="w-1.5 h-1.5 bg-zinc-700"></div>
            </div>
          </div>

          {}
          <div>
            <p className="text-xs text-zinc-500 font-bold tracking-widest mb-1">
              {item.label}
            </p>
            {}
            <p className="text-2xl md:text-3xl font-bold text-white group-hover:text-white transition-colors uppercase leading-none">
              {item.value}
            </p>
          </div>
          
        </div>
      ))}
    </div>
  )
}