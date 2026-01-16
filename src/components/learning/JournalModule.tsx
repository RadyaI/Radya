import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, Book, Pencil, Trash2, X, Check } from 'lucide-react'
import { format } from 'date-fns'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false }
);

const MarkdownPreview = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
  { ssr: false }
);

interface Props {
  logs?: { id: string; content: string; createdAt: any }[]
  onSave: (content: string) => Promise<boolean>
  onEdit: (id: string, content: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function JournalModule({ logs = [], onSave, onEdit, onDelete }: Props) {
  const [value, setValue] = useState("**Today's Progress:**\n")
  const [isSaving, setIsSaving] = useState(false)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const handleSave = async () => {
    if (!value.trim()) return
    setIsSaving(true)
    const success = await onSave(value)
    if (success) setValue("**Today's Progress:**\n") 
    setIsSaving(false)
  }

  const startEdit = (id: string, currentContent: string) => {
    setEditingId(id)
    setEditValue(currentContent)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }

  const saveEdit = async (id: string) => {
    if (!editValue.trim()) return
    await onEdit(id, editValue)
    setEditingId(null)
  }

  return (
    <div className="space-y-8">
      <div className="bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-8">
         <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Book className="w-5 h-5 text-blue-500" />
            Learning Log
          </h3>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="cursor-pointer flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
        
        <div data-color-mode="dark" className="prose-invert">
          <MDEditor
            value={value}
            onChange={(val) => setValue(val || '')}
            preview="edit"
            height={200}
            className="!bg-zinc-950 !border-zinc-800 rounded-xl overflow-hidden shadow-inner"
            textareaProps={{ placeholder: "What did you learn today?" }}
          />
        </div>
      </div>

      <div className="relative border-l-2 border-zinc-800 ml-4 md:ml-6 space-y-8 pb-12">
        {logs.slice().reverse().map((log, idx) => (
          <motion.div 
            key={log.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative pl-8 md:pl-12 group"
          >
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-900 border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/20">
                {log.createdAt?.seconds 
                  ? format(new Date(log.createdAt.seconds * 1000), 'MMM d, yyyy • HH:mm') 
                  : 'Just now'}
              </span>

              {editingId !== log.id && (
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => startEdit(log.id, log.content)}
                    className="cursor-pointer p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-blue-400 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => onDelete(log.id)}
                    className="cursor-pointer p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors relative">
              {editingId === log.id ? (
                <div data-color-mode="dark" className="prose-invert">
                  <MDEditor
                    value={editValue}
                    onChange={(val) => setEditValue(val || '')}
                    preview="edit"
                    height={200}
                    className="!bg-zinc-950 !border-zinc-700 rounded-xl mb-3"
                  />
                  <div className="flex items-center gap-2 justify-end">
                    <button 
                      onClick={cancelEdit}
                      className="cursor-pointer flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                    <button 
                      onClick={() => saveEdit(log.id)}
                      className="cursor-pointer flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                    >
                      <Check className="w-4 h-4" /> Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div data-color-mode="dark">
                  <MarkdownPreview 
                    source={log.content} 
                    style={{ backgroundColor: 'transparent' }}
                    className="!bg-transparent prose prose-invert max-w-none prose-p:text-zinc-300 prose-headings:text-zinc-100 prose-code:text-blue-300 prose-pre:!bg-black/50 prose-pre:!border prose-pre:!border-white/10" 
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {logs.length === 0 && (
          <div className="pl-8 text-zinc-600 italic">No logs yet.</div>
        )}
      </div>
    </div>
  )
}