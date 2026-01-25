import { LayoutGrid, Plus, LogOut, BookOpenCheck, Terminal } from 'lucide-react'
import { User } from 'firebase/auth'
import { useRouter } from 'next/navigation'

interface Props {
  user: User | null
  onOpenModal: () => void
  onLogout: () => void
}

export default function HeaderDashboard({ user, onOpenModal, onLogout }: Props) {

  const router = useRouter()

  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b-4 border-zinc-800 pb-8">
      
      {}
      <div className="flex items-start gap-5">
        {}
        <div className="w-20 h-20 bg-zinc-900 border-2 border-zinc-700 shadow-[6px_6px_0px_0px_#111] flex items-center justify-center shrink-0">
           <LayoutGrid className="w-10 h-10 text-blue-500" strokeWidth={2} />
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 uppercase tracking-wide leading-none">
            Learning Path
          </h1>
          
          <div className="flex items-center gap-2 text-zinc-500 text-base md:text-lg font-bold bg-black inline-block px-1">
            <Terminal className="w-4 h-4 text-zinc-600" />
            <span>PLAYER:</span>
            <span className="text-yellow-400 uppercase border-b-2 border-yellow-400/50 tracking-widest">
              {user?.displayName || 'UNKNOWN'}
            </span>
          </div>
        </div>
      </div>
      
      {}
      <div className="flex items-center gap-4 w-full lg:w-auto">
        
        {}
        <button
          onClick={onOpenModal}
          className="group flex-1 lg:flex-none cursor-pointer flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 border-2 border-white shadow-[6px_6px_0px_0px_#111] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-none"
        >
          <Plus className="w-6 h-6" strokeWidth={4} />
          <span className="font-bold tracking-widest uppercase text-lg">New Learning</span>
        </button>

        {}
        <button
          onClick={() => router.push("/quiz")}
          className="cursor-pointer flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-4 border-2 border-white shadow-[6px_6px_0px_0px_#111] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-none"
          title="Start Quiz"
        >
          <BookOpenCheck className="w-6 h-6" strokeWidth={3} />
          <span className="hidden sm:inline font-bold uppercase tracking-widest text-lg">Quiz</span>
        </button>

        {}
        <button
          onClick={onLogout}
          className="cursor-pointer flex items-center justify-center p-4 bg-red-600 hover:bg-red-500 text-white border-2 border-white shadow-[6px_6px_0px_0px_#111] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-none"
          title="Sign Out"
        >
          <LogOut className="w-6 h-6" strokeWidth={3} />
        </button>
      </div>
    </div>
  )
}