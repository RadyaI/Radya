import { LayoutGrid, Plus, LogOut } from 'lucide-react'
import { User } from 'firebase/auth'

interface Props {
  user: User | null
  onOpenModal: () => void
  onLogout: () => void
}

export default function HeaderDashboard({ user, onOpenModal, onLogout }: Props) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <LayoutGrid className="w-8 h-8 text-blue-500" />
          My Learning Path
        </h1>
        <p className="text-zinc-400">
          Welcome back, <span className="text-white font-medium">{user?.displayName || 'Learner'}</span>
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenModal}
          className="cursor-pointer flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">New Plan</span>
        </button>

        <button
          onClick={onLogout}
          className="cursor-pointer flex items-center justify-center p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-500 text-zinc-400 transition-all"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}