import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface Props {
  questions: any[]
  userAnswers: Record<number, number>
}

export default function QuizReviewModule({ questions, userAnswers }: Props) {
  return (
    <div className="w-full mt-8 space-y-6 text-left pb-10">
      <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-4">
        Detailed Review <br /> <span className='text-[12px] font-light text-green-500'>Explanation by Groq AI</span>
      </h3>
      
      {questions.map((q, idx) => {
        const userChoiceIdx = userAnswers[idx]
        const correctChoiceIdx = q.options.findIndex((o: any) => o.isCorrect)
        const isCorrect = userChoiceIdx === correctChoiceIdx

        return (
          <div key={q.id} className={`p-5 rounded-2xl border ${isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
            <div className="flex gap-3 mb-3">
              <div className="mt-1">
                {isCorrect ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
              </div>
              <div>
                <h4 className="text-white font-medium text-lg leading-snug">{q.question}</h4>
              </div>
            </div>

            <div className="ml-8 space-y-2 mb-4">
               {q.options.map((opt: any, oIdx: number) => {
                 let style = "text-zinc-500 border-transparent bg-zinc-900/50"
                 if (oIdx === correctChoiceIdx) style = "text-green-400 border-green-500/30 bg-green-500/10 font-bold" // Kunci Jawaban
                 if (oIdx === userChoiceIdx && !isCorrect) style = "text-red-400 border-red-500/30 bg-red-500/10 line-through" // Jawaban Salah User

                 return (
                   <div key={oIdx} className={`px-3 py-2 border rounded-lg text-sm flex justify-between items-center ${style}`}>
                      <span>{opt.text}</span>
                      {oIdx === correctChoiceIdx && <span className="text-[10px] uppercase tracking-wider bg-green-500/20 px-2 rounded">Correct Answer</span>}
                      {oIdx === userChoiceIdx && !isCorrect && <span className="text-[10px] uppercase tracking-wider bg-red-500/20 px-2 rounded">Your Answer</span>}
                   </div>
                 )
               })}
            </div>

            {q.explanation && (
              <div className="ml-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex gap-3 text-sm text-blue-300">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p><span className="font-bold">Explanation:</span> {q.explanation}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}