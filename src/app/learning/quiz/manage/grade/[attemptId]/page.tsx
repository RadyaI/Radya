'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQuiz } from '@/hooks/useQuiz'
import { useAdminQuiz } from '@/hooks/useAdminQuiz'
import { Loader2, Save, ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

export default function GradingPage() {
    const { attemptId } = useParams()
    const router = useRouter()
    const { getAttemptDetail, getQuizDetail } = useQuiz()
    const { gradeAttempt, saving } = useAdminQuiz()

    const [attempt, setAttempt] = useState<any>(null)
    const [quiz, setQuiz] = useState<any>(null)
    const [finalScore, setFinalScore] = useState(0)
    const [feedback, setFeedback] = useState('')

    useEffect(() => {
        const load = async () => {
            const att = await getAttemptDetail(attemptId as string)
            if (att) {
                setAttempt(att)
                setFinalScore((att as any).score || 0)
                setFeedback((att as any).adminFeedback || '')
                const q = await getQuizDetail((att as any).quizId)
                setQuiz(q)
            }
        }
        load()
    }, [attemptId])

    if (!attempt || !quiz) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>

    return (
        <>
            <div className="min-h-screen bg-black p-8 text-white pb-32">
                <div className="max-w-3xl mx-auto">
                    <button onClick={() => router.back()} className="text-zinc-500 hover:text-white mb-4 flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to List
                    </button>
                    <h1 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Grading: {quiz.title}</h1>

                    <div className="space-y-8">
                        {quiz.questions.map((q: any, idx: number) => {
                            const userAnsValue = attempt.answers[idx]
                            const isEssay = q.type === 'essay'
                            let displayAnswer = '-'
                            let isCorrectPG = false

                            if (isEssay) {
                                displayAnswer = (userAnsValue as string) || '-'
                            } else {
                                if (typeof userAnsValue === 'number') {
                                    const selectedOpt = q.options[userAnsValue]
                                    if (selectedOpt) {
                                        displayAnswer = `${String.fromCharCode(65 + userAnsValue)}. ${selectedOpt.text}`
                                        isCorrectPG = selectedOpt.isCorrect
                                    } else {
                                        displayAnswer = 'Invalid Option Index'
                                    }
                                }
                            }

                            return (
                                <div key={idx} className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-zinc-400 text-sm mb-1">Question {idx + 1}</p>
                                            <h3 className="text-xl font-bold">{q.question}</h3>
                                        </div>
                                        {!isEssay && (
                                            <div className={`p-2 rounded-full ${isCorrectPG ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {isCorrectPG ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                                            </div>
                                        )}
                                    </div>

                                    <div className={`p-4 rounded-xl border mb-4 ${isEssay
                                            ? 'bg-black border-white/5'
                                            : isCorrectPG ? 'bg-green-900/10 border-green-500/20' : 'bg-red-900/10 border-red-500/20'
                                        }`}>
                                        <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">User Answer</p>
                                        <p className={`whitespace-pre-wrap ${isCorrectPG ? 'text-green-200' : 'text-blue-100'}`}>
                                            {displayAnswer}
                                        </p>
                                    </div>

                                    <div className="bg-zinc-800/30 p-4 rounded-xl border border-white/5">
                                        <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">
                                            {isEssay ? 'Grading Key' : 'Explanation'}
                                        </p>
                                        <p className="text-zinc-400 text-sm">{q.explanation || 'No explanation provided'}</p>

                                        {!isEssay && !isCorrectPG && (
                                            <div className="mt-2 pt-2 border-t border-white/5 text-sm text-green-400">
                                                Correct: {q.options.find((o: any) => o.isCorrect)?.text}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-white/10 p-4 z-50 shadow-2xl">
                        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-4">
                            <div className="flex-1 w-full">
                                <label className="text-xs text-zinc-400">Admin Feedback</label>
                                <input
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none"
                                    placeholder="Feedback for student..."
                                />
                            </div>
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div>
                                    <label className="text-xs text-zinc-400">Score</label>
                                    <input
                                        type="number"
                                        value={finalScore}
                                        onChange={(e) => setFinalScore(parseInt(e.target.value))}
                                        className="w-24 bg-black border border-white/10 rounded-lg px-3 py-2 text-xl font-bold text-white text-center focus:border-blue-500 outline-none"
                                    />
                                </div>
                                <button
                                    onClick={() => {
                                        if (finalScore < 0 || finalScore > 100) return toast.error('Score must be 0-100')
                                        gradeAttempt(attemptId as string, finalScore, feedback)
                                    }}
                                    disabled={saving}
                                    className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                                >
                                    {saving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                                    Save Grade
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position='top-right' />
        </>
    )
}