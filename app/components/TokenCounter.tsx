'use client';

import { Coins, Zap } from 'lucide-react';

interface TokenCounterProps {
  remainingTokens: number;
  totalTokens: number;
  isPlusUser?: boolean;
}

export function TokenCounter({ remainingTokens, totalTokens, isPlusUser = false }: TokenCounterProps) {
  const percentage = (remainingTokens / totalTokens) * 100;
  
  const getColorClass = () => {
    if (percentage > 50) return 'bg-teal-500';
    if (percentage > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTextColorClass = () => {
    if (percentage > 50) return 'text-teal-400';
    if (percentage > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-2">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <Coins className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[11px] font-medium text-gray-400">Tokens disponibles</span>
        </div>
        {isPlusUser && (
          <div className="flex items-center gap-0.5 bg-teal-500/20 px-1.5 py-0.5 rounded-full">
            <Zap className="w-2.5 h-2.5 text-teal-400" />
            <span className="text-[9px] font-semibold text-teal-400">PLUS</span>
          </div>
        )}
      </div>
      
      <div className="flex items-baseline justify-between mb-1.5">
        <div>
          <span className={`text-xl font-bold ${getTextColorClass()}`}>
            {remainingTokens.toLocaleString()}
          </span>
          <span className="text-[10px] text-gray-500 ml-1">
            / {(totalTokens / 1000).toFixed(0)}k
          </span>
        </div>
        <span className="text-[10px] text-gray-500">
          {percentage.toFixed(0)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full ${getColorClass()} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
