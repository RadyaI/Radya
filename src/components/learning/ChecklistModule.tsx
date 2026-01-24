import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Check, Loader2, Trash2, Pencil, ListTodo } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
    <div className="bg-zinc-900 p-6 h-full font-pixel">
      
      {}
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b-2 border-zinc-700 pb-4">
        <div className="w-8 h-8 bg-blue-600 flex items-center justify-center border border-white shadow-[2px_2px_0px_0px_#000]">
           <ListTodo className="w-5 h-5 text-white" />
        </div>
        <span className="uppercase tracking-widest">Targets</span>
      </h3>

      {}
      <div className="space-y-3 mb-8">
        <AnimatePresence mode='popLayout'>
          {milestones.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={clsx(
                "group flex items-start gap-4 p-3 border-2 transition-all relative",
                item.isDone 
                  ? "bg-green-900/20 border-green-600 text-green-500" 
                  : "bg-black border-zinc-700 hover:border-white text-zinc-300 hover:bg-zinc-900"
              )}
            >
              {}
              <div 
                onClick={() => !editingId && onToggle(item.id, item.isDone)}
                className={clsx(
                  "mt-1 flex-shrink-0 w-6 h-6 border-2 flex items-center justify-center transition-none cursor-pointer hover:shadow-[2px_2px_0px_0px_#fff]",
                  item.isDone ? "bg-green-500 border-green-500" : "bg-black border-zinc-500 group-hover:border-white"
                )}>
                {item.isDone && <Check className="w-4 h-4 text-black stroke-[4]" />}
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
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
                      className="w-full bg-black border-2 border-blue-500 px-2 py-1 text-lg text-white focus:outline-none font-bold uppercase"
                      onBlur={() => saveEdit(item.id)}
                    />
                  </form>
                ) : (
                  <span 
                    onClick={() => onToggle(item.id, item.isDone)}
                    className={clsx(
                      "text-lg font-bold uppercase tracking-wide cursor-pointer leading-tight block",
                      item.isDone && "line-through opacity-60 decoration-2"
                    )}
                  >
                    {item.text}
                  </span>
                )}
              </div>

              {}
              {editingId !== item.id && (
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-none absolute right-2 top-2 bg-black border border-white p-1 shadow-[2px_2px_0px_0px_#000]">
                  <button 
                    onClick={() => startEdit(item.id, item.text)}
                    className="cursor-pointer p-1 hover:bg-blue-600 hover:text-white text-zinc-400 transition-none"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="cursor-pointer p-1 hover:bg-red-600 hover:text-white text-zinc-400 transition-none"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {milestones.length === 0 && (
            <div className="text-zinc-600 text-center py-4 border-2 border-dashed border-zinc-800 text-sm uppercase font-bold">
                No targets set.
            </div>
        )}
      </div>

      {}
      <form onSubmit={handleSubmit} className="relative mt-auto">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="ADD NEW TARGET..."
          className="w-full bg-black border-2 border-zinc-600 py-3 pl-4 pr-12 text-lg text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-700 font-bold uppercase"
        />
        <button 
          disabled={isAdding || !newItem}
          type="submit"
          className="absolute right-2 top-2 bottom-2 px-3 bg-blue-600 text-white border border-white hover:bg-blue-500 transition-none disabled:opacity-0 flex items-center justify-center shadow-[2px_2px_0px_0px_#000] active:translate-y-[2px] active:shadow-none"
        >
          {isAdding ? <Loader2 className="w-5 h-5 animate-spin"/> : <Plus className="w-5 h-5 stroke-[3]"/>}
        </button>
      </form>
    </div>
  )
}