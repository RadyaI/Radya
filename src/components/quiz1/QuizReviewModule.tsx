import { CheckCircle, XCircle, AlertCircle, FileText } from 'lucide-react'

interface Props {
  questions: any[]
  userAnswers: Record<number, string | number>
}

export default function QuizReviewModule({ questions, userAnswers }: Props) {
  return (
    <div className="w-full mt-8 space-y-6 text-left pb-10">
      <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-4">
        Detailed Review
      </h3>

      {questions.map((q, idx) => {
        const userAnswer = userAnswers[idx]
        const isEssay = q.type === 'essay'

        let isCorrect = false
        if (!isEssay) {
          const correctChoiceIdx = q.options.findIndex((o: any) => o.isCorrect)
          isCorrect = userAnswer === correctChoiceIdx
        }

        return (
          <div key={q.id} className={`p-5 rounded-2xl border ${isEssay ? 'bg-zinc-900 border-zinc-700' :
              isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'
            }`}>
            <div className="flex gap-3 mb-3">
              <div className="mt-1">
                {isEssay ? <FileText className="w-5 h-5 text-blue-400" /> :
                  isCorrect ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
              </div>
              <div>
                <h4 className="text-white font-medium text-lg leading-snug">{q.question}</h4>
                {isEssay && <span className="text-[10px] uppercase bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded ml-2">Essay / Manual Check</span>}
                <br />
                {isEssay && <span className="text-[10px] uppercase bg-blue-500/10 text-orange-400 px-2 py-0.5 rounded ml-2">Jawaban tidak harus sama persis Grading Reference</span>}
              </div>
            </div>

            {isEssay ? (
              <div className="ml-8 space-y-4">
                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <p className="text-xs text-zinc-500 mb-1">Your Answer:</p>
                  <p className="text-zinc-200 whitespace-pre-wrap">{userAnswer as string || '-'}</p>
                </div>
              </div>
            ) : (
              <div className="ml-8 space-y-2 mb-4">
                {q.options.map((opt: any, oIdx: number) => {
                  const correctChoiceIdx = q.options.findIndex((o: any) => o.isCorrect)
                  let style = "text-zinc-500 border-transparent bg-zinc-900/50"
                  if (oIdx === correctChoiceIdx) style = "text-green-400 border-green-500/30 bg-green-500/10 font-bold"
                  if (oIdx === userAnswer && !isCorrect) style = "text-red-400 border-red-500/30 bg-red-500/10 line-through"

                  return (
                    <div key={oIdx} className={`px-3 py-2 border rounded-lg text-sm flex justify-between items-center ${style}`}>
                      <span>{opt.text}</span>
                      {oIdx === correctChoiceIdx && <span className="text-[10px] uppercase tracking-wider bg-green-500/20 px-2 rounded">Correct Answer</span>}
                      {oIdx === userAnswer && !isCorrect && <span className="text-[10px] uppercase tracking-wider bg-red-500/20 px-2 rounded">Your Answer</span>}
                    </div>
                  )
                })}
              </div>
            )}

            {q.explanation && (
              <div className="ml-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex gap-3 text-sm text-blue-300 mt-4">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p><span className="font-bold">{isEssay ? 'Grading Reference:' : 'Explanation:'}</span> {q.explanation}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}