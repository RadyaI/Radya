'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, CheckCircle, AlertCircle, Image as ImageIcon, Code, Clock } from 'lucide-react'
import { useAdminQuiz } from '@/hooks/useAdminQuiz'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
  userEmail: string
  initialData?: any
  isEditMode?: boolean
}

export default function AdminQuizForm({ userEmail, initialData, isEditMode = false }: Props) {
  const { saving, createQuiz, updateQuiz, deleteQuiz } = useAdminQuiz()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Frontend',
    difficulty: 'Easy',
    isPublic: false,
    timeLimit: 60,
  })

  const [questions, setQuestions] = useState<any[]>([
    {
      id: Date.now(),
      question: '',
      codeSnippet: '',
      imageUrl: '',
      options: [
        { id: 'a', text: '', isCorrect: false },
        { id: 'b', text: '', isCorrect: false },
        { id: 'c', text: '', isCorrect: false },
        { id: 'd', text: '', isCorrect: false },
      ],
      explanation: ''
    }
  ])

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'Frontend',
        difficulty: initialData.difficulty || 'Easy',
        isPublic: initialData.isPublic || false,
        timeLimit: initialData.timeLimit || 60,
      })
      if (initialData.questions) {
        setQuestions(initialData.questions)
      }
    }
  }, [initialData])

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        question: '',
        codeSnippet: '',
        imageUrl: '',
        options: [
          { id: 'a', text: '', isCorrect: false },
          { id: 'b', text: '', isCorrect: false },
          { id: 'c', text: '', isCorrect: false },
          { id: 'd', text: '', isCorrect: false },
        ],
        explanation: ''
      }
    ])
  }

  const handleRemoveQuestion = (index: number) => {
    const newQ = [...questions]
    newQ.splice(index, 1)
    setQuestions(newQ)
  }

  const handleQFieldChange = (index: number, field: string, val: string) => {
    const newQ: any = [...questions]
    newQ[index][field] = val
    setQuestions(newQ)
  }

  const handleOptionChange = (qIndex: number, oIndex: number, val: string) => {
    const newQ = [...questions]
    newQ[qIndex].options[oIndex].text = val
    setQuestions(newQ)
  }

  const handleCorrectAnswer = (qIndex: number, oIndex: number) => {
    const newQ = [...questions]
    newQ[qIndex].options.forEach((opt: any) => opt.isCorrect = false)
    newQ[qIndex].options[oIndex].isCorrect = true
    setQuestions(newQ)
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) return toast.error('Isi judul & deskripsi dulu bro!')
    if (questions.some(q => !q.question || q.options.some((o: any) => !o.text))) return toast.error('Cek lagi, ada soal/jawaban kosong!')

    const isAllKeySet = questions.every(q => q.options.some((o: any) => o.isCorrect))
    if (!isAllKeySet) return toast.error('Woi, ada soal yang belum dikunci jawaban benarnya!')

    const payload = { ...formData, questions }

    if (isEditMode && initialData?.id) {
      await updateQuiz(initialData.id, payload)
    } else {
      await createQuiz(payload, userEmail)
    }
  }

  const handleDelete = async () => {
    if (isEditMode && initialData?.id) {
      await deleteQuiz(initialData.id)
    }
  }

  return (
    <>
      <div className="space-y-8 pb-20">
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-500" />
            Quiz Metadata
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 ml-1">Title</label>
                <input
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Ex: Mastering Next.js"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 ml-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all resize-none"
                  placeholder="Short brief about this quiz..."
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 ml-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none cursor-pointer"
                  >
                    {['Frontend', 'Backend', 'Fullstack', 'DevOps', 'UI/UX', 'General'].map(c => (
                      <option key={c} value={c} className="bg-zinc-900">{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-zinc-400 ml-1">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={e => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none cursor-pointer"
                  >
                    {['Easy', 'Medium', 'Hard', 'Expert'].map(c => (
                      <option key={c} value={c} className="bg-zinc-900">{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 ml-1 flex items-center gap-1">
                    Time Limit <Clock className="w-3 h-3" />
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={formData.timeLimit}
                      onChange={e => setFormData({ ...formData, timeLimit: parseInt(e.target.value) || 0 })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                      placeholder="0 for Unlimited"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 pointer-events-none">
                      {formData.timeLimit === 0 ? 'Unlimited' : 'Seconds'}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-zinc-400 ml-1">Visibility</label>
                  <button
                    onClick={() => setFormData({ ...formData, isPublic: !formData.isPublic })}
                    className={`w-full py-3 rounded-xl border font-medium transition-all ${formData.isPublic ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-zinc-800/50 border-zinc-700 text-zinc-400'}`}
                  >
                    {formData.isPublic ? 'Public' : 'Draft'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode='popLayout'>
            {questions.map((q, qIdx) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-zinc-900/20 border border-white/5 rounded-2xl p-6 relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-mono text-blue-500 bg-blue-500/10 px-2 py-1 rounded">Question {qIdx + 1}</span>
                  <button onClick={() => handleRemoveQuestion(qIdx)} className="text-zinc-500 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <textarea
                  value={q.question}
                  onChange={e => handleQFieldChange(qIdx, 'question', e.target.value)}
                  placeholder="Enter your question here..."
                  rows={3}
                  className="w-full bg-transparent text-lg md:text-xl font-bold text-white placeholder:text-zinc-600 outline-none border-b border-white/10 focus:border-blue-500 pb-2 mb-6 transition-colors resize-y min-h-[80px]"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                      <Code className="w-3 h-3" /> Code Snippet (Optional)
                    </label>
                    <textarea
                      value={q.codeSnippet}
                      onChange={e => handleQFieldChange(qIdx, 'codeSnippet', e.target.value)}
                      placeholder="// Paste code here..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs font-mono text-green-400 focus:border-blue-500/50 outline-none h-24 resize-none"
                      spellCheck={false}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                      <ImageIcon className="w-3 h-3" /> Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={q.imageUrl}
                      onChange={e => handleQFieldChange(qIdx, 'imageUrl', e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:border-blue-500/50 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {q.options.map((opt: any, oIdx: number) => (
                    <div
                      key={opt.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${opt.isCorrect ? 'bg-green-500/10 border-green-500/50' : 'bg-black/20 border-white/5 hover:border-white/10'}`}
                    >
                      <button
                        onClick={() => handleCorrectAnswer(qIdx, oIdx)}
                        className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${opt.isCorrect ? 'border-green-500 text-green-500' : 'border-zinc-600 text-transparent hover:border-zinc-400'}`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                      </button>
                      <input
                        value={opt.text}
                        onChange={e => handleOptionChange(qIdx, oIdx, e.target.value)}
                        placeholder={`Option ${opt.id.toUpperCase()}`}
                        className="flex-1 bg-transparent text-sm text-white outline-none"
                      />
                    </div>
                  ))}
                </div>

                <input
                  value={q.explanation}
                  onChange={e => handleQFieldChange(qIdx, 'explanation', e.target.value)}
                  placeholder="Explanation (Why is this answer correct?)"
                  className="w-full bg-zinc-950/30 text-sm text-zinc-400 px-4 py-2 rounded-lg outline-none border border-transparent focus:border-zinc-700 transition-colors"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent z-40">
          <div className="max-w-5xl mx-auto flex gap-4">

            {isEditMode && initialData?.id && (
              <button
                onClick={handleDelete}
                disabled={saving}
                className="px-5 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 rounded-xl transition-all disabled:opacity-50"
                title="Delete Quiz"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={handleAddQuestion}
              className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2 border border-zinc-700"
            >
              <Plus className="w-5 h-5" />
              Add Question
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold shadow-lg shadow-blue-900/20 transition-all disabled:opacity-50"
            >
              {saving ? 'Saving...' : (isEditMode ? 'Update Quiz' : 'Publish Quiz')}
            </button>
          </div>
        </div>
      </div>
      <Toaster position='top-right'/>
    </>
  )
}