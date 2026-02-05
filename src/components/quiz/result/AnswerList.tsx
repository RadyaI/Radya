import React from 'react';
import ReactMarkdown from 'react-markdown';
import AIFeedbackButton from './AIFeedbackButton';
import EssayAICheck from './EssayAICheck';

interface AnswerListProps {
    result: any;
    answers: any[];
    currentQuizData: any;
}

export default function AnswerList({ answers, currentQuizData, result }: AnswerListProps) {
    
    const markdownComponents = {
        pre: ({ node, ...props }: any) => (
            <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto my-2 font-mono text-xs shadow-md border-l-4 border-yellow-500 text-left" {...props} />
        ),
        code: ({ node, inline, className, children, ...props }: any) => {
            if (inline) {
                return (
                    <code className="bg-gray-200 text-red-600 px-1 py-0.5 rounded-md font-mono text-xs font-bold" {...props}>
                        {children}
                    </code>
                );
            }
            return <code className="bg-transparent font-mono text-inherit" {...props}>{children}</code>;
        },
        p: ({ node, ...props }: any) => <p className="mb-1 last:mb-0 inline-block" {...props} />,
        ul: ({ node, ...props }: any) => <ul className="list-disc pl-5 space-y-1 my-1" {...props} />,
        ol: ({ node, ...props }: any) => <ol className="list-decimal pl-5 space-y-1 my-1" {...props} />,
    };

    return (
        <div className="space-y-4 mb-12">
            <h3 className="font-bold border-b border-black inline-block mb-4">ANSWER BREAKDOWN</h3>

            <AIFeedbackButton
                result={result}
                questions={currentQuizData?.questions || []}
                quizTitle={currentQuizData?.title || 'Quiz'}
            />

            {answers.map((ans: any, idx: number) => {
                const originalQuestion = currentQuizData?.questions[idx];
                const questionText = originalQuestion?.q || "Question text unavailable";
                const isEssay = originalQuestion?.type === 'essay';

                return (
                    <div key={idx} className="item-row p-5 border border-black/20 bg-gray-50 flex flex-col gap-4 overflow-visible"> 
                        {}

                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono font-bold bg-black text-white px-2 py-0.5 text-xs">Q.{idx + 1}</span>

                            {isEssay ? (
                                <>
                                    <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-0.5 font-bold border border-yellow-800">SELF CHECK</span>
                                    
                                    {}
                                    <EssayAICheck 
                                        question={questionText}
                                        userAnswer={ans.selectedOption}
                                        answerKey={ans.correctAnswer}
                                    />
                                    {}
                                </>
                            ) : (
                                ans.isCorrect ? (
                                    <span className="bg-green-200 text-green-800 text-xs px-2 py-0.5 font-bold border border-green-800">CORRECT</span>
                                ) : (
                                    <span className="bg-red-200 text-red-800 text-xs px-2 py-0.5 font-bold border border-red-800">WRONG</span>
                                )
                            )}
                        </div>

                        <div className="font-serif font-bold text-lg leading-snug border-b-2 border-dashed border-black/10 pb-3">
                            <ReactMarkdown components={markdownComponents}>
                                {questionText}
                            </ReactMarkdown>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="text-sm font-mono text-gray-600">
                                <span>You wrote: </span>
                                <div className="font-bold text-black inline-block align-top">
                                    <ReactMarkdown components={markdownComponents}>
                                        {ans.selectedOption}
                                    </ReactMarkdown>
                                </div>
                            </div>

                            {isEssay && (
                                <div className="text-sm font-mono bg-green-50 text-green-900 border-l-4 border-green-500 p-3 mt-1 w-full">
                                    <span className="font-bold block text-xs uppercase text-green-500 mb-1">Answer Key / Keyword:</span>
                                    <div className="font-bold text-black">
                                        <ReactMarkdown components={markdownComponents}>
                                            {ans.correctAnswer}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            )}

                            {!isEssay && !ans.isCorrect && (
                                <div className="text-sm font-mono bg-red-50 text-red-700 border-l-4 border-red-500 p-3 mt-1 w-full">
                                    <span className="font-bold block text-xs uppercase text-red-400 mb-1">Correct Answer:</span>
                                    <div className="font-bold text-black">
                                        <ReactMarkdown components={markdownComponents}>
                                            {ans.correctAnswer}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            )}

                            {ans.explanation && (
                                <div className="text-sm font-mono bg-blue-50 text-blue-600 border-l-4 border-blue-500 p-3 mt-1 w-full">
                                    <span className="font-bold block text-xs uppercase text-blue-400 mb-1">Explanation:</span>
                                    <div className="text-black">
                                        <ReactMarkdown components={markdownComponents}>
                                            {ans.explanation}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}