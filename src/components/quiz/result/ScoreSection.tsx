import React from 'react';
import { Info } from 'lucide-react';

interface ScoreSectionProps {
  score: number;
  hasEssay: boolean;
}

export default function ScoreSection({ score, hasEssay }: ScoreSectionProps) {
  return (
    <div className="text-center mb-12">
      <span className="block font-mono text-sm tracking-widest uppercase mb-2">Final Score</span>
      <span className="text-9xl font-black leading-none">{score}</span>
      <div className="flex flex-col items-center mt-2">
        <span className="text-xl font-mono text-gray-500">/ 100</span>

        {hasEssay && (
          <div className="flex items-center gap-2 mt-4 text-xs font-mono bg-yellow-100 px-3 py-1 border border-yellow-400 text-yellow-800">
            <Info size={14} />
            <span>Score calculated from Multiple Choice only</span>
          </div>
        )}
      </div>
    </div>
  );
}