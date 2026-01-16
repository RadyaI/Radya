import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2, ChevronDown } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string, desc: string, cat: string) => Promise<boolean>
}

const CATEGORIES = [
  "Frontend Development",
  "Backend & Database",
  "Fullstack Development",
  "Computer Science",
  "Data Science & AI",
  "DevOps & Cloud",
  "UI/UX Design",
  "Language & Writing",
  "Other"
]

export default function CreateModal({ isOpen, onClose, onSubmit }: Props) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ title: '', desc: '', cat: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const success = await onSubmit(formData.title, formData.desc, formData.cat)
    setLoading(false)
    if (success) {
      setFormData({ title: '', desc: '', cat: '' })
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-zinc-950 border border-zinc-800 w-full max-w-md p-6 rounded-2xl shadow-2xl pointer-events-auto mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">New Learning Plan</h2>
                <button onClick={onClose} className="text-zinc-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Title</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-zinc-600"
                    placeholder="e.g., Mastering Next.js"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Category</label>
                  <div className="relative">
                    <select
                      required
                      value={formData.cat}
                      onChange={e => setFormData({ ...formData, cat: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-zinc-500">Select a category</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="cursor-pointer bg-zinc-900">
                          {cat}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.desc}
                    onChange={e => setFormData({ ...formData, desc: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none placeholder:text-zinc-600"
                    placeholder="Brief goal description..."
                  />
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? 'Creating...' : 'Start Learning'}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}