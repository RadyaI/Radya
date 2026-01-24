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

  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return url
    }
  }

  return (
    <div className="bg-zinc-900 p-6 h-full font-pixel mt-6 border-t-2 border-dashed border-zinc-800 pt-8">
      
      {}
      <div className="flex items-center justify-between mb-6 border-b-2 border-zinc-700 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 flex items-center justify-center border border-white shadow-[2px_2px_0px_0px_#000]">
             <LinkIcon className="w-5 h-5 text-white" />
          </div>
          <span className="uppercase tracking-widest">Resources</span>
        </h3>
        
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="cursor-pointer text-xs font-bold uppercase tracking-wider text-purple-400 hover:text-white border border-transparent hover:border-purple-500 px-2 py-1 transition-all"
        >
          {isAdding ? '[ CANCEL ]' : '[ + ADD LINK ]'}
        </button>
      </div>

      {}
      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            onSubmit={handleSubmit}
            className="overflow-hidden mb-6 space-y-3 bg-black p-4 border border-zinc-700 shadow-inner"
          >
            <input
              required
              placeholder="RESOURCE TITLE..."
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              className="w-full bg-zinc-900 border-2 border-zinc-600 px-3 py-2 text-white focus:outline-none focus:border-purple-500 font-bold uppercase text-sm placeholder:text-zinc-600"
            />
            <div className="flex gap-2">
              <input
                required
                type="url"
                placeholder="HTTPS://..."
                value={form.url}
                onChange={e => setForm({...form, url: e.target.value})}
                className="flex-1 bg-zinc-900 border-2 border-zinc-600 px-3 py-2 text-white focus:outline-none focus:border-purple-500 font-bold uppercase text-sm placeholder:text-zinc-600"
              />
              <button 
                disabled={loading}
                type="submit"
                className="bg-purple-600 hover:bg-purple-500 text-white px-3 border border-white shadow-[2px_2px_0px_0px_#000] active:translate-y-[2px] active:shadow-none transition-none"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Plus className="w-5 h-5 stroke-[3]"/>}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {}
      <div className="space-y-3">
        {resources.map((item) => (
          <div 
            key={item.id}
            className="group flex items-center justify-between p-3 bg-black border-2 border-zinc-800 hover:border-purple-500 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#111] transition-all relative"
          >
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 flex-1 min-w-0"
            >
              {}
              <div className="w-8 h-8 bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-500 group-hover:text-purple-400 group-hover:border-purple-500 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </div>
              
              <div className="truncate">
                <p className="text-sm font-bold text-zinc-300 group-hover:text-white uppercase truncate tracking-wide">
                    {item.title}
                </p>
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest truncate group-hover:text-purple-400">
                    {getHostname(item.url)}
                </p>
              </div>
            </a>
            
            {}
            <button 
              onClick={() => onDelete(item.id)}
              className="cursor-pointer opacity-0 group-hover:opacity-100 p-2 text-zinc-600 hover:text-red-500 hover:bg-zinc-900 border border-transparent hover:border-red-500 transition-none absolute right-2"
              title="Remove Link"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {resources.length === 0 && !isAdding && (
          <p className="text-sm text-zinc-600 italic text-center py-4 border-2 border-dashed border-zinc-800 uppercase font-bold">
            No materials linked.
          </p>
        )}
      </div>
    </div>
  )
}