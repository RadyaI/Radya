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
    <div className="space-y-8 p-6">
      
      {
}
      <style jsx global>{`
        .pixel-mode-container .force-sans,
        .pixel-mode-container .force-sans * {
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
          letter-spacing: normal !important;
        }
        /* Memperbaiki code block agar tetap monospace */
        .pixel-mode-container .force-sans code,
        .pixel-mode-container .force-sans pre {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
        }
      `}</style>

      {}
      <div className="bg-zinc-900 border-2 border-zinc-700 p-6 shadow-[8px_8px_0px_0px_#111]">
          <div className="flex items-center justify-between mb-6 border-b-2 border-zinc-800 pb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-3 font-pixel uppercase tracking-widest">
            <div className="w-8 h-8 bg-blue-600 flex items-center justify-center border border-white shadow-[2px_2px_0px_0px_#000]">
               <Book className="w-5 h-5 text-white" />
            </div>
            Learning Log
          </h3>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="cursor-pointer flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-none shadow-[4px_4px_0px_0px_#000] active:translate-y-[2px] active:shadow-none disabled:opacity-50 border border-white font-pixel uppercase tracking-wider"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'SAVING...' : 'SAVE ENTRY'}
          </button>
        </div>
        
        {}
        <div data-color-mode="dark" className="prose-invert force-sans">
          <MDEditor
            value={value}
            onChange={(val) => setValue(val || '')}
            preview="edit"
            height={250}
            className="!bg-black !border-2 !border-zinc-700 !rounded-none !shadow-none focus-within:!border-blue-500 transition-colors"
            textareaProps={{ 
                placeholder: "What did you learn today?",
            }}
          />
        </div>
      </div>

      {}
      <div className="relative border-l-4 border-zinc-800 ml-4 md:ml-6 space-y-8 pb-12">
        {logs.slice().reverse().map((log, idx) => (
          <motion.div 
            key={log.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative pl-8 md:pl-12 group"
          >
            {}
            <div className="absolute -left-[10px] top-0 w-5 h-5 bg-black border-4 border-blue-500" />
            
            {}
            <div className="mb-2 flex items-center justify-between font-pixel">
              <span className="text-xs font-bold text-blue-400 bg-blue-900/20 px-2 py-1 border border-blue-500/30 uppercase tracking-widest">
                {log.createdAt?.seconds 
                  ? format(new Date(log.createdAt.seconds * 1000), 'MMM d, yyyy • HH:mm') 
                  : 'Just now'}
              </span>

              {editingId !== log.id && (
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-zinc-700 p-1">
                  <button 
                    onClick={() => startEdit(log.id, log.content)}
                    className="cursor-pointer p-1.5 hover:bg-blue-600 hover:text-white text-zinc-400 transition-none"
                    title="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => onDelete(log.id)}
                    className="cursor-pointer p-1.5 hover:bg-red-600 hover:text-white text-zinc-400 transition-none"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
            
            {}
            <div className="bg-zinc-900 border-l-4 border-l-zinc-700 p-5 hover:border-l-blue-500 transition-colors relative">
              {editingId === log.id ? (
                <div data-color-mode="dark" className="prose-invert force-sans">
                  <MDEditor
                    value={editValue}
                    onChange={(val) => setEditValue(val || '')}
                    preview="edit"
                    height={200}
                    className="!bg-black !border-2 !border-blue-500 !rounded-none mb-3"
                  />
                  {}
                  <div className="flex items-center gap-2 justify-end mt-2">
                     {
}
                    <button 
                      onClick={cancelEdit}
                      className="cursor-pointer flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-700 transition-none uppercase"
                      style={{ fontFamily: 'var(--font-pixel) !important' }} 
                    >
                      <X className="w-3 h-3" /> Cancel
                    </button>
                    <button 
                      onClick={() => saveEdit(log.id)}
                      className="cursor-pointer flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 border border-white shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none transition-none uppercase"
                      style={{ fontFamily: 'var(--font-pixel) !important' }}
                    >
                      <Check className="w-3 h-3" /> Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div data-color-mode="dark">
                  {}
                  <MarkdownPreview 
                    source={log.content} 
                    style={{ backgroundColor: 'transparent' }}
                    className="force-sans !bg-transparent prose prose-invert max-w-none prose-p:text-zinc-300 prose-headings:text-zinc-100 prose-code:text-blue-300 prose-pre:!bg-black prose-pre:!border prose-pre:!border-zinc-700" 
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {logs.length === 0 && (
          <div className="pl-8 text-zinc-600 italic font-pixel text-sm uppercase">No logs recorded yet.</div>
        )}
      </div>
    </div>
  )
}