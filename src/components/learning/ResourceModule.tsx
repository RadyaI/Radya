import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link as LinkIcon, Plus, Trash2, ExternalLink, Loader2 } from 'lucide-react'

interface Props {
  resources?: { id: string; title: string; url: string }[]
  onAdd: (title: string, url: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function ResourceModule({ resources = [], onAdd, onDelete }: Props) {
  const [isAdding, setIsAdding] = useState(false)
  const [form, setForm] = useState({ title: '', url: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.url) return
    
    setLoading(true)
    await onAdd(form.title, form.url)
    setForm({ title: '', url: '' })
    setIsAdding(false)
    setLoading(false)
  }

  return (
    <div className="bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-8 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-blue-500" />
          Materials
        </h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="cursor-pointer text-xs text-blue-500 hover:text-blue-400 font-medium"
        >
          {isAdding ? 'Cancel' : '+ Add Link'}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            onSubmit={handleSubmit}
            className="overflow-hidden mb-4 space-y-3"
          >
            <input
              required
              placeholder="Title (e.g. Next.js Docs)"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50"
            />
            <div className="flex gap-2">
              <input
                required
                type="url"
                placeholder="https://..."
                value={form.url}
                onChange={e => setForm({...form, url: e.target.value})}
                className="flex-1 bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50"
              />
              <button 
                disabled={loading}
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl transition-colors"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Plus className="w-4 h-4"/>}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {resources.map((item) => (
          <div 
            key={item.id}
            className="group flex items-center justify-between p-3 rounded-xl bg-zinc-800/20 border border-white/5 hover:bg-zinc-800/40 hover:border-white/10 transition-all"
          >
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 flex-1 min-w-0"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <ExternalLink className="w-4 h-4" />
              </div>
              <div className="truncate">
                <p className="text-sm font-medium text-zinc-200 truncate">{item.title}</p>
                <p className="text-xs text-zinc-500 truncate">{new URL(item.url).hostname}</p>
              </div>
            </a>
            
            <button 
              onClick={() => onDelete(item.id)}
              className="cursor-pointer opacity-0 group-hover:opacity-100 p-2 text-zinc-500 hover:text-red-400 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {resources.length === 0 && !isAdding && (
          <p className="text-sm text-zinc-600 italic text-center py-2">No links saved yet.</p>
        )}
      </div>
    </div>
  )
}