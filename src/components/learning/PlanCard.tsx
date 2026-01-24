import { motion } from 'framer-motion'
import { ArrowRight, CheckSquare, Clock, Circle, Terminal } from 'lucide-react'
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
  
  const getStatusTheme = (status: string) => {
    switch (status) {
      case 'in_progress': 
        return {
            border: 'border-l-yellow-400', 
            text: 'text-yellow-400',
            icon: <Clock className="w-5 h-5 text-yellow-400" strokeWidth={3} />
        }
      case 'completed': 
        return {
            border: 'border-l-green-500', 
            text: 'text-green-500',
            icon: <CheckSquare className="w-5 h-5 text-green-500" strokeWidth={3} />
        }
      default: 
        return {
            border: 'border-l-zinc-500', 
            text: 'text-zinc-500',
            icon: <Circle className="w-5 h-5 text-zinc-500" strokeWidth={3} />
        }
    }
  }

  const theme = getStatusTheme(data.status)
  const progressColor = data.progress === 100 ? 'bg-green-500' : 'bg-blue-600'

  return (
    <Link href={`/learning/${data.id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05 }}
        className={twMerge(
          "group relative h-full bg-zinc-900 border-2 border-zinc-800 border-l-[6px] p-5 flex flex-col justify-between transition-all hover:-translate-y-1 hover:border-zinc-500 hover:shadow-[6px_6px_0px_0px_#111]",
          theme.border
        )}
      >
        
        {}
        <div className="flex justify-between items-start gap-4 mb-3">
           {}
           <h3 className="text-2xl md:text-3xl font-bold text-white leading-none uppercase tracking-wide group-hover:text-blue-400 transition-colors">
            {data.title}
          </h3>
          <div className="shrink-0 pt-1">
            {theme.icon}
          </div>
        </div>

        {}
        <div className="mb-4">
             {}
             <span className="inline-flex items-center gap-2 px-2 py-1 bg-black border border-zinc-700 text-sm text-zinc-300 font-bold uppercase tracking-widest">
                <Terminal className="w-3.5 h-3.5" />
                {data.category.split(' ')[0]} 
             </span>
        </div>

        {}
        {}
        <p className="text-zinc-400 text-lg leading-relaxed line-clamp-3 mb-6 font-medium tracking-wide">
            {data.description}
        </p>

        {}
        <div className="mt-auto pt-4 border-t-2 border-dashed border-zinc-800">
            {}
            <div className="flex justify-between items-end mb-2">
                 <span className={twMerge("text-sm uppercase font-bold tracking-widest", theme.text)}>
                    {data.status.replace('_', ' ')}
                </span>
                <span className="text-xl font-bold text-white">{data.progress}%</span>
            </div>
            
            {}
            <div className="w-full h-5 bg-black border-2 border-zinc-700 relative">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${data.progress}%` }}
                    className={twMerge("h-full relative", progressColor)}
                >
                     <div className="absolute inset-0 w-full h-full opacity-30" 
                        style={{backgroundImage: 'linear-gradient(90deg, transparent 50%, #000 50%)', backgroundSize: '4px 100%'}}>
                    </div>
                </motion.div>
            </div>
        </div>

      </motion.div>
    </Link>
  )
}