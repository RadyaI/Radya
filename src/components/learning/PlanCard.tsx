import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, CircleDashed, Clock } from 'lucide-react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface Props {
  data: {
    id: string
    title: string
    description: string
    category: string
    status: string
    progress: number
  }
  index: number
}

export default function PlanCard({ data, index }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return 'text-amber-500 bg-amber-500/10 border-amber-500/20'
      case 'completed': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
      default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_progress': return <Clock className="w-4 h-4" />
      case 'completed': return <CheckCircle2 className="w-4 h-4" />
      default: return <CircleDashed className="w-4 h-4" />
    }
  }

  return (
    <Link href={`/learning/${data.id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group relative h-full bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition-all duration-300"
      >
        <div className="absolute top-6 right-6">
          <span className={twMerge("flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border", getStatusColor(data.status))}>
            {getStatusIcon(data.status)}
            {data.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        <div className="mb-4">
          <span className="text-xs font-semibold text-blue-500 mb-2 block tracking-wider uppercase">
            {data.category}
          </span>
          <h3 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-blue-400 transition-colors">
            {data.title}
          </h3>
          <p className="text-zinc-400 text-sm line-clamp-2">
            {data.description}
          </p>
        </div>

        <div className="space-y-4">
          <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${data.progress}%` }}
              className="h-full bg-blue-500 rounded-full"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-medium">
              {data.progress}% Complete
            </span>
            
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
              Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}