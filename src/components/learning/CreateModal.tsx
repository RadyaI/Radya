import { useState } from 'react'
import { motion, AnimatePresence, Variant } from 'framer-motion'
import { X, Loader2, ChevronDown, Save } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string, desc: string, cat: string) => Promise<boolean>
}

const CATEGORIES: string[] = [
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

  const modalVariants: any = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.15 } }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 z-50 backdrop-blur-sm"
            style={{ backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)', backgroundSize: '40px 40px' }}
          />
          
          {}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 py-8"> 
              
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="pointer-events-auto w-full max-w-lg relative"
              >
                {}
                <div className="bg-zinc-900 border-2 border-white shadow-[12px_12px_0px_0px_#000] p-1">
                  <div className="border-2 border-zinc-800 p-6 bg-zinc-900">
                    
                    {}
                    <div className="flex justify-between items-start mb-6 border-b-2 border-zinc-800 pb-4">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 tracking-wide uppercase mb-1 drop-shadow-sm leading-none">
                          New Quest
                        </h2>
                        <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-wider font-bold">Initialize new learning path</p>
                      </div>
                      <button 
                        onClick={onClose} 
                        className="group p-2 bg-red-600 text-white border-2 border-white shadow-[4px_4px_0px_0px_#000] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-y-[4px] active:shadow-none transition-none"
                      >
                        <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {}
                      <div className="group">
                        <label className="block text-xs md:text-sm font-bold text-blue-500 mb-2 uppercase tracking-widest">
                          Quest Title
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.title}
                          onChange={e => setFormData({ ...formData, title: e.target.value })}
                          className="w-full bg-black border-2 border-zinc-700 px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500 focus:bg-black transition-colors text-lg md:text-xl font-medium"
                          placeholder="E.G. MASTER NEXT.JS..."
                        />
                      </div>
                      
                      {}
                      <div>
                        <label className="block text-xs md:text-sm font-bold text-purple-500 mb-2 uppercase tracking-widest">
                          Class / Category
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={formData.cat}
                            onChange={e => setFormData({ ...formData, cat: e.target.value })}
                            className="w-full bg-black border-2 border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-purple-500 appearance-none cursor-pointer text-lg md:text-xl font-medium uppercase"
                          >
                            <option value="" disabled className="text-zinc-700">SELECT CLASS...</option>
                            {CATEGORIES.map((cat) => (
                              <option key={cat} value={cat} className="bg-zinc-900 py-2">
                                {cat.toUpperCase()}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white bg-zinc-800 p-1 border border-zinc-600">
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {}
                      <div>
                        <label className="block text-xs md:text-sm font-bold text-green-500 mb-2 uppercase tracking-widest">
                          Quest Description
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={formData.desc}
                          onChange={e => setFormData({ ...formData, desc: e.target.value })}
                          className="w-full bg-black border-2 border-zinc-700 px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-green-500 resize-none transition-colors text-base md:text-lg font-medium"
                          placeholder="BRIEF MISSION DETAILS..."
                        />
                      </div>

                      {}
                      <button
                        disabled={loading}
                        type="submit"
                        className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg md:text-xl py-3 md:py-4 border-2 border-white shadow-[6px_6px_0px_0px_#000] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[2px_2px_0px_0px_#000] flex items-center justify-center gap-3 transition-none disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span>SAVING...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5 md:w-6 md:h-6" />
                            <span>ACCEPT QUEST</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}