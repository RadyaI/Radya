import React from 'react';

interface AnswerListProps {
  answers: any[];
  currentQuizData: any;
}

export default function AnswerList({ answers, currentQuizData }: AnswerListProps) {
  return (
    <div className="space-y-4 mb-12">
      <h3 className="font-bold border-b border-black inline-block mb-4">ANSWER BREAKDOWN</h3>

      {answers.map((ans: any, idx: number) => {
        const originalQuestion = currentQuizData?.questions[idx];
        const questionText = originalQuestion?.q || "Question text unavailable";
        const isEssay = originalQuestion?.type === 'essay';

        return (
          <div key={idx} className="item-row p-5 border border-black/20 bg-gray-50 flex flex-col gap-4">

            <div className="flex items-center gap-2">
              <span className="font-mono font-bold bg-black text-white px-2 py-0.5 text-xs">Q.{idx + 1}</span>

              {isEssay ? (
                <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-0.5 font-bold border border-yellow-800">SELF CHECK</span>
              ) : (
                ans.isCorrect ? (
                  <span className="bg-green-200 text-green-800 text-xs px-2 py-0.5 font-bold border border-green-800">CORRECT</span>
                ) : (
                  <span className="bg-red-200 text-red-800 text-xs px-2 py-0.5 font-bold border border-red-800">WRONG</span>
                )
              )}
            </div>

            <p className="font-serif font-bold text-lg leading-snug border-b-2 border-dashed border-black/10 pb-3">
              {questionText}
            </p>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-mono text-gray-600">
                You chose: <span className={`font-bold text-black`}>
                  {ans.selectedOption}
                </span>

                {!isEssay && !ans.isCorrect && (
                  <span className="ml-2 text-red-600 font-bold text-xs">[WRONG]</span>
                )}
              </p>

              {isEssay && (
                <div className="text-sm font-mono bg-green-50 text-green-900 border-l-4 border-green-500 p-3 mt-1 w-full">
                  <span className="font-bold block text-xs uppercase text-green-500 mb-1">Answer / Keyword:</span>
                  <span className="font-bold text-black">{ans.correctAnswer}</span>
                </div>
              )}

              {!isEssay && !ans.isCorrect && (
                <div className="text-sm font-mono bg-red-50 text-red-700 border-l-4 border-red-500 p-3 mt-1 w-full">
                  <span className="font-bold block text-xs uppercase text-red-400 mb-1">Correct Answer:</span>
                  <span className="font-bold text-black">{ans.correctAnswer}</span>
                </div>
              )}

              {ans.explanation && (
                <div className="text-sm font-mono bg-blue-50 text-blue-600 border-l-4 border-blue-500 p-3 mt-1 w-full">
                  <span className="font-bold block text-xs uppercase text-blue-400 mb-1">Explanation:</span>
                  <span className="text-black">{ans.explanation}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}