import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Check, Loader2, Trash2, Pencil, X } from 'lucide-react'
import { clsx } from 'clsx'

interface Props {
  milestones?: { id: string; text: string; isDone: boolean }[]
  onAdd: (text: string) => Promise<void>
  onToggle: (id: string, status: boolean) => Promise<void>
  onEdit: (id: string, text: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function ChecklistModule({ milestones = [], onAdd, onToggle, onEdit, onDelete }: Props) {
  const [newItem, setNewItem] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItem.trim()) return
    setIsAdding(true)
    await onAdd(newItem)
    setNewItem('')
    setIsAdding(false)
  }

  const startEdit = (id: string, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  const saveEdit = async (id: string) => {
    if (editText.trim() !== '') {
      await onEdit(id, editText)
    }
    setEditingId(null)
  }

  return (
    <div className="bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-8 h-full">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-blue-500 rounded-full inline-block"/>
        Target & Milestones
      </h3>

      <div className="space-y-3 mb-8">
        <AnimatePresence mode='popLayout'>
          {milestones.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={clsx(
                "group flex items-start gap-3 p-4 rounded-xl border transition-all select-none relative",
                item.isDone 
                  ? "bg-blue-500/10 border-blue-500/20 text-zinc-400" 
                  : "bg-zinc-800/40 border-white/5 hover:bg-zinc-800/60 hover:border-white/10 text-zinc-200"
              )}
            >
              <div 
                onClick={() => !editingId && onToggle(item.id, item.isDone)}
                className={clsx(
                  "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors cursor-pointer",
                  item.isDone ? "bg-blue-500 border-blue-500" : "border-zinc-600 group-hover:border-zinc-400"
                )}>
                {item.isDone && <Check className="cursor-pointer w-3.5 h-3.5 text-white" />}
              </div>

              <div className="flex-1 min-w-0">
                {editingId === item.id ? (
                  <form 
                    onSubmit={(e) => { e.preventDefault(); saveEdit(item.id); }}
                    className="flex items-center gap-2"
                  >
                    <input
                      autoFocus
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full bg-zinc-950 border border-blue-500/50 rounded px-2 py-0.5 text-sm text-white focus:outline-none"
                      onBlur={() => saveEdit(item.id)}
                    />
                  </form>
                ) : (
                  <span 
                    onClick={() => onToggle(item.id, item.isDone)}
                    className={clsx(
                      "text-sm font-medium transition-all block break-words cursor-pointer",
                      item.isDone && "line-through opacity-50"
                    )}
                  >
                    {item.text}
                  </span>
                )}
              </div>

              {editingId !== item.id && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute right-3 top-3 bg-zinc-900/80 backdrop-blur-sm rounded-lg p-1 border border-white/5">
                  <button 
                    onClick={() => startEdit(item.id, item.text)}
                    className="cursor-pointer p-1.5 hover:bg-blue-500/20 rounded text-zinc-400 hover:text-blue-400 transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="cursor-pointer p-1.5 hover:bg-red-500/20 rounded text-zinc-400 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new target..."
          className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-zinc-600"
        />
        <button 
          disabled={isAdding || !newItem}
          type="submit"
          className="absolute right-2 top-2 p-1.5 bg-zinc-800 rounded-lg hover:bg-blue-600 text-zinc-400 hover:text-white transition-all disabled:opacity-0"
        >
          {isAdding ? <Loader2 className="w-4 h-4 animate-spin"/> : <Plus className="w-4 h-4"/>}
        </button>
      </form>
    </div>
  )
}