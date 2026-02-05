import React from 'react';

interface ResultHeaderProps {
  result: any;
  currentQuizData: any;
  passed: boolean;
}

export default function ResultHeader({ result, currentQuizData, passed }: ResultHeaderProps) {
  return (
    <div className="border-b-4 border-double border-black pb-6 mb-8 flex justify-between items-start">
      <div className="flex flex-col items-start">
        <h1 className="text-3xl md:text-4xl font-black font-serif uppercase leading-none">Quiz Report</h1>
        <p className="font-mono text-xs text-gray-500 mt-1">ID: {result.id.slice(0, 8)}...</p>
        <p className="font-bold text-lg mt-1">{currentQuizData?.title}</p>
      </div>

      <div className={`stamp border-4 ${passed ? 'border-green-600 text-green-600' : 'border-red-600 text-red-600'}  px-2 md:px-4 py-1 md:py-2 font-black text-xl md:text-2xl uppercase -rotate-12 opacity-80 mix-blend-multiply`}>
        {passed ? 'PASSED' : 'FAILED'}
      </div>
    </div>
  );
}